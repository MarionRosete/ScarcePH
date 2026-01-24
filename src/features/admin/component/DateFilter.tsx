import * as React from "react"
import {
  format,
  startOfWeek,
  endOfWeek,
  subWeeks,
  subDays,
  type Day
} from "date-fns"

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
import type { PresetDdateFilter } from "@/features/admin/types/Order"



type DateRange = {
  from: Date
  to: Date
}

type Props = {
  defaultPreset?: PresetDdateFilter
  onChange: (range: DateRange) => void
}

export default function DateFilter({
  defaultPreset = "this_week",
  onChange,
}: Props) {
  const [preset, setPreset] =
    React.useState<PresetDdateFilter>(defaultPreset)

  const [range, setRange] =
    React.useState<DateRange>(() =>
      getPresetRange(defaultPreset)
    )

  React.useEffect(() => {
    setPreset(defaultPreset)
    setRange(getPresetRange(defaultPreset))
  }, [defaultPreset])

  React.useEffect(() => {
    onChange(range)
  }, [range])

  function handlePresetChange(value: PresetDdateFilter) {
    setPreset(value)

    if (value !== "custom") {
      setRange(getPresetRange(value))
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Select
        value={preset}
        onValueChange={handlePresetChange}
      >
        <SelectTrigger className="w-[180px] text-xs" >
          <SelectValue />
        </SelectTrigger>
        <SelectContent >
          <SelectItem value="this_week">
            This week
          </SelectItem>
          <SelectItem value="last_week">
            Last week
          </SelectItem>
          <SelectItem value="last_7">
            Last 7 days
          </SelectItem>
          <SelectItem value="last_30">
            Last 30 days
          </SelectItem>
          <SelectItem value="custom">
            Custom range
          </SelectItem>
        </SelectContent>
      </Select>

      <span className="text-xs text-muted-foreground">
        {format(range.from, "MMM dd")} –{" "}
        {format(range.to, "MMM dd")}
      </span>

      {preset === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              Pick dates
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-0"
            align="start"
          >
            <Calendar
              mode="range"
              selected={range}
              onSelect={(val: any) => {
                if (!val?.from || !val?.to)
                  return
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


function getPresetRange(preset: PresetDdateFilter): DateRange {
  const now = new Date()
  const options: { weekStartsOn: Day } = {
    weekStartsOn: 1, 
   }


  switch (preset) {
    case "this_week":
      return {
        from: startOfWeek(now, options),
        to: endOfWeek(now, options),
      }

    case "last_week": {
      const last = subWeeks(now, 1)
      return {
        from: startOfWeek(last, options),
        to: endOfWeek(last, options),
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
