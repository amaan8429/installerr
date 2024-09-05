"use server";

import { Tool, OperatingSystem } from "../components/types";

const tools: Tool[] = [
  {
    id: "node",
    name: "Node.js",
    installCommands: {
      linux:
        "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs",
      macos: "brew install node",
      windows: "winget install OpenJS.NodeJS.LTS",
    },
  },
  {
    id: "git",
    name: "Git",
    installCommands: {
      linux: "sudo apt-get install git -y",
      macos: "brew install git",
      windows: "winget install Git.Git",
    },
  },
  {
    id: "github-cli",
    name: "GitHub CLI",
    installCommands: {
      linux:
        'curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null && sudo apt update && sudo apt install gh -y',
      macos: "brew install gh",
      windows: "winget install GitHub.cli",
    },
  },
  {
    id: "docker",
    name: "Docker",
    installCommands: {
      linux:
        "curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh",
      macos: "brew install --cask docker",
      windows: "winget install Docker.DockerDesktop",
    },
  },
  {
    id: "python",
    name: "Python",
    installCommands: {
      linux: "sudo apt-get install python3 python3-pip -y",
      macos: "brew install python",
      windows: "winget install Python.Python.3",
    },
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    installCommands: {
      linux:
        "sudo apt-get install wget gpg && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg && sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/ && sudo sh -c 'echo \"deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main\" > /etc/apt/sources.list.d/vscode.list' && rm -f packages.microsoft.gpg && sudo apt install apt-transport-https && sudo apt update && sudo apt install code",
      macos: "brew install --cask visual-studio-code",
      windows: "winget install Microsoft.VisualStudioCode",
    },
  },
  {
    id: "rust",
    name: "Rust",
    installCommands: {
      linux: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
      macos: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
      windows: "winget install Rustlang.Rust.MSVC",
    },
  },
  {
    id: "go",
    name: "Go",
    installCommands: {
      linux: "sudo apt-get install golang-go -y",
      macos: "brew install go",
      windows: "winget install GoLang.Go",
    },
  },
];

export async function getTools(): Promise<Tool[]> {
  return tools;
}

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
