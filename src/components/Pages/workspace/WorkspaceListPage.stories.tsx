import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  PlusIcon, SearchIcon, BellIcon, SettingsIcon, LogOutIcon,
  HelpCircleIcon, LayoutDashboardIcon, MoreHorizontalIcon,
  UsersIcon, BuildingIcon, CheckCircleIcon, ArrowRightIcon,
  SparklesIcon,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/Dialog'
import { Stepper, useStepper } from '@/components/Stepper'
import { Separator } from '@/components/Separator'
import { cn } from '@/lib/utils'

// ── App shell ─────────────────────────────────────────────────────────────────

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-14 shrink-0 border-r bg-card flex flex-col items-center py-3 gap-2">
        <div className="h-8 w-8 rounded-lg bg-[#0052CC] flex items-center justify-center mb-2">
          <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden>
            <defs>
              <linearGradient id="wl-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#fff" stopOpacity=".8"/><stop offset="100%" stopColor="#fff"/></linearGradient>
            </defs>
            <path fill="url(#wl-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
            <path fill="url(#wl-nexus-a)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
          </svg>
        </div>
        {[
          { icon: LayoutDashboardIcon, active: true },
          { icon: UsersIcon, active: false },
          { icon: SettingsIcon, active: false },
        ].map(({ icon: Icon, active }, i) => (
          <button
            key={i}
            className={cn(
              'size-9 flex items-center justify-center rounded-md transition-colors',
              active ? 'bg-blue-50 dark:bg-blue-950/50 text-[#0052CC]' : 'text-muted-foreground hover:bg-accent'
            )}
          >
            <Icon className="size-4" />
          </button>
        ))}
        <div className="flex-1" />
        <button className="size-9 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors">
          <HelpCircleIcon className="size-4" />
        </button>
        <button className="size-9 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors">
          <LogOutIcon className="size-4" />
        </button>
        <Avatar className="size-7">
          <AvatarFallback className="text-xs bg-[#0052CC] text-white">JL</AvatarFallback>
        </Avatar>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card px-5 py-2.5 flex items-center gap-3 shrink-0">
          <span className="text-sm font-semibold text-foreground">Workspaces</span>
          <div className="flex-1 max-w-sm ml-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input className="pl-8 h-7 text-sm" placeholder="Search workspaces…" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" className="relative">
              <BellIcon className="size-4" />
              <span className="absolute top-1 right-1 size-1.5 rounded-full bg-red-500" />
            </Button>
            <Avatar className="size-7 cursor-pointer">
              <AvatarFallback className="text-xs bg-[#0052CC] text-white">JL</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Workspace data ────────────────────────────────────────────────────────────

const workspaces = [
  {
    id: '1',
    name: 'Acme Corp',
    slug: 'acme-corp',
    plan: 'Enterprise',
    planColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300',
    members: 42,
    projects: 18,
    initials: 'AC',
    color: 'bg-purple-500',
    role: 'Owner',
    lastActive: 'Active now',
  },
  {
    id: '2',
    name: 'Startup HQ',
    slug: 'startup-hq',
    plan: 'Pro',
    planColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
    members: 8,
    projects: 5,
    initials: 'SH',
    color: 'bg-blue-500',
    role: 'Admin',
    lastActive: '2h ago',
  },
  {
    id: '3',
    name: 'Design Team',
    slug: 'design-team',
    plan: 'Free',
    planColor: 'bg-muted text-muted-foreground',
    members: 3,
    projects: 2,
    initials: 'DT',
    color: 'bg-pink-500',
    role: 'Member',
    lastActive: 'Yesterday',
  },
]

// ── Create workspace stepper ──────────────────────────────────────────────────

const creationSteps = [
  { id: 'basics', title: 'Basics', description: 'Name & type' },
  { id: 'invite', title: 'Invite', description: 'Add members' },
  { id: 'plan', title: 'Plan', description: 'Choose a plan' },
  { id: 'done', title: 'Done', description: 'All set!' },
]

function StepBasics({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="ws-name" className="text-sm font-medium">Workspace name <span className="text-destructive">*</span></Label>
        <Input id="ws-name" placeholder="e.g. Acme Corp" className="h-9" defaultValue="" />
        <p className="text-xs text-muted-foreground">This is the name visible to all members.</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ws-slug" className="text-sm font-medium">URL slug <span className="text-destructive">*</span></Label>
        <div className="flex items-center gap-0">
          <span className="inline-flex h-9 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-xs text-muted-foreground shrink-0">
            nexus.app/
          </span>
          <Input id="ws-slug" placeholder="acme-corp" className="h-9 rounded-l-none" defaultValue="" />
        </div>
        <p className="text-xs text-muted-foreground">Only lowercase letters, numbers, and hyphens.</p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Workspace type</Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'company', label: 'Company', desc: 'For teams building products together', icon: <BuildingIcon className="size-4" /> },
            { id: 'personal', label: 'Personal', desc: 'For your own projects and todos', icon: <UsersIcon className="size-4" /> },
          ].map(t => (
            <button
              key={t.id}
              className={cn(
                'rounded-lg border-2 p-3 text-left transition-colors space-y-1',
                t.id === 'company'
                  ? 'border-[#0052CC] bg-blue-50/50 dark:bg-blue-950/20'
                  : 'border-border hover:border-[#0052CC]/50'
              )}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                {t.icon}
                {t.label}
                {t.id === 'company' && <span className="ml-auto size-3.5 rounded-full bg-[#0052CC] flex items-center justify-center"><CheckCircleIcon className="size-2.5 text-white" /></span>}
              </div>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ws-desc" className="text-sm font-medium">Description <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <textarea
          id="ws-desc"
          rows={2}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          placeholder="What does this workspace do?"
        />
      </div>

      <DialogFooter className="pt-2">
        <Button className="bg-[#0052CC] hover:bg-[#0065FF] text-white gap-1.5" onClick={onNext}>
          Continue <ArrowRightIcon className="size-3.5" />
        </Button>
      </DialogFooter>
    </div>
  )
}

function StepInvite({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [emails, setEmails] = React.useState([''])

  function addEmail() { setEmails(e => [...e, '']) }
  function updateEmail(i: number, val: string) {
    setEmails(e => e.map((v, idx) => idx === i ? val : v))
  }
  function removeEmail(i: number) {
    setEmails(e => e.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Invite team members by email. They'll receive an invite link to join your workspace.
      </p>

      <div className="space-y-2">
        {emails.map((email, i) => (
          <div key={i} className="flex gap-2">
            <Input
              type="email"
              placeholder={`colleague${i + 1}@example.com`}
              value={email}
              onChange={e => updateEmail(i, e.target.value)}
              className="h-9 flex-1"
            />
            {emails.length > 1 && (
              <Button variant="ghost" size="icon-sm" className="size-9 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => removeEmail(i)}>
                ×
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={addEmail}>
          <PlusIcon className="size-3" /> Add another
        </Button>
      </div>

      <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        You can also invite people later from <strong>Workspace Settings → Members</strong>.
      </div>

      <DialogFooter className="pt-2 gap-2">
        <Button variant="outline" onClick={onPrev}>Back</Button>
        <Button className="bg-[#0052CC] hover:bg-[#0065FF] text-white gap-1.5" onClick={onNext}>
          Continue <ArrowRightIcon className="size-3.5" />
        </Button>
      </DialogFooter>
    </div>
  )
}

function StepPlan({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [selected, setSelected] = React.useState('pro')

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Up to 5 members', '3 projects', '1 GB storage'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$29',
      period: 'per workspace/mo',
      badge: 'Most popular',
      features: ['Up to 20 members', 'Unlimited projects', '50 GB storage', 'Priority support'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: ['Unlimited members', 'Custom integrations', 'Dedicated support', 'SLA & compliance'],
    },
  ]

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Choose a plan for your workspace. You can change this at any time.</p>

      {plans.map(plan => (
        <button
          key={plan.id}
          onClick={() => setSelected(plan.id)}
          className={cn(
            'w-full rounded-lg border-2 p-3.5 text-left transition-colors',
            selected === plan.id ? 'border-[#0052CC] bg-blue-50/50 dark:bg-blue-950/20' : 'border-border hover:border-[#0052CC]/50'
          )}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{plan.name}</span>
              {plan.badge && (
                <Badge className="h-4 text-[10px] px-1.5 bg-[#0052CC]">{plan.badge}</Badge>
              )}
            </div>
            <div className="text-right">
              <span className="font-bold text-sm">{plan.price}</span>
              <span className="text-xs text-muted-foreground ml-1">{plan.period}</span>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-0.5">
            {plan.features.map(f => (
              <li key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="size-1 rounded-full bg-muted-foreground/50" />
                {f}
              </li>
            ))}
          </ul>
        </button>
      ))}

      <DialogFooter className="pt-2 gap-2">
        <Button variant="outline" onClick={onPrev}>Back</Button>
        <Button className="bg-[#0052CC] hover:bg-[#0065FF] text-white gap-1.5" onClick={onNext}>
          Create workspace <ArrowRightIcon className="size-3.5" />
        </Button>
      </DialogFooter>
    </div>
  )
}

function StepDone({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-4">
      <div className="h-16 w-16 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
        <CheckCircleIcon className="h-9 w-9 text-green-600 dark:text-green-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Workspace created!</h3>
        <p className="text-sm text-muted-foreground">
          <strong>Acme Corp</strong> is ready. Invitations have been sent to your team.
        </p>
      </div>
      <div className="w-full rounded-lg bg-muted/50 p-3 text-left space-y-1.5">
        <p className="text-xs font-medium">Next steps</p>
        {['Create your first project', 'Explore integrations', 'Set workspace settings'].map(s => (
          <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowRightIcon className="size-3 shrink-0" />
            {s}
          </div>
        ))}
      </div>
      <Button className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white" onClick={onClose}>
        Go to workspace
      </Button>
    </div>
  )
}

function CreateWorkspaceDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { currentStep, next, prev } = useStepper(creationSteps.length)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-base">
            {currentStep < creationSteps.length ? 'Create a new workspace' : 'All done!'}
          </DialogTitle>
        </DialogHeader>

        {currentStep < creationSteps.length && (
          <Stepper
            steps={creationSteps}
            currentStep={currentStep}
            className="mb-4"
          />
        )}

        <Separator className="mb-4" />

        {currentStep === 0 && <StepBasics onNext={next} />}
        {currentStep === 1 && <StepInvite onNext={next} onPrev={prev} />}
        {currentStep === 2 && <StepPlan onNext={next} onPrev={prev} />}
        {currentStep === 3 && <StepDone onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  )
}

// ── Workspace card ─────────────────────────────────────────────────────────────

function WorkspaceCard({ ws }: { ws: typeof workspaces[0] }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={cn('size-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0', ws.color)}>
              {ws.initials}
            </div>
            <div className="min-w-0">
              <CardTitle className="text-sm font-semibold truncate">{ws.name}</CardTitle>
              <CardDescription className="text-xs">nexus.app/{ws.slug}</CardDescription>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-md">
            <MoreHorizontalIcon className="size-4 text-muted-foreground" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={cn('text-xs h-5 px-1.5', ws.planColor)}>
            {ws.plan}
          </Badge>
          <Badge variant="outline" className="text-xs h-5 px-1.5">
            {ws.role}
          </Badge>
          <span className="text-xs text-muted-foreground ml-auto">{ws.lastActive}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><UsersIcon className="size-3" /> {ws.members} members</span>
          <span className="flex items-center gap-1"><LayoutDashboardIcon className="size-3" /> {ws.projects} projects</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground">
            <SettingsIcon className="size-3" /> Settings
          </Button>
          <Button size="sm" className="h-7 text-xs bg-[#0052CC] hover:bg-[#0065FF] text-white gap-1">
            Open <ArrowRightIcon className="size-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

function WorkspaceListContent() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold text-foreground">Your Workspaces</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            You belong to {workspaces.length} workspaces
          </p>
        </div>
        <Button
          className="bg-[#0052CC] hover:bg-[#0065FF] text-white gap-1.5 h-9"
          onClick={() => setDialogOpen(true)}
        >
          <PlusIcon className="size-4" /> New workspace
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Workspaces', value: '3', icon: <BuildingIcon className="size-4 text-muted-foreground" /> },
          { label: 'Total members', value: '53', icon: <UsersIcon className="size-4 text-muted-foreground" /> },
          { label: 'Active projects', value: '25', icon: <SparklesIcon className="size-4 text-muted-foreground" /> },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              {s.icon}
              <div>
                <p className="text-xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workspace grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map(ws => (
          <WorkspaceCard key={ws.id} ws={ws} />
        ))}

        {/* Create new card */}
        <button
          onClick={() => setDialogOpen(true)}
          className="rounded-xl border-2 border-dashed border-border hover:border-[#0052CC]/50 hover:bg-muted/30 transition-colors flex flex-col items-center justify-center gap-2 p-6 min-h-[180px] text-muted-foreground"
        >
          <div className="size-10 rounded-lg border-2 border-dashed border-current flex items-center justify-center">
            <PlusIcon className="size-5" />
          </div>
          <span className="text-sm font-medium">Create workspace</span>
          <span className="text-xs text-center">Start a new organisation or personal space</span>
        </button>
      </div>

      <CreateWorkspaceDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

function WorkspaceListPage() {
  return (
    <AppShell>
      <WorkspaceListContent />
    </AppShell>
  )
}

// ── Stories ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/Workspace/Workspaces',
  component: WorkspaceListPage,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '800px' } },
  },
} satisfies Meta<typeof WorkspaceListPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CreateDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <AppShell>
        <WorkspaceListContent />
        <CreateWorkspaceDialog open={open} onOpenChange={setOpen} />
      </AppShell>
    )
  },
}
