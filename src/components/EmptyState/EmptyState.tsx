import * as React from 'react'
import { cn } from '@/lib/utils'

type EmptyStateSize = 'sm' | 'md' | 'lg'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  size?: EmptyStateSize
}

const iconBoxSize: Record<EmptyStateSize, string> = {
  sm: 'size-8',
  md: 'size-12',
  lg: 'size-16',
}

const titleSize: Record<EmptyStateSize, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
}

const spacing: Record<EmptyStateSize, string> = {
  sm: 'gap-2 py-6',
  md: 'gap-3 py-10',
  lg: 'gap-4 py-16',
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = 'md',
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        spacing[size],
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center rounded-lg bg-muted text-muted-foreground',
            iconBoxSize[size]
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className={cn('font-semibold', titleSize[size])}>{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export { EmptyState }
export type { EmptyStateProps, EmptyStateSize }
