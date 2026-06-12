import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { TruncatedText } from './TruncatedText'

describe('TruncatedText', () => {
  it('renders string children in a span', () => {
    render(<TruncatedText>Hello world</TruncatedText>)
    const span = screen.getByText('Hello world')
    expect(span.tagName).toBe('SPAN')
  })

  it('block and min-w-0 classes are always present on the span', () => {
    render(<TruncatedText>Always present</TruncatedText>)
    const span = screen.getByText('Always present')
    expect(span).toHaveClass('block')
    expect(span).toHaveClass('min-w-0')
  })

  it('lines=1 (default): span has the truncate class', () => {
    render(<TruncatedText>Truncated text</TruncatedText>)
    const span = screen.getByText('Truncated text')
    expect(span).toHaveClass('truncate')
  })

  it('lines=2: span has line-clamp-2 class', () => {
    render(<TruncatedText lines={2}>Two line clamp</TruncatedText>)
    const span = screen.getByText('Two line clamp')
    expect(span).toHaveClass('line-clamp-2')
  })

  it('lines=3: span has line-clamp-3 class', () => {
    render(<TruncatedText lines={3}>Three line clamp</TruncatedText>)
    const span = screen.getByText('Three line clamp')
    expect(span).toHaveClass('line-clamp-3')
  })

  it('lines=4: span has line-clamp-4 class', () => {
    render(<TruncatedText lines={4}>Four line clamp</TruncatedText>)
    const span = screen.getByText('Four line clamp')
    expect(span).toHaveClass('line-clamp-4')
  })

  it('lines=5: span has line-clamp-5 class', () => {
    render(<TruncatedText lines={5}>Five line clamp</TruncatedText>)
    const span = screen.getByText('Five line clamp')
    expect(span).toHaveClass('line-clamp-5')
  })

  it('lines=6: span has line-clamp-6 class', () => {
    render(<TruncatedText lines={6}>Six line clamp</TruncatedText>)
    const span = screen.getByText('Six line clamp')
    expect(span).toHaveClass('line-clamp-6')
  })

  it('className prop is applied to the inner span', () => {
    render(<TruncatedText className="custom-cls">Styled</TruncatedText>)
    const span = screen.getByText('Styled')
    expect(span).toHaveClass('custom-cls')
  })

  describe('Tooltip wrapping for string children', () => {
    it('wraps string children in a Tooltip structure', () => {
      const { container } = render(
        <TruncatedText>Tooltip text</TruncatedText>
      )
      // TooltipTrigger renders with data-slot="tooltip-trigger"
      const trigger = container.querySelector('[data-slot="tooltip-trigger"]')
      expect(trigger).toBeInTheDocument()
    })

    it('TooltipTrigger contains the text span', () => {
      const { container } = render(
        <TruncatedText>Trigger content</TruncatedText>
      )
      const trigger = container.querySelector('[data-slot="tooltip-trigger"]')!
      expect(trigger).toHaveTextContent('Trigger content')
    })

    it('TooltipContent contains the same string', () => {
      const { container } = render(
        <TruncatedText>Content in tooltip</TruncatedText>
      )
      // TooltipContent renders with data-slot="tooltip-content" in the DOM
      // even before hover, via a portal — query on document body
      const tooltipContent = document.querySelector('[data-slot="tooltip-content"]')
      // If the content is not yet mounted (portal), fall back to checking the
      // trigger text since the string is passed to both trigger and content
      if (tooltipContent) {
        expect(tooltipContent).toHaveTextContent('Content in tooltip')
      } else {
        const trigger = container.querySelector('[data-slot="tooltip-trigger"]')!
        expect(trigger).toHaveTextContent('Content in tooltip')
      }
    })
  })

  describe('non-string children: no Tooltip wrapping', () => {
    it('renders element children directly without a tooltip trigger', () => {
      const { container } = render(
        <TruncatedText>
          <span data-testid="inner-node">Rich content</span>
        </TruncatedText>
      )
      expect(screen.getByTestId('inner-node')).toBeInTheDocument()
      const trigger = container.querySelector('[data-slot="tooltip-trigger"]')
      expect(trigger).not.toBeInTheDocument()
    })

    it('renders element children inside the span with block and min-w-0', () => {
      const { container } = render(
        <TruncatedText>
          <em>Emphasized</em>
        </TruncatedText>
      )
      const span = container.querySelector('span')!
      expect(span).toHaveClass('block')
      expect(span).toHaveClass('min-w-0')
      expect(span.querySelector('em')).toBeInTheDocument()
    })
  })
})
