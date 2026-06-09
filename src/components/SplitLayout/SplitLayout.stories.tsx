import type { Meta, StoryObj } from '@storybook/react-vite'
import { SplitLayout } from './SplitLayout'
import { Section } from '@/components/Section'
import { Input } from '@/components/Input'

const meta = {
  title: 'Layout/SplitLayout',
  component: SplitLayout,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { label: '', children: null },
} satisfies Meta<typeof SplitLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Display Name',
    children: <Input placeholder="Enter your name" />,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email Address',
    description: 'Used for account notifications and login.',
    children: <Input type="email" placeholder="you@example.com" />,
  },
}

export const NestedInSection: Story = {
  render: () => (
    <Section title="Profile" description="Update your personal details." divider>
      <div className="flex flex-col gap-6">
        <SplitLayout label="Display Name" description="Your public display name.">
          <Input placeholder="Enter your name" />
        </SplitLayout>
        <SplitLayout label="Email" description="Used for account login and notifications.">
          <Input type="email" placeholder="you@example.com" />
        </SplitLayout>
      </div>
    </Section>
  ),
}
