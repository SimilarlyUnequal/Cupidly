import { useId, type Ref } from 'react'
import { MAX_NAME_LENGTH } from '../utils/loveCalculator'

interface NameInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  autoFocus?: boolean
  ref?: Ref<HTMLInputElement>
}

export function NameInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  autoFocus,
  ref,
}: NameInputProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-rose-900 dark:text-rose-100"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        autoCapitalize="words"
        spellCheck={false}
        maxLength={MAX_NAME_LENGTH + 20}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl border-2 bg-white/80 px-4 py-3 text-lg text-rose-950 transition-colors outline-none placeholder:text-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-200 dark:bg-zinc-900/70 dark:text-rose-50 dark:placeholder:text-rose-200/30 dark:focus:ring-rose-500/30 ${
          error
            ? 'border-red-400 dark:border-red-400'
            : 'border-rose-100 dark:border-white/10'
        }`}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}
