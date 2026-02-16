import { Dialog, DialogTrigger,DialogContent, DialogTitle} from "@/components/ui/dialog";
import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import type { PairObj } from "@/types/pair";
import PairInfo from "./PairInfo";

type PairProps = {
    pair:PairObj
}

export function PairCard({pair}:PairProps){
    return(
        <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
             <DialogContent className="sm:max-w-[425px] flex flex-col">
                <DialogTitle>
                    Pair info
                </DialogTitle>
                  
                  
                <PairInfo pair={pair}/>
             </DialogContent>
        </Dialog>
    )
}