import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TokenCounterProps {
  current: number
  max: number
  className?: string
}

function TokenCounter({ current, max, className }: TokenCounterProps) {
  const ratio = current / max
  const isWarning = ratio > 0.75
  const isCritical = ratio > 0.9
  const percentage = Math.min(100, (current / max) * 100)

  const colorClass = isCritical
    ? 'text-destructive'
    : isWarning
    ? 'text-amber-500'
    : 'text-muted-foreground'

  const barColorClass = isCritical
    ? 'bg-destructive'
    : isWarning
    ? 'bg-amber-500'
    : 'bg-muted-foreground'

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className={cn('text-xs font-mono', colorClass)}>
        {current.toLocaleString()} / {max.toLocaleString()}
      </span>
      <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', barColorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { TokenCounter }
