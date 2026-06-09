import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
