'use client'

import { QUIZ_CATEGORIES } from '@/lib/constants/quiz-categories'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function QuizSelectPage() {
  const router = useRouter()

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/quiz?category=${categoryId}`)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">퀴즈 카테고리</h1>
        <p className="text-muted-foreground">학습하고 싶은 카테고리를 선택해주세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {QUIZ_CATEGORIES.map((category) => (
          <Card
            key={category.id}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleCategorySelect(category.id)}
          >
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">클릭하여 퀴즈 시작하기</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}