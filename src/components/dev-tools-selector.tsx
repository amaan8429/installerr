"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Loader2, Search, Info, Plus, Download } from "lucide-react";
import { generateScript, getTools } from "@/server/actions";
import { Tool, OperatingSystem } from "../types/types";
import { useToast } from "@/hooks/use-toast";

export default function DevToolsSelector() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [detectedOS, setDetectedOS] = useState<OperatingSystem>("linux");
  const [selectedOS, setSelectedOS] = useState<OperatingSystem>("linux");
  const [searchQuery, setSearchQuery] = useState("");
  const [customToolName, setCustomToolName] = useState("");
  const [customToolCommand, setCustomToolCommand] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function fetchTools() {
      try {
        const fetchedTools = await getTools();
        setTools(fetchedTools);
        setFilteredTools(fetchedTools);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
        toast({
          title: "Error",
          description:
            "Failed to fetch available tools. Please try again later.",
          variant: "destructive",
        });
      }
    }
    fetchTools();

    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("win") > -1) setDetectedOS("windows");
    else if (userAgent.indexOf("mac") > -1) setDetectedOS("macos");
    else if (userAgent.indexOf("linux") > -1) setDetectedOS("linux");

    setSelectedOS(detectedOS);
  }, [toast]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredTools(filtered);
  }, [searchQuery, tools]);

  const handleToolSelection = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleAddCustomTool = () => {
    if (customToolName && customToolCommand) {
      const newTool: Tool = {
        id: `custom-${Date.now()}`,
        name: customToolName,
        description: "Custom tool",
        installCommands: {
          linux: customToolCommand,
          macos: customToolCommand,
          windows: customToolCommand,
        },
      };
      setTools((prev) => [...prev, newTool]);
      setFilteredTools((prev) => [...prev, newTool]);
      setCustomToolName("");
      setCustomToolCommand("");
      toast({
        title: "Custom Tool Added",
        description: `${customToolName} has been added to the list of tools.`,
      });
    }
  };

  const handleGenerateScript = async () => {
    setIsLoading(true);
    try {
      const script = await generateScript(selectedTools, selectedOS);
      setGeneratedScript(script);
      toast({
        title: "Success",
        description:
          "Installation script generated successfully. You can now copy or download the script.",
      });
    } catch (error) {
      console.error("Failed to generate script:", error);
      toast({
        title: "Error",
        description:
          "Failed to generate the installation script. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied!",
      description: "The installation script has been copied to your clipboard.",
    });
  };

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `install_script_${selectedOS}.sh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "The installation script has been downloaded.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-md md:text-2xl font-bold mb-4">
        Welcome to Installer{" "}
        <span className="text-sm text-muted-foreground">
          (such a creative name, right?)
        </span>
      </h1>
      <p className="text-muted-foreground">
        Installer is a tool that helps you generate installation scripts for
        your development tool and setup your development environment faster.
        Select the tools you want to install, choose your operating system, and
        generate the script. Easy peasy!
      </p>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Select Operating System</h2>
        <RadioGroup
          value={selectedOS}
          onValueChange={(value) => setSelectedOS(value as OperatingSystem)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="linux" id="linux" />
            <Label htmlFor="linux">Linux</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="macos" id="macos" />
            <Label htmlFor="macos">macOS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="windows" id="windows" />
            <Label htmlFor="windows">Windows</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Detected OS:{" "}
          {detectedOS.charAt(0).toUpperCase() + detectedOS.slice(1)}
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Select Tools</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
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
                <Input
                  id="customToolCommand"
                  value={customToolCommand}
                  onChange={(e) => setCustomToolCommand(e.target.value)}
                  placeholder="Enter install command"
                />
              </div>
              <Button onClick={handleAddCustomTool}>Add Tool</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Button
        onClick={handleGenerateScript}
        disabled={selectedTools.length === 0 || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Script"
        )}
      </Button>
      {generatedScript && (
        <div className="space-y-2">
          <Label htmlFor="script">Installation Script:</Label>
          <div className="relative">
            <Textarea
              id="script"
              value={generatedScript}
              readOnly
              className="h-40 font-mono text-sm"
            />
            <div className="absolute top-2 right-2 space-x-2">
              <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy to clipboard</span>
              </Button>
              <Button size="icon" variant="ghost" onClick={downloadScript}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download script</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
