import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Switch } from './Switch'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
    const styles = window.getComputedStyle(switchEl)
    expect(styles.display).toBe('inline-flex')
  },
}

export const ToggleInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('data-state', 'checked')
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
  },
}
