import { Heart } from 'lucide-react'

export function Header() {
  return (
    <header className="text-center">
      <h1 className="inline-flex items-center gap-2 text-4xl font-extrabold tracking-tight text-rose-600 sm:text-5xl dark:text-rose-400">
        <Heart aria-hidden="true" className="size-8 fill-current sm:size-10" />
        Cupidly
      </h1>
      <p className="mt-2 text-base font-medium text-rose-900/70 sm:text-lg dark:text-rose-100/70">
        Two Names. One Love Percentage.
      </p>
    </header>
  )
}
