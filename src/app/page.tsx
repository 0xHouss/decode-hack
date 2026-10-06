import About from "@/layouts/home/about-section";
import Ended from "@/layouts/home/ended-section";
import FAQ from "@/layouts/home/FAQ-section";
import Footer from "@/layouts/home/footer";
import Hero from "@/layouts/home/hero-section";
import ScrollReveal from "@/components/scroll-reveal";
import SplashScreen from "@/components/splashscreen";
import Sponsors from "@/layouts/home/sponsors-section";
import VisionMission from "@/layouts/home/vision-mission-section";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <ScrollReveal />
      <main className="relative w-full">
        <Hero />

        <div className="relative">
          <About />
          <VisionMission />

          <div className="-space-y-10 absolute top-1/2 left-1/2 -translate-1/2 -z-10">
            <div className="w-[50svw] aspect-square rounded-full bg-[#4E941A]/15 blur-[100px]" />
            <div className="w-[50svw] aspect-square rounded-full bg-[#4E941A]/15 blur-[100px]" />
          </div>
        </div>
        <Sponsors />
        <FAQ />
        <Ended />
      </main>
      <Footer />
    </>
  );
}
