import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { CheckIcon } from 'lucide-react'
import { Timeline } from './Timeline'
import type { TimelineItem } from './Timeline'

const items: TimelineItem[] = [
  { id: '1', title: 'Order placed', description: 'Order #1234 created.', timestamp: 'June 9' },
  { id: '2', title: 'Payment confirmed', timestamp: 'June 9' },
  { id: '3', title: 'Shipped', description: 'Package on its way.', timestamp: 'June 10' },
]

describe('Timeline', () => {
  it('renders all items', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('Order placed')).toBeInTheDocument()
    expect(screen.getByText('Payment confirmed')).toBeInTheDocument()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
  })

  it('renders descriptions', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('Order #1234 created.')).toBeInTheDocument()
    expect(screen.getByText('Package on its way.')).toBeInTheDocument()
  })

  it('renders timestamps', () => {
    render(<Timeline items={items} />)
    expect(screen.getAllByText('June 9').length).toBe(2)
  })

  it('renders icons', () => {
    const itemsWithIcons: TimelineItem[] = [
      { id: '1', title: 'Done', icon: <CheckIcon data-testid="check-icon" />, status: 'success' },
    ]
    render(<Timeline items={itemsWithIcons} />)
    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
  })

  it('renders empty list without error', () => {
    const { container } = render(<Timeline items={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
