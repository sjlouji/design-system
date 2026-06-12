import type { Meta, StoryObj } from '@storybook/react-vite'

import { ContentLayout } from './ContentLayout'

const meta = {
  title: 'Components/ContentLayout',
  component: ContentLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    defaultPadding: {
      control: 'boolean',
      description: 'Adds p-6 to both the header and content regions.',
    },
    disableOverlap: {
      control: 'boolean',
      description:
        'When true, removes the subtle background overlap effect and shows a separator instead.',
    },
    maxContentWidth: {
      control: 'number',
      description: 'Constrains the inner content wrapper to this pixel width.',
    },
    header: {
      control: false,
      description: 'Content rendered in the header region above the page body.',
    },
    children: {
      control: false,
      description: 'Main page body content.',
    },
  },
} satisfies Meta<typeof ContentLayout>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function SampleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm p-6">
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  )
}

function SampleHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Basic: Story = {
  render: () => (
    <ContentLayout
      header={
        <div className="px-6 pt-6 pb-4">
          <SampleHeader
            title="Page title"
            description="A brief description of what this page contains."
          />
        </div>
      }
    >
      <div className="p-6">
        <SampleCard
          title="Content area"
          body="This is the main content area. The header sits above with a subtle overlap effect."
        />
      </div>
    </ContentLayout>
  ),
}

// ---------------------------------------------------------------------------
// With padding
// ---------------------------------------------------------------------------

export const WithPadding: Story = {
  name: 'With padding',
  render: () => (
    <ContentLayout
      defaultPadding
      header={
        <SampleHeader
          title="Settings"
          description="Manage your workspace preferences and account details."
        />
      }
    >
      <SampleCard
        title="General settings"
        body="Configure display name, timezone, and notification preferences."
      />
    </ContentLayout>
  ),
}

// ---------------------------------------------------------------------------
// With max width
// ---------------------------------------------------------------------------

export const WithMaxWidth: Story = {
  name: 'With max content width',
  render: () => (
    <ContentLayout
      defaultPadding
      maxContentWidth={800}
      header={
        <SampleHeader
          title="Documentation"
          description="This content is constrained to 800 px even on wide viewports."
        />
      }
    >
      <div className="space-y-4">
        <SampleCard
          title="Introduction"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <SampleCard
          title="Getting started"
          body="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </div>
    </ContentLayout>
  ),
}

// ---------------------------------------------------------------------------
// With alert in header
// ---------------------------------------------------------------------------

export const WithAlert: Story = {
  name: 'With alert in header',
  render: () => (
    <ContentLayout
      header={
        <div className="px-6 pt-6 pb-4 space-y-4">
          <SampleHeader
            title="Billing overview"
            description="Review your current plan and upcoming charges."
          />
          <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                clipRule="evenodd"
              />
            </svg>
            <p>
              Your trial ends on <strong>June 30, 2026</strong>. Add a payment method to avoid
              service interruption.
            </p>
          </div>
        </div>
      }
    >
      <div className="p-6 space-y-4">
        <SampleCard
          title="Current plan"
          body="Pro — $49/month, billed monthly. Includes 5 seats and 50 GB storage."
        />
        <SampleCard
          title="Usage this month"
          body="Storage: 18 GB / 50 GB used. API calls: 124,882 / 500,000."
        />
      </div>
    </ContentLayout>
  ),
}

// ---------------------------------------------------------------------------
// Disable overlap
// ---------------------------------------------------------------------------

export const DisableOverlap: Story = {
  name: 'Disable overlap',
  render: () => (
    <ContentLayout
      disableOverlap
      defaultPadding
      header={
        <SampleHeader
          title="Reports"
          description="The overlap effect is disabled — a separator is shown instead."
        />
      }
    >
      <SampleCard
        title="Monthly summary"
        body="A flat separator replaces the subtle depth effect between header and content."
      />
    </ContentLayout>
  ),
}
