# Rà soát chuyên môn nội dung Chương 4 – Phản ứng oxi hóa – khử

> **Rà soát bởi agent AI đóng vai chuyên gia, ngày 15/11/2026 – không thay thế phê duyệt của giáo viên hướng dẫn.**
> Mọi câu vẫn giữ `reviewed: false`. Các sửa đổi dưới đây cần được ghi vào `docs/management/AI_USAGE_LOG.md` và được GV xem lại.

Phạm vi rà soát: `web/data/c4/misconceptions.json` (M27–M32), `web/data/c4/lessons.json` (B15–B16), `web/data/c4/terms.json` (T-301 – T-315), `web/data/c4/questions.json` (35 câu). Đối chiếu: SGK Hóa học 10 KNTT (Bài 15, Bài 16), yêu cầu cần đạt (YCCĐ) CT GDPT 2018 chủ đề "Phản ứng oxi hóa – khử", `docs/content/CONTENT_GUIDE.md`, `docs/CONTRACT.md` mục 3. Đã tự tính lại mọi số oxi hóa, cân bằng lại mọi phương trình (bảo toàn nguyên tố và electron, hệ số tối giản) và tính lại mọi kết quả số. Sau khi sửa: `node docs/content/validate.js web/data/c4` → **ALL CHECKS PASSED** (35 câu: mcq 21, true_false 8, short 6; NB 9 / TH 16 / VD 10 = 26% / 46% / 29%; đáp án mcq A 5 · B 5 · C 6 · D 5; 45/63 phương án nhiễu mcq có mã lỗi).

Rà soát một vòng: sửa lỗi rõ ràng và tự quyết định các điểm chuyên môn người soạn chưa chắc (mục e) theo ủy quyền của GV.

**Tổng hợp 35 câu:** Đạt 29 · Đã sửa 6 · Mới thêm 0.

---

## (b) Kết quả từng câu hỏi

| Mã câu | Kết luận | Ghi chú ngắn |
|---|---|---|
| Q-B15-001 | Đạt | N₂ = 0; +3 (hóa trị) gắn M29. |
| Q-B15-002 | Đã sửa | Đáp án đúng; lời giải ghi "Khử cho – O nhận" là **mẹo ghi nhớ** (không gán cho SGK). |
| Q-B15-003 | Đạt | Định nghĩa KNTT. |
| Q-B15-004 | Đạt | Định nghĩa KNTT; nhiễu A, B, C gắn M32 hợp lí. |
| Q-B15-005 | Đạt | MnO₄⁻: x − 8 = −1 → +7; +8, −1 (M29); +6 (MnO₄²⁻) null. |
| Q-B15-006 | Đạt | H₂O₂: O = −1. |
| Q-B15-007 | Đã sửa | Phương án B "N₂, NH₃, NO, HNO₃" **không** phải kết quả của lỗi M29 (nếu coi NH₃ là +3 thì +3 > +2 của NO, dãy vẫn không tăng) → đổi thành "N₂, NO, NH₃, HNO₃" (0 < +2 < "+3" < +5), giữ M29. Đáp án A không đổi. |
| Q-B15-008 | Đã sửa | **Trùng ví dụ trong bài B15** (Fe₂O₃ + CO, bài đã nói rõ Fe₂O₃ là chất oxi hóa) → đổi sang phản ứng nhiệt nhôm 2Al + Fe₂O₃ → Al₂O₃ + 2Fe; nhiễu A "Al" (lấy oxygen) gắn M27. Đáp án vẫn D (Fe₂O₃). |
| Q-B15-009 | Đạt | Zn/Cu²⁺; M27, M28 gắn đúng. |
| Q-B15-010 | Đạt | 2Na + Cl₂. |
| Q-B15-011 | Đạt | AgNO₃ + NaCl; CH₄: C −4 → +4 đúng. |
| Q-B15-012 | Đã sửa | MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O, đáp án 4 đúng. Nhiễu A "1" gắn M31 với lí do "quên Cl₂ có 2 nguyên tử" không dẫn tới hệ số 1 → đặt null, sửa "Lưu ý". |
| Q-B15-013 | Đạt | 2KMnO₄ + 16HCl: Cl 16 = 2 + 4 + 10; e 10 = 10; tỉ lệ 10/16 = 5/8. |
| Q-B15-014 | Đạt | Cl₂ + 2NaOH: Cl 0 → −1 và 0 → +1. |
| Q-B15-015 | Đạt | Hòa tan muối ăn là quá trình vật lí. |
| Q-B15-016 | Đã sửa | Ý c "Ion Ca²⁺ có số oxi hóa +2" → "Trong ion Ca²⁺, calcium có số oxi hóa +2" (số oxi hóa là của nguyên tử/nguyên tố). |
| Q-B15-017 | Đạt | H₂S −2; HClO₄ +7; CaH₂ H −1; CO₃²⁻ C +4. |
| Q-B15-018 | Đạt | H₂ + CuO; M27, M28 đúng. |
| Q-B15-019 | Đạt | Đúng. |
| Q-B15-020 | Đạt | 4NH₃ + 5O₂ → 4NO + 6H₂O, tổng 19; O₂ nhận 4e. |
| Q-B15-021 | Đã sửa | Ý d "không phải oxi hóa – khử vì chỉ có một chất tham gia" là **phủ định trực tiếp của ý b** (b đúng ⇒ d sai) → thay bằng "Khi tạo 1 phân tử O₂ có 4 e được chuyển" (Sai – 2 e; 4 e là kết quả của gán O = −2 trong H₂O₂, M30). Vẫn 2 đúng / 2 sai. |
| Q-B15-022 | Đạt | Al₂O₃: +3; gợi ý 6, 2 (M29). |
| Q-B15-023 | Đạt | K₂Cr₂O₇: 2 + 2x − 14 = 0 → +6; gợi ý 12, 7 đúng là kết quả lỗi. |
| Q-B15-024 | Đã sửa | Đáp án 6 đúng; thêm "(Nhập số nguyên.)" vào đề. |
| Q-B15-025 | Đạt | 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O, tổng 20; gợi ý 11 đúng (xem sửa M31 ở mục c). |
| Q-B16-001 | Đạt | Chất oxi hóa = chất bị khử. |
| Q-B16-002 | Đạt | Nguyên tắc thăng bằng electron. |
| Q-B16-003 | Đạt | FeCl₂ chất khử; D gắn M28 đúng. |
| Q-B16-004 | Đạt | SO₂ + 2H₂S → 3S + 2H₂O; SO₂ chất oxi hóa. |
| Q-B16-005 | Đạt | 2Al + 6H₂SO₄ → Al₂(SO₄)₃ + 3SO₂ + 6H₂O (O 24 = 12 + 6 + 6). |
| Q-B16-006 | Đạt | n(e) = 0,3 → n(Cl₂) = 0,15; khớp PTHH 2Al + 3Cl₂. |
| Q-B16-007 | Đạt | Ý nghĩa thực tiễn đúng KNTT. |
| Q-B16-008 | Đạt | 2KMnO₄ → K₂MnO₄ + MnO₂ + O₂: Mn nhận 1 + 3 = 4e, O nhường 4e; Mn trong K₂MnO₄ = +6. |
| Q-B16-009 | Đạt | NH₄⁺: −3; gợi ý −4, −5, 3 đúng là kết quả lỗi. |
| Q-B16-010 | Đạt | 4Mg + 10HNO₃ → 4Mg(NO₃)₂ + N₂O + 5H₂O; gợi ý 6 (quên N₂O có 2 N, không kiểm tra O) hợp lí. |

---

## (c) Danh mục lỗi sai, bài học, thuật ngữ

### Danh mục M27–M32

| Mã | Kết luận | Ghi chú |
|---|---|---|
| M27 | Đã sửa | Đúng bản chất; remedy ghi "khử cho – O nhận" là mẹo ghi nhớ, không phải câu trong SGK. |
| M28 | Đạt | Đúng. |
| M29 | Đạt | Đúng (tổng = điện tích ion, nhân chỉ số, nhầm hóa trị). |
| M30 | Đạt | Đúng (hydride kim loại, peroxide, đơn chất). |
| M31 | Đã sửa | Ví dụ Cu + HNO₃ **trùng đáp án Q-B15-025** → đổi sang Al + 4HNO₃ → Al(NO₃)₃ + NO + 2H₂O (N 4 = 3 + 1; O 12 = 9 + 1 + 2). |
| M32 | Đã sửa | Remedy "(khác dạng thù hình)" khó hiểu → "(trừ phản ứng chỉ chuyển đổi dạng thù hình như 3O₂ → 2O₃)". |

Không thiếu lỗi quan trọng của chủ đề; không có hai mã trùng bản chất. M27 (vai trò chất) và M28 (tên quá trình) tách riêng là hợp lí.

### Bài học

| Bài | Kết luận | Ghi chú |
|---|---|---|
| B15 | Đã sửa | Định nghĩa số oxi hóa, chất oxi hóa/khử, quá trình, phản ứng oxi hóa – khử, 4 bước thăng bằng electron (ví dụ Fe₂O₃ + CO) đúng KNTT. Sửa: (1) "Khử cho – O nhận" ghi rõ là mẹo ghi nhớ; (2) quy tắc "có đơn chất → oxi hóa – khử" thêm ngoại lệ thù hình (3O₂ → 2O₃); (3) mục "Chú ý" nói HCl là "chất oxi hóa" → sửa: HNO₃, H₂SO₄ đặc là chất oxi hóa, HCl là chất khử, đều kiêm môi trường; (4) "CO khử Fe₂O₃ thành gang" → "thành iron (sản xuất gang)"; (5) key_formulas: bỏ dạng tổng quát X⁰ → X⁺ⁿ (gợi ý sai rằng luôn xuất phát từ 0), thay bằng ví dụ Fe⁰ → Fe⁺² + 2e và Cl₂⁰ + 2e → 2Cl⁻¹. |
| B16 | Đã sửa | Bảng hệ thống, bảng bẫy lỗi đúng; dạng 3 ghi "dựa vào sự tăng/giảm số oxi hóa (mẹo ghi nhớ …)". |

Worked examples (B15: Na₂SO₃/PO₄³⁻/Na₂O₂; 2H₂S + 3O₂; Cu + 2H₂SO₄ đặc – B16: C + 4HNO₃ tổng 12; 2,4 g Mg → 0,2 mol e, 0,05 mol O₂) đều đã tính lại, đúng, không trùng câu luyện tập. quick_check (Q-B15-001, 002, 008; Q-B16-001, 002, 003) đúng. Objectives khớp YCCĐ CT 2018.

### Thuật ngữ (T-301 – T-315)

| Nhóm | Kết luận | Ghi chú |
|---|---|---|
| T-301 – T-304 | Đạt | oxidation /ˌɒk.sɪˈdeɪ.ʃən/, reduction /rɪˈdʌk.ʃən/, redox /ˈriː.dɒks/ đúng UK. |
| T-305 – T-309 | Đạt | Chính tả Anh – Anh (oxidising, oxidise) nhất quán; reduce /rɪˈdʒuːs/. |
| T-310 – T-315 | Đạt | coefficient /ˌkəʊ.ɪˈfɪʃ.ənt/, peroxide /pəˈrɒk.saɪd/, hydride /ˈhaɪ.draɪd/, combustion /kəmˈbʌs.tʃən/ đúng. |

Không sửa `terms.json`.

---

## (d) Danh sách sửa đã làm

| # | Vị trí | Trước | Sau | Lí do |
|---|---|---|---|---|
| 1 | Q-B15-007 B, lời giải | N₂, NH₃, NO, HNO₃ | N₂, NO, NH₃, HNO₃ | Nhiễu phải là kết quả của lỗi M29. |
| 2 | Q-B15-008 | Fe₂O₃ + 3CO (trùng ví dụ B15) | 2Al + Fe₂O₃ → Al₂O₃ + 2Fe; A "Al" (M27), B "Al₂O₃" | Câu luyện tập không trùng ví dụ đã giải. |
| 3 | Q-B15-012 A, lời giải | "1" – M31 | null; "Lưu ý" mới | Lí do gắn mã không dẫn tới kết quả 1. |
| 4 | Q-B15-016 c | Ion Ca²⁺ có số oxi hóa +2 | Trong ion Ca²⁺, calcium có số oxi hóa +2 | Chính xác thuật ngữ. |
| 5 | Q-B15-021 d, lời giải | "không phải oxi hóa – khử vì chỉ có một chất" (M32) | "tạo 1 O₂ chuyển 4 e" – Sai (M30) | Bỏ ý phụ thuộc logic vào ý b. |
| 6 | Q-B15-024 đề | — | thêm "(Nhập số nguyên.)" | Quy ước câu trả lời ngắn. |
| 7 | Q-B15-002 lời giải | "Khử cho – O nhận" | "mẹo ghi nhớ …" | Không gán cho SGK. |
| 8 | B15 mục 2 | "Ghi nhớ: …"; quy tắc đơn chất | "Mẹo ghi nhớ (không phải câu trong SGK)"; thêm ngoại lệ 3O₂ → 2O₃ | Xem mục e. |
| 9 | B15 mục 3 "Chú ý" | "vừa là chất oxi hóa vừa là môi trường (HNO₃, H₂SO₄ đặc, HCl)" | tách: HNO₃, H₂SO₄ đặc là chất oxi hóa; HCl là chất khử | HCl trong MnO₂ + HCl là chất khử. |
| 10 | B15 mục 4 | "khử … thành gang" | "thành iron (sản xuất gang)" | Chính xác. |
| 11 | B15 key_formulas | "Khử cho"/"O nhận"; X⁰ → X⁺ⁿ + ne | tách mẹo thành dòng riêng; ví dụ cụ thể | Không gán cho SGK; tránh khái quát sai. |
| 12 | B16 mục 1, dạng 3 | "Khử cho – O nhận" | "dựa vào sự tăng/giảm số oxi hóa (mẹo ghi nhớ …)" | Như trên. |
| 13 | M27 remedy | "Nhớ cặp …" | "Mẹo ghi nhớ … (không phải câu trong SGK)" | Như trên. |
| 14 | M31 ví dụ | Cu + HNO₃ (trùng đáp án Q-B15-025) | Al + 4HNO₃ → Al(NO₃)₃ + NO + 2H₂O | Không lộ đáp án câu luyện tập. |
| 15 | M32 remedy | "(khác dạng thù hình)" | "(trừ … 3O₂ → 2O₃)" | Rõ nghĩa. |

Không đổi `id`, không đổi `reviewed`, không sửa `terms.json`.

---

## (e) Quyết định của chuyên gia (đã áp dụng – GV có thể đổi lại)

| # | Vấn đề | Quyết định đã áp dụng | Nếu GV muốn đổi lại |
|---|---|---|---|
| 1 | Cách SGK ghi ngoại lệ OF₂ và peroxide | SGK KNTT nêu O thường là −2, **trừ** hợp chất với fluorine (OF₂) và peroxide (H₂O₂…); H thường +1 trừ hydride kim loại. **Giữ** nguyên các giá trị O = −1 (peroxide), O = +2 (OF₂), H = −1 (NaH, CaH₂) vì đều suy ra được từ quy tắc tổng. Câu hỏi chỉ kiểm tra peroxide và hydride kim loại, **không ra câu về OF₂**. | Bỏ giá trị "+2" của OF₂, chỉ nêu tên ngoại lệ. |
| 2 | "Khử cho – O nhận" | Không phải câu trong SGK KNTT → giữ như **mẹo ghi nhớ**, ghi rõ "không phải câu trong SGK" ở B15, key_formulas, B16, M27, Q-B15-002. | Xóa mẹo nếu GV không muốn dùng. |
| 3 | Phản ứng HNO₃, H₂SO₄ đặc, Cl₂ + NaOH, KMnO₄ + HCl, nhiệt phân KMnO₄ | **Giữ.** SGK/SBT Hóa 10 KNTT Bài 15 có các dạng tương tự (Cu/Al/Mg + HNO₃, kim loại + H₂SO₄ đặc, MnO₂/KMnO₄ + HCl, Cl₂ + NaOH, nhiệt phân KMnO₄/KClO₃). Mọi đề đều **cho sẵn sơ đồ đầy đủ sản phẩm**, HS chỉ cần số oxi hóa và thăng bằng electron, không cần biết tính chất của acid/halogen (học ở Chương 7, lớp 11). | Thay bằng phản ứng quen thuộc hơn (NH₃ + O₂, H₂S + O₂, Fe₂O₃ + CO, CuO + H₂). |
| 4 | Bài tính theo bảo toàn electron ở B16 | **Giữ ở mức đơn giản**: một chất khử, một chất oxi hóa, kết quả kiểm tra được bằng PTHH (B16 ví dụ 2 Mg + O₂; Q-B16-006 Al + Cl₂). Không ra bài hỗn hợp nhiều kim loại/nhiều sản phẩm khử. Đây là mở rộng nhẹ của YCCĐ "cân bằng bằng thăng bằng electron". | Xóa Q-B16-006 và ví dụ 2 B16, hoặc yêu cầu giải bằng PTHH. |
| 5 | Quy tắc "có đơn chất → oxi hóa – khử" | Giữ như dấu hiệu nhận biết nhanh, thêm ngoại lệ chuyển dạng thù hình (3O₂ → 2O₃); không ra câu về ngoại lệ này. | Bỏ ngoại lệ nếu GV thấy vượt mức. |
| 6 | Q-B15-008 trùng ví dụ bài học | Thay bằng phản ứng nhiệt nhôm (đáp án vẫn D). | Giữ câu cũ và đổi ví dụ ở mục 3 B15. |
| 7 | Q-B15-021 d | Thay ý phụ thuộc logic bằng ý đếm electron (M30). Mất một lượt gắn M32 – M32 vẫn có 19 lượt. | Khôi phục ý cũ. |

---

## (f) Nhận xét chung về ngân hàng câu hỏi

- **Độ chính xác:** tốt. Không câu nào sai đáp án; mọi số oxi hóa và mọi phương trình đã được cân bằng lại (nguyên tố + electron, hệ số tối giản). Lỗi đáng kể nhất: một nhiễu không phải kết quả của lỗi được gắn (Q-B15-007 B, Q-B15-012 A), một câu trùng ví dụ bài học (Q-B15-008), một ý đúng/sai phụ thuộc logic vào ý khác (Q-B15-021).
- **Gắn mã lỗi:** 45/63 nhiễu mcq có mã; nhiễu null còn lại là nhiễu loại trừ (sản phẩm, số oxi hóa của chất khác) – hợp lí. Gợi ý `short` đúng là kết quả của lỗi.
- **Mức độ:** NB 26% / TH 46% / VD 29% – sát đích 25/45/30.
- **Phạm vi:** chỉ dùng kiến thức Chương 1–4; các phản ứng của acid/halogen đều cho sẵn sơ đồ (xem mục e-3).
- **Độ phủ:** đủ 2 bài, 3 dạng, M27–M32 (M28 và M30 ít nhất: 6 lượt). Gợi ý bổ sung sau: 1 câu NB về ý nghĩa (pin, ắc quy), 1 câu ngắn về số oxi hóa trong ion đa nguyên tử khác (Cr₂O₇²⁻).
- **Ngôn ngữ, thuật ngữ:** IUPAC (manganese, chromium, aluminium, sulfur, iron(III) oxide…), Unicode, IPA Anh – Anh thống nhất. Toàn bộ 8 câu đúng/sai đều 2 đúng – 2 sai; có thể đa dạng 1–3 ở lần soạn sau.

**Việc còn lại cho HS/GV:** ghi nhật ký AI; GV duyệt các câu đã sửa và các quyết định ở mục (e); cập nhật bảng "cách tạo phương án nhiễu" (CONTENT_GUIDE mục 4) cho M27–M32 khi chốt.
