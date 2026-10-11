"use client";

import { PillLink } from "@/components/pill-button";
import { Separator } from "@/components/ui/separator";
import { initialRegistrationData, useRegistrationStore } from "@/lib/store";
import { useEffect } from "react";

export default function RegistrationSuccessPage() {
  useEffect(() => {
    useRegistrationStore.setState(initialRegistrationData)
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div>
        <h1 className="text-2xl text-nowrap lg:text-5xl flex gap-4 bg-gradient-to-b bg-clip-text pb-2 text-transparent from-[#E3E812] to-[#E9FDB0]/50">
          Registration Successful!
        </h1>
        <Separator className="my-4 w-full mx-auto h-[3px] bg-gradient-to-r from-[#4E941A]/0 via-[#4E941A] to-[#4E941A]/0" />
      </div>

      <p className="text-lg lg:text-2xl text-center max-w-sm">
        Thank you for registering! We look forward to seeing you at the event.
      </p>

      <PillLink href="/" direction="next" size="lg" className="mt-5">Go back</PillLink>
    </div>
  )
}
