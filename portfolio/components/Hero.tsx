"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";
import Link from "next/link";

const titles = [
  "Full-Stack Developer",
  ".NET & Angular Engineer",
  "Building Production Systems",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Noise & Particles */}
      <div className="noise-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Open to Internships & Junior Roles
            </span>
          </motion.div>

          <div className="space-y-4 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Muzaffar Ali</span>
            </motion.h1>

            <div className="h-16 md:h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={titleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-5xl font-bold text-foreground/80 flex items-center gap-4"
                >
                  <Terminal className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
                  {titles[titleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted max-w-2xl"
          >
            Software Engineering student · Government-scale production experience · 
            Based in Lahore, Pakistan
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link
              href="#projects"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-[#0a0f1e] font-semibold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            >
              View My Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/resume.pdf"
              target="_blank"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-card text-foreground border border-border font-semibold rounded-full hover:bg-border/50 transition-all shadow-sm"
            >
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
