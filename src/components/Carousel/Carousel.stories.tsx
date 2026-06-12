import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageIcon, StarIcon, ShoppingCartIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/Card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from './Carousel'

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Scroll axis for the carousel',
      table: { defaultValue: { summary: 'horizontal' } },
    },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

// --- Basic ---

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((item) => (
          <CarouselItem key={item}>
            <div className="flex aspect-square items-center justify-center rounded-xl border bg-muted text-3xl font-bold text-muted-foreground">
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

// --- Orientation ---

export const Vertical: Story = {
  name: 'Orientation: Vertical',
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-xs" opts={{ align: 'start' }}>
      <CarouselContent className="h-[260px]">
        {['Getting started', 'Authentication', 'Database setup', 'Deployment', 'Monitoring'].map(
          (slide, i) => (
            <CarouselItem key={i} className="basis-1/3">
              <div className="flex h-full items-center justify-center rounded-lg border bg-muted p-4 text-sm font-medium">
                {slide}
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// --- Multiple visible items ---

export const MultipleItems: Story = {
  name: 'Multiple items visible',
  render: () => (
    <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
      <CarouselContent>
        {Array.from({ length: 8 }, (_, i) => (
          <CarouselItem key={i} className="basis-1/3">
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted p-2 text-sm font-semibold text-muted-foreground">
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// --- Loop enabled ---

export const Looping: Story = {
  name: 'Loop enabled',
  render: () => (
    <Carousel opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Storybook'].map((tech) => (
          <CarouselItem key={tech}>
            <div className="flex aspect-square items-center justify-center rounded-xl border bg-primary/10 p-6 text-lg font-semibold text-primary">
              {tech}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// --- Cards content ---

export const WithCards: Story = {
  name: 'With card content',
  render: () => (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {[
          { title: 'Pro Plan', price: '$29/mo', features: '10 seats, 100GB storage' },
          { title: 'Team Plan', price: '$79/mo', features: '50 seats, 1TB storage' },
          { title: 'Enterprise', price: 'Custom', features: 'Unlimited seats & storage' },
        ].map((plan) => (
          <CarouselItem key={plan.title}>
            <Card className="h-full">
              <CardContent className="flex flex-col gap-2">
                <p className="text-lg font-semibold">{plan.title}</p>
                <p className="text-2xl font-bold text-primary">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.features}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// --- Image carousel ---

export const ImageCarousel: Story = {
  name: 'Image placeholders',
  render: () => (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {[
          { bg: 'bg-blue-100', label: 'Mountain landscape' },
          { bg: 'bg-green-100', label: 'Forest path' },
          { bg: 'bg-amber-100', label: 'Desert sunset' },
          { bg: 'bg-purple-100', label: 'Ocean waves' },
        ].map(({ bg, label }) => (
          <CarouselItem key={label}>
            <div className={`flex aspect-video flex-col items-center justify-center gap-2 rounded-xl ${bg}`}>
              <ImageIcon className="size-10 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// --- Product carousel ---

export const ProductCarousel: Story = {
  name: 'Product cards',
  render: () => (
    <Carousel opts={{ align: 'start' }} className="w-full max-w-lg">
      <CarouselContent>
        {[
          { name: 'Wireless Headphones', price: '$149', rating: 4.8 },
          { name: 'Mechanical Keyboard', price: '$229', rating: 4.6 },
          { name: 'Ergonomic Mouse', price: '$79', rating: 4.5 },
          { name: 'USB-C Hub', price: '$59', rating: 4.3 },
          { name: 'Desk Lamp', price: '$45', rating: 4.7 },
        ].map((product) => (
          <CarouselItem key={product.name} className="basis-1/2">
            <Card>
              <CardContent className="flex flex-col gap-2">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
                  <ShoppingCartIcon className="size-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium leading-tight">{product.name}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{product.price}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </span>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// --- With API and dot indicators ---

export const WithDotIndicators: Story = {
  name: 'With dot indicators (API)',
  render: () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      if (!api) return
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())
      api.on('select', () => setCurrent(api.selectedScrollSnap()))
    }, [api])

    const slides = ['Introduction', 'Features', 'Pricing', 'FAQ', 'Contact']

    return (
      <div className="flex flex-col items-center gap-4">
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide}>
                <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted text-lg font-semibold">
                  {slide}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-full transition-colors ${
                i === current ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Slide {current + 1} of {count}
        </p>
      </div>
    )
  },
}

// --- No navigation buttons ---

export const NoNavigation: Story = {
  name: 'No navigation buttons',
  render: () => (
    <Carousel opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {['Drag or swipe to navigate', 'Use arrow keys when focused', 'No buttons required'].map(
          (text) => (
            <CarouselItem key={text}>
              <div className="flex aspect-square items-center justify-center rounded-xl border bg-muted p-6 text-center text-sm font-medium text-muted-foreground">
                {text}
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  ),
}

// --- Overview ---

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-10 w-full max-w-sm">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Single item (horizontal)
        </p>
        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3].map((n) => (
              <CarouselItem key={n}>
                <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted text-2xl font-bold text-muted-foreground">
                  {n}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Multiple items (1/3 basis)
        </p>
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <CarouselItem key={n} className="basis-1/3">
                <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-sm font-semibold text-muted-foreground">
                  {n}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  ),
}
