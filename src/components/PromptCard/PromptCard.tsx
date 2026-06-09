import * as React from 'react'
import { PlayIcon, CopyIcon, Trash2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'

export interface PromptCardProps {
  title: string
  content: string
  category?: string
  onUse?: () => void
  onCopy?: () => void
  onDelete?: () => void
  className?: string
}

function PromptCard({
  title,
  content,
  category,
  onUse,
  onCopy,
  onDelete,
  className,
}: PromptCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-border bg-card p-4',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-sm leading-tight">{title}</span>
        {category && (
          <Badge variant="secondary" className="shrink-0 text-xs">
            {category}
          </Badge>
        )}
      </div>
      <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
        {content}
      </p>
      <div className="flex items-center gap-1 pt-1">
        {onUse && (
          <Button variant="ghost" size="sm" onClick={onUse} aria-label="Use prompt">
            <PlayIcon className="size-3.5" />
            Use
          </Button>
        )}
        {onCopy && (
          <Button variant="ghost" size="sm" onClick={onCopy} aria-label="Copy prompt">
            <CopyIcon className="size-3.5" />
            Copy
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            aria-label="Delete prompt"
            className="ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2Icon className="size-3.5" />
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}

export { PromptCard }
