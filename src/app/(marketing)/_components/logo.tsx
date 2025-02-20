import { cn } from "@/lib/utils";
import Image from "next/image";

const logo = "/images/romantasylogo.png"

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src={logo}
                height="40"
                width="40"
                alt="Romantasy Logo"
            />
            <p className={cn("font-semibold")}>
                Bookshelf
            </p>
        </div>
    )
}