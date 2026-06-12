import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea, ScrollBar } from './ScrollArea'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    className: {
      control: 'text',
      description:
        'Additional CSS classes on the root element. Use this to set the visible dimensions (e.g. "h-[200px] w-[300px]") — content overflowing those bounds becomes scrollable.',
    },
    children: {
      control: false,
      description:
        'Content rendered inside the scroll viewport. Any overflowing content will be scrollable. Pair with a <ScrollBar> child to show a horizontal scrollbar.',
    },
    type: {
      control: 'select',
      options: ['auto', 'always', 'scroll', 'hover'],
      description:
        'Controls scrollbar visibility. "auto" — shown when content overflows; "always" — always visible; "scroll" — shown while scrolling; "hover" — shown on pointer hover.',
    },
    scrollHideDelay: {
      control: 'number',
      description:
        'Milliseconds before the scrollbar hides after the pointer leaves (only relevant when type is "scroll" or "hover"). Default is 600.',
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description:
        'Reading direction. "ltr" places the vertical scrollbar on the right; "rtl" places it on the left.',
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
      {tags.map((tag) => (
        <div key={tag} style={{ padding: '4px 0', fontSize: 14 }}>
          {tag}
        </div>
      ))}
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-[300px] whitespace-nowrap rounded-md border">
      <div style={{ display: 'flex', padding: '1rem', gap: '0.5rem' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              minWidth: 80,
              height: 60,
              background: '#e5e5e5',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
            }}
          >
            Col {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
