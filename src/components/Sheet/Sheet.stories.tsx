import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
  BarChartIcon,
  HelpCircleIcon,
} from 'lucide-react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './Sheet'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
    },
    modal: {
      control: 'boolean',
      description: 'When true, interaction with outside elements is disabled',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  name: 'Right (default)',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open right sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>
            This sheet slides in from the right side of the screen.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4 py-2">
          <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  name: 'Left',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open left sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left sheet</SheetTitle>
          <SheetDescription>Slides in from the left side.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4 py-2">
          <p className="text-sm text-muted-foreground">Content aligned from the left edge.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Top: Story = {
  name: 'Top',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open top sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top sheet</SheetTitle>
          <SheetDescription>Slides down from the top of the screen.</SheetDescription>
        </SheetHeader>
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground">Useful for banners or announcements.</p>
        </div>
        <SheetFooter className="flex-row justify-end">
          <SheetClose asChild>
            <Button variant="outline" size="sm">Dismiss</Button>
          </SheetClose>
          <Button size="sm">Take action</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Bottom: Story = {
  name: 'Bottom',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open bottom sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom sheet</SheetTitle>
          <SheetDescription>Slides up from the bottom. Common on mobile.</SheetDescription>
        </SheetHeader>
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground">Select an option below.</p>
        </div>
        <SheetFooter>
          <Button className="w-full">Confirm</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const WithForm: Story = {
  name: 'With Form',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit profile</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Update your profile information. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="sheet-name">Full name</Label>
            <Input id="sheet-name" defaultValue="Jane Smith" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sheet-email">Email</Label>
            <Input id="sheet-email" type="email" defaultValue="jane@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sheet-username">Username</Label>
            <Input id="sheet-username" defaultValue="@janesmith" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sheet-bio">Bio</Label>
            <textarea
              id="sheet-bio"
              rows={3}
              placeholder="Tell us a little about yourself"
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring/60 focus-visible:ring-[3px] focus-visible:ring-ring/30 focus-visible:outline-none resize-none"
            />
          </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const WithLongScrollableList: Story = {
  name: 'With Long Scrollable List',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View notifications</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>You have 24 unread notifications.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-3">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="rounded-lg border p-3 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">Notification {i + 1}</p>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {i === 0 ? 'Just now' : `${i + 1}h ago`}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {i % 3 === 0
                    ? 'Your export is ready to download.'
                    : i % 3 === 1
                    ? 'A new comment was added to your post.'
                    : 'Your account settings were updated.'}
                </p>
              </div>
            ))}
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" className="w-full">Mark all as read</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const NavMenuPattern: Story = {
  name: 'Nav Menu Pattern',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open navigation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription className="sr-only">Main app navigation</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 flex-1 px-2 py-4">
          {[
            { label: 'Home', icon: HomeIcon },
            { label: 'Dashboard', icon: LayoutDashboardIcon },
            { label: 'Team', icon: UsersIcon },
            { label: 'Analytics', icon: BarChartIcon },
            { label: 'Settings', icon: SettingsIcon },
            { label: 'Help', icon: HelpCircleIcon },
          ].map(({ label, icon: Icon }) => (
            <SheetClose key={label} asChild>
              <Button variant="ghost" className="justify-start gap-3">
                <Icon className="size-4" />
                {label}
              </Button>
            </SheetClose>
          ))}
        </nav>
        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">Close menu</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const NoCloseButton: Story = {
  name: 'No Close Button',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open (no close button)</Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No close button</SheetTitle>
          <SheetDescription>
            The X button is hidden. Use the footer action or press Escape to close.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4 py-2">
          <p className="text-sm text-muted-foreground">Content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full">Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const CloseInFooter: Story = {
  name: 'Close Button in Footer',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Review changes</SheetTitle>
          <SheetDescription>Check all pending changes before applying.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {['Added Button component', 'Updated Input styles', 'Removed deprecated prop'].map(
            (change) => (
              <div key={change} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 rounded-full bg-green-500 shrink-0" />
                {change}
              </div>
            )
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Discard</Button>
          </SheetClose>
          <Button>Apply changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
