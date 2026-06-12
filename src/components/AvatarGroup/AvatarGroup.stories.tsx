import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvatarGroup, type AvatarItem } from './AvatarGroup'

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of each avatar in the group',
    },
    max: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of avatars to show before displaying overflow count',
    },
    avatars: {
      control: false,
      description: 'Array of avatar items ({ src?, fallback, alt? })',
    },
  },
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const threeAvatars: AvatarItem[] = [
  { fallback: 'JL', alt: 'Joan Louji' },
  { fallback: 'AK', alt: 'Alice Kim' },
  { fallback: 'BM', alt: 'Bob Martin' },
]

const fiveAvatars: AvatarItem[] = [
  ...threeAvatars,
  { fallback: 'CD', alt: 'Carol Davis' },
  { fallback: 'EF', alt: 'Eve Foster' },
]

const eightAvatars: AvatarItem[] = [
  ...fiveAvatars,
  { fallback: 'GH', alt: 'Grace Hall' },
  { fallback: 'IJ', alt: 'Ivan Jones' },
  { fallback: 'KL', alt: 'Karen Lee' },
]

const mixedAvatars: AvatarItem[] = [
  { src: 'https://i.pravatar.cc/80?img=1', fallback: 'JD', alt: 'Jane Doe' },
  { src: 'https://i.pravatar.cc/80?img=2', fallback: 'AS', alt: 'Alex Smith' },
  { fallback: 'BM', alt: 'Bob Martin' },
  { src: 'https://i.pravatar.cc/80?img=3', fallback: 'CD', alt: 'Carol Davis' },
  { fallback: 'EF', alt: 'Eve Foster' },
]

// ---------------------------------------------------------------------------
// Basic 3 avatars
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    avatars: threeAvatars,
    max: 4,
    size: 'md',
  },
}

// ---------------------------------------------------------------------------
// Overflow with max=3
// ---------------------------------------------------------------------------

export const WithOverflow: Story = {
  name: 'Overflow — max=3',
  args: {
    avatars: eightAvatars,
    max: 3,
    size: 'md',
  },
}

export const OverflowMax4: Story = {
  name: 'Overflow — max=4',
  args: {
    avatars: eightAvatars,
    max: 4,
    size: 'md',
  },
}

// ---------------------------------------------------------------------------
// All sizes
// ---------------------------------------------------------------------------

export const SizeSm: Story = {
  name: 'Size: sm',
  args: { avatars: fiveAvatars, size: 'sm', max: 4 },
}

export const SizeMd: Story = {
  name: 'Size: md',
  args: { avatars: fiveAvatars, size: 'md', max: 4 },
}

export const SizeLg: Story = {
  name: 'Size: lg',
  args: { avatars: fiveAvatars, size: 'lg', max: 4 },
}

export const AllSizes: Story = {
  name: 'All sizes compared',
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-6 text-xs text-muted-foreground">sm</span>
        <AvatarGroup avatars={fiveAvatars} size="sm" max={4} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-6 text-xs text-muted-foreground">md</span>
        <AvatarGroup avatars={fiveAvatars} size="md" max={4} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-6 text-xs text-muted-foreground">lg</span>
        <AvatarGroup avatars={fiveAvatars} size="lg" max={4} />
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Custom max values
// ---------------------------------------------------------------------------

export const MaxOne: Story = {
  name: 'Custom max — max=1',
  args: { avatars: fiveAvatars, max: 1, size: 'md' },
}

export const MaxTwo: Story = {
  name: 'Custom max — max=2',
  args: { avatars: fiveAvatars, max: 2, size: 'md' },
}

export const MaxShowAll: Story = {
  name: 'Max covers all (no overflow)',
  args: { avatars: threeAvatars, max: 10, size: 'md' },
}

// ---------------------------------------------------------------------------
// Single avatar
// ---------------------------------------------------------------------------

export const SingleAvatar: Story = {
  name: 'Single avatar',
  args: {
    avatars: [{ fallback: 'JD', alt: 'Jane Doe' }],
    max: 4,
    size: 'md',
  },
}

// ---------------------------------------------------------------------------
// Many avatars
// ---------------------------------------------------------------------------

export const ManyAvatars: Story = {
  name: 'Many avatars (8+), max=5',
  args: { avatars: eightAvatars, max: 5, size: 'md' },
}

// ---------------------------------------------------------------------------
// Mixed src/fallback
// ---------------------------------------------------------------------------

export const MixedSrcAndFallback: Story = {
  name: 'Mixed — src and fallback',
  args: { avatars: mixedAvatars, max: 4, size: 'md' },
}

// ---------------------------------------------------------------------------
// With overflow across all sizes
// ---------------------------------------------------------------------------

export const OverflowAllSizes: Story = {
  name: 'Overflow across all sizes',
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-6 text-xs text-muted-foreground">sm</span>
        <AvatarGroup avatars={eightAvatars} size="sm" max={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-6 text-xs text-muted-foreground">md</span>
        <AvatarGroup avatars={eightAvatars} size="md" max={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-6 text-xs text-muted-foreground">lg</span>
        <AvatarGroup avatars={eightAvatars} size="lg" max={3} />
      </div>
    </div>
  ),
}
