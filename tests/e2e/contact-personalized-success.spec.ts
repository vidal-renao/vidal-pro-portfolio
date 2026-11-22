import { expect, test } from "@playwright/test";

const copy = {
  es: { title: "Mensaje enviado", message: "El formulario ha sido aceptado por el servicio de envío. Gracias por tu consulta." },
  en: { title: "Message submitted", message: "The message service accepted your form submission. Thank you for reaching out." },
  de: { title: "Nachricht übermittelt", message: "Der Formulardienst hat Ihre Nachricht zur Übermittlung angenommen. Vielen Dank für Ihre Anfrage." },
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
    await expect(status).not.toContainText(/confirmación a tu correo|confirmation to your email|Eingangsbestätigung per E-Mail/);
    await expect(status).not.toContainText("24 hours");
    await expect(status).toContainText("VIDAL ECOSYSTEM");
    await expect(status.getByRole("button")).toBeVisible();
  });
}

test("mobile contact form is shown before direct contact channels", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es");
  const form = await page.locator("#contact form").boundingBox();
  const email = await page.locator('#contact a[href^="mailto:"]').first().boundingBox();
  expect(form).not.toBeNull();
  expect(email).not.toBeNull();
  expect(form!.y).toBeLessThan(email!.y);
});

test("desktop contact columns preserve channels on the left", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/es");
  const form = await page.locator("#contact form").boundingBox();
  const email = await page.locator('#contact a[href^="mailto:"]').first().boundingBox();
  expect(form).not.toBeNull();
  expect(email).not.toBeNull();
  expect(form!.x).toBeGreaterThan(email!.x);
});

const contactHeading = {
  es: "Me encantará saber de ti",
  en: "I'd Love to Hear from You",
  de: "Ich freue mich auf Ihre Nachricht",
} as const;
for (const locale of ["es", "en", "de"] as const) {
  test(`contact invitation is prominent and translated in ${locale}`, async ({ page }) => {
    await page.goto("/" + locale);
    const heading = page.locator("#contact-title");
    await expect(heading).toHaveText(contactHeading[locale]);
    await expect(heading).toHaveClass(/text-4xl/);
    await expect(page.locator("#contact form")).toBeVisible();
  });
}
