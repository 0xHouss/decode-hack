"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { sections } from "@/lib/config";
import { handleScroll } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-8 left-3 right-3 lg:w-full lg:left-1/2 lg:-translate-x-1/2 rounded-full bg-gradient-to-r from-[#C3E956]/80 to-[#C3E956]/30 lg:max-w-6xl p-px z-10">
      <div className="bg-background rounded-full">
        <nav className="relative flex justify-between items-center bg-[#C3E95626] rounded-full m-auto p-2 lg:p-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="overflow-y-auto w-70 bg-[radial-gradient(#030B01,#051600)]" side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={150}
                      height={50}
                      className="h-8 w-auto object-contain"
                      onClick={() => setOpen(false)}
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-12 justify-between h-full p-4">
                <div className="flex w-full flex-col gap-6">
                  {sections.map(section => (
                    <Link
                      key={section.title}
                      href={section.href}
                      className="text-lg flex items-center gap-4"
                      onClick={(e) => {
                        handleScroll(e, section)
                        setOpen(false)
                      }}
                    >
                      <section.icon className="text-[#C3E956]" />
                      <p>{section.title}</p>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex bg-gradient-to-br from-[#C3E956]/80 to-[#C3E956]/30 rounded-full p-px">
                    <Link
                      href="/register/personal"
                      className="text-sm rounded-full bg-gradient-to-r text-white from-[#5D9535]/80 to-[#073B05]/70 p-3 w-full text-center"
                      onClick={() => setOpen(false)}
                    >
                      Register now
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="px-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={50}
              className="h-7 lg:h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:block z-50">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                onClick={(e) => handleScroll(e, section)}
                className="text-sm lg:text-base text-white hover:text-[#5D9535] transition-colors duration-300 px-4 py-2 z-50"
              >
                {section.title}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex bg-gradient-to-br from-[#C3E956]/80 to-[#C3E956]/30 rounded-full p-px">
            <Link
              href="/register/personal"
              className="text-xs md:text-base rounded-full bg-gradient-to-r text-white from-[#5D9535]/80 to-[#073B05]/70 py-2 px-4"
            >
              Register now
            </Link>
          </div>

          <Button className="md:hidden" onClick={() => setOpen(true)} variant="ghost" size="icon">
            <Menu className="size-7 text-[#E3E812]" />
          </Button>
        </nav>
      </div>
    </header>
  )
}
