import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { TypingIndicator } from './TypingIndicator'

describe('TypingIndicator', () => {
  it('renders 3 dots', () => {
    const { container } = render(<TypingIndicator />)
    const dots = container.querySelectorAll('.animate-bounce')
    expect(dots).toHaveLength(3)
  })
})
