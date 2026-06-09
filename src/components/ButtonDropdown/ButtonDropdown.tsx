import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Spinner } from '@/components/Spinner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'

export interface DropdownAction {
  label: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  destructive?: boolean
}

export interface ButtonDropdownProps {
  label: string
  onClick?: () => void
  actions: DropdownAction[]
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'sm' | 'default' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
}

function ButtonDropdown({
  label,
  onClick,
  actions,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  className,
}: ButtonDropdownProps) {
  const isDisabled = disabled || loading

  return (
    <div className={cn('inline-flex', className)}>
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={isDisabled}
        className="rounded-r-none focus-visible:z-10"
      >
        {loading && <Spinner size="sm" className="mr-1" />}
        {label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            disabled={isDisabled}
            aria-label="More actions"
            className={cn(
              '-ml-px rounded-l-none px-2',
              variant === 'default' && 'border-l border-l-primary-foreground/20',
              variant === 'outline' && 'border-l border-l-border',
              variant === 'secondary' && 'border-l border-l-secondary-foreground/20',
              'focus-visible:z-10'
            )}
          >
            <ChevronDownIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              variant={action.destructive ? 'destructive' : 'default'}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { ButtonDropdown }
