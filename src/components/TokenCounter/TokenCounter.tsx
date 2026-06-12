import { cn } from '@/lib/utils'

export interface TokenCounterProps {
  current: number
  max: number
  compact?: boolean
  className?: string
}

function TokenCounter({ current, max, compact = false, className }: TokenCounterProps) {
  const ratio = Math.min(current / max, 1)
  const isWarning = ratio > 0.75
  const isCritical = ratio > 0.9
  const percentage = ratio * 100

  const textColor = isCritical
    ? 'text-destructive'
    : isWarning
    ? 'text-warning'
    : 'text-muted-foreground'

  const barColor = isCritical
    ? 'bg-destructive'
    : isWarning
    ? 'bg-warning'
    : 'bg-[linear-gradient(90deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] dark:bg-[linear-gradient(90deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]'

  const formatNum = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`
    return n.toString()
  }

  if (compact) {
    return (
      <span className={cn('inline-flex items-center gap-1.5', textColor, className)}>
        <span className="text-[11px] font-mono tabular-nums">
          {formatNum(current)}<span className="opacity-50">/{formatNum(max)}</span>
        </span>
        <span className="inline-block h-1 w-12 rounded-full bg-muted overflow-hidden">
          <span
            className={cn('block h-full rounded-full transition-all duration-300', barColor)}
            style={{ width: `${percentage}%` }}
          />
        </span>
      </span>
    )
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className={cn('text-xs font-mono tabular-nums', textColor)}>
          {current.toLocaleString()}
          <span className="opacity-50 mx-0.5">/</span>
          {max.toLocaleString()}
          <span className="ml-1 opacity-60 font-sans">tokens</span>
        </span>
        <span className={cn('text-[11px] tabular-nums', textColor)}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { TokenCounter }
