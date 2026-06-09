import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon } from 'lucide-react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Starred repositories</h4>
        <CollapsibleTrigger asChild>
          <button className="flex items-center rounded-md p-1 text-sm hover:bg-muted">
            <ChevronDownIcon className="size-4" />
            <span className="sr-only">Toggle</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
