import { SITE } from "@/lib/data";

const btn =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel";

export default function Footer() {
  return (
    <footer id="lien-he" className="bg-bark px-4 py-14 text-cream">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-serif text-3xl font-bold">Mộc Cà Phê</p>
        <p className="mt-2 text-cream/80">{SITE.tagline}</p>
        <p className="mt-6 text-cream/80">{SITE.address}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SITE.zalo} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#0068ff] text-white hover:bg-[#0058d8]`}>
            Chat Zalo
          </a>
          <a href={SITE.messenger} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#0084ff] text-white hover:bg-[#0074e0]`}>
            Messenger
          </a>
          <a href={SITE.phoneHref} className={`${btn} bg-caramel text-white hover:bg-[#a56731]`}>
            Gọi {SITE.phone}
          </a>
        </div>
        <p className="mt-10 text-xs text-cream/60">
          © {new Date().getFullYear()} Mộc Cà Phê. Website demo – quán, số điện thoại và đánh giá đều là nội dung giả định. Ảnh: Unsplash.
        </p>
      </div>
    </footer>
  );
}
