import { type VariationObj  } from "./variations";

export interface InventoryObj {
    name:string,
    description:string
    image:string
    variations: VariationObj[];
    id:number
}