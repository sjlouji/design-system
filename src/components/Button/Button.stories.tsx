import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { PlusIcon, Loader2Icon } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Button' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
}

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <PlusIcon />
      Add item
    </Button>
  ),
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2Icon className="animate-spin" />
      Loading...
    </Button>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { children: 'Check' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Check' })
    const styles = window.getComputedStyle(button)
    expect(styles.display).toBe('inline-flex')
    expect(styles.fontWeight).toBe('500')
  },
}

export const DisabledOpacity: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { children: 'Disabled', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    const styles = window.getComputedStyle(button)
    expect(styles.opacity).toBe('0.5')
  },
}

export const ClickInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => {
    return (
      <Button onClick={() => { document.title = 'clicked' }}>
        Click me
      </Button>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })
    await userEvent.click(button)
  },
}
