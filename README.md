# Mộc Cà Phê – Landing page

Landing page cho quán cà phê giả định **Mộc Cà Phê** ở Đà Lạt. Giao diện ấm áp (nâu/kem), toàn bộ nội dung tiếng Việt, ưu tiên mobile.

> Đây là dự án demo: tên quán, địa chỉ, số điện thoại và các đánh giá đều là nội dung mẫu. Ảnh lấy từ [Unsplash](https://unsplash.com).

## Ảnh chụp màn hình

| Desktop (1440px) | Mobile (390px) |
| --- | --- |
| ![Desktop](screenshots/desktop-full.png) | ![Mobile](screenshots/mobile-full.png) |

## Tính năng

- Hero ảnh lớn với nút **Đặt bàn**
- Giới thiệu, Menu chia nhóm (giá VNĐ), Không gian (gallery ảnh)
- Đánh giá khách hàng (ghi rõ là nội dung mẫu)
- Giờ mở cửa + Google Maps nhúng
- Form đặt bàn có kiểm tra dữ liệu (tên, SĐT Việt Nam, ngày giờ trong tương lai và trong giờ mở cửa, số người 1–20); hiện thông báo thành công (chưa gửi dữ liệu đi đâu)
- Footer với nút Zalo / Messenger / Gọi điện
- SEO cơ bản: title, description, Open Graph, `lang="vi"`

## Công nghệ

Next.js (App Router) · TypeScript · Tailwind CSS v4 · `next/image` · `next/font` (Be Vietnam Pro, Playfair Display – có subset tiếng Việt) · Playwright (chụp ảnh màn hình)

## Chạy local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Chụp lại ảnh màn hình (cần server đang chạy ở cổng 3000):

```bash
npx playwright install chromium
node scripts/screenshots.mjs
```

## Tùy chỉnh

- Nội dung, menu, giờ mở cửa, số điện thoại, link Zalo/Messenger: `lib/data.ts`
- Biến môi trường tùy chọn `NEXT_PUBLIC_SITE_URL` – URL thật của site (dùng cho Open Graph)
- Để nhận đơn đặt bàn thật, thay phần `TODO` trong `components/BookingForm.tsx` bằng lời gọi API/email.
