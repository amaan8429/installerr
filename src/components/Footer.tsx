import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Github, Linkedin, Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <Wrench className="h-6 w-6" />
            <span className="font-bold">Installerr</span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://github.com/amaan8429"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Amaan
            </a>
            . Open source on{" "}
            <a
              href="https://github.com/amaan8429/installerr"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://twitter.com/amaan8429"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://github.com/amaan8429"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://linkedin.com/in/amaan8429"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
