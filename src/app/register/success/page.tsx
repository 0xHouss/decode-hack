import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default function RegistrationSuccessPage() {
  return (
    <div className="flex flex-col gap-3 items-center absolute top-1/2 left-1/2 -translate-1/2">
      <div>
        <h1 className="text-3xl text-nowrap lg:text-5xl flex gap-4 bg-gradient-to-b bg-clip-text pb-2 text-transparent from-[#E3E812] to-[#E9FDB0]/50">
          Registration Successful!
        </h1>
        <Separator className="my-4 w-full mx-auto h-[3px] bg-gradient-to-r from-[#4E941A]/0 via-[#4E941A] to-[#4E941A]/0" />
      </div>

      <p className="text-xl lg:text-2xl text-center max-w-xl">
        Thank you for registering! We look forward to seeing you at the event.
      </p>

      <div className="bg-gradient-to-r from-[#5D9535] to-[#073B05] rounded-full mt-5">
        <div className="p-px bg-gradient-to-r from-[#E9FFD9]/30 to-[#E3E812]/30 rounded-full">
          <Link href="/" className="bg-gradient-to-r flex items-center from-[#5D9535] to-[#073B05] gap-1 rounded-full px-4 py-2">
            <p className="bg-gradient-to-br from-[#F0FFD1] to-[#FDFFB4] bg-clip-text text-transparent pl-1">Go back</p>
            <ChevronRightIcon className="text-[#FDFFB4]" />
          </Link>
        </div>
      </div>
    </div>
  )
}
