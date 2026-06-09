import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    render(<Badge data-testid="badge">Default</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'default')
  })

  it('applies the specified variant', () => {
    render(
      <Badge variant="destructive" data-testid="badge">
        Error
      </Badge>
    )
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'destructive')
  })

  it('applies secondary variant', () => {
    render(
      <Badge variant="secondary" data-testid="badge">
        Secondary
      </Badge>
    )
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'secondary')
  })
})
