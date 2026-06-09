import * as React from 'react'
import { cn } from '@/lib/utils'

type TimelineStatus = 'default' | 'success' | 'error' | 'warning' | 'pending'

interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp?: string
  icon?: React.ReactNode
  status?: TimelineStatus
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const dotStatusClass: Record<TimelineStatus, string> = {
  default: 'bg-primary',
  success: 'bg-green-500',
  error: 'bg-destructive',
  warning: 'bg-yellow-500',
  pending: 'bg-muted border-2 border-border',
}

function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const status = item.status ?? 'default'

        return (
          <div key={item.id} className="flex gap-4">
            {/* Left: line + dot */}
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full',
                  dotStatusClass[status]
                )}
              >
                {item.icon && (
                  <span className="text-white [&_svg]:size-3">{item.icon}</span>
                )}
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-border mt-1" />
              )}
            </div>

            {/* Right: content */}
            <div className={cn('flex flex-col gap-0.5 pb-6', isLast && 'pb-0')}>
              <p className="text-sm font-medium leading-6">{item.title}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
              {item.timestamp && (
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Timeline }
export type { TimelineProps, TimelineItem, TimelineStatus }
