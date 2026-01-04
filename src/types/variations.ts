export interface Variation {
  id: string
  image: string
  url: string
  condition: string
  size: string
  price: number
  stock: number
  isOpen: boolean
}

export const createVariation = (): Variation => ({
  id: crypto.randomUUID(),
  image: "",
  url: "",
  condition: "",
  size: "",
  price: 0,
  stock: 0,
  isOpen: false,
})
