import { cn } from "@workspace/ui/lib/utils";
import { BrainIcon } from "lucide-react";
import Link from "next/link";
import { DiGithubBadge } from "react-icons/di";

const Navbar = () => {
  return (
    <header
      className={cn(
        "px-4 h-14 sticky top-0 inset-x-0 w-full bg-card backdrop-blur-md border rounded-2xl border-border z-30",
      )}
    >
      <div className={cn("flex items-center justify-between h-full mx-auto")}>
        <div className="flex items-start">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <BrainIcon />
            <span className="text-xl font-bold">HyperBrain</span>
          </Link>
        </div>
        <div>
          <DiGithubBadge />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
