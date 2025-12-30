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

function Inventory({data}:InventoryProps){
    return(
        <div className="flex w-full flex-col gap-6 mt-6">
            <h4 className="text-sm leading-none font-medium">
                Inventory
            </h4>
            <div className="flex flex-col md:flex-row gap-6">
                <ItemGroup className="grid grid-cols-2 md:grid-cols-6 gap-5">
                {data.map((inv,idx)=>
                   
               
                <Item key={idx} variant="outline">
                    <ItemHeader>
                        <img
                            src={inv.variations[0].image}
                            alt={inv.name}
                            width={128}
                            height={128}
                            className="aspect-square w-full rounded-sm object-cover"
                        />
                    </ItemHeader>
                    <ItemContent >
                            <ItemTitle>{inv.name}</ItemTitle>
                    </ItemContent>
                </Item>
                 )}
                 </ItemGroup>
            </div>
        </div>
    )
}

export default Inventory