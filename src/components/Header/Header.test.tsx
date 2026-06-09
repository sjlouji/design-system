import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Header } from './Header'

describe('Header', () => {
  it('renders branding slot', () => {
    render(<Header branding={<div data-testid="branding">Acme</div>} />)
    expect(screen.getByTestId('branding')).toBeInTheDocument()
  })

  it('renders user name in avatar trigger', () => {
    render(
      <Header
        user={{ name: 'Jane Smith', email: 'jane@example.com' }}
      />
    )
    // Avatar fallback shows initials
    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(<Header actions={<button data-testid="action-btn">Notify</button>} />)
    expect(screen.getByTestId('action-btn')).toBeInTheDocument()
  })

  it('renders navigation slot on desktop', () => {
    render(<Header navigation={<div data-testid="nav">Nav</div>} />)
    expect(screen.getByTestId('nav')).toBeInTheDocument()
  })

  it('applies sticky class by default', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header.className).toContain('sticky')
  })

  it('omits sticky class when sticky=false', () => {
    render(<Header sticky={false} />)
    const header = screen.getByRole('banner')
    expect(header.className).not.toContain('sticky')
  })
})
