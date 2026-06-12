import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BellIcon, CheckIcon, ZapIcon } from 'lucide-react'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarStack,
  AvatarStackCount,
} from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Controls the rendered size of the avatar circle',
      table: { defaultValue: { summary: 'default' } },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

// --- With image ---

export const WithImage: Story = {
  name: 'With image',
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=1" alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

// --- Fallback states ---

export const FallbackInitials: Story = {
  name: 'Fallback: initials',
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const FallbackBrokenImage: Story = {
  name: 'Fallback: broken image URL',
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-url.example.com/avatar.jpg" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}

// --- Sizes ---

export const SizeSm: Story = {
  name: 'Size: sm',
  args: { size: 'sm' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=2" alt="User" />
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
  ),
}

export const SizeDefault: Story = {
  name: 'Size: default',
  args: { size: 'default' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=3" alt="User" />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  ),
}

export const SizeLg: Story = {
  name: 'Size: lg',
  args: { size: 'lg' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=4" alt="User" />
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
}

export const AllSizes: Story = {
  name: 'All sizes comparison',
  render: () => (
    <div className="flex items-end gap-6">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="User" />
            <AvatarFallback>{size === 'default' ? 'DF' : size.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllSizesFallback: Story = {
  name: 'All sizes — fallback only',
  render: () => (
    <div className="flex items-end gap-6">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <AvatarFallback>{size === 'default' ? 'DF' : size.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

// --- AvatarBadge ---

export const BadgeDefault: Story = {
  name: 'Badge: default (primary)',
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=6" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const BadgeOnline: Story = {
  name: 'Badge: online (green)',
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=7" alt="User online" />
      <AvatarFallback>ON</AvatarFallback>
      <AvatarBadge className="bg-green-500" />
    </Avatar>
  ),
}

export const BadgeBusy: Story = {
  name: 'Badge: busy (amber)',
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=8" alt="User busy" />
      <AvatarFallback>BZ</AvatarFallback>
      <AvatarBadge className="bg-amber-500" />
    </Avatar>
  ),
}

export const BadgeOffline: Story = {
  name: 'Badge: offline (muted)',
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=9" alt="User offline" />
      <AvatarFallback>OF</AvatarFallback>
      <AvatarBadge className="bg-muted-foreground" />
    </Avatar>
  ),
}

export const BadgeWithIcon: Story = {
  name: 'Badge: with icon',
  render: () => (
    <div className="flex items-end gap-6">
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/80?img=10" alt="User with bell" />
        <AvatarFallback>NT</AvatarFallback>
        <AvatarBadge>
          <BellIcon />
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/80?img=11" alt="Verified user" />
        <AvatarFallback>VR</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>ZP</AvatarFallback>
        <AvatarBadge className="bg-amber-500">
          <ZapIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  ),
}

export const BadgeAllSizes: Story = {
  name: 'Badge: all sizes',
  render: () => (
    <div className="flex items-end gap-6">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <AvatarFallback>{size === 'default' ? 'DF' : size.toUpperCase()}</AvatarFallback>
            <AvatarBadge className="bg-green-500" />
          </Avatar>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

// --- AvatarStack ---

export const Stack: Story = {
  name: 'AvatarStack: basic',
  render: () => (
    <AvatarStack>
      {[12, 13, 14, 15].map((i) => (
        <Avatar key={i}>
          <AvatarImage src={`https://i.pravatar.cc/80?img=${i}`} alt={`Team member ${i}`} />
          <AvatarFallback>U{i}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarStack>
  ),
}

export const StackWithCount: Story = {
  name: 'AvatarStack: with overflow count',
  render: () => (
    <AvatarStack>
      {[20, 21, 22].map((i) => (
        <Avatar key={i}>
          <AvatarImage src={`https://i.pravatar.cc/80?img=${i}`} alt={`Team member ${i}`} />
          <AvatarFallback>T{i}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarStackCount>+7</AvatarStackCount>
    </AvatarStack>
  ),
}

export const StackAllSizes: Story = {
  name: 'AvatarStack: all sizes',
  render: () => (
    <div className="flex flex-col gap-5">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-16 text-xs text-muted-foreground">{size}</span>
          <AvatarStack>
            {[1, 2, 3].map((i) => (
              <Avatar key={i} size={size}>
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarStackCount>+4</AvatarStackCount>
          </AvatarStack>
        </div>
      ))}
    </div>
  ),
}

// --- Composite overview ---

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 min-w-[280px]">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Sizes
        </p>
        <div className="flex items-end gap-4">
          {(['sm', 'default', 'lg'] as const).map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src="https://i.pravatar.cc/80?img=33" alt="User" />
              <AvatarFallback>{size === 'default' ? 'DF' : size.toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          With badges
        </p>
        <div className="flex items-end gap-4">
          <Avatar>
            <AvatarFallback>ON</AvatarFallback>
            <AvatarBadge className="bg-green-500" />
          </Avatar>
          <Avatar>
            <AvatarFallback>BZ</AvatarFallback>
            <AvatarBadge className="bg-amber-500" />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>VR</AvatarFallback>
            <AvatarBadge>
              <CheckIcon />
            </AvatarBadge>
          </Avatar>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Stacked team
        </p>
        <AvatarStack>
          {[40, 41, 42, 43].map((i) => (
            <Avatar key={i}>
              <AvatarImage src={`https://i.pravatar.cc/80?img=${i}`} alt={`Member ${i}`} />
              <AvatarFallback>M{i - 39}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarStackCount>+9</AvatarStackCount>
        </AvatarStack>
      </div>
    </div>
  ),
}
