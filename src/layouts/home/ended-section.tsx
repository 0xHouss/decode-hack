import Section from "@/components/section";
import { socials } from "@/lib/config";
import { MoveUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const discord = socials.find(social => social.name === "Discord")!;

export default function Ended() {
  return (
    <div className="relative">
      <div className="w-[40svw] aspect-square rounded-full bg-[#4E941A]/15 blur-[150px] absolute top-0 -translate-y-1/3 left-0" />
      <div className="w-[40svw] aspect-square rounded-full bg-[#4E941A]/15 blur-[150px] absolute bottom-0 right-0 translate-y-1/3" />

      <Section id="ended" className="flex flex-col lg:flex-row justify-between gap-10 max-w-8xl items-center">
        <div className="reveal space-y-4 w-fit flex-1/2">
          <h2 className="text-3xl lg:text-4xl bg-gradient-to-r from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">
            That&apos;s a wrap!
          </h2>
          <p className="text-lg lg:text-2xl max-w-md text-muted-foreground">
            Decode Hack ran from 31 July to 3 August 2025. Thank you to every participant, mentor and sponsor who made it happen.
          </p>
        </div>

        <div className="reveal relative flex-1/2 flex justify-center">
          <Image
            src="/decode-icon.png"
            alt="Decode Hack icon"
            width={300}
            height={400}
            className="float"
          />

          <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-gradient-to-br from-[#C3E956]/80 to-[#C3E956]/30 w-fit rounded-full flex p-px">
            <Link href={discord.href} target="_blank" className="press flex rounded-full items-center text-white py-5 px-10 w-fit" style={{
              background: "radial-gradient(50% 50% at 50% 50%, #96D667 0%, #4E941A 50.5%, #244E04 99.99%)",
              boxShadow: "0px 0px 80.4838px rgba(78, 148, 26, 0.64), 0px 0px 23.9878px 5.24324px rgba(0, 0, 0, 0.83), inset 0px -5.24324px 2.62162px rgba(0, 0, 0, 0.25), inset 0px 2.62162px 1.31081px rgba(255, 255, 255, 0.25)",
              borderRadius: "38px"
            }}>
              <p className="px-2 text-nowrap text-xl">Join our Discord</p>
              <MoveUpRightIcon />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
