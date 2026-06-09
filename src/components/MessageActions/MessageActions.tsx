import * as React from 'react'
import { CopyIcon, RefreshCwIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'

export interface MessageActionsProps {
  onCopy?: () => void
  onRegenerate?: () => void
  onThumbsUp?: () => void
  onThumbsDown?: () => void
  className?: string
}

function MessageActions({
  onCopy,
  onRegenerate,
  onThumbsUp,
  onThumbsDown,
  className,
}: MessageActionsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg border border-border bg-background shadow-sm p-0.5',
        className
      )}
    >
      {onCopy && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onCopy} aria-label="Copy">
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>
      )}
      {onRegenerate && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onRegenerate} aria-label="Regenerate">
              <RefreshCwIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Regenerate</TooltipContent>
        </Tooltip>
      )}
      {onThumbsUp && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onThumbsUp} aria-label="Thumbs up">
              <ThumbsUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Good response</TooltipContent>
        </Tooltip>
      )}
      {onThumbsDown && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onThumbsDown} aria-label="Thumbs down">
              <ThumbsDownIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bad response</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export { MessageActions }
