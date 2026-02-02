import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ShoppingCart } from "lucide-react"
import { useGetCart } from "./hooks/useCart"
import { formatPeso } from "@/utils/dashboard"

export function AppCart() {
  const{data}=useGetCart()
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
      <PopoverContent className="w-90 mr-5 mt-2">
        {data?.items.length? (
          <div className="space-y-5">
            <p className="font-medium">
              MY CART
            </p>
      
            { data?.items.map((item)=>
              <p> * {item.inventory_name}</p>
            )}
            <div className="flex justify-between">
              <p>Total: {formatPeso(data?.total||0)}</p>
              <Button size={'sm'} variant={'outline'}>
                Checkout
              </Button>
            </div>
          </div>

        ):(
          <p>No Items in cart</p>
        )
            
        }
      
      </PopoverContent>
    </Popover>
  )
}
