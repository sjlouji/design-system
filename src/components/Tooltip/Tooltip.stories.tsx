import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BoldIcon,
  CopyIcon,
  ItalicIcon,
  TrashIcon,
  UnderlineIcon,
  InfoIcon,
} from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './Tooltip'
import { Button } from '@/components/Button'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in ms before tooltip opens',
    },
    disableHoverableContent: {
      control: 'boolean',
      description: 'When true, hovering over content will not keep tooltip open',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const ShowArrow: Story = {
  name: 'Show Arrow (default true)',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">With arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow={true}>
        <p>Arrow is shown by default</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const NoArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">No arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>
        <p>showArrow={'{false}'} — no arrow rendered</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const SideTop: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Top</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Tooltip above</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const SideRight: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Right</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Tooltip to the right</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const SideBottom: Story = {
  name: 'Side Bottom (default)',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Bottom</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Tooltip below (default)</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const SideLeft: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Left</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Tooltip to the left</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const AlignStart: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Align start</Button>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p>Aligned to start</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Align end</Button>
      </TooltipTrigger>
      <TooltipContent align="end">
        <p>Aligned to end</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const DelayZero: Story = {
  name: 'Delay 0ms',
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Instant (0ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Opens immediately on hover</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Delay500: Story = {
  name: 'Delay 500ms',
  render: () => (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">500ms delay</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Opens after 500ms hover</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Delay1000: Story = {
  name: 'Delay 1000ms',
  render: () => (
    <TooltipProvider delayDuration={1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">1000ms delay</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Opens after 1 second</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const OnDisabledButton: Story = {
  name: 'On Disabled Button (wrapped in span)',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block cursor-not-allowed">
          <Button disabled className="pointer-events-none">
            Disabled action
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>You don't have permission to perform this action</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const RichContent: Story = {
  name: 'Rich Multi-Line Content',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <InfoIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="font-medium">Advanced feature</p>
        <p className="mt-1 text-xs opacity-80">
          This feature is in beta. It may change or be removed in future versions. Use with
          caution in production environments.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const OnIconButton: Story = {
  name: 'On Icon Buttons (toolbar pattern)',
  render: () => (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      {[
        { icon: BoldIcon, label: 'Bold', shortcut: '⌘B' },
        { icon: ItalicIcon, label: 'Italic', shortcut: '⌘I' },
        { icon: UnderlineIcon, label: 'Underline', shortcut: '⌘U' },
        { icon: CopyIcon, label: 'Copy', shortcut: '⌘C' },
        { icon: TrashIcon, label: 'Delete', shortcut: '⌫' },
      ].map(({ icon: Icon, label, shortcut }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <Icon />
              <span className="sr-only">{label}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {label} <span className="opacity-60">{shortcut}</span>
            </p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}

export const AllSidesComparison: Story = {
  name: 'All Sides — Comparison',
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="w-full capitalize">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Tooltip on the {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
