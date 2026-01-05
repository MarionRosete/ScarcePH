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

interface InventoryProps {
    data: InventoryObj[];
}



function Inventory({data}:InventoryProps){
    return(
        <div className="flex w-full flex-col ">
        
            <div className="flex flex-col md:flex-row">
                <ItemGroup className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
                    {data.flatMap((inv, key) =>
                        <InventoryItem inv={inv} key={key}/>
                    )}
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