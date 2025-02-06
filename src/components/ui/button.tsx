import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]",
        secondary:
          "bg-black/30 backdrop-blur-sm border border-white/50 text-white hover:bg-black/40 shadow-[0_0_15px_rgba(0,0,0,0.2)] [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]",
        ghost: 
          "hover:bg-white/10 text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]",
        destructive:
          "bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-500/90 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
        outline:
          "border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]",
        link: 
          "text-white underline-offset-4 hover:underline [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
