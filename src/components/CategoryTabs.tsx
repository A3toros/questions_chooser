import { motion } from 'framer-motion'
import { CATEGORIES, ROUNDS } from '../lib/api'
import { cn } from '../lib/cn'
import type { Category, Difficulty } from '../types'

interface TabProps<T extends string> {
  items: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
  layoutId: string
  disabled?: boolean
}

function Tabs<T extends string>({ items, value, onChange, layoutId, disabled }: TabProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => !disabled && onChange(item.id)}
          disabled={disabled}
          className={cn(
            'relative rounded-xl px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50',
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
          <span className="relative z-10">{item.label}</span>
        </button>
      ))}
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
  const items = Object.entries(CATEGORIES).map(([id, { label }]) => ({ id: id as Category, label }))
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
  return <Tabs items={ROUNDS} value={value} onChange={onChange} layoutId="round-tab" disabled={disabled} />
}
