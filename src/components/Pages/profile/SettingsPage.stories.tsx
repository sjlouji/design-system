import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  UserIcon, BellIcon, ShieldIcon, CreditCardIcon, TrashIcon,
  SearchIcon, LayoutDashboardIcon, UsersIcon, SettingsIcon, LogOutIcon,
  BarChart3Icon, FileTextIcon, HelpCircleIcon, ChevronDownIcon,
  GlobeIcon, PaletteIcon, LinkIcon, SmartphoneIcon, KeyIcon, MonitorIcon,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Card'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import { Switch } from '@/components/Switch'
import { Separator } from '@/components/Separator'
import { Badge } from '@/components/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboardIcon, label: 'Board' },
  { icon: BarChart3Icon, label: 'Reports' },
  { icon: UsersIcon, label: 'People' },
  { icon: FileTextIcon, label: 'Pages' },
  { icon: SettingsIcon, label: 'Settings', active: true },
]

function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className={cn(
        'shrink-0 border-r bg-card flex flex-col transition-all duration-200',
        sidebarOpen ? 'w-56' : 'w-14'
      )}>
        <div className="flex items-center gap-2.5 px-3.5 py-3 border-b">
          <div className="h-7 w-7 rounded-md bg-[#0052CC] flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden>
              <defs>
                <linearGradient id="ps-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
                <linearGradient id="ps-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
              </defs>
              <path fill="url(#ps-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
              <path fill="url(#ps-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
            </svg>
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Design System</p>
              <p className="text-xs text-muted-foreground truncate">Software project</p>
            </div>
          )}
        </div>

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

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card px-4 py-2.5 flex items-center gap-3 shrink-0">
          <button onClick={() => setSidebarOpen(v => !v)} className="text-muted-foreground hover:text-foreground transition-colors">
            <LayoutDashboardIcon className="size-4" />
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Account</span>
            <span>/</span>
            <span className="text-foreground font-medium">Profile Settings</span>
            <ChevronDownIcon className="size-3.5" />
          </div>
          <div className="flex-1 max-w-xs ml-auto mr-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input className="pl-8 h-7 text-sm" placeholder="Search…" />
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

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Tab: Profile ───────────────────────────────────────────────────────────────

function ProfileTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Profile Information</CardTitle>
          <CardDescription className="text-xs">Your public-facing name, photo, and bio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-xl bg-[#0052CC] text-white">JL</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">Profile photo</p>
              <p className="text-xs text-muted-foreground">JPG, PNG or WebP. Max 2 MB.</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">Upload photo</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">Remove</Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ps-first" className="text-xs">First name</Label>
              <Input id="ps-first" defaultValue="Joan" className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ps-last" className="text-xs">Last name</Label>
              <Input id="ps-last" defaultValue="Louji" className="h-8 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ps-display" className="text-xs">Display name</Label>
            <Input id="ps-display" defaultValue="joanlouji" className="h-8 text-sm" />
            <p className="text-xs text-muted-foreground">This is your public username shown in comments and mentions.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ps-email" className="text-xs">Email</Label>
            <div className="flex gap-2">
              <Input id="ps-email" type="email" defaultValue="joan@example.com" className="h-8 text-sm flex-1" />
              <Badge variant="outline" className="h-8 text-xs px-2.5 shrink-0 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-green-500" />
                Verified
              </Badge>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ps-bio" className="text-xs">Bio</Label>
            <textarea
              id="ps-bio"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              placeholder="A short bio about yourself…"
              defaultValue="Frontend engineer. Building design systems and loving it."
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ps-job" className="text-xs">Job title</Label>
            <Input id="ps-job" defaultValue="Senior Frontend Engineer" className="h-8 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ps-dept" className="text-xs">Department</Label>
            <Input id="ps-dept" defaultValue="Engineering" className="h-8 text-sm" />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" size="sm" className="h-8">Cancel</Button>
          <Button size="sm" className="h-8 bg-[#0052CC] hover:bg-[#0065FF] text-white">Save changes</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-sm text-destructive">Danger Zone</CardTitle>
          <CardDescription className="text-xs">These actions are permanent and cannot be undone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <p className="text-sm font-medium">Deactivate account</p>
              <p className="text-xs text-muted-foreground">Temporarily disable your account. You can reactivate anytime.</p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 h-8 text-destructive border-destructive/50 hover:bg-destructive/10">Deactivate</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all your data</p>
            </div>
            <Button variant="destructive" size="sm" className="shrink-0 gap-1.5 h-8">
              <TrashIcon className="size-3.5" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tab: Preferences ──────────────────────────────────────────────────────────

function PreferencesTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Language & Region</CardTitle>
          <CardDescription className="text-xs">Set your preferred language, timezone, and date format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs flex items-center gap-1.5"><GlobeIcon className="size-3" />Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="en-gb">English (UK)</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="gmt">GMT+1</SelectItem>
                  <SelectItem value="ist">India (IST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Date format</Label>
              <Select defaultValue="mdy">
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Time format</Label>
              <Select defaultValue="12h">
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (13:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm" className="h-8 bg-[#0052CC] hover:bg-[#0065FF] text-white">Save preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-1.5"><PaletteIcon className="size-4" />Appearance</CardTitle>
          <CardDescription className="text-xs">Customise how Nexus looks for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Theme</Label>
            <div className="flex gap-3">
              {[
                { id: 'light', label: 'Light', icon: '☀️' },
                { id: 'dark', label: 'Dark', icon: '🌙' },
                { id: 'system', label: 'System', icon: '💻' },
              ].map(t => (
                <button
                  key={t.id}
                  className={cn(
                    'flex-1 rounded-lg border-2 px-3 py-2.5 text-xs font-medium flex flex-col items-center gap-1 transition-colors',
                    t.id === 'system'
                      ? 'border-[#0052CC] bg-blue-50 dark:bg-blue-950/50 text-[#0052CC]'
                      : 'border-border hover:border-[#0052CC]/50'
                  )}
                >
                  <span className="text-lg">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tab: Notifications ────────────────────────────────────────────────────────

function NotificationsTab() {
  const [state, setState] = React.useState({
    emailAssigned: true,
    emailMentioned: true,
    emailWeekly: false,
    emailProduct: true,
    pushAssigned: true,
    pushMentioned: false,
    pushStatus: true,
    slackAssigned: false,
    slackMentioned: false,
  })

  const toggle = (key: keyof typeof state) =>
    setState(s => ({ ...s, [key]: !s[key] }))

  return (
    <div className="space-y-4">
      {[
        {
          title: 'Email notifications',
          desc: 'Updates delivered to joan@example.com',
          icon: <BellIcon className="size-4 text-muted-foreground" />,
          items: [
            { key: 'emailAssigned', label: 'Assigned to me', desc: 'When a task or issue is assigned to you' },
            { key: 'emailMentioned', label: 'Mentioned', desc: 'When someone @mentions you in a comment' },
            { key: 'emailWeekly', label: 'Weekly digest', desc: 'Summary of activity across your projects' },
            { key: 'emailProduct', label: 'Product updates', desc: 'New features, releases, and announcements' },
          ],
        },
        {
          title: 'Push notifications',
          desc: 'Browser and desktop notifications',
          icon: <MonitorIcon className="size-4 text-muted-foreground" />,
          items: [
            { key: 'pushAssigned', label: 'Assigned to me', desc: 'Instant alert when work is assigned' },
            { key: 'pushMentioned', label: 'Mentioned', desc: 'Instant alert when you are mentioned' },
            { key: 'pushStatus', label: 'Status changes', desc: 'When work you follow changes status' },
          ],
        },
      ].map(section => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              {section.icon}
              {section.title}
            </CardTitle>
            <CardDescription className="text-xs">{section.desc}</CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            {section.items.map(item => (
              <div key={item.key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={state[item.key as keyof typeof state]}
                  onCheckedChange={() => toggle(item.key as keyof typeof state)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ── Tab: Security ─────────────────────────────────────────────────────────────

function SecurityTab() {
  const [twoFactor, setTwoFactor] = React.useState(false)

  const sessions = [
    { device: 'MacBook Pro', location: 'San Francisco, CA', last: 'Now', current: true, icon: <MonitorIcon className="size-4" /> },
    { device: 'iPhone 15', location: 'San Francisco, CA', last: '2h ago', current: false, icon: <SmartphoneIcon className="size-4" /> },
    { device: 'Chrome on Windows', location: 'New York, NY', last: '3 days ago', current: false, icon: <MonitorIcon className="size-4" /> },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-1.5"><KeyIcon className="size-4" />Password</CardTitle>
          <CardDescription className="text-xs">Change your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3.5">
          <div className="space-y-1.5">
            <Label htmlFor="sec-current" className="text-xs">Current password</Label>
            <Input id="sec-current" type="password" placeholder="••••••••" className="h-8 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sec-new" className="text-xs">New password</Label>
            <Input id="sec-new" type="password" placeholder="Min. 8 characters" className="h-8 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sec-confirm" className="text-xs">Confirm new password</Label>
            <Input id="sec-confirm" type="password" placeholder="Re-enter new password" className="h-8 text-sm" />
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" className="h-8 bg-[#0052CC] hover:bg-[#0065FF] text-white">Update password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm flex items-center gap-1.5"><ShieldIcon className="size-4" />Two-Factor Authentication</CardTitle>
              <CardDescription className="text-xs">Add an extra layer of security to your account</CardDescription>
            </div>
            <Badge variant={twoFactor ? 'default' : 'outline'} className="text-xs">
              {twoFactor ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {twoFactor
                ? 'Two-factor authentication is active. Your account is more secure.'
                : 'Protect your account with an authenticator app or SMS.'}
            </p>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
          {twoFactor && (
            <div className="rounded-lg bg-muted/50 p-3 space-y-2">
              <p className="text-xs font-medium">Recovery codes</p>
              <p className="text-xs text-muted-foreground">Save your recovery codes in a safe place. Each code can only be used once.</p>
              <Button variant="outline" size="sm" className="h-7 text-xs">View recovery codes</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Active Sessions</CardTitle>
          <CardDescription className="text-xs">Manage devices where you are signed in</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                  {s.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{s.device}</p>
                    {s.current && <Badge variant="outline" className="text-xs h-5 px-1.5">Current</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.location} · {s.last}</p>
                </div>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="h-8 text-destructive border-destructive/50 hover:bg-destructive/10">
            Revoke all other sessions
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-1.5"><LinkIcon className="size-4" />Connected Accounts</CardTitle>
          <CardDescription className="text-xs">Link social accounts for faster login</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {[
            { name: 'Google', email: 'joan@gmail.com', connected: true },
            { name: 'Slack', email: null, connected: false },
            { name: 'GitHub', email: 'joanlouji', connected: true },
          ].map(acct => (
            <div key={acct.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{acct.name}</p>
                {acct.email && <p className="text-xs text-muted-foreground">{acct.email}</p>}
              </div>
              <Button
                variant={acct.connected ? 'outline' : 'outline'}
                size="sm"
                className={cn('h-7 text-xs', acct.connected && 'text-destructive border-destructive/50 hover:bg-destructive/10')}
              >
                {acct.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          ))}
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
              <CardTitle className="text-sm">Current Plan</CardTitle>
              <CardDescription className="text-xs">You are on the Pro plan</CardDescription>
            </div>
            <Badge className="bg-[#0052CC] hover:bg-[#0052CC] text-xs">Pro</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 space-y-2.5">
            {[
              ['Plan', 'Pro ($29/mo)'],
              ['Next billing date', 'July 12, 2026'],
              ['Payment method', 'Visa •••• 4242'],
              ['Billing cycle', 'Monthly'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground text-xs">{label}</span>
                <span className="font-medium text-xs">{value}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-3">Plan features</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {['Unlimited projects', 'Up to 10 team members', '50 GB storage', 'Priority support', 'Advanced analytics'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" size="sm" className="h-8">Change plan</Button>
          <Button variant="outline" size="sm" className="h-8">Update payment</Button>
          <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive ml-auto">Cancel subscription</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Billing History</CardTitle>
          <CardDescription className="text-xs">Download invoices for your records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {[
              { date: 'Jun 12, 2026', amount: '$29.00', status: 'Paid' },
              { date: 'May 12, 2026', amount: '$29.00', status: 'Paid' },
              { date: 'Apr 12, 2026', amount: '$29.00', status: 'Paid' },
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm">{inv.date}</p>
                  <p className="text-xs text-muted-foreground">Pro plan — monthly</p>
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

// ── Full settings page ─────────────────────────────────────────────────────────

function ProfileSettingsContent() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
      <div>
        <h1 className="text-base font-semibold text-foreground">Profile Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Manage your personal account preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="profile" className="gap-1.5 text-xs">
            <UserIcon className="size-3.5" /> Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-1.5 text-xs">
            <GlobeIcon className="size-3.5" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 text-xs">
            <BellIcon className="size-3.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 text-xs">
            <ShieldIcon className="size-3.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5 text-xs">
            <CreditCardIcon className="size-3.5" /> Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4"><ProfileTab /></TabsContent>
        <TabsContent value="preferences" className="mt-4"><PreferencesTab /></TabsContent>
        <TabsContent value="notifications" className="mt-4"><NotificationsTab /></TabsContent>
        <TabsContent value="security" className="mt-4"><SecurityTab /></TabsContent>
        <TabsContent value="billing" className="mt-4"><BillingTab /></TabsContent>
      </Tabs>
    </div>
  )
}

function ProfileSettingsPage() {
  return (
    <AppShell>
      <ProfileSettingsContent />
    </AppShell>
  )
}

const meta = {
  title: 'Pages/Profile/Settings',
  component: ProfileSettingsPage,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '800px' } },
  },
} satisfies Meta<typeof ProfileSettingsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SecurityTab_: Story = {
  name: 'Security',
  render: () => (
    <AppShell>
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
        <div>
          <h1 className="text-base font-semibold text-foreground">Profile Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your personal account preferences</p>
        </div>
        <Tabs defaultValue="security">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="profile" className="gap-1.5 text-xs"><UserIcon className="size-3.5" />Profile</TabsTrigger>
            <TabsTrigger value="preferences" className="gap-1.5 text-xs"><GlobeIcon className="size-3.5" />Preferences</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5 text-xs"><BellIcon className="size-3.5" />Notifications</TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5 text-xs"><ShieldIcon className="size-3.5" />Security</TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5 text-xs"><CreditCardIcon className="size-3.5" />Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="security" className="mt-4"><SecurityTab /></TabsContent>
        </Tabs>
      </div>
    </AppShell>
  ),
}
