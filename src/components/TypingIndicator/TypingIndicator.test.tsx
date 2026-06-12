import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { TypingIndicator } from './TypingIndicator'

describe('TypingIndicator', () => {
  it('renders 3 dots', () => {
    const { container } = render(<TypingIndicator />)
    const status = container.querySelector('[role="status"]')
    expect(status).toBeInTheDocument()
    const dots = status!.querySelectorAll('span')
    expect(dots).toHaveLength(3)
  })
})
