import { apiClient } from "@/api/apiClient";



export function getAllAvailPairs() {
  return apiClient.get("inventory/get-all-available");
}


