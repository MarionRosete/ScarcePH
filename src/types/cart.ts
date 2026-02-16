export type CartItem = {
    condition: string
    inventory_name: string
    price: number
    quantity: number
    subtotal: number
    inventory_id: number
    variation_id: number

}

export type CartObj = {
    items:CartItem[]
    total:number

}

export type AddToCartParams ={
    inventory_id: number
    variation_id: number
}