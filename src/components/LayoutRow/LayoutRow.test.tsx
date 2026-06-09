import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { LayoutRow } from './LayoutRow'

describe('LayoutRow', () => {
  it('renders children', () => {
    render(
      <LayoutRow>
        <div data-testid="child-1">One</div>
        <div data-testid="child-2">Two</div>
      </LayoutRow>
    )
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })

  it('applies flex class', () => {
    render(<LayoutRow><span>test</span></LayoutRow>)
    const el = screen.getByTestId !== undefined
      ? document.querySelector('[data-slot="layout-row"]')
      : null
    expect(el?.className).toContain('flex')
  })

  it('applies gap class when gap prop is given', () => {
    render(<LayoutRow gap={4}><span>test</span></LayoutRow>)
    const el = document.querySelector('[data-slot="layout-row"]')
    expect(el?.className).toContain('gap-4')
  })

  it('applies align class when align prop is given', () => {
    render(<LayoutRow align="center"><span>test</span></LayoutRow>)
    const el = document.querySelector('[data-slot="layout-row"]')
    expect(el?.className).toContain('items-center')
  })

  it('applies justify class when justify prop is given', () => {
    render(<LayoutRow justify="between"><span>test</span></LayoutRow>)
    const el = document.querySelector('[data-slot="layout-row"]')
    expect(el?.className).toContain('justify-between')
  })

  it('applies flex-wrap when wrap is true', () => {
    render(<LayoutRow wrap><span>test</span></LayoutRow>)
    const el = document.querySelector('[data-slot="layout-row"]')
    expect(el?.className).toContain('flex-wrap')
  })

  it('accepts custom className', () => {
    render(<LayoutRow className="custom-class"><span>test</span></LayoutRow>)
    const el = document.querySelector('[data-slot="layout-row"]')
    expect(el?.className).toContain('custom-class')
  })
})
