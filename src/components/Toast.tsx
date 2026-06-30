import { AnimatePresence, motion } from 'framer-motion'

interface ToastProps {
  message: string
  type?: 'error' | 'success'
  show: boolean
  onDismiss: () => void
}

export function Toast({ message, type = 'error', show, onDismiss }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:w-auto sm:max-w-none"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <div
            className={`flex items-center gap-3 rounded-xl px-5 py-3 shadow-lg ${
              type === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
            }`}
          >
            <span className="text-sm font-medium">{message}</span>
            <button onClick={onDismiss} className="ml-2 opacity-80 hover:opacity-100" aria-label="Dismiss">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
