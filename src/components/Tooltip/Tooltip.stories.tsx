import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './Tooltip'

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
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          style={{
            border: '1px solid #ccc',
            borderRadius: 6,
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          Hover me
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const DestructiveContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          style={{
            border: '1px solid #ef4444',
            borderRadius: 6,
            padding: '6px 12px',
            cursor: 'pointer',
            color: '#ef4444',
          }}
        >
          Danger action
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This action is irreversible. Proceed with caution.</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const LeftSide: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          style={{
            border: '1px solid #ccc',
            borderRadius: 6,
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          Left tooltip
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Tooltip on the left</p>
      </TooltipContent>
    </Tooltip>
  ),
}
