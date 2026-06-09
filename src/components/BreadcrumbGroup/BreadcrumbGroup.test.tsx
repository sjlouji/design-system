import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { BreadcrumbGroup } from './BreadcrumbGroup'

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Design System', current: true },
]

const longItems = [
  { label: 'Home', href: '/' },
  { label: 'Workspace', href: '/workspace' },
  { label: 'Projects', href: '/workspace/projects' },
  { label: 'Design', href: '/workspace/projects/design' },
  { label: 'Components', href: '/workspace/projects/design/components' },
  { label: 'Button', current: true },
]

describe('BreadcrumbGroup', () => {
  it('renders all items when no maxItems', () => {
    render(<BreadcrumbGroup items={defaultItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Design System')).toBeInTheDocument()
  })

  it('renders current page without a link', () => {
    render(<BreadcrumbGroup items={defaultItems} />)
    const currentPage = screen.getByText('Design System')
    expect(currentPage.closest('a')).toBeNull()
  })

  it('renders non-current items as links', () => {
    render(<BreadcrumbGroup items={defaultItems} />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('collapses middle items with ellipsis when maxItems is exceeded', () => {
    render(<BreadcrumbGroup items={longItems} maxItems={3} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Button')).toBeInTheDocument()
    // Middle items should not be visible
    expect(screen.queryByText('Workspace')).not.toBeInTheDocument()
    expect(screen.queryByText('Projects')).not.toBeInTheDocument()
  })

  it('renders ellipsis indicator when collapsing', () => {
    render(<BreadcrumbGroup items={longItems} maxItems={3} />)
    // BreadcrumbEllipsis renders "More" as sr-only text
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  it('does not collapse when items count is within maxItems', () => {
    render(<BreadcrumbGroup items={defaultItems} maxItems={5} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Design System')).toBeInTheDocument()
    expect(screen.queryByText('More')).not.toBeInTheDocument()
  })
})
