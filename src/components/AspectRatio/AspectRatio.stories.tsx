import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageIcon, PlayCircleIcon, MapPinIcon } from 'lucide-react'
import { AspectRatio } from './AspectRatio'

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Width-to-height ratio (e.g. 16/9, 4/3, 1)',
      table: { defaultValue: { summary: '1' } },
    },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

// --- Common ratios ---

export const Ratio16by9: Story = {
  name: 'Ratio: 16:9 (widescreen)',
  render: () => (
    <div className="w-[480px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-muted">
          <PlayCircleIcon className="size-10 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">16:9 — Video / Hero image</span>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Ratio4by3: Story = {
  name: 'Ratio: 4:3 (classic photo)',
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={4 / 3}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-muted">
          <ImageIcon className="size-10 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">4:3 — Classic photo</span>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  name: 'Ratio: 1:1 (square)',
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-muted">
          <ImageIcon className="size-10 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">1:1 — Square / Avatar</span>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Ratio21by9: Story = {
  name: 'Ratio: 21:9 (ultrawide)',
  render: () => (
    <div className="w-[480px]">
      <AspectRatio ratio={21 / 9}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-muted">
          <PlayCircleIcon className="size-10 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">21:9 — Ultrawide / Cinema</span>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Ratio3by4: Story = {
  name: 'Ratio: 3:4 (portrait)',
  render: () => (
    <div className="w-[240px]">
      <AspectRatio ratio={3 / 4}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-muted">
          <ImageIcon className="size-10 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">3:4 — Portrait</span>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Ratio9by16: Story = {
  name: 'Ratio: 9:16 (mobile story)',
  render: () => (
    <div className="w-[180px]">
      <AspectRatio ratio={9 / 16}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-muted">
          <PlayCircleIcon className="size-10 text-muted-foreground" />
          <span className="text-center text-sm font-medium text-muted-foreground">
            9:16
            <br />
            Story / Reel
          </span>
        </div>
      </AspectRatio>
    </div>
  ),
}

// --- Real content ---

export const WithRealImage: Story = {
  name: 'With real image',
  render: () => (
    <div className="w-[480px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="White building with windows"
          className="h-full w-full rounded-xl object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const WithRealImageSquare: Story = {
  name: 'With real image (square)',
  render: () => (
    <div className="w-[280px]">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=400&dpr=2&q=80"
          alt="Person in focus shot"
          className="h-full w-full rounded-xl object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

// --- Inside a card ---

export const InsideCard: Story = {
  name: 'Inside card (media card pattern)',
  render: () => (
    <div className="w-[320px] overflow-hidden rounded-xl border bg-card shadow-sm">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1530482054429-cc491f61333b?w=800&dpr=2&q=80"
          alt="Mountains at sunrise"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <div className="p-4">
        <p className="font-semibold">Mountain at Sunrise</p>
        <p className="mt-1 text-sm text-muted-foreground">
          A breathtaking view captured at 5:30am in the Swiss Alps.
        </p>
      </div>
    </div>
  ),
}

// --- Map placeholder ---

export const MapEmbed: Story = {
  name: 'Map embed placeholder',
  render: () => (
    <div className="w-[480px]">
      <AspectRatio ratio={4 / 3}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border bg-green-50">
          <MapPinIcon className="size-10 text-green-600" />
          <p className="text-sm font-medium text-green-700">Map placeholder — 4:3</p>
          <p className="text-xs text-green-600">Replace with an actual map embed</p>
        </div>
      </AspectRatio>
    </div>
  ),
}

// --- Responsive in grid ---

export const GridOfCards: Story = {
  name: 'Responsive grid of media cards',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
      {[
        'https://images.unsplash.com/photo-1550133730-695473e544be?w=400&q=80',
        'https://images.unsplash.com/photo-1610186594416-2c7c0131e35d?w=400&q=80',
        'https://images.unsplash.com/photo-1529419412599-7bb870e11810?w=400&q=80',
        'https://images.unsplash.com/photo-1490750967868-88df5691cc61?w=400&q=80',
        'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=400&q=80',
        'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=80',
      ].map((src, i) => (
        <div key={i} className="overflow-hidden rounded-lg">
          <AspectRatio ratio={1}>
            <img src={src} alt={`Gallery image ${i + 1}`} className="h-full w-full object-cover" />
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
}

// --- All ratios overview ---

export const AllRatios: Story = {
  name: 'All common ratios',
  parameters: { layout: 'padded' },
  render: () => {
    const ratios = [
      { label: '21:9', value: 21 / 9 },
      { label: '16:9', value: 16 / 9 },
      { label: '4:3', value: 4 / 3 },
      { label: '1:1', value: 1 },
      { label: '3:4', value: 3 / 4 },
    ]
    return (
      <div className="flex flex-wrap items-end gap-4">
        {ratios.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-[120px]">
              <AspectRatio ratio={value}>
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                  <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                </div>
              </AspectRatio>
            </div>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    )
  },
}

// --- Controllable ---

export const Playground: Story = {
  name: 'Playground (controllable ratio)',
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div className="w-[480px]">
      <AspectRatio {...args}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/50">
          <ImageIcon className="size-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">ratio = {args.ratio?.toFixed(2)}</span>
        </div>
      </AspectRatio>
    </div>
  ),
}
