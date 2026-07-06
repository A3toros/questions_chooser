import { motion } from 'framer-motion'
import { CATEGORIES } from '../lib/api'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'
import { Spinner } from './Spinner'
import type { Question, Vote } from '../types'

const optionLabels = ['A', 'B', 'C', 'D', 'E']

interface QuestionListItemProps {
  question: Question
  index: number
  saving: boolean
  pendingVote?: Vote | null
  onVote: (vote: Vote) => void
}

export function QuestionListItem({ question, index, saving, pendingVote, onVote }: QuestionListItemProps) {
  const isTiebreaker = question.content.isTiebreaker === true
  const cat = CATEGORIES[question.category]
  const myVote = question.my_vote

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className={cn(
        'rounded-2xl border bg-white p-4 shadow-sm transition-shadow sm:p-5',
        myVote === 'like' && 'border-emerald-200 ring-1 ring-emerald-100',
        myVote === 'dislike' && 'border-red-200 ring-1 ring-red-100',
        !myVote && 'border-gray-200'
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400">#{index + 1}</span>
            {isTiebreaker ? (
              <Badge className="bg-purple-100 text-purple-800">Tie breaking</Badge>
            ) : (
              <Badge className={cat.color}>{cat.label}</Badge>
            )}
          </div>
          <p className="whitespace-pre-wrap break-words text-base leading-relaxed text-gray-900">
            {question.content.text}
          </p>
          {question.content.options && question.content.options.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {question.content.options.map((opt, i) => (
                <li key={i} className="break-words rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  <span className="mr-2 font-medium text-gray-400">{optionLabels[i]}.</span>
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:shrink-0 sm:items-end">
          <div className="flex items-center justify-center gap-4 text-sm sm:justify-end sm:gap-3">
            <span className="font-medium text-emerald-600">👍 {question.likes}</span>
            <span className="font-medium text-red-500">👎 {question.dislikes}</span>
            <span className="rounded-lg bg-gray-100 px-2 py-0.5 font-semibold text-gray-700">
              {question.net_score > 0 ? '+' : ''}{question.net_score}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            <motion.div whileTap={saving ? {} : { scale: 0.95 }} className="min-w-0">
              <Button
                variant={myVote === 'like' ? 'like' : 'outline'}
                className={cn(
                  'min-h-11 w-full py-2.5 sm:min-w-[88px] sm:w-auto',
                  myVote === 'like' && 'ring-2 ring-emerald-300'
                )}
                disabled={saving}
                onClick={() => onVote('like')}
              >
                {saving && pendingVote === 'like' ? (
                  <Spinner size="sm" className={myVote === 'like' ? 'border-white/30 border-t-white' : ''} />
                ) : (
                  'Like'
                )}
              </Button>
            </motion.div>
            <motion.div whileTap={saving ? {} : { scale: 0.95 }} className="min-w-0">
              <Button
                variant={myVote === 'dislike' ? 'dislike' : 'outline'}
                className={cn(
                  'min-h-11 w-full py-2.5 sm:min-w-[88px] sm:w-auto',
                  myVote === 'dislike' && 'ring-2 ring-red-300'
                )}
                disabled={saving}
                onClick={() => onVote('dislike')}
              >
                {saving && pendingVote === 'dislike' ? (
                  <Spinner size="sm" className={myVote === 'dislike' ? 'border-white/30 border-t-white' : ''} />
                ) : (
                  'Dislike'
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
