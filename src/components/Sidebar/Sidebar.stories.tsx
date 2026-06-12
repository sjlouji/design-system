import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BotIcon,
  ChevronRightIcon,
  CreditCardIcon,
  FilesIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/Collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
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

// ─── Shared nav data ─────────────────────────────────────────────────────────

const mainNav = [
  { title: 'Dashboard', icon: LayoutDashboardIcon, href: '#', badge: null },
  { title: 'Chats', icon: MessageSquareIcon, href: '#', badge: '12' },
  { title: 'Models', icon: BotIcon, href: '#', badge: null },
  { title: 'Documents', icon: FilesIcon, href: '#', badge: null },
  { title: 'Team', icon: UsersIcon, href: '#', badge: null },
]

const secondaryNav = [
  { title: 'Billing', icon: CreditCardIcon, href: '#' },
  { title: 'Settings', icon: SettingsIcon, href: '#' },
]

const Content = ({ title = 'Dashboard' }: { title?: string }) => (
  <SidebarInset>
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="h-4 w-px bg-border/60" />
      <span className="text-sm font-medium text-foreground">{title}</span>
      <div className="ml-auto">
        <Badge variant="ai" className="gap-1 text-xs">
          <SparklesIcon className="size-3" />
          AI Ready
        </Badge>
      </div>
    </header>
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="aspect-video rounded-xl bg-muted/40 border border-border/40" />
        ))}
      </div>
      <div className="flex-1 rounded-xl bg-muted/40 border border-border/40 min-h-[200px]" />
    </main>
  </SidebarInset>
)

// ─── Shared sidebar header ────────────────────────────────────────────────────

const AppHeader = () => (
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip="Acme AI"
          className="data-[state=open]:bg-sidebar-accent"
        >
          <div className="flex size-8 items-center justify-center rounded-lg [background:linear-gradient(135deg,var(--ai-grad-from),var(--ai-grad-to))] text-white text-xs font-bold shrink-0">
            AI
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Acme AI</span>
            <span className="text-xs text-muted-foreground">Enterprise</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
)

// ─── Shared sidebar footer ────────────────────────────────────────────────────

const AppFooter = () => (
  <SidebarFooter>
    <SidebarSeparator />
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip="Joan Louji"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <Avatar className="size-7 rounded-md shrink-0">
                <AvatarFallback className="rounded-md text-[11px] font-semibold bg-primary/10 text-primary">
                  JL
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">Joan Louji</span>
                <span className="text-xs text-muted-foreground">joan@acme.com</span>
              </div>
              <ChevronRightIcon className="ml-auto size-3.5 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-52">
            <DropdownMenuLabel className="text-xs text-muted-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
)

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild isActive={item.title === 'Dashboard'}>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondaryNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
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
        <AppFooter />
        <SidebarRail />
      </Sidebar>
      <Content title="Dashboard" />
    </SidebarProvider>
  ),
}

export const CollapsedByDefault: Story = {
  name: 'Collapsed by default',
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <AppHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
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
        <AppFooter />
        <SidebarRail />
      </Sidebar>
      <Content title="Starts collapsed — click rail or ⌘B to expand" />
    </SidebarProvider>
  ),
}

export const WithNestedItems: Story = {
  name: 'With nested navigation',
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" asChild isActive>
                    <a href="#">
                      <HomeIcon />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Collapsible sub-menu */}
                <Collapsible defaultOpen asChild>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Chats">
                        <MessageSquareIcon />
                        <span>Chats</span>
                        <ChevronRightIcon className="ml-auto size-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive>
                            <a href="#">General Chat</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <a href="#">Code Assistant</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <a href="#">Data Analysis</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                {[...mainNav.slice(2)].map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
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
        <AppFooter />
        <SidebarRail />
      </Sidebar>
      <Content title="Nested Navigation" />
    </SidebarProvider>
  ),
}

export const WithActions: Story = {
  name: 'With item actions',
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover>
                      <ChevronRightIcon />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <AppFooter />
        <SidebarRail />
      </Sidebar>
      <Content title="Item Actions (hover to reveal)" />
    </SidebarProvider>
  ),
}

export const OffcanvasCollapse: Story = {
  name: 'Offcanvas (slides out)',
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <AppHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNav.map((item) => (
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
        <AppFooter />
      </Sidebar>
      <Content title="Click trigger to slide sidebar in/out" />
    </SidebarProvider>
  ),
}
