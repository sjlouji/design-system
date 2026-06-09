import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { ThinkingBlock } from './ThinkingBlock'

describe('ThinkingBlock', () => {
  it('renders title', () => {
    render(<ThinkingBlock>Some reasoning</ThinkingBlock>)
    expect(screen.getByText('Thinking…')).toBeInTheDocument()
  })

  it('renders custom title', () => {
    render(<ThinkingBlock title="Reasoning…">Content</ThinkingBlock>)
    expect(screen.getByText('Reasoning…')).toBeInTheDocument()
  })

  it('is closed by default', () => {
    render(<ThinkingBlock>Hidden content</ThinkingBlock>)
    // Radix Collapsible removes content from DOM when closed
    const content = screen.queryByText('Hidden content')
    // Either not in DOM or not visible
    if (content) {
      expect(content).not.toBeVisible()
    } else {
      expect(content).toBeNull()
    }
  })

  it('toggles open on click', async () => {
    const user = userEvent.setup()
    render(<ThinkingBlock>Toggle content</ThinkingBlock>)
    const trigger = screen.getByRole('button')
    await user.click(trigger)
    expect(screen.getByText('Toggle content')).toBeVisible()
  })

  it('renders open when defaultOpen=true', () => {
    render(<ThinkingBlock defaultOpen>Visible content</ThinkingBlock>)
    expect(screen.getByText('Visible content')).toBeVisible()
  })
})
