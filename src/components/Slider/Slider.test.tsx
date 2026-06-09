import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders the slider', () => {
    render(<Slider min={0} max={100} defaultValue={[50]} />)
    const slider = document.querySelector('[data-slot="slider"]')
    expect(slider).toBeInTheDocument()
  })

  it('renders one thumb for a single value', () => {
    render(<Slider min={0} max={100} defaultValue={[50]} />)
    const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]')
    expect(thumbs).toHaveLength(1)
  })

  it('renders two thumbs for a range value', () => {
    render(<Slider min={0} max={100} defaultValue={[25, 75]} />)
    const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]')
    expect(thumbs).toHaveLength(2)
  })
})
