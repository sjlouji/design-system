import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Input } from '@/components/Input'
import { Field } from './Field'

describe('Field', () => {
  it('renders the label', () => {
    render(
      <Field label="Email" htmlFor="email">
        <Input id="email" />
      </Field>
    )
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders the child', () => {
    render(
      <Field label="Email" htmlFor="email">
        <Input id="email" placeholder="Enter email" />
      </Field>
    )
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('shows helper text when no error', () => {
    render(
      <Field label="Name" htmlFor="name" helperText="Enter your full name.">
        <Input id="name" />
      </Field>
    )
    expect(screen.getByText('Enter your full name.')).toBeInTheDocument()
  })

  it('shows error message instead of helper text', () => {
    render(
      <Field
        label="Email"
        htmlFor="email"
        error="Invalid email"
        helperText="Should not appear"
      >
        <Input id="email" />
      </Field>
    )
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument()
  })

  it('sets aria-invalid on child input when error is present', () => {
    render(
      <Field label="Email" htmlFor="email" error="Bad email">
        <Input id="email" />
      </Field>
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders required indicator when required=true', () => {
    render(
      <Field label="Name" htmlFor="name" required>
        <Input id="name" />
      </Field>
    )
    const label = screen.getByText('Name', { exact: false })
    expect(label).toBeInTheDocument()
    // The * is in a child span with aria-hidden
    const asterisk = document.querySelector('[aria-hidden="true"]')
    expect(asterisk?.textContent).toBe('*')
  })

  it('does not render label when label prop is omitted', () => {
    render(
      <Field>
        <Input placeholder="no-label" />
      </Field>
    )
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })
})
