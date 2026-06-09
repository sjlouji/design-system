import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { PromptCard } from './PromptCard'

describe('PromptCard', () => {
  it('renders title', () => {
    render(<PromptCard title="My Prompt" content="Some content here" />)
    expect(screen.getByText('My Prompt')).toBeInTheDocument()
  })

  it('renders content', () => {
    render(<PromptCard title="Title" content="This is the prompt content" />)
    expect(screen.getByText('This is the prompt content')).toBeInTheDocument()
  })

  it('renders category badge when provided', () => {
    render(<PromptCard title="Title" content="Content" category="Writing" />)
    expect(screen.getByText('Writing')).toBeInTheDocument()
  })

  it('calls onUse when use button clicked', async () => {
    const user = userEvent.setup()
    const onUse = vi.fn()
    render(<PromptCard title="Title" content="Content" onUse={onUse} />)
    await user.click(screen.getByRole('button', { name: 'Use prompt' }))
    expect(onUse).toHaveBeenCalledOnce()
  })

  it('calls onCopy when copy button clicked', async () => {
    const user = userEvent.setup()
    const onCopy = vi.fn()
    render(<PromptCard title="Title" content="Content" onCopy={onCopy} />)
    await user.click(screen.getByRole('button', { name: 'Copy prompt' }))
    expect(onCopy).toHaveBeenCalledOnce()
  })

  it('calls onDelete when delete button clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(<PromptCard title="Title" content="Content" onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: 'Delete prompt' }))
    expect(onDelete).toHaveBeenCalledOnce()
  })
})
