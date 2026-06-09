import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea, ScrollBar } from './ScrollArea'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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
