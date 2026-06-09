import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders the checkbox', () => {
    render(<Checkbox id="test" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('can be toggled', async () => {
    const user = userEvent.setup()
    render(<Checkbox id="test" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('renders as disabled when disabled prop is passed', () => {
    render(<Checkbox id="disabled" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Checkbox id="test" onCheckedChange={handleChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })
})
