import { motion } from 'framer-motion'
import { CATEGORIES, ROUNDS, getBankLabel, showBankBadge } from '../lib/api'
import { Badge } from './Badge'
import { Card } from './Card'
import type { Question } from '../types'

const optionLabels = ['A', 'B', 'C', 'D', 'E']

export function QuestionCard({ question }: { question: Question }) {
  const cat = CATEGORIES[question.category]
  const round = ROUNDS.find((r) => r.id === question.content.difficulty)
  const bankLabel = getBankLabel(question.bank)

  return (
    <Card>
      <div className="mb-4 flex flex-wrap gap-2">
        {showBankBadge(question.bank) && (
          <Badge className="bg-gray-100 text-gray-700">{bankLabel}</Badge>
        )}
        <Badge className={cat.color}>{cat.label}</Badge>
        {round && <Badge className={round.color}>{round.label}</Badge>}
      </div>
      <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-900">{question.content.text}</p>
      {question.content.options && question.content.options.length > 0 && (
        <motion.ul
          className="mt-5 space-y-2"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {question.content.options.map((opt, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
              className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
            >
              <span className="mr-2 font-semibold text-gray-500">{optionLabels[i]}.</span>
              {opt}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </Card>
  )
}
