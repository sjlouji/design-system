import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from './ContextMenu'

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Save as...</ContextMenuItem>
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
