import Section from "@/components/section";
import Image from "next/image";

export default function Sponsors() {
  return (
    <Section id="sponsors" className="flex flex-col gap-8 items-center max-w-6xl">
      <h2 className="text-5xl bg-gradient-to-r from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">Our Sponsors</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <Image
          src="/sponsor-1.png"
          alt="Sponsor 1"
          width={150}
          height={100}
          className="object-contain"
        />
        {/* <Separator orientation="vertical" className="bg-gradient-to-b from-[#E3E812]/0 via-[#E3E812]/50 to-[#E3E812]/0" /> */}
        <Image
          src="/sponsor-2.png"
          alt="Sponsor 2"
          width={150}
          height={150}
          className="object-contain"
        />
        {/* <Separator orientation="vertical" className="bg-gradient-to-b from-[#E3E812]/0 via-[#E3E812]/50 to-[#E3E812]/0" /> */}
        <Image
          src="/sponsor-3.png"
          alt="Sponsor 3"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    </Section>
  )
}
