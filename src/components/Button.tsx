import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant
  children: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 hover:from-rose-600 hover:to-pink-600',
  secondary:
    'bg-white/70 text-rose-700 ring-1 ring-rose-200 hover:bg-white dark:bg-white/10 dark:text-rose-100 dark:ring-white/15 dark:hover:bg-white/15',
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-lg font-bold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
