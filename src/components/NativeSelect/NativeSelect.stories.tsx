import type { Meta, StoryObj } from '@storybook/react-vite'
import { NativeSelect } from './NativeSelect'

const meta = {
  title: 'Forms/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Text shown as a disabled first option prompting the user to make a selection. When provided, renders an <option value="" disabled> at the top of the list.',
    },
    error: {
      control: 'boolean',
      description: 'When true, applies destructive border and ring colours to signal a validation error.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the select is non-interactive and rendered with reduced opacity.',
    },
    children: {
      control: false,
      description: '<option> (and optional <optgroup>) elements that make up the dropdown list.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the underlying <select> element.',
    },
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

const options = (
  <>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry">Cherry</option>
  </>
)

export const Default: Story = {
  args: {
    defaultValue: 'apple',
    placeholder: undefined,
    error: false,
    disabled: false,
    children: options,
    className: '',
  },
  render: (args) => (
    <div className="w-48">
      <NativeSelect {...args} />
    </div>
  ),
}

export const WithPlaceholder: Story = {
  render: () => (
    <div className="w-48">
      <NativeSelect placeholder="Select a fruit…" defaultValue="">
        {options}
      </NativeSelect>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-48">
      <NativeSelect error defaultValue="">
        <option value="" disabled>
          Select a fruit…
        </option>
        {options}
      </NativeSelect>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-48">
      <NativeSelect disabled defaultValue="apple">
        {options}
      </NativeSelect>
    </div>
  ),
}
