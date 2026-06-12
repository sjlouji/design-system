import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  SearchIcon, BellIcon, SettingsIcon, LogOutIcon, UsersIcon,
  HelpCircleIcon, LayoutDashboardIcon, MoreHorizontalIcon,
  FilterIcon, PlusIcon, ShieldIcon, ChevronDownIcon,
  MailIcon, CheckCircleIcon, XCircleIcon, ClockIcon,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/Dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Label } from '@/components/Label'
import { Separator } from '@/components/Separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { cn } from '@/lib/utils'

// ── App shell ─────────────────────────────────────────────────────────────────

function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className={cn('shrink-0 border-r bg-card flex flex-col transition-all duration-200', collapsed ? 'w-14' : 'w-56')}>
        <div className="flex items-center gap-2.5 px-3.5 py-3 border-b cursor-pointer" onClick={() => setCollapsed(v => !v)}>
          <div className="h-8 w-8 rounded-lg bg-purple-500 flex items-center justify-center shrink-0 text-white font-bold text-sm">
            AC
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Acme Corp</p>
              <p className="text-xs text-muted-foreground truncate">42 members</p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {[
            { icon: LayoutDashboardIcon, label: 'Board' },
            { icon: UsersIcon, label: 'Members', active: true },
            { icon: SettingsIcon, label: 'Settings' },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                active ? 'bg-blue-50 dark:bg-blue-950/50 text-[#0052CC] font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent transition-colors">
            <HelpCircleIcon className="size-4 shrink-0" />
            {!collapsed && <span>Help</span>}
          </button>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent transition-colors">
            <LogOutIcon className="size-4 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
          <div className={cn('flex items-center gap-2 px-2.5 py-2', !collapsed && 'border-t border-border mt-1 pt-3')}>
            <Avatar className="size-6 shrink-0">
              <AvatarFallback className="text-xs bg-[#0052CC] text-white">JL</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate">Joan Louji</p>
                <p className="text-xs text-muted-foreground truncate">Owner</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card px-4 py-2.5 flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Acme Corp</span>
            <span>/</span>
            <span className="text-foreground font-medium">Members & Roles</span>
          </div>
          <div className="flex-1 max-w-xs ml-auto mr-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input className="pl-8 h-7 text-sm" placeholder="Search members…" />
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
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────

type Role = 'Owner' | 'Admin' | 'Member' | 'Viewer'
type Status = 'Active' | 'Pending' | 'Deactivated'

interface Member {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  initials: string
  color: string
  joined: string
  lastActive: string
  projects: number
}

const members: Member[] = [
  { id: '1', name: 'Joan Louji',    email: 'joan@acme.io',    role: 'Owner',  status: 'Active',      initials: 'JL', color: 'bg-[#0052CC]',  joined: 'Jan 12, 2025', lastActive: 'Now',         projects: 12 },
  { id: '2', name: 'Alex Johnson',  email: 'alex@acme.io',    role: 'Admin',  status: 'Active',      initials: 'AJ', color: 'bg-violet-500',  joined: 'Feb 3, 2025',  lastActive: '2h ago',      projects: 8  },
  { id: '3', name: 'Sara Chen',     email: 'sara@acme.io',    role: 'Member', status: 'Active',      initials: 'SC', color: 'bg-pink-500',    joined: 'Feb 18, 2025', lastActive: 'Yesterday',   projects: 5  },
  { id: '4', name: 'Ben Smith',     email: 'ben@acme.io',     role: 'Member', status: 'Active',      initials: 'BS', color: 'bg-orange-500',  joined: 'Mar 5, 2025',  lastActive: '3 days ago',  projects: 4  },
  { id: '5', name: 'Emma García',   email: 'emma@acme.io',    role: 'Member', status: 'Active',      initials: 'EG', color: 'bg-teal-500',    joined: 'Mar 22, 2025', lastActive: 'Last week',   projects: 3  },
  { id: '6', name: 'Chris Wang',    email: 'chris@acme.io',   role: 'Viewer', status: 'Active',      initials: 'CW', color: 'bg-amber-500',   joined: 'Apr 1, 2025',  lastActive: '2 weeks ago', projects: 2  },
  { id: '7', name: 'Priya Kumar',   email: 'priya@acme.io',   role: 'Viewer', status: 'Active',      initials: 'PK', color: 'bg-cyan-500',    joined: 'Apr 15, 2025', lastActive: 'Last month',  projects: 1  },
  { id: '8', name: 'Charlie Doe',   email: 'charlie@acme.io', role: 'Member', status: 'Pending',     initials: 'CD', color: 'bg-slate-400',   joined: '—',            lastActive: 'Invited 2d ago', projects: 0 },
  { id: '9', name: 'Diana Müller',  email: 'diana@ext.com',   role: 'Viewer', status: 'Pending',     initials: 'DM', color: 'bg-slate-400',   joined: '—',            lastActive: 'Invited 5d ago', projects: 0 },
  { id: '10', name: 'Frank Lee',    email: 'frank@acme.io',   role: 'Member', status: 'Deactivated', initials: 'FL', color: 'bg-slate-300',   joined: 'Jan 30, 2025', lastActive: 'Deactivated', projects: 3  },
]

// ── Role badge ────────────────────────────────────────────────────────────────

const roleStyles: Record<Role, string> = {
  Owner:  'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  Admin:  'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  Member: 'bg-muted text-foreground',
  Viewer: 'bg-muted text-muted-foreground',
}

const statusConfig: Record<Status, { icon: React.ReactNode; className: string }> = {
  Active:      { icon: <CheckCircleIcon className="size-3" />, className: 'text-green-600 dark:text-green-400' },
  Pending:     { icon: <ClockIcon className="size-3" />,       className: 'text-orange-600 dark:text-orange-400' },
  Deactivated: { icon: <XCircleIcon className="size-3" />,     className: 'text-muted-foreground' },
}

// ── Invite dialog ─────────────────────────────────────────────────────────────

function InviteDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [emails, setEmails] = React.useState([''])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Invite members</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Invitees will receive an email with a link to join <strong>Acme Corp</strong>.
          </p>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Email addresses</Label>
            {emails.map((email, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  type="email"
                  placeholder={`colleague@example.com`}
                  value={email}
                  onChange={e => setEmails(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                  className="h-9 flex-1"
                />
                {emails.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="size-9 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setEmails(prev => prev.filter((_, idx) => idx !== i))}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => setEmails(e => [...e, ''])}>
              <PlusIcon className="size-3" /> Add another
            </Button>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Role</Label>
            <Select defaultValue="member">
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div>
                    <div className="font-medium">Admin</div>
                    <div className="text-xs text-muted-foreground">Can manage members and settings</div>
                  </div>
                </SelectItem>
                <SelectItem value="member">
                  <div>
                    <div className="font-medium">Member</div>
                    <div className="text-xs text-muted-foreground">Can create and edit projects</div>
                  </div>
                </SelectItem>
                <SelectItem value="viewer">
                  <div>
                    <div className="font-medium">Viewer</div>
                    <div className="text-xs text-muted-foreground">Read-only access</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground flex items-start gap-2">
            <MailIcon className="size-3.5 shrink-0 mt-0.5" />
            Invites expire after 7 days. You can resend or revoke them from this page.
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-[#0052CC] hover:bg-[#0065FF] text-white gap-1.5">
            <MailIcon className="size-3.5" /> Send invites
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Members table ─────────────────────────────────────────────────────────────

function MembersTable({ data, showCheckboxes = true }: { data: Member[]; showCheckboxes?: boolean }) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  function toggleAll() {
    if (selected.size === data.length) setSelected(new Set())
    else setSelected(new Set(data.map(m => m.id)))
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-950/30 px-4 py-2 flex items-center gap-3 text-sm border-b">
          <span className="font-medium text-[#0052CC]">{selected.size} selected</span>
          <Separator orientation="vertical" className="h-4" />
          <Select>
            <SelectTrigger className="h-7 w-36 text-xs bg-white dark:bg-background">
              <SelectValue placeholder="Change role…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Set as Admin</SelectItem>
              <SelectItem value="member">Set as Member</SelectItem>
              <SelectItem value="viewer">Set as Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-7 text-xs text-destructive border-destructive/50 hover:bg-destructive/10">
            Remove selected
          </Button>
          <button className="ml-auto text-xs text-muted-foreground hover:text-foreground" onClick={() => setSelected(new Set())}>
            Clear
          </button>
        </div>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/30">
            {showCheckboxes && (
              <th className="w-10 px-4 py-2.5">
                <Checkbox
                  checked={selected.size === data.length && data.length > 0}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            )}
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Member</th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Role</th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">Status</th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden lg:table-cell">Projects</th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden lg:table-cell">Last active</th>
            <th className="w-10 px-4 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {data.map(member => {
            const statusCfg = statusConfig[member.status]
            const isSelected = selected.has(member.id)

            return (
              <tr
                key={member.id}
                className={cn(
                  'border-b last:border-0 transition-colors',
                  isSelected ? 'bg-blue-50/50 dark:bg-blue-950/10' : 'hover:bg-muted/30',
                  member.status === 'Deactivated' && 'opacity-60'
                )}
              >
                {showCheckboxes && (
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleOne(member.id)}
                      aria-label={`Select ${member.name}`}
                    />
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className={cn('text-xs text-white', member.color)}>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <Select defaultValue={member.role.toLowerCase()}>
                    <SelectTrigger className="h-6 text-xs w-24 border-transparent bg-transparent hover:bg-muted focus:bg-background">
                      <SelectValue>
                        <Badge variant="outline" className={cn('text-xs h-5 px-1.5 cursor-pointer', roleStyles[member.role])}>
                          {member.role}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {(['Admin', 'Member', 'Viewer'] as Role[]).filter(r => r !== 'Owner').map(r => (
                        <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={cn('flex items-center gap-1 text-xs', statusCfg.className)}>
                    {statusCfg.icon}
                    {member.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                  {member.projects > 0 ? `${member.projects} projects` : '—'}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                  {member.lastActive}
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="size-7 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 transition-opacity">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>Send message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      {member.status === 'Pending' && <DropdownMenuItem>Resend invite</DropdownMenuItem>}
                      {member.status === 'Active' && <DropdownMenuItem>Deactivate</DropdownMenuItem>}
                      {member.status === 'Deactivated' && <DropdownMenuItem>Reactivate</DropdownMenuItem>}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        {member.status === 'Pending' ? 'Cancel invite' : 'Remove from workspace'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── Roles overview card ───────────────────────────────────────────────────────

function RolesOverview() {
  const roles: { role: Role; desc: string; permissions: string[]; count: number }[] = [
    {
      role: 'Owner',
      desc: 'Full control over the workspace, billing, and all settings',
      permissions: ['Delete workspace', 'Manage billing', 'Manage all members', 'Access all projects'],
      count: 1,
    },
    {
      role: 'Admin',
      desc: 'Can manage members, settings, and all projects',
      permissions: ['Manage members', 'Manage integrations', 'Create / delete projects', 'View billing'],
      count: 1,
    },
    {
      role: 'Member',
      desc: 'Can create and contribute to projects they are assigned to',
      permissions: ['Create projects', 'Invite guests', 'Comment & collaborate'],
      count: 5,
    },
    {
      role: 'Viewer',
      desc: 'Read-only access to projects they have been given access to',
      permissions: ['View projects', 'View comments', 'Export data'],
      count: 2,
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {roles.map(({ role, desc, permissions, count }) => (
        <Card key={role}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-1.5">
                <ShieldIcon className="size-3.5 text-muted-foreground" />
                {role}
              </CardTitle>
              <Badge variant="outline" className={cn('text-xs', roleStyles[role])}>
                {count} {count === 1 ? 'member' : 'members'}
              </Badge>
            </div>
            <CardDescription className="text-xs">{desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {permissions.map(p => (
                <li key={p} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircleIcon className="size-3 text-green-500 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

function UsersRolesContent() {
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [filterRole, setFilterRole] = React.useState('all')
  const [filterStatus, setFilterStatus] = React.useState('all')
  const [search, setSearch] = React.useState('')

  const filtered = members.filter(m => {
    if (filterRole !== 'all' && m.role.toLowerCase() !== filterRole) return false
    if (filterStatus !== 'all' && m.status.toLowerCase() !== filterStatus) return false
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const stats = [
    { label: 'Total members', value: members.filter(m => m.status !== 'Deactivated').length, desc: `+${members.filter(m => m.status === 'Pending').length} pending` },
    { label: 'Admins', value: members.filter(m => m.role === 'Admin' || m.role === 'Owner').length, desc: 'With management access' },
    { label: 'Deactivated', value: members.filter(m => m.status === 'Deactivated').length, desc: 'Inactive accounts' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold">Members & Roles</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage who has access to Acme Corp and what they can do</p>
        </div>
        <Button
          className="bg-[#0052CC] hover:bg-[#0065FF] text-white gap-1.5 h-9 shrink-0"
          onClick={() => setInviteOpen(true)}
        >
          <PlusIcon className="size-4" /> Invite members
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-4">
              <p className="text-2xl font-bold leading-none">{s.value}</p>
              <p className="text-xs font-medium mt-1">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members" className="gap-1.5 text-xs">
            <UsersIcon className="size-3.5" /> Members
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-1.5 text-xs">
            <ShieldIcon className="size-3.5" /> Roles & Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4 space-y-3">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-48 max-w-xs">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                className="pl-8 h-8 text-sm"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="h-8 w-32 text-xs gap-1.5">
                <FilterIcon className="size-3 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="deactivated">Deactivated</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-xs text-muted-foreground ml-auto">
              {filtered.length} of {members.length}
            </span>
          </div>

          <div className="group">
            <MembersTable data={filtered} />
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UsersIcon className="size-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium">No members found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Role definitions</p>
              <p className="text-xs text-muted-foreground">Each role grants a different level of access. Roles are workspace-wide.</p>
            </div>
            <RolesOverview />
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Custom roles</CardTitle>
                <CardDescription className="text-xs">Create tailored permission sets for your workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Custom roles are available on the Enterprise plan.</p>
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                    <ChevronDownIcon className="size-3" /> Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  )
}

function UsersRolesPage() {
  return (
    <AppShell>
      <UsersRolesContent />
    </AppShell>
  )
}

// ── Stories ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/Workspace/Users & Roles',
  component: UsersRolesPage,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '800px' } },
  },
} satisfies Meta<typeof UsersRolesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InviteOpen: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <AppShell>
        <UsersRolesContent />
        <InviteDialog open={open} onOpenChange={setOpen} />
      </AppShell>
    )
  },
}

export const RolesView: Story = {
  render: () => (
    <AppShell>
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        <div>
          <h1 className="text-base font-semibold">Members & Roles</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage who has access to Acme Corp and what they can do</p>
        </div>
        <Tabs defaultValue="roles">
          <TabsList>
            <TabsTrigger value="members" className="gap-1.5 text-xs"><UsersIcon className="size-3.5" />Members</TabsTrigger>
            <TabsTrigger value="roles" className="gap-1.5 text-xs"><ShieldIcon className="size-3.5" />Roles & Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="roles" className="mt-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Role definitions</p>
                <p className="text-xs text-muted-foreground">Each role grants a different level of access.</p>
              </div>
              <RolesOverview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  ),
}
