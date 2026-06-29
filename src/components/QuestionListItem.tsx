import { motion } from 'framer-motion'
import { CATEGORIES, getBankLabel, showBankBadge } from '../lib/api'
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
  const cat = CATEGORIES[question.category]
  const bankLabel = getBankLabel(question.bank)
  const myVote = question.my_vote

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className={cn(
        'rounded-2xl border bg-white p-5 shadow-sm transition-shadow',
        myVote === 'like' && 'border-emerald-200 ring-1 ring-emerald-100',
        myVote === 'dislike' && 'border-red-200 ring-1 ring-red-100',
        !myVote && 'border-gray-200'
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400">#{index + 1}</span>
            {showBankBadge(question.bank) && (
              <Badge className="bg-gray-100 text-gray-700">{bankLabel}</Badge>
            )}
            <Badge className={cat.color}>{cat.label}</Badge>
          </div>
          <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-900">{question.content.text}</p>
          {question.content.options && question.content.options.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {question.content.options.map((opt, i) => (
                <li key={i} className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  <span className="mr-2 font-medium text-gray-400">{optionLabels[i]}.</span>
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium text-emerald-600">👍 {question.likes}</span>
            <span className="font-medium text-red-500">👎 {question.dislikes}</span>
            <span className="rounded-lg bg-gray-100 px-2 py-0.5 font-semibold text-gray-700">
              {question.net_score > 0 ? '+' : ''}{question.net_score}
            </span>
          </div>

          <div className="flex gap-2">
            <motion.div whileTap={saving ? {} : { scale: 0.95 }}>
              <Button
                variant={myVote === 'like' ? 'like' : 'outline'}
                className={cn('min-w-[88px] py-2', myVote === 'like' && 'ring-2 ring-emerald-300')}
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
            <motion.div whileTap={saving ? {} : { scale: 0.95 }}>
              <Button
                variant={myVote === 'dislike' ? 'dislike' : 'outline'}
                className={cn('min-w-[88px] py-2', myVote === 'dislike' && 'ring-2 ring-red-300')}
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
