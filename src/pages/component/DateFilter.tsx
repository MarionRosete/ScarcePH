"use client"

import * as React from "react"
import { format, startOfWeek, endOfWeek, subWeeks, subDays } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

type Preset =
  | "this_week"
  | "last_week"
  | "last_7"
  | "last_30"
  | "custom"

export default function DateFilter() {
  const [preset, setPreset] = React.useState<Preset>("this_week")
  const [range, setRange] = React.useState<{
    from: Date
    to: Date
  }>(() => getPresetRange("this_week"))

  function handlePresetChange(value: Preset) {
    setPreset(value)

    if (value !== "custom") {
      setRange(getPresetRange(value))
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Preset dropdown */}
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this_week">This week</SelectItem>
          <SelectItem value="last_week">Last week</SelectItem>
          <SelectItem value="last_7">Last 7 days</SelectItem>
          <SelectItem value="last_30">Last 30 days</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>

      {/* Visible date range */}
      <span className="text-sm text-muted-foreground">
        {format(range.from, "MMM dd")} – {format(range.to, "MMM dd")}
      </span>

      {/* Custom picker */}
      {preset === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Pick dates
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={(val: any) => {
                if (!val?.from || !val?.to) return
                setRange(val)
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

/* Helpers */

function getPresetRange(preset: Preset) {
  const now = new Date()

  switch (preset) {
    case "this_week":
      return {
        from: startOfWeek(now),
        to: endOfWeek(now),
      }

    case "last_week": {
      const last = subWeeks(now, 1)
      return {
        from: startOfWeek(last),
        to: endOfWeek(last),
      }
    }

    case "last_7":
      return {
        from: subDays(now, 6),
        to: now,
      }

    case "last_30":
      return {
        from: subDays(now, 29),
        to: now,
      }

    default:
      return {
        from: now,
        to: now,
      }
  }
}
