import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import type { PairObj } from "@/types/pair";

type PairProps = {
    pair:PairObj
}

export function PairCard({pair}:PairProps){
    return(
        <Item
            key={`${pair.name}`}
            variant="outline"
        
        >
            <ItemHeader>
                <div className="m-2 md:m-6">
                <img
                    src={pair.image}
                    alt={`${pair.name}`}
                    className="w-full rounded-sm object-fit"
                />
                </div >
            </ItemHeader>
            <ItemContent >
                <ItemTitle className="text-muted-foreground text-sm w-full flex justify-center text-center">
                    {pair.name}
                </ItemTitle>       
            </ItemContent>
        </Item>
    )
}