import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/Resizable'

export interface PanelLayoutProps {
  mainContent: React.ReactNode
  panelContent: React.ReactNode
  /** 'side-end' = right (default), 'side-start' = left */
  panelPosition?: 'side-start' | 'side-end'
  /** default false */
  resizable?: boolean
  /**
   * When resizable=false: pixels (default 280).
   * When resizable=true: percent 0–100 (default 25).
   */
  defaultPanelSize?: number
  /**
   * When resizable=false: pixels minimum width.
   * When resizable=true: percent minimum size (default 10).
   */
  minPanelSize?: number
  /**
   * When resizable=false: pixels maximum width.
   * When resizable=true: percent maximum size (default 50).
   */
  maxPanelSize?: number
  /** aria-label for the main content region */
  mainFocusable?: { ariaLabel?: string }
  /** aria-label for the side panel region */
  panelFocusable?: { ariaLabel?: string }
  className?: string
}

function PanelLayout({
  mainContent,
  panelContent,
  panelPosition = 'side-end',
  resizable = false,
  defaultPanelSize,
  minPanelSize,
  maxPanelSize,
  mainFocusable,
  panelFocusable,
  className,
}: PanelLayoutProps) {
  if (resizable) {
    const panelPercent = defaultPanelSize ?? 25
    const mainPercent = 100 - panelPercent

    const sidePanel = (
      <ResizablePanel
        defaultSize={panelPercent}
        minSize={minPanelSize ?? 10}
        maxSize={maxPanelSize ?? 50}
      >
        <div className="h-full overflow-auto" aria-label={panelFocusable?.ariaLabel}>
          {panelContent}
        </div>
      </ResizablePanel>
    )

    const mainPanel = (
      <ResizablePanel defaultSize={mainPercent}>
        <div className="h-full overflow-auto" aria-label={mainFocusable?.ariaLabel}>
          {mainContent}
        </div>
      </ResizablePanel>
    )

    return (
      <ResizablePanelGroup orientation="horizontal" className={cn('h-full w-full', className)}>
        {panelPosition === 'side-start' ? (
          <>
            {sidePanel}
            <ResizableHandle withHandle />
            {mainPanel}
          </>
        ) : (
          <>
            {mainPanel}
            <ResizableHandle withHandle />
            {sidePanel}
          </>
        )}
      </ResizablePanelGroup>
    )
  }

  const panelWidth = defaultPanelSize ?? 280

  return (
    <div className={cn('flex h-full w-full overflow-hidden', className)}>
      {panelPosition === 'side-start' && (
        <aside
          style={{ width: panelWidth, minWidth: minPanelSize, maxWidth: maxPanelSize }}
          className="flex-none overflow-y-auto border-r"
          aria-label={panelFocusable?.ariaLabel}
        >
          {panelContent}
        </aside>
      )}
      <main className="min-w-0 flex-1 overflow-auto" aria-label={mainFocusable?.ariaLabel}>
        {mainContent}
      </main>
      {panelPosition !== 'side-start' && (
        <aside
          style={{ width: panelWidth, minWidth: minPanelSize, maxWidth: maxPanelSize }}
          className="flex-none overflow-y-auto border-l"
          aria-label={panelFocusable?.ariaLabel}
        >
          {panelContent}
        </aside>
      )}
    </div>
  )
}

export { PanelLayout }
