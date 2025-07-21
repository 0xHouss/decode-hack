import { sections } from "@/lib/config"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="absolute top-8 left-5 right-5 lg:w-full lg:left-1/2 lg:-translate-x-1/2 rounded-full bg-gradient-to-r from-[#C3E956]/80 to-[#C3E956]/30 lg:max-w-6xl p-px z-10">
      <div className="bg-background rounded-full">
        <nav className="relative flex justify-between items-center bg-[#C3E95626] rounded-full m-auto p-2 lg:p-4">
          <MenuIcon className="lg:hidden text-white cursor-pointer" size={24} />

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
            <Link href="/register/personal" className="text-xs lg:text-base rounded-full bg-gradient-to-r text-white from-[#5D9535]/80 to-[#073B05]/70 p-2 lg:px-4">
              Register now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}