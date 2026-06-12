import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { ChatThread, ChatThreadEmpty } from './ChatThread'

describe('ChatThread', () => {
  it('renders children', () => {
    render(
      <ChatThread>
        <div>Message 1</div>
        <div>Message 2</div>
      </ChatThread>
    )
    expect(screen.getByText('Message 1')).toBeInTheDocument()
    expect(screen.getByText('Message 2')).toBeInTheDocument()
  })
})

describe('ChatThreadEmpty', () => {
  it('renders empty state', () => {
    render(<ChatThreadEmpty />)
    expect(screen.getByText('How can I help you today?')).toBeInTheDocument()
  })
})
