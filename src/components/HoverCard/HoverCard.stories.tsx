import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard'

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer underline decoration-dotted underline-offset-4">
          @johndoe
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">John Doe</h4>
          <p className="text-sm text-muted-foreground">
            Software engineer and open source contributor. Building cool things.
          </p>
          <p className="text-xs text-muted-foreground">Joined December 2021</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
