import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[320px]',
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type your message here...',
    className: 'w-[320px]',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
    className: 'w-[320px]',
  },
}

export const WithRows: Story = {
  args: {
    rows: 6,
    placeholder: 'A textarea with 6 rows...',
    className: 'w-[320px]',
  },
}
