import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Input } from '@/components/Input'
import { InputGroup } from './InputGroup'

describe('InputGroup', () => {
  it('renders prefix text', () => {
    render(
      <InputGroup prefix="$">
        <Input placeholder="amount" />
      </InputGroup>
    )
    expect(screen.getByText('$')).toBeInTheDocument()
  })

  it('renders suffix text', () => {
    render(
      <InputGroup suffix=".com">
        <Input placeholder="site" />
      </InputGroup>
    )
    expect(screen.getByText('.com')).toBeInTheDocument()
  })

  it('renders both prefix and suffix', () => {
    render(
      <InputGroup prefix="https://" suffix=".com">
        <Input placeholder="site" />
      </InputGroup>
    )
    expect(screen.getByText('https://')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
  })

  it('renders the child input', () => {
    render(
      <InputGroup prefix="$">
        <Input placeholder="amount" />
      </InputGroup>
    )
    expect(screen.getByPlaceholderText('amount')).toBeInTheDocument()
  })

  it('forwards className to the wrapper', () => {
    const { container } = render(
      <InputGroup prefix="$" className="test-class">
        <Input placeholder="amount" />
      </InputGroup>
    )
    const wrapper = container.querySelector('[data-slot="input-group"]')
    expect(wrapper?.className).toContain('test-class')
  })

  it('renders without prefix or suffix', () => {
    render(
      <InputGroup>
        <Input placeholder="plain" />
      </InputGroup>
    )
    expect(screen.getByPlaceholderText('plain')).toBeInTheDocument()
    expect(screen.queryByTestId('input-group-prefix')).not.toBeInTheDocument()
  })
})
