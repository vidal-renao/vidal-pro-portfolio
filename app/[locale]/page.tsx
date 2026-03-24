import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Certifications from "@/components/sections/Certifications";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Services />
        <Certifications />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
