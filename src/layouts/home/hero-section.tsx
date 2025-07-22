import Section from "@/components/section";
import { socials } from "@/lib/config";
import { Separator } from "@radix-ui/react-separator";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <Section id="home" className="flex flex-col gap-3 md:gap-10 items-center justify-center mt-0 md:mt-0">
      <div>
        <h1 className="text-5xl md:text-8xl flex gap-4">
          <span className="bg-gradient-to-b bg-clip-text text-transparent from-[#E3E812] to-[#E9FDB0]/50">Decode</span>
          <span className="bg-gradient-to-b bg-clip-text text-transparent from-[#E9FDB0] to-[#E9FDB0]/40">Hack</span>
        </h1>
        <Separator className="my-4 w-full mx-auto h-[3px] bg-gradient-to-r from-[#4E941A]/0 via-[#4E941A] to-[#4E941A]/0" />
      </div>

      <div className="bg-gradient-to-b from-[#4E941A] to-[#073B05] p-px rounded-xl">
        <div className="bg-background rounded-xl">
          <div className="relative md:max-w-3xl rounded-lg bg-[#073B05]/20 p-2 space-y-2">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[400px] h-[80px] bg-[#D8FEE5]/20 rounded-full blur-[100px] z-0" />

            <div className="rounded-lg border overflow-hidden  border-[#4E941A] bg-[#06020D]">
              <div className="bg-[#4E941A]/18 p-4 space-y-4" style={{
                boxShadow: "inset 0 0 10px #4E941A"
              }}>
                <p>
                  A <span className="text-[#C3E956]">three-day</span> online <span className="text-[#C3E956]">hackathon</span> designed to introduce IT across a real-world problem: ecology, open to all <span className="text-[#C3E956]">beginners</span> and <span className="text-[#C3E956]">passionate learners</span>. Animated and mentored by experts, it offers an engaging and supportive environment. We’ll help you live your first and unforgettable hackathon experience.
                </p>

                <p>
                  <span className="text-[#C3E956]">Challenge yourself</span> and join us to <span className="text-[#C3E956]">build a better planet</span>!
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
                    className="p-2 gap-2 border flex items-center border-[#073B05] inset-ring inset-ring-[black] rounded-md bg-gradient-to-b from-[#0C1711] via-[#0A120D] to-[#0A120D]"
                  >
                    <social.icon fill="#E8FFD7" className="h-5 w-5" />
                    {social.name}
                  </Link>
                ))}
              </div>

              <Link href="/register/personal" className="flex p-2 border border-[#073B05] inset-ring inset-ring-[black] rounded-md bg-gradient-to-br from-[#4E941A] via-[#4E941A]/60 to-[#073B05]">
                <span className="px-2">
                  Register now
                </span>
                <ArrowUpRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
