import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OperatingSystem } from "../types/types";

interface Props {
  selectedOS: OperatingSystem;
  setSelectedOS: (os: OperatingSystem) => void;
  detectedOS: OperatingSystem;
}

export default function OperatingSystemSelector({
  selectedOS,
  setSelectedOS,
  detectedOS,
}: Props) {
  return (
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
        Detected OS: {detectedOS.charAt(0).toUpperCase() + detectedOS.slice(1)}
      </p>
    </div>
  );
}
