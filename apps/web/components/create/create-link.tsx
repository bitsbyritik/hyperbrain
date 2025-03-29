import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { SelectCollection } from "./select-collection";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";

export const CreateLink = () => {
  const handleCreateLink = async () => {
    try {
    } catch (err) {
      console.error(err);
      toast.error("Failed!");
    }
  };

  return (
    <div>
      <div className="p-6 flex flex-col gap-8 ">
        <div>
          <Label className="text-base">Enter the url</Label>
          <Input
            type="url"
            placeholder="Enter the url"
            className={cn(
              "peer py-6 rounded-xl text-base placeholder:text-foreground focus:bg-card focus:text-foreground",
            )}
          />
        </div>
        <SelectCollection />

        <Button className="w-80" onClick={handleCreateLink}>
          Create
        </Button>
      </div>
    </div>
  );
};
