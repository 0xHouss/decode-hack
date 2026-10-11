"use client"

import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate, parseDate } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import React from "react"

interface DatePickerProps extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value: string
  onChange: (date: string) => void
}

export function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  // Derived on every render, so the calendar follows values restored after mount
  const selected = parseDate(value) ?? undefined

  return (
    <div className="relative bg-gradient-to-b from-fern to-night-600 h-fit p-px rounded-2xl">
      <Input
        {...props}
        value={value}
        placeholder="Date of Birth"
        readOnly
        className="h-12 rounded-2xl border-0 bg-night-900 dark:bg-night-900 placeholder:text-cream/50"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Open calendar"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-cream"
          >
            <CalendarIcon className="h-5 w-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          {/* The content unmounts when closed, so defaultMonth is read on every open */}
          <Calendar
            mode="single"
            selected={selected}
            defaultMonth={selected}
            captionLayout="dropdown"
            disabled={{ after: new Date() }}
            onSelect={(date) => {
              if (!date) return
              onChange(formatDate(date))
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
