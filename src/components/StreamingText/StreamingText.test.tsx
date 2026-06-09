import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { StreamingText } from './StreamingText'

describe('StreamingText', () => {
  it('renders text', () => {
    render(<StreamingText text="Hello world" />)
    expect(screen.getByText(/Hello world/)).toBeInTheDocument()
  })

  it('shows cursor when streaming', () => {
    const { container } = render(<StreamingText text="Hello" streaming={true} />)
    const cursor = container.querySelector('.animate-pulse')
    expect(cursor).toBeInTheDocument()
  })

  it('does not show cursor when not streaming', () => {
    const { container } = render(<StreamingText text="Hello" streaming={false} />)
    const cursor = container.querySelector('.animate-pulse')
    expect(cursor).toBeNull()
  })
})
