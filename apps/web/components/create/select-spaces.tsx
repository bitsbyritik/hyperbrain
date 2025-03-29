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
import { useCollections } from "@/hooks/useCollections";

export function SelectCollection() {
  const { collections } = useCollections();

  return (
    <Select>
      <SelectTrigger className="w-64 h-12 rounded-xl bg-accent text-foreground">
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
            <SelectItem key={collection.id} value={collection.name}>
              {collection.name}
            </SelectItem>
          ))}
          <SelectItem value="new">Create New</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
