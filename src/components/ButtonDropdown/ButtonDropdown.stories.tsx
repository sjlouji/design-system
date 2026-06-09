import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, TrashIcon, PencilIcon, CopyIcon } from 'lucide-react'
import { ButtonDropdown } from './ButtonDropdown'

const meta = {
  title: 'Components/ButtonDropdown',
  component: ButtonDropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ButtonDropdown>

export default meta
type Story = StoryObj<typeof meta>

const baseActions = [
  { label: 'Edit', icon: <PencilIcon className="size-4" /> },
  { label: 'Duplicate', icon: <CopyIcon className="size-4" /> },
  { label: 'Delete', icon: <TrashIcon className="size-4" />, destructive: true },
]

export const Default: Story = {
  args: {
    label: 'Save',
    actions: baseActions,
  },
}

export const Outline: Story = {
  args: {
    label: 'Export',
    variant: 'outline',
    actions: [
      { label: 'Export as CSV', icon: <DownloadIcon className="size-4" /> },
      { label: 'Export as JSON', icon: <DownloadIcon className="size-4" /> },
      { label: 'Export as PDF', icon: <DownloadIcon className="size-4" /> },
    ],
  },
}

export const Secondary: Story = {
  args: {
    label: 'Actions',
    variant: 'secondary',
    actions: baseActions,
  },
}

export const Loading: Story = {
  args: {
    label: 'Saving…',
    loading: true,
    actions: baseActions,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Save',
    disabled: true,
    actions: baseActions,
  },
}

export const SmallSize: Story = {
  args: {
    label: 'Save',
    size: 'sm',
    actions: baseActions,
  },
}

export const LargeSize: Story = {
  args: {
    label: 'Save',
    size: 'lg',
    actions: baseActions,
  },
}

export const WithDisabledAction: Story = {
  args: {
    label: 'Deploy',
    actions: [
      { label: 'Deploy to Staging' },
      { label: 'Deploy to Production', disabled: true },
      { label: 'Rollback', destructive: true },
    ],
  },
}
