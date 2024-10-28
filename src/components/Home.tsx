import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Package,
  Zap,
  Clock,
  ChevronRight,
  Github,
  Coffee,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <motion.div
        className="max-w-6xl mx-auto pt-20 px-6"
        initial="initial"
        animate="animate"
        variants={container}
      >
        <motion.div className="text-center space-y-6" variants={fadeInUp}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <Terminal className="w-20 h-20 mx-auto text-primary" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Welcome to Installerr
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your one-stop solution for setting up development environments in
            seconds. No more copy-pasting from multiple sources.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link href="/setup">
              <Button size="lg" className="gap-2">
                Get Started <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link
              href="https://github.com/yourusername/installerr"
              target="_blank"
            >
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="w-4 h-4" /> Star on GitHub
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-20"
          variants={container}
        >
          <motion.div
            className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
            <p className="text-muted-foreground">
              Generate installation scripts for your entire development stack in
              one go. Support for Linux, macOS, and Windows.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <Package className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Curated Tools</h3>
            <p className="text-muted-foreground">
              Choose from our carefully curated list of development tools and
              packages. Custom tool additions supported.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <Clock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
            <p className="text-muted-foreground">
              Save hours of setup time. No more searching for correct
              installation commands or package versions.
            </p>
          </motion.div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div className="mt-20 text-center" variants={fadeInUp}>
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="space-y-4"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold">Choose Your OS</h3>
              <p className="text-sm text-muted-foreground">
                Select your operating system for compatible installation
                commands
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold">Pick Your Tools</h3>
              <p className="text-sm text-muted-foreground">
                Select the development tools you need from our curated list
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold">Get Your Script</h3>
              <p className="text-sm text-muted-foreground">
                Copy your generated script and run it in your terminal
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 mb-20 text-center py-16 px-6 rounded-2xl bg-primary/5 border"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to streamline your setup?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join developers who are saving hours on environment setup. Start
            generating your installation script now!
          </p>
          <Link href="/setup">
            <Button size="lg" className="gap-2">
              Start Installing <Coffee className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
