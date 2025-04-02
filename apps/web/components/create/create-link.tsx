import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { SelectCollection } from "./select-collection";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "@workspace/ui/components/textarea";

export const CreateLink = () => {
  const [url, setUrl] = useState("");
  const handleCreateLink = async () => {
    try {
      const response = await axios.post("/api/links", {
        url: url,
      });

      console.log(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed!");
    }
  };

  return (
    <div>
      <div className="p-6 flex flex-col gap-8 ">
        <div>
          <Input
            type="url"
            required
            placeholder="Enter the url"
            className={cn(
              "peer py-6 rounded-xl text-base placeholder:text-foreground focus:bg-transparent focus:text-foreground",
            )}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <Textarea
          placeholder="Share your thoughts"
          className={cn(
            "peer p-4 h-28 rounded-xl text-base placeholder:text-foreground focus:bg-card focus:text-foreground",
          )}
        />
        <SelectCollection />

        <Button className="w-80" onClick={handleCreateLink}>
          Create
        </Button>
      </div>
    </div>
  );
};
