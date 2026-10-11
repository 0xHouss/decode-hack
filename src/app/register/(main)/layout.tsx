import Section from "@/components/section";
import { Separator } from "@/components/ui/separator";

export default function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <Section className="flex flex-col gap-5 lg:gap-10 items-center mt-0 lg:mt-0 lg:mb-10">
      <div>
        <h1 className="text-3xl lg:text-5xl flex gap-4 title-gradient">
          Join the adventure !
        </h1>
        <Separator className="my-4 w-full mx-auto h-[3px] bg-transparent divider-gradient" />
      </div>

      {children}
    </Section>
  )
}
