import * as React from 'react'
import { SparklesIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatThreadProps {
  children: React.ReactNode
  className?: string
}

function ChatThread({ children, className }: ChatThreadProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    const bottom = bottomRef.current
    if (!container || !bottom) return
    // Only auto-scroll if near bottom
    const { scrollTop, scrollHeight, clientHeight } = container
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120
    if (isNearBottom) {
      bottom.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [children])

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-y-auto flex flex-col gap-1 py-6',
        className
      )}
    >
      <div className="flex flex-col gap-1 max-w-3xl mx-auto w-full px-4">
        {children}
      </div>
      <div ref={bottomRef} className="h-4" />
    </div>
  )
}

function ChatThreadEmpty({ className }: { className?: string }) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-4 h-full py-16',
      className
    )}>
      <div className={cn(
        'size-14 rounded-2xl flex items-center justify-center',
        'bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))]',
        'dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]',
        'shadow-lg shadow-primary/20',
      )}>
        <SparklesIcon className="size-7 text-white" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-semibold text-foreground">How can I help you today?</p>
        <p className="text-sm text-muted-foreground">Start a conversation below</p>
      </div>
    </div>
  )
}

export { ChatThread, ChatThreadEmpty }
