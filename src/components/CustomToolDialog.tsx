import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface Props {
  handleAddCustomTool: (name: string, command: string) => void;
}

export default function CustomToolDialog({ handleAddCustomTool }: Props) {
  const [customToolName, setCustomToolName] = useState("");
  const [customToolCommand, setCustomToolCommand] = useState("");

  const onAddCustomTool = () => {
    handleAddCustomTool(customToolName, customToolCommand);
    setCustomToolName("");
    setCustomToolCommand("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Custom
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="customToolName">Name</Label>
            <Input
              id="customToolName"
              value={customToolName}
              onChange={(e) => setCustomToolName(e.target.value)}
              placeholder="Enter tool name"
            />
          </div>
          <div>
            <Label htmlFor="customToolCommand">Install Command</Label>
            <Input
              id="customToolCommand"
              value={customToolCommand}
              onChange={(e) => setCustomToolCommand(e.target.value)}
              placeholder="Enter install command"
            />
          </div>
          <Button onClick={onAddCustomTool}>Add Tool</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
