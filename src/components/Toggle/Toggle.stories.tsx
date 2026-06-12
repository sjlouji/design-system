import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoldIcon } from 'lucide-react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: '`default` — transparent background with accent fill when pressed. `outline` — bordered button with accent hover and fill when pressed.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: '`default` — 36px height. `sm` — 32px height. `lg` — 40px height.',
    },
    pressed: {
      control: 'boolean',
      description: 'Controlled pressed state. When `true` the toggle is in the "on" state and receives accent background.',
    },
    defaultPressed: {
      control: 'boolean',
      description: 'Initial pressed state for uncontrolled usage. Use `onPressedChange` to observe changes.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction. Applies reduced opacity and a not-allowed cursor.',
    },
    onPressedChange: {
      action: 'pressedChange',
      description: 'Fires when the pressed state changes. Receives the new boolean `pressed` value.',
    },
    children: {
      control: false,
      description: 'Toggle content — text label, icon, or both. SVG icons sized via the `size` prop automatically.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes merged onto the toggle element.',
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Toggle',
    variant: 'default',
    size: 'default',
    disabled: false,
    defaultPressed: false,
  },
}

export const Pressed: Story = {
  args: {
    pressed: true,
    children: 'Pressed',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
}
