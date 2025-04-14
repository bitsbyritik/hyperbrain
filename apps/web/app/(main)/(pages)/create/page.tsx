"use client";

import { CreateCollection } from "@/components/create/create-collection";
import { CreateLink } from "@/components/create/create-link";
import { CreateSpace } from "@/components/create/create-space";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const types = ["link", "collection", "space"] as const;

export default function Create() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "link";

  const setType = (newType: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("type", newType);
    router.push(url.toString(), { shallow: true });
  };

  return (
    <div>
      <div className="w-full h-14 border-b border-border flex flex-row items-center px-2 gap-2">
        {types.map((t) => (
          <Button
            key={t}
            variant={"ghost"}
            className={cn("rounded-2xl", type === t && "bg-accent")}
            onClick={() => setType(t)}
          >
            New {t}
          </Button>
        ))}
      </div>
      {type === "link" && <CreateLink />}
      {type === "collection" && <CreateCollection />}
      {type === "space" && <CreateSpace />}
    </div>
  );
}
