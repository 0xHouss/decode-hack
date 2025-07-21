import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FAQCardProps {
  children?: ReactNode;
  className?: string;
}

function FAQCard({ children, className }: FAQCardProps) {
  return (
    <div className={cn("rounded-lg col-span-2 lg:h-70 bg-gradient-to-br from-[#4E941A]/80 to-[#4E941A]/20 p-px z-0", className)}>
      <div className={cn("relative h-full w-full bg-background rounded-lg z-20 p-8 pr-5", className)}>
        {children}
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Section id="faq" className="flex flex-col items-center gap-10 max-w-7xl">
      <h2 className="text-4xl lg:text-4xl bg-gradient-to-r text-center lg:text-left from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">Frequently Asked Questions</h2>

      <div className="relative grid grid-cols-1 lg:grid-cols-6 gap-2 w-full">
        <FAQCard className="rounded-tr-[300px] lg:rounded-tl-[300px] lg:rounded-tr-lg col-span-3">
          <div className="flex flex-col gap-3 lg:ml-30">
            <div className="h-15 w-15 bg-[url('/decode-icon.svg')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">About DecodeHack ?</h3>
            <p>DecodeHack is a 100% online hackathon designed to help you explore and elevate your IT skills.</p>
          </div>
        </FAQCard>
        <FAQCard className="col-span-3">
          <div className="flex flex-col gap-3">
            <div className="h-15 w-15 bg-[url('/magnifier-icon.svg')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">Who is it for?</h3>
            <p>Motivated and curious beginners. The challenges are made to be friendly and stress-free, offering a great first experience in the world of tech.</p>
          </div>
        </FAQCard>
        <FAQCard>
          <div className="flex flex-col gap-3">
            <div className="h-15 w-15 bg-[url('/file-folder-icon.png')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">What&apos;s included?</h3>
            <p>Our professionals will be available throughout the entire journey to answer questions and support your team.</p>
          </div>
        </FAQCard>
        <FAQCard>
          <div className="flex flex-col gap-3">
            <div className="h-15 w-15 bg-[url('/code-file-icon.svg')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">MORE THAN JUST CODING!</h3>
            <p>We&apos;re also planning some chill activities and online games so you can code, connect, and have fun at the same time.</p>
          </div>
        </FAQCard>
        <FAQCard>
          <div className="flex flex-col gap-3">
            <div className="h-15 w-15 bg-[url('/lightning-icon.svg')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">What&apos;s in it for you?</h3>
            <p>By participating, you&apos;ll not only learn and grow, but you&apos;ll also have the chance to win some exciting prizes.</p>
          </div>
        </FAQCard>
        <FAQCard>
          <div className="flex flex-col gap-3">
            <div className="h-15 w-15 bg-[url('/team-icon.svg')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">Individual or Team?</h3>
            <p>It&apos;s a team competition, so build your team of 4 and register now.</p>
          </div>
        </FAQCard>
        <FAQCard>
          <div className="flex flex-col gap-3">
            <div className="h-15 w-15 bg-[url('/discord-icon.svg')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">Where?</h3>
            <p>On our Discord server. The link will be shared within an email once you are accepted.</p>
          </div>
        </FAQCard>
        <FAQCard className="rounded-br-[300px]">
          <div className="flex flex-col gap-3">
            <div className="h-15 w-15 bg-[url('/email-icon.svg')] bg-contain bg-no-repeat bg-center" />
            <h3 className="text-xl font-semibold text-[#F0FFC7]">Got another Question?</h3>
            <p className=" max-w-2/3">Contact us via our discord server and we will be happy to answer you!</p>
          </div>
        </FAQCard>

        <div className="w-[30svw] aspect-square absolute top-1/2 left-1/2 -translate-1/2 bg-[#4E941A]/20 z-10 pointer-events-none" style={{
          filter: "blur(250px)",
        }} />
      </div>
    </Section>
  )
}
