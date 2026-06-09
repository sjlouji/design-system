import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Toaster } from './Sonner'

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        style={{
          border: '1px solid #ccc',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
        }}
        onClick={() => toast('Event has been created', { description: 'Monday, January 3rd at 6:00pm' })}
      >
        Show Toast
      </button>
    </div>
  ),
}
