import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { Bar, BarChart } from 'recharts'
import { ChartContainer, type ChartConfig } from './Chart'

const config: ChartConfig = {
  sales: { label: 'Sales', color: '#2563eb' },
}

const data = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 200 },
]

describe('ChartContainer', () => {
  it('renders the chart container', () => {
    render(
      <ChartContainer config={config} data-testid="chart">
        <BarChart data={data}>
          <Bar dataKey="sales" />
        </BarChart>
      </ChartContainer>
    )
    expect(document.querySelector('[data-slot="chart"]')).toBeInTheDocument()
  })

  it('applies data-chart attribute', () => {
    render(
      <ChartContainer config={config} id="test-chart">
        <BarChart data={data}>
          <Bar dataKey="sales" />
        </BarChart>
      </ChartContainer>
    )
    const chartEl = document.querySelector('[data-chart]')
    expect(chartEl).toBeInTheDocument()
    expect(chartEl?.getAttribute('data-chart')).toContain('chart-test-chart')
  })
})
