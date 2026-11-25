/**
 * Presentation metadata for the experience timeline. Role copy stays in `messages/*.json`
 * (shared with the CV builder); nothing here changes that text.
 */

/** Technologies named in each role's highlights, shown as badges under the card. */
export const ROLE_STACK: Record<string, readonly string[]> = {
  "freelance-2025": ["Microsoft 365", "Entra ID", "Entra Connect", "Next.js", "Supabase"],
  "lutelco-2021": ["Active Directory", "Microsoft 365", "Intune", "VMware vSphere", "Jira"],
  "nn-bank-2019": ["ServiceNow", "ITIL", "Microsoft 365", "MFA"],
  "nsc-2017": ["Active Directory", "Azure AD", "Intune", "ServiceNow", "Sophos"],
  "web-freelance-2016": ["MySQL", "Web Apps", "App Support"],
  "sprinet-2016": ["Windows", "Linux", "macOS", "iOS", "ESET"],
  "deinta-2013": ["3CX", "SLA", "Remote Support"],
  "vodafone-2010": ["Fiber Optic", "Copper Cabling", "Datacenter"],
};

/**
 * Number of leading words rendered bold in each highlight, per locale and role, in highlight order.
 * A missing or out-of-range entry simply renders the highlight without emphasis.
 */
export const HIGHLIGHT_LEADS: Record<string, Record<string, readonly number[]>> = {
  en: {
    "freelance-2025": [3, 5, 6, 5, 2, 4],
    "servo-carejob-2023": [6],
    "lutelco-2021": [6, 7, 5, 5, 7, 7, 5, 7],
    "nn-bank-2019": [6, 4, 4, 5],
    "nsc-2017": [7, 6, 6, 7, 5, 3, 3, 7, 6, 5, 7, 8],
    "web-freelance-2016": [5, 5],
    "sprinet-2016": [5, 3, 4, 3, 6],
    "deinta-2013": [8, 8, 7, 3, 7],
    "vodafone-2010": [6, 2, 7],
  },
  de: {
    "freelance-2025": [3, 5, 5, 4, 1, 4],
    "servo-carejob-2023": [8],
    "lutelco-2021": [6, 6, 5, 5, 7, 6, 9, 6],
    "nn-bank-2019": [7, 3, 3, 3],
    "nsc-2017": [7, 5, 6, 7, 5, 3, 1, 7, 5, 3, 6, 7],
    "web-freelance-2016": [5, 4],
    "sprinet-2016": [5, 3, 3, 3, 7],
    "deinta-2013": [7, 7, 6, 3, 7],
    "vodafone-2010": [3, 1, 7],
  },
  es: {
    "freelance-2025": [6, 8, 6, 7, 3, 6],
    "servo-carejob-2023": [6],
    "lutelco-2021": [12, 9, 6, 6, 7, 10, 8, 12],
    "nn-bank-2019": [6, 8, 6, 7],
    "nsc-2017": [9, 9, 6, 7, 7, 5, 3, 9, 8, 7, 12, 9],
    "web-freelance-2016": [6, 6],
    "sprinet-2016": [6, 5, 6, 5, 7],
    "deinta-2013": [10, 9, 12, 4, 9],
    "vodafone-2010": [7, 3, 8],
  },
};

/** Splits a highlight into its bold lead-in and the rest, keeping the original text intact. */
export function splitLead(text: string, words: number | undefined): { lead: string; rest: string } {
  if (!words || words < 1) return { lead: "", rest: text };
  const parts = text.split(" ");
  if (words >= parts.length) return { lead: text, rest: "" };
  return { lead: parts.slice(0, words).join(" "), rest: " " + parts.slice(words).join(" ") };
}
