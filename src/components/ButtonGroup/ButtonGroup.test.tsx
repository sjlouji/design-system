import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Button } from '@/components/Button'
import { ButtonGroup } from './ButtonGroup'

describe('ButtonGroup', () => {
  it('renders children', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    )
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
    expect(screen.getByText('Three')).toBeInTheDocument()
  })

  it('applies horizontal orientation by default', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('button', { name: 'A' }).parentElement
    expect(group).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('applies vertical orientation when specified', () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('button', { name: 'A' }).parentElement
    expect(group).toHaveAttribute('data-orientation', 'vertical')
    expect(group?.className).toContain('flex-col')
  })

  it('forwards className', () => {
    render(
      <ButtonGroup className="my-custom-class">
        <Button>A</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('button', { name: 'A' }).parentElement
    expect(group?.className).toContain('my-custom-class')
  })
})
