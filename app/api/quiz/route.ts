import { QuizQuestion } from '@/lib/types'
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

function parseQuizMarkdown(content: string): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  const sections = content.split('\n## ').filter(Boolean)

  sections.forEach(section => {
    // 질문 찾기
    const questionMatch = section.match(/### Q\d+\. (.+)[\n\r]/)
    if (!questionMatch) return

    const id = section.match(/Q(\d+)/)![1]
    const question = questionMatch[1]

    // 메타데이터 파싱
    const metadata: Record<string, any> = {}
    const options: string[] = []

    // 옵션 섹션 찾기
    const optionsMatch = section.match(/- options:\n((?:  - [^\n]+\n)+)/)
    if (optionsMatch) {
      const optionsSection = optionsMatch[1]
      optionsSection.split('\n').forEach(line => {
        if (line.trim().startsWith('- ')) {
          options.push(line.trim().replace('- ', ''))
        }
      })
    }

    // 다른 메타데이터 파싱
    section.split('\n').forEach(line => {
      if (line.startsWith('- ') && !line.startsWith('- options:')) {
        const [key, ...values] = line.replace('- ', '').split(': ')
        metadata[key] = values.join(': ').trim()
      }
    })

    questions.push({
      id: `q${id}`,
      question,
      category: metadata.category as QuizQuestion['category'],
      type: metadata.type as 'multiple' | 'short',
      options,
      answer: metadata.answer,
      explanation: metadata.explanation,
      documentUrl: metadata.documentUrl,
      documentSection: metadata.documentSection
    })
  })

  return questions
}

export async function GET() {
  try {
    const quizPath = path.join(process.cwd(), 'docs', 'quiz-template.md')
    const fileContents = fs.readFileSync(quizPath, 'utf8')
    const questions = parseQuizMarkdown(fileContents)

    // 디버깅을 위한 상세 로깅
    questions.forEach(q => {
      console.log(`\nQuestion ${q.id}:`)
      console.log('Options:', q.options)
      console.log('Answer:', q.answer)
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error in quiz API:', error)
    return NextResponse.json({ error: 'Failed to load quiz questions' }, { status: 500 })
  }
}