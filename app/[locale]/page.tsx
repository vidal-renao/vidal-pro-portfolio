import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Certifications from "@/components/sections/Certifications";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
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
      <main>
        <Hero locale={safeLocale} />
        <Services />
        <Certifications />
        <TechStack />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
