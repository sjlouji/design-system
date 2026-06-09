import * as React from 'react'
import { ArrowUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Textarea } from '@/components/Textarea'
import { Spinner } from '@/components/Spinner'

export interface ChatInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  maxLength?: number
  attachSlot?: React.ReactNode
  className?: string
}

function ChatInput({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = 'Message…',
  disabled = false,
  loading = false,
  maxLength,
  attachSlot,
  className,
}: ChatInputProps) {
  const [internalValue, setInternalValue] = React.useState('')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const handleSubmit = () => {
    if (!value.trim() || loading || disabled) return
    onSubmit?.(value)
    if (!isControlled) setInternalValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isEmpty = !value.trim()
  const charCount = value.length
  const isOverLimit = maxLength ? charCount > maxLength : false

  return (
    <div
      className={cn(
        'rounded-xl border border-input bg-background p-3 focus-within:ring-2 focus-within:ring-ring',
        className
      )}
    >
      <Textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || loading}
        maxLength={maxLength}
        className={cn(
          'min-h-[44px] max-h-[120px] resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:border-0',
          isOverLimit && 'text-destructive'
        )}
        rows={1}
      />
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {attachSlot}
        </div>
        <div className="flex items-center gap-2">
          {maxLength && (
            <span
              className={cn(
                'text-xs text-muted-foreground',
                charCount > maxLength * 0.9 && 'text-warning',
                isOverLimit && 'text-destructive'
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
          <Button
            size="icon-sm"
            onClick={handleSubmit}
            disabled={isEmpty || loading || disabled || isOverLimit}
            aria-label="Send message"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? <Spinner size="xs" /> : <ArrowUpIcon />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ChatInput }
