import { expect, test } from "@playwright/test";

const copy = {
  es: { title: "¡Tu mensaje ha llegado!", message: "He recibido correctamente tu mensaje", email: "También te he enviado una confirmación a tu correo electrónico." },
  en: { title: "Your message has arrived!", message: "I've received your message", email: "I've also sent a confirmation to your email address." },
  de: { title: "Ihre Nachricht ist angekommen!", message: "Ich habe Ihre Nachricht erhalten", email: "Sie haben auch eine Eingangsbestätigung per E-Mail erhalten." },
} as const;

for (const locale of ["es", "en", "de"] as const) {
  test(`localized personalized Formspree confirmation in ${locale}`, async ({ page }) => {
    await page.route("https://formspree.io/f/xbggnyab", route =>
      route.fulfill({ status: 200, contentType: "application/json",
        headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ ok: true }) }));
    await page.goto("/" + locale);
    const form = page.locator("#contact form");
    await form.locator('[name="name"]').fill("Test Client");
    await form.locator('[name="email"]').fill("test@example.com");
    await form.locator('[name="message"]').fill("This is a localized confirmation test");
    await form.locator('button[type="submit"]').click();
    const status = page.locator("#contact [role='status']");
    await expect(status).toContainText(copy[locale].title);
    await expect(status).toContainText(copy[locale].message);
    await expect(status).toContainText(copy[locale].email);
    await expect(status).not.toContainText("24 hours");
    await expect(status.getByRole("button")).toBeVisible();
  });
}
