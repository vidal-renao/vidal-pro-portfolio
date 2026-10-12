/**
 * Certificates and degrees, newest first within each group. Each one is backed by the PDF in
 * /public/assets/certs (or, when `pdf` is null, by the original kept by the owner).
 * Copy lives in `messages/*.json` under `certifications.<key>_*`.
 */
export type CredentialGroup = "ai" | "network" | "degree";

export interface Credential {
  key: string;
  group: CredentialGroup;
  pdf: string | null;
}

export const CREDENTIALS: Credential[] = [
  { key: "ai_development", group: "ai", pdf: "/assets/certs/ai-development-october.pdf" },
  { key: "ai_marketing", group: "ai", pdf: "/assets/certs/ai-digital-marketing.pdf" },
  { key: "ai_chatgpt", group: "ai", pdf: null },
  { key: "ai_agentprog", group: "ai", pdf: "/assets/certs/ai-agent-programming.pdf" },
  { key: "ai_agents", group: "ai", pdf: "/assets/certs/ai-zero-to-agents.pdf" },
  { key: "ai_production", group: "ai", pdf: "/assets/certs/ai-zero-to-production.pdf" },
  { key: "ccna", group: "network", pdf: "/assets/certs/CCNA-Cisco.pdf" },
  { key: "asir", group: "degree", pdf: null },
  { key: "diploma", group: "degree", pdf: "/assets/certs/Diplom.pdf" },
];

export const CREDENTIAL_GROUPS: CredentialGroup[] = ["ai", "network", "degree"];
