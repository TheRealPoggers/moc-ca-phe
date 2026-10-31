import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.URL ?? "http://localhost:3000";
mkdirSync("screenshots", { recursive: true });
const p2 = (n) => String(n).padStart(2, "0");

const browser = await chromium.launch();
for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]) {
  const mobile = name === "mobile";
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: mobile ? 2 : 1,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle" });

  // Header trong suốt ở đầu trang
  await page.screenshot({ path: `screenshots/${name}-hero.png` });

  // cuộn qua toàn trang để kích hoạt fade-up + ảnh lazy
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  console.log(name, "horizontal overflow:", await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth));
  await page.screenshot({ path: `screenshots/${name}-full.png`, fullPage: true });

  // Header đổi nền khi cuộn
  await page.evaluate(() => document.querySelector("#menu").scrollIntoView());
  await page.waitForTimeout(900);
  await page.screenshot({ path: `screenshots/${name}-scrolled.png` });

  // Món nổi bật + scroll-margin: nhảy tới section, tiêu đề không bị header đè
  await page.evaluate(() => (location.hash = "#mon-noi-bat"));
  await page.waitForTimeout(900);
  await page.locator("#mon-noi-bat").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `screenshots/${name}-featured.png` });

  if (mobile) {
    // thanh CTA đáy (đang hiển thị ở giữa trang)
    await page.screenshot({ path: `screenshots/mobile-cta.png` });
    // menu hamburger
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Mở menu" }).click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: "screenshots/mobile-menu.png" });
    await page.getByRole("link", { name: "Không gian" }).first().click();
    await page.waitForTimeout(900);
    const stillOpen = await page.locator("#mobile-nav").count();
    console.log("menu đóng sau khi bấm link:", stillOpen === 0);
  }

  // Lightbox
  await page.locator("#khong-gian").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Xem ảnh lớn/ }).first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `screenshots/${name}-lightbox.png` });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  console.log("lightbox đóng bằng Esc:", (await page.getByRole("dialog").count()) === 0);

  // Bản đồ
  await page.locator("#gio-mo-cua").scrollIntoViewIfNeeded();
  await page.waitForTimeout(4000);
  await page.locator("#gio-mo-cua").screenshot({ path: `screenshots/${name}-map.png` });

  // Form → thành công
  const d = new Date(Date.now() + 3 * 86400000);
  await page.fill("#name", "Nguyễn Văn A");
  await page.fill("#phone", "0912345678");
  await page.fill("#date", `${p2(d.getDate())}${p2(d.getMonth() + 1)}${d.getFullYear()}`);
  await page.selectOption("#time", "09:30");
  await page.locator("#dat-ban").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  console.log("CTA ẩn ở phần đặt bàn:", mobile
    ? await page.evaluate(() => document.querySelector("div.fixed.bottom-0").getAttribute("aria-hidden"))
    : "n/a");
  await page.locator("#dat-ban").screenshot({ path: `screenshots/${name}-form.png` });
  await page.getByRole("button", { name: "Gửi yêu cầu đặt bàn" }).click();
  await page.waitForTimeout(400);
  await page.locator("#dat-ban").screenshot({ path: `screenshots/${name}-success.png` });
  await page.getByRole("button", { name: "Đặt bàn khác" }).click();
  console.log("form hiện lại sau 'Đặt bàn khác':", (await page.locator("#name").count()) === 1);

  await page.locator("footer").screenshot({ path: `screenshots/${name}-footer.png` });
  console.log(name, "lỗi JS:", errors.length ? errors : "không");
  await ctx.close();
}

// Giảm chuyển động: nội dung phải hiện ngay, không bị ẩn
const rm = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const rp = await rm.newPage();
await rp.goto(url, { waitUntil: "networkidle" });
const opacity = await rp.evaluate(() => getComputedStyle(document.querySelector("#menu .reveal")).opacity);
console.log("reduced-motion: opacity của section chưa cuộn tới =", opacity);
await rm.close();
await browser.close();
