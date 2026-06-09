import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './Select'

describe('Select', () => {
  it('renders the trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>
    )
    const trigger = document.querySelector('[data-slot="select-trigger"]')
    expect(trigger).toBeInTheDocument()
  })

  it('renders placeholder text', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Select a fruit')).toBeInTheDocument()
  })

  it('renders disabled state', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    const trigger = document.querySelector('[data-slot="select-trigger"]') as HTMLButtonElement
    expect(trigger).toBeDisabled()
  })
})
