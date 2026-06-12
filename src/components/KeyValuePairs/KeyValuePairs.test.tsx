import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { KeyValuePairs } from './KeyValuePairs'

describe('KeyValuePairs', () => {
  it('renders all item labels and values', () => {
    render(
      <KeyValuePairs
        items={[
          { label: 'Name', value: 'Alice' },
          { label: 'Status', value: 'Active' },
          { label: 'Amount', value: '$100' },
        ]}
      />
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  it('renders ReactNode as label and ReactNode as value', () => {
    render(
      <KeyValuePairs
        items={[
          {
            label: <span data-testid="label-node">Custom Label</span>,
            value: <span data-testid="value-node">Custom Value</span>,
          },
        ]}
      />
    )
    expect(screen.getByTestId('label-node')).toBeInTheDocument()
    expect(screen.getByTestId('label-node')).toHaveTextContent('Custom Label')
    expect(screen.getByTestId('value-node')).toBeInTheDocument()
    expect(screen.getByTestId('value-node')).toHaveTextContent('Custom Value')
  })

  it('renders info slot content when provided', () => {
    render(
      <KeyValuePairs
        items={[
          {
            label: 'Balance',
            value: '$500',
            info: <span data-testid="info-content">More info</span>,
          },
        ]}
      />
    )
    expect(screen.getByTestId('info-content')).toBeInTheDocument()
    expect(screen.getByText('More info')).toBeInTheDocument()
  })

  it('does NOT render info slot container when info is omitted', () => {
    render(
      <KeyValuePairs
        items={[{ label: 'Balance', value: '$500' }]}
      />
    )
    // The shrink-0 span wrapper only renders when info is present
    const dt = screen.getByText('Balance').closest('dt')!
    const infoContainers = dt.querySelectorAll('.shrink-0')
    expect(infoContainers).toHaveLength(0)
  })

  describe('columns prop', () => {
    it('1 column uses grid-cols-1', () => {
      const { container } = render(
        <KeyValuePairs columns={1} items={[{ label: 'A', value: '1' }]} />
      )
      const dl = container.querySelector('dl')!
      expect(dl).toHaveClass('grid-cols-1')
    })

    it('2 columns includes sm:grid-cols-2', () => {
      const { container } = render(
        <KeyValuePairs columns={2} items={[{ label: 'A', value: '1' }]} />
      )
      const dl = container.querySelector('dl')!
      expect(dl.className).toContain('sm:grid-cols-2')
    })

    it('3 columns includes lg:grid-cols-3', () => {
      const { container } = render(
        <KeyValuePairs columns={3} items={[{ label: 'A', value: '1' }]} />
      )
      const dl = container.querySelector('dl')!
      expect(dl.className).toContain('lg:grid-cols-3')
    })

    it('4 columns includes lg:grid-cols-4', () => {
      const { container } = render(
        <KeyValuePairs columns={4} items={[{ label: 'A', value: '1' }]} />
      )
      const dl = container.querySelector('dl')!
      expect(dl.className).toContain('lg:grid-cols-4')
    })
  })

  it('className prop is applied to the dl element', () => {
    const { container } = render(
      <KeyValuePairs
        className="custom-class extra-class"
        items={[{ label: 'X', value: 'Y' }]}
      />
    )
    const dl = container.querySelector('dl')!
    expect(dl).toHaveClass('custom-class')
    expect(dl).toHaveClass('extra-class')
  })

  it('when id is set on an item: dt has that id and dd has aria-labelledby pointing to it', () => {
    render(
      <KeyValuePairs
        items={[{ label: 'Vendor', value: 'Acme Corp', id: 'vendor-label' }]}
      />
    )
    const dt = screen.getByText('Vendor').closest('dt')!
    expect(dt).toHaveAttribute('id', 'vendor-label')

    const dd = screen.getByText('Acme Corp').closest('dd')!
    expect(dd).toHaveAttribute('aria-labelledby', 'vendor-label')
  })

  it('with 0 items: renders an empty dl without error', () => {
    const { container } = render(<KeyValuePairs items={[]} />)
    const dl = container.querySelector('dl')!
    expect(dl).toBeInTheDocument()
    expect(dl.children).toHaveLength(0)
  })
})
