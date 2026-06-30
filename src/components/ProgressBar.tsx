import { motion } from 'framer-motion'

interface ProgressBarProps {
  rated: number
  total: number
  label?: string
}

export function ProgressBar({ rated, total, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((rated / total) * 100) : 0

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex justify-between gap-2 text-xs text-gray-500">
          <span className="min-w-0 truncate">{label}</span>
          <span className="shrink-0">{rated}/{total} rated ({pct}%)</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
