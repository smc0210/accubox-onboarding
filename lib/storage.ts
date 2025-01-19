import { UserSession } from './types';

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

const USER_SESSION_KEY = 'user_session';

export const getUserSession = (): UserSession | null => {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem(USER_SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const setUserSession = (name: string) => {
  const session: UserSession = {
    name,
    startTime: new Date().toISOString(),
  };
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
};

export const clearUserSession = () => {
  localStorage.removeItem(USER_SESSION_KEY);
};