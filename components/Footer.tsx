import { SITE } from "@/lib/data";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-cream/50 bg-cream/10 px-5 py-3 text-sm font-medium text-cream transition hover:bg-cream hover:text-bark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream";

const icon = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function Footer() {
  return (
    <footer id="lien-he" className="bg-bark px-4 pb-28 pt-14 text-cream md:pb-14">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-serif text-3xl font-bold">Mộc Cà Phê</p>
        <p className="mt-2 text-cream/85">{SITE.tagline}</p>
        <p className="mt-6 text-cream/85">{SITE.address}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SITE.zalo} target="_blank" rel="noopener noreferrer" className={btn}>
            <svg {...icon}>
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
              <path d="M8.5 10h5l-5 4h5" />
            </svg>
            Chat Zalo
          </a>
          <a href={SITE.messenger} target="_blank" rel="noopener noreferrer" className={btn}>
            <svg {...icon}>
              <path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.2 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3Z" />
              <path d="m7.5 13 3.3-3.5 2.4 2 3.3-2.5" />
            </svg>
            Messenger
          </a>
          <a href={SITE.phoneHref} className={btn}>
            <svg {...icon}>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
            </svg>
            Gọi {SITE.phone}
          </a>
        </div>
        <p className="mt-10 text-xs text-cream/70">
          © {new Date().getFullYear()} Mộc Cà Phê. Website demo – quán, số điện thoại và đánh giá đều là nội dung giả định. Ảnh: Unsplash.
        </p>
      </div>
    </footer>
  );
}
