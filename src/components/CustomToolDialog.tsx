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
import { Plus, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  handleAddCustomTool: (name: string, command: string) => void;
}

export default function CustomToolDialog({ handleAddCustomTool }: Props) {
  const [customToolName, setCustomToolName] = useState("");
  const [customToolCommand, setCustomToolCommand] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const onAddCustomTool = () => {
    if (customToolName && customToolCommand) {
      handleAddCustomTool(customToolName, customToolCommand);
      setCustomToolName("");
      setCustomToolCommand("");
    } else {
      toast({
        title: "Error",
        description: "Please provide both a name and an install command.",
        variant: "destructive",
      });
    }
  };

  const generateAICommand = async () => {
    if (!customToolName) {
      toast({
        title: "Error",
        description: "Please provide a tool name to generate a command.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulating an API call to an AI service
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demonstration, we'll generate a mock command based on the tool name
      const generatedCommand = `sudo apt-get install ${customToolName
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
      setCustomToolCommand(generatedCommand);

      toast({
        title: "Command Generated",
        description:
          "An AI-generated command has been generated.This is a mock command.This feature doesn't work right now.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate command. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Custom Tool
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Tool</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="customToolName">Tool Name</Label>
            <Input
              id="customToolName"
              value={customToolName}
              onChange={(e) => setCustomToolName(e.target.value)}
              placeholder="Enter tool name"
            />
          </div>
          <div>
            <Label htmlFor="customToolCommand">Install Command</Label>
            <div className="flex space-x-2">
              <Input
                id="customToolCommand"
                value={customToolCommand}
                onChange={(e) => setCustomToolCommand(e.target.value)}
                placeholder="Enter install command"
              />
              <Button
                onClick={generateAICommand}
                disabled={isGenerating}
                variant="outline"
              >
                {isGenerating ? (
                  <Wand2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                <span className="sr-only">Generate AI Command</span>
              </Button>
            </div>
          </div>
          <Button onClick={onAddCustomTool} className="w-full">
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
