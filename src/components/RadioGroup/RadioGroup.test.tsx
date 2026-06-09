import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { RadioGroup, RadioGroupItem } from './RadioGroup'
import { Label } from '@/components/Label'

describe('RadioGroup', () => {
  it('renders radio group items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" id="a" />
        <Label htmlFor="a">Option A</Label>
        <RadioGroupItem value="b" id="b" />
        <Label htmlFor="b">Option B</Label>
      </RadioGroup>
    )
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('sets default value', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" id="ra" />
        <RadioGroupItem value="b" id="rb" />
      </RadioGroup>
    )
    const itemB = document.querySelector('[data-slot="radio-group-item"][data-state="checked"]')
    expect(itemB).toBeInTheDocument()
  })

  it('renders radio group root', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="x" id="x" />
      </RadioGroup>
    )
    const root = document.querySelector('[data-slot="radio-group"]')
    expect(root).toBeInTheDocument()
  })
})
