import { Tool } from "@/types/types";

export const tools: Tool[] = [
  {
    id: "node",
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    url: "https://nodejs.org/en/",
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
    description:
      "Distributed version control system for tracking changes in source code",
    url: "https://git-scm.com/",

    installCommands: {
      linux: "sudo apt-get install git -y",
      macos: "brew install git",
      windows: "winget install Git.Git",
    },
  },
  {
    id: "github-cli",
    name: "GitHub CLI",
    description:
      "Command-line tool for interacting with GitHub from your terminal",
    url: "https://cli.github.com/",
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
    description:
      "Platform for developing, shipping, and running applications in containers",
    url: "https://www.docker.com/",
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
    url: "https://www.python.org/",
    description:
      "High-level programming language for general-purpose programming",
    installCommands: {
      linux: "sudo apt-get install python3 python3-pip -y",
      macos: "brew install python",
      windows: "winget install Python.Python.3",
    },
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    description:
      "Lightweight but powerful source code editor with built-in debugging support",
    url: "https://code.visualstudio.com/",
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
    description:
      "Systems programming language that runs blazingly fast and prevents segfaults",
    url: "https://www.rust-lang.org/",
    installCommands: {
      linux: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
      macos: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
      windows: "winget install Rustlang.Rust.MSVC",
    },
  },
  {
    id: "go",
    name: "Go",
    description:
      "Open-source programming language that makes it easy to build simple, reliable, and efficient software",
    url: "https://golang.org/",
    installCommands: {
      linux: "sudo apt-get install golang-go -y",
      macos: "brew install go",
      windows: "winget install GoLang.Go",
    },
  },
];
