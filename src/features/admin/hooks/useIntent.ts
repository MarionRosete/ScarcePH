import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPendingApproval } from "../api"
import type { Checkout } from "@/types/checkout"
import { apiClient } from "@/api/apiClient"


export const useGetPendingApproval = () => {
    return useQuery<[Checkout]>({
        queryKey:['pending-approval'],
        queryFn: getPendingApproval
    })
}



export const useApprovePaymentIntent = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post(`/checkout/approve`,{id}),
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["pending-approval"] })
        qc.invalidateQueries({queryKey:['dashboard-summary']})

    }
  })
}





export const useRejectPaymentIntent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post(`/checkout/reject`, {id}),
    onSuccess: () => {
       qc.invalidateQueries({ queryKey: ["pending-approval"] })
       qc.invalidateQueries({queryKey:['dashboard-summary']})
    },
  })
}
