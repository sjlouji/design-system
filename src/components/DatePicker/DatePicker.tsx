"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/Button"
import { Calendar } from "@/components/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  fromDate?: Date
  toDate?: Date
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  fromDate,
  toDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  function handleSelect(date: Date | undefined) {
    onChange?.(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={
            fromDate || toDate
              ? (date) =>
                  (fromDate ? date < fromDate : false) ||
                  (toDate ? date > toDate : false)
              : undefined
          }
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, type DatePickerProps }
