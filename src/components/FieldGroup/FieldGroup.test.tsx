import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Input } from '@/components/Input'
import { Field } from '@/components/Field'
import { FieldGroup } from './FieldGroup'

describe('FieldGroup', () => {
  it('renders title', () => {
    render(
      <FieldGroup title="Personal Info">
        <Field label="Name" htmlFor="name">
          <Input id="name" />
        </Field>
      </FieldGroup>
    )
    expect(screen.getByText('Personal Info')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(
      <FieldGroup title="Billing" description="Used for invoices.">
        <Field label="Company" htmlFor="company">
          <Input id="company" />
        </Field>
      </FieldGroup>
    )
    expect(screen.getByText('Used for invoices.')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FieldGroup>
        <Field label="First Name" htmlFor="first">
          <Input id="first" placeholder="Enter first name" />
        </Field>
        <Field label="Last Name" htmlFor="last">
          <Input id="last" placeholder="Enter last name" />
        </Field>
      </FieldGroup>
    )
    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument()
  })

  it('applies grid-cols-1 by default', () => {
    const { container } = render(
      <FieldGroup>
        <Field label="Name" htmlFor="name">
          <Input id="name" />
        </Field>
      </FieldGroup>
    )
    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('grid-cols-1')
  })

  it('applies grid-cols-2 when columns=2', () => {
    const { container } = render(
      <FieldGroup columns={2}>
        <Field label="Name" htmlFor="name">
          <Input id="name" />
        </Field>
      </FieldGroup>
    )
    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('grid-cols-2')
  })

  it('applies grid-cols-3 when columns=3', () => {
    const { container } = render(
      <FieldGroup columns={3}>
        <Field label="Name" htmlFor="name">
          <Input id="name" />
        </Field>
      </FieldGroup>
    )
    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('grid-cols-3')
  })

  it('does not render title/description section when neither is provided', () => {
    const { container } = render(
      <FieldGroup>
        <Field label="Name" htmlFor="name">
          <Input id="name" />
        </Field>
      </FieldGroup>
    )
    expect(container.querySelector('h3')).not.toBeInTheDocument()
    expect(container.querySelector('p')).not.toBeInTheDocument()
  })
})
