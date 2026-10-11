import Section from "@/components/section";
import { SponsorCard } from "@/components/sponsor-card";
import { sponsors } from "@/lib/config";

export default function Sponsors() {
  return (
    <Section id="sponsors" className="flex flex-col gap-8 items-center max-w-6xl">
      <h2 className="reveal text-4xl md:text-5xl bg-gradient-to-r from-pistachio to-leaf bg-clip-text text-transparent">Our Sponsors</h2>

      <div className="flex flex-col md:flex-row md:gap-8 items-center">
        {sponsors.map((sponsor, idx) => (
          <div key={sponsor.name} className="reveal flex flex-col md:flex-row items-center gap-4 md:gap-8">

            <SponsorCard sponsor={sponsor} />

            {idx < sponsors.length - 1 && (
              <div
                className="bg-gradient-to-r md:bg-gradient-to-b h-0.5 w-30 md:h-30 md:w-0.5 from-citron/0 via-citron/50 to-citron/0"
                key={`separator-${idx}`}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
