import { QuizQuestion } from '@/lib/types'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function parseQuizMarkdown(content: string): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  const sections = content.split('\n## ').filter(Boolean)

  sections.forEach(section => {
    const lines = section.split('\n')
    const questionMatches = lines.join('\n').match(/### Q\d+\. (.+)[\n\r]/g)

    if (!questionMatches) return

    questionMatches.forEach(questionMatch => {
      const questionContent = section.split(questionMatch)[1]
      if (!questionContent) return

      const metadata = questionContent
        .split('\n')
        .filter(line => line.startsWith('- '))
        .reduce((acc, line) => {
          const [key, ...values] = line.replace('- ', '').split(': ')
          const value = values.join(': ').trim()

          if (key === 'options') {
            acc[key] = questionContent
              .split('\n')
              .filter(l => l.trim().startsWith('  - '))
              .map(l => l.replace('  - ', '').trim())
          } else {
            acc[key] = value
          }

          return acc
        }, {} as Record<string, any>)

      const id = questionMatch.match(/Q(\d+)/)?.[1] || ''
      const question = questionMatch.replace(/### Q\d+\. /, '').trim()

      questions.push({
        id: `q${id}`,
        question,
        category: metadata.category as QuizQuestion['category'],
        type: metadata.type as 'multiple' | 'short',
        options: metadata.options,
        answer: metadata.answer,
        explanation: metadata.explanation,
        documentUrl: metadata.documentUrl,
        documentSection: metadata.documentSection
      })
    })
  })

  return questions
}

export function loadQuizQuestions(): QuizQuestion[] {
  const quizPath = path.join(process.cwd(), 'docs', 'quiz-template.md')
  const fileContents = fs.readFileSync(quizPath, 'utf8')
  return parseQuizMarkdown(fileContents)
}