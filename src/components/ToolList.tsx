import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, ExternalLink } from "lucide-react";
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
  const handleWebsiteClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!filteredTools || filteredTools.length === 0) {
    return <div>No tools available.</div>;
  }

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
                  <div className="space-y-2">
                    <p>{tool.description}</p>
                    {tool.url && (
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => handleWebsiteClick(tool.url)}
                      >
                        Visit official website
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </Label>
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}
