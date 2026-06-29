import { motion } from 'framer-motion'

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-2">
        <motion.div
          className="h-6 w-20 rounded-full bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-6 w-24 rounded-full bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />
      </div>
      <motion.div
        className="mb-2 h-4 w-full rounded bg-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.15 }}
      />
      <motion.div
        className="h-4 w-3/4 rounded bg-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="h-12 rounded-xl bg-gray-200"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}
    </div>
  )
}
