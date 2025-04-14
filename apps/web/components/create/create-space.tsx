"use client";

import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { checkSpaceHandle } from "@/actions/spaces";
import { toast } from "sonner";
import axios from "axios";

export const CreateSpace = () => {
  const [spaceName, setSpaceName] = useState("");
  const [spaceHandle, setSpaceHandle] = useState("");
  const [spaceImg, setSpaceImg] = useState("");
  const [spaceDesc, setSpaceDesc] = useState("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isHandleTaken, setIsHandleTaken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHandle = async () => {
      if (!spaceHandle) return;

      const exists = await checkSpaceHandle({ spaceHandle });
      setIsHandleTaken(exists);
    };

    const delayDebounce = setTimeout(checkHandle, 500);
    return () => clearTimeout(delayDebounce);
  }, [spaceHandle]);

  const handleCreateSpace = async () => {
    try {
      toast.loading("Creating Space...");
      const response = await axios.post("/api/spaces", {
        spaceName,
        spaceHandle,
        spaceImg,
        spaceDesc,
        isPublic,
      });

      toast.dismiss();
      if (response.data.status === 200) {
        toast.success("Space Created");
      }
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed!");
    }
  };

  console.log(isHandleTaken);

  return (
    <div>
      <div className="p-6 flex flex-col gap-8 ">
        <Input
          type="text"
          required
          placeholder="Enter the Space name"
          className={cn(
            "peer py-6 rounded-xl text-base bg-card placeholder:text-foreground focus:bg-transparent focus:text-foreground",
          )}
          onChange={(e) => {
            setSpaceName(e.target.value);
          }}
        />

        <div>
          <Input
            type="text"
            required
            placeholder="Enter the space handle"
            className={cn(
              "peer py-6 rounded-xl text-base bg-card placeholder:text-foreground focus:bg-transparent focus:text-foreground",
            )}
            onChange={(e) => {
              setSpaceHandle(e.target.value.toLowerCase());
            }}
          />
          {isHandleTaken && (
            <span className="font-light text-sm text-red-600">
              handle is already taken
            </span>
          )}
        </div>

        <Input
          type="url"
          required
          placeholder="Enter the image url"
          className={cn(
            "peer py-6 rounded-xl text-base bg-card placeholder:text-foreground focus:bg-transparent focus:text-foreground",
          )}
          onChange={(e) => {
            setSpaceImg(e.target.value);
          }}
        />

        <Textarea
          placeholder="Enter the space description"
          className={cn(
            "peer p-4 h-28 rounded-xl text-base placeholder:text-foreground bg-card focus:bg-transparent focus:text-foreground",
          )}
          onChange={(e) => {
            setSpaceDesc(e.target.value);
          }}
        />
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label htmlFor="airplane-mode">Public</Label>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleCreateSpace}
            variant={"create"}
            className="w-36"
            disabled={isHandleTaken || spaceName === "" || spaceHandle === ""}
          >
            Add Spaces
          </Button>
        </div>
      </div>
    </div>
  );
};
