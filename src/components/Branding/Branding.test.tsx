import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Branding } from './Branding'

describe('Branding', () => {
  it('renders name', () => {
    render(<Branding name="Acme" />)
    expect(screen.getByText('Acme')).toBeInTheDocument()
  })

  it('renders tagline when provided', () => {
    render(<Branding name="Acme" tagline="Build better products" />)
    expect(screen.getByText('Build better products')).toBeInTheDocument()
  })

  it('does not render tagline when not provided', () => {
    render(<Branding name="Acme" />)
    expect(screen.queryByText('Build better products')).not.toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<Branding name="Acme" href="https://example.com" />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('does not render a link when href is not provided', () => {
    render(<Branding name="Acme" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders default logo with first letter of name', () => {
    render(<Branding name="Acme" />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('renders custom logo when provided', () => {
    render(<Branding name="Acme" logo={<span data-testid="custom-logo" />} />)
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument()
  })
})
