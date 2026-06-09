import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './DropdownMenu'

function TestDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>Open Menu</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

describe('DropdownMenu', () => {
  it('renders the trigger button', () => {
    render(<TestDropdownMenu />)
    expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument()
  })

  it('opens the menu and shows items when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<TestDropdownMenu />)

    await user.click(screen.getByRole('button', { name: 'Open Menu' }))

    expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Log out' })).toBeInTheDocument()
  })
})
