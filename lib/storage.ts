export interface OnboardingState {
  checklist: { id: string; completed: boolean }[]
  progress: number
}

const STORAGE_KEY = 'onboarding-state'

export const getOnboardingState = (): OnboardingState => {
  if (typeof window === 'undefined') return { checklist: [], progress: 0 }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return { checklist: [], progress: 0 }

  return JSON.parse(stored)
}

export const updateOnboardingState = (state: OnboardingState) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}