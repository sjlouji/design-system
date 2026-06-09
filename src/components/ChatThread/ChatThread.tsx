import * as React from 'react'
import { MessageSquareIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatThreadProps {
  children: React.ReactNode
  className?: string
}

function ChatThread({ children, className }: ChatThreadProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (bottomRef.current?.scrollIntoView) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [children])

  return (
    <div
      className={cn('overflow-y-auto flex flex-col gap-4 p-4', className)}
    >
      {children}
      <div ref={bottomRef} />
    </div>
  )
}

function ChatThreadEmpty({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 h-full text-muted-foreground',
        className
      )}
    >
      <MessageSquareIcon className="size-10 opacity-40" />
      <span className="text-sm">No messages yet</span>
    </div>
  )
}

export { ChatThread, ChatThreadEmpty }
