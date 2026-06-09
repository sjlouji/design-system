import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies the default variant attribute', () => {
    render(<Button data-testid="btn">Default</Button>)
    expect(screen.getByTestId('btn')).toHaveAttribute('data-variant', 'default')
  })

  it('applies the specified variant attribute', () => {
    render(
      <Button variant="destructive" data-testid="btn">
        Delete
      </Button>
    )
    expect(screen.getByTestId('btn')).toHaveAttribute('data-variant', 'destructive')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders as disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
