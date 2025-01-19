"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChecklistItem } from "@/components/checklist-item"
import { CHECKLIST_ITEMS, ONBOARDING_STEPS } from "@/lib/constants"
import { useState, useEffect } from "react"
import { getOnboardingState, updateOnboardingState } from "@/lib/storage"
import { ChecklistItem as ChecklistItemType } from "@/lib/types"
import { findItemAndParent, getAllChildrenIds, areAllSiblingsCompleted } from "@/lib/utils/checklist"
import { useRouter } from "next/navigation"

function countTotalItems(items: ChecklistItemType[]): number {
  return items.reduce((acc, item) => {
    const subItemsCount = item.items ? countTotalItems(item.items) : 0
    return acc + 1 + subItemsCount
  }, 0)
}

const flattenItems = (items: ChecklistItemType[]): string[] => {
  return items.reduce<string[]>((acc, item) => {
    acc.push(item.id)
    if (item.items) {
      acc.push(...flattenItems(item.items))
    }
    return acc
  }, [])
}

function isStepCompleted(section: ChecklistItemType, completedItems: Set<string>): boolean {
  const allIds = getAllChildrenIds(section)
  return allIds.every(id => completedItems.has(id))
}

export default function Home() {
  const router = useRouter()
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const state = getOnboardingState()
    if (state.checklist) {
      setCompletedItems(new Set(state.checklist.filter(item => item.completed).map(item => item.id)))
    }
  }, [])

  // 스텝 변경 핸들러
  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  // 현재 스텝의 섹션만 필터링
  const currentSections = CHECKLIST_ITEMS.filter(
    section => section.step === currentStep
  )

  const totalItems = CHECKLIST_ITEMS.reduce((acc, section) =>
    acc + countTotalItems(section.items), 0)

  const progress = (completedItems.size / totalItems) * 100

  // 퀴즈 버튼 표시 조건 수정
  const showQuizButton = isStepCompleted(
    CHECKLIST_ITEMS.find(section => section.step === 3)!,
    completedItems
  )

  // 각 스텝별 진행률 계산 함수 추가
  const calculateStepProgress = (step: number) => {
    const stepSection = CHECKLIST_ITEMS.find(section => section.step === step)
    if (!stepSection) return 0

    const stepItems = getAllChildrenIds(stepSection)
    const completedStepItems = stepItems.filter(id => completedItems.has(id))
    return Math.round((completedStepItems.length / stepItems.length) * 100)
  }

  const handleToggle = (id: string, completed: boolean) => {
    const newCompleted = new Set(completedItems)
    const result = findItemAndParent(CHECKLIST_ITEMS, id)

    if (!result) return

    const { item, parent } = result

    if (completed) {
      // 현재 항목 체크
      newCompleted.add(id)

      // 하위 항목들 모두 체크
      if (item.items) {
        getAllChildrenIds(item).forEach(childId => {
          newCompleted.add(childId)
        })
      }

      // 부모 항목들 체크 여부 확인 및 업데이트
      let currentParent = parent
      while (currentParent) {
        const parentResult = findItemAndParent(CHECKLIST_ITEMS, currentParent.id)
        if (!parentResult) break

        if (areAllSiblingsCompleted(currentParent.items || [], newCompleted)) {
          newCompleted.add(currentParent.id)
          currentParent = parentResult.parent
        } else {
          break
        }
      }
    } else {
      // 현재 항목 체크 해제
      newCompleted.delete(id)

      // 하위 항목들 모두 체크 해제
      if (item.items) {
        getAllChildrenIds(item).forEach(childId => {
          newCompleted.delete(childId)
        })
      }

      // 부모 항목들 체크 해제
      let currentParent = parent
      while (currentParent) {
        newCompleted.delete(currentParent.id)
        const parentResult = findItemAndParent(CHECKLIST_ITEMS, currentParent.id)
        if (!parentResult) break
        currentParent = parentResult.parent
      }
    }

    setCompletedItems(newCompleted)

    updateOnboardingState({
      checklist: Array.from(newCompleted).map(id => ({ id, completed: true })),
      progress: (newCompleted.size / totalItems) * 100
    })
  }

  return (
    <main className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">온보딩 체크리스트</h1>
          <p className="text-muted-foreground">
            신규 입사자를 위한 온보딩 체크리스트입니다.
          </p>
        </div>

        <div className="flex gap-2">
          {ONBOARDING_STEPS.map((step) => {
            const stepProgress = calculateStepProgress(step.step)
            return (
              <Card
                key={step.step}
                className={`flex-1 cursor-pointer transition-all hover:ring-2 hover:ring-primary/50
                  ${currentStep === step.step ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleStepChange(step.step)}
              >
                <CardHeader>
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>Step {step.step}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {stepProgress}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <Progress
                    value={stepProgress}
                    className="h-1 mt-2"
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{ONBOARDING_STEPS.find(s => s.step === currentStep)?.title}</span>
              <span className="text-sm font-normal">
                {calculateStepProgress(currentStep)}% 완료
              </span>
            </CardTitle>
            <Progress value={calculateStepProgress(currentStep)} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {currentSections.map((section) => (
              <div key={section.id} className="space-y-4">
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      onToggle={handleToggle}
                      completedItems={completedItems}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
          {showQuizButton && currentStep === 3 && (
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => router.push('/quiz')}
              >
                도메인 지식 퀴즈 시작하기
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  )
}
