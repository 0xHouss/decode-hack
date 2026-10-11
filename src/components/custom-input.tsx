import { cn } from "@/lib/utils"
import { Input } from "./ui/input"

function CustomInput({ className, type, icon, ...props }: React.ComponentProps<"input"> & { icon: React.ReactNode }) {
  return (
    <div className="relative h-fit field-frame">
      <Input
        type={type}
        className={cn("h-12 rounded-2xl border-0 bg-night-900 dark:bg-night-900 placeholder:text-cream/50", className)}
        {...props}
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cream">
        {icon}
      </div>
    </div>
  )
}

export { CustomInput }
