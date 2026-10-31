import Link from "next/link";

const links = [
  ["#gioi-thieu", "Giới thiệu"],
  ["#menu", "Menu"],
  ["#khong-gian", "Không gian"],
  ["#danh-gia", "Đánh giá"],
  ["#lien-he", "Liên hệ"],
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-bark/85 text-cream backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="#" className="font-serif text-xl font-bold tracking-wide">
          Mộc Cà Phê
        </Link>
        <nav aria-label="Điều hướng chính" className="hidden gap-6 text-sm md:flex">
          {links.map(([h, t]) => (
            <a key={h} href={h} className="opacity-85 transition hover:opacity-100">
              {t}
            </a>
          ))}
        </nav>
        <a
          href="#dat-ban"
          className="rounded-full bg-caramel px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#7d4817]"
        >
          Đặt bàn
        </a>
      </div>
    </header>
  );
}
