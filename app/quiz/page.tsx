"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuizPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">온보딩 퀴즈</h1>
          <p className="text-muted-foreground">
            체크리스트에서 학습한 내용을 바탕으로 퀴즈를 풀어보세요.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>도메인 지식 테스트</CardTitle>
          </CardHeader>
          <CardContent>
            <p>준비 중입니다...</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}