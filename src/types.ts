export type Bank = 'core' | 'literacy' | 'mixed' | 'tournament' | 'set4' | 'set5'

export type Category =
  | 'grammar'
  | 'vocabulary'
  | 'general_knowledge'
  | 'spelling'
  | 'conversation_completion'
  | 'pronunciation'
  | 'pop_culture'

export type Difficulty = 'easy' | 'medium' | 'difficult'
export type Vote = 'like' | 'dislike'
export type QuestionPool = 'competition' | 'tiebreaker'

export interface QuestionContent {
  text: string
  difficulty: Difficulty
  options?: string[]
  answerKey?: string
  number?: number
  isBonus?: boolean
  isTiebreaker?: boolean
}

export interface Question {
  id: string
  bank: Bank
  category: Category
  content: QuestionContent
  likes: number
  dislikes: number
  net_score: number
  my_vote?: Vote | null
}

export interface LeaderboardRow {
  id: string
  bank: Bank
  category: Category
  content: QuestionContent
  likes: number
  dislikes: number
  net_score: number
  text: string
  difficulty: Difficulty
  options: string[] | null
  answer_key: string | null
  rank: number
  selected: boolean
}

export interface Photo {
  id: string
  storage_path: string
  url: string
  width: number
  height: number
  mime_type: string | null
  created_at: string
}
