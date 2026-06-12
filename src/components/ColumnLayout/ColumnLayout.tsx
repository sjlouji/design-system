import * as React from 'react'

import { cn } from '@/lib/utils'

export interface ColumnLayoutProps {
  columns?: 1 | 2 | 3 | 4
  variant?: 'default' | 'text-grid'
  borders?: 'none' | 'vertical' | 'horizontal' | 'all'
  className?: string
  children: React.ReactNode
}

const columnClass: Record<NonNullable<ColumnLayoutProps['columns']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

function ColumnLayout({
  columns = 2,
  variant = 'default',
  borders = 'none',
  className,
  children,
}: ColumnLayoutProps) {
  return (
    <div
      className={cn(
        'grid',
        variant === 'default' ? 'gap-4' : 'gap-8',
        columnClass[columns],
        // Vertical dividers between columns
        (borders === 'vertical' || borders === 'all') && [
          'divide-x divide-border',
          '[&>*]:px-4 [&>*:first-child]:pl-0 [&>*:last-child]:pr-0',
        ],
        // Horizontal dividers between rows
        (borders === 'horizontal' || borders === 'all') && '[&>*]:py-4',
        // text-grid shrinks text in children
        variant === 'text-grid' && '[&>*]:text-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

export { ColumnLayout }
