import { describe, expect, it } from 'vitest'
import {
  MAX_NAME_LENGTH,
  calculateLovePercentage,
  cleanName,
  formatDisplayName,
  toHashKey,
  validateName,
} from './loveCalculator'
import { getLoveCategory } from '../constants/loveCategories'

const SAMPLE_PAIRS: Array<[string, string]> = [
  ['Romeo', 'Juliet'],
  ['Alice', 'Bob'],
  ['José', 'Zoë'],
  ['Mary-Jane', "O'Brien"],
  ['Ana', 'Ana'],
  ['A', 'B'],
  ['李雷', '韩梅梅'],
]

describe('cleanName', () => {
  it('trims and collapses whitespace', () => {
    expect(cleanName('   John    Smith  ')).toBe('John Smith')
    expect(cleanName('\tJane\n')).toBe('Jane')
  })

  it('normalizes Unicode to NFC', () => {
    const decomposed = 'José'
    expect(cleanName(decomposed)).toBe('José')
  })
})

describe('formatDisplayName', () => {
  it('capitalizes each word', () => {
    expect(formatDisplayName('  jOHN   smith ')).toBe('John Smith')
  })

  it('capitalizes hyphenated and apostrophe parts', () => {
    expect(formatDisplayName("mary-jane o'brien")).toBe("Mary-Jane O'Brien")
  })

  it('handles non-Latin letters', () => {
    expect(formatDisplayName('éLODIE')).toBe('Élodie')
  })
})

describe('toHashKey', () => {
  it('ignores case, whitespace and punctuation', () => {
    expect(toHashKey('  Mary-Jane ')).toBe(toHashKey('mary jane'))
    expect(toHashKey('MARYJANE')).toBe('maryjane')
  })
})

describe('validateName', () => {
  it('rejects empty and whitespace-only names', () => {
    expect(validateName('')).toBe('empty')
    expect(validateName('    ')).toBe('empty')
  })

  it('rejects names longer than the maximum length', () => {
    expect(validateName('a'.repeat(MAX_NAME_LENGTH))).toBeNull()
    expect(validateName('a'.repeat(MAX_NAME_LENGTH + 1))).toBe('too-long')
  })

  it('measures length after whitespace cleanup', () => {
    expect(validateName(`   ${'a'.repeat(MAX_NAME_LENGTH)}   `)).toBeNull()
  })

  it('rejects digits, symbols and punctuation-only input', () => {
    expect(validateName('R2D2')).toBe('invalid-characters')
    expect(validateName('<script>')).toBe('invalid-characters')
    expect(validateName('😍')).toBe('invalid-characters')
    expect(validateName("--'.")).toBe('invalid-characters')
  })

  it('accepts accented, hyphenated and non-Latin names', () => {
    for (const name of [
      'José',
      'Zoë',
      'Mary-Jane',
      "O'Brien",
      'St. John',
      '李雷',
      'Олег',
    ]) {
      expect(validateName(name)).toBeNull()
    }
  })
})

describe('calculateLovePercentage', () => {
  it('returns an integer between 0 and 100', () => {
    for (const [a, b] of SAMPLE_PAIRS) {
      const score = calculateLovePercentage(a, b)
      expect(Number.isInteger(score)).toBe(true)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    }
  })

  it('is deterministic', () => {
    for (const [a, b] of SAMPLE_PAIRS) {
      const first = calculateLovePercentage(a, b)
      for (let i = 0; i < 5; i++) {
        expect(calculateLovePercentage(a, b)).toBe(first)
      }
    }
  })

  it('is symmetric when names are reversed', () => {
    for (const [a, b] of SAMPLE_PAIRS) {
      expect(calculateLovePercentage(a, b)).toBe(calculateLovePercentage(b, a))
    }
  })

  it('ignores case and extra whitespace', () => {
    expect(calculateLovePercentage('  romeo ', 'JULIET')).toBe(
      calculateLovePercentage('Romeo', 'Juliet'),
    )
    expect(calculateLovePercentage('Mary   Jane', 'Bob')).toBe(
      calculateLovePercentage('mary jane', 'bob'),
    )
  })

  it('does not use Math.random', () => {
    const original = Math.random
    Math.random = () => {
      throw new Error('Math.random must not be used')
    }
    try {
      expect(() => calculateLovePercentage('Alice', 'Bob')).not.toThrow()
    } finally {
      Math.random = original
    }
  })

  it('produces a spread of different scores', () => {
    const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi']
    const scores = new Set<number>()
    for (const a of names)
      for (const b of names) scores.add(calculateLovePercentage(a, b))
    expect(scores.size).toBeGreaterThan(15)
  })

  it('throws for invalid input', () => {
    expect(() => calculateLovePercentage('', 'Bob')).toThrow()
    expect(() => calculateLovePercentage('Alice', '   ')).toThrow()
    expect(() => calculateLovePercentage('123', 'Bob')).toThrow()
  })
})

describe('getLoveCategory', () => {
  it.each([
    [100, 'Made for Each Other'],
    [90, 'Made for Each Other'],
    [89, 'Perfect Chemistry'],
    [75, 'Perfect Chemistry'],
    [74, 'Sparks Are Flying'],
    [50, 'Sparks Are Flying'],
    [49, 'Love Is Mysterious'],
    [30, 'Love Is Mysterious'],
    [29, 'Better Luck Next Time'],
    [0, 'Better Luck Next Time'],
  ])('maps %i%% to "%s"', (score, title) => {
    expect(getLoveCategory(score).title).toBe(title)
  })

  it('includes both names in the message', () => {
    const message = getLoveCategory(95).message('Romeo', 'Juliet')
    expect(message).toContain('Romeo')
    expect(message).toContain('Juliet')
  })
})
