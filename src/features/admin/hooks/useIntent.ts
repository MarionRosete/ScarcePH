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
      apiClient.post(`/payments/${id}/approve`),
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["pending-approval"] })

    }
  })
}





export const useRejectPaymentIntent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post(`/payments/${id}/reject`),
    onSuccess: () => {
       qc.invalidateQueries({ queryKey: ["pending-approval"] })
    },
  })
}
