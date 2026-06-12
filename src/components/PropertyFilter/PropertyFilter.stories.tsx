import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PropertyFilter, type PropertyFilterQuery } from './PropertyFilter'

const meta = {
  title: 'Forms/PropertyFilter',
  component: PropertyFilter,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    query: { control: false },
    onChange: { action: 'onChange' },
    filteringProperties: { control: false },
    filteringOptions: { control: false },
    filteringPlaceholder: { control: 'text' },
    filteringAriaLabel: { control: 'text' },
    countText: { control: 'text' },
    filteringConstraintText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof PropertyFilter>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data ───────────────────────────────────────────────────────────────

const filteringProperties = [
  {
    key: 'instanceid',
    operators: ['=', '!=', ':', '!:', '^', '!^'] as const,
    propertyLabel: 'Instance ID',
    groupValuesLabel: 'Instance ID values',
  },
  {
    key: 'state',
    operators: [
      { operator: '=' as const, tokenType: 'enum' as const },
      { operator: '!=' as const, tokenType: 'enum' as const },
      ':' as const, '!:' as const,
    ],
    propertyLabel: 'State',
    groupValuesLabel: 'State values',
  },
  {
    key: 'instancetype',
    operators: [
      { operator: '=' as const, tokenType: 'enum' as const },
      { operator: '!=' as const, tokenType: 'enum' as const },
      ':' as const,
    ],
    propertyLabel: 'Instance type',
    groupValuesLabel: 'Instance type values',
  },
  {
    key: 'averagelatency',
    operators: ['=', '!=', '>', '<', '<=', '>='] as const,
    propertyLabel: 'Average latency',
    groupValuesLabel: 'Average latency values',
  },
]

const filteringOptions = [
  { propertyKey: 'instanceid', value: 'i-2dc5ce28a0328391' },
  { propertyKey: 'instanceid', value: 'i-d0312e022392efa0' },
  { propertyKey: 'instanceid', value: 'i-070eef935c1301e6' },
  { propertyKey: 'instanceid', value: 'i-3b44795b1fea36ac' },
  { propertyKey: 'state', value: 'Stopped' },
  { propertyKey: 'state', value: 'Stopping' },
  { propertyKey: 'state', value: 'Pending' },
  { propertyKey: 'state', value: 'Running' },
  { propertyKey: 'instancetype', value: 't3.small' },
  { propertyKey: 'instancetype', value: 't3.medium' },
  { propertyKey: 'instancetype', value: 't2.micro' },
  { propertyKey: 'instancetype', value: 't2.small' },
  { propertyKey: 'averagelatency', value: '17' },
  { propertyKey: 'averagelatency', value: '107' },
  { propertyKey: 'averagelatency', value: '236' },
  { propertyKey: 'averagelatency', value: '402' },
]

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: function DefaultFilter() {
    const [query, setQuery] = React.useState<PropertyFilterQuery>({ tokens: [], operation: 'and' })
    return (
      <PropertyFilter
        query={query}
        onChange={setQuery}
        filteringProperties={filteringProperties}
        filteringOptions={filteringOptions}
        filteringPlaceholder="Find distributions"
        filteringAriaLabel="Find distributions"
        countText="5 matches"
      />
    )
  },
  args: { query: { tokens: [], operation: 'and' }, filteringProperties: [], onChange: () => {} },
}

export const WithActiveTokens: Story = {
  render: function ActiveTokensFilter() {
    const [query, setQuery] = React.useState<PropertyFilterQuery>({
      tokens: [
        { propertyKey: 'instanceid', operator: '=', value: 'i-2dc5ce28a0328391' },
        { propertyKey: 'averagelatency', operator: '>', value: '107' },
        { propertyKey: 'instancetype', operator: '!^', value: 't3.small' },
        { propertyKey: 'state', operator: '!=', value: 'Stopping' },
      ],
      operation: 'and',
    })
    return (
      <PropertyFilter
        query={query}
        onChange={setQuery}
        filteringProperties={filteringProperties}
        filteringOptions={filteringOptions}
        filteringPlaceholder="Find distributions"
        filteringAriaLabel="Find distributions"
        countText="5 matches"
      />
    )
  },
  args: { query: { tokens: [], operation: 'and' }, filteringProperties: [], onChange: () => {} },
  parameters: {
    docs: {
      description: {
        story:
          'Pre-seeded with four active tokens. Click the "and" connector between tokens to toggle between AND / OR operation.',
      },
    },
  },
}

export const WithConstraintText: Story = {
  render: function ConstrainedFilter() {
    const [query, setQuery] = React.useState<PropertyFilterQuery>({ tokens: [], operation: 'and' })
    return (
      <PropertyFilter
        query={query}
        onChange={setQuery}
        filteringProperties={filteringProperties}
        filteringOptions={filteringOptions}
        filteringPlaceholder="Find distributions"
        filteringAriaLabel="Find distributions"
        filteringConstraintText="You can apply up to 2 filters."
        countText="5 matches"
      />
    )
  },
  args: { query: { tokens: [], operation: 'and' }, filteringProperties: [], onChange: () => {} },
}

export const Disabled: Story = {
  render: function DisabledFilter() {
    return (
      <PropertyFilter
        query={{ tokens: [], operation: 'and' }}
        onChange={() => {}}
        filteringProperties={filteringProperties}
        filteringPlaceholder="Find distributions"
        disabled
      />
    )
  },
  args: { query: { tokens: [], operation: 'and' }, filteringProperties: [], onChange: () => {} },
}
