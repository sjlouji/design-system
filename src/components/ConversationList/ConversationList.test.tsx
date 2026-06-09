import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { ConversationList } from './ConversationList'
import type { Conversation } from './ConversationList'

const conversations: Conversation[] = [
  { id: '1', title: 'First conversation', preview: 'Hello there', active: true },
  { id: '2', title: 'Second conversation', preview: 'How are you' },
]

describe('ConversationList', () => {
  it('renders conversations', () => {
    render(<ConversationList conversations={conversations} />)
    expect(screen.getByText('First conversation')).toBeInTheDocument()
    expect(screen.getByText('Second conversation')).toBeInTheDocument()
  })

  it('renders new chat button', () => {
    render(<ConversationList conversations={conversations} />)
    expect(screen.getByRole('button', { name: 'New chat' })).toBeInTheDocument()
  })

  it('calls onSelect when item clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ConversationList conversations={conversations} onSelect={onSelect} />)
    await user.click(screen.getByText('Second conversation'))
    expect(onSelect).toHaveBeenCalledWith('2')
  })
})
