import { useState, useEffect } from "react";
import { Tool, OperatingSystem } from "../types/types";
import { getTools } from "@/server/utils/getTools";
import { generateScript } from "@/server/actions";
import { detectOS } from "@/lib/osDetection";
import { useToast } from "@/hooks/use-toast";

export function useDevTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [detectedOS, setDetectedOS] = useState<OperatingSystem>("linux");
  const [selectedOS, setSelectedOS] = useState<OperatingSystem>("linux");
  const [searchQuery, setSearchQuery] = useState("");
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

    const detectedOS = detectOS();
    setDetectedOS(detectedOS);
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

  const handleAddCustomTool = (name: string, command: string) => {
    if (name && command) {
      const newTool: Tool = {
        id: `custom-${Date.now()}`,
        name,
        description: "Custom tool",
        url: "",
        installCommands: {
          linux: command,
          macos: command,
          windows: command,
        },
      };
      setTools((prev) => [...prev, newTool]);
      setFilteredTools((prev) => [...prev, newTool]);
      toast({
        title: "Custom Tool Added",
        description: `${name} has been added to the list of tools.`,
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
        description: "Installation script generated successfully.",
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

  return {
    tools,
    filteredTools,
    selectedTools,
    generatedScript,
    isLoading,
    detectedOS,
    selectedOS,
    searchQuery,
    setSearchQuery,
    handleToolSelection,
    handleAddCustomTool,
    handleGenerateScript,
    setSelectedOS,
  };
}
