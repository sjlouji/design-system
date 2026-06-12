import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { EyeIcon, EyeOffIcon, MailIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Skeleton } from '@/components/Skeleton'
import { Field } from '@/components/Field'
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
          <Skeleton className="h-7 w-14 rounded" />
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
    <div className="flex flex-col items-center gap-1.5 mb-1">
      <div className="h-10 w-10 rounded-lg bg-[#0052CC] flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
          <defs>
            <linearGradient id="fp-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
            <linearGradient id="fp-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
          </defs>
          <path fill="url(#fp-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
          <path fill="url(#fp-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
        </svg>
      </div>
      <span className="text-lg font-bold text-foreground">Nexus</span>
    </div>
  )
}

type Step = 'request' | 'sent' | 'reset'

function RequestCard({ onSent }: { onSent: () => void }) {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-8 flex flex-col gap-4">
      <NexusLogo />
      <div className="flex flex-col items-center gap-1 mb-1">
        <div className="h-11 w-11 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
          <MailIcon className="h-5 w-5 text-[#0052CC]" />
        </div>
        <h1 className="text-sm font-semibold text-foreground mt-1">Forgot your password?</h1>
        <p className="text-xs text-muted-foreground text-center">Enter your email and we'll send you a reset link</p>
      </div>
      <Field label="Email" htmlFor="fp-email" required>
        <Input id="fp-email" type="email" placeholder="you@example.com" autoComplete="email" />
      </Field>
      <Button className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white" onClick={onSent}>
        Send reset link
      </Button>
      <p className="text-center text-sm">
        <a href="#" className="text-[#0052CC] hover:underline inline-flex items-center gap-1">
          <ArrowLeftIcon className="size-3" /> Back to log in
        </a>
      </p>
    </div>
  )
}

function SentCard({ email, onReset }: { email: string; onReset: () => void }) {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-8 flex flex-col gap-4 items-center text-center">
      <NexusLogo />
      <div className="h-14 w-14 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
        <CheckCircleIcon className="h-7 w-7 text-green-600 dark:text-green-400" />
      </div>
      <div className="space-y-1">
        <h1 className="text-sm font-semibold text-foreground">Check your email</h1>
        <p className="text-xs text-muted-foreground">
          We sent a password reset link to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <p className="text-xs text-muted-foreground">The link expires in 1 hour.</p>
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={onReset}
      >
        Open reset form (demo)
      </Button>
      <p className="text-xs text-muted-foreground">
        Didn't receive an email?{' '}
        <button className="text-[#0052CC] hover:underline font-medium">Resend</button>
      </p>
      <p className="text-sm">
        <a href="#" className="text-[#0052CC] hover:underline inline-flex items-center gap-1">
          <ArrowLeftIcon className="size-3" /> Back to log in
        </a>
      </p>
    </div>
  )
}

function ResetCard() {
  const [showPwd, setShowPwd] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-8 flex flex-col gap-4">
      <NexusLogo />
      <div className="flex flex-col items-center gap-1 mb-1">
        <h1 className="text-sm font-semibold text-foreground">Set new password</h1>
        <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
      </div>
      <Field label="New password" htmlFor="reset-pwd" required>
        <div className="relative">
          <Input id="reset-pwd" type={showPwd ? 'text' : 'password'} placeholder="Min. 8 characters" className="pr-9" />
          <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showPwd ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        </div>
      </Field>
      <Field label="Confirm password" htmlFor="reset-confirm" required>
        <div className="relative">
          <Input id="reset-confirm" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password" className="pr-9" />
          <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showConfirm ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        </div>
      </Field>
      <Button className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white">Reset password</Button>
    </div>
  )
}

function ForgotPasswordFlow({ initialStep = 'request' }: { initialStep?: Step }) {
  const [step, setStep] = React.useState<Step>(initialStep)

  const card =
    step === 'sent'  ? <SentCard email="you@example.com" onReset={() => setStep('reset')} /> :
    step === 'reset' ? <ResetCard /> :
                       <RequestCard onSent={() => setStep('sent')} />

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 blur-[2px] brightness-90 scale-[1.01]">
        <BoardBackground />
      </div>
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {card}
      </div>
    </div>
  )
}

const meta = {
  title: 'Pages/Auth/Forgot Password',
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const RequestReset: Story = {
  render: () => <ForgotPasswordFlow initialStep="request" />,
}

export const EmailSent: Story = {
  render: () => <ForgotPasswordFlow initialStep="sent" />,
}

export const SetNewPassword: Story = {
  render: () => <ForgotPasswordFlow initialStep="reset" />,
}
