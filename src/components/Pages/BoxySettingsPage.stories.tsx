import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  UserIcon,
  BriefcaseIcon,
  MonitorIcon,
  BellIcon,
  ShieldIcon,
  LockIcon,
  Link2Icon,
  CreditCardIcon,
  FileIcon,
  Trash2Icon,
  LogOutIcon,
  KeyIcon,
  SmartphoneIcon,
  AlertTriangleIcon,
  CheckIcon,
  CameraIcon,
  QrCodeIcon,
  LaptopIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronLeftIcon,
  SparklesIcon,
  BanIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { Input } from '@/components/Input'
import { Switch } from '@/components/Switch'
import { Textarea } from '@/components/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

type Section = 'profile' | 'sessions' | 'security' | 'account'

// ── Section Box ───────────────────────────────────────────────────────────────

function SectionBox({
  title,
  action,
  children,
  danger = false,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
  danger?: boolean
}) {
  return (
    <div className={cn('border', danger ? 'border-destructive/50' : 'border-border')}>
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2.5 border-b',
          danger
            ? 'border-destructive/50 bg-destructive/5'
            : 'border-border bg-muted/40',
        )}
      >
        <span
          className={cn(
            'text-[11px] font-semibold tracking-[0.08em] uppercase',
            danger ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {title}
        </span>
        {action}
      </div>
      {children}
    </div>
  )
}

// ── Boxy tab bar ──────────────────────────────────────────────────────────────

// Vertical tab list — used for the top-level Profile / Sessions / Security / Account tabs
function BoxyVerticalTabsList({ children }: { children: React.ReactNode }) {
  return (
    <TabsList
      variant="line"
      className="w-36 shrink-0 rounded-none border-r border-border bg-transparent h-auto p-0 gap-0 items-stretch"
    >
      {children}
    </TabsList>
  )
}

function BoxyVerticalTabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsTrigger
      value={value}
      className="rounded-none w-full justify-start px-4 py-2.5 text-sm font-medium h-auto border-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:font-semibold"
    >
      {children}
    </TabsTrigger>
  )
}

// ── Profile Section ───────────────────────────────────────────────────────────

function ProfileSection() {
  const [tab, setTab] = React.useState(0)
  return (
    <div className="space-y-4">
      <Tabs
        type="expandable"
        tabs={[
          { title: 'Personal Info', icon: UserIcon },
          { title: 'Work Details', icon: BriefcaseIcon },
        ]}
        defaultActiveIndex={0}
        onChange={(i) => { if (i !== null) setTab(i) }}
        className="border-none shadow-none"
      />

      {tab === 0 && (
        <>
          <SectionBox title="Profile Photo">
            <div className="flex items-center gap-5 p-4">
              <div className="relative group shrink-0">
                <Avatar className="size-16 rounded-none">
                  <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=alex" />
                  <AvatarFallback className="rounded-none text-lg font-semibold bg-[oklch(0.93_0.04_283)] text-[oklch(0.45_0.18_283)]">
                    AL
                  </AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <CameraIcon className="size-4 text-white" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" shape="boxy">Upload photo</Button>
                  <Button size="sm" variant="ghost" shape="boxy" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    Remove
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">JPG, PNG or WebP. Max 2 MB.</p>
              </div>
            </div>
          </SectionBox>

          <SectionBox title="Personal Information">
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" htmlFor="bx-first">
                  <Input id="bx-first" shape="boxy" defaultValue="Alex" />
                </Field>
                <Field label="Last name" htmlFor="bx-last">
                  <Input id="bx-last" shape="boxy" defaultValue="Mercer" />
                </Field>
              </div>
              <Field label="Email address" htmlFor="bx-email" helperText="Notifications and sign-in alerts are sent here.">
                <div className="flex">
                  <Input id="bx-email" type="email" shape="boxy" defaultValue="alex.mercer@workos.com" className="flex-1" />
                  <span className="inline-flex items-center border border-l-0 border-input bg-muted px-3 text-xs text-muted-foreground shrink-0 gap-1.5">
                    <CheckIcon className="size-3 text-success" />
                    Verified
                  </span>
                </div>
              </Field>
              <Field label="Username" htmlFor="bx-username">
                <div className="flex">
                  <span className="inline-flex items-center border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground shrink-0 select-none">
                    workos.com/
                  </span>
                  <Input id="bx-username" shape="boxy" defaultValue="alex-mercer" className="rounded-none" />
                </div>
              </Field>
              <Field label="Bio" htmlFor="bx-bio" helperText="Max 160 characters.">
                <Textarea
                  id="bx-bio"
                  rows={3}
                  className="rounded-none"
                  defaultValue="Product engineer building developer infrastructure. Obsessed with great DX and performance."
                />
              </Field>
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border bg-muted/20">
              <Button size="sm" variant="ghost" shape="boxy">Cancel</Button>
              <Button size="sm" shape="boxy">Save changes</Button>
            </div>
          </SectionBox>
        </>
      )}

      {tab === 1 && (
        <SectionBox title="Work Details">
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Job title" htmlFor="bx-job">
                <Input id="bx-job" shape="boxy" defaultValue="Staff Engineer" />
              </Field>
              <Field label="Department" htmlFor="bx-dept">
                <Input id="bx-dept" shape="boxy" defaultValue="Platform" />
              </Field>
              <Field label="Timezone" htmlFor="bx-tz">
                <Select defaultValue="us-pacific">
                  <SelectTrigger id="bx-tz" className="rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="us-pacific">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="us-eastern">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="europe-london">London (UTC+0)</SelectItem>
                    <SelectItem value="europe-paris">Paris (UTC+1)</SelectItem>
                    <SelectItem value="asia-tokyo">Tokyo (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Language" htmlFor="bx-lang">
                <Select defaultValue="en">
                  <SelectTrigger id="bx-lang" className="rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
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
          <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border bg-muted/20">
            <Button size="sm" shape="boxy">Save details</Button>
          </div>
        </SectionBox>
      )}
    </div>
  )
}

// ── Sessions Section ──────────────────────────────────────────────────────────

const sessionData = [
  {
    id: '1',
    device: 'MacBook Pro 16"',
    browser: 'Chrome 124',
    location: 'San Francisco, CA',
    lastSeen: 'Active now',
    icon: 'laptop',
    current: true,
  },
  {
    id: '2',
    device: 'iPhone 15 Pro',
    browser: 'Safari 17',
    location: 'San Francisco, CA',
    lastSeen: '2 hours ago',
    icon: 'phone',
    current: false,
  },
  {
    id: '3',
    device: 'Windows PC',
    browser: 'Firefox 124',
    location: 'New York, NY',
    lastSeen: '4 days ago',
    icon: 'monitor',
    current: false,
  },
]

function SessionsSection() {
  const [sessions, setSessions] = React.useState(sessionData)

  const revoke = (id: string) => setSessions((s) => s.filter((s) => s.id !== id))
  const revokeAll = () => setSessions((s) => s.filter((s) => s.current))

  const DeviceIcon = ({ type }: { type: string }) => {
    if (type === 'phone') return <SmartphoneIcon className="size-4 text-muted-foreground" />
    if (type === 'laptop') return <LaptopIcon className="size-4 text-muted-foreground" />
    return <MonitorIcon className="size-4 text-muted-foreground" />
  }

  const [tab, setTab] = React.useState(0)

  return (
    <div className="space-y-4">
      <Tabs
        type="expandable"
        tabs={[
          { title: 'Active Sessions', icon: MonitorIcon },
          { title: 'Alerts', icon: BellIcon },
        ]}
        defaultActiveIndex={0}
        onChange={(i) => { if (i !== null) setTab(i) }}
        className="border-none shadow-none"
      />

      {tab === 0 && (
        <>
          <div className="grid grid-cols-3 border border-border divide-x divide-border">
            {[
              { label: 'Active sessions', value: sessions.length.toString() },
              { label: 'Last sign-in', value: 'Just now' },
              { label: 'Trusted devices', value: '2' },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {label}
                </p>
                <p className="text-xl font-semibold text-foreground mt-1">{value}</p>
              </div>
            ))}
          </div>

          <SectionBox
            title="Devices"
            action={
              <Button size="xs" variant="ghost" shape="boxy" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={revokeAll}>
                Revoke all others
              </Button>
            }
          >
            {sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground gap-2">
                <MonitorIcon className="size-7 opacity-30" />
                <p className="text-sm">No other active sessions.</p>
              </div>
            ) : (
              <div>
                {sessions.map((session, i) => (
                  <div
                    key={session.id}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3.5',
                      i < sessions.length - 1 && 'border-b border-border',
                      session.current && 'bg-muted/30',
                    )}
                  >
                    <div className="size-9 border border-border bg-muted/40 flex items-center justify-center shrink-0">
                      <DeviceIcon type={session.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground truncate">{session.device}</p>
                        {session.current && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                            This device
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {session.browser} &middot; {session.location} &middot; {session.lastSeen}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn('size-2 shrink-0', session.current ? 'bg-success' : 'bg-muted-foreground/30')} />
                      {!session.current && (
                        <Button variant="ghost" size="sm" shape="boxy" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs" onClick={() => revoke(session.id)}>
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionBox>
        </>
      )}

      {tab === 1 && (
        <SectionBox title="Sign-in Alerts">
          <div className="divide-y divide-border">
            {[
              {
                label: 'Email me on new sign-in',
                description: 'Get an email whenever a new device accesses your account.',
                defaultChecked: true,
              },
              {
                label: 'New location sign-in',
                description: 'Alert me when my account is accessed from an unrecognised location.',
                defaultChecked: true,
              },
              {
                label: 'Failed sign-in attempts',
                description: 'Notify me after 3 consecutive failed sign-in attempts.',
                defaultChecked: false,
              },
            ].map(({ label, description, defaultChecked }) => (
              <div key={label} className="flex items-start justify-between gap-6 px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
                <Switch defaultChecked={defaultChecked} />
              </div>
            ))}
          </div>
        </SectionBox>
      )}
    </div>
  )
}

// ── Security Section ──────────────────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  const score = Math.min(
    4,
    [password.length >= 12, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(
      Boolean,
    ).length,
  )
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', 'bg-destructive', 'bg-warning', 'bg-primary/70', 'bg-success']

  if (!password) return null

  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 transition-colors duration-300',
              i <= score ? colors[score] : 'bg-border',
            )}
          />
        ))}
      </div>
      <span className={cn('text-[11px] font-semibold', score > 0 && 'text-muted-foreground')}>
        {labels[score]}
      </span>
    </div>
  )
}

function SecuritySection() {
  const [newPw, setNewPw] = React.useState('')
  const [showPw, setShowPw] = React.useState(false)
  const [mfa, setMfa] = React.useState(true)
  const [showSetup, setShowSetup] = React.useState(false)

  const [tab, setTab] = React.useState(0)

  return (
    <div className="space-y-4">
      <Tabs
        type="expandable"
        tabs={[
          { title: 'Password', icon: LockIcon },
          { title: 'Two-Factor Auth', icon: ShieldIcon },
          { title: 'Connected Accounts', icon: Link2Icon },
        ]}
        defaultActiveIndex={0}
        onChange={(i) => { if (i !== null) setTab(i) }}
        className="border-none shadow-none"
      />

      {tab === 0 && (
        <SectionBox title="Change Password">
          <div className="p-4 space-y-4 max-w-sm">
            <Field label="Current password" htmlFor="bx-curr-pw">
              <Input id="bx-curr-pw" type="password" shape="boxy" placeholder="••••••••••••" />
            </Field>
            <Field label="New password" htmlFor="bx-new-pw">
              <div>
                <div className="relative">
                  <Input
                    id="bx-new-pw"
                    type={showPw ? 'text' : 'password'}
                    shape="boxy"
                    placeholder="Min. 12 characters"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPw ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </div>
                <PasswordStrength password={newPw} />
              </div>
            </Field>
            <Field label="Confirm new password" htmlFor="bx-confirm-pw">
              <Input id="bx-confirm-pw" type="password" shape="boxy" placeholder="••••••••••••" />
            </Field>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">Last changed 3 months ago.</p>
            <Button size="sm" shape="boxy">Update password</Button>
          </div>
        </SectionBox>
      )}

      {tab === 1 && (
        <SectionBox
          title="Two-Factor Authentication"
          action={
            <div className="flex items-center gap-2">
              {mfa && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-success/10 text-success border border-success/20 uppercase tracking-wide">
                  Enabled
                </span>
              )}
              <Switch checked={mfa} onCheckedChange={(v) => { setMfa(v); if (v) setShowSetup(true) }} />
            </div>
          }
        >
          {!mfa ? (
            <div className="px-4 py-5 flex items-start gap-4">
              <div className="size-9 border border-border flex items-center justify-center shrink-0 bg-muted/40">
                <ShieldIcon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Your account is not protected by 2FA</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Enable two-factor authentication to add an extra layer of security.
                </p>
                <Button size="sm" variant="outline" shape="boxy" className="mt-3" onClick={() => { setMfa(true); setShowSetup(true) }}>
                  Enable 2FA
                </Button>
              </div>
            </div>
          ) : showSetup ? (
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="border border-dashed border-border size-28 flex items-center justify-center shrink-0 bg-muted/20">
                  <QrCodeIcon className="size-12 text-muted-foreground/40" />
                </div>
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-medium text-foreground">Scan with your authenticator app</p>
                  <p className="text-xs text-muted-foreground">
                    Open Google Authenticator, Authy, or 1Password and scan the QR code.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Input shape="boxy" placeholder="6-digit code" className="max-w-[140px] text-center tracking-[0.25em] font-mono" maxLength={6} />
                    <Button size="default" shape="boxy" onClick={() => setShowSetup(false)}>Verify</Button>
                    <Button variant="ghost" shape="boxy" onClick={() => { setShowSetup(false); setMfa(false) }}>Cancel</Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {[
                { icon: <SmartphoneIcon className="size-4 text-muted-foreground" />, label: 'Authenticator app', meta: 'Configured · Last used 2h ago', action: <Button variant="outline" size="sm" shape="boxy">Manage</Button> },
                { icon: <KeyIcon className="size-4 text-muted-foreground" />, label: 'Backup codes', meta: '8 of 10 codes remaining', action: <Button variant="ghost" size="sm" shape="boxy">View codes</Button> },
              ].map(({ icon, label, meta, action }, i, arr) => (
                <div key={label} className={cn('flex items-center gap-4 px-4 py-3.5', i < arr.length - 1 && 'border-b border-border')}>
                  <div className="size-9 border border-border bg-muted/40 flex items-center justify-center shrink-0">{icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{meta}</p>
                  </div>
                  {action}
                </div>
              ))}
            </div>
          )}
        </SectionBox>
      )}

      {tab === 2 && (
        <SectionBox title="Connected Accounts">
          {[
            { name: 'Google', handle: 'alex.mercer@gmail.com', connected: true },
            { name: 'GitHub', handle: 'alex-mercer', connected: true },
            { name: 'Slack', handle: null, connected: false },
          ].map(({ name, handle, connected }, i, arr) => (
            <div
              key={name}
              className={cn(
                'flex items-center gap-4 px-4 py-3.5',
                i < arr.length - 1 && 'border-b border-border',
              )}
            >
              <div className="size-8 border border-border bg-muted/40 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-muted-foreground">{name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{name}</p>
                {handle && <p className="text-xs text-muted-foreground mt-0.5">{handle}</p>}
              </div>
              <Button
                variant="outline"
                size="sm"
                shape="boxy"
                className={cn(connected && 'text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive')}
              >
                {connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          ))}
        </SectionBox>
      )}
    </div>
  )
}

// ── Account Section ───────────────────────────────────────────────────────────

function AccountSection() {
  const [deleteInput, setDeleteInput] = React.useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false)
  const confirmed = deleteInput === 'DELETE'

  const [tab, setTab] = React.useState(0)

  return (
    <div className="space-y-4">
      <Tabs
        type="expandable"
        tabs={[
          { title: 'Plan', icon: CreditCardIcon },
          { title: 'Privacy & Data', icon: FileIcon },
          { title: 'Danger Zone', icon: AlertTriangleIcon },
        ]}
        defaultActiveIndex={0}
        onChange={(i) => { if (i !== null) setTab(i) }}
        className="border-none shadow-none"
      />

      {tab === 0 && (
        <>
          <SectionBox title="Current Plan">
            <div className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">Pro plan</p>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                    Active
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Renews July 16, 2026 &middot; $29/month &middot; Visa 4242
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" shape="boxy">Change plan</Button>
                <Button size="sm" variant="ghost" shape="boxy">Billing history</Button>
              </div>
            </div>
          </SectionBox>

          <SectionBox title="Billing Summary">
            <div className="divide-y divide-border">
              {[
                ['Plan', 'Pro ($29/month)'],
                ['Next renewal', 'July 16, 2026'],
                ['Payment method', 'Visa ending in 4242'],
                ['Billing cycle', 'Monthly'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-4 py-3 border-t border-border bg-muted/20">
              <Button size="sm" variant="ghost" shape="boxy" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                Cancel subscription
              </Button>
              <Button size="sm" variant="outline" shape="boxy">Update payment</Button>
            </div>
          </SectionBox>
        </>
      )}

      {tab === 1 && (
        <SectionBox title="Data & Privacy">
          <div className="divide-y divide-border">
            <div className="flex items-start justify-between gap-6 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">Export your data</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Download a copy of all your account data including projects, files, and activity.
                </p>
              </div>
              <Button size="sm" variant="outline" shape="boxy" className="shrink-0">Request export</Button>
            </div>
            <div className="flex items-start justify-between gap-6 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">Clear activity data</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Remove your search history and viewed items. This cannot be undone.
                </p>
              </div>
              <Button size="sm" variant="outline" shape="boxy" className="shrink-0">Clear data</Button>
            </div>
            <div className="flex items-start justify-between gap-6 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">Manage cookie preferences</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Control which cookies and tracking technologies are enabled for your session.
                </p>
              </div>
              <Button size="sm" variant="outline" shape="boxy" className="shrink-0">Manage cookies</Button>
            </div>
          </div>
        </SectionBox>
      )}

      {tab === 2 && (
        <>
          <SectionBox title="Deactivate Account">
            <div className="px-4 py-4 flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-medium text-foreground">Temporarily deactivate</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your profile will be hidden and you won't receive notifications. You can reactivate at any time.
                </p>
              </div>
              <Button size="sm" variant="outline" shape="boxy" className="shrink-0 border-warning/40 text-warning-foreground hover:bg-warning/10">
                <BanIcon className="size-3.5" />
                Deactivate
              </Button>
            </div>
          </SectionBox>

          <SectionBox title="Delete Account" danger>
            <div className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="size-9 border border-destructive/40 bg-destructive/10 flex items-center justify-center shrink-0">
                  <AlertTriangleIcon className="size-4 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">This action is permanent and cannot be reversed</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All your projects, files, team memberships, and account data will be permanently removed from our servers within 30 days. Active subscriptions will be cancelled immediately.
                  </p>
                </div>
              </div>

              {!showDeleteConfirm ? (
                <Button
                  size="sm"
                  variant="outline"
                  shape="boxy"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2Icon className="size-3.5" />
                  Delete my account
                </Button>
              ) : (
                <div className="border border-destructive/40 bg-destructive/5 p-4 space-y-3">
                  <p className="text-xs font-medium text-foreground">
                    Type <span className="font-mono font-bold tracking-widest">DELETE</span> to confirm:
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      shape="boxy"
                      placeholder="DELETE"
                      className="max-w-[200px] font-mono tracking-widest"
                      value={deleteInput}
                      onChange={(e) => setDeleteInput(e.target.value.toUpperCase())}
                    />
                    <Button size="default" variant="destructive" shape="boxy" disabled={!confirmed} className="disabled:opacity-40">
                      Confirm deletion
                    </Button>
                    <Button size="default" variant="ghost" shape="boxy" onClick={() => { setShowDeleteConfirm(false); setDeleteInput('') }}>
                      Cancel
                    </Button>
                  </div>
                  {confirmed && (
                    <p className="text-xs text-destructive font-medium">
                      Click "Confirm deletion" above to permanently delete your account.
                    </p>
                  )}
                </div>
              )}
            </div>
          </SectionBox>
        </>
      )}
    </div>
  )
}

// ── Shell ─────────────────────────────────────────────────────────────────────



function BoxySettingsShell({ defaultSection = 'profile' }: { defaultSection?: Section }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 flex flex-col border-r border-border">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border">
          <div className="size-7 bg-[linear-gradient(135deg,oklch(0.555_0.225_283),oklch(0.52_0.22_220))] flex items-center justify-center shrink-0">
            <SparklesIcon className="size-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">WorkOS</p>
            <p className="text-[10px] text-muted-foreground truncate">alex.mercer@workos.com</p>
          </div>
        </div>

        {/* Back */}
        <div className="px-3 py-2 border-b border-border">
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 w-full hover:bg-muted">
            <ChevronLeftIcon className="size-3.5" />
            Back to dashboard
          </button>
        </div>

        <div className="flex-1" />

        {/* User footer */}
        <div className="border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Avatar className="size-8 rounded-none shrink-0">
              <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=alex" />
              <AvatarFallback className="rounded-none text-xs font-semibold bg-[oklch(0.93_0.04_283)] text-[oklch(0.45_0.18_283)]">
                AL
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Alex Mercer</p>
              <p className="text-[10px] text-muted-foreground truncate">alex.mercer@workos.com</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOutIcon className="size-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto bg-muted/10">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-8 py-3">
          <h1 className="text-sm font-semibold text-foreground">Settings</h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">Manage your account preferences.</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-8 py-8">
          <Tabs defaultValue={defaultSection} orientation="vertical" className="gap-0 items-start">
            <BoxyVerticalTabsList>
              <BoxyVerticalTabsTrigger value="profile">Profile</BoxyVerticalTabsTrigger>
              <BoxyVerticalTabsTrigger value="sessions">Sessions</BoxyVerticalTabsTrigger>
              <BoxyVerticalTabsTrigger value="security">Security</BoxyVerticalTabsTrigger>
              <BoxyVerticalTabsTrigger value="account">Account</BoxyVerticalTabsTrigger>
            </BoxyVerticalTabsList>
            <TabsContent value="profile" className="flex-1 pl-8"><ProfileSection /></TabsContent>
            <TabsContent value="sessions" className="flex-1 pl-8"><SessionsSection /></TabsContent>
            <TabsContent value="security" className="flex-1 pl-8"><SecuritySection /></TabsContent>
            <TabsContent value="account" className="flex-1 pl-8"><AccountSection /></TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/Boxy Settings',
  component: BoxySettingsShell,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta<typeof BoxySettingsShell>

export default meta
type Story = StoryObj<typeof meta>

export const Profile: Story = {
  args: { defaultSection: 'profile' },
}

export const Sessions: Story = {
  args: { defaultSection: 'sessions' },
}

export const Security: Story = {
  args: { defaultSection: 'security' },
}

export const Account: Story = {
  args: { defaultSection: 'account' },
}
