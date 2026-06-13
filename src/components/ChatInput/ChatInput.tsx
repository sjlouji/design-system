import * as React from 'react'
import { ArrowUpIcon, SquareIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/Spinner'

export interface ChatInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onStop?: () => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  maxLength?: number
  attachSlot?: React.ReactNode
  actionsSlot?: React.ReactNode
  className?: string
}

function ChatInput({
  value: controlledValue,
  onChange,
  onSubmit,
  onStop,
  placeholder = 'Message…',
  disabled = false,
  loading = false,
  maxLength,
  attachSlot,
  actionsSlot,
  className,
}: ChatInputProps) {
  const [internalValue, setInternalValue] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
    autoResize()
  }

  const handleSubmit = () => {
    if (!value.trim() || loading || disabled) return
    onSubmit?.(value)
    if (!isControlled) {
      setInternalValue('')
      if (textareaRef.current) textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isEmpty = !value.trim()
  const isOverLimit = maxLength ? value.length > maxLength : false
  const showSendBtn = !loading || !onStop

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-border/60 bg-background',
        'shadow-lg shadow-black/5 dark:shadow-black/20',
        'transition-[border-color,box-shadow] duration-150',
        'focus-within:border-ring/50 focus-within:shadow-xl focus-within:shadow-primary/8',
        'dark:bg-card dark:border-border',
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || loading}
        maxLength={maxLength}
        rows={1}
        className={cn(
          'block w-full resize-none bg-transparent px-4 pt-3.5 pb-2',
          'text-sm text-foreground placeholder:text-muted-foreground/50',
          'outline-none disabled:opacity-50',
          'min-h-[50px] max-h-[200px] overflow-y-auto',
          isOverLimit && 'text-destructive',
        )}
      />

      <div className="flex items-center justify-between gap-2 px-3 pb-3">
        <div className="flex items-center gap-1">
          {attachSlot}
          {actionsSlot}
        </div>

        <div className="flex items-center gap-2">
          {maxLength && (
            <span className={cn(
              'text-[11px] tabular-nums transition-colors',
              value.length > (maxLength * 0.9) ? 'text-warning' : 'text-muted-foreground/40',
              isOverLimit && 'text-destructive',
            )}>
              {value.length}/{maxLength}
            </span>
          )}

          {!showSendBtn ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generation"
              className={cn(
                'flex size-8 items-center justify-center rounded-lg',
                'border border-border bg-background text-foreground',
                'hover:bg-accent transition-colors duration-100',
              )}
            >
              <SquareIcon className="size-3 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isEmpty || loading || disabled || isOverLimit}
              aria-label="Send message"
              className={cn(
                'flex size-8 items-center justify-center rounded-lg transition-[transform,background-color,color,opacity,box-shadow] duration-150 active:scale-[0.93]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
                'disabled:pointer-events-none disabled:opacity-40',
                isEmpty
                  ? 'bg-muted/60 text-muted-foreground'
                  : [
                    'text-white shadow-sm',
                    'bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))]',
                    'dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]',
                    'hover:brightness-110 active:brightness-95',
                  ].join(' '),
              )}
            >
              {loading ? <Spinner size="xs" /> : <ArrowUpIcon className="size-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ChatInput }
