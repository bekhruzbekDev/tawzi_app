import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 daqiqa
    //@ts-ignore
      cacheTime: 1000 * 60 * 5, // 5 daqiqa
    },
    mutations: {
      retry: 0,
    },
  },
});
