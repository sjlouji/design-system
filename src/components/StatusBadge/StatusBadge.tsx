import { cn } from '@/lib/utils'

type Status = 'online' | 'offline' | 'busy' | 'away' | 'pending'

const dotColorMap: Record<Status, string> = {
  online:  'bg-[oklch(0.627_0.133_160)] dark:bg-[oklch(0.704_0.148_160)]',
  offline: 'bg-muted-foreground/50',
  busy:    'bg-[oklch(0.557_0.185_29)]',
  away:    'bg-[oklch(0.782_0.158_92)]',
  pending: 'bg-[oklch(0.541_0.191_259)] dark:bg-[oklch(0.633_0.165_259)]',
}

const glowMap: Record<Status, string> = {
  online:  'shadow-[0_0_0_3px_oklch(0.627_0.133_160_/_0.25)]',
  offline: '',
  busy:    '',
  away:    '',
  pending: 'shadow-[0_0_0_3px_oklch(0.541_0.191_259_/_0.25)]',
}

const defaultLabelMap: Record<Status, string> = {
  online:  'Online',
  offline: 'Offline',
  busy:    'Busy',
  away:    'Away',
  pending: 'Pending',
}

export interface StatusBadgeProps {
  status: Status
  label?: string
  showDot?: boolean
  className?: string
}

function StatusBadge({ status, label, showDot = true, className }: StatusBadgeProps) {
  const displayLabel = label ?? defaultLabelMap[status]

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 text-sm', className)}
      data-status={status}
    >
      {showDot && (
        <span
          className={cn(
            'size-2 shrink-0 rounded-full',
            dotColorMap[status],
            glowMap[status],
          )}
          aria-hidden="true"
        />
      )}
      <span>{displayLabel}</span>
    </span>
  )
}

export { StatusBadge }
