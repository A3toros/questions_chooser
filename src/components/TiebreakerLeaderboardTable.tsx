import { motion, AnimatePresence } from 'framer-motion'
import type { LeaderboardRow } from '../types'

interface Props {
  questions: LeaderboardRow[]
  limit: number
  showAnswers?: boolean
}

function QuestionCell({ row, showAnswer }: { row: LeaderboardRow; showAnswer?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="whitespace-pre-wrap break-words text-gray-900">{row.text}</p>
      {showAnswer && row.answer_key && (
        <p className="mt-2 text-xs text-gray-500">
          Answer: <strong className="text-gray-700">{row.answer_key}</strong>
        </p>
      )}
    </div>
  )
}

function MobileCard({
  row,
  index,
  showAnswers,
}: {
  row: LeaderboardRow
  index: number
  showAnswers?: boolean
}) {
  return (
    <div className="border-b border-gray-50 p-4 last:border-0">
      <div className="flex gap-3">
        <span className="shrink-0 pt-0.5 text-sm font-semibold text-gray-400">#{index + 1}</span>
        <div className="min-w-0 flex-1">
          <QuestionCell row={row} showAnswer={showAnswers} />
          <div className="mt-2 flex gap-4 text-sm">
            <span className="font-medium text-emerald-600">👍 {row.likes}</span>
            <span className="font-medium text-red-500">👎 {row.dislikes}</span>
            <span className="font-semibold text-gray-700">
              Net {row.net_score > 0 ? '+' : ''}{row.net_score}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TiebreakerLeaderboardTable({ questions, limit, showAnswers }: Props) {
  const top = questions.filter((r) => r.selected).slice(0, limit)

  return (
    <section>
      <h2 className="mb-4 text-base font-bold text-gray-900 sm:text-lg">
        Tie breaking{' '}
        <span className="text-sm font-normal text-gray-500">
          ({top.length}/{limit} selected)
        </span>
      </h2>
      <p className="mb-4 text-sm text-gray-500">
        Free-answer questions ranked by teacher votes. Top {limit} are selected for tie-break rounds.
      </p>

      {/* Mobile cards */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:hidden">
        {top.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            No tie breaking questions selected yet — start voting!
          </p>
        ) : (
          top.map((row, i) => <MobileCard key={row.id} row={row} index={i} showAnswers={showAnswers} />)
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3 text-center">Likes</th>
              <th className="px-4 py-3 text-center">Dislikes</th>
              <th className="px-4 py-3 text-center">Net</th>
              {showAnswers && <th className="px-4 py-3">Answer</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {top.map((row, i) => (
                <motion.tr
                  key={row.id}
                  layout
                  initial={{ backgroundColor: '#ecfdf5' }}
                  animate={{ backgroundColor: '#ffffff' }}
                  transition={{ duration: 0.6 }}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    <QuestionCell row={row} />
                  </td>
                  <td className="px-4 py-3 text-center text-emerald-600">{row.likes}</td>
                  <td className="px-4 py-3 text-center text-red-500">{row.dislikes}</td>
                  <td className="px-4 py-3 text-center font-semibold">{row.net_score}</td>
                  {showAnswers && (
                    <td className="px-4 py-3 text-gray-500">{row.answer_key ?? '—'}</td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {top.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            No tie breaking questions selected yet — start voting!
          </p>
        )}
      </div>
    </section>
  )
}
