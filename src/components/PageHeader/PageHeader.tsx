import * as React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function PageHeader({ title, description, breadcrumb, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {breadcrumb && (
        <div className="text-sm text-muted-foreground">{breadcrumb}</div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  )
}

export { PageHeader }
export type { PageHeaderProps }
