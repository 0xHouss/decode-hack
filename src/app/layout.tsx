import Light from "@/components/light";
import Header from "@/layouts/header";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const title = "Decode Hack";
const description = "Hack for impact - A hackathon by USTHB INFO ING-1 S-D for IT enthusiasts.";

export const metadata: Metadata = {
  metadataBase: new URL("https://decode-hack.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // data-scroll-behavior lets Next.js turn smooth scrolling off during route changes
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth max-w-screen`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Mark the splash screen as seen before first paint, so it doesn't flash on repeat
            visits. Visitors who prefer reduced motion skip it: it's only an animation, and
            lottie-react doesn't autoplay for them, so it would never finish. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("splash-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-splash-seen","")}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased flex flex-col items-center relative min-h-screen">
        <Header />

        <div className="absolute top-0 left-0 right-0 h-screen z-10 bg-size-[800px] pointer-events-none" style={{
          backgroundImage: "linear-gradient(transparent, var(--background) 80%), url('/line-pattern.png')"
        }} />

        {/* Clipped sideways, so the lights don't make narrow screens scroll horizontally */}
        <div className="absolute inset-x-0 top-0 overflow-x-clip pointer-events-none">
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
        </div>

        <div className="absolute top-0 left-0 right-0 h-screen overflow-clip">
          <div className="absolute top-35 lg:top-45 rounded-t-full left-1/2 -translate-x-1/2 w-[150svw] lg:w-[130svw] aspect-square bg-gradient-to-r from-moss/0 via-chartreuse to-moss/0 pt-[2px]">
            <div className="relative bg-background rounded-t-full w-full h-full overflow-hidden">
              <div className="absolute left-0 right-0 top-0 bottom-0 rounded-t-full bg-gradient-to-b from-leaf/50 via-background to-background" />
            </div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[50px] bg-frost/50 rounded-full blur-[100px] z-0" />
          </div>
        </div>

        {/* The page itself, in normal flow so the window scrolls. The layers above are decoration.
            It clips sideways overflow, like full-width sections and content sliding in on reveal.
            It's offset with a margin, not padding: it stacks above the header, so its box must
            start below it or it would catch the header's clicks. */}
        <div className="relative z-40 w-full mt-55 lg:mt-65 overflow-x-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
