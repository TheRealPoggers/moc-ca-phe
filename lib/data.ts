export const SITE = {
  name: "Mộc Cà Phê",
  tagline: "Một góc nhỏ ấm áp giữa sương mù Đà Lạt",
  address: "12 Đường Hoa Hồng, Phường 4, Đà Lạt, Lâm Đồng",
  // Thông tin liên hệ mẫu — thay bằng số thật trước khi dùng.
  phone: "0900 000 000",
  phoneHref: "tel:0900000000",
  zalo: "https://zalo.me/0900000000",
  messenger: "https://m.me/moccaphe.dalat",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://moc-ca-phe.vercel.app",
};

export const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;

export const IMG = {
  hero: "1442512595331-e89e73853f31",
  about: "1495474472287-4d71bcdd2085",
  gallery: [
    { id: "1554118811-1e0d58224f24", alt: "Quầy bar gỗ ấm cúng", span: "col-span-2 row-span-2" },
    { id: "1501339847302-ac426a4a7cbb", alt: "Góc ngồi cạnh cửa sổ", span: "" },
    { id: "1445116572660-236099ec97a0", alt: "Bàn gỗ và ánh đèn vàng", span: "" },
    { id: "1521017432531-fbd92d768814", alt: "Không gian thư giãn buổi chiều", span: "col-span-2" },
    { id: "1559925393-8be0ec4767c8", alt: "Khu ghế sofa êm ái", span: "col-span-2 md:col-span-4" },
  ],
};

export type MenuItem = { name: string; desc: string; price: number };
export type MenuGroup = { title: string; items: MenuItem[] };

export const MENU: MenuGroup[] = [
  {
    title: "Cà phê",
    items: [
      { name: "Cà phê phin Mộc", desc: "Robusta – Arabica Cầu Đất pha phin truyền thống", price: 35000 },
      { name: "Bạc xỉu sữa tươi", desc: "Béo nhẹ, ngọt dịu, hậu vị cà phê rõ", price: 39000 },
      { name: "Cà phê muối", desc: "Lớp kem muối mặn nhẹ phủ trên cà phê đậm", price: 45000 },
      { name: "Latte nóng", desc: "Espresso và sữa tươi đánh nóng mịn", price: 49000 },
    ],
  },
  {
    title: "Trà & Thức uống",
    items: [
      { name: "Trà atiso Đà Lạt", desc: "Atiso tươi nấu chậm, thanh mát", price: 38000 },
      { name: "Trà đào cam sả", desc: "Đào ngâm, cam vàng và sả thơm", price: 45000 },
      { name: "Sữa nóng mật ong", desc: "Ấm bụng cho những buổi sáng se lạnh", price: 42000 },
      { name: "Sô-cô-la nóng", desc: "Cacao đậm đà, thêm kem tươi", price: 52000 },
    ],
  },
  {
    title: "Bánh & Ăn nhẹ",
    items: [
      { name: "Bánh croissant bơ", desc: "Nướng mới mỗi sáng, giòn thơm bơ", price: 42000 },
      { name: "Tiramisu Mộc", desc: "Mềm mịn, vị cà phê và cacao", price: 55000 },
      { name: "Bánh tráng nướng", desc: "Món ăn vặt đặc trưng Đà Lạt", price: 30000 },
      { name: "Sữa chua hạt dẻ", desc: "Sữa chua nhà làm, hạt dẻ rang", price: 40000 },
    ],
  },
];

export const REVIEWS = [
  { name: "Minh Anh", role: "Khách du lịch", text: "Quán yên tĩnh, ghế gỗ rất êm, ngồi cả buổi chiều mà không muốn về. Cà phê muối ngon hơn mình nghĩ!" },
  { name: "Quốc Bảo", role: "Làm việc tự do", text: "Wi-Fi ổn định, không gian ấm và thơm mùi cà phê. Mình hay đến đây làm việc vào buổi sáng." },
  { name: "Thu Hà", role: "Khách địa phương", text: "Bánh croissant nướng mới rất thơm. Nhân viên thân thiện, nhớ món quen của khách." },
];

export const HOURS = [
  { day: "Thứ Hai – Thứ Sáu", time: "07:00 – 22:00" },
  { day: "Thứ Bảy – Chủ Nhật", time: "06:30 – 23:00" },
  { day: "Ngày lễ", time: "06:30 – 23:00" },
];

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "đ";
