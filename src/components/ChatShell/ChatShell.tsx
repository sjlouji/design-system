import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatShellProps {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

function ChatShell({ sidebar, header, children, footer, className }: ChatShellProps) {
  return (
    <div className={cn('flex h-screen overflow-hidden bg-background', className)}>
      {/* Sidebar */}
      {sidebar && (
        <aside className="w-[260px] flex-shrink-0 flex flex-col bg-sidebar border-r border-sidebar-border">
          {sidebar}
        </aside>
      )}

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0">
        {header && (
          <header className="flex-shrink-0 flex items-center px-4 h-14 border-b border-border/60 bg-background/80 backdrop-blur-sm">
            {header}
          </header>
        )}

        <main className="flex-1 overflow-hidden">
          {children}
        </main>

        {footer && (
          <footer className="flex-shrink-0 px-4 py-3 border-t border-border/40 bg-background/80 backdrop-blur-sm">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}

export { ChatShell }
