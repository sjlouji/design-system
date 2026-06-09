import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/Input'
import { Field } from '@/components/Field'
import { FieldGroup } from './FieldGroup'

const meta = {
  title: 'Forms/FieldGroup',
  component: FieldGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: null },
} satisfies Meta<typeof FieldGroup>

export default meta
type Story = StoryObj<typeof meta>

export const SingleColumn: Story = {
  render: () => (
    <div className="w-80">
      <FieldGroup title="Personal Information">
        <Field label="First Name" htmlFor="first">
          <Input id="first" placeholder="Joan" />
        </Field>
        <Field label="Last Name" htmlFor="last">
          <Input id="last" placeholder="Smith" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" type="email" placeholder="you@example.com" />
        </Field>
      </FieldGroup>
    </div>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <div className="w-[560px]">
      <FieldGroup title="Address" columns={2}>
        <Field label="Street" htmlFor="street">
          <Input id="street" placeholder="123 Main St" />
        </Field>
        <Field label="City" htmlFor="city">
          <Input id="city" placeholder="San Francisco" />
        </Field>
        <Field label="State" htmlFor="state">
          <Input id="state" placeholder="CA" />
        </Field>
        <Field label="ZIP" htmlFor="zip">
          <Input id="zip" placeholder="94103" />
        </Field>
      </FieldGroup>
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="w-[560px]">
      <FieldGroup
        title="Billing Details"
        description="This information will appear on your invoice."
        columns={2}
      >
        <Field label="Company Name" htmlFor="company">
          <Input id="company" placeholder="Acme Inc." />
        </Field>
        <Field label="VAT Number" htmlFor="vat">
          <Input id="vat" placeholder="GB 000000000" />
        </Field>
      </FieldGroup>
    </div>
  ),
}
