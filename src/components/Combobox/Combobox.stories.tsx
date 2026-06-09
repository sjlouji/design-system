import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Combobox } from "./Combobox"

const meta: Meta<typeof Combobox> = {
  title: "Forms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Combobox>

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
]

const frameworksWithDescriptions = [
  {
    value: "react",
    label: "React",
    description: "A JavaScript library for building user interfaces",
  },
  {
    value: "vue",
    label: "Vue",
    description: "The progressive JavaScript framework",
  },
  {
    value: "angular",
    label: "Angular",
    description: "Platform for building mobile and desktop apps",
  },
  {
    value: "svelte",
    label: "Svelte",
    description: "Cybernetically enhanced web apps",
  },
  {
    value: "solid",
    label: "Solid",
    description: "Simple and performant reactivity for building UIs",
  },
]

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: "Select a framework...",
    searchPlaceholder: "Search frameworks...",
    emptyMessage: "No framework found.",
  },
}

export const WithDescription: Story = {
  args: {
    options: frameworksWithDescriptions,
    placeholder: "Select a framework...",
    searchPlaceholder: "Search frameworks...",
    emptyMessage: "No framework found.",
  },
}

export const Disabled: Story = {
  args: {
    options: frameworks,
    placeholder: "Select a framework...",
    disabled: true,
  },
}

export const Controlled: Story = {
  render: function ControlledCombobox() {
    const [value, setValue] = React.useState("")

    return (
      <div className="flex flex-col gap-4">
        <Combobox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Select a framework..."
          searchPlaceholder="Search frameworks..."
          emptyMessage="No framework found."
        />
        <p className="text-sm text-muted-foreground">
          Selected: {value || "none"}
        </p>
      </div>
    )
  },
}
