import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders the progress element', () => {
    render(<Progress value={50} />)
    const progress = document.querySelector('[data-slot="progress"]')
    expect(progress).toBeInTheDocument()
  })

  it('sets the indicator transform based on value', () => {
    render(<Progress value={75} />)
    const indicator = document.querySelector('[data-slot="progress-indicator"]') as HTMLElement
    expect(indicator).toBeInTheDocument()
    expect(indicator.style.transform).toBe('translateX(-25%)')
  })

  it('defaults to 0 when no value provided', () => {
    render(<Progress />)
    const indicator = document.querySelector('[data-slot="progress-indicator"]') as HTMLElement
    expect(indicator.style.transform).toBe('translateX(-100%)')
  })
})
