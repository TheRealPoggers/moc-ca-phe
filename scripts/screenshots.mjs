import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.URL ?? "http://localhost:3000";
mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: name === "mobile" ? 2 : 1,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  // cuộn để kích hoạt ảnh lazy
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  console.log(name, "horizontal overflow:", overflow);
  await page.screenshot({ path: `screenshots/${name}-full.png`, fullPage: true });
  await page.screenshot({ path: `screenshots/${name}-hero.png` });
  await page.locator("#gio-mo-cua").scrollIntoViewIfNeeded();
  await page.waitForTimeout(4000);
  await page.locator("#gio-mo-cua").screenshot({ path: `screenshots/${name}-map.png` });
  await ctx.close();
}
await browser.close();
