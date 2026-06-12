import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { ShieldCheckIcon, ArrowLeftIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { Skeleton } from '@/components/Skeleton'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/InputOTP'
import { cn } from '@/lib/utils'

// ── Board background ───────────────────────────────────────────────────────────

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

// ── OTP card ───────────────────────────────────────────────────────────────────

function OTPCard() {
  const [value, setValue] = React.useState('')
  const [resendTimer, setResendTimer] = React.useState(30)

  React.useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(v => v - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-8 flex flex-col gap-4 items-center text-center">
      {/* Logo */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-10 w-10 rounded-lg bg-[#0052CC] flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
            <defs>
              <linearGradient id="otp-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
              <linearGradient id="otp-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
            </defs>
            <path fill="url(#otp-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
            <path fill="url(#otp-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
          </svg>
        </div>
        <span className="text-lg font-bold text-foreground">Nexus</span>
      </div>

      {/* Shield icon */}
      <div className="h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
        <ShieldCheckIcon className="h-7 w-7 text-[#0052CC]" />
      </div>

      <div className="space-y-1">
        <h1 className="text-sm font-semibold text-foreground">Verify your email</h1>
        <p className="text-xs text-muted-foreground">
          We've sent a 6-digit code to{' '}
          <span className="font-medium text-foreground">you@example.com</span>
        </p>
        <p className="text-xs text-muted-foreground">The code expires in 10 minutes.</p>
      </div>

      {/* OTP input */}
      <div className="flex flex-col items-center gap-2 w-full">
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs text-muted-foreground">{value.length}/6 digits entered</p>
      </div>

      <Button
        className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white"
        disabled={value.length < 6}
      >
        Verify code
      </Button>

      <p className="text-xs text-muted-foreground">
        Didn't receive a code?{' '}
        {resendTimer > 0 ? (
          <span>Resend in {resendTimer}s</span>
        ) : (
          <button
            type="button"
            onClick={() => setResendTimer(30)}
            className="text-[#0052CC] hover:underline font-medium"
          >
            Resend code
          </button>
        )}
      </p>

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
  title: 'Pages/OTP Verification',
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 blur-[2px] brightness-90 scale-[1.01]">
        <BoardBackground />
      </div>
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <OTPCard />
      </div>
    </div>
  ),
}

export const CardOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <OTPCard />
    </div>
  ),
}
