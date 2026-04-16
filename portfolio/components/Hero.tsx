"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const trustBadges = [
  "4 Production Systems Delivered",
  "Government-Grade Security Practices",
  "Available for Freelance Projects",
  "Based in Lahore · Works Remotely"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="noise-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          
          <div className="space-y-6 max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
            >
              I Build Web Systems That <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Actually Work at Scale</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed"
            >
              From government portals serving thousands of users to custom business tools — I design, build, and deliver full-stack web applications that solve real problems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link
              href="#contact"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-[#0a0f1e] font-bold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            >
              Hire Me for Your Project
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="#work"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-card text-foreground border border-border font-semibold rounded-full hover:bg-border/50 transition-all shadow-sm"
            >
              See My Work
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-12 w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-4 text-sm font-medium text-foreground/80"
          >
            {trustBadges.map((badge, idx) => (
              <span key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm">
                <CheckCircle2 size={16} className="text-secondary" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
