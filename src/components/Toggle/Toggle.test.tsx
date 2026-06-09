import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  it('renders the toggle', () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByText('Bold')).toBeInTheDocument()
  })

  it('starts with off state by default', () => {
    render(<Toggle>Toggle</Toggle>)
    const toggle = document.querySelector('[data-slot="toggle"]')
    expect(toggle).toHaveAttribute('data-state', 'off')
  })

  it('reflects pressed state', () => {
    render(<Toggle pressed>Pressed</Toggle>)
    const toggle = document.querySelector('[data-slot="toggle"]')
    expect(toggle).toHaveAttribute('data-state', 'on')
  })

  it('toggles state on click', () => {
    render(<Toggle>Click me</Toggle>)
    const toggle = document.querySelector('[data-slot="toggle"]') as HTMLButtonElement
    expect(toggle).toHaveAttribute('data-state', 'off')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('data-state', 'on')
  })
})
