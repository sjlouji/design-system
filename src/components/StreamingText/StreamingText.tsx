import * as React from 'react'
import { cn } from '@/lib/utils'

export interface StreamingTextProps {
  text: string
  streaming?: boolean
  className?: string
}

function StreamingText({ text, streaming = false, className }: StreamingTextProps) {
  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {text}
      {streaming && (
        <span className="animate-pulse inline-block w-0.5 h-4 bg-foreground ml-0.5 align-middle" />
      )}
    </span>
  )
}

export { StreamingText }
