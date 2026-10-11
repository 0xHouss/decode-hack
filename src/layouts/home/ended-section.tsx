import Section from "@/components/section";
import { socials } from "@/lib/config";
import { MoveUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const discord = socials.find(social => social.name === "Discord")!;

export default function Ended() {
  return (
    <div className="relative">
      <div className="w-[40svw] aspect-square rounded-full bg-leaf/15 blur-[150px] absolute top-0 -translate-y-1/3 left-0" />
      <div className="w-[40svw] aspect-square rounded-full bg-leaf/15 blur-[150px] absolute bottom-0 right-0 translate-y-1/3" />

      <Section id="ended" className="flex flex-col lg:flex-row justify-between gap-10 max-w-8xl items-center">
        <div className="reveal reveal-left space-y-4 w-fit flex-1/2">
          <h2 className="text-3xl lg:text-4xl heading-gradient">
            That&apos;s a wrap!
          </h2>
          <p className="text-lg lg:text-2xl max-w-md text-muted-foreground">
            Decode Hack ran from 31 July to 3 August 2025. Thank you to every participant, mentor and sponsor who made it happen.
          </p>
        </div>

        <div className="reveal reveal-right relative flex-1/2 flex justify-center">
          <Image
            src="/decode-icon.png"
            alt="Decode Hack icon"
            width={300}
            height={400}
            className="float"
          />

          <div className="absolute top-1/2 left-1/2 -translate-1/2 w-fit flex cta-frame">
            <Link href={discord.href} target="_blank" className="press glow-button flex items-center text-white py-5 px-10 w-fit">
              <p className="px-2 text-nowrap text-xl">Join our Discord</p>
              <MoveUpRightIcon />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
