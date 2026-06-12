import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './Drawer'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Side from which the drawer slides in. "bottom" — slides up from the bottom edge, shows a drag handle (default). "top" — slides down from the top. "left" — slides in from the left, full height. "right" — slides in from the right, full height.',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state. When provided, pair with `onOpenChange` to drive open/close externally.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state for uncontrolled usage. The drawer manages its own state after mount.',
    },
    shouldScaleBackground: {
      control: 'boolean',
      description: 'When true, the page content behind the drawer is scaled down while the drawer is open, giving a depth effect.',
    },
    dismissible: {
      control: 'boolean',
      description: 'When true (default), the drawer can be closed by swiping the drag handle or clicking the overlay. Set to false to require an explicit close action.',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Fired when the open state changes. Receives the new boolean open value. Required when using the controlled `open` prop.',
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: 'bottom',
    dismissible: true,
    shouldScaleBackground: false,
    defaultOpen: false,
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>
            Swipe or click outside to close.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground">Drawer content goes here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Bottom: Story = {
  name: 'Bottom (default)',
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline">Open bottom drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bottom drawer</DrawerTitle>
          <DrawerDescription>
            Swipe down or click outside to close. This is the default direction.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground">Drawer content goes here.</p>
        </div>
        <DrawerFooter>
          <Button>Confirm</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Top: Story = {
  name: 'Top direction',
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">Open top drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Top drawer</DrawerTitle>
          <DrawerDescription>Slides down from the top of the screen.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground">Announcement or notification content.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Left: Story = {
  name: 'Left direction',
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">Open left drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>App navigation links.</DrawerDescription>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 px-4 py-2">
          {['Dashboard', 'Projects', 'Team', 'Reports', 'Settings'].map((item) => (
            <DrawerClose key={item} asChild>
              <Button variant="ghost" className="justify-start">
                {item}
              </Button>
            </DrawerClose>
          ))}
        </nav>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Right: Story = {
  name: 'Right direction',
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open right drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Details panel</DrawerTitle>
          <DrawerDescription>Inspect the selected item.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4 py-2">
          {[
            { label: 'Status', value: 'Active' },
            { label: 'Created', value: 'Jun 12, 2026' },
            { label: 'Owner', value: 'Jane Smith' },
            { label: 'Version', value: '3.2.1' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <Button>Edit item</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button>Add new item</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add new item</DrawerTitle>
          <DrawerDescription>Fill in the details below to create a new item.</DrawerDescription>
        </DrawerHeader>
        <form className="flex flex-col gap-4 px-4 pb-4">
          <div className="space-y-1.5">
            <Label htmlFor="item-name">Name</Label>
            <Input id="item-name" placeholder="Item name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="item-desc">Description</Label>
            <Input id="item-desc" placeholder="Optional description" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="item-tags">Tags</Label>
            <Input id="item-tags" placeholder="tag1, tag2" />
          </div>
        </form>
        <DrawerFooter>
          <Button type="submit">Create item</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const WithLongList: Story = {
  name: 'With Long Scrollable List',
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline">Select a country</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select country</DrawerTitle>
          <DrawerDescription>Choose your country from the list below.</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: '50vh' }}>
          <div className="flex flex-col gap-1">
            {[
              'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada',
              'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark',
              'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
              'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan',
              'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal',
              'Romania', 'South Africa', 'South Korea', 'Spain', 'Sweden',
              'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'United States',
            ].map((country) => (
              <DrawerClose key={country} asChild>
                <Button variant="ghost" className="justify-start font-normal">
                  {country}
                </Button>
              </DrawerClose>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const NonDismissible: Story = {
  name: 'Non-Dismissible',
  render: () => (
    <Drawer direction="bottom" dismissible={false}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open non-dismissible</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Required action</DrawerTitle>
          <DrawerDescription>
            You must complete this action before continuing. This drawer cannot be dismissed by
            swiping or clicking outside.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2">
          <div className="space-y-1.5">
            <Label htmlFor="confirm-text">Type "confirm" to proceed</Label>
            <Input id="confirm-text" placeholder="confirm" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Proceed</Button>
          <DrawerClose asChild>
            <Button variant="outline">Go back</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Nested: Story = {
  name: 'Nested Drawers',
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline">Open outer drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Outer drawer</DrawerTitle>
          <DrawerDescription>This drawer contains a nested drawer trigger.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <Drawer direction="bottom">
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                Open inner drawer
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Inner drawer</DrawerTitle>
                <DrawerDescription>This is a nested drawer inside the outer one.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close inner</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close outer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const ControlledOpen: Story = {
  name: 'Controlled Open State',
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open drawer</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Force close
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Drawer is: {open ? 'open' : 'closed'}</p>
        <Drawer open={open} onOpenChange={setOpen} direction="bottom">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled drawer</DrawerTitle>
              <DrawerDescription>Opened and closed via external state.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    )
  },
}
