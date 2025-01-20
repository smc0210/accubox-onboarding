"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUserSession, setUserSession } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Step } from '@/components/ui/step';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const session = getUserSession();
    if (session?.name) {
      router.push('/checklist');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('이름을 입력해주세요');
      return;
    }
    setUserSession(name.trim());
    router.push('/checklist');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">AccuBox 온보딩</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button type="submit" className="w-full">
            시작하기
          </Button>
        </form>
        <Step
          step={3}
          title="도메인 퀴즈 시작하기"
          description="도메인 지식을 테스트하고 학습하세요"
          href="/quiz/select"
        />
      </Card>
    </main>
  );
}
