import { OperatingSystem } from "../types/types";

export function detectOS(): OperatingSystem {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("win") > -1) {
    return "windows";
  } else if (userAgent.indexOf("mac") > -1) {
    return "macos";
  } else if (userAgent.indexOf("linux") > -1) {
    return "linux";
  }

  // Default to Linux if unable to detect
  return "linux";
}
