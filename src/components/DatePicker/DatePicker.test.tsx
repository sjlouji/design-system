import { describe, it, expect } from "vitest"
import { render, screen } from "@/lib/test-utils"

import { DatePicker } from "./DatePicker"

describe("DatePicker", () => {
  it("renders the trigger button", () => {
    render(<DatePicker />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("shows placeholder when no date is selected", () => {
    render(<DatePicker placeholder="Choose a date..." />)
    expect(screen.getByText("Choose a date...")).toBeInTheDocument()
  })

  it("shows formatted date when value is provided", () => {
    render(<DatePicker value={new Date(2025, 3, 29)} />)
    // "PPP" format = "April 29th, 2025"
    expect(screen.getByText("April 29th, 2025")).toBeInTheDocument()
  })

  it("is disabled when disabled prop is true", () => {
    render(<DatePicker disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})
