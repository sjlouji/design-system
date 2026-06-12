import type { Meta, StoryObj } from '@storybook/react-vite'

import { PanelLayout } from './PanelLayout'

// ─── Shared sample content ──────────────────────────────────────────────────

const mainConfigContent = (
  <div className="p-4">
    <h2 className="mb-4 text-lg font-semibold">Widget configuration</h2>
    <div className="flex flex-col gap-3">
      <div className="rounded-md border p-3">
        <p className="font-medium">Line chart</p>
        <p className="text-sm text-muted-foreground">Visualize trends over time</p>
      </div>
      <div className="rounded-md border p-3">
        <p className="font-medium">Bar chart</p>
        <p className="text-sm text-muted-foreground">Compare values across categories</p>
      </div>
      <div className="rounded-md border p-3">
        <p className="font-medium">Pie chart</p>
        <p className="text-sm text-muted-foreground">Show proportions of a whole</p>
      </div>
    </div>
  </div>
)

const panelSelectContent = (
  <div className="p-4">
    <h2 className="mb-4 text-lg font-semibold">Select source</h2>
    <div className="flex flex-col gap-2">
      <div className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 hover:bg-accent">
        <div className="size-4 rounded-full border-2 border-primary" />
        <span className="text-sm">Database</span>
      </div>
      <div className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 hover:bg-accent">
        <div className="size-4 rounded-full border-2 border-muted-foreground" />
        <span className="text-sm">API endpoint</span>
      </div>
      <div className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 hover:bg-accent">
        <div className="size-4 rounded-full border-2 border-muted-foreground" />
        <span className="text-sm">File upload</span>
      </div>
    </div>
  </div>
)

const loremMain = (
  <div className="p-4">
    <h2 className="mb-3 text-lg font-semibold">Main content</h2>
    <p className="text-sm text-muted-foreground">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  </div>
)

const loremPanel = (
  <div className="p-4">
    <h2 className="mb-3 text-lg font-semibold">Panel content</h2>
    <p className="text-sm text-muted-foreground">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum. Curabitur pretium tincidunt lacus.
    </p>
  </div>
)

const formPanel = (
  <div className="p-4">
    <h2 className="mb-4 text-lg font-semibold">Filter options</h2>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Region</label>
        <div className="rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
          Select region…
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Date range</label>
        <div className="rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
          MM/DD/YYYY – MM/DD/YYYY
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Status</label>
        <div className="flex flex-col gap-1">
          {['Active', 'Pending', 'Archived'].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="size-4 rounded border" />
              <span className="text-sm">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Layout/PanelLayout',
  component: PanelLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    mainContent: { control: false },
    panelContent: { control: false },
  },
  args: {
    mainContent: mainConfigContent,
    panelContent: panelSelectContent,
  },
} satisfies Meta<typeof PanelLayout>

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div className="h-[400px]">
      <PanelLayout {...args} />
    </div>
  ),
}

export const PanelOnLeft: Story = {
  render: (args) => (
    <div className="h-[400px]">
      <PanelLayout {...args} panelPosition="side-start" />
    </div>
  ),
}

export const Resizable: Story = {
  render: (args) => (
    <div className="h-[400px]">
      <PanelLayout
        {...args}
        mainContent={loremMain}
        panelContent={loremPanel}
        resizable={true}
        defaultPanelSize={25}
      />
    </div>
  ),
}

export const ResizableWithConstraints: Story = {
  render: (args) => (
    <div className="h-[400px]">
      <PanelLayout
        {...args}
        mainContent={loremMain}
        panelContent={loremPanel}
        resizable={true}
        defaultPanelSize={30}
        minPanelSize={15}
        maxPanelSize={60}
      />
    </div>
  ),
}

export const CustomPanelWidth: Story = {
  render: (args) => (
    <div className="h-[400px]">
      <PanelLayout {...args} panelContent={formPanel} resizable={false} defaultPanelSize={320} />
    </div>
  ),
}
