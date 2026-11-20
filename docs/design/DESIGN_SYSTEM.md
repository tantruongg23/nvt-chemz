# Design system – NVT ChemZ

Tài liệu này mô tả giao diện của website ôn tập Hóa 10 (Chương 1 – Cấu tạo nguyên tử). Mã nguồn tương ứng: `web/css/style.css` (token + component), `web/js/ui.js` (component dùng chung), `web/js/atom.js` (mô hình nguyên tử).

## 1. Nguyên tắc

1. **Hiện đại nhưng nghiêm túc.** Học sinh lớp 10 thấy hấp dẫn, giáo viên và giám khảo thấy tin cậy. Không dùng hình hoạt hình, không pháo giấy (confetti).
2. **Ngôn ngữ hình ảnh lấy từ hóa học.** Ô bài học/thuật ngữ trông như **ô nguyên tố trong bảng tuần hoàn**; mỗi bài có một "nhóm màu" riêng; trang chủ có **mô hình nguyên tử Bohr** chuyển động; nền là lưới mờ như giấy kẻ ô trong vở thí nghiệm.
3. **Lỗi sai là thông tin, không phải hình phạt.** Mã lỗi M1–M10 hiển thị bằng huy hiệu màu kèm cách sửa, luôn có đường dẫn "Ôn lại" và "Luyện lỗi này".
4. **AI minh bạch.** Mọi gợi ý AI có nhãn "Trợ lý AI", dòng "AI có thể sai" và nhãn "Chế độ demo" khi gợi ý là văn bản soạn sẵn.
5. **Di động trước.** Bố cục thiết kế cho màn hình 360–430 px, mở rộng dần ở 600 / 720 / 1024 px.
6. **Tiếp cận được.** Dùng được hoàn toàn bằng bàn phím, độ tương phản chữ ≥ 4.5 : 1 ở cả hai chế độ sáng/tối, tôn trọng "giảm chuyển động".

## 2. Token màu

Khai báo trên `:root`; chế độ tối áp dụng khi hệ điều hành ở chế độ tối (`prefers-color-scheme`) hoặc khi người dùng bấm nút mặt trăng/mặt trời (lưu `localStorage["nvt.theme"]`, gắn `data-theme` lên `<html>`).

| Token | Sáng | Tối | Dùng cho |
|---|---|---|---|
| `--bg` | `#F4F5FB` | `#0A0F1F` | Nền trang (kèm lưới 28 px) |
| `--surface` | `#FFFFFF` | `#121A30` | Thẻ, ô nhập |
| `--surface-2` | `#EEF0F8` | `#1A2340` | Nền phụ, vùng gợi ý |
| `--border` | `#D5DAEA` | `#2C3860` | Viền |
| `--text` | `#121833` | `#E8EBF7` | Chữ chính (≈ 17 : 1 / 15 : 1) |
| `--text-muted` | `#4A5372` | `#A7B0CC` | Chữ phụ (≈ 7.6 : 1 / 8.4 : 1) |
| `--primary` | `#4338CA` (indigo) | `#4F46E5` | Nút chính – chữ trắng ≈ 7.9 : 1 / 6.3 : 1 |
| `--link` | `#4338CA` | `#A5B4FC` | Liên kết, mục đang chọn |
| `--teal` | `#0F766E` | `#2DD4BF` | Màu phụ "khoa học": chip thuật ngữ, nhãn eyebrow, electron |
| `--accent` / `--accent-ink` | `#EA580C` / `#C2410C` | `#FB923C` / `#FDBA74` | Điểm nhấn ấm: gợi ý AI, proton, số liệu nổi bật |
| `--success` | `#15803D` | `#4ADE80` | Đúng |
| `--error` | `#B42318` | `#F87171` | Sai |
| `--warning` | `#B45309` | `#FBBF24` | Đúng một phần, "Chưa duyệt", "Demo" |

**Nhóm màu bài học** (giống nhóm nguyên tố): `--g-B1` indigo `#4F46E5`, `--g-B2` teal `#0D9488`, `--g-B3` amber `#D97706`, `--g-B4` rose `#E11D48`. Chữ đặt trên nền nhạt của nhóm dùng biến thể đậm `--g-Bx-ink` (sáng) hoặc nhạt (tối) để đạt ≥ 4.5 : 1.

**Màu mã lỗi** – mỗi mã có một sắc độ (hue) cố định, đặt qua `--h` (hàm `misHue()` trong `ui.js`):

| M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 |
|---|---|---|---|---|---|---|---|---|---|
| 245 | 200 | 172 | 140 | 88 | 42 | 22 | 0 | 325 | 280 |

Chữ huy hiệu dùng `hsl(h 70% 28%)` trên nền `hsl(h 70% 95%)` (sáng) và `hsl(h 60% 80%)` trên `hsl(h 60% 17%)` (tối) → tương phản > 6 : 1 với mọi hue.

## 3. Chữ

- Font: **Be Vietnam Pro** (Google Fonts, 400/500/600/700/800) – thiết kế cho tiếng Việt, dấu đầy đủ. Dự phòng: `system-ui, Segoe UI, Roboto`.
- Số liệu (điểm, phần trăm, đếm) dùng `font-variant-numeric: tabular-nums` (lớp `.num`).
- IPA hiển thị bằng font hệ thống có ký tự IPA (`Segoe UI`, `Lucida Sans Unicode`).

| Bậc | Kích thước | Đậm | Dùng cho |
|---|---|---|---|
| Hero | `clamp(2rem, 6vw, 3.25rem)` | 800 | Tiêu đề trang chủ |
| H1 | 1.75 rem | 800 | Tiêu đề trang |
| H2 | 1.375 rem | 750 | Tiêu đề thẻ/mục |
| H3 | 1.125 rem | 700 | Tiêu đề phụ |
| Thân | 1 rem / 1.6 | 400 | Nội dung |
| Nhỏ | 0.875 rem | 400–600 | Chú thích |
| Eyebrow | 0.75 rem, HOA, giãn 0.12 em | 700 | Nhãn phía trên tiêu đề |

## 4. Hình khối

Bo góc `8 / 12 / 18 / 26 px`; nút bo tròn hoàn toàn (pill). Bóng đổ 3 mức (`--shadow-1..3`). Vùng chạm tối thiểu 44 px (nút), 34–38 px (chip lọc).

## 5. Component

| Component | Lớp / hàm | Cách dùng |
|---|---|---|
| Header + tab bar | `mountShell(pageKey)` | Mọi trang gọi đầu tiên. ≥ 1024 px: thanh điều hướng ngang; nhỏ hơn: tab bar cố định ở đáy (5 mục). Có nhãn "Demo", mã học sinh + nút Thoát, nút đổi sáng/tối. |
| Ô nguyên tố (element tile) | `.etile`, `lessonTile()` | Bài học (B1–B4) và thuật ngữ. Số thứ tự góc trái, thông tin phụ góc phải, "ký hiệu" lớn ở giữa, tên dưới. Màu theo `data-lesson`. Hover: nhấc lên 3 px. |
| Chip thuật ngữ | `termChip(id)`, `.term-chip` | Đặt trong bài học/câu hỏi. Có nhãn "EN". Bấm → popover (từ, IPA, từ loại, nghĩa, định nghĩa, ví dụ, nút 🔊 US/UK dùng Web Speech API). Đóng bằng Esc/bấm ra ngoài, trả focus về chip. |
| Huy hiệu lỗi sai | `mbadge(code, title)` | Mã trong viên tròn đậm + tên lỗi. Dùng ở phản hồi, kết quả, dashboard. |
| Nhãn "Chưa duyệt" | `unreviewedBadge(q)` | Tự hiện khi `question.reviewed === false` (ở câu hỏi, lời giải, bảng câu khó). |
| Thang gợi ý 3 mức | `.ladder` (practice.js) | 3 bước Gợi mở → Gợi ý → Lời giải; bước sau mở khi đã dùng bước trước; mở Lời giải trước khi trả lời phải xác nhận. Luôn kèm "AI có thể sai". Ẩn ở bài kiểm tra trước/sau và lớp đối chứng. |
| Phản hồi trả lời | `.feedback--ok/part/bad` | Biểu tượng ✓/✗ tự vẽ (stroke animation), đáp án đúng, các lỗi sai kèm cách sửa và liên kết ôn tập. |
| Vi phản hồi | `.pulse-ok`, `.plus-one`, `.shake`, `.streak` | Đúng: thẻ "nảy" nhẹ + vòng sáng xanh + "+1 · chuỗi n". Sai: rung nhẹ 0,4 s. Không âm thanh, không confetti. |
| Vòng tiến độ | `ring(value, opts)` | SVG; màu theo nhóm bài; nhãn % ở giữa; có `aria-label`. |
| Mô hình nguyên tử | `mountAtom(el)` | Na, C, O, Cl, H; electron quay theo lớp K/L/M; chạm hoặc nút "Đổi" để đổi nguyên tố. |
| Thẻ ghi nhớ | `.flashcard` | Lật 3D; Space/Enter lật, ←/→ chuyển, nút xáo trộn. |
| KPI | `.kpi` | Nhãn HOA nhỏ, số lớn tabular, chú thích. |
| Biểu đồ | `hbars()`, `heatmap()` (teacher.js) | SVG/HTML thuần, không thư viện. Cột ngang có nhãn giá trị trực tiếp; bản đồ nhiệt bài × mã lỗi một sắc độ indigo. |
| Thông báo | `.notice`, `toast()` | Cảnh báo tải dữ liệu, xác nhận thao tác. |

## 6. Chuyển động

- Thời lượng 150–600 ms, đường cong `cubic-bezier(.2,.8,.2,1)`.
- Khi `prefers-reduced-motion: reduce`: tắt quay electron, tắt nảy/rung/lật (chuyển tức thì).

## 7. Quy tắc tiếp cận (accessibility)

- `<html lang="vi">`; chữ tiếng Anh có `lang="en"` để trình đọc màn hình phát âm đúng.
- Có liên kết "Bỏ qua, tới nội dung chính"; `<main id="main">`; một `h1` mỗi trang.
- Mọi nút biểu tượng có `aria-label`; focus hiển thị rõ bằng vòng 2 lớp (`--focus`).
- Đáp án trắc nghiệm là `input type=radio` thật trong `fieldset` → mũi tên/Tab hoạt động; thêm phím tắt A–D và Enter.
- Câu Đúng/Sai: mỗi ý là một `radiogroup` có nhãn.
- Kết quả, gợi ý mới hiện trong vùng `aria-live`/`role=status`.
- Biểu đồ SVG có `role="img"` + `aria-label`, mỗi cột có `<title>`; bản đồ nhiệt là `<table>` có `caption`, `th scope`.
- Không truyền đạt thông tin chỉ bằng màu: đúng/sai luôn kèm chữ và biểu tượng; huy hiệu lỗi luôn có mã chữ.

## 8. Ảnh chụp màn hình (sẽ bổ sung)

> Chụp bằng trình duyệt ở 390 × 844 (điện thoại) và 1280 × 900 (máy tính), cả sáng và tối, lưu vào `docs/design/screenshots/`.

| Màn hình | Điện thoại | Máy tính | Tối |
|---|---|---|---|
| Trang chủ (chưa đăng nhập) | ☐ | ☐ | ☐ |
| Bài học B2 + popover thuật ngữ | ☐ | ☐ | ☐ |
| Thuật ngữ – lưới & thẻ ghi nhớ | ☐ | ☐ | ☐ |
| Luyện tập – phản hồi sai + thang gợi ý | ☐ | ☐ | ☐ |
| Kết quả học sinh | ☐ | ☐ | ☐ |
| Dashboard giáo viên | ☐ | ☐ | ☐ |
