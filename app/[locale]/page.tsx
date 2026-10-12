import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { SECTIONS, SITE } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Credentials } from "@/components/sections/Credentials";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

/** One page, one section per concern; order follows what a recruiter or client looks for first. */
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "ui.nav" });

  return (
    <>
      <SiteHeader
        locale={locale}
        brand={SITE.shortName}
        sections={SECTIONS.map((s) => ({ id: s.id, label: nav(s.key) }))}
        labels={{ cv: nav("cv"), menu: nav("menu"), close: nav("close"), language: nav("language"), skip: nav("skip") }}
      />
      <main id="main">
        <Hero locale={locale} />
        <Projects locale={locale} />
        <Experience locale={locale} />
        <Skills locale={locale} />
        <Credentials locale={locale} />
        <Services locale={locale} />
        <Testimonials locale={locale} />
        <Contact locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
