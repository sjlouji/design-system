import * as React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/Separator'

interface SectionProps {
  title?: string
  description?: string
  action?: React.ReactNode
  divider?: boolean
  children?: React.ReactNode
  className?: string
}

function Section({
  title,
  description,
  action,
  divider = false,
  children,
  className,
}: SectionProps) {
  const hasHeader = title || description || action

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {divider && <Separator />}
      {children && <div>{children}</div>}
    </div>
  )
}

export { Section }
export type { SectionProps }
