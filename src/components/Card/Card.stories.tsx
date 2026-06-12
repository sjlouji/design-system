import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowUpRightIcon,
  MoreHorizontalIcon,
  TrendingUpIcon,
  UsersIcon,
  CreditCardIcon,
  ActivityIcon,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Basic card
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is the main content area of the card. Add any content here.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">Cancel</Button>
        <Button className="flex-1">Save</Button>
      </CardFooter>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// With header + content + footer
// ---------------------------------------------------------------------------

export const WithHeaderContentFooter: Story = {
  name: 'Header + content + footer',
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          You have 3 unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {['Your PR was merged.', 'Build #42 passed.', 'New comment on issue #7.'].map(
          (msg, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <div className="size-2 mt-1.5 shrink-0 rounded-full bg-primary" />
              <p>{msg}</p>
            </div>
          )
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// With CardAction in header
// ---------------------------------------------------------------------------

export const WithCardAction: Story = {
  name: 'With CardAction in header',
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Manage your team.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Invite</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {['Alice Kim', 'Bob Martin', 'Carol Davis'].map((name) => (
          <div key={name} className="flex items-center justify-between text-sm">
            <span>{name}</span>
            <span className="text-muted-foreground">Member</span>
          </div>
        ))}
      </CardContent>
    </Card>
  ),
}

export const WithMenuAction: Story = {
  name: 'With icon action in header',
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost" aria-label="More options">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No recent activity to display.</p>
      </CardContent>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// With CardDescription only
// ---------------------------------------------------------------------------

export const WithDescription: Story = {
  name: 'With description',
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Account overview</CardTitle>
        <CardDescription>
          Your account is active and in good standing. Subscription renews on
          August 1st, 2026.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Status: <span className="font-medium text-green-600">Active</span></p>
      </CardContent>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// Interactive card (hover)
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  name: 'Interactive (hover)',
  render: () => (
    <Card className="w-[280px] cursor-pointer transition-shadow hover:shadow-md hover:border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          View project
          <ArrowUpRightIcon className="size-4 text-muted-foreground" />
        </CardTitle>
        <CardDescription>Click to open the project dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">12 open tasks • 3 members</p>
      </CardContent>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// With form content
// ---------------------------------------------------------------------------

export const WithForm: Story = {
  name: 'With form content',
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter your details below to get started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">Cancel</Button>
        <Button className="flex-1">Create account</Button>
      </CardFooter>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// Stat card layout
// ---------------------------------------------------------------------------

export const StatCard: Story = {
  name: 'Stat card layout',
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[520px]">
      {[
        { label: 'Total revenue', value: '$45,231', change: '+20.1% from last month', icon: CreditCardIcon },
        { label: 'Active users', value: '+2,350', change: '+180.1% from last month', icon: UsersIcon },
        { label: 'Active sessions', value: '+12,234', change: '+19% from last month', icon: ActivityIcon },
        { label: 'Conversion', value: '+573', change: '+201 from last month', icon: TrendingUpIcon },
      ].map(({ label, value, change, icon: Icon }) => (
        <Card key={label}>
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardAction>
              <Icon className="size-4 text-muted-foreground" />
            </CardAction>
            <CardTitle className="text-2xl">{value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Image card
// ---------------------------------------------------------------------------

export const ImageCard: Story = {
  name: 'Image card',
  render: () => (
    <Card className="w-[300px] overflow-hidden p-0 gap-0">
      <div className="aspect-video w-full bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Image placeholder</span>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <CardHeader className="p-0">
          <CardTitle>Blog post title</CardTitle>
          <CardDescription>Published on June 12, 2026</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground">
            A short excerpt from the blog post goes here, giving readers a
            preview of the content inside.
          </p>
        </CardContent>
        <CardFooter className="p-0">
          <Button variant="link" className="p-0 h-auto">
            Read more
            <ArrowUpRightIcon className="size-3.5" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// Minimal — no header
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  name: 'Minimal — content only',
  render: () => (
    <Card className="w-[320px]">
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A minimal card with only a content section. No header, no footer.
        </p>
      </CardContent>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// Title only
// ---------------------------------------------------------------------------

export const TitleOnly: Story = {
  name: 'Header — title only',
  render: () => (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Configure your preferences here.</p>
      </CardContent>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// Dense / no padding override
// ---------------------------------------------------------------------------

export const DenseList: Story = {
  name: 'Dense list card',
  render: () => (
    <Card className="w-[340px]">
      <CardHeader>
        <CardTitle>Repositories</CardTitle>
        <CardAction>
          <Button size="sm" variant="ghost">New</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        {['design-system', 'dotfiles', 'api-service', 'web-app'].map((repo, i) => (
          <div
            key={repo}
            className={`flex items-center justify-between px-6 py-2.5 text-sm hover:bg-muted/50 ${
              i < 3 ? 'border-b' : ''
            }`}
          >
            <span className="font-medium">{repo}</span>
            <span className="text-xs text-muted-foreground">TypeScript</span>
          </div>
        ))}
      </CardContent>
    </Card>
  ),
}
