import { useState } from "react"
import { createVariation, type VariationObj } from "../types/variations"
import { CreateVariation } from "@/api"


export function useVariations(pair_id:number) {
  const [vars, setVars] = useState<VariationObj[]>([createVariation(pair_id)])

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

  const update = <K extends keyof VariationObj>(
    index: number,
    key: K,
    value: VariationObj[K]
  ) =>
    setVars(v =>
      v.map((x, i) =>
        i === index ? { ...x, [key]: value } : x
      )
    )

  const submit = async () => {
    const variations = vars.map(({isOpen, ...payload })=>payload)
    const var_id = vars[0].id
    await CreateVariation(var_id, variations)
  }

  const addVariations =(variations:VariationObj[]) => {
    setVars(variations)
  }
    


  return { vars, add, remove, toggle, update,submit,addVariations }
}
