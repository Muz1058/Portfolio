import Link from "next/link";
import { Terminal, Briefcase, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="https://github.com/muz1058" target="_blank" className="text-muted hover:text-primary transition-colors">
            <span className="sr-only">GitHub</span>
            <Terminal size={24} />
          </Link>
          <Link href="https://linkedin.com/in/muzaffar-ali-1177672a6" target="_blank" className="text-muted hover:text-primary transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Briefcase size={24} />
          </Link>
          <Link href="mailto:muzaffarali3633@gmail.com" className="text-muted hover:text-primary transition-colors">
            <span className="sr-only">Email</span>
            <Mail size={24} />
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1 text-center md:text-left">
          <p className="text-sm font-medium text-foreground">
            Designed & Built by <span className="text-primary font-bold">Muzaffar Ali</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
