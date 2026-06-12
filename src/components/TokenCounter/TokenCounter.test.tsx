import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { TokenCounter } from './TokenCounter'

describe('TokenCounter', () => {
  it('renders current and max values', () => {
    render(<TokenCounter current={1000} max={8000} />)
    expect(screen.getByText(/1,000/)).toBeInTheDocument()
    expect(screen.getByText(/8,000/)).toBeInTheDocument()
  })

  it('applies muted color when below 75%', () => {
    const { container } = render(<TokenCounter current={1000} max={8000} />)
    const text = container.querySelector('.text-muted-foreground')
    expect(text).toBeInTheDocument()
  })

  it('applies warning color when above 75%', () => {
    const { container } = render(<TokenCounter current={6200} max={8000} />)
    const text = container.querySelector('.text-warning')
    expect(text).toBeInTheDocument()
  })

  it('applies destructive color when above 90%', () => {
    const { container } = render(<TokenCounter current={7400} max={8000} />)
    const text = container.querySelector('.text-destructive')
    expect(text).toBeInTheDocument()
  })
})
