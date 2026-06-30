import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, ROUNDS } from '../lib/api'
import { Badge } from './Badge'
import type { LeaderboardRow } from '../types'

const optionLabels = ['A', 'B', 'C', 'D', 'E']

interface Props {
  questions: LeaderboardRow[]
  showAnswers?: boolean
}

function QuestionCell({ row, compact }: { row: LeaderboardRow; compact?: boolean }) {
  const options = row.options ?? row.content?.options

  return (
    <div className={compact ? 'min-w-0' : 'max-w-md'}>
      <p className="whitespace-pre-wrap break-words text-gray-900">{row.text}</p>
      {options && options.length > 0 && (
        <ul className="mt-2 space-y-1">
          {options.map((opt, i) => (
            <li key={i} className="break-words rounded bg-gray-50 px-2 py-1 text-xs text-gray-600">
              <span className="mr-1.5 font-medium text-gray-400">{optionLabels[i]}.</span>
              {opt}
            </li>
          ))}
        </ul>
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
          <QuestionCell row={row} compact />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge className={CATEGORIES[row.category].color}>{CATEGORIES[row.category].label}</Badge>
            {showAnswers && (
              <span className="text-xs text-gray-500">
                Answer: <strong>{row.answer_key ?? '—'}</strong>
              </span>
            )}
          </div>
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

function RoundSection({
  title,
  limit,
  rows,
  showAnswers,
}: {
  title: string
  limit: number
  rows: LeaderboardRow[]
  showAnswers?: boolean
}) {
  const top = rows.filter((r) => r.selected).slice(0, limit)

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-base font-bold text-gray-900 sm:text-lg">
        {title}{' '}
        <span className="text-sm font-normal text-gray-500">
          ({top.length}/{limit} selected)
        </span>
      </h2>

      {/* Mobile: card layout */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:hidden">
        {top.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            No questions selected yet — start voting!
          </p>
        ) : (
          top.map((row, i) => <MobileCard key={row.id} row={row} index={i} showAnswers={showAnswers} />)
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Category</th>
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
                  <td className="px-4 py-3">
                    <Badge className={CATEGORIES[row.category].color}>{CATEGORIES[row.category].label}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center text-emerald-600">{row.likes}</td>
                  <td className="px-4 py-3 text-center text-red-500">{row.dislikes}</td>
                  <td className="px-4 py-3 text-center font-semibold">{row.net_score}</td>
                  {showAnswers && <td className="px-4 py-3 text-gray-500">{row.answer_key ?? '—'}</td>}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {top.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            No questions selected yet — start voting!
          </p>
        )}
      </div>
    </section>
  )
}

export function LeaderboardTable({ questions, showAnswers }: Props) {
  const easy = questions.filter((q) => q.difficulty === 'easy')
  const medium = questions.filter((q) => q.difficulty === 'medium')
  const difficult = questions.filter((q) => q.difficulty === 'difficult')

  return (
    <div>
      <RoundSection title={ROUNDS[0].label} limit={20} rows={easy} showAnswers={showAnswers} />
      <RoundSection title={ROUNDS[1].label} limit={15} rows={medium} showAnswers={showAnswers} />
      <RoundSection title={ROUNDS[2].label} limit={10} rows={difficult} showAnswers={showAnswers} />
    </div>
  )
}
