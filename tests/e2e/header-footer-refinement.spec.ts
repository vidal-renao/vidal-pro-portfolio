import { expect, test } from "@playwright/test";

test("desktop More opens by hover, remains open over dropdown and closes on leaving",async({page,isMobile})=>{
  test.skip(isMobile,"desktop hover only");
  await page.goto("/es");
  const details=page.getByRole("navigation",{name:"Main"}).locator("details");
  await details.locator("summary").hover();
  await expect(details).toHaveAttribute("open","");
  await details.locator('a[href="#skills"]').hover();
  await expect(details).toHaveAttribute("open","");
  await page.locator("[data-site-brand]").hover();
  await expect(details).not.toHaveAttribute("open","");
});

test("desktop More remains available to keyboard and click",async({page,isMobile})=>{
  test.skip(isMobile,"desktop only");
  await page.goto("/de");
  const details=page.getByRole("navigation",{name:"Main"}).locator("details");
  const summary=details.locator("summary");
  await summary.focus();
  await summary.press("Enter");
  await expect(details).toHaveAttribute("open","");
  await details.locator('a[href="#testimonials"]').focus();
  await expect(details).toHaveAttribute("open","");
  await page.keyboard.press("Escape");
  await expect(details).not.toHaveAttribute("open","");
});

for(const locale of ["es","en","de"] as const){
  test(`enterprise footer structured and links valid in ${locale}`,async({page})=>{
    await page.goto(`/${locale}`);
    const footer=page.locator("footer");
    await expect(footer.locator("[data-footer-brand]")).toBeVisible();
    await expect(footer.locator("[data-footer-explore] a")).toHaveCount(8);
    await expect(footer.locator("[data-footer-contact] a[href^='mailto:']")).toHaveCount(1);
    await expect(footer.locator("[data-footer-social] a")).toHaveCount(2);
    await expect(footer.locator('a[href="#top"]')).toHaveCount(2);
  });
}
test("footer and header do not horizontally overflow common viewport sizes",async({page,isMobile})=>{
  test.skip(isMobile,"responsive desktop browser");
  for(const width of [360,375,768,1024,1280,1440]){
    await page.setViewportSize({width,height:750});
    await page.goto("/es");
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
  }
});


test("desktop More dropdown closes when user scrolls away",async({page,isMobile})=>{
  test.skip(isMobile,"desktop hover only");
  await page.goto("/es");
  const details=page.locator("[data-header-primary] details");
  await details.locator("summary").hover();
  await expect(details).toHaveAttribute("open","");
  await page.evaluate(()=>window.scrollTo({top:Math.max(300,innerHeight),behavior:"instant"}));
  await expect(details).not.toHaveAttribute("open","");
});
