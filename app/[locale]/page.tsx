import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Certifications from "@/components/sections/Certifications";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import EcosystemSection from "@/components/sections/EcosystemSection";
import ProofOfConcept from "@/components/sections/ProofOfConcept";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

type Locale = "en" | "de" | "es";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (["en", "de", "es"].includes(locale) ? locale : "en") as Locale;

  return (
    <>
      <NavBar />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_58%)]" />
          <div className="absolute right-0 top-[26rem] h-[28rem] w-[28rem] rounded-full bg-amber-500/6 blur-[120px]" />
          <div className="absolute left-0 top-[70rem] h-[32rem] w-[32rem] rounded-full bg-sky-500/8 blur-[140px]" />
        </div>
        <Hero locale={safeLocale} />
        <div className="relative z-10 flex flex-col">
          <Services />
          <Certifications />
          <TechStack />
          <Experience />
          <Projects />
          <EcosystemSection />
          <ProofOfConcept />
          <Testimonials />
          <Contact locale={safeLocale} />
        </div>
      </main>
    </>
  );
}
