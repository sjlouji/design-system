import type { Meta, StoryObj } from '@storybook/react-vite'
import { NativeSelect } from './NativeSelect'

const meta = {
  title: 'Forms/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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
  render: () => (
    <div className="w-48">
      <NativeSelect defaultValue="apple">{options}</NativeSelect>
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
