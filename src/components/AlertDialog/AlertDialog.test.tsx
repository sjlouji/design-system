import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog'

function TestAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>Open Dialog</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

describe('AlertDialog', () => {
  it('renders the trigger button', () => {
    render(<TestAlertDialog />)
    expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument()
  })

  it('renders dialog content after trigger click', async () => {
    const user = userEvent.setup()
    render(<TestAlertDialog />)
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByText('Delete account?')).toBeInTheDocument()
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
  })
})
