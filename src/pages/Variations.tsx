import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
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
import { ChevronDown, ChevronUp } from "lucide-react"


const varData = {
    image:"",
    url:"",
    condition:"",
    size:"",
    price:0,
    stock:0,
    isOpen:false
}

export function Variations(){
    const [vars, setVars] = useState<typeof varData[]>([varData])

    const addVar = () => {
        setVars([...vars, varData])
    }
    const toggleOpen = (index: number) => {
            setVars(vars =>
                vars.map((v, i) =>
                i === index ? { ...v, isOpen: !v.isOpen } : v
                )
        )
    }

    return(
        <>
            <Item className="flex justify-center flex-col">
                <div className="m-4">
                <img
                    className="w-40 md:w-50 rounded-sm object-fit"
                    src="https://marionrosete.github.io/ScarcePH/public/static/TIFFANY.PNG"
                />
                </div>
                <ItemTitle className="text-xs">
                    Nike sb stefan janoski og venom
                </ItemTitle>
            </Item>
            <div className="flex justify-end">
            <Button size='icon-sm' variant='secondary' onClick={addVar}>
                <PlusCircleIcon/>
            </Button>
            </div>
            <div className="w-full overflow-scroll max-h-40 space-y-4">
                {vars.map((data, key) => (
                    <Collapsible
                        key={key}
                        onOpenChange={() => toggleOpen(key)}
                    >
                        <div className="flex justify-between items-center w-full">
                        <CollapsibleTrigger asChild>
                            <button className="flex items-center gap-2 text-sm font-medium">
                            Variation {key + 1}
                            {data.isOpen ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                            </button>
                        </CollapsibleTrigger>

                        <Button size="icon-xs" variant="destructive">
                            <MinusCircleIcon />
                        </Button>
                        </div>

                        <CollapsibleContent>
                            <div className="grid gap-4 border-1 p-4 m-3 rounded-md"> 
                                <div className="grid gap-3"> 
                                    <Label htmlFor="inv-name"> Image </Label> 
                                    <Input id="inv-name" placeholder="₱7000" required className="text-xs h-8" /> 
                                </div> 
                                <div className="grid gap-3"> 
                                    <Label htmlFor="inv-name"> Facebook post </Label> 
                                    <Input id="inv-name" placeholder="₱7000" required className="text-xs h-8" /> 
                                </div> 
                                <div className="grid grid-cols-2 gap-4"> 
                                            <div className="grid gap-3"> 
                                                <Label htmlFor="checkout-exp-month-ts6"> Condition </Label> 
                                                <Select> 
                                                    <SelectTrigger id="checkout-exp-month-ts6"> 
                                                        <SelectValue placeholder="new in box" /> 
                                                    </SelectTrigger> 
                                                    <SelectContent className="text-xs"> 
                                                        {condition.map((cond, key)=> 
                                                            <SelectItem value={cond} key={key}>{cond}</SelectItem> 
                                                        )} 
                                                    </SelectContent> 
                                                </Select> 
                                            </div> 
                                            <div className="grid gap-3"> 
                                                <Label htmlFor="checkout-7j9-exp-year-f59"> Size </Label> 
                                                <Select> 
                                                    <SelectTrigger id="checkout-7j9-exp-year-f59"> 
                                                        <SelectValue placeholder="10.5 us" /> 
                                                    </SelectTrigger> 
                                                    <SelectContent> {getsize().map((sz, key)=> 
                                                        <SelectItem value={sz.toString()} key={key}> {sz} us </SelectItem> )} 
                                                    </SelectContent> 
                                                </Select> 
                                            </div> 
                                </div> 
                                <div className="grid grid-cols-2 gap-4"> 
                                    <div className="grid gap-3">
                                        <Label htmlFor="inv-name"> Price </Label> 
                                        <Input id="inv-name" placeholder="₱7000" required type="number" className="text-xs h-8" /> 
                                    </div> 
                                    <div className="grid gap-3"> 
                                        <Label htmlFor="inv-name"> Quantity </Label> 
                                        <Input id="inv-name" placeholder={"1"} required type="number" className="text-xs h-8" /> 
                                    </div> 
                                </div> 
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
            <Button variant='outline'>
                Confirm
            </Button>
        </>
    )
    
}