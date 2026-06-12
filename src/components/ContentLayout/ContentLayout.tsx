import * as React from 'react'

import { cn } from '@/lib/utils'

export interface ContentLayoutProps {
  header?: React.ReactNode
  defaultPadding?: boolean
  maxContentWidth?: number
  disableOverlap?: boolean
  className?: string
  children?: React.ReactNode
}

function ContentLayout({
  header,
  defaultPadding = false,
  maxContentWidth,
  disableOverlap = false,
  className,
  children,
}: ContentLayoutProps) {
  return (
    <div className={cn('w-full min-h-full flex flex-col', className)}>
      {header && (
        <div
          className={cn(
            'flex-none bg-background',
            defaultPadding && 'p-6 pb-8',
            !disableOverlap && 'relative'
          )}
        >
          {header}
          {!disableOverlap && (
            <div className="absolute inset-x-0 bottom-0 h-8 bg-muted/10 -z-10" />
          )}
          {disableOverlap && (
            <div className="border-b border-border mt-4" />
          )}
        </div>
      )}
      <div className={cn('flex-1 bg-background', defaultPadding && 'p-6')}>
        {maxContentWidth !== undefined ? (
          <div style={{ maxWidth: maxContentWidth }}>{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export { ContentLayout }
