import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import SocialProof from "@/components/SocialProof";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <WhatsAppButton />
    </>
  );
}
