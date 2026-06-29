import { motion } from 'framer-motion'
import { Button } from './Button'
import { Spinner } from './Spinner'

interface VoteButtonsProps {
  onVote: (vote: 'like' | 'dislike') => void
  disabled?: boolean
  loading?: boolean
  pendingVote?: 'like' | 'dislike' | null
}

export function VoteButtons({ onVote, disabled, loading, pendingVote }: VoteButtonsProps) {
  return (
    <div className="mt-6 flex gap-4">
      <motion.div whileTap={disabled ? {} : { scale: 0.95 }} whileHover={disabled ? {} : { scale: 1.02 }} className="flex-1">
        <Button
          variant="like"
          className="relative w-full py-4 text-base"
          disabled={disabled}
          onClick={() => onVote('like')}
        >
          {loading && pendingVote === 'like' ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" className="border-white/30 border-t-white" />
              Saving…
            </span>
          ) : (
            'Like'
          )}
        </Button>
      </motion.div>
      <motion.div whileTap={disabled ? {} : { scale: 0.95 }} whileHover={disabled ? {} : { scale: 1.02 }} className="flex-1">
        <Button
          variant="dislike"
          className="w-full py-4 text-base"
          disabled={disabled}
          onClick={() => onVote('dislike')}
        >
          {loading && pendingVote === 'dislike' ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" className="border-white/30 border-t-white" />
              Saving…
            </span>
          ) : (
            'Dislike'
          )}
        </Button>
      </motion.div>
    </div>
  )
}
