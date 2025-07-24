"use client";

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useEffect, useState } from "react";
import SplashScreen from "./splashscreen";

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (splashDone)
      document.body.classList.remove("overflow-hidden");
    else
      document.body.classList.add("overflow-hidden");
  }, [splashDone]);

  return (
    <QueryClientProvider client={queryClient}>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      {children}
    </QueryClientProvider>
  )
}
