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
          <div className="premium-panel rounded-3xl border border-line bg-raised p-6 sm:p-7">
            <p className="inline-flex items-center gap-2 text-sm text-accent"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />{t("availability")}</p>
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
