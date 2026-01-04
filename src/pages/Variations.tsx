import { Button } from "@/components/ui/button"
import { Item, ItemTitle } from "@/components/ui/item"
import { PlusCircleIcon } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { VariationItem } from "./VariationItem"
import { useVariations } from "@/hooks/useVariations"
import type { VariationsProps } from "@/types/variations"



export function Variations({pair}: VariationsProps){
    const { vars, add, remove, toggle, update, submit } = useVariations(pair.id)
    
    
    console.log('Variants', vars)
    return(
        <div >
            <Item className="flex justify-center flex-col">
                <div>
                <img
                    className="w-25 md:w-50 rounded-sm object-fit"
                    src={pair.image}
                    // src="https://marionrosete.github.io/ScarcePH/public/static/CAPPUCCINO.PNG"
                />
                </div>
                <ItemTitle className="text-xs">
                    {pair.name}
                    {/* Nike sb stefan janoski OG */}
                </ItemTitle>
            </Item>
            <div className="flex justify-end mb-2">
                <Button size='icon-xs' variant='secondary' onClick={add}>
                    <PlusCircleIcon/>
                </Button>
            </div>
            <div className="w-full overflow-scroll max-h-90 space-y-2">
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
                <Button variant='outline' onClick={submit}>
                    Confirm
                </Button>
            </div>
        </div>
    )
    
}