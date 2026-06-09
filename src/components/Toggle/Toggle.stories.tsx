import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoldIcon } from 'lucide-react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Toggle',
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
