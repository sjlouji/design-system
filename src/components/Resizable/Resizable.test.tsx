import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable'

describe('Resizable', () => {
  it('renders panels', () => {
    render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>Left</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>Right</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
    const panels = document.querySelectorAll('[data-slot="resizable-panel"]')
    expect(panels).toHaveLength(2)
  })

  it('renders the panel group', () => {
    render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={100}>
          <div>Content</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
    const group = document.querySelector('[data-slot="resizable-panel-group"]')
    expect(group).toBeInTheDocument()
  })
})
