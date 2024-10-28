"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Terminal,
  Laptop,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDevTools } from "@/hooks/useDevTools";
import ToolList from "./ToolList";
import SearchBar from "./SearchBar";
import CustomToolDialog from "./CustomToolDialog";
import ScriptDisplay from "./ScriptDisplay";
import { OperatingSystem } from "@/types/types";

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

function DevToolsSelector() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
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

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, 2));
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
      <motion.div
        className="bg-blue-500 h-2 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentPage + 1) / 3) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Welcome to Installerr{" "}
        <span className="text-sm text-muted-foreground">
          (such a creative name, right?)
        </span>
      </h1>

      <ProgressBar />

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="min-h-[400px]"
        >
          {currentPage === 0 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Laptop className="w-16 h-16 mx-auto text-blue-500" />
                </motion.div>
                <h2 className="text-2xl font-semibold">
                  Choose Your Operating System
                </h2>
                <p className="text-muted-foreground">
                  Let's start by selecting your operating system to ensure you
                  get the right installation commands.
                </p>
              </div>

              <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
                <RadioGroup
                  value={selectedOS}
                  onValueChange={(value) =>
                    setSelectedOS(value as OperatingSystem)
                  }
                  className="space-y-4"
                >
                  {["linux", "macos", "windows"].map((os) => (
                    <motion.div
                      key={os}
                      className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RadioGroupItem value={os} id={os} />
                      <Label htmlFor={os} className="flex-1 cursor-pointer">
                        {os.charAt(0).toUpperCase() + os.slice(1)}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Detected OS:{" "}
                {detectedOS.charAt(0).toUpperCase() + detectedOS.slice(1)}
              </p>
            </motion.div>
          )}

          {currentPage === 1 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Download className="w-16 h-16 mx-auto text-blue-500" />
                </motion.div>
                <h2 className="text-2xl font-semibold">Select Your Tools</h2>
                <p className="text-muted-foreground">
                  Choose the development tools you want to install on your
                  system.
                </p>
              </div>

              <div className="space-y-4">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <ToolList
                  filteredTools={filteredTools}
                  selectedTools={selectedTools}
                  handleToolSelection={handleToolSelection}
                />
                <CustomToolDialog handleAddCustomTool={handleAddCustomTool} />
              </div>
            </motion.div>
          )}

          {currentPage === 2 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Terminal className="w-16 h-16 mx-auto text-blue-500" />
                </motion.div>
                <h2 className="text-2xl font-semibold">
                  Your Installation Script
                </h2>
                <p className="text-muted-foreground">
                  Here's your customized installation script. Copy and run it in
                  your terminal.
                </p>
              </div>

              {!generatedScript && (
                <Button
                  onClick={handleGenerateScript}
                  disabled={selectedTools.length === 0 || isLoading}
                  className="w-full"
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
              )}

              {generatedScript && (
                <ScriptDisplay
                  generatedScript={generatedScript}
                  toast={toast}
                />
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        <Button
          onClick={nextPage}
          disabled={
            currentPage === 2 ||
            (currentPage === 0 && !selectedOS) ||
            (currentPage === 1 && selectedTools.length === 0)
          }
        >
          {currentPage === 1 ? "Generate Script" : "Next"}{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default DevToolsSelector;
