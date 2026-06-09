import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders an svg with role status', () => {
    render(<Spinner />)
    const svg = screen.getByRole('status')
    expect(svg).toBeInTheDocument()
  })

  it('applies animate-spin class', () => {
    render(<Spinner />)
    const svg = screen.getByRole('status')
    expect(svg).toHaveClass('animate-spin')
  })

  it('renders xs size at 12px', () => {
    render(<Spinner size="xs" />)
    const svg = screen.getByRole('status')
    expect(svg).toHaveAttribute('width', '12')
    expect(svg).toHaveAttribute('height', '12')
  })

  it('renders sm size at 16px', () => {
    render(<Spinner size="sm" />)
    const svg = screen.getByRole('status')
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('height', '16')
  })

  it('renders md size at 20px (default)', () => {
    render(<Spinner />)
    const svg = screen.getByRole('status')
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })

  it('renders lg size at 24px', () => {
    render(<Spinner size="lg" />)
    const svg = screen.getByRole('status')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('forwards className', () => {
    render(<Spinner className="text-blue-500" />)
    const svg = screen.getByRole('status')
    expect(svg).toHaveClass('text-blue-500')
  })
})
