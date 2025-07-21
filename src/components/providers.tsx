"use client";

import { useCenteredScroll } from "@/hooks/use-centered-scroll";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  useCenteredScroll()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}