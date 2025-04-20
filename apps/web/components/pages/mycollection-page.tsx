"use client";

import { getAllCollectionName } from "@/actions/collections";
import { useEffect, useState } from "react";

export const MyCollectionPage = () => {
  const [collections, setCollections] = useState(["All"]);

  useEffect(() => {
    const getCollections = async () => {
      const res = await getAllCollectionName();
      const list = res.collectionList;
      const names = list.map((c) => c.name);
      setCollections(["All", ...names]);
    };

    getCollections();
  }, []);
  return <div></div>;
};
