import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { PageHeader } from './PageHeader'
import { Button } from '@/components/Button'

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title="Dashboard" />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<PageHeader title="Dashboard" description="Overview of your account." />)
    expect(screen.getByText('Overview of your account.')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    render(<PageHeader title="Dashboard" />)
    expect(screen.queryByText('Overview of your account.')).not.toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(<PageHeader title="Projects" actions={<Button>New Project</Button>} />)
    expect(screen.getByRole('button', { name: 'New Project' })).toBeInTheDocument()
  })

  it('renders breadcrumb when provided', () => {
    render(<PageHeader title="Settings" breadcrumb={<span>Home / Settings</span>} />)
    expect(screen.getByText('Home / Settings')).toBeInTheDocument()
  })
})
