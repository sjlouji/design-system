import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { UsersIcon } from 'lucide-react'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders value', () => {
    render(<StatCard label="Revenue" value="$12,400" />)
    expect(screen.getByText('$12,400')).toBeInTheDocument()
  })

  it('renders label', () => {
    render(<StatCard label="Revenue" value="$12,400" />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
  })

  it('renders positive trend', () => {
    render(<StatCard label="Users" value={500} trend={{ value: 10, label: 'this week' }} />)
    expect(screen.getByText(/↑/)).toBeInTheDocument()
    expect(screen.getByText(/this week/)).toBeInTheDocument()
  })

  it('renders negative trend with down arrow', () => {
    render(<StatCard label="Churn" value="3.2%" trend={{ value: -1.4 }} />)
    expect(screen.getByText(/↓/)).toBeInTheDocument()
  })

  it('shows skeleton when loading', () => {
    const { container } = render(<StatCard label="Revenue" value="$12,400" loading />)
    expect(container.querySelectorAll('[data-slot="skeleton"]').length).toBeGreaterThan(0)
  })

  it('does not render value when loading', () => {
    render(<StatCard label="Revenue" value="$12,400" loading />)
    expect(screen.queryByText('$12,400')).not.toBeInTheDocument()
  })

  it('renders icon slot', () => {
    render(<StatCard label="Users" value={100} icon={<UsersIcon data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
