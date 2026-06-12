import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, TrashIcon, PencilIcon, CopyIcon } from 'lucide-react'
import { ButtonDropdown } from './ButtonDropdown'

const meta = {
  title: 'Components/ButtonDropdown',
  component: ButtonDropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text label for the primary (left) button segment.',
    },
    onClick: {
      action: 'onClick',
      description: 'Click handler for the primary button segment. The dropdown trigger has its own handler via the actions array.',
    },
    actions: {
      control: false,
      description: 'Array of dropdown menu items. Each item: label (string), onClick (optional callback), icon (optional ReactNode shown left of label), disabled (boolean), destructive (boolean — renders item in red destructive style).',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary'],
      description: 'Visual style applied to both the primary button and the chevron trigger. "default" — filled primary. "outline" — bordered transparent. "secondary" — muted fill.',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Height and padding applied to both button segments. "sm" h-8, "default" h-9, "lg" h-10.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, disables both the primary button and the dropdown trigger.',
    },
    loading: {
      control: 'boolean',
      description: 'When true, shows a spinner in the primary button and disables both segments. Intended for async submit actions.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the outer wrapper div.',
    },
  },
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
    variant: 'default',
    size: 'default',
    disabled: false,
    loading: false,
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
