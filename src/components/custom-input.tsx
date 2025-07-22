import { cn } from "@/lib/utils"
import { Input } from "./ui/input"

function CustomInput({ className, type, icon, ...props }: React.ComponentProps<"input"> & { icon: React.ReactNode }) {
  return (
    <div className="relative bg-gradient-to-b from-[#398B56] to-[#17271D] h-fit p-px rounded-2xl">
      <Input
        type={type}
        className={cn("h-12 rounded-2xl border-0 bg-[#050B08] dark:bg-[#050B08] placeholder:text-[#F0FFD1]/50", className)}
        {...props}
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F0FFD1]">
        {icon}
      </div>
    </div>
  )
}

export { CustomInput }
