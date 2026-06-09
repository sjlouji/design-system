import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from './AspectRatio'

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Ratio16by9: Story = {
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Ratio4by3: Story = {
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={4 / 3}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          4:3
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
}
