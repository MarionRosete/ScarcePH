export interface ApiErrorResponse {
  message?: string;
}

export type VariationParams = {
  condition: string,
  price: number,
  size: string,
  image: string,
  status: string,
  stock: number,
  url:string,
}

export type UpdateOrderParams = {
  order_id:number
  status:string
  received_payment:number
  cancel_reason:string,
  release:string
}

