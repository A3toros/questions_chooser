import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HowItWorks } from '../components/HowItWorks'
import { LeaderboardTable } from '../components/LeaderboardTable'
import { Layout } from '../components/Layout'
import { SkeletonTable } from '../components/Skeleton'
import { Spinner } from '../components/Spinner'
import { BANKS, fetchLeaderboard } from '../lib/api'
import type { Bank } from '../types'

export function LeaderboardPage() {
  const [bank, setBank] = useState<Bank | ''>('')
  const [showAnswers, setShowAnswers] = useState(false)

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['leaderboard', bank],
    queryFn: () => fetchLeaderboard(bank || undefined),
  })

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HowItWorks variant="leaderboard" />

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          <select
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
            value={bank}
            onChange={(e) => setBank(e.target.value as Bank | '')}
          >
            <option value="">All banks</option>
            {BANKS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} />
            Show answers
          </label>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="ml-auto flex items-center gap-2 text-sm font-medium text-primary hover:underline disabled:opacity-50"
          >
            {isFetching && <Spinner size="sm" />}
            Refresh
          </button>
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
