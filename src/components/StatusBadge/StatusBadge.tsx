import * as React from 'react'
import { cn } from '@/lib/utils'

type Status = 'online' | 'offline' | 'busy' | 'away' | 'pending'

const dotColorMap: Record<Status, string> = {
  online: 'bg-green-500',
  offline: 'bg-zinc-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
  pending: 'bg-blue-500',
}

const defaultLabelMap: Record<Status, string> = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Busy',
  away: 'Away',
  pending: 'Pending',
}

export interface StatusBadgeProps {
  status: Status
  label?: string
  showDot?: boolean
  className?: string
}

function StatusBadge({
  status,
  label,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const displayLabel = label ?? defaultLabelMap[status]

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 text-sm', className)}
      data-status={status}
    >
      {showDot && (
        <span
          className={cn('size-2 shrink-0 rounded-full', dotColorMap[status])}
          aria-hidden="true"
        />
      )}
      <span>{displayLabel}</span>
    </span>
  )
}

export { StatusBadge }
