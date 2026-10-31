import Image from "next/image";
import Header from "@/components/Header";
import Section from "@/components/Section";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import MobileCta from "@/components/MobileCta";
import { MapPin, Phone } from "lucide-react";
import { SITE, IMG, MENU, FEATURED, REVIEWS, HOURS, MAP_EMBED, MAP_DIRECTIONS, unsplash, vnd } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[85svh] md:min-h-[88svh] items-center justify-center overflow-hidden text-center text-cream">
          <Image
            src={unsplash(IMG.hero, 1920)}
            alt="Không gian Mộc Cà Phê với ánh đèn vàng ấm"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bark/70 via-bark/55 to-bark/80" />
          <div className="relative px-4 pt-14">
            <p className="text-sm uppercase tracking-[0.3em] text-cream/85">Đà Lạt · Từ 2018</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight md:text-7xl">Mộc Cà Phê</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/90">
              {SITE.tagline}. Một tách cà phê thơm, một góc gỗ ấm, một buổi chiều chậm rãi.
            </p>
            <a
              href="#dat-ban"
              className="mt-8 inline-block rounded-full bg-caramel px-8 py-3.5 text-lg font-medium text-white shadow-lg transition hover:bg-[#7d4817] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Đặt bàn
            </a>
          </div>
        </section>

        {/* Giới thiệu */}
        <Section id="gioi-thieu" eyebrow="Câu chuyện của Mộc" title="Giới thiệu">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
              <Image
                src={unsplash(IMG.about, 1000)}
                alt="Tách cà phê đặt trên đĩa"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-bark md:text-xl md:leading-relaxed">
              <p>
                Mộc ra đời từ mong muốn đơn giản: có một nơi ở Đà Lạt để bạn ngồi xuống, nghe tiếng mưa trên mái và uống một tách cà phê đúng vị.
              </p>
              <p>
                Hạt cà phê được tuyển từ nông trại Cầu Đất, rang vừa tay mỗi tuần. Bàn ghế làm từ gỗ thông địa phương nên không gian luôn mộc mạc và dễ chịu.
              </p>
              <p>
                Dù bạn đi một mình, hẹn bạn bè hay làm việc cả buổi, Mộc luôn có sẵn một góc dành cho bạn.
              </p>
            </div>
          </div>
        </Section>

        {/* Món nổi bật */}
        <Section id="mon-noi-bat" eyebrow="Được yêu thích nhất" title="Món nổi bật">
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED.map((f) => (
              <article key={f.name} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={unsplash(f.img, 900)}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl font-bold">{f.name}</h3>
                    <span className="shrink-0 font-semibold text-caramel">{vnd(f.price)}</span>
                  </div>
                  <p className="mt-2 text-base leading-snug text-bark/90">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Menu */}
        <Section id="menu" eyebrow="Thức uống & món ngon" title="Menu" className="bg-cream-deep">
          <div className="grid gap-6 md:grid-cols-3">
            {MENU.map((g) => (
              <div key={g.title} className="rounded-2xl bg-cream p-6 shadow-sm">
                <h3 className="border-b border-brown/20 pb-3 font-serif text-2xl font-bold">{g.title}</h3>
                <ul className="mt-4 space-y-4">
                  {g.items.map((i) => (
                    <li key={i.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-medium">{i.name}</span>
                        <span className="shrink-0 font-semibold text-caramel">{vnd(i.price)}</span>
                      </div>
                      <p className="mt-0.5 text-base leading-snug text-bark/90">{i.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Không gian */}
        <Section id="khong-gian" eyebrow="Nơi bạn thuộc về" title="Không gian">
          <Gallery />
        </Section>

        {/* Đánh giá */}
        <Section id="danh-gia" eyebrow="Khách nói gì" title="Đánh giá" className="bg-cream-deep">
          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rounded-2xl bg-cream p-6 shadow-sm">
                <p className="text-caramel" aria-label="5 sao">★★★★★</p>
                <blockquote className="mt-3 text-bark">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-medium">
                  {r.name} <span className="font-normal text-brown">· {r.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-sm italic text-brown">
            * Các đánh giá trên là nội dung mẫu, chỉ dùng để minh họa giao diện.
          </p>
        </Section>

        {/* Giờ mở cửa + bản đồ */}
        <Section id="gio-mo-cua" eyebrow="Ghé thăm Mộc" title="Giờ mở cửa & Địa chỉ">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
              <ul className="divide-y divide-brown/15">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 py-3">
                    <span>{h.day}</span>
                    <span className="font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-brown/15 pt-5 text-bark">
                <p className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-brown" aria-hidden />
                  <span>{SITE.address}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0 text-brown" aria-hidden />
                  <a href={SITE.phoneHref} className="font-medium underline underline-offset-4">
                    {SITE.phone}
                  </a>
                </p>
              </div>
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center self-start rounded-full bg-bark px-6 py-3 text-sm font-medium text-cream transition hover:bg-brown focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
              >
                Chỉ đường
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <iframe
                title="Bản đồ khu vực Hồ Xuân Hương, Đà Lạt"
                src={MAP_EMBED}
                className="h-72 w-full border-0 md:h-full md:min-h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Section>

        {/* Đặt bàn */}
        <Section id="dat-ban" eyebrow="Giữ chỗ cho bạn" title="Đặt bàn" className="bg-cream-deep">
          <div className="mx-auto max-w-2xl">
            <BookingForm />
          </div>
        </Section>
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
