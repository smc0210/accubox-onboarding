import { QuizQuestion } from '@/lib/types'
import fs from 'fs'
import path from 'path'

const QUIZ_FILES = {
  DOMAIN: 'docs/quiz/domain.md',
  KOTLIN: 'docs/quiz/kotlin.md',
  LOAN_ORIGINATION: 'docs/quiz/loan-origination.md'
} as const;

export function parseQuizMarkdown(content: string): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  const sections = content.split('\n## ').filter(Boolean)

  console.log('Parsing sections:', sections.length)

  sections.forEach(section => {
    const questionBlocks = section.split('\n### ').filter(Boolean)
    console.log('Found question blocks:', questionBlocks.length)

    questionBlocks.forEach(block => {
      const questionMatch = block.match(/^Q\d+\. (.+?)(?=\n|$)/)
      if (!questionMatch) {
        console.log('No question match found in block:', block.slice(0, 100))
        return
      }

      const id = block.match(/Q(\d+)/)?.[1] || ''
      const question = questionMatch[1].trim()
      console.log(`Processing question ${id}:`, question)

      const metadata: Record<string, string | string[]> = {}
      const lines = block.split('\n')

      let isParsingOptions = false
      const options: string[] = []

      lines.forEach(line => {
        const trimmedLine = line.trim()
        if (trimmedLine.startsWith('- options:')) {
          console.log('Started parsing options')
          isParsingOptions = true
        } else if (isParsingOptions && trimmedLine.startsWith('- ') && !line.startsWith('  ')) {
          console.log('Finished parsing options, found:', options.length)
          isParsingOptions = false
          metadata[trimmedLine.replace('- ', '').split(': ')[0]] = trimmedLine.replace('- ', '').split(': ').slice(1).join(': ').trim()
        } else if (isParsingOptions && trimmedLine.startsWith('- ')) {
          const option = trimmedLine.replace('- ', '')
          console.log('Found option:', option)
          options.push(option)
        } else if (!isParsingOptions && trimmedLine.startsWith('- ')) {
          const [key, ...values] = line.replace('- ', '').split(': ')
          metadata[key] = values.join(': ').trim()
        }
      })

      const questionData = {
        id: `q${id}`,
        question,
        category: metadata.category as QuizQuestion['category'],
        type: metadata.type as 'multiple' | 'short',
        options,
        answer: metadata.answer as string,
        explanation: metadata.explanation as string,
        documentUrl: metadata.documentUrl as string,
        documentSection: metadata.documentSection as string
      }

      console.log('Final question data:', questionData)
      questions.push(questionData)
    })
  })

  return questions
}

export function loadQuizzesByCategory(): Record<string, QuizQuestion[]> {
  return {
    domain: parseQuizMarkdown(fs.readFileSync(path.join(process.cwd(), QUIZ_FILES.DOMAIN), 'utf8')),
    kotlin: parseQuizMarkdown(fs.readFileSync(path.join(process.cwd(), QUIZ_FILES.KOTLIN), 'utf8')),
    'loan-origination': parseQuizMarkdown(fs.readFileSync(path.join(process.cwd(), QUIZ_FILES.LOAN_ORIGINATION), 'utf8'))
  };
}