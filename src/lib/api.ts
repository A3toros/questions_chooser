import type { Bank, Category, Difficulty, Question, QuestionContent, Vote } from '../types'

export const BANKS: { id: Bank; label: string }[] = [
  { id: 'core', label: 'Core' },
  { id: 'literacy', label: 'Literacy' },
  { id: 'mixed', label: 'Mixed' },
  { id: 'tournament', label: 'Tournament' },
  { id: 'set4', label: 'Set 4' },
  { id: 'set5', label: 'Set 5' },
]

export const CATEGORIES: Record<Category, { label: string; color: string }> = {
  grammar: { label: 'Grammar', color: 'bg-violet-100 text-violet-800' },
  vocabulary: { label: 'Vocabulary', color: 'bg-teal-100 text-teal-800' },
  general_knowledge: { label: 'General Knowledge', color: 'bg-sky-100 text-sky-800' },
  spelling: { label: 'Spelling', color: 'bg-amber-100 text-amber-800' },
  conversation_completion: { label: 'Conversation', color: 'bg-pink-100 text-pink-800' },
  pronunciation: { label: 'Pronunciation', color: 'bg-indigo-100 text-indigo-800' },
  pop_culture: { label: 'Pop Culture', color: 'bg-orange-100 text-orange-800' },
}

export const CORE_CATEGORIES: Category[] = ['grammar', 'vocabulary', 'general_knowledge']

export const ROUNDS: { id: Difficulty; label: string; color: string }[] = [
  { id: 'easy', label: 'Round 1 · Easy', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'medium', label: 'Round 2 · Medium', color: 'bg-blue-100 text-blue-800' },
  { id: 'difficult', label: 'Round 3 · Hard', color: 'bg-amber-100 text-amber-800' },
]

/** Banks where the source set label is hidden in the UI */
const HIDDEN_BANK_BADGES: Bank[] = ['tournament']

export function showBankBadge(bank: Bank): boolean {
  return !HIDDEN_BANK_BADGES.includes(bank)
}

export function getBankLabel(bank: Bank): string {
  return BANKS.find((b) => b.id === bank)?.label ?? bank
}

/** All teacher-added questions go to this bank (seed set 2 — mixed) */
export const ADD_QUESTIONS_BANK: Bank = 'mixed'

const API = import.meta.env.VITE_API_BASE ?? '/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30_000)

  try {
    const res = await fetch(`${API}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      if (res.status === 504) {
        throw new Error(
          'API timed out (504). Use http://localhost:8888 with npm run dev:netlify, or npm run dev:local for Vite + API.'
        )
      }
      throw new Error(err.error ?? `Request failed (${res.status})`)
    }
    return res.json()
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error('Request timed out — is the API server running? Try: npm run dev:netlify')
    }
    throw e
  } finally {
    clearTimeout(timer)
  }
}

export function fetchQuestions(params: {
  bank?: Bank
  category?: Category
  difficulty?: Difficulty
  teacherId: string
  unrated?: boolean
  all?: boolean
  tiebreaker?: boolean
}) {
  const q = new URLSearchParams({ teacherId: params.teacherId })
  if (params.category) q.set('category', params.category)
  if (params.difficulty) q.set('difficulty', params.difficulty)
  if (params.bank) q.set('bank', params.bank)
  if (params.unrated) q.set('unrated', 'true')
  if (params.all) q.set('all', 'true')
  if (params.tiebreaker === true) q.set('tiebreaker', 'true')
  else if (params.tiebreaker === false) q.set('tiebreaker', 'false')
  return request<{ questions: Question[] }>(`/questions?${q}`)
}

export function submitVote(questionId: string, teacherId: string, vote: Vote) {
  return request<{ question: Question; vote: Vote }>('/ratings', {
    method: 'POST',
    body: JSON.stringify({ questionId, teacherId, vote }),
  })
}

export function bulkAddQuestions(
  questions: { bank: Bank; category: Category; content: QuestionContent }[]
) {
  return request<{ questions: Question[] }>('/questions', {
    method: 'POST',
    body: JSON.stringify({ questions }),
  })
}

export function fetchLeaderboard() {
  return request<{
    rounds: Record<string, Question[]>
    questions: import('../types').LeaderboardRow[]
    limits: Record<Difficulty, number>
  }>('/leaderboard')
}

export function fetchTiebreakerLeaderboard() {
  return request<{
    questions: import('../types').LeaderboardRow[]
    limit: number
  }>('/leaderboard?type=tiebreaker')
}

export function parseQuestions(text: string): string[] {
  const blocks = text.split(/\n\s*\n+/).map((b) => b.trim()).filter(Boolean)
  if (blocks.length > 1) return blocks
  return text.split('\n').map((l) => l.trim()).filter(Boolean)
}
