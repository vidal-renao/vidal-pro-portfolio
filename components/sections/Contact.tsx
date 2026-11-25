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
    <Section id="contact" label={t("label")} title={t("title")} subtitle={t("subtitle")} titleClassName="!text-4xl sm:!text-5xl lg:!text-[3.5rem] !leading-[1.1]">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <div className="rounded-3xl border border-line-strong bg-raised p-5 sm:p-7">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-sys-2"><span aria-hidden className="h-2 w-2 rounded-full bg-sys-2" />{t("availability")}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {channels.map(({ href, label, icon: Icon, external }) => (
                <li key={href}>
                  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="channel-link group flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white/[0.03] px-3 text-sm font-medium text-ink [overflow-wrap:anywhere] sm:text-base">
                    <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-sw/30 bg-sw/10 text-sw-soft"><Icon size={18} /></span><span className="min-w-0">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4"><CopyEmail email={SITE.email} label={t("copy")} done={t("copied")} /></div>
          </div>
          <CvDownload locale={locale} />
        </div>
        <div className="order-1 lg:order-2"><ContactForm fallbackEmail={SITE.email} labels={{
          title: t("form_label"), name: t("form_name"), namePh: t("form_name_ph"), email: t("form_email"), emailPh: t("form_email_ph"),
          purposeLabel: t("form_purpose"), purposeBusiness: t("form_purpose_business"), purposeCareer: t("form_purpose_career"), purposeGeneral: t("form_purpose_general"),
          serviceLabel: t("form_service"), serviceNone: t("form_service_none"), serviceWeb: t("form_service_web"), serviceAi: t("form_service_ai"), serviceIt: t("form_service_it"),
          subject: t("form_subject"), subjectPh: t("form_subject_ph"), message: t("form_message"), messagePh: t("form_message_ph"),
          submit: t("form_submit"), submitting: t("form_submitting"), successTitle: t("form_success_title"), successMsg: t("form_success_msg"), successEmail: t("form_success_email"), successClosing: t("form_success_closing"),
          another: t("form_send_another"), error: t("form_error_msg"), privacyNotice: t("form_privacy_notice"),
        }} /></div>
      </div>
    </Section>
  );
}
