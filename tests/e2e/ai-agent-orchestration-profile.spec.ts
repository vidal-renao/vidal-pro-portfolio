import { test, expect } from "@playwright/test";
import es from "../../messages/es.json";
import en from "../../messages/en.json";
import de from "../../messages/de.json";

for (const [locale, messages] of Object.entries({ es, en, de })) {
  test(`AI orchestration profile content (${locale})`, () => {
    const software = messages.specializations.tracks[0];
    const systems = messages.specializations.tracks[1];
    for (const value of [messages.cv.cvProfile, messages.cv.competencies[1], JSON.stringify(software.technical)]) {
      expect(value).toContain("Claude Code");
      expect(value).toContain("Codex");
      expect(value).toContain("SDD/EARS");
    }
    expect(JSON.stringify(systems)).not.toContain("SDD/EARS");
    expect(JSON.stringify(messages.cvSystems)).not.toContain("SDD/EARS");
  });
}
