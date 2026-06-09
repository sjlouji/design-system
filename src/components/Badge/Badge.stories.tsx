import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Default' },
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

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { children: 'Badge' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('Badge')
    const styles = window.getComputedStyle(badge)
    expect(styles.display).toBe('inline-flex')
    expect(styles.fontSize).toBe('12px')
  },
}

export const AllVariants: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Default')).toBeInTheDocument()
    expect(canvas.getByText('Secondary')).toBeInTheDocument()
    expect(canvas.getByText('Destructive')).toBeInTheDocument()
    expect(canvas.getByText('Outline')).toBeInTheDocument()
  },
}
