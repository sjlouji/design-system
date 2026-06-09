import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { MessageFeedback } from './MessageFeedback'

describe('MessageFeedback', () => {
  it('renders thumb buttons', () => {
    render(<MessageFeedback onSubmit={() => {}} />)
    expect(screen.getByRole('button', { name: 'Thumbs up' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Thumbs down' })).toBeInTheDocument()
  })

  it('shows textarea and submit after clicking a thumb', async () => {
    const user = userEvent.setup()
    render(<MessageFeedback onSubmit={() => {}} />)
    await user.click(screen.getByRole('button', { name: 'Thumbs up' }))
    expect(screen.getByPlaceholderText(/Optional/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit feedback' })).toBeInTheDocument()
  })

  it('calls onSubmit with rating when submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<MessageFeedback onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: 'Thumbs up' }))
    await user.click(screen.getByRole('button', { name: 'Submit feedback' }))
    expect(onSubmit).toHaveBeenCalledWith('positive', undefined)
  })

  it('calls onSubmit with comment when comment entered', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<MessageFeedback onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: 'Thumbs down' }))
    await user.type(screen.getByPlaceholderText(/Optional/), 'Too verbose')
    await user.click(screen.getByRole('button', { name: 'Submit feedback' }))
    expect(onSubmit).toHaveBeenCalledWith('negative', 'Too verbose')
  })
})
