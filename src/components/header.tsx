"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Menu, X } from "lucide-react";
import { ModeToggle } from "@/lib/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const tweetText = encodeURIComponent(
    "Check out Installer, an awesome tool for setting up your dev environment! 🚀"
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  const NavItems = () => (
    <>
      <Button variant="ghost" size="sm" asChild>
        <Link
          href="https://github.com/amaan8429/installer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link
          href="https://twitter.com/amaan8429"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href={tweetUrl} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4 mr-2" />
          Tweet about us
        </Link>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Installer</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            <NavItems />
          </nav>
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
