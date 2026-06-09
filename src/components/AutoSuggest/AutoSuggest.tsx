import * as React from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/Spinner'

export interface AutoSuggestOption {
  value: string
  label: string
  description?: string
}

export interface AutoSuggestProps {
  options: AutoSuggestOption[]
  value?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutoSuggestOption) => void
  placeholder?: string
  loading?: boolean
  emptyMessage?: string
  filterOptions?: boolean
  className?: string
}

function AutoSuggest({
  options,
  value,
  onChange,
  onSelect,
  placeholder,
  loading = false,
  emptyMessage = 'No results found.',
  filterOptions = true,
  className,
}: AutoSuggestProps) {
  const [inputValue, setInputValue] = React.useState(value ?? '')
  const [isOpen, setIsOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value !== undefined) setInputValue(value)
  }, [value])

  const filteredOptions = React.useMemo(() => {
    if (!filterOptions) return options
    const q = inputValue.toLowerCase()
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q)
    )
  }, [options, inputValue, filterOptions])

  const showDropdown = isOpen && (loading || filteredOptions.length > 0 || inputValue.length > 0)

  React.useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setInputValue(v)
    onChange?.(v)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  function handleFocus() {
    setIsOpen(true)
  }

  function handleSelect(option: AutoSuggestOption) {
    setInputValue(option.label)
    onChange?.(option.label)
    onSelect?.(option)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={showDropdown}
        role="combobox"
        className={cn(
          'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
          'placeholder:text-muted-foreground',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
      {showDropdown && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border bg-popover shadow-md"
        >
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Spinner size="sm" />
            </div>
          ) : filteredOptions.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground">{emptyMessage}</p>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                role="option"
                aria-selected={index === highlightedIndex}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'cursor-pointer px-3 py-2 text-sm transition-colors',
                  index === highlightedIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <span className="font-medium">{option.label}</span>
                {option.description && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export { AutoSuggest }
