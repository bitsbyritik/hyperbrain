"use client";

import { getAllCollectionName } from "@/actions/collections";
import { Button } from "@workspace/ui/components/button";
import { useEffect, useState } from "react";
import { AddNewCollection } from "../add-collection";
import { LinksCard } from "../links-card";
import { useCollectionLinks } from "@/hooks/useCollections";

export const MyCollectionPage = () => {
  const [collections, setCollections] = useState(["All"]);
  const [curr, setCurr] = useState("All");

  useEffect(() => {
    const getCollections = async () => {
      const res = await getAllCollectionName();
      const list = res.collectionList;
      const names = list.map((c) => c.name);
      setCollections(["All", ...names, "+"]);
    };

    getCollections();
  }, []);

  const { links } = useCollectionLinks({ curr });

  return (
    <div>
      <div className="flex flex-row gap-4">
        {collections.map((c) => (
          <Button
            key={c}
            variant={curr === c ? "default" : "outline"}
            onClick={() => {
              setCurr(c);
            }}
            className="cursor-pointer"
          >
            {c}
          </Button>
        ))}
      </div>
      <div className="pt-4 mt-4">
        {curr === "+" ? (
          <AddNewCollection />
        ) : Array.isArray(links) && links.length > 0 ? (
          <LinksCard links={links} />
        ) : (
          <p>No links available.</p>
        )}
      </div>
    </div>
  );
};
