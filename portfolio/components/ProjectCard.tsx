"use client";

import { motion } from "framer-motion";
import { Terminal, ExternalLink, Zap, ChevronRight } from "lucide-react";
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
      className="group glass rounded-2xl p-6 md:p-8 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-500"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20 rounded-full mb-3">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
        </div>
        <div className="flex gap-3 text-muted">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" className="hover:text-primary transition-colors">
              <Terminal size={20} />
            </Link>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="hover:text-primary transition-colors">
              <ExternalLink size={20} />
            </Link>
          )}
        </div>
      </div>

      <p className="text-muted mb-4 relative z-10 flex-grow">
        {project.description}
      </p>

      {project.impactMetric && (
        <div className="px-4 py-2 bg-background/50 rounded-lg border border-border mb-6 text-sm font-medium text-foreground/90 relative z-10 flex items-center gap-2">
          <Zap size={16} className="text-amber-500 shrink-0" /> {project.impactMetric}
        </div>
      )}

      {project.highlights.length > 0 && (
        <ul className="mb-6 space-y-2 flex-grow relative z-10">
          {project.highlights.map((highlight, idx) => (
            <li key={idx} className="text-sm text-muted flex items-start">
              <span className="text-primary mr-1 shrink-0"><ChevronRight size={16} /></span>
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.tech.map((tech) => (
          <span key={tech} className="text-xs font-mono text-primary/80 bg-primary/5 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
