import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard'

describe('HoverCard', () => {
  it('renders the trigger element', () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <span>@johndoe</span>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>John Doe profile card</p>
        </HoverCardContent>
      </HoverCard>
    )
    expect(screen.getByText('@johndoe')).toBeInTheDocument()
  })
})
