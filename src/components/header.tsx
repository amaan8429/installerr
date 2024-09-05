import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Set-It-Up</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href="https://github.com/yourusername/set-it-up"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Link>
            </Button>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
