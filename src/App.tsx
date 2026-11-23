import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Header } from './components/Header'
import { CalculatorForm } from './components/CalculatorForm'
import { ResultCard } from './components/ResultCard'
import { calculateLovePercentage, formatDisplayName } from './utils/loveCalculator'
import type { LoveResult } from './types'

const viewTransition = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.25, ease: 'easeOut' },
} as const

export default function App() {
  const [result, setResult] = useState<LoveResult | null>(null)
  const [hasReset, setHasReset] = useState(false)

  function handleCalculate(name1: string, name2: string) {
    setResult({
      name1: formatDisplayName(name1),
      name2: formatDisplayName(name2),
      percentage: calculateLovePercentage(name1, name2),
    })
  }

  function handleReset() {
    setResult(null)
    setHasReset(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-10 sm:py-16">
        <Header />

        <main className="w-full max-w-md rounded-3xl bg-white/75 p-6 shadow-xl ring-1 shadow-rose-300/30 ring-white/60 backdrop-blur-md sm:p-8 dark:bg-zinc-900/60 dark:shadow-black/40 dark:ring-white/10">
          <AnimatePresence mode="wait" initial={false}>
            {result ? (
              <motion.div key="result" {...viewTransition}>
                <ResultCard result={result} onReset={handleReset} />
              </motion.div>
            ) : (
              <motion.div key="form" {...viewTransition}>
                <CalculatorForm onCalculate={handleCalculate} autoFocus={hasReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="max-w-md text-center text-xs text-rose-900/60 dark:text-rose-100/50">
          For entertainment purposes only. Cupidly scores are generated for fun and are
          not scientific predictions about any relationship. Names never leave your
          browser.
        </footer>
      </div>
    </MotionConfig>
  )
}
