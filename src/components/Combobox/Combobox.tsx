"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/Button"
import { Spinner } from "@/components/Spinner"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"

interface ComboboxOption {
  value: string
  label: string
  description?: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  /** Show a loading spinner inside the dropdown (e.g. while fetching API results). */
  loading?: boolean
  /**
   * When provided, disables internal client-side filtering and fires with the
   * current search query (debounced 300 ms) whenever the user types. The caller
   * is responsible for updating `options` with the matching results.
   */
  onSearch?: (query: string) => void
  disabled?: boolean
  className?: string
}

function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  loading = false,
  onSearch,
  disabled = false,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()
  const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current !== null) clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  function handleSelect(selectedValue: string) {
    onChange?.(selectedValue === value ? "" : selectedValue)
    setOpen(false)
  }

  function handleSearchChange(query: string) {
    if (searchTimeoutRef.current !== null) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => onSearch?.(query), 300)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          className={cn("w-[240px] justify-between font-normal", className)}
        >
          <span className={cn(!selectedOption && "text-muted-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command shouldFilter={!onSearch}>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={onSearch ? handleSearchChange : undefined}
          />
          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Spinner size="sm" />
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, type ComboboxOption, type ComboboxProps }
