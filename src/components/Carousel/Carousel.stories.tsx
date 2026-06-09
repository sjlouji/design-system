import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './Carousel'

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((item) => (
          <CarouselItem key={item}>
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted p-6 text-2xl font-semibold">
              {item}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
