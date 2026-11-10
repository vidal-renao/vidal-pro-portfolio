import { existsSync, readFileSync, writeFileSync } from "node:fs";
const load = (file) => existsSync(file) ? JSON.parse(readFileSync(file,"utf8")) : null;
const links = load("audit-results/external-links.json");
const axe = load("audit-results/accessibility.json");
const audits = ["es-mobile", "de-desktop"].map((name) => {
  const data = load(`audit-results/lighthouse-${name}.json`);
  return data ? { name, page: data.finalUrl, scores: Object.fromEntries(
    Object.entries(data.categories).map(([k,v]) => [k, Math.round((v.score ?? 0) * 100)])
  ), lcp: data.audits?.["largest-contentful-paint"]?.displayValue, cls: data.audits?.["cumulative-layout-shift"]?.displayValue } : { name, missing: true };
});
const text = [
  "# VIDAL ECOSYSTEM — Enterprise QA evidence",
  "",
  "Source: audited feature branch. Automated lab checks; NOT a real-device, search-index or Formspree-dashboard configuration sign-off.",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Lighthouse (laboratory, not field Core Web Vitals)",
  ...audits.map((a) => `- ${a.name}: ${a.missing ? "NOT EXECUTED" : JSON.stringify(a)}`),
  "",
  "## Accessibility (axe-core WCAG 2.x)",
  ...((axe?.report ?? []).map((x) => `- ${x.locale}/${x.width}: ${x.violations.length} violations; ${x.violations.map((v) => v.id + "(" + v.impact + ")").join(", ") || "none"}`)),
  "",
  "## External links (external availability may differ by origin)",
  ...((links?.report ?? []).map((x) => `- ${x.verdict}: ${x.status ?? "N/A"} ${x.url}${x.error ? " (" + x.error + ")" : ""}`)),
  "",
  "## Required manual / connected-service gates",
  "- Human inspection of screenshots including actual device gestures, focus and hover interactions.",
  "- Google Search Console and Bing Webmaster indexation / sitemap state.",
  "- Real Formspree submission receipt verified independently (Outlook confirmation); recheck the branded subject on one controlled test before production.",
  "- Production-domain CDN/HTTPS/redirect checks after explicit release approval.",
  "- Verify Formspree CAPTCHA, _gotcha honeypot, authorized production domain and privacy retention in provider settings.",
  "",
];
writeFileSync("audit-results/QA-SUMMARY.md", text.join("\n")+"\n");
console.log(text.slice(0, 14).join("\n"));
