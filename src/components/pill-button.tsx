import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { ComponentProps, ReactNode } from "react"

// The site's rounded green buttons, with a thin light gradient border

const fills = {
  solid: "bg-gradient-to-r from-moss to-forest",
  // Translucent, over the page background
  faded: "bg-gradient-to-r from-moss/50 to-forest/30",
}

interface PillProps {
  variant?: keyof typeof fills
  // Adds a chevron pointing back or forward
  direction?: "back" | "next"
  size?: "default" | "lg"
  // Applies to the outer frame, for positioning
  className?: string
}

const pillClassName = (variant: keyof typeof fills, size: PillProps["size"]) =>
  cn(buttonVariants({ size }), "gap-1 rounded-full", size === "lg" && "text-base", fills[variant])

function PillFrame({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn("w-fit rounded-full bg-gradient-to-r from-moss to-forest", className)}>
      <div className="rounded-full bg-gradient-to-r from-honeydew/30 to-citron/30 p-px">
        <div className="rounded-full bg-background">
          {children}
        </div>
      </div>
    </div>
  )
}

function PillContent({ direction, size, children }: Pick<PillProps, "direction" | "size"> & { children: ReactNode }) {
  const iconClassName = cn("text-butter", size === "lg" && "size-6")

  return (
    <>
      {direction === "back" && <ChevronLeftIcon className={iconClassName} />}
      <span className={cn(
        "bg-gradient-to-br from-cream to-butter bg-clip-text text-transparent",
        direction === "back" && "pr-1",
        direction === "next" && "pl-1",
      )}>
        {children}
      </span>
      {direction === "next" && <ChevronRightIcon className={iconClassName} />}
    </>
  )
}

export function PillButton({ variant = "solid", direction, size = "default", className, children, ...props }: PillProps & ComponentProps<"button">) {
  return (
    <PillFrame className={className}>
      <button className={pillClassName(variant, size)} {...props}>
        <PillContent direction={direction} size={size}>{children}</PillContent>
      </button>
    </PillFrame>
  )
}

export function PillLink({ variant = "solid", direction, size = "default", className, children, ...props }: PillProps & ComponentProps<typeof Link>) {
  return (
    <PillFrame className={className}>
      <Link className={pillClassName(variant, size)} {...props}>
        <PillContent direction={direction} size={size}>{children}</PillContent>
      </Link>
    </PillFrame>
  )
}
