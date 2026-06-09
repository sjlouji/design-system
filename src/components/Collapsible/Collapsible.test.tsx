import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible'

function TestCollapsible() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Toggle content</CollapsibleTrigger>
      <CollapsibleContent>Hidden content</CollapsibleContent>
    </Collapsible>
  )
}

describe('Collapsible', () => {
  it('renders the trigger', () => {
    render(<TestCollapsible />)
    expect(screen.getByText('Toggle content')).toBeInTheDocument()
  })

  it('toggles content on click', async () => {
    const user = userEvent.setup()
    render(<TestCollapsible />)

    const trigger = screen.getByText('Toggle content').closest('[data-slot="collapsible-trigger"]')

    // Initially closed
    expect(trigger).toHaveAttribute('data-state', 'closed')

    await user.click(screen.getByText('Toggle content'))

    // After click: open, content in DOM
    expect(trigger).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('Hidden content')).toBeInTheDocument()
  })
})
