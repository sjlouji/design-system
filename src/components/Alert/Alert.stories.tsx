import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  InfoIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  XCircleIcon,
  BellIcon,
  ShieldAlertIcon,
  ZapIcon,
} from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Visual style of the alert',
    },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Alert className="w-[420px]">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[420px]">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

// ---------------------------------------------------------------------------
// Content combinations
// ---------------------------------------------------------------------------

export const TitleOnly: Story = {
  name: 'Title only',
  render: () => (
    <Alert className="w-[420px]">
      <AlertTitle>Your storage is almost full.</AlertTitle>
    </Alert>
  ),
}

export const DescriptionOnly: Story = {
  name: 'Description only',
  render: () => (
    <Alert className="w-[420px]">
      <AlertDescription>
        Changes will take effect on the next page reload.
      </AlertDescription>
    </Alert>
  ),
}

export const TitleAndDescription: Story = {
  name: 'Title and description',
  render: () => (
    <Alert className="w-[420px]">
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the application is available. Refresh the page to get
        the latest features and bug fixes.
      </AlertDescription>
    </Alert>
  ),
}

// ---------------------------------------------------------------------------
// With icons — default variant
// ---------------------------------------------------------------------------

export const WithInfoIcon: Story = {
  name: 'With icon — info',
  render: () => (
    <Alert className="w-[420px]">
      <InfoIcon />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This feature is currently in beta. Your feedback helps us improve.
      </AlertDescription>
    </Alert>
  ),
}

export const WithSuccessIcon: Story = {
  name: 'With icon — success',
  render: () => (
    <Alert className="w-[420px]">
      <CheckCircle2Icon />
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>
        Your profile has been updated successfully.
      </AlertDescription>
    </Alert>
  ),
}

export const WithWarningIcon: Story = {
  name: 'With icon — warning',
  render: () => (
    <Alert className="w-[420px]">
      <AlertTriangleIcon />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        You are about to exceed your plan's usage limit.
      </AlertDescription>
    </Alert>
  ),
}

export const WithBellIcon: Story = {
  name: 'With icon — notification',
  render: () => (
    <Alert className="w-[420px]">
      <BellIcon />
      <AlertTitle>New notification</AlertTitle>
      <AlertDescription>
        You have 3 unread messages in your inbox.
      </AlertDescription>
    </Alert>
  ),
}

// ---------------------------------------------------------------------------
// With icons — destructive variant
// ---------------------------------------------------------------------------

export const DestructiveWithIcon: Story = {
  name: 'Destructive with icon',
  render: () => (
    <Alert variant="destructive" className="w-[420px]">
      <XCircleIcon />
      <AlertTitle>Delete failed</AlertTitle>
      <AlertDescription>
        Unable to delete the resource. Please check your permissions and try
        again.
      </AlertDescription>
    </Alert>
  ),
}

export const DestructiveWithShieldIcon: Story = {
  name: 'Destructive — security warning',
  render: () => (
    <Alert variant="destructive" className="w-[420px]">
      <ShieldAlertIcon />
      <AlertTitle>Security alert</AlertTitle>
      <AlertDescription>
        Suspicious login attempt detected from an unknown device. If this
        wasn't you, please change your password immediately.
      </AlertDescription>
    </Alert>
  ),
}

// ---------------------------------------------------------------------------
// All variants side by side
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-4 w-[420px]">
      <Alert>
        <InfoIcon />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is the default alert variant.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircleIcon />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This is the destructive alert variant.</AlertDescription>
      </Alert>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

export const LongDescription: Story = {
  name: 'Long description',
  render: () => (
    <Alert className="w-[420px]">
      <InfoIcon />
      <AlertTitle>Important policy update</AlertTitle>
      <AlertDescription>
        We have updated our terms of service and privacy policy. These changes
        affect how we collect, process, and store your personal data. The new
        policies take effect on July 1st. Please review the updated documents
        carefully and confirm your acceptance to continue using the service. If
        you have any questions, contact our support team.
      </AlertDescription>
    </Alert>
  ),
}

export const WithActionLink: Story = {
  name: 'With inline action link',
  render: () => (
    <Alert className="w-[420px]">
      <ZapIcon />
      <AlertTitle>New features available</AlertTitle>
      <AlertDescription>
        Your workspace has been upgraded.{' '}
        <a href="#" className="font-medium underline underline-offset-4">
          View what's new
        </a>
      </AlertDescription>
    </Alert>
  ),
}

export const NoIconDestructive: Story = {
  name: 'Destructive — no icon',
  render: () => (
    <Alert variant="destructive" className="w-[420px]">
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your card was declined. Please update your payment method.
      </AlertDescription>
    </Alert>
  ),
}

export const FullWidth: Story = {
  name: 'Full width',
  parameters: { layout: 'padded' },
  render: () => (
    <Alert>
      <InfoIcon />
      <AlertTitle>Maintenance scheduled</AlertTitle>
      <AlertDescription>
        The system will be unavailable on Sunday from 2:00 AM to 4:00 AM UTC.
      </AlertDescription>
    </Alert>
  ),
}
