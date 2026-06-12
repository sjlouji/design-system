import * as React from 'react'
import { cn } from '@/lib/utils'

export interface KeyValuePairItem {
  label: React.ReactNode
  value: React.ReactNode
  id?: string
  info?: React.ReactNode
}

export interface KeyValuePairsProps {
  items: KeyValuePairItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

const columnClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

function KeyValuePairs({ items, columns = 1, className }: KeyValuePairsProps) {
  return (
    <dl className={cn('grid gap-x-8 gap-y-6', columnClass[columns], className)}>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-1 min-w-0">
          <dt className="flex items-center gap-1.5 text-sm text-muted-foreground" id={item.id}>
            <span className="truncate">{item.label}</span>
            {item.info && <span className="shrink-0">{item.info}</span>}
          </dt>
          <dd
            className="text-sm font-medium text-foreground min-w-0"
            aria-labelledby={item.id}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export { KeyValuePairs }
