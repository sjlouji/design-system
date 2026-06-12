import * as React from 'react'
import { BrainIcon, ChevronDownIcon } from 'lucide-react'
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
  thinking?: boolean
  className?: string
}

function ThinkingBlock({
  children,
  title = 'Thinking…',
  defaultOpen = false,
  thinking = false,
  className,
}: ThinkingBlockProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        'w-full rounded-lg border overflow-hidden',
        'border-[oklch(0.837_0.075_260)] bg-[oklch(0.905_0.043_259)]',
        'dark:border-[oklch(0.36_0.05_259)] dark:bg-[oklch(0.32_0.03_259)]',
        className
      )}
    >
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'flex w-full items-center gap-2.5 px-3 py-2.5 text-left',
            'text-sm font-medium transition-colors duration-100',
            'text-[oklch(0.482_0.171_259)] dark:text-[oklch(0.633_0.165_259)]',
            'hover:bg-[oklch(0.940_0.025_259)] dark:hover:bg-[oklch(0.35_0.04_259)]',
          )}
        >
          <BrainIcon
            className={cn(
              'size-4 shrink-0',
              thinking && 'opacity-100',
              'text-[oklch(0.541_0.191_259)] dark:text-[oklch(0.633_0.165_259)]',
            )}
            style={thinking ? { animation: 'thinking-pulse 1.5s ease-in-out infinite' } : undefined}
          />
          <span className={cn(
            thinking && 'bg-[linear-gradient(90deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225),oklch(0.541_0.191_259))] dark:bg-[linear-gradient(90deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225),oklch(0.633_0.165_259))]',
            thinking && 'bg-[size:200%] bg-clip-text text-transparent',
            thinking && '[animation:shimmer_2s_linear_infinite]',
          )}>
            {title}
          </span>
          <ChevronDownIcon
            className={cn(
              'size-3.5 shrink-0 ml-auto transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className={cn(
          'px-3 pb-3 pt-0.5 text-sm leading-relaxed',
          'text-[oklch(0.482_0.171_259)]/80 dark:text-[oklch(0.633_0.165_259)]/70',
          'border-t border-[oklch(0.837_0.075_260)] dark:border-[oklch(0.36_0.05_259)]',
        )}>
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { ThinkingBlock }
