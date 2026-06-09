import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@/lib/test-utils'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders the switch', () => {
    render(<Switch />)
    const switchEl = document.querySelector('[data-slot="switch"]')
    expect(switchEl).toBeInTheDocument()
  })

  it('starts unchecked by default', () => {
    render(<Switch />)
    const switchEl = document.querySelector('[data-slot="switch"]')
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders checked when checked prop is true', () => {
    render(<Switch checked onCheckedChange={() => {}} />)
    const switchEl = document.querySelector('[data-slot="switch"]')
    expect(switchEl).toHaveAttribute('data-state', 'checked')
  })

  it('renders disabled state', () => {
    render(<Switch disabled />)
    const switchEl = document.querySelector('[data-slot="switch"]') as HTMLButtonElement
    expect(switchEl).toBeDisabled()
  })

  it('toggles on click', () => {
    render(<Switch />)
    const switchEl = document.querySelector('[data-slot="switch"]') as HTMLButtonElement
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
    fireEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('data-state', 'checked')
  })
})
