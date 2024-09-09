import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tool } from "@/types/types";

interface Props {
  filteredTools: Tool[];
  selectedTools: string[];
  handleToolSelection: (toolId: string) => void;
}

export default function ToolList({
  filteredTools,
  selectedTools,
  handleToolSelection,
}: Props) {
  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      <TooltipProvider>
        {filteredTools.map((tool) => (
          <div key={tool.id} className="flex items-center space-x-2">
            <Checkbox
              id={tool.id}
              checked={selectedTools.includes(tool.id)}
              onCheckedChange={() => handleToolSelection(tool.id)}
            />
            <Label htmlFor={tool.id} className="flex items-center">
              {tool.name}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-2 p-0">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Tool info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tool.description}</p>
                </TooltipContent>
              </Tooltip>
            </Label>
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}
