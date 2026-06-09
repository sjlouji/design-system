import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './Sheet'

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

const SheetDemo = ({ side }: { side: 'right' | 'left' | 'top' | 'bottom' }) => (
  <Sheet>
    <SheetTrigger asChild>
      <button
        style={{
          border: '1px solid #ccc',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
        }}
      >
        Open {side} sheet
      </button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Sheet Title</SheetTitle>
        <SheetDescription>
          This is a sheet sliding in from the {side}.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
)

export const Right: Story = {
  render: () => <SheetDemo side="right" />,
}

export const Left: Story = {
  render: () => <SheetDemo side="left" />,
}

export const Top: Story = {
  render: () => <SheetDemo side="top" />,
}

export const Bottom: Story = {
  render: () => <SheetDemo side="bottom" />,
}
