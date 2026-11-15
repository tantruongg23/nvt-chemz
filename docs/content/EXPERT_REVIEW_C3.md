# Rà soát chuyên môn nội dung Chương 3 – Liên kết hóa học

> **Rà soát bởi agent AI đóng vai chuyên gia, ngày 15/11/2026 – không thay thế phê duyệt của giáo viên hướng dẫn.**
> Mọi câu vẫn giữ `reviewed: false`. Các sửa đổi dưới đây cần được ghi vào `docs/management/AI_USAGE_LOG.md` và được GV xem lại.

Phạm vi rà soát: `web/data/c3/misconceptions.json` (M19–M26), `web/data/c3/lessons.json` (B10–B14), `web/data/c3/terms.json` (T-201 – T-225), `web/data/c3/questions.json` (50 câu). Đối chiếu: SGK Hóa học 10 KNTT (Bài 10–14), yêu cầu cần đạt (YCCĐ) CT GDPT 2018 chủ đề "Liên kết hóa học", `docs/content/CONTENT_GUIDE.md`, `docs/CONTRACT.md` mục 3. Đã đếm lại độc lập mọi electron hóa trị, cặp electron không liên kết, số liên kết σ/π và tính lại mọi hiệu độ âm điện Δχ (thang Pauling). Sau khi sửa: `node docs/content/validate.js web/data/c3` → **ALL CHECKS PASSED** (50 câu: mcq 30, true_false 11, short 9; NB 13 / TH 22 / VD 15 = 26% / 44% / 30%; đáp án mcq A 8 · B 8 · C 7 · D 7; 63/90 phương án nhiễu mcq có mã lỗi).

Rà soát một vòng: sửa lỗi rõ ràng và tự quyết định các điểm chuyên môn người soạn chưa chắc (mục e) theo ủy quyền của GV.

**Tổng hợp 50 câu:** Đạt 42 · Đã sửa 8 · Mới thêm 0.

---

## (b) Kết quả từng câu hỏi

| Mã câu | Kết luận | Ghi chú ngắn |
|---|---|---|
| Q-B10-001 | Đạt | Đúng định nghĩa quy tắc octet KNTT. |
| Q-B10-002 | Đạt | Na nhường 1 e; nhiễu Cl, O, F gắn M19 hợp lí. |
| Q-B10-003 | Đạt | Mg nhường 2 e; Mg⁺ (M20), nhận 6/2 e (M19). |
| Q-B10-004 | Đạt | Cl có 7 e hóa trị; 17 (tính cả e lớp trong) đúng bản chất M23. |
| Q-B10-005 | Đạt | X²⁺ có 10 e → Z = 12. Bài toán ngược nên VD hợp lí. |
| Q-B10-006 | Đạt | 2 đúng / 2 sai, rõ ràng. |
| Q-B10-007 | Đạt | Na⁺, F⁻, O²⁻ 10 e; F⁻ 1s²2s²2p⁶. |
| Q-B10-008 | Đã sửa | Thêm gợi ý "2" (N nhường hết 5 e → 7 − 5 = 2 e) gắn M19. |
| Q-B11-001 | Đạt | Định nghĩa KNTT. |
| Q-B11-002 | Đạt | NH₄⁺ – ion đa nguyên tử dương. |
| Q-B11-003 | Đạt | Đúng. |
| Q-B11-004 | Đạt | Mg²⁺ 1s²2s²2p⁶. |
| Q-B11-005 | Đạt | Na⁻/Cl⁺ (M19), góp chung (M21), Cl²⁻ (M20). |
| Q-B11-006 | Đạt | Ca + F → CaF₂, ion. |
| Q-B11-007 | Đạt | NaCl: 6 ion trái dấu bao quanh; rắn không dẫn điện. |
| Q-B11-008 | Đạt | Đúng. |
| Q-B11-009 | Đã sửa | Thêm gợi ý "3" (lấy số e lớp ngoài cùng của nguyên tử Al) gắn M20. |
| Q-B11-010 | Đạt | Na⁺, Mg²⁺, O²⁻, F⁻, Al³⁺ → 5 (Cl⁻, K⁺, S²⁻ có 18 e). |
| Q-B12-001 | Đạt | Định nghĩa KNTT. |
| Q-B12-002 | Đạt | Ba = 1σ + 2π. |
| Q-B12-003 | Đạt | Nhiễu A (xen phủ bên → σ) gắn M24 – nay khớp mô tả M24 đã mở rộng. |
| Q-B12-004 | Đạt | Δχ: HCl 0,96; N–H 0,84; KCl 2,34; N₂ 0 → D. |
| Q-B12-005 | Đạt | 1,55 → phân cực; 4,77 (tổng) M22. |
| Q-B12-006 | Đạt | NH₃: 8 e, 3 cặp chung + 1 cặp riêng. |
| Q-B12-007 | Đã sửa | Phương án A (xếp NaCl, Δχ = 2,23, vào CHT phân cực) null → M22; thêm "Lưu ý". Đáp án B duy nhất. |
| Q-B12-008 | Đạt | H–C≡N: 10 e hóa trị, 2σ, 2π, 1 cặp riêng trên N. |
| Q-B12-009 | Đạt | Cl₂, O₂, HCl đếm đúng. |
| Q-B12-010 | Đã sửa | Ý b dựa vào ranh giới H–S (Δχ = 0,38 sát 0,4) → thay bằng N–Cl trong NCl₃ (Δχ = 0,12, không phân cực; bẫy "hai phi kim khác nhau"). Bỏ S khỏi dữ kiện. |
| Q-B12-011 | Đạt | Ethylene 5σ, 1π; π kém bền hơn σ. |
| Q-B12-012 | Đạt | 1,55; tolerance 0,01 không nuốt gợi ý 4,77. |
| Q-B12-013 | Đạt | CO₂: 8 cặp − 4 cặp chung = 4; gợi ý 6 (khung đơn O–C–O: 16 − 4 = 12 e = 6 cặp) đúng. |
| Q-B12-014 | Đạt | Ethylene 5σ; gợi ý 6, 4 đúng M24. |
| Q-B13-001 | Đạt | Đúng định nghĩa KNTT. |
| Q-B13-002 | Đạt | Đúng. |
| Q-B13-003 | Đạt | NH₃. |
| Q-B13-004 | Đạt | H₂O/H₂S; B gắn M25 (cho rằng sôi phá O–H) đúng bản chất. |
| Q-B13-005 | Đạt | Ethanol tạo liên kết hydrogen với nước. |
| Q-B13-006 | Đã sửa | **Trùng nguyên văn ví dụ mẫu của bài B13** (CH₄, H₂S, H₂O, tăng dần) → đổi sang HF (20), HCl (36,5), HBr (81): HCl < HBr < HF (−85 < −67 < 20 °C); nhiễu A, D gắn M26. Đáp án vẫn B. |
| Q-B13-007 | Đạt | Đúng. |
| Q-B13-008 | Đạt | NH₃/PH₃; halogen F₂ → I₂. |
| Q-B13-009 | Đạt | 4 (2 qua H + 2 qua cặp riêng của O). |
| Q-B13-010 | Đạt | H₂O, NH₃, HF, C₂H₅OH → 4. |
| Q-B14-001 | Đạt | KCl. |
| Q-B14-002 | Đạt | Acetylene 3σ, 2π. |
| Q-B14-003 | Đã sửa | Phương án A: "X²⁺, Y⁻ … hợp chất là YX₂" không nhất quán với chính các ion trong phương án → "XY₂" (vẫn sai, vẫn M19). |
| Q-B14-004 | Đạt | N₂: 10 e, mỗi N 1 cặp riêng; nhiễu 6/12/14 e (M23). |
| Q-B14-005 | Đạt | Đúng. |
| Q-B14-006 | Đạt | Đúng. |
| Q-B14-007 | Đạt | H₂O 2σ, 2 cặp riêng; M25, M26 đúng. |
| Q-B14-008 | Đã sửa | Đáp án 4 đúng (NaCl 2,23; MgO 2,13; CaF₂ 2,98; KBr 2,14). Lời giải gợi ý 6 ghi "thêm H₂O" → "thêm AlCl₃ và H₂O" (Δχ > 1 gồm 6 chất). |

---

## (c) Danh mục lỗi sai, bài học, thuật ngữ

### Danh mục M19–M26

| Mã | Kết luận | Ghi chú |
|---|---|---|
| M19 | Đạt | Đúng. Chồng lấn một phần với M9 (C1, "nhầm chiều thêm/bớt e khi tạo ion") – chấp nhận: M19 dùng trong ngữ cảnh liên kết, M9 trong ngữ cảnh số hạt. |
| M20 | Đạt | Đúng; bao cả "ion có tổng 8 e" và công thức hợp chất ion. |
| M21 | Đạt | Đúng (bản chất ion, tinh thể, dẫn điện). |
| M22 | Đạt | Ngưỡng 0,4 / 1,7 đúng KNTT; Al–Cl 1,55 đúng. |
| M23 | Đạt | Quy trình 4 bước Lewis đúng. |
| M24 | Đã sửa | Mở rộng tên/mô tả: thêm "nhầm cách hình thành σ (xen phủ trục) và π (xen phủ bên)" – khớp cách gắn mã ở Q-B12-003. |
| M25 | Đạt | Đúng; HCl, H₂S không tạo liên kết hydrogen theo SGK. |
| M26 | Đạt | Số liệu H₂O 100 °C, H₂S ≈ −60 °C đúng. |

Không thiếu lỗi quan trọng của chủ đề; không có hai mã trùng bản chất trong C3. Lỗi "nhầm van der Waals với liên kết hydrogen" hiện đi kèm M25/M26 – chưa cần mã riêng.

### Bài học

| Bài | Kết luận | Ghi chú |
|---|---|---|
| B10 | Đạt | Đúng KNTT. Mục "Hạn chế" (BF₃, PCl₅) là mở rộng nhẹ, chấp nhận. |
| B11 | Đạt | Ion đơn/đa nguyên tử, tinh thể NaCl, tính chất hợp chất ion đúng YCCĐ. |
| B12 | Đã sửa | Thêm định nghĩa **công thức electron** (YCCĐ có nêu nhưng bài chưa giải thích); ghi chú CH₄ (0,35) và S–H (0,38) là sát ngưỡng, chỉ xếp theo quy ước; số liệu Eb ghi "có thể chênh 1–2 kJ/mol tùy tài liệu". |
| B13 | Đạt | Đúng KNTT (liên kết hydrogen, nước đá, van der Waals, halogen). |
| B14 | Đã sửa | Bảng hệ thống: ví dụ CHT không phân cực "CH₄" (sát ngưỡng) → "O₂". |

Worked examples và quick_check (15 mã) đều đúng; objectives khớp YCCĐ CT 2018.

### Thuật ngữ (T-201 – T-225)

| Nhóm | Kết luận | Ghi chú |
|---|---|---|
| B10: T-201 – T-203 | Đạt | Định nghĩa đúng SGK; IPA UK đúng (octet /ɒkˈtet/). |
| B11: T-204 – T-208 | Đạt | Đúng. |
| B12: T-209 – T-221 | Đạt | Đúng; electronegativity /ɪˌlek.trəʊˌneɡ.əˈtɪv.ə.ti/. |
| B13: T-222 – T-225 | Đạt | van der Waals /ˌvæn də ˈwɑːlz/ – giữ (xem mục e). |

---

## (d) Danh sách sửa đã làm

| # | Vị trí | Trước | Sau | Lí do |
|---|---|---|---|---|
| 1 | Q-B10-008 `misconception_hints` | 4 (M19), 8 (M20) | thêm 2 (M19) + "Lưu ý" | Kết quả đặc trưng khi N nhường hết 5 e. |
| 2 | Q-B11-009 `misconception_hints` | 0 (M20), 6 (M19) | thêm 3 (M20) + "Lưu ý" | Lấy cấu hình nguyên tử thay cho ion. |
| 3 | Q-B12-007 A | null | M22 + "Lưu ý" | Chọn A = xếp NaCl vào CHT phân cực, áp sai ngưỡng. |
| 4 | Q-B12-010 b, đề | H–S trong H₂S không phân cực (Δχ = 0,38) | N–Cl trong NCl₃ không phân cực (Δχ = 0,12); bỏ "S 2,58" | Tránh đáp án phụ thuộc ranh giới sát ngưỡng. |
| 5 | Q-B13-006 | CH₄, H₂O, H₂S (trùng ví dụ mẫu B13) | HF, HCl, HBr; đáp án B "HCl < HBr < HF" | Câu luyện tập không được trùng ví dụ đã giải. |
| 6 | Q-B14-003 A | "hợp chất là YX₂" | "hợp chất là XY₂" | Nhất quán với X²⁺, Y⁻ trong cùng phương án. |
| 7 | Q-B14-008 lời giải | "(thêm H₂O)" | "(thêm AlCl₃ và H₂O)" | Δχ > 1 gồm 6 chất. |
| 8 | M24 title, description | Chỉ đếm σ/π và độ bền | Thêm nhầm xen phủ trục/bên | Khớp tag Q-B12-003 A. |
| 9 | B12 "Công thức Lewis" | — | Thêm đoạn công thức electron | YCCĐ. |
| 10 | B12 "…hiệu độ âm điện" | "CH₄: C–H 0,35 → không phân cực." | thêm "(sát ngưỡng 0,4, chỉ xếp theo quy ước)" và câu về S–H 0,38 | Minh bạch quy ước. |
| 11 | B12 "Liên kết σ, π…" | "(số liệu tham khảo)" | "(số liệu tham khảo, có thể chênh 1–2 kJ/mol tùy tài liệu)" | Xem mục e. |
| 12 | B14 bảng hệ thống | "H₂, Cl₂, N₂, CH₄" | "H₂, Cl₂, N₂, O₂" | Tránh ví dụ sát ngưỡng. |

Không đổi `id`, không đổi `reviewed`, không sửa `terms.json`.

---

## (e) Quyết định của chuyên gia (đã áp dụng – GV có thể đổi lại)

| # | Vấn đề | Quyết định đã áp dụng | Nếu GV muốn đổi lại |
|---|---|---|---|
| 1 | SGK KNTT 10 có dạy liên kết cho – nhận (NH₄⁺)? | KNTT Bài 12 có giới thiệu ngắn liên kết cho – nhận với ví dụ NH₄⁺; YCCĐ CT 2018 không yêu cầu riêng. **Giữ** đoạn giới thiệu trong B12 ở mức "biết", **không ra câu hỏi** về cho – nhận. | Xóa đoạn trong B12 nếu GV thấy thừa; hoặc thêm 1 câu NB. |
| 2 | Số liệu Eb H–Cl 431, N≡N 945 kJ/mol | Giữ (khớp bảng năng lượng liên kết dùng ở KNTT, Chương 5); một số tài liệu ghi 432/946. Ghi "có thể chênh 1–2 kJ/mol"; **không câu nào tính toán bằng các số này**. | Sửa theo đúng số trong bảng SGK GV đang dùng. |
| 3 | HCl, H₂S có liên kết hydrogen? | Coi **không** (theo SGK: chỉ xét H gắn F, O, N). Giữ Q-B13-003, Q-B13-010, Q-B13-006 mới (HCl, HBr) dựa trên quy ước này. | Nếu GV muốn nói "HCl có liên kết hydrogen rất yếu", bỏ HCl khỏi các câu đếm. |
| 4 | H₂S (Δχ = 0,38) xếp không phân cực theo ngưỡng 0,4 | Trong bài học: giữ quy ước nhưng ghi rõ "sát ngưỡng, chỉ mang tính quy ước" (cùng C–H 0,35). Trong câu hỏi: **không để đáp án nào phụ thuộc trường hợp sát ngưỡng** → sửa Q-B12-010 b. Các câu còn nhắc CH₄ (Q-B12-007 C, Q-B14-001) có đáp án không phụ thuộc CH₄. | Khôi phục ý H₂S ở Q-B12-010 b. |
| 5 | Dùng C₂H₄, C₂H₂, HCN | Giữ: đề đều **cho sẵn công thức cấu tạo**, chỉ yêu cầu đếm σ/π và cặp e – không cần kiến thức hữu cơ hay lai hóa. Dùng tên IUPAC ethylene/acetylene như KNTT; hydrogen cyanide. | Thay bằng CO₂, N₂, O₂ nếu GV muốn chỉ dùng phân tử vô cơ. |
| 6 | IPA "van der Waals" | Giữ /ˌvæn də ˈwɑːlz ˌfɔːs/ (cách đọc Anh – Anh phổ biến trong từ điển Oxford; Cambridge không có mục riêng). Biến thể chấp nhận: /ˈwɔːlz/, /ˈvɑːls/ (gần tiếng Hà Lan). | Đổi sang biến thể khác. |
| 7 | Lỗi nhầm cơ chế σ/π chưa có mã | Gộp vào **M24** (mở rộng mô tả). | Đặt null cho Q-B12-003 A và giữ M24 cũ. |
| 8 | Q-B13-006 trùng ví dụ mẫu | Thay bằng bộ HF/HCl/HBr (đáp án vẫn B). | Giữ câu cũ và đổi ví dụ mẫu của B13. |

---

## (f) Nhận xét chung về ngân hàng câu hỏi

- **Độ chính xác:** tốt. Không câu nào sai đáp án; mọi phép đếm electron, σ/π và Δχ đã kiểm lại. Lỗi đáng kể nhất là Q-B13-006 trùng nguyên văn ví dụ mẫu và một ý đúng/sai dựa vào ranh giới Δχ sát ngưỡng.
- **Gắn mã lỗi:** 63/90 phương án nhiễu mcq có mã; các nhiễu null còn lại là nhiễu "loại trừ" không ứng với lỗi trong danh mục – hợp lí. Gợi ý `short` nay đủ các kết quả sai đặc trưng.
- **Mức độ:** NB 26% / TH 44% / VD 30% – sát đích 25/45/30.
- **Phạm vi:** chỉ dùng kiến thức Chương 1–3; không dùng lai hóa, hình học phân tử, độ phân cực phân tử, số oxi hóa.
- **Độ phủ:** đủ 5 bài, 3 dạng, M19–M26. Gợi ý bổ sung sau: 1 câu về năng lượng liên kết có số liệu (so sánh độ bền H–X), 1 câu chọn công thức electron đúng.
- **Ngôn ngữ, thuật ngữ:** IUPAC (sodium, magnesium, aluminium, sulfur…), Unicode, IPA Anh – Anh thống nhất. Toàn bộ 11 câu đúng/sai đều 2 đúng – 2 sai; có thể đa dạng 1–3 ở lần soạn sau.

**Việc còn lại cho HS/GV:** ghi nhật ký AI; GV duyệt các câu đã sửa và các quyết định ở mục (e); cập nhật bảng "cách tạo phương án nhiễu" (CONTENT_GUIDE mục 4) cho M19–M26 khi chốt.
