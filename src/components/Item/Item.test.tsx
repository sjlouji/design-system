import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Item } from './Item'

describe('Item', () => {
  it('renders the label', () => {
    render(<Item label="Settings" />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<Item label="Settings" description="Manage your settings" />)
    expect(screen.getByText('Manage your settings')).toBeInTheDocument()
  })

  it('renders the trailing element when provided', () => {
    render(<Item label="Messages" trailing={<span>12</span>} />)
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Item label="Click me" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick on Enter key', async () => {
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Item label="Press me" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies active styles when active=true', () => {
    render(<Item label="Active item" active />)
    const el = screen.getByText('Active item').closest('[data-slot="item"]')
    expect(el?.className).toContain('bg-accent')
  })

  it('applies disabled when disabled=true', () => {
    const onClick = vi.fn()
    render(<Item label="Disabled" disabled onClick={onClick} />)
    const el = screen.getByText('Disabled').closest('[data-slot="item"]')
    expect(el?.className).toContain('pointer-events-none')
  })

  it('does not render a button role when no onClick', () => {
    render(<Item label="Plain item" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
