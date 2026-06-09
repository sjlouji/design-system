import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { id: 'default' },
}

export const Checked: Story = {
  args: { id: 'checked', defaultChecked: true },
}

export const Disabled: Story = {
  args: { id: 'disabled', disabled: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm font-medium leading-none">
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { id: 'css-check' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    // Radix CheckboxPrimitive.Root renders as <button> (inline-block by default)
    const styles = window.getComputedStyle(checkbox)
    expect(styles.display).toBe('inline-block')
  },
}

export const ToggleInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { id: 'toggle' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'checked')
    await userEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
  },
}
