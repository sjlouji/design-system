import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  UserIcon,
  BellIcon,
  ShieldIcon,
  PaletteIcon,
  CreditCardIcon,
  UsersIcon,
  KeyIcon,
  SmartphoneIcon,
  GlobeIcon,
  LogOutIcon,
  CameraIcon,
  ChevronRightIcon,
  CheckIcon,
  AlertTriangleIcon,
  SparklesIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { Input } from '@/components/Input'
import { Switch } from '@/components/Switch'
import { Separator } from '@/components/Separator'
import { Textarea } from '@/components/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

type SettingsSection =
  | 'profile'
  | 'notifications'
  | 'appearance'
  | 'security'
  | 'billing'
  | 'team'

// ── Nav items ─────────────────────────────────────────────────────────────────

const navItems: { id: SettingsSection; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'profile', label: 'Profile', icon: <UserIcon className="size-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <BellIcon className="size-4" />, badge: '3' },
  { id: 'appearance', label: 'Appearance', icon: <PaletteIcon className="size-4" /> },
  { id: 'security', label: 'Security', icon: <ShieldIcon className="size-4" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCardIcon className="size-4" /> },
  { id: 'team', label: 'Team', icon: <UsersIcon className="size-4" /> },
]

// ── Section: Profile ──────────────────────────────────────────────────────────

function ProfileSection() {
  return (
    <div className="space-y-8">
      {/* Avatar upload */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Profile photo</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This will be displayed on your profile and in comments.
        </p>
        <div className="flex items-center gap-5">
          <div className="relative group">
            <Avatar className="size-[72px]">
              <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=maya" />
              <AvatarFallback className="text-lg font-medium bg-[oklch(0.93_0.04_283)] text-[oklch(0.45_0.18_283)]">
                MA
              </AvatarFallback>
            </Avatar>
            <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <CameraIcon className="size-5 text-white" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Upload photo</Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                Remove
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Name fields */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Personal information</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" htmlFor="first-name">
            <Input id="first-name" defaultValue="Maya" />
          </Field>
          <Field label="Last name" htmlFor="last-name">
            <Input id="last-name" defaultValue="Andersen" />
          </Field>
        </div>
        <div className="mt-4 space-y-4">
          <Field
            label="Email address"
            htmlFor="email"
            helperText="We'll send account notifications to this address."
          >
            <Input id="email" type="email" defaultValue="maya.andersen@meridian.ai" />
          </Field>
          <Field label="Username" htmlFor="username">
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground select-none">
                meridian.ai/
              </span>
              <Input
                id="username"
                defaultValue="maya-andersen"
                className="rounded-l-none"
              />
            </div>
          </Field>
          <Field
            label="Bio"
            htmlFor="bio"
            helperText="Brief description for your profile. Max 160 characters."
          >
            <Textarea
              id="bio"
              rows={3}
              defaultValue="Product designer turned AI researcher. Building the future of human-computer interaction at Meridian."
            />
          </Field>
        </div>
      </div>

      <Separator />

      {/* Role + timezone */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Work details</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Job title" htmlFor="job-title">
            <Input id="job-title" defaultValue="Head of Product Design" />
          </Field>
          <Field label="Department" htmlFor="department">
            <Input id="department" defaultValue="Product" />
          </Field>
          <Field label="Timezone" htmlFor="timezone">
            <Select defaultValue="europe-london">
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-pacific">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="us-eastern">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="europe-london">London (UTC+0)</SelectItem>
                <SelectItem value="europe-paris">Paris (UTC+1)</SelectItem>
                <SelectItem value="asia-tokyo">Tokyo (UTC+9)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Language" htmlFor="language">
            <Select defaultValue="en">
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  )
}

// ── Section: Notifications ────────────────────────────────────────────────────

type NotifRow = {
  id: string
  label: string
  description: string
  email: boolean
  push: boolean
  slack: boolean
}

const notifGroups: { title: string; rows: NotifRow[] }[] = [
  {
    title: 'Activity',
    rows: [
      { id: 'mentions', label: 'Mentions & replies', description: 'When someone @mentions you or replies to your comment.', email: true, push: true, slack: false },
      { id: 'comments', label: 'New comments', description: 'When someone comments on a thread you\'re watching.', email: false, push: true, slack: true },
      { id: 'assignments', label: 'Assignments', description: 'When you\'re assigned to a task or review.', email: true, push: true, slack: true },
    ],
  },
  {
    title: 'Workspace',
    rows: [
      { id: 'team-invite', label: 'Team invitations', description: 'When someone invites you to join a team.', email: true, push: true, slack: false },
      { id: 'releases', label: 'Product updates', description: 'New features, improvements, and release notes.', email: true, push: false, slack: false },
      { id: 'billing-alerts', label: 'Billing alerts', description: 'Upcoming renewals, failed payments, and invoices.', email: true, push: false, slack: false },
    ],
  },
  {
    title: 'AI assistant',
    rows: [
      { id: 'ai-complete', label: 'Task completions', description: 'When an AI task finishes processing.', email: false, push: true, slack: false },
      { id: 'ai-errors', label: 'Errors & failures', description: 'When an AI task fails or needs attention.', email: true, push: true, slack: true },
    ],
  },
]

function NotifToggle({ on }: { on: boolean }) {
  const [checked, setChecked] = React.useState(on)
  return <Switch checked={checked} onCheckedChange={setChecked} />
}

function NotificationsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Notification preferences</h3>
        <p className="text-sm text-muted-foreground">
          Choose how and when you receive notifications. Changes are saved automatically.
        </p>
      </div>

      {notifGroups.map((group, gi) => (
        <div key={gi}>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {group.title}
          </h4>
          <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_60px_60px_60px] gap-0 px-4 py-2 border-b border-border/50 bg-muted/30">
              <span className="text-xs font-medium text-muted-foreground">Notification</span>
              <span className="text-xs font-medium text-muted-foreground text-center">Email</span>
              <span className="text-xs font-medium text-muted-foreground text-center">Push</span>
              <span className="text-xs font-medium text-muted-foreground text-center">Slack</span>
            </div>
            {group.rows.map((row, ri) => (
              <div
                key={row.id}
                className={cn(
                  'grid grid-cols-[1fr_60px_60px_60px] items-center gap-0 px-4 py-3.5',
                  ri < group.rows.length - 1 && 'border-b border-border/40',
                )}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{row.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{row.description}</p>
                </div>
                <div className="flex justify-center"><NotifToggle on={row.email} /></div>
                <div className="flex justify-center"><NotifToggle on={row.push} /></div>
                <div className="flex justify-center"><NotifToggle on={row.slack} /></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Section: Appearance ───────────────────────────────────────────────────────

type ThemeOption = 'system' | 'light' | 'dark'
type DensityOption = 'compact' | 'default' | 'comfortable'
type AccentOption = { id: string; color: string; label: string }

const accentOptions: AccentOption[] = [
  { id: 'violet', color: 'oklch(0.555 0.225 283)', label: 'Violet' },
  { id: 'blue', color: 'oklch(0.54 0.22 257)', label: 'Blue' },
  { id: 'teal', color: 'oklch(0.54 0.15 185)', label: 'Teal' },
  { id: 'green', color: 'oklch(0.54 0.16 150)', label: 'Green' },
  { id: 'orange', color: 'oklch(0.6 0.2 60)', label: 'Orange' },
  { id: 'rose', color: 'oklch(0.55 0.22 12)', label: 'Rose' },
]

function ThemeCard({ theme, selected, onSelect }: { theme: ThemeOption; selected: boolean; onSelect: () => void }) {
  const previewStyles: Record<ThemeOption, { bg: string; card: string; accent: string }> = {
    system: { bg: 'bg-gradient-to-br from-background to-muted', card: 'bg-card', accent: 'bg-primary' },
    light: { bg: 'bg-white', card: 'bg-gray-50', accent: 'bg-[oklch(0.555_0.225_283)]' },
    dark: { bg: 'bg-[oklch(0.085_0.012_265)]', card: 'bg-[oklch(0.12_0.01_265)]', accent: 'bg-[oklch(0.555_0.225_283)]' },
  }
  const labels: Record<ThemeOption, string> = { system: 'System', light: 'Light', dark: 'Dark' }
  const s = previewStyles[theme]

  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex flex-col gap-2 rounded-xl border-2 p-1 cursor-pointer transition-all duration-150',
        selected ? 'border-primary' : 'border-border hover:border-border/80',
      )}
    >
      {/* Mini preview */}
      <div className={cn('h-24 w-full rounded-lg overflow-hidden relative', s.bg)}>
        {/* Fake sidebar */}
        <div className={cn('absolute left-0 top-0 bottom-0 w-8', s.card, 'border-r border-border/20')} />
        {/* Fake content blocks */}
        <div className="absolute left-10 right-2 top-2 space-y-1.5">
          <div className={cn('h-2 rounded-sm w-3/4', s.card)} />
          <div className={cn('h-2 rounded-sm w-1/2', s.card)} />
          <div className={cn('h-2 rounded-sm w-5/6', s.card)} />
        </div>
        {/* Fake accent button */}
        <div className={cn('absolute left-10 bottom-2 h-2.5 w-8 rounded-sm', s.accent)} />
      </div>
      <div className="flex items-center justify-between px-1 pb-0.5">
        <span className="text-sm font-medium text-foreground">{labels[theme]}</span>
        {selected && (
          <span className="flex items-center justify-center size-4 rounded-full bg-primary">
            <CheckIcon className="size-2.5 text-primary-foreground" />
          </span>
        )}
      </div>
    </button>
  )
}

function AppearanceSection() {
  const [theme, setTheme] = React.useState<ThemeOption>('dark')
  const [density, setDensity] = React.useState<DensityOption>('default')
  const [accent, setAccent] = React.useState('violet')
  const [animations, setAnimations] = React.useState(true)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  const densityOptions: { id: DensityOption; label: string; description: string }[] = [
    { id: 'compact', label: 'Compact', description: 'Tighter spacing for dense information.' },
    { id: 'default', label: 'Default', description: 'Balanced spacing for most workflows.' },
    { id: 'comfortable', label: 'Comfortable', description: 'Generous spacing, easier on the eyes.' },
  ]

  return (
    <div className="space-y-8">
      {/* Theme */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Interface theme</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the color scheme for the interface. System will match your OS preference.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(['system', 'light', 'dark'] as ThemeOption[]).map((t) => (
            <ThemeCard key={t} theme={t} selected={theme === t} onSelect={() => setTheme(t)} />
          ))}
        </div>
      </div>

      <Separator />

      {/* Accent color */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Accent color</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Primary color used for interactive elements, focus rings, and highlights.
        </p>
        <div className="flex gap-3">
          {accentOptions.map((opt) => (
            <button
              key={opt.id}
              title={opt.label}
              onClick={() => setAccent(opt.id)}
              className={cn(
                'size-8 rounded-full transition-all duration-150 cursor-pointer relative',
                accent === opt.id && 'ring-2 ring-offset-2 ring-offset-background',
              )}
              style={{
                backgroundColor: opt.color,
                ringColor: opt.color,
              } as React.CSSProperties}
            >
              {accent === opt.id && (
                <CheckIcon className="absolute inset-0 m-auto size-3.5 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Density */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Interface density</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Controls the amount of spacing and padding throughout the app.
        </p>
        <div className="space-y-2">
          {densityOptions.map((opt) => (
            <label
              key={opt.id}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors',
                density === opt.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-border/80 bg-card',
              )}
            >
              <input
                type="radio"
                name="density"
                value={opt.id}
                checked={density === opt.id}
                onChange={() => setDensity(opt.id)}
                className="sr-only"
              />
              <div
                className={cn(
                  'size-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                  density === opt.id ? 'border-primary' : 'border-muted-foreground/40',
                )}
              >
                {density === opt.id && <div className="size-2 rounded-full bg-primary" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Motion */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Motion & animations</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-foreground">Enable animations</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Transitions, hover effects, and loading indicators.
              </p>
            </div>
            <Switch checked={animations} onCheckedChange={setAnimations} />
          </div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-foreground">Reduce motion</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Minimise movement for accessibility. Overrides the setting above.
              </p>
            </div>
            <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section: Security ─────────────────────────────────────────────────────────

const sessions = [
  { id: '1', device: 'MacBook Pro 16"', location: 'London, UK', browser: 'Chrome 124', lastSeen: 'Active now', current: true },
  { id: '2', device: 'iPhone 15 Pro', location: 'London, UK', browser: 'Safari 17', lastSeen: '2 hours ago', current: false },
  { id: '3', device: 'iPad Air', location: 'Amsterdam, NL', browser: 'Chrome 123', lastSeen: '4 days ago', current: false },
]

function SecuritySection() {
  const [mfa, setMfa] = React.useState(true)
  const [loginAlerts, setLoginAlerts] = React.useState(true)

  return (
    <div className="space-y-8">
      {/* Password */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Password</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use a strong, unique password you don't use elsewhere.
        </p>
        <div className="space-y-4 max-w-sm">
          <Field label="Current password" htmlFor="current-pw">
            <Input id="current-pw" type="password" placeholder="••••••••••••" />
          </Field>
          <Field label="New password" htmlFor="new-pw" helperText="Min. 12 characters, with uppercase, number & symbol.">
            <Input id="new-pw" type="password" placeholder="••••••••••••" />
          </Field>
          <Field label="Confirm new password" htmlFor="confirm-pw">
            <Input id="confirm-pw" type="password" placeholder="••••••••••••" />
          </Field>
          <Button>Update password</Button>
        </div>
      </div>

      <Separator />

      {/* MFA */}
      <div>
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-foreground">Two-factor authentication</h3>
              {mfa && (
                <Badge className="text-[10px] font-semibold bg-[oklch(0.93_0.06_160)] text-[oklch(0.38_0.12_160)] border-0">
                  Enabled
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security. You'll be asked for a code from your authenticator app when you sign in.
            </p>
          </div>
          <Switch checked={mfa} onCheckedChange={setMfa} />
        </div>

        {mfa && (
          <div className="mt-4 rounded-xl border border-border/60 bg-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 rounded-lg bg-[oklch(0.93_0.04_283)] flex items-center justify-center">
                <SmartphoneIcon className="size-4 text-[oklch(0.555_0.225_283)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Authenticator app</p>
                <p className="text-xs text-muted-foreground">Configured · Last used 2h ago</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">Manage</Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                <KeyIcon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Backup codes</p>
                <p className="text-xs text-muted-foreground">8 codes remaining</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">View codes</Button>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Login alerts */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-foreground">Sign-in alerts</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Receive an email when a new device signs in to your account.
          </p>
        </div>
        <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
      </div>

      <Separator />

      {/* Active sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Active sessions</h3>
            <p className="text-sm text-muted-foreground">
              Devices currently signed in to your account.
            </p>
          </div>
          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
            Revoke all others
          </Button>
        </div>
        <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
          {sessions.map((session, i) => (
            <div
              key={session.id}
              className={cn('flex items-center gap-4 px-4 py-3.5', i < sessions.length - 1 && 'border-b border-border/40')}
            >
              <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {session.device.includes('iPhone') || session.device.includes('iPad')
                  ? <SmartphoneIcon className="size-4 text-muted-foreground" />
                  : <GlobeIcon className="size-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{session.device}</p>
                  {session.current && (
                    <Badge className="text-[10px] shrink-0 bg-[oklch(0.93_0.06_160)] text-[oklch(0.38_0.12_160)] border-0">
                      This device
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{session.browser} · {session.location} · {session.lastSeen}</p>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-muted-foreground shrink-0">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Danger zone */}
      <div>
        <h3 className="text-sm font-semibold text-destructive mb-1">Danger zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-center gap-4">
          <AlertTriangleIcon className="size-5 text-destructive shrink-0" />
          <p className="text-sm text-foreground flex-1">
            Deleting your account will remove all your data from our servers within 30 days.
          </p>
          <Button variant="outline" size="sm" className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Shell ─────────────────────────────────────────────────────────────────────

function SettingsShell({ defaultSection = 'profile' }: { defaultSection?: SettingsSection }) {
  const [active, setActive] = React.useState<SettingsSection>(defaultSection)

  const sectionContent: Record<SettingsSection, React.ReactNode> = {
    profile: <ProfileSection />,
    notifications: <NotificationsSection />,
    appearance: <AppearanceSection />,
    security: <SecuritySection />,
    billing: (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-2">
        <CreditCardIcon className="size-8 opacity-40" />
        <p className="text-sm">Billing settings would appear here.</p>
      </div>
    ),
    team: (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-2">
        <UsersIcon className="size-8 opacity-40" />
        <p className="text-sm">Team management would appear here.</p>
      </div>
    ),
  }

  const sectionTitles: Record<SettingsSection, { title: string; description: string }> = {
    profile: { title: 'Profile', description: 'Manage your personal information and public profile.' },
    notifications: { title: 'Notifications', description: 'Configure where and when you receive alerts.' },
    appearance: { title: 'Appearance', description: 'Customise the look and feel of your workspace.' },
    security: { title: 'Security', description: 'Manage your password, two-factor auth, and active sessions.' },
    billing: { title: 'Billing', description: 'Manage your plan, payment method, and invoices.' },
    team: { title: 'Team', description: 'Invite members, manage roles, and configure team settings.' },
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 flex flex-col border-r border-border/60 bg-card/40 overflow-y-auto">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border/40">
          <div className="size-7 rounded-lg bg-[linear-gradient(135deg,oklch(0.555_0.225_283),oklch(0.52_0.22_220))] flex items-center justify-center">
            <SparklesIcon className="size-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Meridian</span>
        </div>

        {/* Back link */}
        <div className="px-3 pt-3 pb-1">
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-1.5 py-1 rounded-md hover:bg-accent/50 w-full">
            <ChevronRightIcon className="size-3 rotate-180" />
            Back to app
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-1 space-y-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-1.5 pt-3 pb-1">
            Account
          </p>
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                'flex items-center gap-2.5 w-full rounded-md px-2.5 py-2 text-sm transition-colors',
                active === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/60',
              )}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-1.5 pt-4 pb-1">
            Workspace
          </p>
          {navItems.slice(4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                'flex items-center gap-2.5 w-full rounded-md px-2.5 py-2 text-sm transition-colors',
                active === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/60',
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="border-t border-border/40 p-3">
          <div className="flex items-center gap-2.5 px-1.5 py-1.5 rounded-lg">
            <Avatar className="size-7">
              <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=maya" />
              <AvatarFallback className="text-xs bg-[oklch(0.93_0.04_283)] text-[oklch(0.45_0.18_283)]">MA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Maya Andersen</p>
              <p className="text-[10px] text-muted-foreground truncate">maya@meridian.ai</p>
            </div>
          </div>
          <button className="flex items-center gap-2 w-full mt-1 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-md transition-colors">
            <LogOutIcon className="size-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-10 py-10">
          {/* Section header */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {sectionTitles[active].title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {sectionTitles[active].description}
            </p>
          </div>

          {/* Section content */}
          {sectionContent[active]}
        </div>
      </main>
    </div>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/SettingsPage',
  component: SettingsShell,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta<typeof SettingsShell>

export default meta
type Story = StoryObj<typeof meta>

export const Profile: Story = {
  args: { defaultSection: 'profile' },
}

export const Notifications: Story = {
  args: { defaultSection: 'notifications' },
}

export const Appearance: Story = {
  args: { defaultSection: 'appearance' },
}

export const Security: Story = {
  args: { defaultSection: 'security' },
}
