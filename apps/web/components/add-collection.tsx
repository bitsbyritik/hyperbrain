import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const AddNewCollection = () => {
  const [collectionName, setCollectionName] = useState("");
  const router = useRouter();
  const createCollection = async () => {
    try {
      toast.loading("Adding...");
      const res = await axios.post("/api/collections", {
        collectionName,
      });
      if (res.status === 200) {
        toast.dismiss();
        toast.success("Added");
      }
      router.refresh();
    } catch (err) {
      toast.dismiss();
      toast.error("Failed!");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full mt-4 gap-6">
      <div className="mt-4 text-2xl font-bold">Create New Collection</div>
      <div>
        <Input
          type="text"
          required
          placeholder="Enter the Collection name"
          className={cn(
            "peer py-6 rounded-xl w-4/12 text-base bg-card placeholder:text-foreground focus:bg-transparent focus:text-foreground",
          )}
          onChange={(e) => {
            setCollectionName(e.target.value);
          }}
        />
        <div className="flex mt-4 pt-4">
          <Button
            variant={"create"}
            className="w-36"
            disabled={collectionName === ""}
            onClick={createCollection}
          >
            Add collection
          </Button>
        </div>
      </div>
    </div>
  );
};
