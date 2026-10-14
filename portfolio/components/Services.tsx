"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { Monitor, Link as LinkIcon, Database, Puzzle, ArrowRight } from "lucide-react";
import Link from "next/link";
import content from "@/data/content.json";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-8 h-8" />,
  Link: <LinkIcon className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Puzzle: <Puzzle className="w-8 h-8" />
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-card/10 border-y border-border backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.settings.sectionHeadings.services}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass rounded-2xl p-8 relative overflow-hidden group flex flex-col h-full hover:border-primary/50 transition-colors"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-background border border-border rounded-xl text-primary group-hover:scale-110 transition-transform">
                  {iconMap[service.icon]}
                </div>
                {service.tag && (
                  <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wide rounded-full">
                    {service.tag}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <Link 
                href="#contact"
                className="inline-flex items-center text-primary font-bold hover:gap-3 gap-2 transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
