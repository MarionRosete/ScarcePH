import { useState } from "react"
import { createVariation, type VariationObj } from "../types/variations"
import { CreateVariation } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useVariations= () => {
  const [vars, setVars] = useState<VariationObj[]>([createVariation()])

  const add = () =>
    setVars(v => [
      ...v.map(x => ({ ...x, isOpen: false })),
      { ...createVariation(), isOpen: true },
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
        i === index ? { ...x, isOpen: !x.isOpen } : {...x, isOpen:false}
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

  function buildVariationPayload(vars: any[]) {
    return vars.map(({ isOpen, ...payload }) => {
      if (payload.id === 0) {
        const { id, ...rest } = payload
        return rest
      }
      return payload
    })
  }

  const queryClient = useQueryClient()

  const submitVariation = useMutation({
    mutationFn: ({
      pairId,
      variations,
    }: {
      pairId: number
      variations: any[]
    }) => CreateVariation(pairId, variations),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] })
      queryClient.invalidateQueries({ queryKey: ["bestsellers"] })
    },
  })


  const addVariations =(variations:VariationObj[]) => {
    setVars(variations)
  }
    


  return { vars, add, remove, toggle, update,addVariations, submitVariation, buildVariationPayload }
}
