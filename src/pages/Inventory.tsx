import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemHeader,
  ItemGroup
} from "@/components/ui/item"

interface Variation{
    condition:string,
    image:string,
    price:number,
    size:string,
    status:string
}
interface InventoryObj {
    name:string,
    description:string
    variations: Variation[];
}

interface InventoryProps {
    data: InventoryObj[];
}

function variant(status:string){
    if(status == 'onhand')
        return "secondary"
    if(status == "preorder")
        return "outline"
    return "destructive"
}

function Inventory({data}:InventoryProps){
    return(
        <div className="flex w-full flex-col ">
        
            <div className="flex flex-col md:flex-row gap-6">
                <ItemGroup className="grid grid-cols-2 md:grid-cols-6 gap-5">
                {data.flatMap((inv) =>
                inv.variations.map((variation, vIdx) => (
                    <Item
                        key={`${inv.name}-${vIdx}`}
                        variant="outline"
                    >
                        <div className="flex w-full justify-end">
                            <Badge
                            variant={variant(variation.status)}
                            className="text-xs"
                            >
                                {variation.status}
                            </Badge>
                        </div>

                        <ItemHeader>
                            <img
                                src={variation.image}
                                alt={`${inv.name} ${variation.size}`}
                                className="aspect-square w-full rounded-sm object-cover"
                            />
                        </ItemHeader>

                        <ItemContent>
                            <ItemTitle className="text-xs">
                                {inv.name}
                            </ItemTitle>

                            <div className="text-xs text-muted-foreground">
                                {variation.condition} · Size {variation.size}
                            </div>

                            <div className="mt-1 text-xs font-medium">
                                ₱{variation.price}
                            </div>
                        </ItemContent>
                    </Item>
                ))
)}

                 </ItemGroup>
            </div>
        </div>
    )
}

export default Inventory