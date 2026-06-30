import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HowItWorks } from '../components/HowItWorks'
import { LeaderboardTable } from '../components/LeaderboardTable'
import { Layout } from '../components/Layout'
import { SkeletonTable } from '../components/Skeleton'
import { Spinner } from '../components/Spinner'
import { fetchLeaderboard } from '../lib/api'

export function LeaderboardPage() {
  const [showAnswers, setShowAnswers] = useState(false)

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => fetchLeaderboard(),
  })

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HowItWorks variant="leaderboard" />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Leaderboard</h1>
          <div className="flex items-center justify-between gap-4 sm:ml-auto">
            <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} />
              Show answers
            </label>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline disabled:opacity-50"
            >
              {isFetching && <Spinner size="sm" />}
              Refresh
            </button>
          </div>
        </div>

        {isLoading && <SkeletonTable />}
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600">
            {error.message}
          </motion.p>
        )}
        {data && <LeaderboardTable questions={data.questions} showAnswers={showAnswers} />}
      </motion.div>
    </Layout>
  )
}
