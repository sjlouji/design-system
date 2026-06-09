import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from './Sheet'

describe('Sheet', () => {
  it('renders the trigger', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByText('Open Sheet')).toBeInTheDocument()
  })

  it('trigger has sheet-trigger slot', () => {
    render(
      <Sheet>
        <SheetTrigger>Toggle</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
    const trigger = document.querySelector('[data-slot="sheet-trigger"]')
    expect(trigger).toBeInTheDocument()
  })
})
