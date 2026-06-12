import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Checkbox } from '@/components/Checkbox'
import { Separator } from '@/components/Separator'
import { Skeleton } from '@/components/Skeleton'
import { Field } from '@/components/Field'
import { cn } from '@/lib/utils'

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 21 21" aria-hidden>
      <rect x="1"  y="1"  width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
      <rect x="1"  y="11" width="9" height="9" fill="#00a4ef"/>
      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.39.07 2.35.77 3.17.8 1.21-.24 2.37-.97 3.67-.83 1.57.19 2.75.84 3.52 2.1-3.22 1.93-2.69 5.98.48 7.23-.57 1.53-1.33 3.05-2.84 4.56zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  )
}

function SlackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 54 54" aria-hidden>
      <path fill="#E01E5A" d="M21.5 0C18.4 0 15.9 2.5 15.9 5.6s2.5 5.6 5.6 5.6h5.6V5.6C27.1 2.5 24.6 0 21.5 0zm0 15H5.6C2.5 15 0 17.5 0 20.6s2.5 5.6 5.6 5.6h15.9c3.1 0 5.6-2.5 5.6-5.6S24.6 15 21.5 15z"/>
      <path fill="#36C5F0" d="M54 20.6c0-3.1-2.5-5.6-5.6-5.6s-5.6 2.5-5.6 5.6v5.6h5.6c3.1 0 5.6-2.5 5.6-5.6zm-15 0v-15c0-3.1-2.5-5.6-5.6-5.6S27.9 2.5 27.9 5.6v15c0 3.1 2.5 5.6 5.6 5.6s5.5-2.5 5.5-5.6z"/>
      <path fill="#2EB67D" d="M32.5 54c3.1 0 5.6-2.5 5.6-5.6s-2.5-5.6-5.6-5.6h-5.6v5.6c0 3.1 2.5 5.6 5.6 5.6zm0-15h15.9c3.1 0 5.6-2.5 5.6-5.6s-2.5-5.6-5.6-5.6H32.5c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6z"/>
      <path fill="#ECB22E" d="M0 33.5c0 3.1 2.5 5.6 5.6 5.6s5.6-2.5 5.6-5.6v-5.6H5.6C2.5 27.9 0 30.4 0 33.5zm15 0v15c0 3.1 2.5 5.6 5.6 5.6s5.6-2.5 5.6-5.6V33.5c0-3.1-2.5-5.6-5.6-5.6s-5.6 2.5-5.6 5.6z"/>
    </svg>
  )
}

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
          <div className="flex gap-3 overflow-hidden">
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

function InlineDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Separator className="flex-1" />
      <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
      <Separator className="flex-1" />
    </div>
  )
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button variant="outline" className="w-full justify-center gap-2.5 font-normal">
      {icon}
      {label}
    </Button>
  )
}

function RegistrationCard() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-8 flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto">
      <div className="flex flex-col items-center gap-1.5 mb-1">
        <div className="h-10 w-10 rounded-lg bg-[#0052CC] flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
            <defs>
              <linearGradient id="reg-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
              <linearGradient id="reg-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%"><stop offset="0%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient>
            </defs>
            <path fill="url(#reg-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
            <path fill="url(#reg-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
          </svg>
        </div>
        <span className="text-lg font-bold text-foreground">Nexus</span>
        <h1 className="text-sm font-semibold text-foreground">Create your account</h1>
      </div>

      <div className="flex flex-col gap-2">
        <SocialButton icon={<GoogleIcon />}    label="Sign up with Google" />
        <SocialButton icon={<MicrosoftIcon />} label="Sign up with Microsoft" />
        <SocialButton icon={<AppleIcon />}     label="Sign up with Apple" />
        <SocialButton icon={<SlackIcon />}     label="Sign up with Slack" />
      </div>

      <InlineDivider label="Or sign up with email" />

      <div className="flex gap-3">
        <Field label="First name" htmlFor="reg-first" required className="flex-1">
          <Input id="reg-first" placeholder="Joan" />
        </Field>
        <Field label="Last name" htmlFor="reg-last" className="flex-1">
          <Input id="reg-last" placeholder="Louji" />
        </Field>
      </div>

      <Field label="Email" htmlFor="reg-email" required>
        <Input id="reg-email" type="email" placeholder="you@example.com" />
      </Field>

      <Field label="Password" htmlFor="reg-password" required>
        <div className="relative">
          <Input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            className="pr-9"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        </div>
      </Field>

      <div className="flex items-start gap-2">
        <Checkbox id="reg-terms" className="mt-0.5" />
        <Label htmlFor="reg-terms" className="font-normal text-sm cursor-pointer leading-snug">
          I agree to the{' '}
          <a href="#" className="text-[#0052CC] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#0052CC] hover:underline">Privacy Policy</a>
        </Label>
      </div>

      <Button className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white">Create account</Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <a href="#" className="text-[#0052CC] hover:underline font-medium">Log in</a>
      </p>
    </div>
  )
}

const meta = {
  title: 'Pages/Auth/Register',
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '900px' } },
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
        <RegistrationCard />
      </div>
    </div>
  ),
}

export const CardOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <RegistrationCard />
    </div>
  ),
}
