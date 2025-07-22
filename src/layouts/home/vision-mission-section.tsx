import Section from "@/components/section";

export default function VisionMission() {
  return (
    <Section id="vision-mission" className="flex flex-col gap-10 items-center max-w-6xl">
      <h2 className="text-5xl bg-gradient-to-r text-center lg:text-left from-[#E9FDB0] to-[#4E941A] bg-clip-text text-transparent">Our Vision & Mission</h2>

      <div className="flex flex-col md:flex-row justify-between lg:w-6xl gap-10">
        <div className="p-2 lg:p-7 bg-[url('/container-background.png')] rounded-2xl bg-cover flex-1/2">
          <div className="p-5 lg:p-7 bg-gradient-to-b from-[#0D1C13] to-[#0A160F] shadow-2xl rounded-2xl h-full">
            <h3 className="text-2xl lg:text-3xl">Our Mission</h3>
            <p className="text-muted-foreground mt-2 lg:mt-4 max-w-2/3 text-sm lg:text-base">
              To introduce beginners to the world of IT through a fun, accessible, and engaging online hackathon that encourages learning, teamwork, and discovering tech in real-life problems.
            </p>
          </div>
        </div>

        <div className="p-2 lg:p-7 bg-[url('/container-background.png')] rounded-2xl bg-cover flex-1/2">
          <div className="relative overflow-clip p-5 lg:p-7 bg-gradient-to-b from-[#0D1C13] to-[#0A160F] shadow-2xl rounded-2xl">
            <h3 className="text-2xl lg:text-3xl">Our Vision</h3>
            <p className="text-muted-foreground mt-2 lg:mt-4 max-w-2/3 text-sm lg:text-base z-30">
              To become an entry point for aspiring tech enthusiasts, where learning, innovation, and community come together to spark impactful ideas and build a generation of changemakers using technology for good.
            </p>

            <div className="absolute bottom-0 right-0 top-0 left-0 bg-contain bg-no-repeat bg-right bg-[url('/techs-background.svg')]" />
          </div>
        </div>
      </div>
    </Section>
  )
}
