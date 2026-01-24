import { useMutation, useQuery } from "@tanstack/react-query";
import { loginRequest, checkToken, type AuthParams, registerRequest, logoutRequest } from "../api";
import { useQueryClient } from "@tanstack/react-query";


export const useAuthCheck = () => {
  return useQuery({
    queryKey: ["auth-check"],
    queryFn: checkToken,
    retry: false,
  });
}

export const useLogin= () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      localStorage.setItem("token", response.access_token);
      queryClient.invalidateQueries({ queryKey: ["auth-check"] });
    },
  });
}

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password}: AuthParams) => registerRequest({email, password}),
        onSuccess: (response) => {
          localStorage.setItem("token", response.access_token);
          queryClient.invalidateQueries({ queryKey: ["auth-check"] });
        },
    });
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.invalidateQueries({ queryKey: ["auth-check"] });
      window.location.replace('/')
    },
  });
}
