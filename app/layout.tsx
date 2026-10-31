import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE, unsplash, IMG } from "@/lib/data";

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
  display: "swap",
});

const title = "Mộc Cà Phê – Quán cà phê ấm cúng ở Đà Lạt";
const description =
  "Mộc Cà Phê – quán cà phê ấm cúng giữa lòng Đà Lạt: cà phê phin, trà atiso, bánh nướng mỗi sáng và không gian gỗ yên tĩnh. Đặt bàn ngay hôm nay.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE.name,
    title,
    description,
    images: [
      { url: unsplash(IMG.hero, 1200), width: 1200, height: 800, alt: "Không gian Mộc Cà Phê" },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#3b2a20" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${body.variable} ${display.variable}`}>
      <body className="antialiased">
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
