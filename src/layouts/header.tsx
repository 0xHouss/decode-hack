"use client";

import { sections } from "@/lib/config"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-8 left-5 right-5 lg:w-full lg:left-1/2 lg:-translate-x-1/2 rounded-full bg-gradient-to-r from-[#C3E956]/80 to-[#C3E956]/30 lg:max-w-6xl p-px z-10">
      <div className="bg-background rounded-full">
        <nav className="relative flex justify-between items-center bg-[#C3E95626] rounded-full m-auto p-2 lg:p-4">
          <Button className="lg:hidden" onClick={() => setOpen(true)} variant="ghost" size="icon">
            <Menu className="size-7 text-[#E3E812]" />
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={150}
                      height={50}
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <div className="flex w-full flex-col gap-4">
                  {sections.map(section => (
                    <Link
                      key={section.title}
                      href={section.href}
                      className="text-lg"
                      onClick={() => setTimeout(() => setOpen(false), 1000)} // Close the sheet after clicking a link
                    >
                      {section.title}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex bg-gradient-to-br from-[#C3E956]/80 to-[#C3E956]/30 rounded-full p-px">
                    <Link href="/register/personal" className="text-sm rounded-full bg-gradient-to-r text-white from-[#5D9535]/80 to-[#073B05]/70 p-3 w-full text-center">
                      Register now
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:relative lg:translate-0 lg:left-0">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={50}
              className="h-7 lg:h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:block z-50">
            {sections.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-white hover:text-[#5D9535] transition-colors duration-300 px-4 py-2 z-50"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex bg-gradient-to-br from-[#C3E956]/80 to-[#C3E956]/30 rounded-full p-px">
            <Link href="/register/personal" className="text-xs lg:text-base rounded-full bg-gradient-to-r text-white from-[#5D9535]/80 to-[#073B05]/70 py-2 px-4">
              Register now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
