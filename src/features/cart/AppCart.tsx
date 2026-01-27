import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ShoppingCart } from "lucide-react"
import { useGetCart } from "./hooks/useCart"

export function AppCart() {
    const{data}=useGetCart()
    console.log('data',data)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
         <Button size="icon-sm" variant="outline">
          <ShoppingCart />

        {data?.items && data?.items.length > 0 && (
            <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full"
            >
            {data?.items.length}
            </Badge>
        )}
        </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {/* TBD */}
       <div>
        MY CART
       </div>
      </PopoverContent>
    </Popover>
  )
}
