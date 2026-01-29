import { Button } from "@/components/ui/button";
import type { PairObj, VariationObj } from "@/types/pair";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { toast } from "sonner";
import CarouselWithFullScreen from "@/components/CarouselWithFullScreen";


type PairProps = {
    pair:PairObj
}

export default function PairInfo ({pair}:PairProps) {
    const [selected, setSelected] = useState<VariationObj|null>(null)
    const [carousel, setCarousel] = useState<string[]>([pair.image])

    const {mutate:addToCart} = useAddToCart()

    const handleAddtoCart = async () => {
        if (!selected) {
            return
        }
        const payload = {inventory_id:pair.id, variation_id:selected?.id}
        await addToCart(payload, {
            onSuccess:()=>toast.success('Added to cart'),
            onError:(e)=>toast.error('Failed add to cart '+ e)
        })
    }

    useEffect(()=>{
        selected?.image?.length ? 
            setCarousel([pair.image, ...selected.image])
            :
            setCarousel([pair.image])
    },[selected])    

    return (
        <div>
            <div className="shrink-0 flex justify-center py-2">
               <CarouselWithFullScreen images={carousel}/>
            </div>
           
            <div className="flex justify-center w-full items-center">
                 <p>Size:</p>
                <div className=" overflow-scroll w-full pl-2 pr-2 flex ">
                    <ToggleGroup
                        type="single"
                        size="sm"
                        variant="outline"
                        spacing={2}
                    >
                        {pair.variations.map((data)=>
                            <ToggleGroupItem 
                                onClick={()=>setSelected(data)}
                                value={data.size}
                                className="pt-0 pb-0"
                            > 
                                {data.size}us
                            </ToggleGroupItem>
                        )}
                    </ToggleGroup>
                </div>
            </div>
            {selected&&
                <div className="space-y-1 mt-6">
                    <p>Condition: {selected?.condition}</p>
                    <p>Price: ₱{selected.price}</p>
                </div>
         
                
            }
            <div className="mt-9 flex justify-center space-x-5">
                <Button 
                    disabled={!selected}
                    onClick={handleAddtoCart}
                >
                    Add to cart
                </Button>
                <Button disabled={!selected}>
                    Checkout
                </Button>
            </div>

        </div>
    )
}

