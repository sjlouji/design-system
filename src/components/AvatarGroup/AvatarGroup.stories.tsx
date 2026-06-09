import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvatarGroup } from './AvatarGroup'

const meta = {
  title: 'Primitives/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

const sampleAvatars = [
  { fallback: 'JL', alt: 'Joan Louji' },
  { fallback: 'AK', alt: 'Alice Kim' },
  { fallback: 'BM', alt: 'Bob Martin' },
  { fallback: 'CD', alt: 'Carol Davis' },
]

const manyAvatars = [
  ...sampleAvatars,
  { fallback: 'EF', alt: 'Eve Foster' },
  { fallback: 'GH', alt: 'Grace Hall' },
  { fallback: 'IJ', alt: 'Ivan Jones' },
]

export const Default: Story = {
  args: {
    avatars: sampleAvatars,
    max: 4,
    size: 'md',
  },
}

export const WithOverflow: Story = {
  args: {
    avatars: manyAvatars,
    max: 4,
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <AvatarGroup avatars={sampleAvatars} size="sm" />
      <AvatarGroup avatars={sampleAvatars} size="md" />
      <AvatarGroup avatars={sampleAvatars} size="lg" />
    </div>
  ),
}
