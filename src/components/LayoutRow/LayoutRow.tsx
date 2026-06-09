import * as React from 'react'
import { cn } from '@/lib/utils'

type GapValue = 0 | 1 | 2 | 3 | 4 | 6 | 8
type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type JustifyValue = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface LayoutRowProps {
  children: React.ReactNode
  gap?: GapValue
  align?: AlignValue
  justify?: JustifyValue
  wrap?: boolean
  className?: string
}

const gapClasses: Record<GapValue, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
}

const alignClasses: Record<AlignValue, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyClasses: Record<JustifyValue, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

function LayoutRow({
  children,
  gap,
  align,
  justify,
  wrap,
  className,
}: LayoutRowProps) {
  return (
    <div
      data-slot="layout-row"
      className={cn(
        'flex',
        gap !== undefined && gapClasses[gap],
        align && alignClasses[align],
        justify && justifyClasses[justify],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  )
}

export { LayoutRow }
export type { LayoutRowProps }
