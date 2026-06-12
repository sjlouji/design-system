import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { ChatMessage } from './ChatMessage'

describe('ChatMessage', () => {
  it('renders user content', () => {
    render(<ChatMessage role="user" content="Hello there" />)
    expect(screen.getByText('Hello there')).toBeInTheDocument()
  })

  it('renders assistant content as markdown', () => {
    render(<ChatMessage role="assistant" content="**Bold text** here" />)
    expect(screen.getByText('Bold text')).toBeInTheDocument()
  })

  it('applies user role class', () => {
    const { container } = render(<ChatMessage role="user" content="Hi" />)
    expect(container.querySelector('[data-role="user"]')).toBeInTheDocument()
  })

  it('applies assistant role class', () => {
    const { container } = render(<ChatMessage role="assistant" content="Hi" />)
    expect(container.querySelector('[data-role="assistant"]')).toBeInTheDocument()
  })

  it('shows typing indicator when streaming', () => {
    const { container } = render(
      <ChatMessage role="assistant" content="" streaming={true} />
    )
    expect(container.querySelector('[role="status"]')).toBeInTheDocument()
  })

  it('renders system message', () => {
    render(<ChatMessage role="system" content="Session started" />)
    expect(screen.getByText('Session started')).toBeInTheDocument()
  })

  it('renders timestamp when provided', () => {
    render(<ChatMessage role="user" content="Hi" timestamp="3:00 PM" />)
    expect(screen.getByText('3:00 PM')).toBeInTheDocument()
  })
})
