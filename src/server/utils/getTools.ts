import { Tool } from "@/types/types";
import { tools } from "../data/tools";

export async function getTools(): Promise<Tool[]> {
  return tools;
}
