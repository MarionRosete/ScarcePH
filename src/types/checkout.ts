import type { InventoryObj } from "@/features/admin/types/Inventory"

export type CheckoutItem = {
    inventory:InventoryObj
    qty:number
}

export type Checkout = {
    created_at: Date
    expires_at: Date
    customer_id: number
    items:[CheckoutItem]
    proof_image_url:string
    total_price: number,
    id:string

}

