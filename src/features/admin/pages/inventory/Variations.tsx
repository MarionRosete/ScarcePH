import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { VariationItem } from "./VariationItem"
import type { VariationsProps } from "@/features/admin/types/variations"
import { useEffect, useState } from "react"
import { useVariations } from "../../hooks/useVariations"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"



export function Variations({pair}: VariationsProps){
    const { vars, add, remove, toggle, update, submit, addVariations} = useVariations(pair.id)
    const [carousel, setCarousel] = useState<string[]>([pair.image])
    
    
    useEffect(()=>{
        addVariations(pair.variation)
    },[pair])

    useEffect(()=>{
        const openedVar = vars.filter((data)=>data.isOpen)
        if(openedVar.length){
            openedVar[0].image?.length && setCarousel([pair.image, ...openedVar[0].image])
        }
       
    },[vars])

    return(
       <div className="flex flex-col max-h-[76vh] w-full">


        <div className="shrink-0 flex justify-center py-2">
            <Carousel className="w-full max-w-[140px] md:max-w-[220px]">
            <CarouselContent>
                {carousel.map((img, index) => (
                <CarouselItem key={index} className="flex justify-center">
                    <div className="w-full aspect-square max-h-[160px] md:max-h-[260px] overflow-hidden flex items-center justify-center">
                    <img
                        src={img}
                        alt="Preview"
                        className="h-full w-full object-contain rounded-md"
                    />
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>

            {carousel.length > 1 && (
                <>
                <CarouselPrevious />
                <CarouselNext />
                </>
            )}
            </Carousel>
        </div>

        <div className="flex justify-between items-center mb-4 px-3">
            <p className="text-xs text-center px-2">
                {pair.name}
            </p>
        
            <Button size='icon-xs' variant='secondary' onClick={add}>
                <PlusCircleIcon/>
            </Button>
        </div>

  {/* BODY (SCROLLABLE FORM) */}
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        <AnimatePresence>
        {vars.map((v, i) => (
            <VariationItem
            key={i}
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