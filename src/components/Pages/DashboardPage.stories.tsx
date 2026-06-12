import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  SearchIcon, BellIcon, PlusIcon, MoreHorizontalIcon,
  LayoutDashboardIcon, UsersIcon, SettingsIcon, LogOutIcon,
  BarChart3Icon, FileTextIcon, ChevronDownIcon,
  CircleIcon, ZapIcon, ClockIcon, HelpCircleIcon,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import { Separator } from '@/components/Separator'
import { cn } from '@/lib/utils'

// ── Data ───────────────────────────────────────────────────────────────────────

const columns = [
  {
    id: 'todo',
    label: 'TO DO',
    count: 4,
    cards: [
      { id: 'NXS-42', title: 'Update onboarding flow for new users', labels: ['design'], assignee: 'AJ', priority: 'medium' },
      { id: 'NXS-41', title: 'Write migration guide for v3 → v4', labels: ['docs'], assignee: 'BS', priority: 'low' },
      { id: 'NXS-40', title: 'Add keyboard shortcuts to command palette', labels: ['feature'], assignee: null, priority: 'high' },
      { id: 'NXS-39', title: 'Audit dependency versions', labels: [], assignee: 'CW', priority: 'low' },
    ],
  },
  {
    id: 'in-progress',
    label: 'IN PROGRESS',
    count: 3,
    cards: [
      { id: 'NXS-38', title: 'Design system tokens — dark mode pass', labels: ['design', 'tokens'], assignee: 'DL', priority: 'high' },
      { id: 'NXS-37', title: 'Implement real-time notifications', labels: ['feature'], assignee: 'AJ', priority: 'high' },
      { id: 'NXS-36', title: 'Refactor auth middleware', labels: ['backend'], assignee: 'BS', priority: 'medium' },
    ],
  },
  {
    id: 'review',
    label: 'IN REVIEW',
    count: 2,
    cards: [
      { id: 'NXS-35', title: 'Add CSV export to DataTable component', labels: ['feature'], assignee: 'EG', priority: 'medium' },
      { id: 'NXS-34', title: 'Fix tooltip z-index in modals', labels: ['bug'], assignee: 'CW', priority: 'high' },
    ],
  },
  {
    id: 'done',
    label: 'DONE',
    count: 5,
    cards: [
      { id: 'NXS-33', title: 'Migrate to Tailwind v4', labels: ['infra'], assignee: 'DL', priority: 'high' },
      { id: 'NXS-32', title: 'Release v0.7 to npm', labels: ['release'], assignee: 'AJ', priority: 'high' },
      { id: 'NXS-31', title: 'Add Storybook page stories', labels: ['docs'], assignee: 'BS', priority: 'medium' },
      { id: 'NXS-30', title: 'Setup CI/CD pipeline', labels: ['infra'], assignee: 'EG', priority: 'medium' },
      { id: 'NXS-29', title: 'Write unit tests for Field component', labels: ['test'], assignee: 'CW', priority: 'low' },
    ],
  },
]

const labelColors: Record<string, string> = {
  design:  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  feature: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  bug:     'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  docs:    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  backend: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  infra:   'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  tokens:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  test:    'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  release: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
}

const priorityIcon = {
  high:   <ZapIcon className="size-3 text-red-500" />,
  medium: <ClockIcon className="size-3 text-yellow-500" />,
  low:    <CircleIcon className="size-3 text-slate-400" />,
}

const avatarColors: Record<string, string> = {
  AJ: 'bg-blue-500',
  BS: 'bg-green-500',
  CW: 'bg-purple-500',
  DL: 'bg-orange-500',
  EG: 'bg-pink-500',
}

const navItems = [
  { icon: LayoutDashboardIcon, label: 'Board', active: true },
  { icon: BarChart3Icon, label: 'Reports' },
  { icon: UsersIcon, label: 'People' },
  { icon: FileTextIcon, label: 'Pages' },
  { icon: SettingsIcon, label: 'Settings' },
]

// ── Dashboard ──────────────────────────────────────────────────────────────────

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'shrink-0 border-r bg-card flex flex-col transition-all duration-200',
        sidebarOpen ? 'w-56' : 'w-14'
      )}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3.5 py-3 border-b">
          <div className="h-7 w-7 rounded-md bg-[#0052CC] flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden>
              <defs>
                <linearGradient id="dash-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
                <linearGradient id="dash-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
              </defs>
              <path fill="url(#dash-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
              <path fill="url(#dash-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
            </svg>
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Design System</p>
              <p className="text-xs text-muted-foreground truncate">Software project</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                active
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-[#0052CC] font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="size-4 shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <HelpCircleIcon className="size-4 shrink-0" />
            {sidebarOpen && <span>Help</span>}
          </button>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <LogOutIcon className="size-4 shrink-0" />
            {sidebarOpen && <span>Sign out</span>}
          </button>
          <div className={cn('flex items-center gap-2 px-2.5 py-2', sidebarOpen && 'border-t border-border mt-1 pt-3')}>
            <Avatar className="size-6 shrink-0">
              <AvatarFallback className="text-xs bg-[#0052CC] text-white">JL</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate">Joan Louji</p>
                <p className="text-xs text-muted-foreground truncate">joan@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top nav */}
        <header className="border-b bg-card px-4 py-2.5 flex items-center gap-3 shrink-0">
          <button onClick={() => setSidebarOpen(v => !v)} className="text-muted-foreground hover:text-foreground transition-colors">
            <LayoutDashboardIcon className="size-4" />
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Projects</span>
            <span>/</span>
            <span className="text-foreground font-medium">Design System</span>
            <ChevronDownIcon className="size-3.5" />
          </div>
          <div className="flex-1 max-w-xs ml-auto mr-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input className="pl-8 h-7 text-sm" placeholder="Search board…" />
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" className="relative">
            <BellIcon className="size-4" />
            <span className="absolute top-1 right-1 size-1.5 rounded-full bg-red-500" />
          </Button>
          <Avatar className="size-7 cursor-pointer">
            <AvatarFallback className="text-xs bg-[#0052CC] text-white">JL</AvatarFallback>
          </Avatar>
        </header>

        {/* Board header */}
        <div className="border-b bg-background px-6 py-3 flex items-center gap-3 shrink-0">
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">Board</h1>
            <p className="text-xs text-muted-foreground">Sprint 12 · Jun 1 – Jun 14</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {['AJ', 'BS', 'CW', 'DL', 'EG'].map(initials => (
                <Avatar key={initials} className="size-6 ring-2 ring-background">
                  <AvatarFallback className={cn('text-[10px] text-white', avatarColors[initials])}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Separator orientation="vertical" className="h-5" />
            <Button size="sm" className="gap-1.5 bg-[#0052CC] hover:bg-[#0065FF] text-white h-7">
              <PlusIcon className="size-3.5" /> Create issue
            </Button>
          </div>
        </div>

        {/* Board columns */}
        <div className="flex-1 overflow-x-auto p-4">
          <div className="flex gap-3 h-full min-w-max">
            {columns.map(col => (
              <div key={col.id} className="w-64 flex-shrink-0 flex flex-col">
                {/* Column header */}
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground tracking-wide">{col.label}</span>
                    <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 leading-none">{col.count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-xs">
                      <PlusIcon className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-xs">
                      <MoreHorizontalIcon className="size-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                  {col.cards.map(card => (
                    <div
                      key={card.id}
                      className="bg-card border border-border rounded-md p-3 flex flex-col gap-2 cursor-pointer hover:border-[#0052CC]/40 hover:shadow-sm transition-all group"
                    >
                      {/* Labels */}
                      {card.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {card.labels.map(l => (
                            <span key={l} className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded leading-none', labelColors[l] ?? 'bg-muted text-muted-foreground')}>
                              {l}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <p className="text-xs font-medium text-foreground leading-snug line-clamp-2">
                        {card.title}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {priorityIcon[card.priority as keyof typeof priorityIcon]}
                          <span className="text-[10px] text-muted-foreground font-mono">{card.id}</span>
                        </div>
                        {card.assignee ? (
                          <Avatar className="size-5">
                            <AvatarFallback className={cn('text-[9px] text-white', avatarColors[card.assignee])}>
                              {card.assignee}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="size-5 rounded-full border border-dashed border-border" />
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add card button */}
                  <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors">
                    <PlusIcon className="size-3.5" /> Add issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Story ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/Dashboard',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta<typeof DashboardPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
