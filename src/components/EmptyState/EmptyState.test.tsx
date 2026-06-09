import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { InboxIcon } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from '@/components/Button'

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No messages" />)
    expect(screen.getByText('No messages')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<EmptyState title="No messages" description="Your inbox is empty." />)
    expect(screen.getByText('Your inbox is empty.')).toBeInTheDocument()
  })

  it('renders icon slot', () => {
    render(<EmptyState title="No messages" icon={<InboxIcon data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders action', () => {
    render(
      <EmptyState
        title="No projects"
        action={<Button>Create Project</Button>}
      />
    )
    expect(screen.getByRole('button', { name: 'Create Project' })).toBeInTheDocument()
  })

  it('does not render icon container when icon is omitted', () => {
    const { container } = render(<EmptyState title="No messages" />)
    // icon wrapper div should not be present
    expect(container.querySelector('.bg-muted')).not.toBeInTheDocument()
  })
})
