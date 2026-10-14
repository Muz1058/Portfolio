"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
import { Award, ExternalLink } from "lucide-react";
import content from "@/data/content.json";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.settings.sectionHeadings.certifications}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-6 rounded-2xl flex items-start gap-4 hover:-translate-y-1 transition-transform group"
            >
              {cert.link ? (
                <a href={cert.link} target="_blank" className="flex items-start gap-4 h-full w-full">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform shrink-0">
                    <Award size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors inline-flex items-center gap-1.5">
                      {cert.title}
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-muted mb-3">{cert.issuer}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      cert.status === "Completed" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </a>
              ) : (
                <>
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform shrink-0">
                    <Award size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{cert.title}</h3>
                    <p className="text-sm text-muted mb-3">{cert.issuer}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      cert.status === "Completed" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
