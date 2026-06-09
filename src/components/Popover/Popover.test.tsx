import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Popover, PopoverTrigger, PopoverContent } from './Popover'

describe('Popover', () => {
  it('renders the trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('trigger has popover-trigger slot', () => {
    render(
      <Popover>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    const trigger = document.querySelector('[data-slot="popover-trigger"]')
    expect(trigger).toBeInTheDocument()
  })
})
