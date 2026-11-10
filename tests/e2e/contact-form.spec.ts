import { expect, test } from "@playwright/test";

const endpoint = "https://formspree.io/f/xbggnyab";

for (const locale of ["es", "de", "en"]) {
  test(`contact form: localized ${locale} form sends to Formspree and confirms success`, async ({ page }) => {
    let submissions = 0;
    await page.route(endpoint, async (route) => {
      submissions++;
      const request = route.request();
      expect(request.method()).toBe("POST");
      expect(request.headers().accept).toContain("application/json");
      const body = request.postData() ?? "";
      expect(body).toContain('name="email"');
      expect(body).toContain('name="message"');
      expect(body).toContain('name="_gotcha"');
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });
    await page.goto(`/${locale}`);
    const form = page.locator("#contact form");
    await form.locator('[name="name"]').fill("QA Example");
    await form.locator('[name="email"]').fill("qa@example.com");
    await form.locator('[name="subject"]').fill("Integration test");
    await form.locator('[name="message"]').fill("Testing the localized contact form.");
    await form.locator('button[type="submit"]').click();
    await expect(page.locator("#contact [role='status']")).toBeVisible();
    expect(submissions).toBe(1);
  });
}

test("contact form shows fallback on provider error without claiming success", async ({ page }) => {
  await page.route(endpoint, (route) =>
    route.fulfill({ status: 422, contentType: "application/json", body: '{"errors":[{"message":"Invalid"}]}' }),
  );
  await page.goto("/es");
  const form = page.locator("#contact form");
  await form.locator('[name="name"]').fill("QA Example");
  await form.locator('[name="email"]').fill("qa@example.com");
  await form.locator('[name="message"]').fill("A valid length test message.");
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("alert")).toBeVisible();
  await expect(form.locator('[name="message"]')).toHaveValue("A valid length test message.");
  await expect(page.locator("#contact [role='status']")).toHaveCount(0);
});

test("contact form handles network failure and allows retry", async ({ page }) => {
  let attempts = 0;
  await page.route(endpoint, async (route) => {
    attempts++;
    if (attempts === 1) return route.abort("failed");
    return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/en");
  const form = page.locator("#contact form");
  await form.locator('[name="name"]').fill("QA Example");
  await form.locator('[name="email"]').fill("qa@example.com");
  await form.locator('[name="message"]').fill("A valid length test message.");
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("alert")).toBeVisible();
  await form.locator('button[type="submit"]').click();
  await expect(page.locator("#contact [role='status']")).toBeVisible();
  expect(attempts).toBe(2);
});

test("contact form respects native required field validation", async ({ page }) => {
  let submissions = 0;
  await page.route(endpoint, async (route) => {
    submissions++;
    await route.fulfill({ status: 200, body: "{}" });
  });
  await page.goto("/de");
  await page.locator('#contact form button[type="submit"]').click();
  expect(submissions).toBe(0);
  await expect(page.locator('#contact form [name="name"]')).toBeFocused();
});
