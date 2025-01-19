"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChecklistItem } from "@/components/checklist-item"
import { CHECKLIST_ITEMS } from "@/lib/constants"
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

export default function Home() {
  const router = useRouter()
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [showQuizButton, setShowQuizButton] = useState(false)

  useEffect(() => {
    const state = getOnboardingState()
    if (state.checklist) {
      setCompletedItems(new Set(state.checklist.filter(item => item.completed).map(item => item.id)))
    }
  }, [])

  const totalItems = CHECKLIST_ITEMS.reduce((acc, section) =>
    acc + countTotalItems(section.items), 0)

  const progress = (completedItems.size / totalItems) * 100

  useEffect(() => {
    setShowQuizButton(completedItems.size === totalItems)
  }, [completedItems.size, totalItems])

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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>진행 상황</span>
              <span className="text-sm font-normal">
                {completedItems.size}/{totalItems} 완료
              </span>
            </CardTitle>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {CHECKLIST_ITEMS.map((section) => (
              <div key={section.id} className="space-y-4">
                <h3 className="font-semibold">{section.title}</h3>
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
          {showQuizButton && (
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => router.push('/quiz')}
              >
                퀴즈 시작하기
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  )
}
