import { expect, test } from "@playwright/test";

test("student selects a teacher and previews a secure booking flow", async ({ page }) => {
  await page.goto("/en/labs/tempo-tutor");

  await expect(page.getByRole("heading", { name: /TempoTutor/ })).toBeVisible();
  await page.getByTestId("slot-guitar").click();
  await expect(page.getByTestId("booking-summary")).toContainText("Jonas Keller");
  await expect(page.getByTestId("booking-summary")).toContainText("CHF 58");

  await page.getByTestId("reserve-button").click();
  await expect(page.getByTestId("flow-message")).toContainText("Reservation preview created");
});

test("Spanish product lab exposes the marketplace architecture", async ({ page }) => {
  await page.goto("/es/labs/tempo-tutor");

  await expect(page.getByRole("heading", { name: "Que demuestra este producto" })).toBeVisible();
  await expect(page.getByText("Webhook idempotente")).toBeVisible();
  await expect(page.getByText("Supabase Auth + RLS")).toBeVisible();
});
