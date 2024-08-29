"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/server/client";
import toast from "react-hot-toast";
import superjson from "superjson";


export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 3600000,
            gcTime: 86400000,
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false,
          },
          mutations: {
            onError: (error) => {
              console.error(error);
              toast.dismiss();
              toast.error(error.message);
            },
          },
        },
      }),
  );

  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}