import * as React from 'react'
import { LightbulbIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/Collapsible'

export interface ThinkingBlockProps {
  children: React.ReactNode
  title?: string
  defaultOpen?: boolean
  className?: string
}

function ThinkingBlock({
  children,
  title = 'Thinking…',
  defaultOpen = false,
  className,
}: ThinkingBlockProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn('w-full', className)}
    >
      <CollapsibleTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left">
          <LightbulbIcon className="size-4 shrink-0" />
          <span>{title}</span>
          <ChevronRightIcon
            className={cn(
              'size-4 shrink-0 transition-transform duration-200 ml-auto',
              open && 'rotate-90'
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 text-sm text-muted-foreground border-l-2 border-border pl-3">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { ThinkingBlock }
