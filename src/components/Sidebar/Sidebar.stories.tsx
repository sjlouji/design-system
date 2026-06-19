import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  ActivityIcon,
  BotIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  FilesIcon,
  FolderIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
  WalletIcon,
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
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
      description:
        'Which edge of the viewport the sidebar is anchored to. "left" is the standard app navigation position; "right" can be used for detail panels or secondary navigation.',
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'floating', 'inset'],
      description:
        '"sidebar" — flush against the edge with a border; "floating" — elevated panel with rounded corners and shadow, padded from the edge; "inset" — the main content area is inset and the sidebar underlaps it, creating a card-in-canvas effect.',
    },
    collapsible: {
      control: 'select',
      options: ['offcanvas', 'icon', 'none'],
      description:
        '"offcanvas" — sidebar slides fully off-screen when collapsed; "icon" — sidebar narrows to icon-only width showing tooltips for labels; "none" — sidebar is always expanded and cannot be toggled.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the sidebar container.',
    },
    children: {
      control: false,
      description:
        'Sidebar sub-components: SidebarHeader, SidebarContent, SidebarFooter, SidebarRail, etc. Use SidebarContent as the primary scrollable region.',
    },
  },
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
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
  },
  render: (args) => (
    <SidebarProvider>
      <Sidebar {...args}>
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

// ─── Sidebar-08: team switcher + projects ─────────────────────────────────────

const teams = [
  { name: 'Acme Corp', plan: 'Enterprise', initials: 'AC' },
  { name: 'Side Project', plan: 'Free', initials: 'SP' },
  { name: 'Personal', plan: 'Pro', initials: 'ME' },
]

const s08Projects = [
  { name: 'Design System', emoji: '🎨' },
  { name: 'Marketing Site', emoji: '🌐' },
  { name: 'API Gateway', emoji: '⚡' },
  { name: 'Mobile App', emoji: '📱' },
  { name: 'Data Pipeline', emoji: '🔄' },
]

const nav08Main = [
  { title: 'Dashboard', icon: LayoutDashboardIcon, href: '#', active: true },
  { title: 'Chats', icon: MessageSquareIcon, href: '#', active: false },
  { title: 'Models', icon: BotIcon, href: '#', active: false },
  { title: 'Documents', icon: FilesIcon, href: '#', active: false },
  { title: 'Team', icon: UsersIcon, href: '#', active: false },
]

const nav08Secondary = [
  { title: 'Settings', icon: SettingsIcon, href: '#' },
  { title: 'Billing', icon: CreditCardIcon, href: '#' },
]

function TeamSwitcherHeader() {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                  {activeTeam.initials}
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold">{activeTeam.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{activeTeam.plan}</span>
                </div>
                <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" side="bottom" sideOffset={4}>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teams.map((team) => (
                <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-background text-[10px] font-bold">
                    {team.initials}
                  </div>
                  <div className="grid flex-1">
                    <span className="text-sm font-medium">{team.name}</span>
                    <span className="text-xs text-muted-foreground">{team.plan}</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-background">
                  <PlusIcon className="size-3.5" />
                </div>
                <span className="font-medium">New workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

function UserFooter08() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                <Avatar className="size-8 rounded-lg shrink-0">
                  <AvatarFallback className="rounded-lg text-xs font-semibold bg-primary/10 text-primary">
                    JL
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold">Joan Louji</span>
                  <span className="truncate text-xs text-muted-foreground">joan@acme.com</span>
                </div>
                <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="bottom" sideOffset={4}>
              <DropdownMenuLabel className="flex items-center gap-2 p-2">
                <Avatar className="size-8 rounded-lg shrink-0">
                  <AvatarFallback className="rounded-lg text-xs font-semibold bg-primary/10 text-primary">JL</AvatarFallback>
                </Avatar>
                <div className="grid flex-1">
                  <span className="text-sm font-semibold">Joan Louji</span>
                  <span className="text-xs text-muted-foreground">joan@acme.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2"><SparklesIcon className="size-4" /> Upgrade to Pro</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2"><SettingsIcon className="size-4" /> Settings</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><CreditCardIcon className="size-4" /> Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <LogOutIcon className="size-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export const WithTeamSwitcher: Story = {
  name: 'Sidebar-08 — team switcher + projects',
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <TeamSwitcherHeader />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav08Main.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild isActive={item.active}>
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

          <SidebarSeparator />

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="flex items-center">
              Projects
              <button className="ml-auto flex size-5 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <PlusIcon className="size-3.5" />
              </button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {s08Projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <span>{project.emoji}</span>
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontalIcon className="size-4" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start" className="w-40">
                        <DropdownMenuItem className="gap-2"><FolderIcon className="size-4" /> View project</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><ShareIcon className="size-4" /> Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <TrashIcon className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                {nav08Secondary.map((item) => (
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

        <UserFooter08 />
        <SidebarRail />
      </Sidebar>
      <Content title="Dashboard — Team Switcher + Projects" />
    </SidebarProvider>
  ),
}

// ─── Clean Nav Sidebar ────────────────────────────────────────────────────────

type CleanNavItem =
  | { kind: 'link'; title: string; icon: React.ElementType; href: string; badge?: string; active?: boolean }
  | { kind: 'group'; title: string; icon: React.ElementType; defaultOpen?: boolean; children: { title: string; active?: boolean }[] }

const cleanNavItems: CleanNavItem[] = [
  { kind: 'link', title: 'Activity', icon: ActivityIcon, href: '#', badge: '4' },
  { kind: 'link', title: 'Dashboard', icon: LayoutDashboardIcon, href: '#' },
  { kind: 'link', title: 'Chat feed', icon: MessageSquareIcon, href: '#' },
  {
    kind: 'group',
    title: 'Projects',
    icon: SparklesIcon,
    defaultOpen: true,
    children: [
      { title: 'Overview', active: true },
      { title: 'Active runs' },
      { title: 'Pending' },
      { title: 'Completed' },
      { title: 'Archived' },
    ],
  },
  {
    kind: 'group',
    title: 'Documents',
    icon: FilesIcon,
    defaultOpen: false,
    children: [
      { title: 'All files' },
      { title: 'Shared' },
      { title: 'Drafts' },
    ],
  },
  { kind: 'link', title: 'Usage', icon: WalletIcon, href: '#', badge: '2' },
]

const cleanWorkspace = { name: 'Acme Corp', subtitle: 'Enterprise · AI', initials: 'AC' }

function CleanNavSidebar() {
  return (
    <Sidebar collapsible="none" className="border-r border-border bg-background w-64 h-screen">
      {/* Workspace header */}
      <SidebarHeader className="p-3 pb-2">
        <button className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 hover:bg-muted/60 transition-colors text-left">
          <div className="size-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-primary-foreground">{cleanWorkspace.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{cleanWorkspace.name}</p>
            <p className="text-xs text-muted-foreground truncate">{cleanWorkspace.subtitle}</p>
          </div>
          <ChevronRightIcon className="size-4 text-muted-foreground shrink-0" />
        </button>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="px-3 py-2 flex-1">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {cleanNavItems.map((item) => {
                if (item.kind === 'link') {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.active}>
                        <a href={item.href ?? '#'}>
                          <item.icon className="size-4 shrink-0" />
                          <span className="flex-1">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.badge && (
                        <div className="pointer-events-none absolute right-2 top-2.5 flex size-5 min-w-5 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-semibold select-none">
                          {item.badge}
                        </div>
                      )}
                    </SidebarMenuItem>
                  )
                }
                return (
                  <Collapsible key={item.title} defaultOpen={item.defaultOpen} asChild>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="size-4 shrink-0" />
                          <span className="flex-1">{item.title}</span>
                          <ChevronDownIcon className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton asChild isActive={child.active}>
                                <a href="#">{child.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 pt-0 gap-0">
        <SidebarSeparator className="mb-2" />

        <button className="flex w-full items-center gap-3 rounded-xl px-3 h-10 hover:bg-muted/60 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground">
          <LifeBuoyIcon className="size-4 shrink-0" />
          Help center
        </button>

        <SidebarSeparator className="my-2" />

        <button className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-muted/60 transition-colors text-left">
          <div className="relative shrink-0">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">JL</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-background bg-emerald-500 flex items-center justify-center">
              <span className="text-[7px] font-bold text-white leading-none">S</span>
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">Joan Louji</p>
            <p className="text-[10px] text-muted-foreground truncate">joan@acme.com</p>
          </div>
          <ChevronRightIcon className="size-3.5 text-muted-foreground shrink-0" />
        </button>

        <div className="px-2.5 pt-2 pb-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-muted-foreground">Complete your profile</span>
            <span className="text-[11px] font-semibold text-foreground">70%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[70%] rounded-full bg-emerald-500" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export const CleanNav: Story = {
  name: 'Clean Nav — workspace switcher + collapsible groups',
  render: () => (
    <SidebarProvider>
      <CleanNavSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 px-4">
          <div className="h-4 w-px bg-border/60" />
          <span className="text-sm font-medium text-foreground">Dashboard</span>
          <div className="ml-auto">
            <Badge variant="ai" className="gap-1 text-xs">
              <SparklesIcon className="size-3" />
              AI Ready
            </Badge>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video rounded-xl bg-muted/40 border border-border/40" />
            ))}
          </div>
          <div className="flex-1 rounded-xl bg-muted/40 border border-border/40 min-h-[200px]" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
}
