"use client";

import { motion } from "framer-motion";
import { Terminal, ExternalLink, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { type projects } from "@/data/projects";

type ProjectType = typeof projects[0];

export default function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass rounded-2xl p-6 md:p-8 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-all duration-500"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20 rounded-full mb-4">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
        </div>
      </div>

      <div className="space-y-6 flex-grow relative z-10">
        {/* The Problem */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted tracking-wider mb-2">The Problem</h4>
          <p className="text-foreground/90 text-sm leading-relaxed border-l-2 border-border pl-3 group-hover:border-primary/50 transition-colors">
            "{project.problem}"
          </p>
        </div>

        {/* What I Built */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted tracking-wider mb-2">What I Built</h4>
          <p className="text-foreground/90 text-sm leading-relaxed border-l-2 border-border pl-3 group-hover:border-primary/50 transition-colors">
            "{project.solution}"
          </p>
        </div>

        {/* The Result */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted tracking-wider mb-2">The Result</h4>
          <p className="text-foreground/90 text-sm font-medium leading-relaxed bg-primary/5 p-3 rounded-lg border border-primary/20 text-primary">
            "{project.result}"
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="text-xs font-mono text-muted bg-background border border-border px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" className="text-muted hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-semibold">
              <Terminal size={16} /> Code
            </Link>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 text-sm font-semibold">
              Visit Live <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
