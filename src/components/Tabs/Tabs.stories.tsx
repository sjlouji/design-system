import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p style={{ padding: '1rem 0', fontSize: 14 }}>
          Make changes to your account here. Click save when you are done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p style={{ padding: '1rem 0', fontSize: 14 }}>
          Change your password here. After saving, you will be logged out.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ padding: '1rem 0', fontSize: 14 }}>
          Update your settings and preferences.
        </p>
      </TabsContent>
    </Tabs>
  ),
}

export const DefaultValue: Story = {
  render: () => (
    <Tabs defaultValue="password" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content (default)</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  ),
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const activeTab = canvas.getByRole('tab', { name: 'Account' })
    expect(activeTab).toHaveAttribute('data-state', 'active')
    const styles = window.getComputedStyle(activeTab)
    expect(styles.fontSize).toBe('14px')
  },
}

export const SwitchTabInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="password">Password panel</TabsContent>
      <TabsContent value="settings">Settings panel</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const accountTab = canvas.getByRole('tab', { name: 'Account' })
    const passwordTab = canvas.getByRole('tab', { name: 'Password' })
    expect(accountTab).toHaveAttribute('data-state', 'active')
    expect(canvas.getByText('Account panel')).toBeVisible()
    await userEvent.click(passwordTab)
    expect(passwordTab).toHaveAttribute('data-state', 'active')
    expect(accountTab).toHaveAttribute('data-state', 'inactive')
    expect(canvas.getByText('Password panel')).toBeVisible()
  },
}
