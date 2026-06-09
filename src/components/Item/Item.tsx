import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ItemProps {
  icon?: React.ReactNode
  label: string
  description?: string
  trailing?: React.ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  className?: string
}

function Item({
  icon,
  label,
  description,
  trailing,
  onClick,
  active = false,
  disabled = false,
  className,
}: ItemProps) {
  const isInteractive = typeof onClick === 'function'

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      onClick={!disabled && isInteractive ? onClick : undefined}
      onKeyDown={
        isInteractive && !disabled
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      aria-disabled={disabled || undefined}
      data-slot="item"
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm',
        isInteractive && 'cursor-pointer hover:bg-accent',
        active && 'bg-accent text-accent-foreground',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {icon && (
        <span className="size-4 shrink-0 text-muted-foreground flex items-center justify-center [&_svg]:size-4">
          {icon}
        </span>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <span className="font-medium truncate">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground truncate">{description}</span>
        )}
      </div>

      {trailing && (
        <span className="shrink-0">{trailing}</span>
      )}
    </div>
  )
}

export { Item }
