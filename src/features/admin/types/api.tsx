export interface ApiErrorResponse {
  message?: string;
}

export type VariationParams = {
  condition: string,
  price: number,
  size: string,
  image:[]
  status: string,
  stock: number,
  url:string,
  files: File[]|null
}

export type UpdateOrderParams = {
  order_id:number
  status:string
  received_payment:number
  cancel_reason:string,
  release:string|''
}

export type AddShipmentParams = {
  order_id: number
  carrier: string
  tracking: string
  status: "in_transit" | "delivered"
}
