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

const iconWrapSize: Record<EmptyStateSize, string> = {
  sm: 'size-10',
  md: 'size-14',
  lg: 'size-20',
}

const iconSize: Record<EmptyStateSize, string> = {
  sm: '[&_svg]:size-5',
  md: '[&_svg]:size-7',
  lg: '[&_svg]:size-9',
}

const titleSize: Record<EmptyStateSize, string> = {
  sm: 'text-sm font-semibold',
  md: 'text-base font-semibold',
  lg: 'text-lg font-semibold',
}

const spacing: Record<EmptyStateSize, string> = {
  sm: 'gap-3 py-8',
  md: 'gap-4 py-12',
  lg: 'gap-5 py-20',
}

function EmptyState({ icon, title, description, action, className, size = 'md' }: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      spacing[size],
      className
    )}>
      {icon && (
        <div className={cn(
          'flex items-center justify-center rounded-2xl',
          'bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))]',
          'dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]',
          'text-white shadow-lg shadow-primary/20',
          iconWrapSize[size],
          iconSize[size],
        )}>
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5 max-w-xs">
        <p className={titleSize[size]}>{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}

export { EmptyState }
export type { EmptyStateProps, EmptyStateSize }
