"use client";

import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { SelectCollection } from "./select-collection";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "@workspace/ui/components/textarea";
import { useRouter } from "next/navigation";
import { SelectSpaces } from "./select-spaces";

export const CreateLink = () => {
  const [url, setUrl] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");

  const router = useRouter();
  const handleCreateLink = async () => {
    try {
      toast.loading("Adding Link...");
      const response = await axios.post("/api/links", {
        url: url,
        collectionId: selectedCollection,
      });

      toast.dismiss();
      if (response.data.status === 200) {
        toast.success("Link Added");
      }

      router.push("/mylinks");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed!");
    }
  };

  console.log(selectedCollection);

  return (
    <div>
      <div className="p-6 flex flex-col gap-8 ">
        <div>
          <Input
            type="url"
            required
            placeholder="What's the url ?"
            className={cn(
              "peer py-6 rounded-xl text-base bg-card placeholder:text-foreground focus:bg-transparent focus:text-foreground",
            )}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <Textarea
          placeholder="Add something about links ?"
          className={cn(
            "peer p-4 h-28 rounded-xl text-base placeholder:text-foreground bg-card focus:bg-transparent focus:text-foreground",
          )}
        />
        <div className="flex gap-8 flex-col">
          <SelectCollection onSelectAction={setSelectedCollection} />
          <SelectSpaces />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            variant={"create"}
            className="w-36"
            onClick={handleCreateLink}
            disabled={url === ""}
          >
            Add Link
          </Button>
        </div>
      </div>
    </div>
  );
};
