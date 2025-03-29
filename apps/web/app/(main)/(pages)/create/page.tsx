"use client";

import { CreateCollection } from "@/components/create/create-collection";
import { CreateLink } from "@/components/create/create-link";
import { CreateSpace } from "@/components/create/create-space";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

export default function Create() {
  const [currCreate, setCurrCreate] = useState("link");

  return (
    <div>
      <div className="w-full h-14 border-b border-border flex flex-row items-center px-2 gap-2">
        <div>
          <Button
            variant={"ghost"}
            className={cn("rounded-2xl", currCreate === "link" && "bg-accent")}
            onClick={() => {
              setCurrCreate("link");
            }}
          >
            New link
          </Button>
        </div>
        <div>
          <Button
            variant={"ghost"}
            className={cn(
              "rounded-2xl",
              currCreate === "collection" && "bg-accent",
            )}
            onClick={() => {
              setCurrCreate("collection");
            }}
          >
            New collection
          </Button>
        </div>
        <div>
          <Button
            variant={"ghost"}
            className={cn("rounded-2xl", currCreate === "space" && "bg-accent")}
            onClick={() => {
              setCurrCreate("space");
            }}
          >
            New space
          </Button>
        </div>
      </div>
      {currCreate === "link" && <CreateLink />}
      {currCreate === "collection" && <CreateCollection />}
      {currCreate === "space" && <CreateSpace />}
    </div>
  );
}
