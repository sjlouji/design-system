import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Direction } from './Direction'

describe('Direction', () => {
  it('renders children', () => {
    render(
      <Direction>
        <span>Hello world</span>
      </Direction>
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('defaults to ltr', () => {
    render(
      <Direction>
        <div data-testid="child">content</div>
      </Direction>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('accepts rtl dir prop', () => {
    render(
      <Direction dir="rtl">
        <div data-testid="rtl-child">rtl content</div>
      </Direction>
    )
    expect(screen.getByTestId('rtl-child')).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <Direction dir="ltr">
        <span>First</span>
        <span>Second</span>
      </Direction>
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })
})
