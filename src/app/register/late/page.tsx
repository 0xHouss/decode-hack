import { PillLink } from "@/components/pill-button";
import { Separator } from "@/components/ui/separator";

export default function RegistrationLatePage() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div>
        <h1 className="text-2xl text-nowrap lg:text-5xl flex gap-4 bg-gradient-to-b bg-clip-text pb-2 text-transparent from-citron to-pistachio/50">
          Registration Closed !
        </h1>
        <Separator className="my-4 w-full mx-auto h-[3px] bg-gradient-to-r from-leaf/0 via-leaf to-leaf/0" />
      </div>

      <p className="text-lg lg:text-2xl text-center max-w-sm">
        Oops! The registration period has ended. We appreciate your interest in Decode Hack and hope to see you at our future events.
      </p>

      <PillLink href="/" direction="next" size="lg" className="mt-5">Go back</PillLink>
    </div>
  )
}
