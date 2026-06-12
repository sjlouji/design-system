import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CommandIcon } from 'lucide-react'
import { Kbd } from './Kbd'

const meta = {
  title: 'Primitives/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content rendered inside the `<kbd>` element. Accepts a string (e.g. "Enter", "⌘", "Ctrl") or a React element such as a small icon. Use multiple `<Kbd>` components side-by-side with "+" separators to represent key combinations.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the `<kbd>` element. Useful for overriding colours (e.g. destructive red, primary blue) for context-specific shortcut hints.',
    },
  },
  args: { children: '⌘K' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

// --- Single keys ---

export const Default: Story = {
  args: { children: '⌘K' },
}

export const EnterKey: Story = {
  name: 'Single key: Enter',
  args: { children: 'Enter' },
}

export const EscapeKey: Story = {
  name: 'Single key: Escape',
  args: { children: 'Esc' },
}

export const TabKey: Story = {
  name: 'Single key: Tab',
  args: { children: 'Tab' },
}

export const ShiftKey: Story = {
  name: 'Single key: Shift',
  args: { children: '⇧' },
}

export const ArrowKeys: Story = {
  name: 'Arrow keys',
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>←</Kbd>
      <Kbd>→</Kbd>
    </div>
  ),
}

export const FunctionKeys: Story = {
  name: 'Function keys',
  render: () => (
    <div className="flex flex-wrap items-center gap-1">
      {['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((key) => (
        <Kbd key={key}>{key}</Kbd>
      ))}
    </div>
  ),
}

// --- Key combinations ---

export const Combination: Story = {
  name: 'Combination: ⌘ + Shift + P',
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>⇧</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>P</Kbd>
    </div>
  ),
}

export const CombinationCtrlC: Story = {
  name: 'Combination: Ctrl + C',
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>Ctrl</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>C</Kbd>
    </div>
  ),
}

export const CombinationCtrlShiftZ: Story = {
  name: 'Combination: Ctrl + Shift + Z',
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>Ctrl</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>⇧</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>Z</Kbd>
    </div>
  ),
}

// --- Inline in text ---

export const InlineWithText: Story = {
  name: 'Inline: Command palette hint',
  render: () => (
    <p className="text-sm text-foreground">
      Press <Kbd>⌘K</Kbd> to open the command palette.
    </p>
  ),
}

export const InlineInSentence: Story = {
  name: 'Inline: Save shortcut hint',
  render: () => (
    <p className="text-sm text-foreground">
      Use <Kbd>⌘</Kbd> + <Kbd>S</Kbd> to save your work, or{' '}
      <Kbd>⌘</Kbd> + <Kbd>Z</Kbd> to undo the last action.
    </p>
  ),
}

export const InlineSearchHint: Story = {
  name: 'Inline: Search hint',
  render: () => (
    <p className="text-sm text-muted-foreground">
      Hit <Kbd>Ctrl</Kbd> + <Kbd>F</Kbd> to search within this document.
    </p>
  ),
}

// --- With icon ---

export const WithIcon: Story = {
  name: 'With icon',
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>
        <CommandIcon className="size-3" />
      </Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>K</Kbd>
    </div>
  ),
}

// --- Shortcut table ---

export const ShortcutTable: Story = {
  name: 'Shortcut reference table',
  render: () => {
    const shortcuts = [
      { action: 'Open command palette', keys: ['⌘', 'K'] },
      { action: 'Save document', keys: ['⌘', 'S'] },
      { action: 'Undo', keys: ['⌘', 'Z'] },
      { action: 'Redo', keys: ['⌘', '⇧', 'Z'] },
      { action: 'Find in page', keys: ['⌘', 'F'] },
      { action: 'Select all', keys: ['⌘', 'A'] },
      { action: 'Copy', keys: ['⌘', 'C'] },
      { action: 'Paste', keys: ['⌘', 'V'] },
    ]
    return (
      <div className="w-[320px] rounded-lg border bg-card p-4">
        <p className="mb-3 text-sm font-semibold">Keyboard shortcuts</p>
        <div className="flex flex-col divide-y divide-border">
          {shortcuts.map(({ action, keys }) => (
            <div key={action} className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">{action}</span>
              <div className="flex items-center gap-0.5">
                {keys.map((key, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="mx-0.5 text-xs text-muted-foreground">+</span>}
                    <Kbd>{key}</Kbd>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

// --- Custom styling ---

export const CustomStyling: Story = {
  name: 'Custom styling',
  render: () => (
    <div className="flex items-center gap-2">
      <Kbd className="bg-primary text-primary-foreground border-primary/30">⌘</Kbd>
      <Kbd className="bg-destructive/10 text-destructive border-destructive/30">Del</Kbd>
      <Kbd className="bg-green-100 text-green-700 border-green-200">Enter</Kbd>
    </div>
  ),
}

// --- Overview ---

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Single keys</p>
        <div className="flex flex-wrap gap-1.5">
          {['⌘', '⌥', '⇧', '⌃', 'Enter', 'Esc', 'Tab', 'Space', 'Delete', '↑', '↓', '←', '→'].map(
            (key) => (
              <Kbd key={key}>{key}</Kbd>
            )
          )}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Combinations</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <span className="text-xs text-muted-foreground">+</span>
            <Kbd>K</Kbd>
            <span className="ml-3 text-sm text-muted-foreground">Command palette</span>
          </div>
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <span className="text-xs text-muted-foreground">+</span>
            <Kbd>⇧</Kbd>
            <span className="text-xs text-muted-foreground">+</span>
            <Kbd>P</Kbd>
            <span className="ml-3 text-sm text-muted-foreground">Quick open</span>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Inline usage</p>
        <p className="text-sm text-foreground">
          Press <Kbd>⌘K</Kbd> to search, or <Kbd>Esc</Kbd> to close.
        </p>
      </div>
    </div>
  ),
}
