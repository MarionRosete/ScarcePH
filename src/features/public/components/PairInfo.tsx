import { Button } from "@/components/ui/button";
import { Item,  ItemDescription,  ItemTitle } from "@/components/ui/item";
import type { PairObj, VariationObj } from "@/types/pair";
import { useState } from "react";

type PairProps = {
    pair:PairObj
}

export default function PairInfo ({pair}:PairProps) {
    const [selected, setSelected] = useState<VariationObj|null>(null)
    return (
        <div>
            <Item className="flex justify-center flex-col space-y-2">
                <img
                    className="w-25 md:w-50 rounded-sm object-fit"
                    src={pair.image}
                />
                <ItemTitle className="text-sm mt-2">
                    {pair.name}
                </ItemTitle>
                <ItemDescription className="text-xs">
                    {pair.description}
                </ItemDescription>
            </Item>
            <p>Size</p>
            <div className="flex justify-center w-full items-center">
                <div className="mt-2 space-x-4 overflow-scroll w-full pl-2 pr-2 flex ">
                    {pair.variations.map((data)=>
                        <Button 
                            variant={selected?.id === data.id?'default':'outline'} 
                            size="xs"
                            onClick={()=>setSelected(selected?null:data)}
                        > 
                            {data.size}us
                        </Button>
                    )}
                </div>
            </div>
            {selected&&
                <div className="space-y-1 mt-6">
                    <p>Condition: {selected?.condition}</p>
                    <p>Price: ₱{selected.price}</p>
                </div>
         
                
            }
            <div className="mt-9 flex justify-center space-x-5">
                <Button disabled={!selected}>
                    Add to cart
                </Button>
                <Button disabled={!selected}>
                    Checkout
                </Button>
            </div>

        </div>
    )
}

