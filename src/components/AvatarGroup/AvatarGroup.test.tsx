import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { AvatarGroup } from './AvatarGroup'
import type { AvatarItem } from './AvatarGroup'

const avatars: AvatarItem[] = [
  { fallback: 'AA', alt: 'Alice' },
  { fallback: 'BB', alt: 'Bob' },
  { fallback: 'CC', alt: 'Carol' },
  { fallback: 'DD', alt: 'Dave' },
  { fallback: 'EE', alt: 'Eve' },
  { fallback: 'FF', alt: 'Frank' },
]

describe('AvatarGroup', () => {
  it('renders the correct number of visible avatars (default max=4)', () => {
    render(<AvatarGroup avatars={avatars} />)
    // 4 fallback initials visible + overflow count
    expect(screen.getByText('AA')).toBeInTheDocument()
    expect(screen.getByText('BB')).toBeInTheDocument()
    expect(screen.getByText('CC')).toBeInTheDocument()
    expect(screen.getByText('DD')).toBeInTheDocument()
    expect(screen.queryByText('EE')).not.toBeInTheDocument()
  })

  it('shows the overflow count badge when avatars exceed max', () => {
    render(<AvatarGroup avatars={avatars} max={4} />)
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('does not show overflow badge when all avatars fit', () => {
    render(<AvatarGroup avatars={avatars.slice(0, 4)} max={4} />)
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
  })

  it('respects a custom max value', () => {
    render(<AvatarGroup avatars={avatars} max={2} />)
    expect(screen.getByText('AA')).toBeInTheDocument()
    expect(screen.getByText('BB')).toBeInTheDocument()
    expect(screen.queryByText('CC')).not.toBeInTheDocument()
    expect(screen.getByText('+4')).toBeInTheDocument()
  })

  it('renders with role group', () => {
    render(<AvatarGroup avatars={avatars.slice(0, 3)} />)
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders with sm size', () => {
    const { container } = render(<AvatarGroup avatars={avatars.slice(0, 2)} size="sm" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with lg size', () => {
    const { container } = render(<AvatarGroup avatars={avatars.slice(0, 2)} size="lg" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('shows correct overflow count for max=1', () => {
    render(<AvatarGroup avatars={avatars} max={1} />)
    expect(screen.getByText('+5')).toBeInTheDocument()
  })

  it('forwards className to wrapper', () => {
    const { container } = render(
      <AvatarGroup avatars={avatars.slice(0, 2)} className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
