import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FieldGroupProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3
}

const columnClass: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
}

function FieldGroup({
  title,
  description,
  children,
  className,
  columns = 1,
}: FieldGroupProps) {
  return (
    <div data-slot="field-group" className={cn('flex flex-col gap-3', className)}>
      {(title != null || description != null) && (
        <div className="flex flex-col gap-1">
          {title != null && (
            <h3 className="text-base font-semibold leading-none">{title}</h3>
          )}
          {description != null && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className={cn('grid gap-4', columnClass[columns])}>{children}</div>
    </div>
  )
}

export { FieldGroup }
