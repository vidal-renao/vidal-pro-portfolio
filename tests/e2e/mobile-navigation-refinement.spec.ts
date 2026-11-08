import { expect, test } from "@playwright/test";

test("mobile menu is dismissible by backdrop and does not trap background scrolling after close", async ({page,isMobile}) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/es");
  await page.getByRole("button", {name:"Menú"}).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("[data-mobile-menu-backdrop]")).toBeVisible();
  await page.locator("[data-mobile-menu-backdrop]").click({position:{x:10,y:100}});
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(page.locator("body")).not.toHaveCSS("overflow","hidden");
  await expect(page.getByRole("button",{name:"Menú"})).toBeFocused();
});

test("mobile menu shows direct section route and supports keyboard Tab containment",async ({page,isMobile})=>{
  test.skip(!isMobile,"mobile only");
  await page.goto("/es");
  await page.getByRole("button",{name:"Menú"}).click();
  const panel=page.locator("#mobile-nav");
  await expect(panel.locator('a[href="#contact"]')).toHaveCount(1);
  await expect(panel.locator('a[href="#services"]')).toHaveCount(1);
  await page.keyboard.press("Shift+Tab");
  expect(await page.evaluate(() => document.getElementById("mobile-nav")?.contains(document.activeElement))).toBe(true);
});

test("scroll rail tracks the last section at the document bottom",async({page})=>{
  await page.goto("/es");
  await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"}));
  const rail=page.getByRole("navigation",{name:"Navegación por secciones"});
  await expect(rail).toContainText("09 / 09");
  await expect(rail.getByRole("button",{name:"Siguiente sección"})).toBeDisabled();
  await rail.getByRole("button",{name:"Sección anterior"}).click();
  await expect(page).toHaveURL(/#testimonials$/);
});

test("section rail announces the actual section and provides direct section selection",async({page})=>{
  await page.goto("/es");
  const rail=page.getByRole("navigation",{name:"Navegación por secciones"});
  await rail.getByRole("button",{name:"Elegir sección"}).click();
  await expect(rail.getByRole("link",{name:"Servicios"})).toBeVisible();
  await rail.getByRole("link",{name:"Servicios"}).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(rail.getByRole("link",{name:"Servicios"})).toBeHidden();
});

test("scroll controls remain in viewport after portrait-to-landscape resize",async({page,isMobile})=>{
  test.skip(!isMobile,"mobile only");
  await page.goto("/es");
  const rail=page.getByRole("navigation",{name:"Navegación por secciones"});
  const grip=rail.getByRole("button",{name:"Mover control de navegación"});
  const handle=await grip.boundingBox();
  expect(handle).not.toBeNull();
  await page.mouse.move(handle!.x+20,handle!.y+15);
  await page.mouse.down();
  await page.mouse.move(4,210,{steps:8});
  await page.mouse.up();
  await page.setViewportSize({width:800,height:360});
  const rect=await rail.boundingBox();
  expect(rect).not.toBeNull();
  expect(rect!.y).toBeGreaterThanOrEqual(0);
  expect(rect!.y+rect!.height).toBeLessThanOrEqual(361);
});
