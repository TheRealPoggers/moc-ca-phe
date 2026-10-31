"use client";

import { useState } from "react";

type Errors = Partial<Record<"name" | "phone" | "when" | "guests", string>>;

const PHONE_RE = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

function validate(f: FormData): Errors {
  const e: Errors = {};
  const name = String(f.get("name") ?? "").trim();
  const phone = String(f.get("phone") ?? "").replace(/[\s.-]/g, "");
  const when = String(f.get("when") ?? "");
  const guests = Number(f.get("guests"));

  if (name.length < 2) e.name = "Vui lòng nhập họ tên (ít nhất 2 ký tự).";
  if (!PHONE_RE.test(phone))
    e.phone = "Số điện thoại không hợp lệ (ví dụ: 0912 345 678).";
  if (!when) e.when = "Vui lòng chọn ngày và giờ.";
  else if (new Date(when).getTime() < Date.now())
    e.when = "Thời gian đặt bàn phải ở tương lai.";
  else {
    const d = new Date(when);
    const mins = d.getHours() * 60 + d.getMinutes();
    if (mins < 6 * 60 + 30 || mins > 23 * 60)
      e.when = "Quán mở cửa từ 06:30 đến 23:00.";
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > 20)
    e.guests = "Số người từ 1 đến 20.";
  return e;
}

const field =
  "w-full rounded-xl border border-brown/25 bg-white px-4 py-3 text-base text-bark outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/30";

export default function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // TODO: gửi dữ liệu tới API / email / Google Sheets.
    setDone(String(data.get("name")).trim());
    form.reset();
  }

  if (done)
    return (
      <div role="status" className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-4xl" aria-hidden>
          ☕
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold">Cảm ơn {done}!</h3>
        <p className="mt-2 text-brown">
          Mộc đã nhận yêu cầu đặt bàn của bạn. Chúng mình sẽ gọi xác nhận trong ít phút.
        </p>
        <button
          onClick={() => setDone(null)}
          className="mt-5 text-sm font-medium text-caramel underline underline-offset-4"
        >
          Đặt thêm một bàn khác
        </button>
      </div>
    );

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Họ và tên
        </label>
        <input id="name" name="name" autoComplete="name" className={field} placeholder="Nguyễn Văn A" {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          Số điện thoại
        </label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="0912 345 678" {...aria("phone")} />
        {err("phone")}
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
        <div>
          <label htmlFor="when" className="mb-1 block text-sm font-medium">
            Ngày giờ
          </label>
          <input id="when" name="when" type="datetime-local" className={field} {...aria("when")} />
          {err("when")}
        </div>
        <div>
          <label htmlFor="guests" className="mb-1 block text-sm font-medium">
            Số người
          </label>
          <input id="guests" name="guests" type="number" min={1} max={20} defaultValue={2} className={field} {...aria("guests")} />
          {err("guests")}
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-bark px-6 py-3.5 font-medium text-cream transition hover:bg-brown focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
      >
        Gửi yêu cầu đặt bàn
      </button>
      <p className="text-center text-xs text-brown/80">
        Đây là bản demo: dữ liệu chưa được gửi đi đâu.
      </p>
    </form>
  );
}
