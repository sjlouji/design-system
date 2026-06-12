import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { KeyRoundIcon, InfoIcon } from 'lucide-react'
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
      <rect x="1" y="1"  width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
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

function NexusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="login-nexus-a" x1="100%" x2="32.7%" y1="13%" y2="75%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
        <linearGradient id="login-nexus-b" x1="0%" x2="67.3%" y1="87%" y2="25%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
      </defs>
      <path fill="url(#login-nexus-a)" d="M16.24 15.52L9.4 8.65 3 2.24A1.08 1.08 0 001.47 3.8l6 6 6.85 6.86a.53.53 0 010 .75L7.48 24.2l-6 6A1.08 1.08 0 003 31.76l6.41-6.41 6.84-6.84a1.08 1.08 0 00-.01-1z"/>
      <path fill="url(#login-nexus-b)" d="M15.76 16.48l6.84 6.87 6.41 6.41a1.08 1.08 0 001.52-1.52l-6-6-6.85-6.86a.53.53 0 010-.75l6.84-6.84 6-6A1.08 1.08 0 0029 .24l-6.41 6.41-6.84 6.84a1.08 1.08 0 00.01 0z"/>
    </svg>
  )
}

function AtlassianLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M11.5 17.9c-.3-.4-.9-.3-1.1.2L6.1 27.4c-.2.5.1 1 .7 1h8.5c.3 0 .6-.2.7-.5 1.5-3.6.6-7.3-2.5-10z" fill="#2684FF"/>
      <path d="M15.5 5.1c-4 5.8-3.8 12.1-.4 16.4l5.8 10.4c.2.4.6.5.9.5h8.5c.5 0 .9-.5.7-1L16.6 5.3c-.3-.5-1-.5-1.1-.2z" fill="url(#atl-login-g)"/>
      <defs>
        <linearGradient id="atl-login-g" x1="24" y1="9" x2="14" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0052CC"/>
          <stop offset="1" stopColor="#2684FF"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function BoardBackground() {
  const columns = [
    { label: 'To Do', count: 4 },
    { label: 'In Progress', count: 3 },
    { label: 'In Review', count: 2 },
    { label: 'Done', count: 5 },
  ]

  return (
    <div className="h-screen w-full bg-background overflow-hidden select-none">
      <div className="h-11 border-b border-border px-3 flex items-center gap-2 bg-background">
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
          <Skeleton className="h-7 w-7 rounded" />
          <Skeleton className="h-7 w-7 rounded" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </div>
      <div className="flex h-[calc(100vh-44px)]">
        <div className="w-52 border-r border-border p-3 flex flex-col gap-2 bg-background flex-shrink-0">
          {[0.7, 1, 0.6, 0.85, 0.5, 0.75, 0.9, 0.65].map((w, i) => (
            <Skeleton key={i} className="h-4 rounded" style={{ width: `${w * 100}%` }} />
          ))}
        </div>
        <div className="flex-1 p-4 overflow-hidden bg-background">
          <div className="flex items-center gap-4 mb-5">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex gap-3 overflow-hidden h-[calc(100%-36px)]">
            {columns.map(({ label, count }) => (
              <div key={label} className="w-60 flex-shrink-0">
                <div className="flex items-center justify-between mb-2 px-1">
                  <Skeleton className="h-3.5 w-16" />
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-5 rounded" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-md p-3 flex flex-col gap-2">
                      <Skeleton className={cn('h-3.5', i % 3 === 0 ? 'w-full' : 'w-4/5')} />
                      {i % 2 === 0 && <Skeleton className="h-3 w-3/5" />}
                      <div className="flex items-center justify-between mt-0.5">
                        <div className="flex gap-1">
                          <Skeleton className="h-4 w-4 rounded" />
                          {i % 2 === 0 && <Skeleton className="h-4 w-10 rounded-full" />}
                        </div>
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
    <div className="flex items-center gap-2 py-0.5">
      <Separator className="flex-1" />
      <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
      <Separator className="flex-1" />
    </div>
  )
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button variant="outline" className="w-full h-10 justify-center gap-2.5 font-bold rounded-[3px] border-[#0B120E24] bg-background text-foreground shadow-none hover:bg-muted/40 hover:text-foreground transition-colors">
      {icon}
      {label}
    </Button>
  )
}

function LoginCard() {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-2xl w-[400px] px-10 py-8 flex flex-col gap-3.5">
      <div className="flex flex-col items-center gap-1.5 mb-1">
        <div className="h-10 w-10 rounded-lg bg-[#0052CC] flex items-center justify-center">
          <NexusIcon />
        </div>
        <span className="text-lg font-bold text-foreground">Nexus</span>
        <h1 className="text-sm font-semibold text-foreground">Log in to continue</h1>
      </div>

      <Field label="Email" htmlFor="login-email" required>
        <Input id="login-email" type="email" placeholder="Enter your email" autoComplete="email" />
      </Field>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
        <InfoIcon className="h-3.5 w-3.5 text-blue-500 cursor-help flex-shrink-0" />
      </div>

      <Button className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white">Continue</Button>

      <InlineDivider label="Or login with:" />

      <SocialButton icon={<KeyRoundIcon className="h-4 w-4" />} label="Passkey" />

      <InlineDivider label="Or continue with:" />

      <div className="flex flex-col gap-2">
        <SocialButton icon={<GoogleIcon />}    label="Google" />
        <SocialButton icon={<MicrosoftIcon />} label="Microsoft" />
        <SocialButton icon={<AppleIcon />}     label="Apple" />
        <SocialButton icon={<SlackIcon />}     label="Slack" />
      </div>

      <div className="text-center text-sm">
        <a href="#" className="text-[#0052CC] hover:underline">Can't log in?</a>
        <span className="text-muted-foreground mx-2">·</span>
        <a href="#" className="text-[#0052CC] hover:underline">Create an account</a>
      </div>

      <Separator />

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5">
          <AtlassianLogo />
          <span className="text-xs font-bold tracking-widest uppercase text-foreground">Atlassian</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          One account for Nexus, Confluence, Trello and more.
        </p>
        <div className="flex items-center gap-2 text-xs">
          <a href="#" className="text-[#0052CC] hover:underline">Privacy Policy ↗</a>
          <span className="text-muted-foreground">·</span>
          <a href="#" className="text-[#0052CC] hover:underline">User Notice ↗</a>
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: 'Pages/Auth/Login',
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '800px' } },
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
        <LoginCard />
      </div>
    </div>
  ),
}

export const CardOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <LoginCard />
    </div>
  ),
}
