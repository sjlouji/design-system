import * as React from 'react'
import { cn } from '@/lib/utils'

export interface KbdProps extends React.ComponentProps<'kbd'> {
  children: React.ReactNode
  className?: string
}

function Kbd({ children, className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

export { Kbd }
