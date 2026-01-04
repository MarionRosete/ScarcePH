import { useState } from "react"
import { createVariation, type Variation } from "../types/variations"
import { CreateVariation } from "@/api"
import { toast } from "sonner"


export function useVariations(pair_id:number) {
  const [vars, setVars] = useState<Variation[]>([createVariation(pair_id)])

  const add = () =>
    setVars(v => [
      ...v.map(x => ({ ...x, isOpen: false })),
      { ...createVariation(pair_id), isOpen: true },
    ])

  const remove = (index: number) =>
    setVars(v => {
      if (v.length === 1) return v
      const next = v.filter((_, i) => i !== index)
      if (!next.some(x => x.isOpen)) next[0].isOpen = true
      return next
    })

  const toggle = (index: number) =>
    setVars(v =>
      v.map((x, i) =>
        i === index ? { ...x, isOpen: !x.isOpen } : x
      )
    )

  const update = <K extends keyof Variation>(
    index: number,
    key: K,
    value: Variation[K]
  ) =>
    setVars(v =>
      v.map((x, i) =>
        i === index ? { ...x, [key]: value } : x
      )
    )

  const submit = async () => {
    vars.map(({ id, isOpen, ...payload },key)=>{
      CreateVariation(key,payload)
      
    })
  }
    


  return { vars, add, remove, toggle, update,submit }
}
