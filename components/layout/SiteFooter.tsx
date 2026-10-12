import { getTranslations } from "next-intl/server";
import { SITE } from "@/content/site";
import { ArrowUp, GitHub, LinkedIn } from "@/components/ui/icons";

export async function SiteFooter({ locale }: { locale: string }) {
  const ui = await getTranslations({ locale, namespace: "ui.footer" });
  return (
    <footer className="border-t border-line px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-sm text-dim">© {new Date().getFullYear()} {SITE.name} · Basel · {ui("rights")}</p>
        <div className="flex items-center gap-2">
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink"><LinkedIn size={16} /></a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink"><GitHub size={16} /></a>
          <a href="#top" className="ml-2 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowUp size={15} />{ui("top")}</a>
        </div>
      </div>
    </footer>
  );
}
