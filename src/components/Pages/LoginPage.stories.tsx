import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  SparklesIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { Input } from '@/components/Input'
import { Separator } from '@/components/Separator'
import { cn } from '@/lib/utils'

// ── Inline brand SVGs ─────────────────────────────────────────────────────────

function GitHubLogo() {
  return (
    <svg role="img" viewBox="0 0 24 24" className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function GoogleLogo() {
  return (
    <svg role="img" viewBox="0 0 24 24" className="size-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
    </svg>
  )
}

// ── Password input (standalone component) ─────────────────────────────────────

interface PasswordFieldProps {
  id: string
  label: string
  showPassword: boolean
  onToggleShow: () => void
}

function PasswordField({ id, label, showPassword, onToggleShow }: PasswordFieldProps) {
  return (
    <Field label={label} htmlFor={id}>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••••••"
          className="pr-10"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </button>
      </div>
    </Field>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: 'Meridian cut our research cycle from 3 weeks to 3 days. It\'s the most impactful tool we\'ve shipped this decade.',
    author: 'Priya Mehta',
    role: 'VP of Engineering',
    company: 'Loom',
    avatar: 'PM',
  },
  {
    quote: 'Finally an AI platform that doesn\'t feel like a science experiment. Our whole team adopted it within a week.',
    author: 'James Okafor',
    role: 'Head of Product',
    company: 'Vercel',
    avatar: 'JO',
  },
  {
    quote: 'The quality of output is genuinely different. It reasons, it cites, and it knows when it doesn\'t know.',
    author: 'Sofia Lindqvist',
    role: 'Chief of Staff',
    company: 'Notion',
    avatar: 'SL',
  },
]

const trustLogos = ['Vercel', 'Linear', 'Notion', 'Loom', 'Figma', 'Stripe']

// ── Left brand panel ──────────────────────────────────────────────────────────

function BrandPanel() {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0)

  React.useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[activeTestimonial]

  return (
    <div className="relative flex flex-col h-full bg-[oklch(0.085_0.012_265)] overflow-hidden select-none">
      {/* Ambient glow */}
      <div className="absolute top-[-120px] left-[-80px] size-[400px] rounded-full bg-[oklch(0.555_0.225_283)] opacity-[0.12] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-60px] size-[300px] rounded-full bg-[oklch(0.52_0.22_220)] opacity-[0.10] blur-[100px] pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5 px-10 pt-10">
        <div className="size-8 rounded-xl bg-[linear-gradient(135deg,oklch(0.555_0.225_283),oklch(0.52_0.22_220))] flex items-center justify-center shadow-lg">
          <SparklesIcon className="size-4 text-white" />
        </div>
        <span className="text-base font-semibold tracking-tight text-white">Meridian</span>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.685_0.20_283)] mb-6">
          Trusted by 4,000+ teams
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white leading-[1.2] mb-3">
          Intelligence that works
          <br />
          <span className="text-[oklch(0.685_0.20_283)]">as hard as you do.</span>
        </h2>
        <p className="text-sm text-[oklch(0.72_0.04_265)] max-w-xs leading-relaxed">
          Meridian is the AI research and writing platform built for teams who ship.
          Faster synthesis, deeper reasoning, no hallucinations.
        </p>

        {/* Testimonial card */}
        <div className="mt-10">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm text-white/90 leading-relaxed italic mb-4">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="size-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, oklch(0.555 0.225 283), oklch(0.52 0.22 220))' }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{t.author}</p>
                <p className="text-xs text-white/50">{t.role} · {t.company}</p>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mt-4 justify-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === activeTestimonial
                    ? 'w-4 h-1.5 bg-[oklch(0.685_0.20_283)]'
                    : 'size-1.5 bg-white/20 hover:bg-white/40',
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust logos */}
      <div className="relative z-10 px-10 pb-10">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">
          Powering teams at
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          {trustLogos.map((logo) => (
            <span key={logo} className="text-xs font-semibold text-white/25 tracking-wide">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Auth form ─────────────────────────────────────────────────────────────────

type AuthView = 'login' | 'signup' | 'forgot'

function AuthForm() {
  const [view, setView] = React.useState<AuthView>('login')
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  const toggleShow = React.useCallback(() => setShowPassword((s) => !s), [])

  return (
    <div className="flex flex-col h-full justify-center px-10 lg:px-16 max-w-[440px] mx-auto w-full py-12">
      {/* Header */}
      <div className="mb-8">
        {view === 'login' && (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1.5">Sign in to your Meridian workspace.</p>
          </>
        )}
        {view === 'signup' && (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1.5">Start your 14-day free trial. No card required.</p>
          </>
        )}
        {view === 'forgot' && (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Reset your password</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Enter your email and we'll send a reset link within a minute.
            </p>
          </>
        )}
      </div>

      {/* Social buttons */}
      {view !== 'forgot' && (
        <>
          <div className="flex flex-col gap-2.5 mb-6">
            <Button variant="outline" className="w-full gap-2.5 h-10 text-sm font-medium">
              <GitHubLogo />
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full gap-2.5 h-10 text-sm font-medium">
              <GoogleLogo />
              Continue with Google
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
              or continue with email
            </span>
          </div>
        </>
      )}

      {/* Form fields */}
      <div className="space-y-4">
        {view === 'signup' && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" htmlFor="fn">
              <Input id="fn" placeholder="Maya" autoComplete="given-name" />
            </Field>
            <Field label="Last name" htmlFor="ln">
              <Input id="ln" placeholder="Andersen" autoComplete="family-name" />
            </Field>
          </div>
        )}

        <Field label="Email address" htmlFor="email">
          <Input id="email" type="email" placeholder="you@company.com" autoComplete="email" />
        </Field>

        {view !== 'forgot' && (
          <PasswordField
            id="password"
            label="Password"
            showPassword={showPassword}
            onToggleShow={toggleShow}
          />
        )}

        {view === 'signup' && (
          <PasswordField
            id="confirm-password"
            label="Confirm password"
            showPassword={showPassword}
            onToggleShow={toggleShow}
          />
        )}
      </div>

      {/* Remember me + forgot (login only) */}
      {view === 'login' && (
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div
              onClick={() => setRememberMe((v) => !v)}
              className={cn(
                'size-4 rounded border transition-colors flex items-center justify-center cursor-pointer',
                rememberMe
                  ? 'bg-primary border-primary'
                  : 'border-input bg-background group-hover:border-muted-foreground',
              )}
            >
              {rememberMe && (
                <svg viewBox="0 0 12 12" className="size-2.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1.5,6 4.5,9 10.5,3" />
                </svg>
              )}
            </div>
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setView('forgot')}
            className="text-sm text-primary hover:underline underline-offset-2"
          >
            Forgot password?
          </button>
        </div>
      )}

      {/* CTA */}
      <Button className="w-full mt-6 gap-2 h-10 text-sm font-semibold">
        {view === 'login' && 'Sign in'}
        {view === 'signup' && 'Create account'}
        {view === 'forgot' && 'Send reset link'}
        <ArrowRightIcon className="size-4" />
      </Button>

      {/* Switch view */}
      <p className="text-sm text-muted-foreground text-center mt-6">
        {view === 'login' && (
          <>
            Don't have an account?{' '}
            <button onClick={() => setView('signup')} className="text-foreground font-medium hover:underline underline-offset-2">
              Sign up free
            </button>
          </>
        )}
        {view === 'signup' && (
          <>
            Already have an account?{' '}
            <button onClick={() => setView('login')} className="text-foreground font-medium hover:underline underline-offset-2">
              Sign in
            </button>
          </>
        )}
        {view === 'forgot' && (
          <button onClick={() => setView('login')} className="text-foreground font-medium hover:underline underline-offset-2">
            ← Back to sign in
          </button>
        )}
      </p>

      {/* Legal (signup only) */}
      {view === 'signup' && (
        <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
          By creating an account you agree to our{' '}
          <span className="text-foreground hover:underline cursor-pointer underline-offset-2">Terms of Service</span>{' '}
          and{' '}
          <span className="text-foreground hover:underline cursor-pointer underline-offset-2">Privacy Policy</span>.
        </p>
      )}
    </div>
  )
}

// ── Shell ─────────────────────────────────────────────────────────────────────

function LoginShell() {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Left — brand panel */}
      <div className="hidden lg:block w-[45%] shrink-0">
        <BrandPanel />
      </div>

      {/* Right — auth form */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 px-6 pt-6 mb-2">
          <div className="size-7 rounded-lg bg-[linear-gradient(135deg,oklch(0.555_0.225_283),oklch(0.52_0.22_220))] flex items-center justify-center">
            <SparklesIcon className="size-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Meridian</span>
        </div>

        <AuthForm />

        {/* Footer */}
        <div className="px-10 pb-6 mt-auto">
          <p className="text-xs text-muted-foreground/60 text-center">
            © 2026 Meridian AI Inc. · Privacy · Terms · Security
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/LoginPage',
  component: LoginShell,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta<typeof LoginShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
