import { cn } from '../lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'like' | 'dislike' | 'ghost' | 'outline'
}

const variants = {
  primary: 'bg-primary text-white hover:bg-teal-600 shadow-sm',
  like: 'bg-like text-white hover:bg-emerald-600 shadow-sm',
  dislike: 'bg-dislike text-white hover:bg-red-600 shadow-sm',
  ghost: 'text-gray-600 hover:bg-gray-100',
  outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 min-h-11',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
