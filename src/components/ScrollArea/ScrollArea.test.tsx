import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { ScrollArea } from './ScrollArea'

describe('ScrollArea', () => {
  it('renders children', () => {
    render(
      <ScrollArea>
        <p>Scroll content here</p>
      </ScrollArea>
    )
    expect(screen.getByText('Scroll content here')).toBeInTheDocument()
  })

  it('renders the scroll area root', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const root = document.querySelector('[data-slot="scroll-area"]')
    expect(root).toBeInTheDocument()
  })
})
