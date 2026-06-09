import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from './Popover'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          style={{
            border: '1px solid #ccc',
            borderRadius: 6,
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>This is the popover description with some content.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}
