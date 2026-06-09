import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithPlaceholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Choose your favourite..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-state', 'closed')
    const styles = window.getComputedStyle(trigger)
    expect(styles.fontSize).toBe('14px')
  },
}

export const OpenAndSelectInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-state', 'closed')
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'open')
    const bananaOption = await within(document.body).findByRole('option', { name: 'Banana' })
    await userEvent.click(bananaOption)
    expect(trigger).toHaveAttribute('data-state', 'closed')
  },
}
