import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { ChatShell } from './ChatShell'

describe('ChatShell', () => {
  it('renders children', () => {
    render(
      <ChatShell>
        <div>Main content</div>
      </ChatShell>
    )
    expect(screen.getByText('Main content')).toBeInTheDocument()
  })

  it('renders sidebar when provided', () => {
    render(
      <ChatShell sidebar={<div>Sidebar content</div>}>
        <div>Main</div>
      </ChatShell>
    )
    expect(screen.getByText('Sidebar content')).toBeInTheDocument()
  })

  it('does not render sidebar when not provided', () => {
    const { container } = render(
      <ChatShell>
        <div>Main</div>
      </ChatShell>
    )
    expect(container.querySelector('aside')).toBeNull()
  })

  it('renders header when provided', () => {
    render(
      <ChatShell header={<div>Header area</div>}>
        <div>Main</div>
      </ChatShell>
    )
    expect(screen.getByText('Header area')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <ChatShell footer={<div>Footer area</div>}>
        <div>Main</div>
      </ChatShell>
    )
    expect(screen.getByText('Footer area')).toBeInTheDocument()
  })
})
