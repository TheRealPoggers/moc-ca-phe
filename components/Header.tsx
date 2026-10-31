"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["#gioi-thieu", "Giới thiệu"],
  ["#mon-noi-bat", "Món nổi bật"],
  ["#menu", "Menu"],
  ["#khong-gian", "Không gian"],
  ["#danh-gia", "Đánh giá"],
  ["#lien-he", "Liên hệ"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-cream transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid ? "bg-bark shadow-md shadow-black/25" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="#" className="font-serif text-xl font-bold tracking-wide" onClick={() => setOpen(false)}>
          Mộc Cà Phê
        </a>

        <nav aria-label="Điều hướng chính" className="hidden gap-6 text-sm md:flex">
          {links.map(([h, t]) => (
            <a key={h} href={h} className="opacity-90 transition hover:opacity-100">
              {t}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#dat-ban"
            className="rounded-full bg-caramel px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#7d4817]"
          >
            Đặt bàn
          </a>
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Điều hướng di động" className="border-t border-cream/15 bg-bark md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {links.map(([h, t]) => (
              <li key={h}>
                <a
                  href={h}
                  onClick={() => setOpen(false)}
                  className="block border-b border-cream/10 py-3.5 text-base last:border-0"
                >
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
