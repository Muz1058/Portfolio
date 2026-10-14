"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import content from "@/data/content.json";

export default function Experience() {
  return (
    <section id="track-record" className="py-24 relative bg-card/20 border-y border-border backdrop-blur-3xl">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.settings.sectionHeadings.experience}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {content.settings.sectionHeadings.experienceIntro}
          </p>
        </motion.div>

        <div className="relative border-l-2 border-border ml-3 md:ml-0 md:space-y-12 space-y-8">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[14px] top-1 bg-background border-2 border-primary rounded-full p-1 shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                {item.type === "work" ? (
                  <Briefcase size={16} className="text-primary" />
                ) : (
                  <GraduationCap size={16} className="text-secondary" />
                )}
              </div>

              <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.type === 'work' ? 'from-primary/5' : 'from-secondary/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <span className="text-sm font-mono text-primary mb-2 block font-semibold">{item.duration}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-1">{item.role}</h3>
                <h4 className="text-lg text-muted mb-4">{item.organization}</h4>
                
                {item.bullets.length > 0 && (
                  <div className="space-y-4 mt-6">
                    {item.bullets.map((bullet, i) => (
                      <p key={i} className="text-foreground/90 flex items-start text-base leading-relaxed">
                        <span className="text-primary mr-3 shrink-0"><ChevronRight size={20} className="mt-0.5" /></span>
                        <span>{bullet}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
