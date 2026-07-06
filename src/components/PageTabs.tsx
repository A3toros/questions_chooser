import { motion } from 'framer-motion'
import { cn } from '../lib/cn'

interface Tab<T extends string> {
  id: T
  label: string
}

interface PageTabsProps<T extends string> {
  tabs: Tab<T>[]
  value: T
  onChange: (v: T) => void
  layoutId: string
  className?: string
}

export function PageTabs<T extends string>({ tabs, value, onChange, layoutId, className }: PageTabsProps<T>) {
  return (
    <div className={cn('-mx-4 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:overflow-visible sm:px-0', className)}>
      <div className="inline-flex flex-nowrap gap-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
              value === tab.id ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {value === tab.id && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-white shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
