export interface LoveCategory {
  minScore: number
  title: string
  emoji: string
  message: (name1: string, name2: string) => string
}

/** Ordered from highest to lowest minimum score. */
export const LOVE_CATEGORIES: readonly LoveCategory[] = [
  {
    minScore: 90,
    title: 'Made for Each Other',
    emoji: '💍',
    message: (a, b) =>
      `${a} and ${b}, the stars must have planned this one. Cupid's arrow hit the bullseye!`,
  },
  {
    minScore: 75,
    title: 'Perfect Chemistry',
    emoji: '💕',
    message: (a, b) =>
      `${a} and ${b} have a connection that's hard to ignore. Sweet things are brewing!`,
  },
  {
    minScore: 50,
    title: 'Sparks Are Flying',
    emoji: '✨',
    message: (a, b) =>
      `There's definitely something between ${a} and ${b}. Fan those sparks and see where they lead!`,
  },
  {
    minScore: 30,
    title: 'Love Is Mysterious',
    emoji: '💗',
    message: (a, b) =>
      `${a} and ${b} keep Cupid guessing. Sometimes the best stories start with a question mark.`,
  },
  {
    minScore: 0,
    title: 'Better Luck Next Time',
    emoji: '😜',
    message: (a, b) =>
      `Cupid seems a little distracted for ${a} and ${b} today. Don't worry — numbers can't measure real feelings!`,
  },
]

export function getLoveCategory(score: number): LoveCategory {
  const category = LOVE_CATEGORIES.find((c) => score >= c.minScore)
  // The last category has minScore 0, so this only fails for negative/NaN input.
  return category ?? LOVE_CATEGORIES[LOVE_CATEGORIES.length - 1]
}
