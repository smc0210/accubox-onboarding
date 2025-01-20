import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from './card'

interface StepProps {
  step: number
  title: string
  description: string
  href: string
}

export function Step({ step, title, description, href }: StepProps) {
  return (
    <Link href={href} className="block mt-6">
      <Card className="cursor-pointer hover:bg-accent transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-primary text-primary-foreground">
              {step}
            </span>
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}