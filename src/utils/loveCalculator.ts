/**
 * Cupidly love calculator — pure, deterministic, client-side logic.
 *
 * For entertainment only: the score is derived from a hash of the names
 * and carries no real-world meaning.
 */

export const MAX_NAME_LENGTH = 50

/** Unicode letters, combining marks, spaces, apostrophes, hyphens and dots. */
const ALLOWED_NAME_PATTERN = /^[\p{L}\p{M}\s'’.-]+$/u
const HAS_LETTER_PATTERN = /\p{L}/u

export type NameValidationError = 'empty' | 'too-long' | 'invalid-characters'

/** Trims and collapses internal whitespace, and applies Unicode NFC normalization. */
export function cleanName(raw: string): string {
  return raw.normalize('NFC').trim().replace(/\s+/g, ' ')
}

/** Capitalizes each word (and each hyphen/apostrophe-separated part) for display. */
export function formatDisplayName(raw: string): string {
  return cleanName(raw)
    .toLocaleLowerCase()
    .replace(/(^|[\s'’-])(\p{L})/gu, (_, sep: string, letter: string) => {
      return sep + letter.toLocaleUpperCase()
    })
}

/**
 * Canonical form used for hashing: case-, whitespace- and punctuation-insensitive,
 * so "  mary-jane " and "Mary Jane" produce the same key.
 */
export function toHashKey(raw: string): string {
  return cleanName(raw)
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{M}]/gu, '')
}

export function validateName(raw: string): NameValidationError | null {
  const name = cleanName(raw)
  if (name.length === 0) return 'empty'
  if (name.length > MAX_NAME_LENGTH) return 'too-long'
  if (!ALLOWED_NAME_PATTERN.test(name) || !HAS_LETTER_PATTERN.test(name)) {
    return 'invalid-characters'
  }
  return null
}

/** 32-bit FNV-1a hash over UTF-16 code units. */
function fnv1a(input: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

/** Final avalanche step (from MurmurHash3) to spread similar inputs apart. */
function mix(hash: number): number {
  let h = hash
  h ^= h >>> 16
  h = Math.imul(h, 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16
  return h >>> 0
}

/**
 * Returns a deterministic integer between 0 and 100 (inclusive) for two names.
 * The result is symmetric: calculateLovePercentage(a, b) === calculateLovePercentage(b, a).
 *
 * @throws {Error} if either name fails validation.
 */
export function calculateLovePercentage(name1: string, name2: string): number {
  if (validateName(name1) !== null || validateName(name2) !== null) {
    throw new Error('Both names must be valid to calculate a love percentage.')
  }

  // Sorting the keys makes the order of the names irrelevant.
  const [first, second] = [toHashKey(name1), toHashKey(name2)].sort()
  const hash = mix(fnv1a(`cupidly:${first}♥${second}`))

  return hash % 101
}
