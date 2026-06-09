import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartContainer, type ChartConfig } from './Chart'

const meta = {
  title: 'Components/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

const barData = [
  { month: 'Jan', sales: 186 },
  { month: 'Feb', sales: 305 },
  { month: 'Mar', sales: 237 },
  { month: 'Apr', sales: 273 },
  { month: 'May', sales: 209 },
  { month: 'Jun', sales: 214 },
]

const barConfig = {
  sales: {
    label: 'Sales',
    color: '#2563eb',
  },
} satisfies ChartConfig

export const BarChartStory: Story = {
  name: 'BarChart',
  render: () => (
    <ChartContainer config={barConfig} className="h-[300px] w-[500px]">
      <BarChart data={barData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Bar dataKey="sales" fill="var(--color-sales)" />
      </BarChart>
    </ChartContainer>
  ),
}

const lineData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 1900 },
  { month: 'Mar', revenue: 1500 },
  { month: 'Apr', revenue: 2100 },
  { month: 'May', revenue: 1800 },
  { month: 'Jun', revenue: 2400 },
]

const lineConfig = {
  revenue: {
    label: 'Revenue',
    color: '#16a34a',
  },
} satisfies ChartConfig

export const LineChartStory: Story = {
  name: 'LineChart',
  render: () => (
    <ChartContainer config={lineConfig} className="h-[300px] w-[500px]">
      <LineChart data={lineData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" />
      </LineChart>
    </ChartContainer>
  ),
}
