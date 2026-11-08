import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";

interface Track {
  title: string;
  subtitle: string;
  summary: string;
  capabilities: string[];
  proof: string;
  action: string;
  href: string;
}

export async function Specializations({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "specializations" });
  const tracks = t.raw("tracks") as Track[];

  return (
    <Section id="specializations" label={t("label")} title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-5 lg:grid-cols-2">
        {tracks.map((track, index) => (
          <article key={track.title} className="premium-panel group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-raised p-6 sm:p-8">
            <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-px ${index === 0 ? "bg-gradient-to-r from-cyan-400/80 via-blue-400/60 to-transparent" : "bg-gradient-to-r from-violet-400/80 via-blue-400/60 to-transparent"}`} />
            <div className="mb-7 flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.18em] text-dim">0{index + 1} / 02</span>
              <span className={`rounded-full border px-3 py-1 text-xs ${index === 0 ? "border-cyan-400/25 bg-cyan-400/5 text-cyan-200" : "border-violet-400/25 bg-violet-400/5 text-violet-200"}`}>{track.subtitle}</span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{track.title}</h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted sm:text-base">{track.summary}</p>
            <ul className="mt-7 grid gap-3" aria-label={track.title}>
              {track.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3 text-sm leading-6 text-ink/85">
                  <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? "bg-cyan-300" : "bg-violet-300"}`} />
                  {capability}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-line pt-5 text-sm leading-6 text-dim">{track.proof}</p>
            <a href={track.href} className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:bg-white/[0.08]">
              {track.action}<span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}
