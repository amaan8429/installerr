"use server";

import { OperatingSystem } from "../../types/types";
import { tools } from "../data/tools";

export async function generateScript(
  selectedTools: string[],
  os: OperatingSystem
): Promise<string> {
  const installCommands = selectedTools
    .map(
      (toolId) => tools.find((tool) => tool.id === toolId)?.installCommands[os]
    )
    .filter(Boolean);

  return installCommands.join(" && \\\n");
}
