import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { SECTIONS, SITE } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionScroll } from "@/components/layout/SectionScroll";
import { Hero } from "@/components/sections/Hero";
import { Specializations } from "@/components/sections/Specializations";
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
  const scroll = await getTranslations({ locale, namespace: "ui.scroll" });

  return (
    <>
      <SiteHeader
        locale={locale}
        brand={SITE.shortName}
        sections={SECTIONS.map((s) => ({ id: s.id, label: nav(s.key) }))}
        labels={{ cv: nav("cv"), menu: nav("menu"), close: nav("close"), language: nav("language"), skip: nav("skip"), more: nav("more"), contact: nav("contact") }}
      />
      <main id="main">
        <Hero locale={locale} />
        <Testimonials locale={locale} />
        <Specializations locale={locale} />
        <Projects locale={locale} />
        <Services locale={locale} />
        <Experience locale={locale} />
        <Skills locale={locale} />
        <Credentials locale={locale} />
        <Contact locale={locale} />
      </main>
      <SectionScroll sections={SECTIONS.map((s) => ({ id: s.id, label: nav(s.key) }))} labels={{ navigation: scroll("navigation"), previous: scroll("previous"), next: scroll("next"), top: scroll("top"), move: scroll("move"), choose: scroll("choose") }} />
      <SiteFooter locale={locale} />
    </>
  );
}
