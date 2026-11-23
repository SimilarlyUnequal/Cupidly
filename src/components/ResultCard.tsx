import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { Button } from './Button'
import { HeartMeter } from './HeartMeter'
import { getLoveCategory } from '../constants/loveCategories'
import type { LoveResult } from '../types'

interface ResultCardProps {
  result: LoveResult
  onReset: () => void
}

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const { name1, name2, percentage } = result
  const category = getLoveCategory(percentage)
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Move focus to the result so keyboard and screen-reader users land on it.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <motion.section
      aria-labelledby="result-heading"
      className="flex flex-col items-center gap-6 text-center"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
    >
      <motion.h2
        id="result-heading"
        ref={headingRef}
        tabIndex={-1}
        variants={reveal}
        className="flex w-full flex-wrap items-center justify-center gap-x-2 text-xl font-bold break-words text-rose-900 outline-none sm:text-2xl dark:text-rose-50"
      >
        <span className="max-w-full break-words">{name1}</span>
        <span aria-label="and" className="text-rose-500">
          &
        </span>
        <span className="max-w-full break-words">{name2}</span>
      </motion.h2>

      <motion.div variants={reveal}>
        <HeartMeter percentage={percentage} />
      </motion.div>

      <motion.div variants={reveal} className="flex flex-col gap-2" aria-live="polite">
        <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-400">
          {category.title} <span aria-hidden="true">{category.emoji}</span>
        </p>
        <p className="text-base text-rose-900/80 sm:text-lg dark:text-rose-100/80">
          {category.message(name1, name2)}
        </p>
      </motion.div>

      <motion.div variants={reveal} className="w-full">
        <Button variant="secondary" onClick={onReset}>
          <RotateCcw aria-hidden="true" className="size-5" />
          Calculate Again
        </Button>
      </motion.div>
    </motion.section>
  )
}
