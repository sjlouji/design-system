import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarIcon, FilterIcon, SettingsIcon, SlidersIcon } from 'lucide-react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from './Popover'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state. Use together with `onOpenChange` to manage open state externally. When omitted the component manages state internally.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state for uncontrolled usage. The popover starts open when `true`.',
    },
    modal: {
      control: 'boolean',
      description: 'When `true`, interaction with content outside the popover is blocked and the page is inert until the popover is closed.',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Fires when the open state changes. Receives `open: boolean` — the new open state.',
    },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultOpen: false,
    modal: false,
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription>
            This is a short description of the popover content.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription>
            This is a short description of the popover content.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <SettingsIcon />
          Edit dimensions
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Edit dimensions</PopoverTitle>
          <PopoverDescription>Set the width and height for the element.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3 pt-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="pop-width">Width</Label>
            <Input id="pop-width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="pop-maxw">Max. width</Label>
            <Input id="pop-maxw" defaultValue="300px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="pop-height">Height</Label>
            <Input id="pop-height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="pop-maxh">Max. height</Label>
            <Input id="pop-maxh" defaultValue="none" className="col-span-2 h-8" />
          </div>
        </div>
        <div className="flex justify-end pt-3">
          <Button size="sm">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Start-aligned</PopoverTitle>
          <PopoverDescription>Content aligns to the start of the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignCenter: Story = {
  name: 'Align Center (default)',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align center</Button>
      </PopoverTrigger>
      <PopoverContent align="center">
        <PopoverHeader>
          <PopoverTitle>Center-aligned</PopoverTitle>
          <PopoverDescription>Content is centered on the trigger (default).</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align end</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>End-aligned</PopoverTitle>
          <PopoverDescription>Content aligns to the end of the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const SideTop: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Side top</Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <PopoverHeader>
          <PopoverTitle>Above trigger</PopoverTitle>
          <PopoverDescription>This popover appears above the trigger element.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const SideRight: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Side right</Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <PopoverHeader>
          <PopoverTitle>To the right</PopoverTitle>
          <PopoverDescription>This popover appears to the right of the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const SideLeft: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Side left</Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <PopoverHeader>
          <PopoverTitle>To the left</PopoverTitle>
          <PopoverDescription>This popover appears to the left of the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const FilterPanel: Story = {
  name: 'Filter Panel Pattern',
  render: () => {
    const [minPrice, setMinPrice] = React.useState('')
    const [maxPrice, setMaxPrice] = React.useState('')
    const [status, setStatus] = React.useState<string[]>([])

    const toggleStatus = (val: string) =>
      setStatus((prev) => (prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]))

    const activeCount = (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + status.length

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <FilterIcon />
            Filters{activeCount > 0 ? ` (${activeCount})` : ''}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <PopoverHeader>
            <PopoverTitle>Filter results</PopoverTitle>
            <PopoverDescription>Narrow down items by criteria.</PopoverDescription>
          </PopoverHeader>
          <div className="space-y-4 pt-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase text-muted-foreground tracking-wide">
                Price range
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-8"
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="h-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase text-muted-foreground tracking-wide">
                Status
              </Label>
              <div className="flex flex-wrap gap-2">
                {['Active', 'Pending', 'Archived', 'Draft'].map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleStatus(s)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      status.includes(s)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setMinPrice('')
                  setMaxPrice('')
                  setStatus([])
                }}
              >
                Clear all
              </Button>
              <Button size="sm" className="flex-1">
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

export const DatePickerPattern: Story = {
  render: () => {
    const [date, setDate] = React.useState('')
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-48 justify-start font-normal">
            <CalendarIcon />
            {date || 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <PopoverHeader>
            <PopoverTitle>Select date</PopoverTitle>
          </PopoverHeader>
          <div className="pt-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>
          <div className="flex justify-end pt-3">
            <Button size="sm">Confirm</Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

export const ControlsPanel: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" side="bottom" align="end">
        <PopoverHeader>
          <PopoverTitle>Display settings</PopoverTitle>
          <PopoverDescription>Adjust how content is shown.</PopoverDescription>
        </PopoverHeader>
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Density</Label>
            <select className="rounded border px-2 py-1 text-xs">
              <option>Comfortable</option>
              <option>Compact</option>
              <option>Spacious</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Font size</Label>
            <select className="rounded border px-2 py-1 text-xs">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
