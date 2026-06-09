import * as React from 'react'
import { cn } from '@/lib/utils'

interface SplitLayoutProps {
  label: string
  description?: string
  children: React.ReactNode
  className?: string
  labelWidth?: string
}

function SplitLayout({
  label,
  description,
  children,
  className,
  labelWidth = 'w-1/3',
}: SplitLayoutProps) {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row', className)}>
      <div className={cn('shrink-0', labelWidth)}>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export { SplitLayout }
export type { SplitLayoutProps }
