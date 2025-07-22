import { Separator } from "@/components/ui/separator";
import { sections, socials } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <footer className="flex w-screen flex-col p-6 lg:p-0 max-w-6xl m-auto mb-8 gap-4">
      <div className="flex flex-col gap-8 lg:flex-row py-8 justify-between border-y border-[#737373]">
        <Image src="/logo.svg" alt="Logo" width={200} height={76} />

        <div className="flex flex-col lg:w-[60%] gap-6">
          <div className="flex gap-6 lg:gap-15">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold lg:text-lg">Contact Us</h3>
              <p className="text-sm lg:text-base">sectiond.relations@gmail.com</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold lg:text-lg">Follow Us</h3>

              <ul className="flex gap-2 justify-between">
                {socials.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="text-sm lg:text-base text-nowrap"
                  >
                    <SocialIcon url={social.href} as="li" style={{ height: 32, width: 32 }} bgColor="#4E941A" />
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="bg-[#737373] w-full" />

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold lg:text-lg">Navigation</h3>

            <ul className="flex gap-2 flex-wrap justify-between">
              {sections.map(section => (
                <Link
                  key={section.title}
                  href={section.href}
                  className="text-sm lg:text-base text-nowrap"
                >
                  {section.title}
                </Link>
              )
              )}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm lg:text-base">
        © 2025 DecodeHack. All rights reserved.
      </p>
    </footer>
  );
}
