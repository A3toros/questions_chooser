import { AnimatePresence, motion } from 'framer-motion'
import { Spinner } from './Spinner'
import type { Vote } from '../types'

interface VoteSavingOverlayProps {
  show: boolean
  vote?: Vote | null
  success?: boolean
}

export function VoteSavingOverlay({ show, vote, success }: VoteSavingOverlayProps) {
  const label =
    success
      ? vote === 'like'
        ? 'Liked!'
        : 'Disliked!'
      : 'Saving vote to database…'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {!success ? (
            <>
              <Spinner size="lg" />
              <motion.p
                className="mt-4 text-sm font-medium text-gray-700"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {label}
              </motion.p>
              <motion.div
                className="mt-3 flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex flex-col items-center"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                  vote === 'like' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {vote === 'like' ? (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-800">{label}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
