import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from './Section'
import { Button } from '@/components/Button'

const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'General',
    description: 'Basic settings for your account.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'API Keys',
    description: 'Manage your API keys.',
    action: <Button size="sm">Generate Key</Button>,
  },
}

export const WithDivider: Story = {
  args: {
    title: 'Notifications',
    description: 'Configure how you receive notifications.',
    divider: true,
    children: <p className="text-sm text-muted-foreground">Notification settings go here.</p>,
  },
}

export const WithContent: Story = {
  args: {
    title: 'About',
    children: (
      <p className="text-sm text-muted-foreground">
        This is the content section. You can place any components or text here as children of the
        Section component.
      </p>
    ),
  },
}
