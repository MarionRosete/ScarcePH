import { QueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/api/apiClient";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if ((error as ApiError)?.status === 401) return false;
        return failureCount < 2;
      },
    },
    mutations: {
      onError: (error) => {
        const apiError = error as ApiError;

        if (apiError.status === 401) {
          queryClient.clear()
          window.location.replace("/");
        }
      },
    },
  },
});
