import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './Command'

function TestCommand() {
  return (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

describe('Command', () => {
  it('renders the search input', () => {
    render(<TestCommand />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders command items', () => {
    render(<TestCommand />)
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Search Emoji')).toBeInTheDocument()
  })

  it('renders a group heading', () => {
    render(<TestCommand />)
    expect(screen.getByText('Suggestions')).toBeInTheDocument()
  })
})
