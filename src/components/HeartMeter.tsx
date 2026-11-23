import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { AnimatedPercentage } from './AnimatedPercentage'

interface HeartMeterProps {
  percentage: number
}

/** A pulsing heart that fills from the bottom up to the given percentage. */
export function HeartMeter({ percentage }: HeartMeterProps) {
  const shouldReduceMotion = useReducedMotion()
  const emptyInset = `inset(${100 - percentage}% 0 0 0)`

  return (
    <motion.div
      className="relative mx-auto size-48 drop-shadow-[0_8px_24px_rgba(244,63,94,0.35)] sm:size-56"
      animate={shouldReduceMotion ? undefined : { scale: [1, 1.07, 1, 1.04, 1] }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        repeatDelay: 0.4,
        ease: 'easeInOut',
      }}
    >
      <Heart
        aria-hidden="true"
        strokeWidth={1.25}
        className="absolute inset-0 size-full fill-rose-100 text-rose-300 dark:fill-rose-950/60 dark:text-rose-400/50"
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ clipPath: shouldReduceMotion ? emptyInset : 'inset(100% 0 0 0)' }}
        animate={{ clipPath: emptyInset }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Heart
          strokeWidth={1.25}
          className="size-full fill-rose-500 text-rose-500 dark:fill-rose-500 dark:text-rose-500"
        />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center pb-4 text-4xl font-black text-white [text-shadow:0_2px_8px_rgba(136,19,55,0.55)] sm:text-5xl">
        <AnimatedPercentage value={percentage} />
      </div>
    </motion.div>
  )
}
