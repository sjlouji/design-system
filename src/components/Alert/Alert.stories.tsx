import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { InfoIcon } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <InfoIcon />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational alert with an icon.
      </AlertDescription>
    </Alert>
  ),
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>Styling check.</AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const alert = canvas.getByRole('alert')
    expect(alert).toBeInTheDocument()
    const styles = window.getComputedStyle(alert)
    expect(styles.borderRadius).toBe('8px')
    expect(styles.fontSize).toBe('14px')
  },
}

export const AllVariantsCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Default variant alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Destructive variant alert.</AlertDescription>
      </Alert>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const alerts = canvas.getAllByRole('alert')
    expect(alerts).toHaveLength(2)
    expect(alerts[0]).toHaveAttribute('data-slot', 'alert')
    expect(alerts[1]).toHaveAttribute('data-variant', 'destructive')
  },
}
