"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const stats = [
  { label: "Production systems shipped", value: 4, suffix: "" },
  { label: "Users served by my applications", value: 1000, suffix: "+" },
  { label: "Average performance improvement", value: 35, suffix: "%" },
  { label: "Months building government-grade software", value: 6, suffix: "" },
  { label: "Live Chrome extension on the Web Store", value: 1, suffix: "" },
];

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

  return <span className="text-4xl md:text-6xl font-extrabold text-primary">{count}{suffix}</span>;
}

export default function SocialProof() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          onViewportEnter={() => setIsInView(true)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">By The Numbers</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Real outcomes, measured in performance and scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-6 text-center rounded-2xl flex flex-col justify-center items-center h-full hover:border-primary/50 transition-colors"
            >
              {isInView ? <CountUp end={stat.value} suffix={stat.suffix} /> : <span className="text-4xl md:text-6xl font-extrabold text-primary">0{stat.suffix}</span>}
              <span className="mt-4 text-sm font-medium text-foreground/80 leading-relaxed max-w-[200px]">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-muted mt-12 bg-background/50 inline-block px-6 py-2 rounded-full border border-border mx-auto block w-fit"
        >
          Testimonials available on request from internship supervisors.
        </motion.p>
      </div>
    </section>
  );
}
