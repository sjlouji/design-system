import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import type { DateRange as DayPickerDateRange } from 'react-day-picker'

export interface DateRange {
  from?: Date
  to?: Date
}

export interface DateRangeInputProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  format?: string
  disabled?: boolean
  className?: string
}

function DateRangeInput({
  value,
  onChange,
  placeholder = 'Start date → End date',
  format: formatStr = 'dd/MM/yyyy',
  disabled = false,
  className,
}: DateRangeInputProps) {
  const [open, setOpen] = React.useState(false)

  function handleSelect(range: DayPickerDateRange | undefined) {
    if (!range) {
      onChange?.(undefined)
      return
    }
    const newRange: DateRange = { from: range.from, to: range.to }
    onChange?.(newRange)
    if (range.from && range.to) {
      setOpen(false)
    }
  }

  const displayValue = React.useMemo(() => {
    if (value?.from && value?.to) {
      return `${format(value.from, formatStr)} → ${format(value.to, formatStr)}`
    }
    if (value?.from) {
      return `${format(value.from, formatStr)} → ...`
    }
    return null
  }, [value, formatStr])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-label="Select date range"
          className={cn(
            'inline-flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            !displayValue && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{displayValue ?? placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value as DayPickerDateRange | undefined}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DateRangeInput }
