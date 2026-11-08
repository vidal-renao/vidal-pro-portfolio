import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sources = ["content/site.ts", "content/projects.ts"];
const urls = [...new Set(sources.flatMap((path) =>
  [...readFileSync(path, "utf8").matchAll(/https:\/\/[^\s"'\x60]+/g)].map((match) => match[0])
))].filter((url) => !url.includes("example.com"));
const report = [];
const CONCURRENCY = 4;
let cursor = 0;
async function check(url) {
  let status = null;
  let redirectedTo = null;
  let verdict = "UNVERIFIED";
  let error = null;
  try {
    const response = await fetch(url, {
      method: "GET", redirect: "follow",
      headers: { "User-Agent": "VIDAL-ECOSYSTEM-QA/1.0 (link-verification)" },
      signal: AbortSignal.timeout(12000),
    });
    status = response.status;
    redirectedTo = response.url !== url ? response.url : null;
    verdict = status >= 200 && status < 400 ? "RESPONDING"
      : [401, 403, 429].includes(status) ? "ACCESS_RESTRICTED" : "HTTP_ERROR";
    await response.body?.cancel();
  } catch (e) {
    error = String(e?.message ?? e);
  }
  report.push({ url, status, redirectedTo, verdict, error });
}
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (cursor < urls.length) await check(urls[cursor++]);
}));
report.sort((a, b) => a.url.localeCompare(b.url));
mkdirSync("audit-results", { recursive: true });
writeFileSync(join("audit-results", "external-links.json"), JSON.stringify({ checkedAt: new Date().toISOString(), report }, null, 2));
console.log(JSON.stringify({ total: report.length, responding: report.filter((x) => x.verdict === "RESPONDING").length, issues: report.filter((x) => x.verdict !== "RESPONDING") }, null, 2));
// External services may block CI; report is evidence, not a false positive hard gate.
