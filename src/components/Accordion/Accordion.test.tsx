import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion'

function TestAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Question One</AccordionTrigger>
        <AccordionContent>Answer One</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question Two</AccordionTrigger>
        <AccordionContent>Answer Two</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('renders accordion triggers', () => {
    render(<TestAccordion />)
    expect(screen.getByText('Question One')).toBeInTheDocument()
    expect(screen.getByText('Question Two')).toBeInTheDocument()
  })

  it('expands an item on click', async () => {
    const user = userEvent.setup()
    render(<TestAccordion />)

    // Before click: trigger is collapsed
    const trigger = screen.getByText('Question One').closest('[data-slot="accordion-trigger"]')
    expect(trigger).toHaveAttribute('data-state', 'closed')

    await user.click(screen.getByText('Question One'))

    // After click: trigger is open and content is in the DOM
    expect(trigger).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('Answer One')).toBeInTheDocument()
  })
})
