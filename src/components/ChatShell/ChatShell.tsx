import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatShellProps {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

function ChatShell({
  sidebar,
  header,
  children,
  footer,
  className,
}: ChatShellProps) {
  return (
    <div className={cn('flex h-screen bg-background', className)}>
      {sidebar && (
        <aside className="w-64 border-r border-border bg-sidebar flex-shrink-0 flex flex-col">
          {sidebar}
        </aside>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        {header && (
          <header className="border-b border-border px-4 py-3 flex-shrink-0">
            {header}
          </header>
        )}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        {footer && (
          <footer className="border-t border-border p-4 flex-shrink-0">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}

export { ChatShell }
