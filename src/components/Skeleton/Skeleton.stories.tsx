import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Basic primitives
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    className: 'h-4 w-64',
  },
}

export const Circle: Story = {
  name: 'Circle (avatar)',
  args: {
    className: 'size-12 rounded-full',
  },
}

export const Rectangle: Story = {
  name: 'Rectangle (image placeholder)',
  args: {
    className: 'h-40 w-64 rounded-lg',
  },
}

export const Pill: Story = {
  name: 'Pill (badge placeholder)',
  args: {
    className: 'h-5 w-16 rounded-full',
  },
}

// ---------------------------------------------------------------------------
// Text line patterns
// ---------------------------------------------------------------------------

export const TextLines: Story = {
  name: 'Text lines',
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
}

export const Paragraph: Story = {
  name: 'Paragraph block',
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
}

export const Heading: Story = {
  name: 'Heading + paragraph',
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Skeleton className="h-7 w-48" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Composed patterns
// ---------------------------------------------------------------------------

export const CardSkeleton: Story = {
  name: 'Card skeleton',
  render: () => (
    <div className="w-72 rounded-xl border bg-card p-4 flex flex-col gap-3 shadow-sm">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  ),
}

export const ProfileSkeleton: Story = {
  name: 'Avatar + text (profile)',
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-12 rounded-full shrink-0" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}

export const ProfileListSkeleton: Story = {
  name: 'Profile list',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      ))}
    </div>
  ),
}

export const TableSkeleton: Story = {
  name: 'Table skeleton',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="w-full max-w-xl">
      {/* header */}
      <div className="flex gap-4 pb-3 border-b">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16 ml-auto" />
      </div>
      {/* rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 py-3 border-b items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-lg ml-auto" />
        </div>
      ))}
    </div>
  ),
}

export const FormSkeleton: Story = {
  name: 'Form skeleton',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-9 w-full rounded-lg mt-2" />
    </div>
  ),
}

export const ArticleSkeleton: Story = {
  name: 'Article skeleton',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-5 max-w-lg">
      {/* category + date */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      {/* title */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-4/5" />
      </div>
      {/* byline */}
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
      {/* cover image */}
      <Skeleton className="h-52 w-full rounded-xl" />
      {/* body */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ),
}

export const ChatMessageSkeleton: Story = {
  name: 'Chat message skeleton',
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      {/* incoming */}
      <div className="flex gap-2">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-4 w-3/4 rounded-2xl rounded-tl-none" />
          <Skeleton className="h-4 w-1/2 rounded-2xl rounded-tl-none" />
        </div>
      </div>
      {/* outgoing */}
      <div className="flex gap-2 flex-row-reverse">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className="flex flex-col gap-1.5 items-end flex-1">
          <Skeleton className="h-4 w-2/3 rounded-2xl rounded-tr-none" />
          <Skeleton className="h-4 w-2/5 rounded-2xl rounded-tr-none" />
        </div>
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Different sizes via className
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: 'Different sizes via className',
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-2</span>
        <Skeleton className="h-2 w-48" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-3</span>
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-4</span>
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-5</span>
        <Skeleton className="h-5 w-48" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-6</span>
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-8</span>
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-10</span>
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-20">h-12</span>
        <Skeleton className="h-12 w-48" />
      </div>
    </div>
  ),
}
