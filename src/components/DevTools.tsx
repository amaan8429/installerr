"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDevTools } from "@/hooks/useDevTools";
import OperatingSystemSelector from "./OperatingSystemSelector";
import ToolList from "./ToolList";
import SearchBar from "./SearchBar";
import CustomToolDialog from "./CustomToolDialog";
import GenerateScriptButton from "./GenerateScriptButton";
import ScriptDisplay from "./ScriptDisplay";

export default function DevToolsSelector() {
  const { toast } = useToast();
  const {
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
  } = useDevTools();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-md md:text-2xl font-bold mb-4">
        Welcome to Installerr{" "}
        <span className="text-sm text-muted-foreground">
          (such a creative name, right?)
        </span>
      </h1>
      <p className="text-muted-foreground">
        Installerr is a tool that helps you generate installation scripts for
        your development tool and setup your development environment faster.
        Select the tools you want to install, choose your operating system, and
        generate the script. Easy peasy!
      </p>

      <OperatingSystemSelector
        selectedOS={selectedOS}
        setSelectedOS={setSelectedOS}
        detectedOS={detectedOS}
      />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Select stuff you want to install
        </h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ToolList
          filteredTools={filteredTools}
          selectedTools={selectedTools}
          handleToolSelection={handleToolSelection}
        />
        <CustomToolDialog handleAddCustomTool={handleAddCustomTool} />
      </div>

      <GenerateScriptButton
        handleGenerateScript={handleGenerateScript}
        isLoading={isLoading}
        selectedTools={selectedTools}
      />

      {generatedScript && (
        <ScriptDisplay generatedScript={generatedScript} toast={toast} />
      )}
    </div>
  );
}
