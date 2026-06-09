import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip'

describe('Tooltip', () => {
  it('renders the trigger', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('trigger has tooltip-trigger slot', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Button</TooltipTrigger>
        <TooltipContent>Content</TooltipContent>
      </Tooltip>
    )
    const trigger = document.querySelector('[data-slot="tooltip-trigger"]')
    expect(trigger).toBeInTheDocument()
  })
})
