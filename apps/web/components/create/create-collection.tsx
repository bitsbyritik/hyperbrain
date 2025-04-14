import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

export const CreateCollection = () => {
  const [collectionName, setCollectionName] = useState("");
  return (
    <div>
      <div className="p-6 flex flex-col gap-8 ">
        <div>
          <Input
            type="text"
            required
            placeholder="Enter the Collection name"
            className={cn(
              "peer py-6 rounded-xl text-base bg-card placeholder:text-foreground focus:bg-transparent focus:text-foreground",
            )}
            onChange={(e) => {
              setCollectionName(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
