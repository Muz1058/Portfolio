"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import content from "@/data/content.json";

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span className="text-4xl md:text-5xl font-extrabold text-primary">{count}{suffix}</span>;
}

export default function About() {
  const [isInView, setIsInView] = useState(false);
  const { about } = content.settings;

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {about.headingStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{about.headingEnd}</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {about.paragraphs[0]}
            </p>
            <p className="text-lg text-muted leading-relaxed">
              {about.paragraphs[1]}
            </p>
          </div>

          <div className="relative">
            {/* Abstract dev illustration / shape */}
            <div className="w-full aspect-square max-w-md mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl rotate-6 transition-transform group-hover:rotate-12 duration-500"></div>
              <div className="absolute inset-0 bg-card border border-border backdrop-blur-sm rounded-3xl -rotate-3 transition-transform group-hover:rotate-0 duration-500 flex items-center justify-center shadow-2xl overflow-hidden p-8">
                <div className="font-mono text-xs md:text-sm text-primary/70 relative z-10 w-full">
                  <p>const developer = {'{'}</p>
                  <p className="pl-4">name: &quot;{about.profile.name}&quot;,</p>
                  <p className="pl-4">role: &quot;{about.profile.role}&quot;,</p>
                  <p className="pl-4">location: &quot;{about.profile.location}&quot;,</p>
                  <p className="pl-4">status: &quot;{about.profile.status}&quot;</p>
                  <p>{'};'}</p>
                  <br />
                  <p>developer.ship();</p>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onViewportEnter={() => setIsInView(true)}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border"
        >
          {about.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4">
              {isInView ? <CountUp end={stat.value} suffix={stat.suffix} /> : <span className="text-4xl md:text-5xl font-extrabold text-primary">0{stat.suffix}</span>}
              <span className="mt-2 text-sm font-medium text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
