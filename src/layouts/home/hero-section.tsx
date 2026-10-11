import Section from "@/components/section";
import { socials } from "@/lib/config";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export default function Hero() {
  return (
    <Section id="home" className="flex flex-col gap-3 w-screen overflow-clip max-w-screen md:gap-10 items-center justify-center mt-0 lg:mt-0 lg:mb-20">
      <div className="enter">
        <h1 className="text-4xl md:text-7xl flex gap-4">
          <span className="bg-gradient-to-b bg-clip-text text-transparent from-citron to-pistachio/50">Decode</span>
          <span className="bg-gradient-to-b bg-clip-text text-transparent from-pistachio to-pistachio/40">Hack</span>
        </h1>
        <Separator className="my-4 w-full mx-auto h-[3px] bg-gradient-to-r from-leaf/0 via-leaf to-leaf/0" />
      </div>

      <div className="enter [--enter-delay:150ms] bg-gradient-to-b from-leaf to-forest p-px rounded-xl">
        <div className="bg-background rounded-xl">
          <div className="relative md:max-w-3xl w-full rounded-lg bg-forest/20 p-2 space-y-2">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[400px] h-[80px] bg-frost/20 rounded-full blur-[100px] z-0" />

            <div className="rounded-lg border overflow-hidden border-leaf bg-ink">
              <div className="bg-leaf/18 p-4 space-y-4" style={{
                boxShadow: "inset 0 0 10px var(--color-leaf)"
              }}>
                <p>
                  A <span className="text-chartreuse">three-day</span> online <span className="text-chartreuse">hackathon</span> held from <span className="text-chartreuse">31 July</span> to <span className="text-chartreuse">3 August 2025</span>, designed to introduce IT through a real-world problem: ecology. Open to all <span className="text-chartreuse">beginners</span> and <span className="text-chartreuse">passionate learners</span>, it was animated and mentored by experts in an engaging and supportive environment, giving many participants their first, unforgettable hackathon experience.
                </p>

                <p>
                  Thank you to everyone who took up the <span className="text-chartreuse">challenge</span> and helped us <span className="text-chartreuse">build a better planet</span>!
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-end md:items-center">
              <div className="flex gap-2">
                {socials.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="press text-xs md:text-base p-2 gap-2 border flex items-center border-forest inset-ring inset-ring-[black] rounded-md bg-gradient-to-b from-night-700 via-night-800 to-night-800"
                  >
                    <social.icon className="h-5 w-5 fill-mint" />
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
