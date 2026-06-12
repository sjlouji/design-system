"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/Button"
import { Calendar } from "@/components/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import type { DateRange as DayPickerDateRange } from "react-day-picker"

// ── Types ────────────────────────────────────────────────────────────────────

export type DateRangeUnit = "second" | "minute" | "hour" | "day" | "week" | "month" | "year"

export interface RelativeOption {
  key: string
  amount: number
  unit: DateRangeUnit
  type: "relative"
}

export interface AbsoluteRange {
  type: "absolute"
  startDate: string // ISO 8601
  endDate: string   // ISO 8601
}

export interface RelativeRange {
  type: "relative"
  key?: string
  amount: number
  unit: DateRangeUnit
}

export type DateRangePickerValue = AbsoluteRange | RelativeRange | null | undefined

export interface DateRangePickerI18nStrings {
  relativeModeTitle?: string
  absoluteModeTitle?: string
  chooseRangeLabel?: string
  customRelativeRangeOptionLabel?: string
  customRelativeRangeOptionDescription?: string
  startDateLabel?: string
  startTimeLabel?: string
  endDateLabel?: string
  endTimeLabel?: string
  dateFormatHint?: string
  applyButtonLabel?: string
  cancelButtonLabel?: string
  clearButtonLabel?: string
}

export interface DateRangePickerProps {
  value?: DateRangePickerValue
  onChange?: (value: DateRangePickerValue) => void
  relativeOptions?: RelativeOption[]
  isValidRange?: (
    range: AbsoluteRange | RelativeRange
  ) => { valid: boolean; errorMessage?: string }
  placeholder?: string
  disabled?: boolean
  className?: string
  i18nStrings?: DateRangePickerI18nStrings
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const UNIT_LABELS: Record<DateRangeUnit, { singular: string; plural: string }> = {
  second: { singular: "second", plural: "seconds" },
  minute: { singular: "minute", plural: "minutes" },
  hour: { singular: "hour", plural: "hours" },
  day: { singular: "day", plural: "days" },
  week: { singular: "week", plural: "weeks" },
  month: { singular: "month", plural: "months" },
  year: { singular: "year", plural: "years" },
}

const UNIT_OPTIONS = Object.keys(UNIT_LABELS) as DateRangeUnit[]

function formatRelativeLabel(amount: number, unit: DateRangeUnit): string {
  const { singular, plural } = UNIT_LABELS[unit]
  return `Last ${amount} ${amount === 1 ? singular : plural}`
}

function parseDateStr(str: string): Date | undefined {
  const m = str.match(/^(\d{4})\/(\d{2})\/(\d{2})$/)
  if (!m) return undefined
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return isNaN(d.getTime()) ? undefined : d
}

function buildISO(dateStr: string, timeStr: string): string {
  const d = parseDateStr(dateStr)
  if (!d) return ""
  const parts = (timeStr || "00:00:00").split(":").map(Number)
  d.setHours(parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, 0)
  return isNaN(d.getTime()) ? "" : d.toISOString()
}

function toDisplayDate(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "" : format(d, "yyyy/MM/dd")
}

function toDisplayTime(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "" : format(d, "HH:mm:ss")
}

function formatTriggerValue(
  value: DateRangePickerValue,
  relativeOptions: RelativeOption[]
): string | null {
  if (!value) return null
  if (value.type === "relative") {
    const match = value.key ? relativeOptions.find((o) => o.key === value.key) : null
    if (match) return formatRelativeLabel(match.amount, match.unit)
    return formatRelativeLabel(value.amount, value.unit)
  }
  if (value.type === "absolute") {
    const s = value.startDate ? new Date(value.startDate) : null
    const e = value.endDate ? new Date(value.endDate) : null
    if (s && e && !isNaN(s.getTime()) && !isNaN(e.getTime())) {
      return `${format(s, "MMM d, yyyy")} – ${format(e, "MMM d, yyyy")}`
    }
    if (s && !isNaN(s.getTime())) return `${format(s, "MMM d, yyyy")} – ...`
  }
  return null
}

// ── Component ────────────────────────────────────────────────────────────────

function DateRangePicker({
  value,
  onChange,
  relativeOptions = [],
  isValidRange,
  placeholder = "Filter by a date and time range",
  disabled = false,
  className,
  i18nStrings = {},
}: DateRangePickerProps) {
  const i18n: Required<DateRangePickerI18nStrings> = {
    relativeModeTitle: "Relative mode",
    absoluteModeTitle: "Absolute mode",
    chooseRangeLabel: "Choose a range",
    customRelativeRangeOptionLabel: "Custom range",
    customRelativeRangeOptionDescription: "Set a custom range in the past",
    startDateLabel: "Start date",
    startTimeLabel: "Start time",
    endDateLabel: "End date",
    endTimeLabel: "End time",
    dateFormatHint: "For date, use YYYY/MM/DD. For time, use 24 hr format.",
    applyButtonLabel: "Apply",
    cancelButtonLabel: "Cancel",
    clearButtonLabel: "Clear and dismiss",
    ...i18nStrings,
  }

  const hasRelative = relativeOptions.length > 0

  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<"relative" | "absolute">(
    hasRelative ? "relative" : "absolute"
  )

  // Absolute draft
  const [calRange, setCalRange] = React.useState<{ from?: Date; to?: Date }>({})
  const [startDateStr, setStartDateStr] = React.useState("")
  const [startTimeStr, setStartTimeStr] = React.useState("00:00:00")
  const [endDateStr, setEndDateStr] = React.useState("")
  const [endTimeStr, setEndTimeStr] = React.useState("23:59:59")

  // Relative draft
  const [relKey, setRelKey] = React.useState<string | null>(null)
  const [customAmount, setCustomAmount] = React.useState("1")
  const [customUnit, setCustomUnit] = React.useState<DateRangeUnit>("hour")

  const [error, setError] = React.useState<string | null>(null)

  function initializeDraft() {
    setError(null)
    if (value?.type === "relative") {
      setMode("relative")
      const matched = value.key ? relativeOptions.find((o) => o.key === value.key) : null
      if (matched) {
        setRelKey(matched.key)
      } else {
        setRelKey("custom")
        setCustomAmount(String(value.amount))
        setCustomUnit(value.unit)
      }
      setCalRange({})
    } else if (value?.type === "absolute") {
      setMode("absolute")
      const sd = toDisplayDate(value.startDate)
      const ed = toDisplayDate(value.endDate)
      setStartDateStr(sd)
      setEndDateStr(ed)
      setStartTimeStr(toDisplayTime(value.startDate) || "00:00:00")
      setEndTimeStr(toDisplayTime(value.endDate) || "23:59:59")
      setCalRange({ from: parseDateStr(sd), to: parseDateStr(ed) })
      setRelKey(null)
    } else {
      setMode(hasRelative ? "relative" : "absolute")
      setRelKey(null)
      setStartDateStr("")
      setEndDateStr("")
      setStartTimeStr("00:00:00")
      setEndTimeStr("23:59:59")
      setCalRange({})
    }
  }

  function handleCalendarSelect(range: DayPickerDateRange | undefined) {
    const r: { from?: Date; to?: Date } = range ?? {}
    setCalRange(r)
    if (r.from) setStartDateStr(format(r.from, "yyyy/MM/dd"))
    if (r.to) setEndDateStr(format(r.to, "yyyy/MM/dd"))
    setError(null)
  }

  function handleStartDateInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setStartDateStr(v)
    setCalRange((prev) => ({ ...prev, from: parseDateStr(v) }))
    setError(null)
  }

  function handleEndDateInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setEndDateStr(v)
    setCalRange((prev) => ({ ...prev, to: parseDateStr(v) }))
    setError(null)
  }

  function handleApply() {
    let pending: AbsoluteRange | RelativeRange | null = null

    if (mode === "absolute") {
      pending = {
        type: "absolute",
        startDate: buildISO(startDateStr, startTimeStr),
        endDate: buildISO(endDateStr, endTimeStr),
      }
    } else if (relKey === "custom") {
      const amt = parseInt(customAmount, 10)
      if (!isNaN(amt) && amt > 0) {
        pending = { type: "relative", amount: amt, unit: customUnit }
      }
    } else if (relKey) {
      const opt = relativeOptions.find((o) => o.key === relKey)
      if (opt) pending = { type: "relative", key: opt.key, amount: opt.amount, unit: opt.unit }
    }

    if (pending && isValidRange) {
      const result = isValidRange(pending)
      if (!result.valid) {
        setError(result.errorMessage ?? "Invalid date range")
        return
      }
    }

    setError(null)
    onChange?.(pending)
    setOpen(false)
  }

  function handleClear() {
    onChange?.(null)
    setOpen(false)
  }

  const displayValue = formatTriggerValue(value ?? null, relativeOptions)

  return (
    <Popover open={open} onOpenChange={(next) => { if (next) initializeDraft(); setOpen(next) }}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-label={displayValue ?? placeholder}
          className={cn(
            "inline-flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            !displayValue && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-left">{displayValue ?? placeholder}</span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 shadow-lg" align="start" sideOffset={4}>
        <div className="flex flex-col">
          {/* Mode toggle */}
          <div className="flex items-center border-b px-3 py-3">
            <div className="inline-flex rounded-full border p-0.5">
              {hasRelative && (
                <button
                  type="button"
                  onClick={() => { setMode("relative"); setError(null) }}
                  className={cn(
                    "rounded-full px-4 py-1 text-sm font-medium transition-colors",
                    mode === "relative"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {i18n.relativeModeTitle}
                </button>
              )}
              <button
                type="button"
                onClick={() => { setMode("absolute"); setError(null) }}
                className={cn(
                  "rounded-full px-4 py-1 text-sm font-medium transition-colors",
                  mode === "absolute"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {i18n.absoluteModeTitle}
              </button>
            </div>
          </div>

          {/* Relative mode */}
          {mode === "relative" && (
            <div className="w-80 p-4">
              <p className="mb-3 text-sm font-semibold">{i18n.chooseRangeLabel}</p>
              <div className="space-y-0.5">
                {relativeOptions.map((opt) => (
                  <RadioOption
                    key={opt.key}
                    label={formatRelativeLabel(opt.amount, opt.unit)}
                    selected={relKey === opt.key}
                    onClick={() => { setRelKey(opt.key); setError(null) }}
                  />
                ))}
                <RadioOption
                  label={i18n.customRelativeRangeOptionLabel}
                  description={i18n.customRelativeRangeOptionDescription}
                  selected={relKey === "custom"}
                  onClick={() => { setRelKey("custom"); setError(null) }}
                />
                {relKey === "custom" && (
                  <div className="ml-7 flex items-center gap-2 pt-2">
                    <span className="whitespace-nowrap text-sm text-muted-foreground">Last</span>
                    <input
                      type="number"
                      min={1}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-16 rounded-md border border-input bg-transparent px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <select
                      value={customUnit}
                      onChange={(e) => setCustomUnit(e.target.value as DateRangeUnit)}
                      className="flex-1 rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u} value={u}>
                          {UNIT_LABELS[u].plural}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Absolute mode */}
          {mode === "absolute" && (
            <div className="p-3">
              <Calendar
                mode="range"
                selected={calRange as DayPickerDateRange}
                onSelect={handleCalendarSelect}
                numberOfMonths={2}
                autoFocus
              />
              <div className="mt-4 grid grid-cols-4 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold">{i18n.startDateLabel}</label>
                  <input
                    type="text"
                    placeholder="YYYY/MM/DD"
                    value={startDateStr}
                    onChange={handleStartDateInput}
                    className="h-8 rounded-md border border-input bg-transparent px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold">{i18n.startTimeLabel}</label>
                  <input
                    type="text"
                    placeholder="00:00:00"
                    value={startTimeStr}
                    onChange={(e) => setStartTimeStr(e.target.value)}
                    className="h-8 rounded-md border border-input bg-transparent px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold">{i18n.endDateLabel}</label>
                  <input
                    type="text"
                    placeholder="YYYY/MM/DD"
                    value={endDateStr}
                    onChange={handleEndDateInput}
                    className="h-8 rounded-md border border-input bg-transparent px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold">{i18n.endTimeLabel}</label>
                  <input
                    type="text"
                    placeholder="23:59:59"
                    value={endTimeStr}
                    onChange={(e) => setEndTimeStr(e.target.value)}
                    className="h-8 rounded-md border border-input bg-transparent px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{i18n.dateFormatHint}</p>
            </div>
          )}

          {/* Validation error */}
          {error && (
            <div className="mx-3 mb-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 border-t px-3 py-3">
            <button
              type="button"
              onClick={handleClear}
              className="text-sm font-medium text-primary hover:underline focus-visible:outline-none"
            >
              {i18n.clearButtonLabel}
            </button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                {i18n.cancelButtonLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleApply}
                className="rounded-full border-primary font-semibold text-primary hover:bg-primary/10"
              >
                {i18n.applyButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── RadioOption (internal) ────────────────────────────────────────────────────

function RadioOption({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted"
    >
      <div
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-primary" : "border-muted-foreground/50"
        )}
      >
        {selected && <div className="size-2 rounded-full bg-primary" />}
      </div>
      <div>
        <span>{label}</span>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </button>
  )
}

export { DateRangePicker }
