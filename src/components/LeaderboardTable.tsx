import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, ROUNDS } from '../lib/api'
import { Badge } from './Badge'
import type { LeaderboardRow } from '../types'

interface Props {
  questions: LeaderboardRow[]
  showAnswers?: boolean
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
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        {title} <span className="text-sm font-normal text-gray-500">({top.length}/{limit} selected)</span>
      </h2>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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
                  <td className="max-w-xs truncate px-4 py-3 text-gray-900" title={row.text}>{row.text}</td>
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
          <p className="px-4 py-8 text-center text-sm text-gray-500">No questions selected yet — start voting!</p>
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
