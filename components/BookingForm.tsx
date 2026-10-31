"use client";

import { useRef, useState } from "react";
import { OPEN_RANGE } from "@/lib/data";

type Errors = Partial<Record<"name" | "phone" | "date" | "time" | "guests", string>>;

const PHONE_RE = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const pad = (n: number) => String(n).padStart(2, "0");

/** "dd/mm/yyyy" -> Date (null nếu không hợp lệ) */
function parseDate(s: string): Date | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
  if (!m) return null;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d
    ? date
    : null;
}

const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
const startOfToday = () => {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
};

/** Các khung giờ mỗi 30 phút trong giờ mở cửa (khung cuối cách giờ đóng cửa 30 phút). */
function slotsFor(date: Date | null): string[] {
  const range = date && isWeekend(date) ? OPEN_RANGE.weekend : OPEN_RANGE.weekday;
  const out: string[] = [];
  for (let m = range.open; m <= range.close - 30; m += 30)
    out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  if (date && date.getTime() === startOfToday().getTime()) {
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();
    return out.filter((s) => {
      const [h, mi] = s.split(":").map(Number);
      return h * 60 + mi > cur;
    });
  }
  return out;
}

function formatTyping(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

const field =
  "w-full rounded-xl border border-brown/40 bg-white px-4 py-3 text-base text-bark outline-none transition placeholder:text-brown/60 focus:border-caramel focus:ring-2 focus:ring-caramel/30";

export default function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const [dateText, setDateText] = useState("");
  const [time, setTime] = useState("");
  const pickerRef = useRef<HTMLInputElement>(null);

  const parsed = parseDate(dateText);
  const slots = slotsFor(parsed);

  function onDateText(v: string) {
    setDateText(formatTyping(v));
    setTime("");
  }

  function onNativePick(iso: string) {
    if (!iso) return;
    const [y, m, d] = iso.split("-");
    setDateText(`${d}/${m}/${y}`);
    setTime("");
  }

  function openPicker() {
    const el = pickerRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.click();
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/[\s.-]/g, "");
    const guests = Number(data.get("guests"));

    const e: Errors = {};
    if (name.length < 2) e.name = "Vui lòng nhập họ tên (ít nhất 2 ký tự).";
    if (!PHONE_RE.test(phone))
      e.phone = "Số điện thoại không hợp lệ (ví dụ: 0912 345 678).";
    if (!dateText) e.date = "Vui lòng chọn ngày.";
    else if (!parsed) e.date = "Ngày không hợp lệ. Định dạng: dd/mm/yyyy.";
    else if (parsed < startOfToday()) e.date = "Ngày đặt bàn không được ở quá khứ.";
    if (!time) e.time = "Vui lòng chọn khung giờ.";
    else if (parsed && !slots.includes(time)) e.time = "Khung giờ không còn hợp lệ, vui lòng chọn lại.";
    if (!Number.isInteger(guests) || guests < 1 || guests > 20)
      e.guests = "Số người từ 1 đến 20.";

    setErrors(e);
    if (Object.keys(e).length) return;

    // TODO: gửi dữ liệu tới API / email / Google Sheets.
    setDone(name);
    setDateText("");
    setTime("");
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
      <p id={`${k}-err`} className="mt-1 text-sm text-red-800">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });
  const todayIso = (() => {
    const t = startOfToday();
    return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  })();

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium">
            Ngày
          </label>
          <div className="relative">
            <input
              id="date"
              inputMode="numeric"
              autoComplete="off"
              placeholder="dd/mm/yyyy"
              maxLength={10}
              value={dateText}
              onChange={(e) => onDateText(e.target.value)}
              className={`${field} pr-12`}
              {...aria("date")}
            />
            <button
              type="button"
              onClick={openPicker}
              aria-label="Mở lịch chọn ngày"
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-brown hover:text-caramel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
            </button>
            <input
              ref={pickerRef}
              type="date"
              min={todayIso}
              tabIndex={-1}
              aria-hidden
              onChange={(e) => onNativePick(e.target.value)}
              className="pointer-events-none absolute right-0 bottom-0 h-0 w-0 opacity-0"
            />
          </div>
          {err("date")}
        </div>
        <div>
          <label htmlFor="time" className="mb-1 block text-sm font-medium">
            Khung giờ
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!parsed}
            className={`${field} disabled:cursor-not-allowed disabled:bg-cream-deep`}
            {...aria("time")}
          >
            <option value="">{parsed ? "Chọn giờ" : "Chọn ngày trước"}</option>
            {slots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err("time")}
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="mb-1 block text-sm font-medium">
          Số người
        </label>
        <input id="guests" name="guests" type="number" min={1} max={20} defaultValue={2} className={field} {...aria("guests")} />
        {err("guests")}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-bark px-6 py-3.5 font-medium text-cream transition hover:bg-brown focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
      >
        Gửi yêu cầu đặt bàn
      </button>
      <p className="text-center text-xs text-brown">
        Đây là bản demo: dữ liệu chưa được gửi đi đâu.
      </p>
    </form>
  );
}
