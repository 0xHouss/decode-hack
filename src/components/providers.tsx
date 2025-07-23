"use client";

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useState } from "react";
import SplashScreen from "./splashscreen";

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      {children}
    </QueryClientProvider>
  )
}
