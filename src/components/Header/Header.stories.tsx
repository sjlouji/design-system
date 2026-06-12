import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'
import { Branding } from '@/components/Branding'
import { TopNavigation } from '@/components/TopNavigation'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'
import {
  Bell,
  Search,
  HelpCircle,
  Settings,
  LayoutDashboard,
  FolderOpen,
  Users,
} from 'lucide-react'

const meta = {
  title: 'Navigation/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    sticky: {
      control: 'boolean',
      description: 'When true the header is `position: sticky` at the top of the viewport.',
    },
    branding: {
      control: false,
      description: 'Node rendered at the far left — typically a Branding component.',
    },
    navigation: {
      control: false,
      description: 'Node rendered in the center — hidden on mobile.',
    },
    actions: {
      control: false,
      description: 'Nodes rendered to the right, before the user avatar.',
    },
    user: {
      control: 'object',
      description: 'When provided, renders an avatar button that opens a user dropdown.',
    },
    onSignOut: {
      action: 'signOut',
      description: 'Called when the user clicks Sign out in the dropdown.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root `<header>` element.',
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

// ─── Shared fixtures ──────────────────────────────────────────────────────

const defaultUser = { name: 'Jane Smith', email: 'jane@example.com' }

const defaultNav = (
  <div className="flex items-center gap-1">
    <a href="#" className="px-3 py-2 text-sm text-foreground font-medium rounded-md bg-accent">
      Dashboard
    </a>
    <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50">
      Projects
    </a>
    <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50">
      Team
    </a>
    <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50">
      Settings
    </a>
  </div>
)

// ─── States ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    branding: <Branding name="Acme" />,
    navigation: defaultNav,
    actions: (
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell />
      </Button>
    ),
    user: defaultUser,
    onSignOut: () => alert('Signed out'),
  },
}

export const MinimalBrandingOnly: Story = {
  name: 'Minimal — branding only',
  args: {
    branding: <Branding name="Acme" />,
  },
}

export const BrandingAndUser: Story = {
  name: 'Branding + user (no navigation)',
  args: {
    branding: <Branding name="Acme" />,
    user: defaultUser,
    onSignOut: () => undefined,
  },
}

export const WithoutNavigation: Story = {
  name: 'Actions + user (no nav)',
  args: {
    branding: <Branding name="Acme" />,
    actions: (
      <>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Help">
          <HelpCircle />
        </Button>
      </>
    ),
    user: defaultUser,
  },
}

export const WithMultipleActions: Story = {
  args: {
    branding: <Branding name="Acme" />,
    navigation: defaultNav,
    actions: (
      <>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search />
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]">3</Badge>
        </div>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings />
        </Button>
      </>
    ),
    user: defaultUser,
  },
}

export const UserWithAvatar: Story = {
  name: 'User with avatar image',
  args: {
    branding: <Branding name="Acme" />,
    navigation: defaultNav,
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jane',
    },
    onSignOut: () => undefined,
  },
}

export const UserWithInitials: Story = {
  name: 'User with initials fallback',
  args: {
    branding: <Branding name="Acme" />,
    navigation: defaultNav,
    user: { name: 'Robert Johnson', email: 'robert@example.com' },
    onSignOut: () => undefined,
  },
}

export const NonSticky: Story = {
  name: 'Prop: sticky = false',
  args: {
    branding: <Branding name="Acme" />,
    navigation: defaultNav,
    user: defaultUser,
    sticky: false,
  },
}

// ─── Navigation variants ──────────────────────────────────────────────────

export const WithTopNavigation: Story = {
  name: 'With TopNavigation component',
  args: {
    branding: <Branding name="Acme" />,
    navigation: (
      <TopNavigation
        items={[
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, active: true },
          { id: 'projects', label: 'Projects', icon: <FolderOpen />, badge: 5 },
          { id: 'team', label: 'Team', icon: <Users /> },
        ]}
      />
    ),
    actions: (
      <Button variant="ghost" size="icon">
        <Bell />
      </Button>
    ),
    user: defaultUser,
  },
}

export const WithTaglineBranding: Story = {
  name: 'With tagline branding',
  args: {
    branding: <Branding name="Acme Corp" tagline="Build better products" size="md" />,
    navigation: defaultNav,
    user: defaultUser,
  },
}

// ─── Composite full layout ────────────────────────────────────────────────

export const AppLayout: Story = {
  name: 'Full app layout (with content)',
  render: () => (
    <div className="min-h-screen bg-background">
      <Header
        branding={<Branding name="Acme" />}
        navigation={defaultNav}
        actions={
          <>
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
          </>
        }
        user={defaultUser}
        onSignOut={() => undefined}
      />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back, Jane. Here's what's happening today.
          </p>
        </div>
      </main>
    </div>
  ),
}

export const MarketingHeader: Story = {
  name: 'Marketing site layout',
  render: () => (
    <Header
      sticky={false}
      branding={<Branding name="Acme" tagline="Build better" />}
      navigation={
        <div className="flex items-center gap-1">
          {['Product', 'Pricing', 'Blog', 'Docs'].map((label) => (
            <a
              key={label}
              href="#"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50"
            >
              {label}
            </a>
          ))}
        </div>
      }
      actions={
        <>
          <Button variant="ghost" size="sm">Log in</Button>
          <Button size="sm">Sign up free</Button>
        </>
      }
    />
  ),
}
