import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HowItWorks } from '../components/HowItWorks'
import { LeaderboardTable } from '../components/LeaderboardTable'
import { Layout } from '../components/Layout'
import { PageTabs } from '../components/PageTabs'
import { SkeletonTable } from '../components/Skeleton'
import { Spinner } from '../components/Spinner'
import { fetchLeaderboard, fetchTiebreakerLeaderboard, TIEBREAKER_ROUND_LIMITS } from '../lib/api'
import type { QuestionPool } from '../types'
export function LeaderboardPage() {
  const [tab, setTab] = useState<QuestionPool>('competition')
  const [showAnswers, setShowAnswers] = useState(false)

  const competition = useQuery({
    queryKey: ['leaderboard', 'competition'],
    queryFn: () => fetchLeaderboard(),
    enabled: tab === 'competition',
  })

  const tiebreaker = useQuery({
    queryKey: ['leaderboard', 'tiebreaker'],
    queryFn: () => fetchTiebreakerLeaderboard(),
    enabled: tab === 'tiebreaker',
  })

  const active = tab === 'competition' ? competition : tiebreaker
  const { isLoading, error, refetch, isFetching } = active

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HowItWorks variant="leaderboard" />

        <div className="mb-6 flex flex-col gap-4">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Leaderboard</h1>

          <PageTabs
            tabs={[
              { id: 'competition', label: 'Leaderboard' },
              { id: 'tiebreaker', label: 'Tie breaking' },
            ]}
            value={tab}
            onChange={setTab}
            layoutId="leaderboard-pool-tab"
          />

          <div className="flex items-center justify-between gap-4">
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
        {tab === 'competition' && competition.data && (
          <LeaderboardTable questions={competition.data.questions} showAnswers={showAnswers} />
        )}
        {tab === 'tiebreaker' && tiebreaker.data && (
          <LeaderboardTable
            questions={tiebreaker.data.questions}
            showAnswers={showAnswers}
            roundLimits={TIEBREAKER_ROUND_LIMITS}
            hideCategory
            emptyMessage="No tie breaking questions selected yet — start voting!"
          />
        )}      </motion.div>
    </Layout>
  )
}
