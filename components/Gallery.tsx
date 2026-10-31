"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { IMG, unsplash } from "@/lib/data";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  const item = active === null ? null : IMG.gallery[active];

  return (
    <>
      <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
        {IMG.gallery.map((g, i) => (
          <button
            key={g.id}
            type="button"
            aria-label={`Xem ảnh lớn: ${g.alt}`}
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setActive(i);
            }}
            className={`group relative cursor-zoom-in overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel ${g.span}`}
          >
            <Image
              src={unsplash(g.id, 900)}
              alt={g.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {item &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bark/90 p-4 md:p-10"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Đóng ảnh"
            onClick={close}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream transition hover:bg-cream/30 focus-visible:outline-2 focus-visible:outline-cream md:right-6 md:top-6"
          >
            <X size={24} aria-hidden />
          </button>
          <figure className="relative h-full max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={unsplash(item.id, 1400)}
              alt={item.alt}
              fill
              sizes="100vw"
              className="rounded-lg object-contain"
            />
            <figcaption className="absolute inset-x-0 -bottom-9 text-center text-sm text-cream/90">
              {item.alt}
            </figcaption>
          </figure>
        </div>,
        document.body,
      )}
    </>
  );
}
