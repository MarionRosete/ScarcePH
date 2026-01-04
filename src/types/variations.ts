export interface Variation {
  id: string
  image: string
  url: string
  condition: string
  size: string
  price: number
  stock: number
  isOpen: boolean,
  inventory_id:number,
  status:string,
}

export const createVariation = (pair_id:number): Variation => ({
  id: crypto.randomUUID(),
  image: "",
  url: "",
  condition: "",
  size: "",
  price: 0,
  stock: 0,
  isOpen: false,
  inventory_id:pair_id,
  status:''
})

type PairSummary = {
  id: number
  name: string
  image: string
}

export type VariationsProps = {
  pair: PairSummary
}


export type InventoryData = {
  id: number
  name: string
  description: string
  image: string
}