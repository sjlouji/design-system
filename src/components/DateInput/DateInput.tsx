import * as React from 'react'
import { format, parse, isValid } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'

export interface DateInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  format?: string
  disabled?: boolean
  error?: boolean
  min?: Date
  max?: Date
  className?: string
}

function DateInput({
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
  format: formatStr = 'dd/MM/yyyy',
  disabled = false,
  error = false,
  min,
  max,
  className,
}: DateInputProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(
    value ? format(value, formatStr) : ''
  )
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(value ? format(value, formatStr) : '')
  }, [value, formatStr])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
    setHasError(false)
  }

  function handleBlur() {
    if (!inputValue) {
      setHasError(false)
      onChange?.(undefined)
      return
    }
    const parsed = parse(inputValue, formatStr, new Date())
    if (isValid(parsed)) {
      setHasError(false)
      onChange?.(parsed)
    } else {
      setHasError(true)
    }
  }

  function handleCalendarSelect(date: Date | undefined) {
    if (date) {
      setInputValue(format(date, formatStr))
      setHasError(false)
      onChange?.(date)
    }
    setOpen(false)
  }

  const isErrorState = error || hasError

  return (
    <div className={cn('relative flex items-center', className)}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none',
          'placeholder:text-muted-foreground',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          isErrorState && 'border-destructive focus-visible:ring-destructive/20'
        )}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Open calendar"
            className={cn(
              'absolute right-2 flex items-center justify-center rounded-sm p-0.5 text-muted-foreground transition-colors',
              'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <CalendarIcon className="size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleCalendarSelect}
            disabled={(date) => {
              if (min && date < min) return true
              if (max && date > max) return true
              return false
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DateInput }
