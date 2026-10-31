"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { SITE } from "@/lib/data";

/** Thanh cố định đáy màn hình (chỉ mobile), ẩn khi phần đặt bàn đang hiển thị. */
export default function MobileCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("dat-ban");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-cream/15 bg-bark px-4 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.2)] transition duration-300 md:hidden ${
        hidden ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={SITE.phoneHref}
          tabIndex={hidden ? -1 : 0}
          className="flex items-center justify-center gap-2 rounded-full border border-cream/50 bg-cream/10 py-3 text-sm font-medium text-cream"
        >
          <Phone size={18} aria-hidden /> Gọi
        </a>
        <a
          href="#dat-ban"
          tabIndex={hidden ? -1 : 0}
          className="flex items-center justify-center gap-2 rounded-full bg-caramel py-3 text-sm font-medium text-white"
        >
          <CalendarCheck size={18} aria-hidden /> Đặt bàn
        </a>
      </div>
    </div>
  );
}
