import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muzaffar Ali - Full Stack Developer (.NET, Angular & AI)",
  description:
    "Full Stack Developer (ASP.NET Core, Angular, SQL Server) in Lahore. Built 4 production systems for the Government of Punjab and an AI deepfake-detection platform.",
  openGraph: {
    title: "Muzaffar Ali - Full Stack Developer",
    description:
      "ASP.NET Core, Angular and applied AI. Production systems for the Government of Punjab, plus an AI deepfake-detection platform.",
    url: "https://muzaffar-ali.vercel.app",
    siteName: "Muzaffar Ali",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
