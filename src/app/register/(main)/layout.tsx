import Section from "@/components/section";
import { Separator } from "@/components/ui/separator";

export default function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <Section className="flex flex-col gap-5 lg:gap-10 items-center mt-0 lg:mt-0 lg:mb-10">
      <div>
        <h1 className="text-3xl lg:text-5xl flex gap-4 bg-gradient-to-b bg-clip-text text-transparent from-citron to-pistachio/50">
          Join the adventure !
        </h1>
        <Separator className="my-4 w-full mx-auto h-[3px] bg-gradient-to-r from-leaf/0 via-leaf to-leaf/0" />
      </div>

      {children}
    </Section>
  )
}
