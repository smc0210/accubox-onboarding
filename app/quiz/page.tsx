"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { QUIZ_QUESTIONS } from '@/lib/constants/quiz'
import { QuizQuestion, QuizResult } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [results, setResults] = useState<QuizResult | null>(null)

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]

  const handleAnswer = () => {
    if (showExplanation) {
      // 다음 문제로 이동
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer('')
        setShowExplanation(false)
      } else {
        // 퀴즈 완료
        finishQuiz()
      }
    } else {
      // 답변 확인
      setShowExplanation(true)
    }
  }

  const finishQuiz = () => {
    // 결과 저장 로직
  }

  if (!currentQuestion) return null

  return (
    <main className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            체크리스트로 돌아가기
          </Button>
          <p className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
          </p>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">도메인 지식 퀴즈</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === 'multiple' && (
              <RadioGroup
                value={selectedAnswer}
                onValueChange={setSelectedAnswer}
              >
                {currentQuestion.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {showExplanation && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">
                  {selectedAnswer === currentQuestion.answer ? '정답입니다! 🎉' : '틀렸습니다 😢'}
                </p>
                <p className="mt-2">{currentQuestion.explanation}</p>
                <a
                  href={currentQuestion.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  📚 관련 문서 보기
                </a>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleAnswer}
              disabled={!selectedAnswer && !showExplanation}
            >
              {showExplanation
                ? currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                  ? '다음 문제'
                  : '퀴즈 완료'
                : '정답 확인'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}