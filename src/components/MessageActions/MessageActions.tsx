import * as React from 'react'
import { CopyIcon, RefreshCwIcon, ThumbsUpIcon, ThumbsDownIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'

export interface MessageActionsProps {
  onCopy?: () => void
  onRegenerate?: () => void
  onThumbsUp?: () => void
  onThumbsDown?: () => void
  className?: string
}

function ActionBtn({
  onClick,
  label,
  tooltip,
  children,
  active,
}: {
  onClick: () => void
  label: string
  tooltip: string
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          className={cn(
            'flex size-7 items-center justify-center rounded-md',
            'text-muted-foreground transition-colors duration-100',
            'hover:bg-muted/60 hover:text-foreground',
            active && 'text-primary bg-primary/10',
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">{tooltip}</TooltipContent>
    </Tooltip>
  )
}

function MessageActions({
  onCopy,
  onRegenerate,
  onThumbsUp,
  onThumbsDown,
  className,
}: MessageActionsProps) {
  const [copied, setCopied] = React.useState(false)
  const [rated, setRated] = React.useState<'up' | 'down' | null>(null)

  const handleCopy = () => {
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={cn(
      'inline-flex items-center gap-0.5 rounded-lg border border-border/60 bg-background/90 backdrop-blur-sm shadow-sm p-0.5',
      'dark:bg-card/90 dark:border-border',
      className
    )}>
      {onCopy && (
        <ActionBtn onClick={handleCopy} label="Copy" tooltip={copied ? 'Copied!' : 'Copy'}>
          {copied
            ? <CheckIcon className="size-3.5 text-success" />
            : <CopyIcon className="size-3.5" />}
        </ActionBtn>
      )}
      {onRegenerate && (
        <ActionBtn onClick={onRegenerate} label="Regenerate" tooltip="Regenerate">
          <RefreshCwIcon className="size-3.5" />
        </ActionBtn>
      )}
      {(onThumbsUp || onThumbsDown) && (
        <div className="w-px h-4 bg-border/60 mx-0.5" />
      )}
      {onThumbsUp && (
        <ActionBtn
          onClick={() => { setRated('up'); onThumbsUp() }}
          label="Good response"
          tooltip="Good response"
          active={rated === 'up'}
        >
          <ThumbsUpIcon className="size-3.5" />
        </ActionBtn>
      )}
      {onThumbsDown && (
        <ActionBtn
          onClick={() => { setRated('down'); onThumbsDown() }}
          label="Bad response"
          tooltip="Bad response"
          active={rated === 'down'}
        >
          <ThumbsDownIcon className="size-3.5" />
        </ActionBtn>
      )}
    </div>
  )
}

export { MessageActions }
