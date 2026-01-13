import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { deltaColor } from "@/utils/dashboard"

type Props = {
  delta?: number
}

export function Trend({ delta = 0 }: Props) {


  return (
    <span
      className={cn(
        "flex items-center gap-1",
        deltaColor(delta)
      )}
    >
      {delta > 0 ? (
        <TrendingUp className="w-4 h-4" />
      ): delta === 0?(
        <ArrowRight className="w-4 h-4" />
      ):(
        <TrendingDown className="w-4 h-4" />
      )}
    </span>
  )
}
