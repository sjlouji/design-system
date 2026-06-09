import { cn } from '@/lib/utils'

export interface TypingIndicatorProps {
  className?: string
}

function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-2 bg-muted rounded-2xl rounded-bl-sm',
        className
      )}
    >
      <span
        className="bg-muted-foreground rounded-full w-1.5 h-1.5 animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <span
        className="bg-muted-foreground rounded-full w-1.5 h-1.5 animate-bounce"
        style={{ animationDelay: '150ms' }}
      />
      <span
        className="bg-muted-foreground rounded-full w-1.5 h-1.5 animate-bounce"
        style={{ animationDelay: '300ms' }}
      />
    </span>
  )
}

export { TypingIndicator }
