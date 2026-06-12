import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography, H1, H2, H3, H4, P, Lead, Muted, Code } from './Typography'

const meta = {
  title: 'Typography/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'lead', 'large', 'small', 'muted', 'blockquote', 'code', 'list'],
      description: 'The typographic variant — controls both element and visual style.',
    },
    as: {
      control: 'text',
      description: 'Override the rendered HTML element regardless of the variant.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the element.',
    },
    children: {
      control: 'text',
      description: 'Text content or nested elements.',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

// ─── Individual variants ───────────────────────────────────────────────────

export const H1Variant: Story = {
  name: 'Variant: h1',
  args: {
    variant: 'h1',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}

export const H2Variant: Story = {
  name: 'Variant: h2',
  args: {
    variant: 'h2',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}

export const H3Variant: Story = {
  name: 'Variant: h3',
  args: {
    variant: 'h3',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}

export const H4Variant: Story = {
  name: 'Variant: h4',
  args: {
    variant: 'h4',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}

export const PVariant: Story = {
  name: 'Variant: p',
  args: {
    variant: 'p',
    children:
      'Body text for reading. Comfortable line height makes longer passages of copy easier to scan and comprehend for all users.',
  },
}

export const LeadVariant: Story = {
  name: 'Variant: lead',
  args: {
    variant: 'lead',
    children:
      'A lead paragraph draws attention to the most important summary of a page or section.',
  },
}

export const LargeVariant: Story = {
  name: 'Variant: large',
  args: {
    variant: 'large',
    children: 'Large text with semibold weight',
  },
}

export const SmallVariant: Story = {
  name: 'Variant: small',
  args: {
    variant: 'small',
    children: 'Small text rendered with medium weight and tighter leading',
  },
}

export const MutedVariant: Story = {
  name: 'Variant: muted',
  args: {
    variant: 'muted',
    children: 'Secondary information rendered in a subdued foreground colour.',
  },
}

export const BlockquoteVariant: Story = {
  name: 'Variant: blockquote',
  args: {
    variant: 'blockquote',
    children:
      '"Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs',
  },
}

export const CodeVariant: Story = {
  name: 'Variant: code',
  args: {
    variant: 'code',
    children: 'const greeting = "Hello, world!"',
  },
}

export const ListVariant: Story = {
  name: 'Variant: list',
  render: () => (
    <Typography variant="list" as="ul">
      <li>Accessible by default</li>
      <li>Composable and flexible</li>
      <li>Styled with Tailwind CSS v4</li>
      <li>TypeScript-first API</li>
    </Typography>
  ),
}

// ─── Convenience component exports ────────────────────────────────────────

export const ConvenienceComponents: Story = {
  name: 'Convenience components',
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      <H1>H1 convenience component</H1>
      <H2>H2 convenience component</H2>
      <H3>H3 convenience component</H3>
      <H4>H4 convenience component</H4>
      <P>P convenience component — body text rendered as a paragraph element.</P>
      <Lead>Lead convenience component — introductory paragraph in muted foreground.</Lead>
      <Muted>Muted convenience component — subdued helper text.</Muted>
      <Code>code.convenience()</Code>
    </div>
  ),
}

// ─── All variants at a glance ─────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5 max-w-xl">
      <Typography variant="h1">Heading 1 — text-4xl bold</Typography>
      <Typography variant="h2">Heading 2 — text-3xl semibold</Typography>
      <Typography variant="h3">Heading 3 — text-2xl semibold</Typography>
      <Typography variant="h4">Heading 4 — text-xl semibold</Typography>
      <Typography variant="p">
        Paragraph — The quick brown fox jumps over the lazy dog. Comfortable line height
        for reading.
      </Typography>
      <Typography variant="lead">
        Lead — An introductory paragraph in muted foreground at larger size.
      </Typography>
      <Typography variant="large">Large — semibold, slightly bigger than body.</Typography>
      <Typography variant="small">Small — text-sm, medium weight, tight leading.</Typography>
      <Typography variant="muted">Muted — text-sm in muted-foreground for helper copy.</Typography>
      <Typography variant="blockquote">
        Blockquote — "Great design is making something memorable and meaningful."
      </Typography>
      <Typography variant="code">const x = computeValue(42)</Typography>
      <Typography variant="list" as="ul">
        <li>List item one</li>
        <li>List item two</li>
        <li>List item three</li>
      </Typography>
    </div>
  ),
}

// ─── Heading scale ────────────────────────────────────────────────────────

export const HeadingScale: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">Page Title — h1</Typography>
      <Typography variant="h2">Section Header — h2</Typography>
      <Typography variant="h3">Subsection — h3</Typography>
      <Typography variant="h4">Card Title — h4</Typography>
    </div>
  ),
}

// ─── Body copy ────────────────────────────────────────────────────────────

export const BodyCopy: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-prose">
      <Typography variant="lead">
        An introductory lead paragraph that gives the reader a high-level overview of
        what follows on the page.
      </Typography>
      <Typography variant="p">
        Body text for reading. It uses a comfortable line height of 1.75 to keep longer
        passages scannable and legible. This is the default variant used for prose content.
      </Typography>
      <Typography variant="muted">
        A muted caption or helper text providing secondary context without competing for
        visual weight.
      </Typography>
    </div>
  ),
}

// ─── Inline code ─────────────────────────────────────────────────────────

export const InlineCode: Story = {
  render: () => (
    <Typography variant="p">
      Install the package by running{' '}
      <Typography variant="code" as="code">
        npm install @acme/design-system
      </Typography>{' '}
      then import components from{' '}
      <Typography variant="code" as="code">
        @acme/design-system
      </Typography>
      .
    </Typography>
  ),
}

// ─── Custom element override ──────────────────────────────────────────────

export const ElementOverride: Story = {
  name: 'Prop: as (element override)',
  render: () => (
    <div className="flex flex-col gap-3">
      <Typography variant="h2" as="h1">
        h2 styles, rendered as &lt;h1&gt;
      </Typography>
      <Typography variant="p" as="span">
        p styles, rendered as &lt;span&gt;
      </Typography>
      <Typography variant="muted" as="label">
        muted styles, rendered as &lt;label&gt;
      </Typography>
    </div>
  ),
}

// ─── Article layout ───────────────────────────────────────────────────────

export const ArticleLayout: Story = {
  render: () => (
    <article className="flex flex-col gap-4 max-w-prose">
      <Typography variant="h1">Getting Started with the Design System</Typography>
      <Typography variant="lead">
        Everything you need to build consistent, accessible user interfaces using our
        shared component library.
      </Typography>
      <Typography variant="h2">Installation</Typography>
      <Typography variant="p">
        Add the package to your project using your preferred package manager. The
        library ships with full TypeScript definitions and tree-shakeable ESM output.
      </Typography>
      <Typography variant="code">npm install @acme/design-system</Typography>
      <Typography variant="h2">Usage</Typography>
      <Typography variant="p">
        Import individual components by name. Each component is self-contained and
        does not require a global provider unless noted in its documentation.
      </Typography>
      <Typography variant="blockquote">
        "Build once, use everywhere — that's the promise of a well-designed system."
      </Typography>
      <Typography variant="h3">Component conventions</Typography>
      <Typography variant="list" as="ul">
        <li>Functional components with named exports</li>
        <li>Full TypeScript props interfaces</li>
        <li>Accessible by default via Radix UI primitives</li>
        <li>Styled using Tailwind CSS v4 utility classes</li>
      </Typography>
      <Typography variant="muted">Last updated June 2026 · 5 min read</Typography>
    </article>
  ),
}
