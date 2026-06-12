import * as React from 'react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'

const lineClampClass: Record<number, string> = {
  1: 'truncate',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
}

export interface TruncatedTextProps {
  children: React.ReactNode
  lines?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

function TruncatedText({ children, lines = 1, className }: TruncatedTextProps) {
  const clamp = lineClampClass[lines] ?? 'truncate'

  const content = (
    <span className={cn('block min-w-0', clamp, className)}>
      {children}
    </span>
  )

  if (typeof children === 'string') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent className="max-w-sm break-all">{children}</TooltipContent>
      </Tooltip>
    )
  }

  return content
}

export { TruncatedText }
