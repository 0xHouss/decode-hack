import Light from "@/components/light";
import Providers from "@/components/providers";
import Header from "@/layouts/header";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Decode Hack",
  description: "Hack for impact - A hackathon by USTHB INFO ING-1 S-D for IT enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased flex flex-col items-center max-w-screen overflow-x-hidden relative min-h-screen `}>
        <Providers>
          <Header />

          <div className="absolute top-0 left-0 right-0 h-screen z-10 bg-size-[800px] pointer-events-none" style={{
            backgroundImage: "linear-gradient(transparent, var(--background) 80%), url('/line-pattern.png')"
          }} />

          <Light
            width={500}
            height={500}
            className="absolute top-0 left-0 z-0 pointer-events-none"
          />

          <Light
            width={500}
            height={500}
            className="absolute top-0 right-0 z-0 rotate-y-180 pointer-events-none"
          />

          <div className="absolute top-0 left-0 right-0 h-screen overflow-clip">
            <div className="absolute top-35 lg:top-45 rounded-t-full left-1/2 -translate-x-1/2 w-[150svw] lg:w-[130svw] aspect-square bg-gradient-to-r from-[#5D9535]/0 via-[#C3E956] to-[#5D9535]/0  pt-[2px]">
              <div className="relative bg-background rounded-t-full w-full h-full overflow-hidden">
                <div className="absolute left-0 right-0 top-0 bottom-0 rounded-t-full bg-gradient-to-b from-[#4E941A]/50 via-background to-background" />
              </div>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[50px] bg-[#D8FEE5]/50 rounded-full blur-[100px] z-0" />
            </div>
          </div>

          <div className="absolute top-55 lg:top-65 left-0 right-0 z-40">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
