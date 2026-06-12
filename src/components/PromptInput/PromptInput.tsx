import * as React from 'react'
import { ArrowUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Kbd } from '@/components/Kbd'
import { TokenCounter } from '@/components/TokenCounter'

export interface PromptInputProps {
  value?: string
  onChange?: (v: string) => void
  onSubmit?: (v: string) => void
  placeholder?: string
  maxTokens?: number
  currentTokens?: number
  disabled?: boolean
  actionsSlot?: React.ReactNode
  className?: string
}

function PromptInput({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = 'Enter your prompt…',
  maxTokens,
  currentTokens,
  disabled = false,
  actionsSlot,
  className,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 300)}px`
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
    autoResize()
  }

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSubmit?.(value)
    if (!isControlled) {
      setInternalValue('')
      if (textareaRef.current) textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isNearLimit = maxTokens && currentTokens ? currentTokens > maxTokens * 0.9 : false
  const isEmpty = !value.trim()

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className={cn(
        'relative rounded-xl border border-border/60 bg-background',
        'shadow-sm transition-[border-color,box-shadow] duration-150',
        'focus-within:border-ring/50 focus-within:shadow-md focus-within:shadow-primary/5',
        'dark:bg-card dark:border-border',
        disabled && 'opacity-60 pointer-events-none',
      )}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          className={cn(
            'block w-full resize-none bg-transparent px-4 py-3.5',
            'text-sm text-foreground placeholder:text-muted-foreground/50 leading-relaxed',
            'outline-none min-h-[96px] max-h-[300px] overflow-y-auto',
          )}
        />
        {actionsSlot && (
          <div className="px-3 pb-2.5 border-t border-border/40 pt-2">
            {actionsSlot}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          {maxTokens !== undefined && currentTokens !== undefined && (
            <TokenCounter
              current={currentTokens}
              max={maxTokens}
              className={cn(isNearLimit && 'text-destructive')}
            />
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <Kbd className="text-[10px]">⌘</Kbd>
            <Kbd className="text-[10px]">↵</Kbd>
            <span>to submit</span>
          </span>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isEmpty || disabled}
            aria-label="Submit"
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-medium',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
              'disabled:pointer-events-none disabled:opacity-40',
              isEmpty
                ? 'bg-muted text-muted-foreground'
                : [
                  'text-white shadow-sm',
                  'bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))]',
                  'dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]',
                  'hover:brightness-110 active:brightness-95',
                ].join(' '),
            )}
          >
            <ArrowUpIcon className="size-4" />
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export { PromptInput }
