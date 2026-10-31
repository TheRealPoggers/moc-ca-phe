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
  // Form đặt bàn: điền ngày (dd/mm/yyyy) + chọn khung giờ
  const d = new Date(Date.now() + 3 * 86400000);
  const p2 = (n) => String(n).padStart(2, "0");
  await page.fill("#date", `${p2(d.getDate())}${p2(d.getMonth() + 1)}${d.getFullYear()}`);
  await page.selectOption("#time", "09:30");
  await page.fill("#name", "Nguyễn Văn A");
  await page.locator("#dat-ban").scrollIntoViewIfNeeded();
  await page.locator("#dat-ban").screenshot({ path: `screenshots/${name}-form.png` });
  await page.locator("footer").screenshot({ path: `screenshots/${name}-footer.png` });
  await ctx.close();
}
await browser.close();
