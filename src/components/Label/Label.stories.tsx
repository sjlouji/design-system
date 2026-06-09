import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Email address',
  },
}

export const WithHtmlFor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor="email-input">Email address</Label>
      <input
        id="email-input"
        type="email"
        placeholder="you@example.com"
        style={{ border: '1px solid #ccc', borderRadius: 4, padding: '4px 8px' }}
      />
    </div>
  ),
}
