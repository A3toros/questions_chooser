import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../lib/cn'

export function Layout({ children, onAddQuestions }: { children: React.ReactNode; onAddQuestions?: () => void }) {
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Choosing' },
    { to: '/leaderboard', label: 'Leaderboard' },
  ]

  const navLinkClass = (active: boolean) =>
    cn(
      'relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors',
      active ? 'text-primary' : 'text-gray-600 hover:bg-gray-100'
    )

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
          <Link to="/" className="text-lg font-bold text-primary transition-opacity hover:opacity-80 sm:text-xl">
            VocabForm
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {links.map(({ to, label }) => {
              const active = pathname === to
              return (
                <Link key={to} to={to} className={navLinkClass(active)}>
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
                aria-label="Add questions"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-white shadow-sm hover:bg-teal-600 sm:px-4"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">+ Add questions</span>
              </motion.button>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl overflow-x-hidden px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:py-8">
        {children}
      </main>
    </div>
  )
}
