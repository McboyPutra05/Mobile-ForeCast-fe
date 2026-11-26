import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query Client Configuration
 * Dynamic TTL support:
 * Standby Mode: staleTime 15 seconds
 * High-Alert Mode: staleTime 3 seconds
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 1000, // 15s Standby Mode default
      gcTime: 10 * 60 * 1000, // 10 minutes memory retention
      retry: (failureCount, error: any) => {
        // Do not retry on 401 or 403
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

