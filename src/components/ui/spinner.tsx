import { Loader } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
    "text-muted-foreground animate-spin",
    { 
        variants: {
            size: {
                default: "h-4 w-4",
                sm: "h-2 w-2",
                lg: "h-6 w-6",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            size: "default",
        },
    },
);

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof spinnerVariants> {
    className?: string;
}

export const Spinner = ({ className, ...props }: SpinnerProps) => {
    return (
        <div className={cn("animate-spin", className)} {...props}>
            <Loader className={cn(spinnerVariants({ size: "default" }))} />
        </div>
    );
};