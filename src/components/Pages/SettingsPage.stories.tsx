import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  UserIcon, BellIcon, ShieldIcon, CreditCardIcon, TrashIcon,
  SearchIcon, LayoutDashboardIcon, UsersIcon, SettingsIcon, LogOutIcon,
  BarChart3Icon, FileTextIcon, HelpCircleIcon, ChevronDownIcon,
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
import { cn } from '@/lib/utils'

// ── Sidebar nav ────────────────────────────────────────────────────────────────

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
                <linearGradient id="settings-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
                <linearGradient id="settings-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
              </defs>
              <path fill="url(#settings-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
              <path fill="url(#settings-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
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

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Settings content ───────────────────────────────────────────────────────────

function SettingsContent() {
  const [emailNotifs, setEmailNotifs] = React.useState(true)
  const [pushNotifs, setPushNotifs] = React.useState(false)
  const [marketingEmails, setMarketingEmails] = React.useState(true)
  const [twoFactor, setTwoFactor] = React.useState(false)

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-base font-semibold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-1.5 text-xs">
            <UserIcon className="size-3.5" /> Profile
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

        {/* Profile */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Profile Information</CardTitle>
              <CardDescription className="text-xs">Update your name, email and photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarFallback className="text-lg bg-[#0052CC] text-white">JL</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Profile photo</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG or WebP. Max 2MB.</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Upload photo</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">Remove</Button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="first-name" className="text-xs">First name</Label>
                  <Input id="first-name" defaultValue="Joan" className="h-8 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="last-name" className="text-xs">Last name</Label>
                  <Input id="last-name" defaultValue="Louji" className="h-8 text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s-email" className="text-xs">Email</Label>
                <Input id="s-email" type="email" defaultValue="joan@example.com" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bio" className="text-xs">Bio</Label>
                <textarea
                  id="bio"
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="A short bio about yourself…"
                  defaultValue="Frontend engineer. Building design systems and loving it."
                />
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
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Delete account</p>
                  <p className="text-xs text-muted-foreground">Permanently delete your account and all your data</p>
                </div>
                <Button variant="destructive" size="sm" className="shrink-0 gap-1.5 h-8">
                  <TrashIcon className="size-3.5" /> Delete account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="divide-y">
              {[
                { id: 'email', label: 'Email notifications', desc: 'Receive updates via email', value: emailNotifs, onChange: setEmailNotifs },
                { id: 'push', label: 'Push notifications', desc: 'Receive browser push notifications', value: pushNotifs, onChange: setPushNotifs },
                { id: 'marketing', label: 'Marketing emails', desc: 'Product announcements and feature updates', value: marketingEmails, onChange: setMarketingEmails },
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch checked={item.value} onCheckedChange={item.onChange} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Password</CardTitle>
              <CardDescription className="text-xs">Change your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="current-password" className="text-xs">Current password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-password" className="text-xs">New password</Label>
                <Input id="new-password" type="password" placeholder="Min. 8 characters" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password" className="text-xs">Confirm new password</Label>
                <Input id="confirm-password" type="password" placeholder="Re-enter new password" className="h-8 text-sm" />
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
                  <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
                  <CardDescription className="text-xs">Add an extra layer of security to your account</CardDescription>
                </div>
                <Badge variant={twoFactor ? 'default' : 'outline'} className="text-xs">
                  {twoFactor ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {twoFactor
                    ? 'Two-factor authentication is active. Your account is more secure.'
                    : 'Protect your account with an authenticator app or SMS.'}
                </p>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-4 mt-4">
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
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <span className="font-medium text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm" className="h-8">Change plan</Button>
              <Button variant="outline" size="sm" className="h-8">Update payment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

function SettingsPage() {
  return (
    <AppShell>
      <SettingsContent />
    </AppShell>
  )
}

// ── Story ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/Settings',
  component: SettingsPage,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta<typeof SettingsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
