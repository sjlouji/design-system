import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  TrendingUpIcon,
  UsersIcon,
  ActivityIcon,
  ArrowUpRightIcon,
  LayoutDashboardIcon,
  BarChart3Icon,
  FileTextIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  SparklesIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ClockIcon,
  DownloadIcon,
  FilterIcon,
  ChevronRightIcon,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { StatCard } from '@/components/StatCard'
import { ChartContainer, type ChartConfig } from '@/components/Chart'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs'
import { Timeline } from '@/components/Timeline'
import type { TimelineItem } from '@/components/Timeline'
import { cn } from '@/lib/utils'

// ── Data ─────────────────────────────────────────────────────────────────────

const revenueData = [
  { month: 'Jan', revenue: 38400, target: 40000 },
  { month: 'Feb', revenue: 42100, target: 41000 },
  { month: 'Mar', revenue: 39800, target: 42000 },
  { month: 'Apr', revenue: 51200, target: 44000 },
  { month: 'May', revenue: 47600, target: 46000 },
  { month: 'Jun', revenue: 58900, target: 48000 },
  { month: 'Jul', revenue: 53400, target: 50000 },
  { month: 'Aug', revenue: 61200, target: 52000 },
  { month: 'Sep', revenue: 67800, target: 54000 },
  { month: 'Oct', revenue: 63100, target: 56000 },
  { month: 'Nov', revenue: 71400, target: 58000 },
  { month: 'Dec', revenue: 79200, target: 60000 },
]

const revenueConfig = {
  revenue: { label: 'Revenue', color: 'oklch(0.555 0.225 283)' },
  target: { label: 'Target', color: 'oklch(0.75 0.06 265)' },
} satisfies ChartConfig

const transactions = [
  { id: 'TXN-8841', customer: 'Meridian Labs', email: 'billing@meridian.io', plan: 'Enterprise', amount: '$2,400', status: 'paid', date: 'Dec 12' },
  { id: 'TXN-8840', customer: 'Vertex Studio', email: 'ops@vertexstudio.co', plan: 'Pro', amount: '$89', status: 'paid', date: 'Dec 11' },
  { id: 'TXN-8839', customer: 'Thornfield Co', email: 'admin@thornfield.com', plan: 'Pro', amount: '$89', status: 'pending', date: 'Dec 11' },
  { id: 'TXN-8838', customer: 'Halcyon Digital', email: 'finance@halcyon.io', plan: 'Enterprise', amount: '$2,400', status: 'paid', date: 'Dec 10' },
  { id: 'TXN-8837', customer: 'Orion Systems', email: 'pay@orion.dev', plan: 'Starter', amount: '$19', status: 'failed', date: 'Dec 10' },
  { id: 'TXN-8836', customer: 'Solara Health', email: 'accounts@solara.health', plan: 'Enterprise', amount: '$2,400', status: 'paid', date: 'Dec 9' },
]

const activity: TimelineItem[] = [
  {
    id: '1',
    title: 'New enterprise contract signed',
    description: 'Meridian Labs — Annual plan, $28,800',
    timestamp: '14 min ago',
    status: 'success',
    icon: <CheckCircle2Icon className="size-3" />,
  },
  {
    id: '2',
    title: 'Payment failed — retry scheduled',
    description: 'Orion Systems — $19 Starter plan',
    timestamp: '1 hr ago',
    status: 'error',
    icon: <AlertCircleIcon className="size-3" />,
  },
  {
    id: '3',
    title: 'Thornfield Co pending review',
    description: 'Manual verification required',
    timestamp: '3 hr ago',
    status: 'warning',
    icon: <ClockIcon className="size-3" />,
  },
  {
    id: '4',
    title: 'Halcyon Digital renewed',
    description: 'Enterprise plan renewed for 12 months',
    timestamp: 'Yesterday',
    status: 'success',
    icon: <CheckCircle2Icon className="size-3" />,
  },
  {
    id: '5',
    title: '47 new trial signups',
    description: 'Organic channel spike — campaign active',
    timestamp: 'Yesterday',
    status: 'default',
  },
]

const navItems = [
  { icon: LayoutDashboardIcon, label: 'Overview', active: true },
  { icon: BarChart3Icon, label: 'Analytics' },
  { icon: UsersIcon, label: 'Customers' },
  { icon: FileTextIcon, label: 'Invoices' },
  { icon: SettingsIcon, label: 'Settings' },
]

const statusMap = {
  paid: 'bg-[oklch(0.94_0.04_160)] text-[oklch(0.38_0.12_160)] dark:bg-[oklch(0.22_0.06_160)] dark:text-[oklch(0.72_0.15_160)]',
  pending: 'bg-[oklch(0.96_0.05_85)] text-[oklch(0.45_0.15_85)] dark:bg-[oklch(0.22_0.05_85)] dark:text-[oklch(0.78_0.14_85)]',
  failed: 'bg-[oklch(0.95_0.04_29)] text-[oklch(0.45_0.18_29)] dark:bg-[oklch(0.20_0.06_29)] dark:text-[oklch(0.72_0.16_29)]',
}

// ── Page ─────────────────────────────────────────────────────────────────────

function AnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState('12m')

  return (
    <div className="flex h-screen bg-background overflow-hidden font-[Geist,sans-serif]">

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside className="w-[220px] shrink-0 border-r border-border/60 bg-card flex flex-col">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border/60">
          <div className="size-7 rounded-lg bg-[linear-gradient(135deg,oklch(0.555_0.225_283),oklch(0.52_0.22_220))] flex items-center justify-center shrink-0 shadow-sm">
            <SparklesIcon className="size-3.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Meridian</p>
            <p className="text-[10px] text-muted-foreground">Analytics</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors duration-100 text-left',
                active
                  ? 'bg-primary/8 text-primary font-medium dark:bg-primary/15'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-border/60">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <Avatar className="size-7 shrink-0">
              <AvatarFallback className="text-[10px] bg-[linear-gradient(135deg,oklch(0.555_0.225_283),oklch(0.52_0.22_220))] text-white font-semibold">
                JL
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium truncate">Joan Louji</p>
              <p className="text-[10px] text-muted-foreground truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="border-b border-border/60 bg-card/50 px-6 py-3 flex items-center gap-4 shrink-0">
          <div className="flex-1">
            <nav className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Meridian</span>
              <ChevronRightIcon className="size-3" />
              <span className="text-foreground font-medium">Overview</span>
            </nav>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              className="pl-8 pr-3 h-7 text-xs bg-muted/60 border border-border/40 rounded-md outline-none focus:border-primary/40 focus:bg-background w-48 placeholder:text-muted-foreground/60 transition-colors"
              placeholder="Search…"
            />
          </div>
          <Button variant="ghost" size="icon-sm" className="relative">
            <BellIcon className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          </Button>
          <Avatar className="size-7 cursor-pointer">
            <AvatarFallback className="text-[10px] bg-[linear-gradient(135deg,oklch(0.555_0.225_283),oklch(0.52_0.22_220))] text-white font-semibold">
              JL
            </AvatarFallback>
          </Avatar>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 max-w-[1200px] space-y-6">

            {/* Page header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
                <p className="text-sm text-muted-foreground mt-0.5">December 2026 · All workspaces</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
                  <FilterIcon className="size-3.5" /> Filter
                </Button>
                <Button size="sm" className="gap-1.5 h-8 text-xs">
                  <DownloadIcon className="size-3.5" /> Export
                </Button>
              </div>
            </div>

            {/* ── Bento stat grid (asymmetric) ────────────────────── */}
            {/* Layout: [large revenue card 2col] [2 stacked right] */}
            <div className="grid grid-cols-3 gap-4">

              {/* Large primary stat — col-span-2 */}
              <div className="col-span-2 bg-card border border-border/60 rounded-xl p-5 flex flex-col justify-between min-h-[130px]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Annual Recurring Revenue</p>
                    <p className="text-4xl font-bold tracking-tight mt-1.5">$847,200</p>
                  </div>
                  <div className="size-9 rounded-lg bg-primary/8 dark:bg-primary/15 flex items-center justify-center">
                    <TrendingUpIcon className="size-4 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-xs font-medium text-[oklch(0.5_0.15_160)] dark:text-[oklch(0.72_0.15_160)] bg-[oklch(0.94_0.04_160)] dark:bg-[oklch(0.22_0.06_160)] px-2 py-0.5 rounded-full">
                    ↑ 23.4% vs last year
                  </span>
                  <span className="text-xs text-muted-foreground">Target: $820,000 · on track</span>
                </div>
              </div>

              {/* Right column: 2 stacked narrow */}
              <div className="flex flex-col gap-4">
                <StatCard
                  label="Active Customers"
                  value="1,847"
                  trend={{ value: 12.1, label: 'vs last month' }}
                  icon={<UsersIcon className="size-4" />}
                  className="flex-1"
                />
                <StatCard
                  label="Avg. Revenue / User"
                  value="$458"
                  trend={{ value: 8.3, label: 'vs last month' }}
                  icon={<ActivityIcon className="size-4" />}
                  className="flex-1"
                />
              </div>

              {/* Bottom row: 3 equal-ish but with variance */}
              <div className="bg-card border border-border/60 rounded-xl p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">MRR</p>
                <p className="text-2xl font-bold tracking-tight mt-1">$70,600</p>
                <p className="text-xs text-[oklch(0.5_0.15_160)] dark:text-[oklch(0.72_0.15_160)] mt-2">↑ 6.2% this month</p>
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Churn Rate</p>
                <p className="text-2xl font-bold tracking-tight mt-1">1.8%</p>
                <p className="text-xs text-[oklch(0.5_0.15_160)] dark:text-[oklch(0.72_0.15_160)] mt-2">↓ 0.4pp · best month</p>
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">NPS Score</p>
                <p className="text-2xl font-bold tracking-tight mt-1">71</p>
                <p className="text-xs text-muted-foreground/70 mt-2">Based on 384 responses</p>
              </div>
            </div>

            {/* ── Revenue chart ───────────────────────────────────── */}
            <div className="bg-card border border-border/60 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold">Revenue vs Target</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Monthly performance over the past year</p>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="h-7">
                    {['3m', '6m', '12m'].map(v => (
                      <TabsTrigger key={v} value={v} className="text-xs px-2.5 h-[calc(100%-2px)]">{v}</TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <ChartContainer config={revenueConfig} className="h-[220px] w-full">
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.555 0.225 283)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="oklch(0.555 0.225 283)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0 / 0.5)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'oklch(0.55 0 0)' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'oklch(0.55 0 0)' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(v: number, name: string) => [`$${v.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Target']}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid oklch(0.9 0 0 / 0.4)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="oklch(0.555 0.225 283)" strokeWidth={2} fill="url(#revGrad)" dot={false} />
                  <Area type="monotone" dataKey="target" stroke="oklch(0.75 0.06 265)" strokeWidth={1.5} fill="none" strokeDasharray="4 4" dot={false} />
                </AreaChart>
              </ChartContainer>
            </div>

            {/* ── Bottom: Transactions + Activity ──────────────────── */}
            <div className="grid grid-cols-5 gap-4">

              {/* Transactions table — 3/5 */}
              <div className="col-span-3 bg-card border border-border/60 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60">
                  <h2 className="text-sm font-semibold">Recent Transactions</h2>
                  <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                    View all <ArrowUpRightIcon className="size-3" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="text-left px-5 py-2.5 text-muted-foreground font-medium">Customer</th>
                        <th className="text-left px-3 py-2.5 text-muted-foreground font-medium">Plan</th>
                        <th className="text-right px-3 py-2.5 text-muted-foreground font-medium">Amount</th>
                        <th className="text-center px-3 py-2.5 text-muted-foreground font-medium">Status</th>
                        <th className="text-right px-5 py-2.5 text-muted-foreground font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, i) => (
                        <tr key={tx.id} className={cn('border-b border-border/30 hover:bg-muted/30 transition-colors', i === transactions.length - 1 && 'border-0')}>
                          <td className="px-5 py-3">
                            <div>
                              <p className="font-medium text-foreground">{tx.customer}</p>
                              <p className="text-muted-foreground text-[10px] mt-0.5">{tx.email}</p>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-muted-foreground">{tx.plan}</span>
                          </td>
                          <td className="px-3 py-3 text-right font-mono font-medium tabular-nums">{tx.amount}</td>
                          <td className="px-3 py-3 text-center">
                            <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium capitalize', statusMap[tx.status as keyof typeof statusMap])}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right text-muted-foreground">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity — 2/5 */}
              <div className="col-span-2 bg-card border border-border/60 rounded-xl">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60">
                  <h2 className="text-sm font-semibold">Activity</h2>
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5">Live</Badge>
                </div>
                <div className="px-5 py-4">
                  <Timeline items={activity} />
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Pages/Analytics',
  component: AnalyticsPage,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '700px' } },
  },
} satisfies Meta<typeof AnalyticsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
