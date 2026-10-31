"use client";

import { useEffect, useRef } from "react";

/**
 * Fade-up nhẹ khi cuộn tới. Trạng thái ẩn chỉ áp dụng trong CSS khi người dùng
 * không bật prefers-reduced-motion (xem globals.css), nên không có JS hoặc bật
 * giảm chuyển động thì nội dung vẫn hiện bình thường.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
