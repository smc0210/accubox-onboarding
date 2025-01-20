import { QuizQuestion } from '@/lib/types'
import { loadQuizzesByCategory } from '@/lib/utils/quiz'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    console.log('\n=== Quiz API Request ===')
    console.log('Category:', category)

    const quizzes = loadQuizzesByCategory()

    console.log('\n=== Available Categories ===')
    console.log(Object.keys(quizzes))

    let response;
    if (category) {
      response = quizzes[category] || []
      console.log(`\n=== Questions for category: ${category} ===`)
      console.log('Number of questions:', response.length)
      response.forEach((q, i) => {
        console.log(`\nQuestion ${i + 1}:`)
        console.log('- Question:', q.question)
        console.log('- Options:', q.options)
        console.log('- Answer:', q.answer)
      })
    } else {
      response = Object.values(quizzes).flat()
      console.log('\n=== All Questions ===')
      console.log('Total number of questions:', response.length)
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in quiz API:', error)
    return NextResponse.json({ error: 'Failed to load quiz questions' }, { status: 500 })
  }
}