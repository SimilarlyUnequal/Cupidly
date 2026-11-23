import { useRef, useState, type FormEvent } from 'react'
import { Heart, HeartHandshake } from 'lucide-react'
import { NameInput } from './NameInput'
import { Button } from './Button'
import {
  MAX_NAME_LENGTH,
  validateName,
  type NameValidationError,
} from '../utils/loveCalculator'

interface CalculatorFormProps {
  onCalculate: (name1: string, name2: string) => void
  autoFocus?: boolean
}

const ERROR_MESSAGES: Record<NameValidationError, string> = {
  empty: 'Please enter a name.',
  'too-long': `Names can be at most ${MAX_NAME_LENGTH} characters.`,
  'invalid-characters': 'Use letters, spaces, hyphens or apostrophes only.',
}

interface FormErrors {
  name1?: string
  name2?: string
}

export function CalculatorForm({ onCalculate, autoFocus = false }: CalculatorFormProps) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const name1Ref = useRef<HTMLInputElement>(null)
  const name2Ref = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const error1 = validateName(name1)
    const error2 = validateName(name2)

    if (error1 || error2) {
      setErrors({
        name1: error1 ? ERROR_MESSAGES[error1] : undefined,
        name2: error2 ? ERROR_MESSAGES[error2] : undefined,
      })
      ;(error1 ? name1Ref : name2Ref).current?.focus()
      return
    }

    onCalculate(name1, name2)
  }

  function handleChange(field: keyof FormErrors, setter: (value: string) => void) {
    return (value: string) => {
      setter(value)
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <NameInput
        ref={name1Ref}
        label="Your name"
        placeholder="e.g. Romeo"
        value={name1}
        onChange={handleChange('name1', setName1)}
        error={errors.name1}
        autoFocus={autoFocus}
      />

      <div className="flex justify-center" aria-hidden="true">
        <span className="flex size-10 items-center justify-center rounded-full bg-rose-100 text-rose-500 dark:bg-rose-500/15 dark:text-rose-300">
          <Heart className="size-5 fill-current" />
        </span>
      </div>

      <NameInput
        ref={name2Ref}
        label="Their name"
        placeholder="e.g. Juliet"
        value={name2}
        onChange={handleChange('name2', setName2)}
        error={errors.name2}
      />

      <Button type="submit" className="mt-2">
        <HeartHandshake aria-hidden="true" className="size-6" />
        Calculate Love
      </Button>
    </form>
  )
}
