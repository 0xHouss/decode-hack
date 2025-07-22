import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { sponsors } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export function SponsorCard({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={sponsor.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={sponsor.logo}
            alt={`Sponsor ${sponsor.name} Logo`}
            width={200}
            height={200}
            className="object-contain"
          />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={-40} className="w-90 border p-px rounded-xl border-[#3E941A] bg-[#06020D]">
        <div className="bg-[#4E941A]/18 p-4 space-y-4 rounded-xl" style={{
          boxShadow: "inset 0 0 10px #4E941A"
        }}>
          <div className="flex justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold">{sponsor.name}</h4>
              <p className="text-xs">{sponsor.description}</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
