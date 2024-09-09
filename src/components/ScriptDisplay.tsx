import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Download } from "lucide-react";

interface Props {
  generatedScript: string;
  toast: (props: { title: string; description: string }) => void;
}

export default function ScriptDisplay({ generatedScript, toast }: Props) {
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
    a.download = `install_script.sh`;
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
  );
}
