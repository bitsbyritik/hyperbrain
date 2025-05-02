"use client";

import { cn } from "@workspace/ui/lib/utils";
import { BrainIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import UserDropDown from "./user-dropdown";
import { Button } from "@workspace/ui/components/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HomeNavbar = () => {
  const [currRoute, setCurrRoute] = useState("/chat-with-brain");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/chat-with-brain") {
      setCurrRoute("/home");
    } else {
      setCurrRoute("/chat-with-brain");
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        "px-4 h-14 sticky top-0 inset-x-0 w-full bg-card backdrop-blur-md border-b border-border z-30",
      )}
    >
      <div className={cn("flex items-center justify-between h-full mx-auto")}>
        <div className="flex items-start">
          <Link href="/" className="flex items-center gap-4 cursor-pointer">
            <BrainIcon />
            <span className="text-xl font-bold">HyperBrain</span>
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <Link href={currRoute}>
            <Button>
              <div className="flex gap-2">
                <ExternalLink size={4} />
                <span className="font-semibold">
                  {pathname === "/chat-with-brain"
                    ? "Go to Home"
                    : "Chat with Brain"}
                </span>
              </div>
            </Button>
          </Link>
          <UserDropDown />
        </div>
      </div>
    </header>
  );
};

export default HomeNavbar;
