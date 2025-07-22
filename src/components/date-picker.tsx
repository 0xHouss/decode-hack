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

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date | undefined>(value ? parseDate(value) : undefined)
  const [localValue, setLocalValue] = React.useState<Date | undefined>(value ? parseDate(value) : undefined)

  return (
    <div className="relative bg-gradient-to-b from-[#398B56] to-[#17271D] h-fit p-px rounded-2xl">
      <Input
        value={value}
        placeholder="Date of Birth"
        readOnly
        className="h-12 rounded-2xl border-0 bg-[#050B08] dark:bg-[#050B08] placeholder:text-[#F0FFD1]/50"
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
          <CalendarIcon className="absolute top-1/2 right-3 -translate-y-1/2 text-[#F0FFD1] h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={localValue}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              if (!date) return
              setLocalValue(date)
              onChange(formatDate(date))
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
