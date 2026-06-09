import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './Dialog'

function TestDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('renders the trigger button', () => {
    render(<TestDialog />)
    expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument()
  })

  it('renders dialog content after trigger click', async () => {
    const user = userEvent.setup()
    render(<TestDialog />)
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByText('Edit profile')).toBeInTheDocument()
    expect(screen.getByText('Make changes to your profile here.')).toBeInTheDocument()
  })
})
