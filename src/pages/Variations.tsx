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
    const removeVar = (index: number) => {
        console.log("REMOVE", index)
        setVars(vars => {
            if (vars.length === 1) return vars
            return vars.filter((_, i) => i !== index)
        })
    }


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
                <Button size='icon-xs' variant='secondary' onClick={addVar}>
                    <PlusCircleIcon/>
                </Button>
            </div>
            <div className="w-full overflow-scroll max-h-80 space-y-2">
                <AnimatePresence initial={false}>
                    {vars.map((data, key) => (
                        <motion.div
                            key={key}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <Collapsible
                                open={data.isOpen}
                                onOpenChange={() => toggleOpen(key)}
                            >
                                <div className="flex justify-between items-center w-full">
                                <CollapsibleTrigger asChild>
                                    <button className="flex items-center gap-2 text-xs font-medium">
                                        Variation {key + 1}

                                        <motion.span
                                        animate={{ rotate: data.isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="inline-flex"
                                        >
                                        <ChevronDown className="h-4 w-4" />
                                        </motion.span>
                                    </button>
                                </CollapsibleTrigger>

                                <Button 
                                    size="icon-xs" 
                                    className="mb-1" 
                                    variant="destructive"
                                    onClick={()=>removeVar(key)}
                                >
                                    <MinusCircleIcon/>
                                </Button>
                                </div>

                                <CollapsibleContent asChild forceMount>
                                    <motion.div
                                        initial={false}
                                        animate={data.isOpen ? "open" : "closed"}
                                        variants={{
                                        open: {
                                            height: "auto",
                                            opacity: 1,
                                        },
                                        closed: {
                                            height: 0,
                                            opacity: 0,
                                        },
                                        }}
                                        transition={{
                                        height: { duration: 0.25, ease: "easeInOut" },
                                        opacity: { duration: 0.15 },
                                        }}
                                        className="overflow-hidden"
                                    >
                                    <div className="grid gap-4 border-1 p-4  rounded-md"> 
                                        <div className="grid gap-1"> 
                                            <Label htmlFor="inv-name" className="text-xs"> Facebook post </Label> 
                                            <Input id="inv-name" placeholder="https://www.facebook.com/share/p/1AQctcDZcj/" required className="text-xs h-9" /> 
                                        </div> 
                                        <div className="grid grid-cols-2 gap-4"> 
                                                    <div className="grid gap-1"> 
                                                        <Label htmlFor="checkout-exp-month-ts6" className="text-xs"> Condition </Label> 
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
                                                    <div className="grid gap-1"> 
                                                        <Label htmlFor="checkout-7j9-exp-year-f59" className="text-xs"> Size </Label> 
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
                                            <div className="grid gap-1">
                                                <Label htmlFor="inv-name" className="text-xs"> Price </Label> 
                                                <Input id="inv-name" placeholder="₱7000" required type="number" className="text-xs h-8" /> 
                                            </div> 
                                            <div className="grid gap-1"> 
                                                <Label htmlFor="inv-name" className="text-xs"> Quantity </Label> 
                                                <Input id="inv-name" placeholder={"1"} required type="number" className="text-xs h-8" /> 
                                            </div> 
                                        </div> 
                                    </div>
                                    </motion.div>
                                </CollapsibleContent>
                            </Collapsible>
                        </motion.div>
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