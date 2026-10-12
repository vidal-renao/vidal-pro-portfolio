import { getTranslations } from "next-intl/server";
import { SITE } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { GitHub, LinkedIn, Mail, Phone, WhatsApp } from "@/components/ui/icons";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { CopyEmail } from "@/components/features/contact/CopyEmail";
import { CvDownload } from "@/components/features/contact/CvDownload";

/** Direct channels, the contact form and the CV download in one place. */
export async function Contact({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const channels = [
    { href: `mailto:${SITE.email}`, label: SITE.email, icon: Mail },
    { href: SITE.phoneHref, label: SITE.phone, icon: Phone },
    { href: SITE.whatsapp, label: "WhatsApp", icon: WhatsApp, external: true },
    { href: SITE.linkedin, label: "linkedin.com/in/vidalrenao", icon: LinkedIn, external: true },
    { href: SITE.github, label: "github.com/vidal-renao", icon: GitHub, external: true },
  ];
  return (
    <Section id="contact" label={t("label")} title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-line bg-raised p-5 sm:p-6">
            <p className="inline-flex items-center gap-2 text-xs text-accent"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />{t("availability")}</p>
            <ul className="mt-4 flex flex-col">
              {channels.map(({ href, label, icon: Icon, external }) => (
                <li key={href} className="border-b border-line last:border-0">
                  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex min-h-12 items-center gap-3 text-sm text-ink hover:text-accent">
                    <Icon size={17} className="text-dim" />{label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4"><CopyEmail email={SITE.email} label={t("copy")} done={t("copied")} /></div>
          </div>
          <CvDownload locale={locale} />
        </div>
        <ContactForm fallbackEmail={SITE.email} labels={{
          title: t("form_label"), name: t("form_name"), namePh: t("form_name_ph"), email: t("form_email"), emailPh: t("form_email_ph"),
          subject: t("form_subject"), subjectPh: t("form_subject_ph"), message: t("form_message"), messagePh: t("form_message_ph"),
          submit: t("form_submit"), submitting: t("form_submitting"), successTitle: t("form_success_title"), successMsg: t("form_success_msg"),
          another: t("form_send_another"), error: t("form_error_msg"),
        }} />
      </div>
    </Section>
  );
}
