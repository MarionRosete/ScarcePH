import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Item, ItemTitle } from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { condition, getsize } from "@/utils/inventory"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { VariationItem } from "./VariationItem"
import { useVariations } from "@/hooks/useVariations"



type Variation = {
  id: string
  image: string
  url: string
  condition: string
  size: string
  price: number
  stock: number
  isOpen: boolean
}

const createVar = (): Variation => ({
  id: crypto.randomUUID(),
  image: "",
  url: "",
  condition: "",
  size: "",
  price: 0,
  stock: 0,
  isOpen: false,
})

export function Variations(){
    const { vars, add, remove, toggle, update } = useVariations()


    return(
        <div >
            <Item className="flex justify-center flex-col">
                <div>
                <img
                    className="w-25 md:w-50 rounded-sm object-fit"
                    src="https://marionrosete.github.io/ScarcePH/public/static/TIFFANY.PNG"
                />
                </div>
                <ItemTitle className="text-xs">
                    Nike sb stefan janoski og venom
                </ItemTitle>
            </Item>
            <div className="flex justify-end mb-2">
                <Button size='icon-xs' variant='secondary' onClick={add}>
                    <PlusCircleIcon/>
                </Button>
            </div>
            <div className="w-full overflow-scroll max-h-80 space-y-2">
                <AnimatePresence>
                    {vars.map((v, i) => (
                    <VariationItem
                        key={v.id}
                        data={v}
                        index={i}
                        onToggle={() => toggle(i)}
                        onRemove={() => remove(i)}
                        onUpdate={(k, val) => update(i, k, val)}
                    />
                    ))}
                </AnimatePresence>
            </div>
            <div className="mt-2 flex justify-center">
                <Button variant='outline' >
                    Confirm
                </Button>
            </div>
        </div>
    )
    
}