import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders the default label for online status', () => {
    render(<StatusBadge status="online" />)
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('renders the default label for offline status', () => {
    render(<StatusBadge status="offline" />)
    expect(screen.getByText('Offline')).toBeInTheDocument()
  })

  it('renders the default label for busy status', () => {
    render(<StatusBadge status="busy" />)
    expect(screen.getByText('Busy')).toBeInTheDocument()
  })

  it('renders the default label for away status', () => {
    render(<StatusBadge status="away" />)
    expect(screen.getByText('Away')).toBeInTheDocument()
  })

  it('renders the default label for pending status', () => {
    render(<StatusBadge status="pending" />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('renders a custom label', () => {
    render(<StatusBadge status="online" label="Available" />)
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('shows the dot by default', () => {
    const { container } = render(<StatusBadge status="online" />)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
  })

  it('hides the dot when showDot is false', () => {
    const { container } = render(<StatusBadge status="online" showDot={false} />)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).not.toBeInTheDocument()
  })

  it('applies the correct dot color class for online', () => {
    const { container } = render(<StatusBadge status="online" />)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot?.className).toContain('bg-[oklch')
  })

  it('applies the correct dot color class for busy', () => {
    const { container } = render(<StatusBadge status="busy" />)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies the correct dot color class for pending', () => {
    const { container } = render(<StatusBadge status="pending" />)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
  })

  it('sets data-status attribute', () => {
    const { container } = render(<StatusBadge status="away" />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveAttribute('data-status', 'away')
  })

  it('forwards className', () => {
    render(<StatusBadge status="online" className="custom-class" />)
    expect(screen.getByText('Online').closest('span[data-status]')).toHaveClass('custom-class')
  })
})
