"use client";

import { registrationEndDate } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

interface CondownProps {
  className?: string;
}

// Current time in whole seconds, updated every second on the client only
const subscribeToClock = (onTick: () => void) => {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
};
const getNowSeconds = () => Math.floor(Date.now() / 1000);
const getServerNowSeconds = () => null;

export default function Countdown({ className }: CondownProps) {
  const nowSeconds = useSyncExternalStore(subscribeToClock, getNowSeconds, getServerNowSeconds);

  const getTimeLeft = (now: number) => {
    const total = registrationEndDate.getTime() - now;
    const clamp = (n: number) => Math.max(0, n);

    return {
      days: clamp(Math.floor(total / (1000 * 60 * 60 * 24))),
      hours: clamp(Math.floor((total / (1000 * 60 * 60)) % 24)),
      minutes: clamp(Math.floor((total / 1000 / 60) % 60)),
      seconds: clamp(Math.floor((total / 1000) % 60)),
      isDone: total <= 0,
    };
  };

  const timeLeft = nowSeconds === null ? null : getTimeLeft(nowSeconds * 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl bg-gradient-to-r from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">
        Registrations ends in :
      </h2>

      <p className="text-5xl font-bold tracking-widest text-muted-foreground">
        {!timeLeft ? (
          "--:--:--:--"
        ) : timeLeft.isDone ? (
          "00:00:00:00"
        ) : (
          `${pad(timeLeft.days)}:${pad(timeLeft.hours)}:${pad(
            timeLeft.minutes
          )}:${pad(timeLeft.seconds)}`
        )}
      </p>
    </div>
  );
}
