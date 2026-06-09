import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/40" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}
