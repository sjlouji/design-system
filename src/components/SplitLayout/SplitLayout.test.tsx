import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { SplitLayout } from './SplitLayout'

describe('SplitLayout', () => {
  it('renders label', () => {
    render(<SplitLayout label="Display Name"><input /></SplitLayout>)
    expect(screen.getByText('Display Name')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<SplitLayout label="Email"><input data-testid="email-input" /></SplitLayout>)
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <SplitLayout label="Email" description="Used for login.">
        <input />
      </SplitLayout>
    )
    expect(screen.getByText('Used for login.')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    render(<SplitLayout label="Email"><input /></SplitLayout>)
    expect(screen.queryByText('Used for login.')).not.toBeInTheDocument()
  })
})
