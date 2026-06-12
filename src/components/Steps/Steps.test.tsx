import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Steps } from './Steps'
import type { StepItem } from './Steps'

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeStep(overrides: Partial<StepItem> = {}): StepItem {
  return { status: 'not-started', header: 'Step header', ...overrides }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Steps', () => {
  describe('rendering', () => {
    it('renders all step headers', () => {
      const steps: StepItem[] = [
        { status: 'success', header: 'First step' },
        { status: 'error', header: 'Second step' },
        { status: 'not-started', header: 'Third step' },
      ]
      render(<Steps steps={steps} />)

      expect(screen.getByText('First step')).toBeInTheDocument()
      expect(screen.getByText('Second step')).toBeInTheDocument()
      expect(screen.getByText('Third step')).toBeInTheDocument()
    })

    it('renders the root element with role="list"', () => {
      render(<Steps steps={[makeStep()]} />)
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('renders each step with role="listitem"', () => {
      const steps: StepItem[] = [
        makeStep({ header: 'A' }),
        makeStep({ header: 'B' }),
        makeStep({ header: 'C' }),
      ]
      render(<Steps steps={steps} />)
      expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it('applies className prop to the root element', () => {
      render(<Steps steps={[makeStep()]} className="custom-class extra" />)
      const list = screen.getByRole('list')
      expect(list).toHaveClass('custom-class')
      expect(list).toHaveClass('extra')
    })

    it('renders an empty list without error when steps array is empty', () => {
      render(<Steps steps={[]} />)
      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
      expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    })
  })

  describe('connector lines', () => {
    it('renders N-1 connector divs between N steps', () => {
      // The connector is a <div> with class bg-border and w-px.
      // There should be exactly N-1 of them for N steps.
      const { container } = render(
        <Steps
          steps={[
            makeStep({ header: 'Step 1' }),
            makeStep({ header: 'Step 2' }),
            makeStep({ header: 'Step 3' }),
          ]}
        />
      )
      const connectors = container.querySelectorAll('div.bg-border.w-px')
      expect(connectors).toHaveLength(2)
    })

    it('renders zero connector divs for a single step', () => {
      const { container } = render(<Steps steps={[makeStep()]} />)
      const connectors = container.querySelectorAll('div.bg-border.w-px')
      expect(connectors).toHaveLength(0)
    })

    it('renders zero connector divs for an empty steps array', () => {
      const { container } = render(<Steps steps={[]} />)
      const connectors = container.querySelectorAll('div.bg-border.w-px')
      expect(connectors).toHaveLength(0)
    })
  })

  describe('aria attributes on icons', () => {
    it('applies statusIconAriaLabel as aria-label on the icon when provided', () => {
      render(<Steps steps={[makeStep({ status: 'success', statusIconAriaLabel: 'Completed' })]} />)
      expect(screen.getByLabelText('Completed')).toBeInTheDocument()
    })

    it('sets aria-hidden=true on the icon when statusIconAriaLabel is not provided', () => {
      render(<Steps steps={[makeStep({ status: 'success' })]} />)
      // The icon is an SVG rendered by Lucide inside the first listitem
      const listitem = screen.getByRole('listitem')
      const svg = listitem.querySelector('svg')
      expect(svg).not.toBeNull()
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('does not set aria-hidden when statusIconAriaLabel is provided', () => {
      render(
        <Steps steps={[makeStep({ status: 'success', statusIconAriaLabel: 'Done' })]} />
      )
      const listitem = screen.getByRole('listitem')
      const svg = listitem.querySelector('svg')
      expect(svg).not.toBeNull()
      // aria-hidden should be "false" (or absent) — not "true"
      expect(svg?.getAttribute('aria-hidden')).not.toBe('true')
    })
  })

  describe('header text color classes by status', () => {
    it('applies text-green-600 for success status', () => {
      render(<Steps steps={[makeStep({ status: 'success', header: 'Done' })]} />)
      const span = screen.getByText('Done')
      expect(span).toHaveClass('text-green-600')
    })

    it('applies text-red-600 for error status', () => {
      render(<Steps steps={[makeStep({ status: 'error', header: 'Failed' })]} />)
      const span = screen.getByText('Failed')
      expect(span).toHaveClass('text-red-600')
    })

    it('applies text-amber-600 for warning status', () => {
      render(<Steps steps={[makeStep({ status: 'warning', header: 'Warning' })]} />)
      const span = screen.getByText('Warning')
      expect(span).toHaveClass('text-amber-600')
    })

    it('applies text-muted-foreground for stopped status', () => {
      render(<Steps steps={[makeStep({ status: 'stopped', header: 'Stopped' })]} />)
      const span = screen.getByText('Stopped')
      expect(span).toHaveClass('text-muted-foreground')
    })

    it('applies text-muted-foreground for loading status', () => {
      render(<Steps steps={[makeStep({ status: 'loading', header: 'Loading' })]} />)
      const span = screen.getByText('Loading')
      expect(span).toHaveClass('text-muted-foreground')
    })

    it('applies text-foreground for in-progress status', () => {
      render(<Steps steps={[makeStep({ status: 'in-progress', header: 'In Progress' })]} />)
      const span = screen.getByText('In Progress')
      expect(span).toHaveClass('text-foreground')
    })

    it('applies text-muted-foreground for not-started status', () => {
      render(<Steps steps={[makeStep({ status: 'not-started', header: 'Not Started' })]} />)
      const span = screen.getByText('Not Started')
      expect(span).toHaveClass('text-muted-foreground')
    })
  })

  describe('animate-spin on icons', () => {
    it('applies animate-spin to the icon for loading status', () => {
      render(
        <Steps steps={[makeStep({ status: 'loading', header: 'Loading step' })]} />
      )
      const listitem = screen.getByRole('listitem')
      const svg = listitem.querySelector('svg')
      expect(svg).toHaveClass('animate-spin')
    })

    it('applies animate-spin to the icon for in-progress status', () => {
      render(
        <Steps steps={[makeStep({ status: 'in-progress', header: 'Running' })]} />
      )
      const listitem = screen.getByRole('listitem')
      const svg = listitem.querySelector('svg')
      expect(svg).toHaveClass('animate-spin')
    })

    it('does not apply animate-spin to the icon for success status', () => {
      render(<Steps steps={[makeStep({ status: 'success', header: 'Done' })]} />)
      const listitem = screen.getByRole('listitem')
      const svg = listitem.querySelector('svg')
      expect(svg).not.toHaveClass('animate-spin')
    })

    it('does not apply animate-spin to the icon for error status', () => {
      render(<Steps steps={[makeStep({ status: 'error', header: 'Failed' })]} />)
      const listitem = screen.getByRole('listitem')
      const svg = listitem.querySelector('svg')
      expect(svg).not.toHaveClass('animate-spin')
    })
  })

  describe('ReactNode header', () => {
    it('renders a link inside the step header', () => {
      const header = <a href="/details">View details</a>
      render(<Steps steps={[makeStep({ header, status: 'success' })]} />)
      const link = screen.getByRole('link', { name: 'View details' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/details')
    })

    it('renders a button inside the step header', () => {
      const header = <button type="button">Retry</button>
      render(<Steps steps={[makeStep({ header, status: 'error' })]} />)
      const btn = screen.getByRole('button', { name: 'Retry' })
      expect(btn).toBeInTheDocument()
    })
  })
})
