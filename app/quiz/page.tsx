"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { loadQuizQuestions } from '@/lib/constants/quiz'
import { getUserSession } from '@/lib/storage'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { QuizQuestion } from '@/lib/types'

export default function QuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  useEffect(() => {
    const session = getUserSession()
    if (!session?.name) {
      router.push('/')
      return
    }
    setUserName(session.name)

    // 퀴즈 데이터 로드
    loadQuizQuestions(category || undefined).then(loadedQuestions => {
      console.log('Category:', category)
      console.log('Loaded questions:', loadedQuestions)
      console.log('Number of questions:', loadedQuestions.length)
      console.log('First question:', loadedQuestions[0])
      setQuestions(loadedQuestions)
    }).catch(error => {
      console.error('Error loading questions:', error)
    })
  }, [router, category])

  if (questions.length === 0) {
    return (
      <main className="container mx-auto p-4 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">퀴즈를 불러오는 중입니다...</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (value: string) => {
    if (!showExplanation) {
      setSelectedAnswer(value)
    }
  }

  const handleNext = () => {
    if (showExplanation) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer('')
        setShowExplanation(false)
      } else {
        setShowResults(true)
      }
    } else {
      setShowExplanation(true)
      const newAnswers = [...selectedAnswers]
      newAnswers[currentQuestionIndex] = selectedAnswer
      setSelectedAnswers(newAnswers)
    }
  }

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.answer ? 1 : 0)
    }, 0)
  }

  const handleFinishQuiz = () => {
    // 퀴즈 결과 저장
    localStorage.setItem('quizResults', JSON.stringify({
      questions,
      answers: selectedAnswers,
      timestamp: new Date().toISOString()
    }));

    // 결과 페이지로 이동
    router.push('/quiz/result');
  };

  if (showResults) {
    handleFinishQuiz();
    return null;
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/quiz/select')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            카테고리 선택으로 돌아가기
          </Button>
          <p className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">도메인 지식 퀴즈</h1>
          <p className="text-muted-foreground">{userName}님의 도메인 지식을 테스트합니다.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Question {currentQuestionIndex + 1}</span>
              <Progress value={progress} className="w-32 h-2" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {currentQuestion.question}
              </h2>
              {currentQuestion.options && (
                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={handleAnswerSelect}
                  className="space-y-2"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                        disabled={showExplanation}
                      />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {showExplanation && (
                <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
                  <p className="font-medium">
                    {selectedAnswer === currentQuestion.answer ? '정답입니다! 🎉' : '틀렸습니다 😢'}
                  </p>
                  <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                  <a
                    href={currentQuestion.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-block mt-2"
                  >
                    📚 관련 문서 보기
                  </a>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleNext}
              className="w-full"
              disabled={!selectedAnswer && !showExplanation}
            >
              {showExplanation
                ? currentQuestionIndex < questions.length - 1
                  ? '다음 문제'
                  : '결과 보기'
                : '정답 확인'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}