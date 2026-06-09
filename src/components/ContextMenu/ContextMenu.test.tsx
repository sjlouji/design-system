import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from './ContextMenu'

describe('ContextMenu', () => {
  it('renders the trigger element', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">
          Right-click me
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    expect(screen.getByTestId('trigger')).toBeInTheDocument()
    expect(screen.getByText('Right-click me')).toBeInTheDocument()
  })
})
