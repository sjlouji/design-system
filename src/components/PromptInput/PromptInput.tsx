import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Textarea } from '@/components/Textarea'
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
  className,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = React.useState('')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSubmit?.(value)
    if (!isControlled) setInternalValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isNearLimit =
    maxTokens && currentTokens ? currentTokens > maxTokens * 0.9 : false

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-24 resize-none"
      />
      <div className="flex items-center justify-between gap-2">
        <div>
          {maxTokens !== undefined && currentTokens !== undefined && (
            <TokenCounter
              current={currentTokens}
              max={maxTokens}
              className={cn(isNearLimit && 'text-destructive')}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>↵</Kbd>
          </span>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export { PromptInput }
