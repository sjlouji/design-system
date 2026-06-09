import { describe, it, expect } from "vitest"
import { render, screen } from "@/lib/test-utils"

import { Combobox } from "./Combobox"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
]

describe("Combobox", () => {
  it("renders the trigger button", () => {
    render(<Combobox options={options} />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("shows placeholder when no value is selected", () => {
    render(<Combobox options={options} placeholder="Pick a framework..." />)
    expect(screen.getByText("Pick a framework...")).toBeInTheDocument()
  })

  it("shows selected label when value is provided", () => {
    render(<Combobox options={options} value="react" />)
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  it("is disabled when disabled prop is true", () => {
    render(<Combobox options={options} disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })
})
