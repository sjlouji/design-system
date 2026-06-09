import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { PromptInput } from './PromptInput'

describe('PromptInput', () => {
  it('renders textarea', () => {
    render(<PromptInput placeholder="Enter prompt here" />)
    expect(screen.getByPlaceholderText('Enter prompt here')).toBeInTheDocument()
  })

  it('shows token counter when maxTokens and currentTokens provided', () => {
    render(<PromptInput maxTokens={2000} currentTokens={500} />)
    expect(screen.getByText(/500/)).toBeInTheDocument()
    expect(screen.getByText(/2,000/)).toBeInTheDocument()
  })

  it('calls onSubmit with value', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PromptInput onSubmit={onSubmit} />)
    await user.type(screen.getByRole('textbox'), 'My prompt')
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onSubmit).toHaveBeenCalledWith('My prompt')
  })

  it('submit button disabled when empty', () => {
    render(<PromptInput />)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
  })

  it('calls onSubmit on Cmd+Enter', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PromptInput onSubmit={onSubmit} />)
    await user.type(screen.getByRole('textbox'), 'Hello')
    await user.keyboard('{Meta>}{Enter}{/Meta}')
    expect(onSubmit).toHaveBeenCalledWith('Hello')
  })
})
