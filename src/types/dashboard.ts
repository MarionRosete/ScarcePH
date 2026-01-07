type vars = {
    revenue:number,
    size: string,
    sold_count:number
}

export type BestsellerItem = {
    name:string
    image:string
    inventory_id: number
    inventory_name: string
    sizes: vars[]
    sold_count: number
    total_revenue: number
}
