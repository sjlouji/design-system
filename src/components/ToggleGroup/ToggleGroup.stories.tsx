import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { type: 'single' as const },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: '`single` — only one item can be active at a time (radio-like). `multiple` — any number of items can be active simultaneously (checkbox-like).',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: '`default` — transparent background with accent fill on active items. `outline` — bordered group with shared edge borders between adjacent items when `spacing` is `0`.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Controls the height and horizontal padding of all items in the group. `default` — 36px. `sm` — 32px. `lg` — 40px.',
    },
    spacing: {
      control: { type: 'number', min: 0 },
      description: 'Gap between items in Tailwind spacing units. `0` (default) collapses borders between items for a joined button-group appearance. Any positive value separates items.',
    },
    value: {
      control: false,
      description: 'Controlled active value(s). A string for `type="single"`, or a string array for `type="multiple"`.',
    },
    onValueChange: {
      action: 'valueChange',
      description: 'Fires when the active selection changes. Receives the new value — a string for `single`, a string array for `multiple`.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all items in the group.',
    },
    children: {
      control: false,
      description: 'Compose with `ToggleGroupItem` components. Each item inherits `variant` and `size` from the group context.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root group element.',
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'single',
    variant: 'default',
    size: 'default',
    spacing: 0,
  },
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const SingleVariant: Story = {
  render: () => (
    <ToggleGroup type="single" variant="default">
      <ToggleGroupItem value="a">Option A</ToggleGroupItem>
      <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      <ToggleGroupItem value="c">Option C</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const OutlineVariant: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="a">Option A</ToggleGroupItem>
      <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      <ToggleGroupItem value="c">Option C</ToggleGroupItem>
    </ToggleGroup>
  ),
}
