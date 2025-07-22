import Section from "@/components/section";
import Image from "next/image";
import Link from "next/link";
import { Discord } from "react-bootstrap-icons";

export default function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-clip bg-[#4E941A]/5 backdrop-blur-xs">
        <div className="p-10 flex flex-col items-start gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">Who are we?</h2>

            <p className=" text-muted-foreground">Section D Info ING: a group of curious minds aiming to build a solid and engaging learning community. It all began with a learning season led by professionals… an initiative to make tech more accessible and inspiring. Now, it’s time for the D-code Hack hackathon</p>
          </div>

          <Link
            href="https://discord.gg/bkPs8BhG6B"
            target="_blank"
            className="flex p-3 gap-2 text-[#E8FFD7] items-center border border-[#073B05] inset-ring inset-ring-[black] rounded-md bg-gradient-to-br from-[#4E941A] via-[#4E941A]/60 to-[#073B05]"
          >
            <Discord className="h-5 w-5" fill="#E8FFD7" />

            Join us
          </Link>
        </div>

        <div className="mt-0 m-5 md:mt-5 p-5 rounded-2xl bg-[#073B05]/30">
          <Image
            src="/section-d-banner.jpg"
            alt="About Us"
            width={500}
            height={300}
            className="rounded-xl object-cover shadow-xl w-full border border-[#172F21]"
          />
        </div>
      </div>
    </Section>
  )
}
