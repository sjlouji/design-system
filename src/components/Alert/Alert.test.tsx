import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Alert, AlertTitle, AlertDescription } from './Alert'

describe('Alert', () => {
  it('renders title and description', () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies destructive variant class', () => {
    render(
      <Alert variant="destructive" data-testid="alert">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    )
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('text-destructive')
  })

  it('has role alert', () => {
    render(<Alert>Content</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
