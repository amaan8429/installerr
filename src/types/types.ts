"use client";

export type OperatingSystem = "linux" | "macos" | "windows";

export interface Tool {
  id: string;
  name: string;
  description: string;
  installCommands: Record<OperatingSystem, string>;
}
