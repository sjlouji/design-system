import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/DropdownMenu'

interface HeaderUser {
  name: string
  email?: string
  avatar?: string
}

interface HeaderProps {
  branding?: React.ReactNode
  navigation?: React.ReactNode
  actions?: React.ReactNode
  user?: HeaderUser
  onSignOut?: () => void
  sticky?: boolean
  className?: string
}

function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Header({
  branding,
  navigation,
  actions,
  user,
  onSignOut,
  sticky = true,
  className,
}: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        'flex items-center h-14 px-4 border-b border-border bg-background',
        sticky && 'sticky top-0 z-50',
        className
      )}
    >
      {/* Branding — far left */}
      {branding && <div className="flex-shrink-0">{branding}</div>}

      {/* Navigation — center, hidden on mobile */}
      {navigation && (
        <nav className="hidden md:flex flex-1 justify-center px-4">
          {navigation}
        </nav>
      )}

      {/* Spacer when no navigation */}
      {!navigation && <div className="flex-1" />}

      {/* Actions + user menu — far right */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`User menu for ${user.name}`}
              >
                <Avatar>
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                {user.email && (
                  <p className="text-xs text-muted-foreground mt-1 leading-none">
                    {user.email}
                  </p>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}

export { Header }
export type { HeaderProps, HeaderUser }
