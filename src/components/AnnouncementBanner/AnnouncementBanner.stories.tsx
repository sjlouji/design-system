import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket, Zap, ShieldAlert, Info, Bell } from 'lucide-react'
import { AnnouncementBanner } from './AnnouncementBanner'

const meta = {
  title: 'Components/AnnouncementBanner',
  component: AnnouncementBanner,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: {
      control: false,
      description: 'Main message. Accepts a string or JSX for mixed bold/coloured text.',
    },
    description: {
      control: 'text',
      description: 'Optional secondary inline text shown after the title.',
    },
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'neutral'],
      description: '"info" — blue. "success" — green gradient. "warning" — amber. "error" — red. "neutral" — muted grey.',
    },
    icon: {
      control: false,
      description: 'Optional leading icon element shown inside a pill on wider screens.',
    },
    action: {
      control: false,
      description: 'Optional CTA button: { label: string, onClick: () => void }.',
    },
    learnMoreUrl: {
      control: 'text',
      description: 'When provided, appends a "Learn more" link after the message.',
    },
    learnMoreLabel: {
      control: 'text',
      description: 'Label for the learn-more link. Defaults to "Learn more".',
    },
    onDismiss: {
      action: 'onDismiss',
      description: 'When provided, renders a dismiss (×) button. Fired on click.',
    },
    showGrid: {
      control: 'boolean',
      description: 'Overlay a subtle grid pattern over the background. Defaults to false.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root element.',
    },
  },
} satisfies Meta<typeof AnnouncementBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: (
      <>
        <strong>Upgrade to Pro</strong> for 2x more CPUs and faster builds
      </>
    ),
    variant: 'info',
    onDismiss: () => {},
  },
}

export const AllVariants: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-3 max-w-2xl">
      <AnnouncementBanner
        variant="info"
        title={<><strong>Upgrade to Pro</strong> for 2× more CPUs and faster builds</>}
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="success"
        title={<><strong>You're on the Pro plan.</strong> Enjoy unlimited builds.</>}
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="warning"
        title={<><strong>Usage at 90%.</strong> You may hit limits before the cycle resets.</>}
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="error"
        title={<><strong>Build failed.</strong> Deployment was rolled back automatically.</>}
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="neutral"
        title={<><strong>Maintenance scheduled</strong> for Sunday 2 AM UTC.</>}
        onDismiss={() => {}}
      />
    </div>
  ),
}

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: <><strong>New feature:</strong> GitHub Actions integration is now available.</>,
    action: { label: 'Try it now', onClick: () => {} },
    onDismiss: () => {},
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'success',
    title: <><strong>Deploy successful.</strong> Your changes are live.</>,
    icon: <Rocket className="size-4 text-green-600" />,
    action: { label: 'View deployment', onClick: () => {} },
    onDismiss: () => {},
  },
}

export const WithLearnMore: Story = {
  args: {
    variant: 'warning',
    title: <><strong>Deprecation notice:</strong> The v1 API will be sunset on Jan 1.</>,
    learnMoreUrl: 'https://example.com/migration',
    learnMoreLabel: 'Migration guide',
    onDismiss: () => {},
  },
}

export const WithGridBackground: Story = {
  args: {
    variant: 'success',
    title: <><strong>Joan Pro</strong> — ship faster with unlimited seats.</>,
    icon: <Zap className="size-4 text-emerald-600" />,
    action: { label: 'Upgrade now', onClick: () => {} },
    learnMoreUrl: 'https://example.com',
    onDismiss: () => {},
    showGrid: true,
  },
}

export const Dismissible: Story = {
  args: {} as Story['args'],
  render: () => {
    const [visible, setVisible] = React.useState(true)
    return visible ? (
      <AnnouncementBanner
        variant="info"
        title={<><strong>New dashboard</strong> — try the redesigned analytics view.</>}
        action={{ label: 'Explore', onClick: () => {} }}
        onDismiss={() => setVisible(false)}
      />
    ) : (
      <button
        className="text-sm text-muted-foreground underline"
        onClick={() => setVisible(true)}
      >
        Show banner again
      </button>
    )
  },
}

export const NoDismiss: Story = {
  args: {
    variant: 'error',
    title: (
      <>
        <strong>Service degraded.</strong> We are investigating an issue affecting builds in
        eu-west-1.
      </>
    ),
    icon: <ShieldAlert className="size-4 text-red-500" />,
    learnMoreUrl: 'https://status.example.com',
    learnMoreLabel: 'Status page',
  },
}

export const IconVariants: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-3 max-w-2xl">
      <AnnouncementBanner
        variant="info"
        icon={<Info className="size-4 text-blue-500" />}
        title={<><strong>Info:</strong> System update scheduled.</>}
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="warning"
        icon={<Bell className="size-4 text-amber-500" />}
        title={<><strong>Reminder:</strong> Your trial ends in 3 days.</>}
        action={{ label: 'Upgrade', onClick: () => {} }}
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="success"
        icon={<Zap className="size-4 text-emerald-600" />}
        title={<><strong>Pro activated.</strong> Unlimited builds are now enabled.</>}
        showGrid
        onDismiss={() => {}}
      />
    </div>
  ),
}
