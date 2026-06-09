import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Kbd } from './Kbd'

describe('Kbd', () => {
  it('renders children', () => {
    render(<Kbd>⌘K</Kbd>)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('renders as a kbd element', () => {
    render(<Kbd>Enter</Kbd>)
    const el = screen.getByText('Enter')
    expect(el.tagName).toBe('KBD')
  })

  it('applies default styling classes', () => {
    render(<Kbd>Esc</Kbd>)
    const el = screen.getByText('Esc')
    expect(el).toHaveClass('font-mono', 'text-xs', 'font-medium')
  })

  it('forwards className', () => {
    render(<Kbd className="custom-class">Tab</Kbd>)
    expect(screen.getByText('Tab')).toHaveClass('custom-class')
  })

  it('forwards additional props', () => {
    render(<Kbd data-testid="kbd-el">Space</Kbd>)
    expect(screen.getByTestId('kbd-el')).toBeInTheDocument()
  })
})
