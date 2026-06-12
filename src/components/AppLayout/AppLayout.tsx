import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'

export interface AppLayoutProps {
  // Left navigation sidebar
  navigation?: React.ReactNode
  navigationOpen?: boolean
  onNavigationChange?: (open: boolean) => void
  navigationWidth?: number

  // Top
  notifications?: React.ReactNode
  breadcrumbs?: React.ReactNode

  // Right tools/help panel
  tools?: React.ReactNode
  toolsOpen?: boolean
  onToolsChange?: (open: boolean) => void
  toolsWidth?: number

  // Main content (required)
  content: React.ReactNode

  // Bottom split panel
  splitPanel?: React.ReactNode
  splitPanelHeader?: React.ReactNode
  splitPanelOpen?: boolean
  onSplitPanelToggle?: (open: boolean) => void
  splitPanelSize?: number

  className?: string
}

function AppLayout({
  navigation,
  navigationOpen,
  onNavigationChange,
  navigationWidth = 240,
  notifications,
  breadcrumbs,
  tools,
  toolsOpen,
  onToolsChange,
  toolsWidth = 280,
  content,
  splitPanel,
  splitPanelHeader,
  splitPanelOpen,
  onSplitPanelToggle,
  splitPanelSize = 300,
  className,
}: AppLayoutProps) {
  // Uncontrolled internal state — initialised from props
  const [navOpenInternal, setNavOpenInternal] = React.useState(
    navigationOpen ?? !!navigation
  )
  const [toolsOpenInternal, setToolsOpenInternal] = React.useState(
    toolsOpen ?? false
  )
  const [splitOpenInternal, setSplitOpenInternal] = React.useState(
    splitPanelOpen ?? false
  )

  // Resolved open states — controlled prop wins when provided
  const navOpen = navigationOpen !== undefined ? navigationOpen : navOpenInternal
  const toolsPanelOpen = toolsOpen !== undefined ? toolsOpen : toolsOpenInternal
  const splitPanelIsOpen =
    splitPanelOpen !== undefined ? splitPanelOpen : splitOpenInternal

  function handleNavToggle() {
    const next = !navOpen
    setNavOpenInternal(next)
    onNavigationChange?.(next)
  }

  function handleToolsToggle() {
    const next = !toolsPanelOpen
    setToolsOpenInternal(next)
    onToolsChange?.(next)
  }

  function handleSplitToggle() {
    const next = !splitPanelIsOpen
    setSplitOpenInternal(next)
    onSplitPanelToggle?.(next)
  }

  const showHeaderBar = !!(navigation || tools || breadcrumbs)

  return (
    <div className={cn('flex h-screen flex-col overflow-hidden', className)}>
      {/* Notifications bar */}
      {notifications && (
        <div className="flex-none">{notifications}</div>
      )}

      {/* Three-column body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left navigation */}
        {navigation && (
          <aside
            className="flex-none overflow-hidden border-r transition-[width] duration-200"
            style={{ width: navOpen ? navigationWidth : 0 }}
            aria-hidden={!navOpen}
          >
            <div
              className="h-full overflow-y-auto"
              style={{ width: navigationWidth }}
            >
              {navigation}
            </div>
          </aside>
        )}

        {/* Center column */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Header bar */}
          {showHeaderBar && (
            <header className="flex h-11 flex-none items-center gap-2 border-b px-4">
              {navigation && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleNavToggle}
                  aria-label={navOpen ? 'Collapse navigation' : 'Expand navigation'}
                >
                  <PanelLeftIcon />
                </Button>
              )}

              {breadcrumbs && (
                <div className="flex-1 min-w-0">{breadcrumbs}</div>
              )}

              {tools && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleToolsToggle}
                  className={cn(!breadcrumbs && 'ml-auto')}
                  aria-label={toolsPanelOpen ? 'Close tools' : 'Open tools'}
                >
                  <PanelRightIcon />
                </Button>
              )}
            </header>
          )}

          {/* Scrollable content */}
          <main className="flex-1 overflow-auto">{content}</main>

          {/* Split panel */}
          {splitPanel && (
            <section className="flex-none">
              {/* Toggle bar */}
              <button
                type="button"
                onClick={handleSplitToggle}
                className="flex h-10 w-full cursor-pointer items-center gap-2 border-t bg-muted/30 px-4 text-sm font-medium hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-expanded={splitPanelIsOpen}
              >
                {splitPanelIsOpen ? (
                  <ChevronDownIcon className="size-4 shrink-0" />
                ) : (
                  <ChevronUpIcon className="size-4 shrink-0" />
                )}
                {splitPanelHeader && (
                  <span className="truncate">{splitPanelHeader}</span>
                )}
              </button>

              {/* Collapsible panel body */}
              <div
                className="overflow-hidden transition-[height] duration-200"
                style={{ height: splitPanelIsOpen ? splitPanelSize : 0 }}
                aria-hidden={!splitPanelIsOpen}
              >
                <div
                  className="overflow-auto"
                  style={{ height: splitPanelSize }}
                >
                  {splitPanel}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right tools panel */}
        {tools && (
          <aside
            className="flex-none overflow-hidden border-l transition-[width] duration-200"
            style={{ width: toolsPanelOpen ? toolsWidth : 0 }}
            aria-hidden={!toolsPanelOpen}
          >
            <div
              className="h-full overflow-y-auto"
              style={{ width: toolsWidth }}
            >
              {tools}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export { AppLayout }
