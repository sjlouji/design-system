import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { AspectRatio } from './AspectRatio'

describe('AspectRatio', () => {
  it('renders children', () => {
    render(
      <div style={{ width: 400 }}>
        <AspectRatio ratio={16 / 9}>
          <div data-testid="child">content</div>
        </AspectRatio>
      </div>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('applies the data-slot attribute', () => {
    render(
      <div style={{ width: 400 }}>
        <AspectRatio ratio={4 / 3} data-testid="aspect-ratio">
          <div>inner</div>
        </AspectRatio>
      </div>
    )
    expect(screen.getByTestId('aspect-ratio')).toHaveAttribute(
      'data-slot',
      'aspect-ratio'
    )
  })
})
