import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { MessageActions } from './MessageActions'

describe('MessageActions', () => {
  it('renders only provided actions', () => {
    render(<MessageActions onCopy={() => {}} />)
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Regenerate' })).toBeNull()
  })

  it('calls onCopy when copy button clicked', async () => {
    const user = userEvent.setup()
    const onCopy = vi.fn()
    render(<MessageActions onCopy={onCopy} />)
    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(onCopy).toHaveBeenCalledOnce()
  })

  it('calls onThumbsUp when thumbs up clicked', async () => {
    const user = userEvent.setup()
    const onThumbsUp = vi.fn()
    render(<MessageActions onThumbsUp={onThumbsUp} />)
    await user.click(screen.getByRole('button', { name: 'Good response' }))
    expect(onThumbsUp).toHaveBeenCalledOnce()
  })

  it('renders all actions when all handlers provided', () => {
    render(
      <MessageActions
        onCopy={() => {}}
        onRegenerate={() => {}}
        onThumbsUp={() => {}}
        onThumbsDown={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Regenerate' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Good response' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bad response' })).toBeInTheDocument()
  })
})
