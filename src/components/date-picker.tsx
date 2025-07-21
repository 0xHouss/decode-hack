"use client"

import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

function formatDate(date: Date | undefined) {
  if (!date) return ""
  const day = date.getDate().toString().padStart(2, "0")
  const month = date.toLocaleString("en-US", { month: "long" })
  const year = date.getFullYear()
  return `${day} ${month} ${year}` // dd Month yyyy
}

interface DatePickerProps {
  value: Date | undefined
  onChange: (date: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date | undefined>(value)

  return (
    <div className="relative bg-gradient-to-b from-[#398B56] to-[#17271D] h-fit p-px rounded-2xl">
      <Input
        value={formatDate(value)}
        placeholder="Date of Birth"
        readOnly
        className="h-12 rounded-2xl border-0 dark:bg-[#050B08] placeholder:text-[#F0FFD1]/50"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
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
            selected={value}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              if (!date) return
              onChange(date)      // ✅ Tell RHF about the change
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
