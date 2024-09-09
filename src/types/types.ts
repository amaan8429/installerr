"use client";

export type OperatingSystem = "linux" | "macos" | "windows";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  installCommands: Record<OperatingSystem, string>;
}
