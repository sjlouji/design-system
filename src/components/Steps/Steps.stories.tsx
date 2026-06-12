import type { Meta, StoryObj } from '@storybook/react-vite'
import { Steps } from './Steps'

const meta = {
  title: 'Data Display/Steps',
  component: Steps,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    steps: {
      control: false,
      description:
        'Array of `{ status, header, statusIconAriaLabel? }`. `header` accepts any ReactNode so you can embed links, badges, or action buttons inline.',
    },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    steps: [
      { status: 'success', header: 'Success step', statusIconAriaLabel: 'Success' },
      { status: 'warning', header: 'Warning step', statusIconAriaLabel: 'Warning' },
      { status: 'stopped', header: 'Stopped step', statusIconAriaLabel: 'Stopped' },
    ],
  },
}

export const WithLoading: Story = {
  args: {
    steps: [
      { status: 'success', header: 'Success step', statusIconAriaLabel: 'Success' },
      { status: 'loading', header: 'Loading step', statusIconAriaLabel: 'Loading' },
      { status: 'not-started', header: 'Not started step', statusIconAriaLabel: 'Not started' },
    ],
  },
}

export const WithError: Story = {
  args: {
    steps: [
      { status: 'success', header: 'Success step', statusIconAriaLabel: 'Success' },
      {
        status: 'error',
        statusIconAriaLabel: 'Error',
        header: (
          <span>
            Error step.{' '}
            <button className="font-bold text-blue-600 hover:underline">Retry</button>
          </span>
        ),
      },
    ],
  },
}

export const AllStatuses: Story = {
  args: {
    steps: [
      { status: 'success', header: 'Success', statusIconAriaLabel: 'Success' },
      { status: 'error', header: 'Error', statusIconAriaLabel: 'Error' },
      { status: 'warning', header: 'Warning', statusIconAriaLabel: 'Warning' },
      { status: 'in-progress', header: 'In progress', statusIconAriaLabel: 'In progress' },
      { status: 'loading', header: 'Loading', statusIconAriaLabel: 'Loading' },
      { status: 'stopped', header: 'Stopped', statusIconAriaLabel: 'Stopped' },
      { status: 'not-started', header: 'Not started', statusIconAriaLabel: 'Not started' },
    ],
  },
}

export const DeploymentPipeline: Story = {
  args: {
    steps: [
      { status: 'success', header: 'Source code fetched', statusIconAriaLabel: 'Success' },
      { status: 'success', header: 'Dependencies installed', statusIconAriaLabel: 'Success' },
      { status: 'success', header: 'Tests passed (42/42)', statusIconAriaLabel: 'Success' },
      { status: 'in-progress', header: 'Building Docker image', statusIconAriaLabel: 'In progress' },
      { status: 'not-started', header: 'Pushing to registry', statusIconAriaLabel: 'Not started' },
      { status: 'not-started', header: 'Deploying to production', statusIconAriaLabel: 'Not started' },
    ],
  },
}

export const FailedPipeline: Story = {
  args: {
    steps: [
      { status: 'success', header: 'Source code fetched', statusIconAriaLabel: 'Success' },
      { status: 'success', header: 'Dependencies installed', statusIconAriaLabel: 'Success' },
      {
        status: 'error',
        statusIconAriaLabel: 'Error',
        header: (
          <span>
            Tests failed (38/42).{' '}
            <button className="font-bold text-blue-600 hover:underline">View logs</button>
          </span>
        ),
      },
      { status: 'stopped', header: 'Build skipped', statusIconAriaLabel: 'Stopped' },
      { status: 'stopped', header: 'Deploy skipped', statusIconAriaLabel: 'Stopped' },
    ],
  },
}
