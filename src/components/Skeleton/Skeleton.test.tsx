import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with animate-pulse class', () => {
    render(<Skeleton />)
    const skeleton = document.querySelector('[data-slot="skeleton"]')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('accepts additional className', () => {
    render(<Skeleton className="h-4 w-[250px]" />)
    const skeleton = document.querySelector('[data-slot="skeleton"]')
    expect(skeleton).toHaveClass('h-4')
    expect(skeleton).toHaveClass('w-[250px]')
  })
})
