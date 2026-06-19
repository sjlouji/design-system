import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  ActivityIcon,
  ArrowUpIcon,
  BellIcon,
  BotIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CreditCardIcon,
  FilesIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageSquareIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
  ZapIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
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
import { Input } from '@/components/Input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from '@/components/Sidebar'
import { cn } from '@/lib/utils'

// ── Data ──────────────────────────────────────────────────────────────────────

const workspace = { name: 'Acme Corp', subtitle: 'Enterprise · AI', initials: 'AC' }

type NavItem =
  | { kind: 'link'; title: string; icon: React.ElementType; href: string; badge?: string; active?: boolean }
  | { kind: 'group'; title: string; icon: React.ElementType; defaultOpen?: boolean; children: { title: string; href: string; active?: boolean }[] }

const navItems: NavItem[] = [
  { kind: 'link', title: 'Activity', icon: ActivityIcon, href: '#', badge: '4' },
  { kind: 'link', title: 'Dashboard', icon: LayoutDashboardIcon, href: '#' },
  { kind: 'link', title: 'Chat feed', icon: MessageSquareIcon, href: '#' },
  {
    kind: 'group',
    title: 'Projects',
    icon: SparklesIcon,
    defaultOpen: true,
    children: [
      { title: 'Overview', href: '#', active: true },
      { title: 'Active runs', href: '#' },
      { title: 'Pending', href: '#' },
      { title: 'Completed', href: '#' },
      { title: 'Archived', href: '#' },
    ],
  },
  {
    kind: 'group',
    title: 'Documents',
    icon: FilesIcon,
    defaultOpen: false,
    children: [
      { title: 'All files', href: '#' },
      { title: 'Shared', href: '#' },
      { title: 'Drafts', href: '#' },
    ],
  },
  { kind: 'link', title: 'Usage', icon: WalletIcon, href: '#', badge: '2' },
]

const stats = [
  { label: 'Total Requests', value: '2.4M', delta: '+12.5%', up: true, icon: ZapIcon },
  { label: 'Active Users', value: '18,420', delta: '+4.3%', up: true, icon: UsersIcon },
  { label: 'Avg Response', value: '142ms', delta: '-8.1%', up: true, icon: ActivityIcon },
  { label: 'Monthly Cost', value: '$1,284', delta: '+2.7%', up: false, icon: CreditCardIcon },
]

const recentActivity = [
  { user: 'Alex M.', action: 'deployed a new model', time: '2m ago', initials: 'AM', color: 'bg-violet-100 text-violet-700' },
  { user: 'Sarah K.', action: 'invited 3 team members', time: '14m ago', initials: 'SK', color: 'bg-blue-100 text-blue-700' },
  { user: 'James T.', action: 'updated API gateway config', time: '1h ago', initials: 'JT', color: 'bg-emerald-100 text-emerald-700' },
  { user: 'Mia L.', action: 'ran 48 completions', time: '2h ago', initials: 'ML', color: 'bg-orange-100 text-orange-700' },
  { user: 'Chris R.', action: 'created Design System project', time: '3h ago', initials: 'CR', color: 'bg-pink-100 text-pink-700' },
]

const modelUsage = [
  { name: 'claude-sonnet-4', requests: 1240000, pct: 52 },
  { name: 'claude-haiku-4', requests: 860000, pct: 36 },
  { name: 'claude-opus-4', requests: 300000, pct: 12 },
]

const projects = [
  { name: 'Design System', emoji: '🎨' },
  { name: 'Marketing Site', emoji: '🌐' },
  { name: 'API Gateway', emoji: '⚡' },
  { name: 'Mobile App', emoji: '📱' },
  { name: 'Data Pipeline', emoji: '🔄' },
]

// ── Sidebar ───────────────────────────────────────────────────────────────────

function AppSidebar() {
  return (
    <Sidebar collapsible="none" className="border-r border-border bg-background w-64">
      {/* Workspace header */}
      <SidebarHeader className="p-3 pb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-muted/60 transition-colors text-left">
              <div className="size-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-primary-foreground">{workspace.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{workspace.name}</p>
                <p className="text-xs text-muted-foreground truncate">{workspace.subtitle}</p>
              </div>
              <ChevronRightIcon className="size-4 text-muted-foreground shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" side="bottom" sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Acme Corp</DropdownMenuItem>
            <DropdownMenuItem>Side Project</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <PlusIcon className="size-4" /> New workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="px-3 py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navItems.map((item) => {
                if (item.kind === 'link') {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.active}
                          className="hover:bg-muted/60"
                      >
                        <a href={item.href} className="flex items-center gap-3">
                          <item.icon className="size-4 shrink-0" />
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto flex size-5 min-w-5 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                // Collapsible group
                return (
                  <Collapsible key={item.title} defaultOpen={item.defaultOpen} asChild>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="hover:bg-muted/60 data-[state=open]:bg-transparent">
                          <item.icon className="size-4 shrink-0" />
                          <span className="flex-1">{item.title}</span>
                          <ChevronDownIcon className="size-3.5 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-5 border-l border-border pl-3 py-0.5 gap-0.5 mx-0">
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={child.active}
                                className={cn(
                                  !child.active && 'hover:bg-muted/60',
                                )}
                              >
                                <a href={child.href}>{child.title}</a>
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

        {/* Help center */}
        <button className="flex w-full items-center gap-3 rounded-xl px-3 h-10 hover:bg-muted/60 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground">
          <LifeBuoyIcon className="size-4 shrink-0" />
          Help center
        </button>

        <SidebarSeparator className="my-2" />

        {/* User profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-muted/60 transition-colors text-left">
              <div className="relative shrink-0">
                <Avatar className="size-8 rounded-full">
                  <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=joan" />
                  <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">JL</AvatarFallback>
                </Avatar>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="top" sideOffset={8}>
            <DropdownMenuLabel className="flex items-center gap-2.5 p-2">
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

        {/* Profile completion */}
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

// ── Dashboard content ─────────────────────────────────────────────────────────

function DashboardContent() {
  return (
    <SidebarInset>
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 px-4">
        <div className="h-4 w-px bg-border/60" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-muted-foreground">Acme Corp</span>
          <ChevronRightIcon className="size-3.5 text-muted-foreground/50" />
          <span className="font-medium text-foreground">Dashboard</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:flex">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input placeholder="Search…" className="h-8 w-52 pl-8 text-sm bg-muted/40 border-transparent focus:border-border focus:bg-background" />
          </div>
          <Button variant="ghost" size="icon-sm" className="relative">
            <BellIcon className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          </Button>
          <Badge variant="ai" className="gap-1 text-xs hidden md:flex">
            <SparklesIcon className="size-3" />
            AI Ready
          </Badge>
        </div>
      </header>

      {/* Page content */}
      <main className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Good morning, Joan 👋</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Here's what's happening in your workspace today.</p>
          </div>
          <Button size="sm" className="gap-2">
            <PlusIcon className="size-4" />
            New project
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, delta, up, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <div className="size-7 rounded-md bg-muted/60 flex items-center justify-center">
                  <Icon className="size-3.5 text-muted-foreground" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground tracking-tight">{value}</p>
              <div className={cn('flex items-center gap-1 mt-1.5 text-xs font-medium', up ? 'text-emerald-600' : 'text-destructive')}>
                <ArrowUpIcon className={cn('size-3', !up && 'rotate-180')} />
                {delta} vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Model usage */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Model Usage</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Requests across all models this month</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">View all</Button>
            </div>
            <div className="p-5 space-y-4">
              {modelUsage.map(({ name, requests, pct }) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="size-5 rounded-md bg-primary/10 flex items-center justify-center">
                        <BotIcon className="size-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground font-mono">{name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{(requests / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{pct}% of total</p>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <div className="rounded-lg bg-muted/40 border border-border/60 h-28 flex items-end gap-1 px-3 pb-3">
                {[35, 52, 41, 67, 58, 73, 62, 85, 79, 91, 88, 96].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-primary/60" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-1.5 px-1">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <span key={m} className="text-[10px] text-muted-foreground">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Latest actions in your workspace</p>
              </div>
              <TrendingUpIcon className="size-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map(({ user, action, time, initials, color }) => (
                <div key={user + time} className="flex items-start gap-3 px-5 py-3.5">
                  <div className={cn('size-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 mt-0.5', color)}>
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{user}</span>{' '}
                      <span className="text-muted-foreground">{action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                View all activity
              </Button>
            </div>
          </div>
        </div>

        {/* Projects quick-access */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Projects</h2>
            <Button size="sm" variant="outline" className="text-xs gap-1.5">
              <PlusIcon className="size-3.5" />
              New project
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {projects.map((project) => (
              <button
                key={project.name}
                className="flex flex-col items-center justify-center gap-2 p-5 hover:bg-muted/30 transition-colors text-center group"
              >
                <span className="text-2xl">{project.emoji}</span>
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                  {project.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </SidebarInset>
  )
}

// ── Shell ─────────────────────────────────────────────────────────────────────

function AppShell() {
  return (
    <SidebarProvider style={{ '--sidebar-width': '16rem' } as React.CSSProperties}>
      <AppSidebar />
      <DashboardContent />
    </SidebarProvider>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/App Shell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {}
