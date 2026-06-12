import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarIcon, LinkIcon, MapPinIcon, TwitterIcon } from 'lucide-react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { Button } from '@/components/Button'

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    openDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in ms before the hover card opens',
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in ms before the hover card closes',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
    },
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer font-medium underline decoration-dotted underline-offset-4">
          @johndoe
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">John Doe</h4>
          <p className="text-sm text-muted-foreground">
            Software engineer and open source contributor. Building cool things.
          </p>
          <p className="text-xs text-muted-foreground">Joined December 2021</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithAvatarAndBio: Story = {
  name: 'With Avatar + Bio',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="h-auto p-0">
          @janesmith
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Jane Smith" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Jane Smith</h4>
            <p className="text-sm text-muted-foreground">
              Product designer and UI enthusiast. I write about design systems and accessibility.
            </p>
            <div className="flex items-center gap-1 pt-1">
              <CalendarIcon className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Joined March 2019</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const AlignStart: Story = {
  name: 'Align Start',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Align start</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p className="text-sm">This card is aligned to the start of the trigger.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const AlignCenter: Story = {
  name: 'Align Center (default)',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Align center</Button>
      </HoverCardTrigger>
      <HoverCardContent align="center">
        <p className="text-sm">This card is centered on the trigger (default).</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const AlignEnd: Story = {
  name: 'Align End',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Align end</Button>
      </HoverCardTrigger>
      <HoverCardContent align="end">
        <p className="text-sm">This card is aligned to the end of the trigger.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const SideTop: Story = {
  name: 'Side Top',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Side top</Button>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="text-sm">This card appears above the trigger.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const SideRight: Story = {
  name: 'Side Right',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Side right</Button>
      </HoverCardTrigger>
      <HoverCardContent side="right">
        <p className="text-sm">This card appears to the right.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const SideBottom: Story = {
  name: 'Side Bottom (default)',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Side bottom</Button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom">
        <p className="text-sm">This card appears below the trigger (default side).</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const SideLeft: Story = {
  name: 'Side Left',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Side left</Button>
      </HoverCardTrigger>
      <HoverCardContent side="left">
        <p className="text-sm">This card appears to the left.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithLinksInside: Story = {
  name: 'With Links Inside',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="h-auto p-0">
          @designsystem
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Design System</p>
              <p className="text-xs text-muted-foreground">Component library</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Open source React component library built with Tailwind CSS.
          </p>
          <div className="flex flex-col gap-1.5">
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <LinkIcon className="size-3" />
              designsystem.dev
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <TwitterIcon className="size-3" />
              @designsystemdev
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MapPinIcon className="size-3" />
              San Francisco, CA
            </a>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const DelayedOpen: Story = {
  name: 'Delayed Open (700ms)',
  render: () => (
    <HoverCard openDelay={700} closeDelay={300}>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover (700ms delay)</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm font-medium">Delayed hover card</p>
        <p className="text-sm text-muted-foreground">
          This card has a 700ms open delay and 300ms close delay.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const InstantOpen: Story = {
  name: 'Instant Open (0ms delay)',
  render: () => (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover (instant)</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm font-medium">Instant hover card</p>
        <p className="text-sm text-muted-foreground">
          This card opens and closes with zero delay.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const RichContent: Story = {
  name: 'Rich Content — Repository Card',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href="#"
          className="font-mono text-sm text-blue-600 underline hover:no-underline"
          onClick={(e) => e.preventDefault()}
        >
          shadcn/ui
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">shadcn/ui</p>
              <p className="text-xs text-muted-foreground">shadcn</p>
            </div>
            <span className="rounded-full border px-2 py-0.5 text-xs font-medium">Public</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Beautifully designed components that you can copy and paste into your apps. Accessible.
            Customizable. Open Source.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="size-2.5 rounded-full bg-yellow-400 inline-block" />
              TypeScript
            </span>
            <span>★ 68.4k</span>
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="size-3" />
            Updated 2 hours ago
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
