import { useEffect } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'

interface AnimatedPercentageProps {
  value: number
  duration?: number
}

/** Counts up from 0 to `value`. Screen readers get the final value immediately. */
export function AnimatedPercentage({ value, duration = 1.6 }: AnimatedPercentageProps) {
  const shouldReduceMotion = useReducedMotion()
  const count = useMotionValue(shouldReduceMotion ? value : 0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (shouldReduceMotion) {
      count.set(value)
      return
    }
    const controls = animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [count, value, duration, shouldReduceMotion])

  return (
    <span className="tabular-nums">
      <span className="sr-only">{value}%</span>
      <span aria-hidden="true">
        <motion.span>{rounded}</motion.span>%
      </span>
    </span>
  )
}
