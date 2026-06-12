import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Avatar'
import { TypingIndicator } from '@/components/TypingIndicator'
import { MarkdownMessage } from '@/components/MarkdownMessage'

export interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system'
  content: string
  avatar?: { src?: string; fallback: string }
  name?: string
  timestamp?: string
  streaming?: boolean
  actions?: React.ReactNode
  className?: string
}

function ChatMessage({
  role,
  content,
  avatar,
  name,
  timestamp,
  streaming = false,
  actions,
  className,
}: ChatMessageProps) {
  const isUser = role === 'user'
  const isSystem = role === 'system'

  if (isSystem) {
    return (
      <div className={cn('flex items-center gap-3 py-2 px-4', className)}>
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-[11px] font-medium text-muted-foreground/80 tracking-wide uppercase shrink-0">
          {content}
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group flex gap-3 px-4 py-3 rounded-xl transition-colors duration-100',
        isUser ? 'flex-row-reverse' : 'flex-row',
        !isUser && 'hover:bg-muted/20 dark:hover:bg-muted/10',
        className
      )}
      data-role={role}
    >
      {/* Avatar */}
      {avatar ? (
        <Avatar className="shrink-0 mt-0.5 size-8 ring-2 ring-background shadow-sm">
          {avatar.src && <AvatarImage src={avatar.src} alt={avatar.fallback} />}
          <AvatarFallback className={cn(
            'text-xs font-semibold',
            isUser
              ? 'bg-primary/10 text-primary dark:bg-primary/20'
              : 'bg-[oklch(0.905_0.043_259)] text-[oklch(0.541_0.191_259)] dark:bg-[oklch(0.32_0.03_259)] dark:text-[oklch(0.633_0.165_259)]',
          )}>
            {avatar.fallback}
          </AvatarFallback>
        </Avatar>
      ) : !isUser ? (
        <div className={cn(
          'shrink-0 mt-0.5 size-8 rounded-full flex items-center justify-center shadow-sm',
          'ring-2 ring-background',
          'bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))]',
          'dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]',
          'text-white text-[10px] font-bold tracking-tight',
        )}>
          AI
        </div>
      ) : null}

      {/* Body */}
      <div className={cn('flex flex-col min-w-0 max-w-[85%]', isUser ? 'items-end' : 'items-start')}>
        {/* Name + timestamp */}
        {(name || timestamp) && (
          <div className={cn(
            'flex items-baseline gap-2 mb-1.5',
            isUser && 'flex-row-reverse',
          )}>
            {name && (
              <span className={cn(
                'text-xs font-semibold leading-none',
                isUser
                  ? 'text-muted-foreground'
                  : 'bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))] bg-clip-text text-transparent',
              )}>
                {name}
              </span>
            )}
            {timestamp && (
              <span className="text-[11px] text-muted-foreground/60 tabular-nums">{timestamp}</span>
            )}
          </div>
        )}

        {/* Bubble (user) / plain content (AI) */}
        {isUser ? (
          <div className={cn(
            'rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed',
            'bg-primary text-primary-foreground shadow-sm',
            'dark:shadow-[0_1px_0_0_rgb(255_255_255_/_0.06)_inset]',
          )}>
            <span className="whitespace-pre-wrap">{content}</span>
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-foreground">
            {streaming ? <TypingIndicator /> : <MarkdownMessage content={content} />}
          </div>
        )}

        {/* Hover actions */}
        {actions && (
          <div className={cn(
            'mt-1.5 transition-[opacity,transform] duration-150',
            'opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0',
          )}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export { ChatMessage }
