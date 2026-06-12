import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  SearchIcon, BellIcon, SettingsIcon, LogOutIcon, UsersIcon,
  HelpCircleIcon, LayoutDashboardIcon, TrashIcon, CreditCardIcon,
  BuildingIcon, GlobeIcon, ZapIcon, AlertTriangleIcon, CheckIcon,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Card'
import { Switch } from '@/components/Switch'
import { Separator } from '@/components/Separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { cn } from '@/lib/utils'

// ── App shell ─────────────────────────────────────────────────────────────────

const sidebarItems = [
  { icon: LayoutDashboardIcon, label: 'Board' },
  { icon: UsersIcon, label: 'Members' },
  { icon: SettingsIcon, label: 'Settings', active: true },
]

function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className={cn('shrink-0 border-r bg-card flex flex-col transition-all duration-200', collapsed ? 'w-14' : 'w-56')}>
        <div className="flex items-center gap-2.5 px-3.5 py-3 border-b">
          <div
            className="h-8 w-8 rounded-lg bg-purple-500 flex items-center justify-center shrink-0 text-white font-bold text-sm cursor-pointer"
            onClick={() => setCollapsed(v => !v)}
          >
            AC
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Acme Corp</p>
              <p className="text-xs text-muted-foreground truncate">nexus.app/acme-corp</p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {sidebarItems.map(({ icon: Icon, label, active }) => (
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
            <span className="text-foreground font-medium">Settings</span>
          </div>
          <div className="flex-1 max-w-xs ml-auto mr-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input className="pl-8 h-7 text-sm" placeholder="Search settings…" />
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

// ── Tab: General ──────────────────────────────────────────────────────────────

function GeneralTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-1.5">
            <BuildingIcon className="size-4" />
            Workspace Identity
          </CardTitle>
          <CardDescription className="text-xs">Manage your workspace name, logo, and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
              AC
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Workspace logo</p>
              <p className="text-xs text-muted-foreground">PNG, JPG or SVG. Max 1 MB. 256×256px recommended.</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">Upload logo</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">Remove</Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-1.5">
            <Label htmlFor="ws-name" className="text-xs">Workspace name</Label>
            <Input id="ws-name" defaultValue="Acme Corp" className="h-8 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ws-slug" className="text-xs">URL slug</Label>
            <div className="flex items-center gap-0">
              <span className="inline-flex h-8 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-xs text-muted-foreground shrink-0">
                nexus.app/
              </span>
              <Input id="ws-slug" defaultValue="acme-corp" className="h-8 text-sm rounded-l-none" />
            </div>
            <p className="text-xs text-muted-foreground">Changing this will break existing links.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ws-desc" className="text-xs">Description</Label>
            <textarea
              id="ws-desc"
              rows={2}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              defaultValue="Building the future of project management."
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ws-website" className="text-xs flex items-center gap-1"><GlobeIcon className="size-3" />Website</Label>
            <Input id="ws-website" type="url" defaultValue="https://acmecorp.io" className="h-8 text-sm" />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" size="sm" className="h-8">Cancel</Button>
          <Button size="sm" className="h-8 bg-[#0052CC] hover:bg-[#0065FF] text-white">Save changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Workspace Preferences</CardTitle>
          <CardDescription className="text-xs">Controls that apply across your whole workspace</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {[
            { label: 'Allow member invitations', desc: 'Let members invite others to this workspace', defaultChecked: true },
            { label: 'Public profile', desc: 'Make workspace profile visible to non-members', defaultChecked: false },
            { label: 'Guest access', desc: 'Allow external guests with limited access', defaultChecked: false },
          ].map(item => {
            const [checked, setChecked] = React.useState(item.defaultChecked)
            return (
              <div key={item.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={checked} onCheckedChange={setChecked} />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tab: Members ──────────────────────────────────────────────────────────────

function MembersTab() {
  const members = [
    { name: 'Joan Louji', email: 'joan@acme.io', role: 'Owner', initials: 'JL', color: 'bg-[#0052CC]', joined: 'Jan 2025' },
    { name: 'Alex Johnson', email: 'alex@acme.io', role: 'Admin', initials: 'AJ', color: 'bg-violet-500', joined: 'Feb 2025' },
    { name: 'Sara Chen', email: 'sara@acme.io', role: 'Member', initials: 'SC', color: 'bg-pink-500', joined: 'Mar 2025' },
    { name: 'Ben Smith', email: 'ben@acme.io', role: 'Member', initials: 'BS', color: 'bg-orange-500', joined: 'Apr 2025' },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Members</CardTitle>
              <CardDescription className="text-xs">{members.length} members in this workspace</CardDescription>
            </div>
            <Button size="sm" className="h-8 bg-[#0052CC] hover:bg-[#0065FF] text-white text-xs">Invite members</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {members.map(m => (
              <div key={m.email} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className={cn('text-xs text-white', m.color)}>{m.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:block">Joined {m.joined}</span>
                  <Select defaultValue={m.role.toLowerCase()}>
                    <SelectTrigger className="h-7 text-xs w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  {m.role !== 'Owner' && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 px-2">
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Pending Invites</CardTitle>
          <CardDescription className="text-xs">2 invites waiting to be accepted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {[
              { email: 'charlie@acme.io', role: 'Member', sent: '2 days ago' },
              { email: 'diana@partner.com', role: 'Viewer', sent: '5 days ago' },
            ].map(inv => (
              <div key={inv.email} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm">{inv.email}</p>
                  <p className="text-xs text-muted-foreground">Invited as {inv.role} · {inv.sent}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs h-5 px-1.5 text-orange-600 border-orange-500/40 bg-orange-50 dark:bg-orange-950/30">
                    Pending
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">Resend</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive px-2">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tab: Billing ──────────────────────────────────────────────────────────────

function BillingTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm flex items-center gap-1.5"><CreditCardIcon className="size-4" />Current Plan</CardTitle>
              <CardDescription className="text-xs">Acme Corp is on the Enterprise plan</CardDescription>
            </div>
            <Badge className="bg-purple-600 hover:bg-purple-600 text-xs">Enterprise</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 space-y-2.5">
            {[
              ['Plan', 'Enterprise ($299/mo)'],
              ['Seats', '42 / Unlimited'],
              ['Next billing', 'July 15, 2026'],
              ['Payment', 'Visa •••• 8888'],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm">
                <span className="text-xs text-muted-foreground">{l}</span>
                <span className="text-xs font-medium">{v}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium mb-2">Included in Enterprise</p>
            <ul className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
              {['Unlimited members', 'Unlimited projects', '2 TB storage', 'SSO / SAML', 'Audit log', 'Dedicated CSM'].map(f => (
                <li key={f} className="flex items-center gap-1.5">
                  <CheckIcon className="size-3 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" size="sm" className="h-8">Manage subscription</Button>
          <Button variant="outline" size="sm" className="h-8">Update payment</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {[
              { date: 'Jun 15, 2026', amount: '$299.00', status: 'Paid' },
              { date: 'May 15, 2026', amount: '$299.00', status: 'Paid' },
              { date: 'Apr 15, 2026', amount: '$299.00', status: 'Paid' },
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm">{inv.date}</p>
                  <p className="text-xs text-muted-foreground">Enterprise plan — monthly</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{inv.amount}</span>
                  <Badge variant="outline" className="text-xs h-5 px-1.5 text-green-600 border-green-500/40 bg-green-50 dark:bg-green-950/30">
                    {inv.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tab: Integrations ─────────────────────────────────────────────────────────

function IntegrationsTab() {
  const integrations = [
    { name: 'GitHub', desc: 'Link pull requests and commits to issues', icon: '🐙', connected: true, category: 'Development' },
    { name: 'Slack', desc: 'Send notifications to Slack channels', icon: '💬', connected: true, category: 'Communication' },
    { name: 'Figma', desc: 'Embed designs and prototypes', icon: '🎨', connected: false, category: 'Design' },
    { name: 'Google Drive', desc: 'Attach Drive files to issues', icon: '📁', connected: false, category: 'Storage' },
    { name: 'Datadog', desc: 'Monitor deployments and errors', icon: '📊', connected: true, category: 'Monitoring' },
    { name: 'Zapier', desc: 'Automate workflows with 5000+ apps', icon: '⚡', connected: false, category: 'Automation' },
  ]

  const categories = [...new Set(integrations.map(i => i.category))]

  return (
    <div className="space-y-4">
      {categories.map(cat => (
        <Card key={cat}>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-1.5"><ZapIcon className="size-4" />{cat}</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {integrations.filter(i => i.category === cat).map(integration => (
              <div key={integration.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {integration.connected && (
                    <Badge variant="outline" className="text-xs h-5 px-1.5 text-green-600 border-green-500/40 bg-green-50 dark:bg-green-950/30">
                      Connected
                    </Badge>
                  )}
                  <Button
                    variant={integration.connected ? 'outline' : 'outline'}
                    size="sm"
                    className={cn('h-7 text-xs', integration.connected && 'text-destructive border-destructive/50 hover:bg-destructive/10')}
                  >
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ── Tab: Danger Zone ──────────────────────────────────────────────────────────

function DangerTab() {
  return (
    <div className="space-y-4">
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-sm text-destructive flex items-center gap-1.5">
            <AlertTriangleIcon className="size-4" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-xs">Irreversible actions for this workspace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1 divide-y">
          {[
            {
              title: 'Transfer ownership',
              desc: 'Transfer this workspace to another admin. You will lose owner privileges.',
              action: 'Transfer',
              variant: 'outline' as const,
              destructive: true,
            },
            {
              title: 'Archive workspace',
              desc: 'Make the workspace read-only. Members can still view content but cannot create or edit.',
              action: 'Archive',
              variant: 'outline' as const,
              destructive: true,
            },
            {
              title: 'Delete workspace',
              desc: 'Permanently delete this workspace and all its data. This cannot be undone.',
              action: 'Delete workspace',
              variant: 'destructive' as const,
              destructive: false,
            },
          ].map(item => (
            <div key={item.title} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Button
                variant={item.variant}
                size="sm"
                className={cn(
                  'shrink-0 h-8 gap-1.5',
                  item.destructive && 'text-destructive border-destructive/50 hover:bg-destructive/10'
                )}
              >
                {item.action === 'Delete workspace' && <TrashIcon className="size-3.5" />}
                {item.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

function WorkspaceSettingsContent() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
      <div>
        <h1 className="text-base font-semibold text-foreground">Workspace Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Manage Acme Corp workspace configuration</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="general" className="gap-1.5 text-xs"><BuildingIcon className="size-3.5" />General</TabsTrigger>
          <TabsTrigger value="members" className="gap-1.5 text-xs"><UsersIcon className="size-3.5" />Members</TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5 text-xs"><CreditCardIcon className="size-3.5" />Billing</TabsTrigger>
          <TabsTrigger value="integrations" className="gap-1.5 text-xs"><ZapIcon className="size-3.5" />Integrations</TabsTrigger>
          <TabsTrigger value="danger" className="gap-1.5 text-xs text-destructive data-[state=active]:text-destructive">
            <AlertTriangleIcon className="size-3.5" />Danger
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4"><GeneralTab /></TabsContent>
        <TabsContent value="members" className="mt-4"><MembersTab /></TabsContent>
        <TabsContent value="billing" className="mt-4"><BillingTab /></TabsContent>
        <TabsContent value="integrations" className="mt-4"><IntegrationsTab /></TabsContent>
        <TabsContent value="danger" className="mt-4"><DangerTab /></TabsContent>
      </Tabs>
    </div>
  )
}

function WorkspaceSettingsPage() {
  return (
    <AppShell>
      <WorkspaceSettingsContent />
    </AppShell>
  )
}

const meta = {
  title: 'Pages/Workspace/Settings',
  component: WorkspaceSettingsPage,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '800px' } },
  },
} satisfies Meta<typeof WorkspaceSettingsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MembersTab_: Story = {
  name: 'Members',
  render: () => (
    <AppShell>
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
        <div>
          <h1 className="text-base font-semibold">Workspace Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage Acme Corp workspace configuration</p>
        </div>
        <Tabs defaultValue="members">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="general" className="gap-1.5 text-xs"><BuildingIcon className="size-3.5" />General</TabsTrigger>
            <TabsTrigger value="members" className="gap-1.5 text-xs"><UsersIcon className="size-3.5" />Members</TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5 text-xs"><CreditCardIcon className="size-3.5" />Billing</TabsTrigger>
            <TabsTrigger value="integrations" className="gap-1.5 text-xs"><ZapIcon className="size-3.5" />Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="mt-4"><MembersTab /></TabsContent>
        </Tabs>
      </div>
    </AppShell>
  ),
}

export const IntegrationsTab_: Story = {
  name: 'Integrations',
  render: () => (
    <AppShell>
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
        <div>
          <h1 className="text-base font-semibold">Workspace Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage Acme Corp workspace configuration</p>
        </div>
        <Tabs defaultValue="integrations">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="general" className="gap-1.5 text-xs"><BuildingIcon className="size-3.5" />General</TabsTrigger>
            <TabsTrigger value="members" className="gap-1.5 text-xs"><UsersIcon className="size-3.5" />Members</TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5 text-xs"><CreditCardIcon className="size-3.5" />Billing</TabsTrigger>
            <TabsTrigger value="integrations" className="gap-1.5 text-xs"><ZapIcon className="size-3.5" />Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="integrations" className="mt-4"><IntegrationsTab /></TabsContent>
        </Tabs>
      </div>
    </AppShell>
  ),
}
