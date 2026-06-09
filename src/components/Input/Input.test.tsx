import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('accepts and displays a value', async () => {
    const user = userEvent.setup()
    render(<Input />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('renders with a placeholder', () => {
    render(<Input placeholder="Type something..." />)
    expect(screen.getByPlaceholderText('Type something...')).toBeInTheDocument()
  })

  it('renders as disabled when disabled prop is passed', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders as email type', () => {
    render(<Input type="email" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email')
  })

  it('renders as password type', () => {
    render(<Input type="password" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password')
  })
})
