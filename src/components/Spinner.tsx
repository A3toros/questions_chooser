import { motion } from 'framer-motion'
import { cn } from '../lib/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-[3px]', lg: 'h-12 w-12 border-4' }

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <motion.div
      className={cn('rounded-full border-primary/30 border-t-primary', sizes[size], className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )
}
