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
  argTypes: {
    config: {
      control: false,
      description:
        'Mapping of data keys to display configuration. Each key can specify a `label` (used in tooltips and legends), an `icon` component, and either a static `color` string or a `theme` map with per-theme colour values (light/dark). CSS custom properties are generated from this config and consumed via `var(--color-<key>)`.',
    },
    children: {
      control: false,
      description:
        'A Recharts chart element (e.g. `<BarChart>`, `<LineChart>`) passed as the child of `ResponsiveContainer`. Must be a valid Recharts component.',
    },
    initialDimension: {
      control: false,
      description:
        'Initial width and height (in px) passed to `ResponsiveContainer` before it measures its parent. Defaults to `{ width: 320, height: 200 }`. Useful for SSR or fixed-size layouts.',
    },
    id: {
      control: 'text',
      description:
        'Optional stable ID for the chart element. Used to scope the generated CSS custom property block. Auto-generated from `React.useId()` when omitted.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root `div` wrapper.',
    },
  },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

const defaultData = [
  { month: 'Jan', value: 186 },
  { month: 'Feb', value: 305 },
  { month: 'Mar', value: 237 },
  { month: 'Apr', value: 273 },
  { month: 'May', value: 209 },
  { month: 'Jun', value: 214 },
]

const defaultConfig = {
  value: { label: 'Value', color: '#2563eb' },
} satisfies ChartConfig

export const Default: Story = {
  args: {
    config: defaultConfig,
    children: (
      <BarChart data={defaultData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Bar dataKey="value" fill="var(--color-value)" />
      </BarChart>
    ),
  },
  render: (args) => (
    <ChartContainer {...args} className="h-[300px] w-[500px]" />
  ),
}

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

export const BarChartStory = {
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

export const LineChartStory = {
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
