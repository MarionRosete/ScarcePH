export interface ApiErrorResponse {
  message?: string;
}

export type VariationParams = {
  inventory_id: number,
  condition: string,
  price: number,
  size: string,
  image: string,
  status: string,
  stock: number,
  url:string,
  id:number
}

