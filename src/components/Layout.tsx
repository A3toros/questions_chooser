import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../lib/cn'

export function Layout({ children, onAddQuestions }: { children: React.ReactNode; onAddQuestions?: () => void }) {
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Choosing' },
    { to: '/leaderboard', label: 'Leaderboard' },
  ]

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-xl font-bold text-primary transition-opacity hover:opacity-80">
            VocabForm
          </Link>
          <nav className="flex items-center gap-2">
            {links.map(({ to, label }) => {
              const active = pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active ? 'text-primary' : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-teal-50"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              )
            })}
            {onAddQuestions && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={onAddQuestions}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600"
              >
                + Add questions
              </motion.button>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  )
}
