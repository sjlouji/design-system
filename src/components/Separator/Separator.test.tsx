import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders without crashing', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has data-slot="separator"', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveAttribute('data-slot', 'separator')
  })

  it('defaults to horizontal orientation', () => {
    const { container } = render(<Separator />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-orientation', 'vertical')
  })

  it('applies horizontal size classes via data attribute', () => {
    const { container } = render(<Separator orientation="horizontal" />)
    const el = container.firstChild as HTMLElement
    // Tailwind data-attribute classes are applied via className
    expect(el.className).toContain('data-[orientation=horizontal]:h-px')
  })

  it('applies vertical size classes via data attribute', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('data-[orientation=vertical]:w-px')
  })

  it('forwards className', () => {
    const { container } = render(<Separator className="my-custom" />)
    expect(container.firstChild).toHaveClass('my-custom')
  })

  it('accepts decorative prop', () => {
    const { container } = render(<Separator decorative={false} />)
    const el = container.firstChild as HTMLElement
    // When not decorative, Radix adds role="separator"
    expect(el).toHaveAttribute('role', 'separator')
  })
})
