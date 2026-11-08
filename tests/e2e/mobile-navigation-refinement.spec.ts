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


test("last section keeps next available until the actual document bottom", async ({page}) => {
  await page.goto("/es");
  const rail=page.getByRole("navigation",{name:"Navegación por secciones"});
  await rail.getByRole("button",{name:"Elegir sección"}).click();
  await rail.getByRole("link",{name:"Contacto"}).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(rail).toContainText("09 / 09");
  const next=rail.getByRole("button",{name:"Siguiente sección"});
  await expect(next).toBeEnabled();
  await next.click();
  await expect.poll(()=>page.evaluate(()=>Math.abs(document.documentElement.scrollHeight-innerHeight-scrollY))).toBeLessThan(5);
  await expect(next).toBeDisabled();
});

test("rapid repeated next taps do not skip multiple sections",async({page})=>{
  await page.goto("/es");
  const rail=page.getByRole("navigation",{name:"Navegación por secciones"});
  const next=rail.getByRole("button",{name:"Siguiente sección"});
  await next.click();
  await next.click({force:true});
  await expect(page).toHaveURL(/#specializations$/);
  await expect(rail).toContainText("02 / 09");
});

test("manual touch scroll interrupts navigation without another automatic jump",async({page,isMobile})=>{
  test.skip(!isMobile,"mobile only");
  await page.goto("/es");
  const rail=page.getByRole("navigation",{name:"Navegación por secciones"});
  await rail.getByRole("button",{name:"Siguiente sección"}).click();
  await page.evaluate(()=>window.dispatchEvent(new Event("touchstart")));
  await page.evaluate(()=>window.scrollTo({top:950,behavior:"instant"}));
  const before=await page.evaluate(()=>window.scrollY);
  await page.waitForTimeout(500);
  const after=await page.evaluate(()=>window.scrollY);
  expect(Math.abs(after-before)).toBeLessThan(8);
});
