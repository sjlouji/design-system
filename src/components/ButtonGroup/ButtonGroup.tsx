import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function ButtonGroup({
  children,
  orientation = 'horizontal',
  className,
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        'inline-flex',
        orientation === 'horizontal'
          ? [
              '[&>button:first-child]:rounded-r-none',
              '[&>button:last-child]:rounded-l-none',
              '[&>button:not(:first-child):not(:last-child)]:rounded-none',
              '[&>button:not(:first-child)]:-ml-px',
              '[&>button:hover]:z-10',
              '[&>button:focus-visible]:z-10',
            ]
          : [
              'flex-col',
              '[&>button:first-child]:rounded-b-none',
              '[&>button:last-child]:rounded-t-none',
              '[&>button:not(:first-child):not(:last-child)]:rounded-none',
              '[&>button:not(:first-child)]:-mt-px',
              '[&>button:hover]:z-10',
              '[&>button:focus-visible]:z-10',
            ],
        className
      )}
    >
      {children}
    </div>
  )
}

export { ButtonGroup }
