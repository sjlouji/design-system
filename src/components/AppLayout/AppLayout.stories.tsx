import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppLayout } from './AppLayout'

const meta = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    navigation: { control: false },
    breadcrumbs: { control: false },
    notifications: { control: false },
    tools: { control: false },
    content: { control: false },
    splitPanel: { control: false },
    splitPanelHeader: { control: false },
    navigationWidth: { control: 'number', description: 'Left nav width in px (default 240)' },
    toolsWidth: { control: 'number', description: 'Right tools panel width in px (default 280)' },
    splitPanelSize: { control: 'number', description: 'Split panel height in px when open (default 300)' },
  },
  args: {
    content: null,
  },
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

// ─── Shared sample content ─────────────────────────────────────────────────

function SampleNav() {
  return (
    <nav className="p-4">
      <ul className="space-y-1 text-sm">
        <li>
          <a href="#" className="block rounded px-3 py-2 font-medium hover:bg-accent">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="block rounded px-3 py-2 hover:bg-accent">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="block rounded px-3 py-2 hover:bg-accent">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="block rounded px-3 py-2 hover:bg-accent">
            Customers
          </a>
        </li>
        <li>
          <a href="#" className="block rounded px-3 py-2 hover:bg-accent">
            Settings
          </a>
        </li>
      </ul>
    </nav>
  )
}

function SampleContent({ title = 'Page Title' }: { title?: string }) {
  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">
        This is the main content area. It scrolls independently of the navigation
        and tools panels. Add your page-level components here.
      </p>
    </div>
  )
}

function SampleBreadcrumbs() {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <span>Home</span>
      <span>/</span>
      <span>Orders</span>
      <span>/</span>
      <span className="text-foreground font-medium">Order #1042</span>
    </nav>
  )
}

// ─── Stories ───────────────────────────────────────────────────────────────

export const BasicLayout: Story = {
  args: {
    navigation: <SampleNav />,
    breadcrumbs: <SampleBreadcrumbs />,
    content: <SampleContent />,
  },
}

export const WithTools: Story = {
  args: {
    navigation: <SampleNav />,
    breadcrumbs: <SampleBreadcrumbs />,
    tools: (
      <div className="p-4">
        <h2 className="mb-2 text-base font-semibold">Help</h2>
        <p className="text-sm text-muted-foreground">
          Use this panel to view contextual help, documentation links, or
          supplementary information related to the current page.
        </p>
      </div>
    ),
    content: <SampleContent title="With Tools Panel" />,
  },
}

export const WithNotifications: Story = {
  args: {
    notifications: (
      <div className="flex items-center gap-2 bg-green-600 px-4 py-2 text-sm text-white">
        <span className="font-medium">Success:</span>
        <span>Your changes have been saved successfully.</span>
      </div>
    ),
    navigation: <SampleNav />,
    breadcrumbs: <SampleBreadcrumbs />,
    content: <SampleContent title="With Notifications Bar" />,
  },
}

export const WithSplitPanel: Story = {
  args: {
    navigation: <SampleNav />,
    breadcrumbs: <SampleBreadcrumbs />,
    splitPanelHeader: 'Details',
    splitPanelOpen: true,
    splitPanel: (
      <div className="p-4">
        <h3 className="mb-2 text-sm font-semibold">Order Details</h3>
        <p className="text-sm text-muted-foreground">
          Additional details about the selected item are shown here. The split
          panel slides open from the bottom of the main content area.
        </p>
      </div>
    ),
    content: <SampleContent title="With Split Panel" />,
  },
}

export const FullKitchen: Story = {
  args: {},
  render: () => {
    const [navOpen, setNavOpen] = React.useState(true)
    const [toolsOpen, setToolsOpen] = React.useState(false)
    const [splitOpen, setSplitOpen] = React.useState(true)

    return (
      <AppLayout
        navigation={<SampleNav />}
        navigationOpen={navOpen}
        onNavigationChange={setNavOpen}
        breadcrumbs={<SampleBreadcrumbs />}
        notifications={
          <div className="flex items-center gap-2 bg-blue-600 px-4 py-2 text-sm text-white">
            <span className="font-medium">Info:</span>
            <span>System maintenance scheduled for Sunday 02:00 – 04:00 UTC.</span>
          </div>
        }
        tools={
          <div className="p-4">
            <h2 className="mb-2 text-base font-semibold">Help</h2>
            <p className="text-sm text-muted-foreground">
              Contextual help content for the current page. Toggle with the panel
              icon in the header bar.
            </p>
          </div>
        }
        toolsOpen={toolsOpen}
        onToolsChange={setToolsOpen}
        splitPanel={
          <div className="p-4">
            <h3 className="mb-2 text-sm font-semibold">Order Details</h3>
            <p className="text-sm text-muted-foreground">
              Split panel content. This panel slides up from the bottom of the
              content area and can be toggled using the header bar above it.
            </p>
          </div>
        }
        splitPanelHeader="Order Details"
        splitPanelOpen={splitOpen}
        onSplitPanelToggle={setSplitOpen}
        content={<SampleContent title="Full Kitchen Sink" />}
      />
    )
  },
}
