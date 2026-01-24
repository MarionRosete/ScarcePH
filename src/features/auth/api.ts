import { apiClient } from "@/api/apiClient";

export type AuthUser = {
  id: string;
  role: "super_admin" | "user";
};

export type LoginResponse = {
  access_token: string;
  user: AuthUser;
};

export type AuthParams = {
    email:string
    password:string
}

export function checkToken() {
  return apiClient.get("/auth/validate");
}

export function loginRequest(payload: AuthParams) {
  return apiClient.post(
    "/login",
    payload
  );
}

export function registerRequest(payload:AuthParams){
    return apiClient.post(
    "/register",
    payload
  );
}
