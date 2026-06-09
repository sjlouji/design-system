import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './Sidebar'

describe('Sidebar', () => {
  it('renders the sidebar within a provider', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Home</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders sidebar wrapper from provider', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    )
    const wrapper = document.querySelector('[data-slot="sidebar-wrapper"]')
    expect(wrapper).toBeInTheDocument()
  })
})
