import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  handleGenerateScript: () => Promise<void>;
  isLoading: boolean;
  selectedTools: string[];
}

export default function GenerateScriptButton({
  handleGenerateScript,
  isLoading,
  selectedTools,
}: Props) {
  return (
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
  );
}
