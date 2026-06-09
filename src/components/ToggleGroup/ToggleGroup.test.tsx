import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

describe('ToggleGroup', () => {
  it('renders toggle group items', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Center')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('single select activates one item at a time', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    const itemA = screen.getByText('A').closest('[data-slot="toggle-group-item"]') as HTMLButtonElement
    const itemB = screen.getByText('B').closest('[data-slot="toggle-group-item"]') as HTMLButtonElement

    fireEvent.click(itemA)
    expect(itemA).toHaveAttribute('data-state', 'on')
    expect(itemB).toHaveAttribute('data-state', 'off')

    fireEvent.click(itemB)
    expect(itemA).toHaveAttribute('data-state', 'off')
    expect(itemB).toHaveAttribute('data-state', 'on')
  })

  it('renders toggle group root', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="x">X</ToggleGroupItem>
      </ToggleGroup>
    )
    const root = document.querySelector('[data-slot="toggle-group"]')
    expect(root).toBeInTheDocument()
  })
})
