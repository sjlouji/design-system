import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { MailOpenIcon, CheckCircleIcon, ArrowLeftIcon, RefreshCwIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { Skeleton } from '@/components/Skeleton'
import { cn } from '@/lib/utils'

function BoardBackground() {
  const columns = [{ count: 4 }, { count: 3 }, { count: 2 }, { count: 5 }]
  return (
    <div className="h-screen w-full bg-background overflow-hidden select-none">
      <div className="h-11 border-b border-border px-3 flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-6 w-6 rounded" />
        <div className="flex items-center gap-1.5 ml-1">
          <Skeleton className="h-5 w-5 rounded bg-blue-200" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex-1 flex justify-center">
          <Skeleton className="h-7 w-80 rounded-md" />
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <Skeleton className="h-7 w-7 rounded" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </div>
      <div className="flex h-[calc(100vh-44px)]">
        <div className="w-52 border-r border-border p-3 flex flex-col gap-2 flex-shrink-0">
          {[0.7, 1, 0.6, 0.85, 0.5, 0.75, 0.9].map((w, i) => (
            <Skeleton key={i} className="h-4 rounded" style={{ width: `${w * 100}%` }} />
          ))}
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex gap-3">
            {columns.map(({ count }, ci) => (
              <div key={ci} className="w-60 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-3.5 w-16" />
                  <Skeleton className="h-5 w-5 rounded" />
                </div>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-md p-3 flex flex-col gap-2">
                      <Skeleton className={cn('h-3.5', i % 3 === 0 ? 'w-full' : 'w-4/5')} />
                      {i % 2 === 0 && <Skeleton className="h-3 w-3/5" />}
                      <div className="flex items-center justify-between mt-0.5">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-5 w-5 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function NexusLogo() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="h-10 w-10 rounded-lg bg-[#0052CC] flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
          <defs>
            <linearGradient id="ve-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
            <linearGradient id="ve-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
          </defs>
          <path fill="url(#ve-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
          <path fill="url(#ve-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
        </svg>
      </div>
      <span className="text-lg font-bold text-foreground">Nexus</span>
    </div>
  )
}

// ── Pending state — user just registered, waiting to verify ─────────────────────

function PendingCard() {
  const [resendTimer, setResendTimer] = React.useState(60)
  const [resendCount, setResendCount] = React.useState(0)

  React.useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(v => v - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  function handleResend() {
    setResendCount(c => c + 1)
    setResendTimer(60)
  }

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[440px] px-10 py-9 flex flex-col gap-5 items-center text-center">
      <NexusLogo />

      {/* Animated envelope */}
      <div className="relative">
        <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
          <MailOpenIcon className="h-8 w-8 text-[#0052CC]" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052CC] opacity-30" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0052CC]" />
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-base font-semibold text-foreground">Check your inbox</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We sent a verification link to{' '}
          <span className="font-medium text-foreground">you@example.com</span>.
          <br />
          Click the link in the email to activate your account.
        </p>
      </div>

      <div className="w-full rounded-lg bg-muted/50 border border-border px-4 py-3 text-left space-y-1.5">
        <p className="text-xs font-medium text-foreground">Didn't get the email?</p>
        <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
          <li>Check your spam or junk folder</li>
          <li>Make sure you typed your email correctly</li>
          <li>The link expires in 24 hours</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button
          variant="outline"
          className="w-full gap-2"
          disabled={resendTimer > 0}
          onClick={handleResend}
        >
          <RefreshCwIcon className="size-3.5" />
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend verification email'}
        </Button>
        {resendCount > 0 && (
          <p className="text-xs text-green-600 dark:text-green-400">
            ✓ Verification email resent
          </p>
        )}
      </div>

      <p className="text-sm">
        <a href="#" className="text-[#0052CC] hover:underline inline-flex items-center gap-1">
          <ArrowLeftIcon className="size-3" /> Back to log in
        </a>
      </p>

      <p className="text-xs text-muted-foreground">
        Wrong email?{' '}
        <a href="#" className="text-[#0052CC] hover:underline">Change email address</a>
      </p>
    </div>
  )
}

// ── Verified state — link was clicked ──────────────────────────────────────────

function VerifiedCard() {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-9 flex flex-col gap-5 items-center text-center">
      <NexusLogo />

      <div className="h-16 w-16 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
        <CheckCircleIcon className="h-9 w-9 text-green-600 dark:text-green-400" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-base font-semibold text-foreground">Email verified!</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your account has been successfully verified.
          <br />
          You can now sign in to Nexus.
        </p>
      </div>

      <Button className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white">
        Continue to Nexus
      </Button>
    </div>
  )
}

// ── Expired link state ──────────────────────────────────────────────────────────

function ExpiredCard() {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-9 flex flex-col gap-5 items-center text-center">
      <NexusLogo />

      <div className="h-14 w-14 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
        <svg className="h-7 w-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div className="space-y-1.5">
        <h1 className="text-base font-semibold text-foreground">Link expired</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This verification link has expired or already been used.
          <br />
          Request a new link below.
        </p>
      </div>

      <Button className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white gap-2">
        <RefreshCwIcon className="size-4" />
        Send new verification email
      </Button>

      <p className="text-sm">
        <a href="#" className="text-[#0052CC] hover:underline inline-flex items-center gap-1">
          <ArrowLeftIcon className="size-3" /> Back to log in
        </a>
      </p>
    </div>
  )
}

// ── Story ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/Auth/Verify Email',
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 blur-[2px] brightness-90 scale-[1.01]">
        <BoardBackground />
      </div>
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  )
}

export const Pending: Story = {
  render: () => <Wrapper><PendingCard /></Wrapper>,
}

export const Verified: Story = {
  render: () => <Wrapper><VerifiedCard /></Wrapper>,
}

export const ExpiredLink: Story = {
  render: () => <Wrapper><ExpiredCard /></Wrapper>,
}

export const CardOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <PendingCard />
    </div>
  ),
}
