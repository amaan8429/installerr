"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, Loader2 } from "lucide-react";
import { generateScript, getTools } from "@/server/actions";
import { Tool, OperatingSystem } from "./types";
import { useToast } from "@/hooks/use-toast";

export default function DevToolsSelector() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [detectedOS, setDetectedOS] = useState<OperatingSystem>("linux");
  const [selectedOS, setSelectedOS] = useState<OperatingSystem>("linux");
  const { toast } = useToast();

  useEffect(() => {
    async function fetchTools() {
      try {
        const fetchedTools = await getTools();
        setTools(fetchedTools);
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

  const handleToolSelection = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleGenerateScript = async () => {
    setIsLoading(true);
    try {
      const script = await generateScript(selectedTools, selectedOS);
      setGeneratedScript(script);
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

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Development Tools Installer</h1>
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
        {tools.map((tool) => (
          <div key={tool.id} className="flex items-center space-x-2">
            <Checkbox
              id={tool.id}
              checked={selectedTools.includes(tool.id)}
              onCheckedChange={() => handleToolSelection(tool.id)}
            />
            <Label htmlFor={tool.id}>{tool.name}</Label>
          </div>
        ))}
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
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy to clipboard</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
