import { useMutation } from "@tanstack/react-query"
import {
  startCheckout,
  submitCheckoutProof,
  saveCheckoutCustomer,
  getCheckoutSession,
  type StartCheckoutPayload,
  type SubmitProofPayload,
  type SaveCheckoutCustomerPayload,
  type CheckoutSession,
} from "../api"
import { useQuery } from "@tanstack/react-query"

export const useStartCheckout = () => {
  return useMutation({
    mutationFn: (payload: StartCheckoutPayload) => startCheckout(payload),
  })
}

export const useGetCheckoutSession = (id: string) => {
  return useQuery<CheckoutSession>({
    queryKey: ["checkout-session", id],
    queryFn: () => getCheckoutSession(id),
    enabled: !!id,
    retry: false,

  })
}

export const useSubmitCheckoutProof = () => {
  return useMutation({
    mutationFn: (payload: SubmitProofPayload) => submitCheckoutProof(payload),
  })
}

export const useSaveCheckoutCustomer = () => {
  return useMutation({
    mutationFn: (payload: SaveCheckoutCustomerPayload) => saveCheckoutCustomer(payload),
  })
}
