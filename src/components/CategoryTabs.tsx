import { motion } from 'framer-motion'
import { CATEGORIES, ROUNDS } from '../lib/api'
import { cn } from '../lib/cn'
import type { Category, Difficulty } from '../types'

const SHORT_LABELS: Partial<Record<Category, string>> = {
  general_knowledge: 'GK',
  conversation_completion: 'Conv.',
  pronunciation: 'Pronun.',
  pop_culture: 'Pop',
}

interface TabProps<T extends string> {
  items: { id: T; label: string; shortLabel?: string }[]
  value: T
  onChange: (v: T) => void
  layoutId: string
  disabled?: boolean
}

function Tabs<T extends string>({ items, value, onChange, layoutId, disabled }: TabProps<T>) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
      <div className="flex flex-nowrap gap-2 pb-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !disabled && onChange(item.id)}
            disabled={disabled}
            className={cn(
              'relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50',
              value === item.id ? 'text-primary' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            {value === item.id && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-xl bg-teal-50 ring-1 ring-teal-100"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 sm:hidden">{item.shortLabel ?? item.label}</span>
            <span className="relative z-10 hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function CategoryTabs({
  value,
  onChange,
  disabled,
}: {
  value: Category
  onChange: (c: Category) => void
  disabled?: boolean
}) {
  const items = Object.entries(CATEGORIES).map(([id, { label }]) => ({
    id: id as Category,
    label,
    shortLabel: SHORT_LABELS[id as Category],
  }))
  return <Tabs items={items} value={value} onChange={onChange} layoutId="category-tab" disabled={disabled} />
}

export function RoundTabs({
  value,
  onChange,
  disabled,
}: {
  value: Difficulty
  onChange: (d: Difficulty) => void
  disabled?: boolean
}) {
  const items = ROUNDS.map((r) => ({
    id: r.id,
    label: r.label,
    shortLabel: r.id === 'easy' ? 'Easy' : r.id === 'medium' ? 'Medium' : 'Hard',
  }))
  return <Tabs items={items} value={value} onChange={onChange} layoutId="round-tab" disabled={disabled} />
}
