import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Avatar'
import { TypingIndicator } from '@/components/TypingIndicator'
import { MarkdownMessage } from '@/components/MarkdownMessage'

export interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system'
  content: string
  avatar?: { src?: string; fallback: string }
  timestamp?: string
  streaming?: boolean
  actions?: React.ReactNode
  className?: string
}

function ChatMessage({
  role,
  content,
  avatar,
  timestamp,
  streaming = false,
  actions,
  className,
}: ChatMessageProps) {
  const isUser = role === 'user'
  const isSystem = role === 'system'

  if (isSystem) {
    return (
      <div className={cn('mx-auto text-center', className)}>
        <span className="text-sm italic text-muted-foreground bg-muted/50 rounded-lg px-3 py-1.5 inline-block">
          {content}
        </span>
        {timestamp && (
          <div className="text-xs text-muted-foreground mt-1">{timestamp}</div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser && 'flex-row-reverse',
        className
      )}
      data-role={role}
    >
      {avatar && (
        <Avatar className="shrink-0">
          {avatar.src && <AvatarImage src={avatar.src} alt={avatar.fallback} />}
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn('flex flex-col', isUser && 'items-end')}>
        <div
          className={cn(
            'max-w-[80%] rounded-2xl px-4 py-3',
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted rounded-bl-sm'
          )}
        >
          {streaming ? (
            <TypingIndicator />
          ) : isUser ? (
            <span className="whitespace-pre-wrap text-sm">{content}</span>
          ) : (
            <MarkdownMessage content={content} />
          )}
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-1 px-1">
            {timestamp}
          </span>
        )}
        {actions && <div className="mt-1 px-1">{actions}</div>}
      </div>
    </div>
  )
}

export { ChatMessage }
