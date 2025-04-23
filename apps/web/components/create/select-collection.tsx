"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Files } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllCollectionName } from "@/actions/collections";

type SelectCollectionProps = {
  onSelectAction: (collection: string) => void;
};

type Collection = {
  id: string;
  name: string;
};

export function SelectCollection({ onSelectAction }: SelectCollectionProps) {
  const [collections, setCollection] = useState<Collection[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const getCollections = async () => {
      const res = await getAllCollectionName();
      const list = res.collectionList;
      setCollection(list);
    };

    getCollections();
  }, []);

  const handleChange = (value: string) => {
    setSelected(value);
    onSelectAction(value);
  };

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="w-64 h-12 rounded-xl bg-card text-foreground">
        <Files />
        <SelectValue
          placeholder="Select Collection"
          className="text-foreground"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Collection</SelectLabel>
          {collections.map((collection) => (
            <SelectItem key={collection.id} value={collection.id}>
              {collection.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
