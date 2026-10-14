"use client";

import { motion } from "framer-motion";
import { Mail, Briefcase, MessageCircle } from "lucide-react";
import Link from "next/link";
import content from "@/data/content.json";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const needs = formData.get("needs") as string;
    const budget = formData.get("budget") as string;
    const timeline = formData.get("timeline") as string;

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const bodyText = `Message:\n${needs}\n\nOpportunity / Budget: ${budget}\nTimeline: ${timeline}\n\n---\nFrom: ${name}\nEmail: ${email}`;
    const body = encodeURIComponent(bodyText);
    
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.settings.sectionHeadings.contact}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {content.settings.contact.intro}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 md:col-span-2"
          >
            <a href="https://wa.me/923104765487" target="_blank" className="flex items-center p-5 glass rounded-2xl hover:border-[#25D366]/50 transition-colors group">
              <div className="p-3 bg-[#25D366]/10 rounded-xl text-[#25D366] mr-4 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Fastest Response</h3>
                <p className="text-lg font-semibold group-hover:text-[#25D366] transition-colors">Chat on WhatsApp</p>
              </div>
            </a>

            <a href="mailto:muzaffarali3633@gmail.com" className="flex items-center p-5 glass rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Email</h3>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">muzaffarali3633@gmail.com</p>
              </div>
            </a>

            <Link href="https://linkedin.com/in/muzaffar-ali-1177672a6" target="_blank" className="flex items-center p-5 glass rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4 group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-1">LinkedIn</h3>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">Connect Globally</p>
              </div>
            </Link>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass rounded-3xl p-8 md:p-10 md:col-span-3"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">Your Name</label>
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
                  <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="needs" className="block text-sm font-bold text-foreground mb-2">{content.settings.contact.messageLabel}</label>
                <textarea
                  id="needs"
                  name="needs"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder={content.settings.contact.messagePlaceholder}
                ></textarea>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-bold text-foreground mb-2">{content.settings.contact.opportunityLabel}</label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none appearance-none cursor-pointer"
                  >
                    <option value={content.settings.contact.fullTimeOption}>{content.settings.contact.fullTimeOption}</option>
                    <option value="Just exploring">Just exploring</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 – $1,500">$500 – $1,500</option>
                    <option value="$1,500 – $5,000">$1,500 – $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-bold text-foreground mb-2">Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none appearance-none cursor-pointer"
                  >
                    <option value="Flexible">Flexible</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1–3 months">1–3 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 bg-primary text-[#0a0f1e] font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Send Request via Mail
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
