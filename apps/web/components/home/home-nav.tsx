import { cn } from "@workspace/ui/lib/utils";
import { BrainIcon } from "lucide-react";
import Link from "next/link";

const HomeNavbar = () => {
  return (
    <header
      className={cn(
        "px-4 h-14 sticky top-0 inset-x-0 w-full bg-transparent border-b border-border",
      )}
    >
      <div className={cn("flex items-center justify-between h-full mx-auto")}>
        <div className="flex items-start">
          <Link href="/" className="flex items-center gap-4 cursor-pointer">
            <BrainIcon />
            <span className="text-xl font-bold">HyperBrain</span>
          </Link>
        </div>
        <div>User</div>
      </div>
    </header>
  );
};

export default HomeNavbar;
