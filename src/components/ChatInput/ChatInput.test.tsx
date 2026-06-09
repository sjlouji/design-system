import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { ChatInput } from './ChatInput'

describe('ChatInput', () => {
  it('renders textarea', () => {
    render(<ChatInput placeholder="Type here…" />)
    expect(screen.getByPlaceholderText('Type here…')).toBeInTheDocument()
  })

  it('send button is disabled when empty', () => {
    render(<ChatInput />)
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
  })

  it('send button enables when text entered', async () => {
    const user = userEvent.setup()
    render(<ChatInput />)
    await user.type(screen.getByRole('textbox'), 'Hello')
    expect(screen.getByRole('button', { name: 'Send message' })).not.toBeDisabled()
  })

  it('calls onSubmit on Cmd+Enter', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ChatInput onSubmit={onSubmit} />)
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello')
    await user.keyboard('{Meta>}{Enter}{/Meta}')
    expect(onSubmit).toHaveBeenCalledWith('Hello')
  })

  it('calls onSubmit when send button clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ChatInput onSubmit={onSubmit} />)
    await user.type(screen.getByRole('textbox'), 'Test message')
    await user.click(screen.getByRole('button', { name: 'Send message' }))
    expect(onSubmit).toHaveBeenCalledWith('Test message')
  })
})
