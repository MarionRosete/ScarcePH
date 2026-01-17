import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemHeader,
  ItemGroup
} from "@/components/ui/item"
import { Variations } from "./Variations";
import { type VariationObj } from "@/types/variations";
import { GetAllInventory } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AddPair } from "../AddPair";


interface InventoryObj {
    name:string,
    description:string
    image:string
    variations: VariationObj[];
    id:number
}

interface InventoryItemProps{
    inv:InventoryObj
}





function Inventory(){
    const {
        data,
        isLoading,
        isError,
    } = useQuery<InventoryObj[]>({
        queryFn:GetAllInventory,
        queryKey: ["inventory"],
        staleTime: 30 * 60_000,
    })
    if (isError) {
        return (
            <div className="m-6 text-sm text-destructive">
                Failed to Inventory Try again later
            </div>
        )
    }
    return(
        <div className="m-6">
            <div className="flex justify-end mb-2">
                <AddPair/>
            </div>
            <div className="flex flex-col md:flex-row max-h-[45%] md:max-h-[90%] overflow-scroll">
                <ItemGroup className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
                    {isLoading?
                        <div>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </div>
                        :
                        data?.flatMap((inv, key) =>
                            <InventoryItem inv={inv} key={key}/>
                        )
                    }
                 </ItemGroup>
            </div>
        </div>
    )
}

export default Inventory

function InventoryItem({inv}:InventoryItemProps){
   return(
        <Dialog>
            <DialogTrigger asChild>
                <Item
                    key={`${inv.name}`}
                    variant="outline"
                    onClick={()=>console.log(inv)}
                
                >
                    <ItemHeader>
                        <div className="m-2 md:m-6">
                        <img
                            src={inv.image}
                            alt={`${inv.name}`}
                            className="w-full rounded-sm object-fit"
                        />
                        </div >
                    </ItemHeader>
                    <ItemContent >
                        <ItemTitle className="text-muted-foreground text-xs w-full flex justify-center text-center">
                            {inv.name}
                        </ItemTitle>       
                    </ItemContent>
                </Item>
            </DialogTrigger>
             <DialogContent className="sm:max-w-[425px] flex flex-col">
                <DialogTitle>
                    Add or edit variation
                </DialogTitle>
                <DialogDescription>
                   Define condition, status, sizes, prices, and stock
                </DialogDescription>
                <Variations
                    pair={{
                        id: inv.id,
                        name: inv.name,
                        image: inv.image,
                        variation: inv.variations
                    }}
                />
             </DialogContent>
        </Dialog>
   )
}