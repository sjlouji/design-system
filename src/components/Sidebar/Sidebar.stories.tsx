import type { Meta, StoryObj } from '@storybook/react-vite'
import { HomeIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from './Sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const navItems = [
  { title: 'Home', icon: HomeIcon, href: '#' },
  { title: 'Team', icon: UsersIcon, href: '#' },
  { title: 'Settings', icon: SettingsIcon, href: '#' },
]

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div style={{ padding: '0.5rem', fontWeight: 600, fontSize: 14 }}>My App</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid #eee' }}>
          <SidebarTrigger />
          <span style={{ marginLeft: '0.5rem', fontWeight: 500 }}>Dashboard</span>
        </header>
        <main style={{ padding: '1.5rem' }}>
          <p>Main content area</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
}
