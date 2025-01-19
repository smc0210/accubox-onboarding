'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CHECKLIST_ITEMS, ONBOARDING_STEPS } from '@/lib/constants';
import { getOnboardingState } from '@/lib/storage';
import { ChevronDown, ChevronRight, CheckCircle2, XCircle, Download } from 'lucide-react';
import { QuizQuestion } from '@/lib/types';

interface CategoryStats {
  total: number;
  correct: number;
  questions: {
    question: string;
    isCorrect: boolean;
    answer: string;
    userAnswer: string;
  }[];
}

export default function QuizResultPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // 체크리스트 진행 상황
  const onboardingState = getOnboardingState();
  const completedItems = new Set(onboardingState.checklist.filter(item => item.completed).map(item => item.id));

  // 사용자 정보 가져오기
  const userName = onboardingState.name || '사용자';

  // 퀴즈 결과 데이터 (URL 파라미터나 상태 관리 도구로부터 받아와야 함)
  const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
  const { questions, answers } = quizResults;

  // 카테고리별 통계 계산
  const categoryStats: Record<string, CategoryStats> = {};
  questions?.forEach((question: QuizQuestion, index: number) => {
    const category = question.category;
    if (!categoryStats[category]) {
      categoryStats[category] = {
        total: 0,
        correct: 0,
        questions: []
      };
    }

    const isCorrect = answers[index] === question.answer;
    categoryStats[category].total += 1;
    if (isCorrect) categoryStats[category].correct += 1;
    
    categoryStats[category].questions.push({
      question: question.question,
      isCorrect,
      answer: question.answer,
      userAnswer: answers[index]
    });
  });

  // 전체 통계 계산
  const totalQuestions = questions?.length || 0;
  const totalCorrect = Object.values(categoryStats).reduce((sum, stat) => sum + stat.correct, 0);
  const totalPercentage = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleDownload = () => {
    // 사용자 이름도 onboardingState에서 가져오기
    const userName = onboardingState.name || '사용자';
    const timestamp = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // HTML 템플릿 생성
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>${userName}님의 온보딩 퀴즈 결과</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
          .card { background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1rem; padding: 1.5rem; }
          .progress { background: #e5e7eb; border-radius: 9999px; height: 0.5rem; overflow: hidden; }
          .progress-bar { background: #3b82f6; height: 100%; transition: width 0.3s ease; }
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="container">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">${userName}님의 온보딩 퀴즈 결과</h1>
            <p class="text-gray-600">${timestamp} 완료</p>
          </div>

          <div class="card">
            <h2 class="text-xl font-bold mb-4">전체 결과</h2>
            <div class="text-center">
              <p class="text-3xl font-bold mb-2">${totalCorrect}/${totalQuestions} 문제 정답</p>
              <p class="text-gray-600">전체 정답률: ${totalPercentage.toFixed(1)}%</p>
            </div>
            <div class="progress mt-4">
              <div class="progress-bar" style="width: ${totalPercentage}%"></div>
            </div>
          </div>

          ${Object.entries(categoryStats).map(([category, stats]) => `
            <div class="card">
              <h3 class="text-lg font-bold mb-4">${category}</h3>
              <div class="flex justify-between items-center mb-4">
                <span>${stats.correct}/${stats.total} 정답</span>
                <div class="progress w-24">
                  <div class="progress-bar" style="width: ${(stats.correct / stats.total) * 100}%"></div>
                </div>
              </div>
              <div class="space-y-3">
                ${stats.questions.map(q => `
                  <div class="p-3 bg-gray-50 rounded">
                    <p class="font-medium">${q.question}</p>
                    <p class="text-sm text-gray-600">
                      ${q.isCorrect 
                        ? `✅ 정답: ${q.answer}`
                        : `❌ 내 답변: ${q.userAnswer} / 정답: ${q.answer}`}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;

    // Blob 생성 및 다운로드
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userName}_온보딩퀴즈결과_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="space-y-6">
        {/* 페이지 제목 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{userName}님의 온보딩 결과</h1>
          <p className="text-muted-foreground">
            온보딩 체크리스트와 도메인 지식 테스트 결과입니다
          </p>
        </div>

        {/* 전체 진행 상황 */}
        <Card>
          <CardHeader>
            <CardTitle>온보딩 진행 상황</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ONBOARDING_STEPS.map(step => {
              const stepItems = CHECKLIST_ITEMS.find(item => item.step === step.step);
              const totalItems = stepItems?.items.length || 0;
              const completedCount = stepItems?.items.filter(item => completedItems.has(item.id)).length || 0;
              const progress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

              return (
                <div key={step.step} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Step {step.step}: {step.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {completedCount}/{totalItems} 완료
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 퀴즈 전체 결과 */}
        <Card>
          <CardHeader>
            <CardTitle>퀴즈 결과</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold">
                {totalCorrect}/{totalQuestions} 문제 정답
              </p>
              <p className="text-muted-foreground">
                전체 정답률: {totalPercentage.toFixed(1)}%
              </p>
            </div>
            <Progress value={totalPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* 카테고리별 결과 */}
        <div className="space-y-2">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <Collapsible
              key={category}
              open={expandedSections.includes(category)}
              onOpenChange={() => toggleSection(category)}
            >
              <Card>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-2">
                      {expandedSections.includes(category) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <h3 className="font-semibold">{category}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">
                        {stats.correct}/{stats.total} 정답
                      </span>
                      <Progress
                        value={(stats.correct / stats.total) * 100}
                        className="w-24 h-2"
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {stats.questions.map((q, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-lg bg-muted"
                        >
                          {q.isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm text-muted-foreground">
                              {q.isCorrect ? (
                                <>정답: {q.answer}</>
                              ) : (
                                <>
                                  내 답변: {q.userAnswer} / 정답: {q.answer}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => window.location.href = '/'}>
            처음으로 돌아가기
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            결과 다운로드
          </Button>
        </div>
      </div>
    </main>
  );
} 