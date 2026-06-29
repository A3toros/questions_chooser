import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface HowItWorksProps {
  variant: 'choosing' | 'leaderboard'
}

export function HowItWorks({ variant }: HowItWorksProps) {
  if (variant === 'leaderboard') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border border-teal-100 bg-teal-50/60 px-5 py-4 text-sm text-gray-700"
      >
        <p>
          <strong className="text-gray-900">Live rankings</strong> — questions rise and fall as teachers vote.
          The top <strong>20 Easy</strong>, <strong>15 Medium</strong>, and <strong>10 Hard</strong> questions
          (by likes minus dislikes) are marked as selected for the competition.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-white px-5 py-5 shadow-sm"
    >
      <h2 className="text-base font-semibold text-gray-900">How it works</h2>
      <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-gray-700">
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">1</span>
          <span>
            <strong className="text-gray-900">Review every question</strong> — go through each{' '}
            <strong>category</strong> (Grammar, Vocabulary, etc.) and each{' '}
            <strong>difficulty level</strong> (Easy, Medium, Hard) using the tabs below.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">2</span>
          <span>
            <strong className="text-gray-900">Like or Dislike</strong> each question you think should (or should not)
            be used in the competition. Your vote is saved immediately.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</span>
          <span>
            The <strong className="text-gray-900">best-scoring questions</strong> in each round are automatically
            chosen — <strong>20 Easy</strong>, <strong>15 Medium</strong>, <strong>10 Hard</strong>.
            Track live updates on the{' '}
            <Link to="/leaderboard" className="font-medium text-primary underline-offset-2 hover:underline">
              Leaderboard
            </Link>.
          </span>
        </li>
      </ol>
    </motion.div>
  )
}
