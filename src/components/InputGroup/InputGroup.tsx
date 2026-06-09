import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputGroupProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function InputGroup({ prefix, suffix, children, className }: InputGroupProps) {
  // Strip the Input's own border/ring so the wrapper owns it
  const child = React.Children.only(children) as React.ReactElement<{
    className?: string
  }>

  const clonedInput = React.cloneElement(child, {
    className: cn(
      'border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 rounded-none bg-transparent',
      child.props.className
    ),
  })

  return (
    <div
      data-slot="input-group"
      className={cn(
        'flex items-center rounded-md border border-input bg-background',
        'focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring',
        'has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:focus-within:ring-destructive/20',
        className
      )}
    >
      {prefix != null && (
        <span
          data-slot="input-group-prefix"
          className="flex shrink-0 items-center px-3 text-sm text-muted-foreground border-r border-input bg-muted h-9 rounded-l-md select-none"
        >
          {prefix}
        </span>
      )}
      <div className="flex-1 min-w-0">{clonedInput}</div>
      {suffix != null && (
        <span
          data-slot="input-group-suffix"
          className="flex shrink-0 items-center px-3 text-sm text-muted-foreground border-l border-input bg-muted h-9 rounded-r-md select-none"
        >
          {suffix}
        </span>
      )}
    </div>
  )
}

export { InputGroup }
