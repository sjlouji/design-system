import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/Spinner'

export interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  debounce?: number
  loading?: boolean
  className?: string
}

function SearchInput({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search…',
  debounce: debounceMs = 0,
  loading = false,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(value)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync internal value when controlled value changes from outside
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInternalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setInternalValue(next)

    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }

    if (debounceMs > 0) {
      timeoutRef.current = setTimeout(() => {
        onChange?.(next)
      }, debounceMs)
    } else {
      onChange?.(next)
    }
  }

  const handleClear = () => {
    setInternalValue('')
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    onChange?.('')
    onClear?.()
  }

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const showClear = internalValue.length > 0 && !loading

  return (
    <div data-slot="search-input" className={cn('relative', className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-8 py-1 text-sm text-foreground shadow-xs',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-[color,box-shadow]'
        )}
      />
      {loading && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Spinner size="sm" />
        </span>
      )}
      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-4 text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export { SearchInput }
