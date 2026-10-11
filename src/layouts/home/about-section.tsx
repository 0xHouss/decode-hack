import Section from "@/components/section";
import Image from "next/image";
import Link from "next/link";
import { Discord } from "react-bootstrap-icons";

export default function About() {
  return (
    <Section id="about" className="lg:mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-clip bg-leaf/5 backdrop-blur-xs">
        <div className="reveal reveal-left p-6 md:p-10 flex flex-col items-start gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl heading-gradient">Who are we?</h2>

            <p className="text-muted-foreground">Section D Info ING: a group of curious minds aiming to build a solid and engaging learning community. It all began with a learning season led by professionals… an initiative to make tech more accessible and inspiring. That journey led to the D-code Hack hackathon in summer 2025.</p>
          </div>

          <Link
            href="https://discord.gg/bkPs8BhG6B"
            target="_blank"
            className="press flex p-3 gap-2 text-mint items-center border border-forest inset-ring inset-ring-[black] rounded-md bg-gradient-to-br from-leaf via-leaf/60 to-forest"
          >
            <Discord className="h-5 w-5 fill-mint" />

            Join us
          </Link>
        </div>

        <div className="reveal reveal-right mt-0 m-5 md:mt-5 p-5 rounded-2xl bg-forest/30">
          <Image
            src="/section-d-banner.jpg"
            alt="About Us"
            width={500}
            height={300}
            className="rounded-xl object-cover shadow-xl w-full border border-night-500"
          />
        </div>
      </div>
    </Section>
  )
}
