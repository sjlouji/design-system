import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

function TestTabs() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders all triggers', () => {
    render(<TestTabs />)
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('shows the default active tab', () => {
    render(<TestTabs />)
    const accountTrigger = screen.getByText('Account').closest('[data-slot="tabs-trigger"]')
    expect(accountTrigger).toHaveAttribute('data-state', 'active')
  })

  it('changes active tab on click', async () => {
    const user = userEvent.setup()
    render(<TestTabs />)
    await user.click(screen.getByText('Password'))
    const passwordTrigger = screen.getByText('Password').closest('[data-slot="tabs-trigger"]')
    expect(passwordTrigger).toHaveAttribute('data-state', 'active')
  })
})
