# Cupidly 💘

**Two Names. One Love Percentage.**

A small, frontend-only love calculator built with React, TypeScript, Vite, React Compiler,
Tailwind CSS and Framer Motion.

> For entertainment purposes only. Scores are generated from a hash of the names and are not
> scientific predictions about any relationship. Names never leave your browser.

## Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `pnpm dev`     | Start the dev server                |
| `pnpm build`   | Type-check and build for production |
| `pnpm preview` | Preview the production build        |
| `pnpm test`    | Run unit tests (Vitest)             |
| `pnpm lint`    | Run ESLint                          |
| `pnpm format`  | Format with Prettier                |

## How the score works

`src/utils/loveCalculator.ts` normalizes both names (NFC, trimmed, collapsed whitespace,
case- and punctuation-insensitive) and sorts them so their order does not matter. It then
hashes them with FNV-1a plus a MurmurHash3 finalizer and maps the result to an integer from
0 to 100. The same pair always gets the same score, in either order. It never uses
`Math.random()`.

## Structure

```
src/
  App.tsx                     # calculator ↔ result state + transitions
  components/
    Header.tsx                # brand + tagline
    CalculatorForm.tsx        # inputs, validation, submit
    NameInput.tsx             # accessible labelled input with error
    ResultCard.tsx            # names, heart meter, title, message, reset
    HeartMeter.tsx            # pulsing heart that fills to the percentage
    AnimatedPercentage.tsx    # count-up number
    Button.tsx                # animated button
  constants/loveCategories.ts # result tiers and messages
  utils/loveCalculator.ts     # pure, deterministic algorithm
  utils/loveCalculator.test.ts
```
