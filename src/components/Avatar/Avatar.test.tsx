import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

describe('Avatar', () => {
  it('renders fallback text when no image src is provided', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders fallback when image fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('applies the data-slot attribute', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-slot', 'avatar')
  })
})
