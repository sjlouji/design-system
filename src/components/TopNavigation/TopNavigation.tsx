import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/Badge'

interface NavItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  badge?: string | number
  active?: boolean
  disabled?: boolean
}

interface TopNavigationProps {
  items: NavItem[]
  onItemClick?: (item: NavItem) => void
  className?: string
}

function TopNavigation({ items, onItemClick, className }: TopNavigationProps) {
  return (
    <nav data-slot="top-navigation" className={cn('flex items-center gap-1', className)}>
      {items.map((item) => {
        const handleClick = (e: React.MouseEvent) => {
          if (item.disabled) return
          if (!item.href) {
            e.preventDefault()
          }
          onItemClick?.(item)
        }

        const Tag = item.href ? 'a' : 'button'

        return (
          <Tag
            key={item.id}
            href={item.href}
            onClick={handleClick}
            data-active={item.active || undefined}
            aria-current={item.active ? 'page' : undefined}
            aria-disabled={item.disabled || undefined}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 text-sm rounded-md transition-colors',
              item.active
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
              item.disabled && 'opacity-50 pointer-events-none'
            )}
          >
            {item.icon && <span className="[&>svg]:size-4 shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <Badge variant="secondary" className="ml-0.5 h-5 min-w-5 px-1 text-xs">
                {item.badge}
              </Badge>
            )}
          </Tag>
        )
      })}
    </nav>
  )
}

export { TopNavigation }
export type { TopNavigationProps, NavItem }
