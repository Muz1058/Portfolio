"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Terminal, Briefcase, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Portfolio Contact Request from ${name}`);
    const body = encodeURIComponent(`${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}`);
    
    window.location.href = `mailto:muzaffarali3633@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="py-24 relative bg-card/20 border-t border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Open to internships, junior roles, and interesting projects.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <a href="mailto:muzaffarali3633@gmail.com" className="flex items-center p-4 glass rounded-xl hover:border-primary/50 transition-colors group">
              <div className="p-3 bg-primary/10 rounded-lg text-primary mr-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted">Email</h3>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">muzaffarali3633@gmail.com</p>
              </div>
            </a>

            <a href="https://wa.me/923104765487" target="_blank" className="flex items-center p-4 glass rounded-xl hover:border-primary/50 transition-colors group">
              <div className="p-3 bg-primary/10 rounded-lg text-primary mr-4 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted">Phone / WhatsApp</h3>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">+92-310-4765487</p>
              </div>
            </a>

            <div className="flex items-center p-4 glass rounded-xl group">
              <div className="p-3 bg-primary/10 rounded-lg text-primary mr-4 group-hover:scale-110 transition-transform cursor-pointer">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted">Location</h3>
                <p className="text-lg font-semibold text-foreground">Lahore, Pakistan</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href="https://github.com/muz1058" target="_blank" className="flex items-center justify-center p-4 glass rounded-xl hover:bg-card/80 transition-colors group">
                <Terminal size={24} className="mr-2 group-hover:text-primary transition-colors" />
                <span className="font-semibold">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/muzaffar-ali-1177672a6" target="_blank" className="flex items-center justify-center p-4 glass rounded-xl hover:bg-card/80 transition-colors group">
                <Briefcase size={24} className="mr-2 group-hover:text-primary transition-colors" />
                <span className="font-semibold">LinkedIn</span>
              </Link>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-[#0a0f1e] font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Send Message via Mail App
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
