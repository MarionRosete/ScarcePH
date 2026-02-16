import { apiClient } from "@/api/apiClient";

export type EditPairParam = {
  inventory_id:number
  name:string
  description:string
}

export function editPair(payload: EditPairParam) {
  return apiClient.post(
    "/inventory/edit",
    payload
  );
}

export function getPendingApproval(){
  return apiClient.get(
    "/checkout/pending-approval"
  )
}