import Section from "@/components/section";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { sponsors } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export function SponsorCard({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={sponsor.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={sponsor.logo}
            alt={`Sponsor ${sponsor.name} Logo`}
            width={200}
            height={200}
            className="object-contain"
          />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={-40} className="w-90">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold">{sponsor.name}</h4>
            <p className="text-xs">{sponsor.description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default function Sponsors() {
  return (
    <Section id="sponsors" className="flex flex-col gap-8 items-center max-w-6xl">
      <h2 className="text-5xl bg-gradient-to-r from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">Our Sponsors</h2>

      <div className="flex flex-col md:flex-row md:gap-8 items-center">
        {sponsors.map((sponsor, idx) => (
          <div key={sponsor.name} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">

            <SponsorCard sponsor={sponsor} />

            {idx < sponsors.length - 1 && (
              <div
                className="bg-gradient-to-r md:bg-gradient-to-b h-0.5 w-30 md:h-30 md:w-0.5 from-[#E3E812]/0 via-[#E3E812]/50 to-[#E3E812]/0"
                key={`separator-${idx}`}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
