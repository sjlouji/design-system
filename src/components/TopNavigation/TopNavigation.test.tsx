import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { TopNavigation } from './TopNavigation'
import type { NavItem } from './TopNavigation'

const items: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', active: true },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Team' },
  { id: 'settings', label: 'Settings', disabled: true },
]

describe('TopNavigation', () => {
  it('renders all items', () => {
    render(<TopNavigation items={items} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('applies active class to active item', () => {
    render(<TopNavigation items={items} />)
    const dashboardItem = screen.getByText('Dashboard').closest('[data-active]')
    expect(dashboardItem).toBeInTheDocument()
    expect(dashboardItem).toHaveAttribute('data-active', 'true')
  })

  it('does not apply active attribute to inactive items', () => {
    render(<TopNavigation items={items} />)
    const projectsItem = screen.getByText('Projects').closest('button')
    expect(projectsItem).not.toHaveAttribute('data-active')
  })

  it('calls onItemClick when an item is clicked', () => {
    const onItemClick = vi.fn()
    render(<TopNavigation items={items} onItemClick={onItemClick} />)
    fireEvent.click(screen.getByText('Projects'))
    expect(onItemClick).toHaveBeenCalledWith(items[1])
  })

  it('applies disabled styles to disabled items', () => {
    render(<TopNavigation items={items} />)
    const settingsItem = screen.getByText('Settings').closest('button')
    expect(settingsItem?.className).toContain('pointer-events-none')
  })

  it('renders badge when provided', () => {
    render(
      <TopNavigation
        items={[{ id: 'inbox', label: 'Inbox', badge: 5 }]}
      />
    )
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders item as anchor when href is provided', () => {
    render(
      <TopNavigation
        items={[{ id: 'home', label: 'Home', href: '/home' }]}
      />
    )
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toHaveAttribute('href', '/home')
  })
})
