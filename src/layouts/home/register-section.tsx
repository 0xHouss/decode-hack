import Countdown from "@/components/countdown";
import Section from "@/components/section";
import { MoveUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="relative">
      <div className="w-[40svw] aspect-square rounded-full bg-[#4E941A]/15 blur-[150px] absolute top-0 -translate-y-1/3 left-0" />
      <div className="w-[40svw] aspect-square rounded-full bg-[#4E941A]/15 blur-[150px] absolute bottom-0 right-0 translate-y-1/3" />

      <Section id="faq" className="flex flex-col lg:flex-row justify-between gap-10 max-w-8xl items-center">
        <div className="flex flex-col gap-14 w-fit flex-1/2">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl bg-gradient-to-r from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">
              Spots are limited, RUN!
            </h2>
            <p className="text-lg lg:text-2xl max-w-md text-muted-foreground">
              Don&apos;t wait to learn, build and contribute to a better planet.
            </p>
          </div>

          <Countdown className="hidden lg:block" />
        </div>

        <div className="flex flex-col items-center gap-14 flex-1/2">
          <div className="relative">
            <Image
              src="/decode-icon.svg"
              alt="Register Illustration"
              width={300}
              height={400}
            />

            <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-gradient-to-br from-[#C3E956]/80 to-[#C3E956]/30 w-fit rounded-full flex p-px">
              <Link href="/register/personal" className="flex rounded-full items-center bg-gradient-to-r text-white from-[#5D9535]/80 to-[#073B05]/70 py-5 px-10 w-fit" style={{
                background: "radial-gradient(50% 50% at 50% 50%, #96D667 0%, #4E941A 50.5%, #244E04 99.99%)",
                boxShadow: "0px 0px 80.4838px rgba(78, 148, 26, 0.64), 0px 0px 23.9878px 5.24324px rgba(0, 0, 0, 0.83), inset 0px -5.24324px 2.62162px rgba(0, 0, 0, 0.25), inset 0px 2.62162px 1.31081px rgba(255, 255, 255, 0.25)",
                borderRadius: "38px"
              }}>
                <p className="px-2 text-nowrap text-xl">Register now</p>
                <MoveUpRightIcon />
              </Link>
            </div>
          </div>

          <Countdown className="lg:hidden" />
        </div>
      </Section>
    </div>
  )
}
