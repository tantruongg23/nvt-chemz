# Rà soát chuyên môn nội dung Chương 7 – Nguyên tố nhóm VIIA

> **Rà soát bởi agent AI đóng vai chuyên gia, ngày 15/11/2026 – không thay thế phê duyệt của giáo viên hướng dẫn.**
> Mọi câu vẫn giữ `reviewed: false`. Các sửa đổi dưới đây cần được ghi vào `docs/management/AI_USAGE_LOG.md` và được GV xem lại.

Phạm vi rà soát: `web/data/c7/misconceptions.json` (M43–M48), `web/data/c7/lessons.json` (B21–B23), `web/data/c7/terms.json` (T-601 – T-620), `web/data/c7/questions.json` (40 câu). Đối chiếu: SGK Hóa học 10 KNTT (Bài 21–23), yêu cầu cần đạt (YCCĐ) CT GDPT 2018 chủ đề "Nguyên tố nhóm VIIA", `docs/content/CONTENT_GUIDE.md`, `docs/CONTRACT.md` mục 3; độ âm điện đối chiếu `web/data/c2`, `web/data/c3` (F 3,98; Cl 3,16; Br 2,96 – khớp), năng lượng liên kết đối chiếu `web/data/c3`, `web/data/c5` (H–F 565; H–Cl 431; H–Br 364 – khớp). Đã tự cân bằng lại mọi phương trình (kể cả theo bảo toàn electron: NaBr/H₂SO₄ 2e; NaI/H₂SO₄ 8e; KMnO₄/HCl 10e; Cl₂/NaOH nóng 5e), tính lại mọi số mol, khối lượng, thể tích (V = n × 24,79 L). Sau khi sửa: `node docs/content/validate.js web/data/c7` → **ALL CHECKS PASSED** (40 câu: mcq 24, true_false 9, short 7; NB 10 / TH 19 / VD 11 = 25% / 47,5% / 27,5%; đáp án mcq A 6 · B 6 · C 6 · D 6; 38/72 phương án nhiễu mcq có mã lỗi).

Rà soát một vòng: sửa lỗi rõ ràng và tự quyết định các điểm chuyên môn người soạn chưa chắc (mục e) theo ủy quyền của GV.

**Tổng hợp 40 câu:** Đạt 35 · Đã sửa 5 · Mới thêm 0.

---

## (b) Kết quả từng câu hỏi

| Mã câu | Kết luận | Ghi chú ngắn |
|---|---|---|
| Q-B21-001 | Đạt | Br₂ lỏng nâu đỏ; nhiễu M48 hợp lí. |
| Q-B21-002 | Đạt | Halogen chỉ tồn tại dạng hợp chất; NaCl. |
| Q-B21-003 | Đạt | F₂ > Cl₂ > Br₂ > I₂; B đảo chiều (M43). |
| Q-B21-004 | Đạt | F chỉ −1 (M45 cho các số dương). |
| Q-B21-005 | Đạt | Chỉ Cl₂ + 2NaBr xảy ra; A, B, D ngược chiều (M43). |
| Q-B21-006 | Đã sửa | **Trùng gần nguyên văn ví dụ mẫu 1(c) của B21** (Cl₂ + NaOH) → đổi sang Cl₂ + 2KOH → KCl + KClO + H₂O (chuyển giao tương tự). Đáp án vẫn A. |
| Q-B21-007 | Đạt | 2Fe + 3Cl₂ → 2FeCl₃. |
| Q-B21-008 | Đạt | PTN: HCl đặc + MnO₂/KMnO₄ (xem mục e #4). |
| Q-B21-009 | Đạt | Cl₂ + 2KI → I₂, hồ tinh bột xanh tím. |
| Q-B21-010 | Đạt | 1 Cl (+5) chất khử : 5 Cl (−1) chất oxi hóa = 1 : 5. |
| Q-B21-011 | Đạt | 2 đúng / 2 sai; van der Waals đúng YCCĐ. |
| Q-B21-012 | Đạt | Đúng. |
| Q-B21-013 | Đã sửa | Mức VD nhưng 4 ý chỉ ở mức nhớ/hiểu; ý d (NaClO: Cl −1, M45) trùng ý b. Thay d bằng ý tính toán: 2,479 L Cl₂ → 0,1 mol NaClO, phát biểu "0,2 mol" sai (M48). |
| Q-B21-014 | Đạt | d (F₂ không thế trong dung dịch) null – hợp lí. |
| Q-B21-015 | Đạt | NaClO₃: Cl +5; gợi ý −1 (M45). |
| Q-B21-016 | Đạt | 3,16 g KMnO₄ → 0,05 mol Cl₂ → 1,2395 ≈ 1,24 L; gợi ý 2,48 (M48) nằm ngoài tolerance. |
| Q-B22-001 | Đạt | HF < HCl < HBr < HI. |
| Q-B22-002 | Đạt | AgBr vàng nhạt. |
| Q-B22-003 | Đạt | A đúng chất, đúng lí do; C đúng chất sai lí do (M44) – đáp án duy nhất vì lí do được nêu tường minh. |
| Q-B22-004 | Đạt | HF sôi cao nhất (liên kết hydrogen). |
| Q-B22-005 | Đạt | I⁻. |
| Q-B22-006 | Đạt | Fe + 2HCl → FeCl₂ + H₂; Cu, Ag không phản ứng. |
| Q-B22-007 | Đạt | 3 kết tủa; 4 (M46). |
| Q-B22-008 | Đã sửa | Chỉ xác định số oxi hóa và vai trò (1–2 bước) → hạ mức **VD → TH**. |
| Q-B22-009 | Đạt | Số liệu 565 → 297 kJ/mol khớp bài học. |
| Q-B22-010 | Đạt | Đúng. |
| Q-B22-011 | Đã sửa | Ý d "nhiệt độ sôi các hydrogen halide **tạo thành**" mơ hồ (thí nghiệm chỉ tạo HCl; NaBr, NaI không tạo HBr, HI) và lệch chủ đề → thay bằng "dùng NaI rắn + H₂SO₄ đặc để điều chế HI" (sai, null) – bám đúng YCCĐ tính khử ion halide. |
| Q-B22-012 | Đạt | 0,02 mol AgCl = 2,87 g; 5,41 (cộng AgF, M46). |
| Q-B22-013 | Đạt | 3 acid mạnh; 4 (M44). |
| Q-B22-014 | Đạt | NaI hết: 0,08 × 235 = 18,8 g. |
| Q-B23-001 | Đạt | I₂ rắn tím đen. |
| Q-B23-002 | Đạt | HCl < HBr < HI < HF; A (M47). |
| Q-B23-003 | Đạt | OF₂: O +2, F −1. |
| Q-B23-004 | Đạt | NaI. |
| Q-B23-005 | Đạt | 0,1 mol KMnO₄ → 0,25 mol Cl₂ → 0,5 mol HCl bị oxi hóa; nhiễu 0,8 / 0,3 / 0,25 đúng nguồn gốc. |
| Q-B23-006 | Đạt | Đúng. |
| Q-B23-007 | Đạt | Đúng. |
| Q-B23-008 | Đã sửa | Mức VD nhưng toàn ý nhớ/hiểu; ý d (AgF kết tủa) trùng Q-B22-010 b. Thay d: 0,01 mol HF + 0,01 mol HBr với AgNO₃ dư → 1,88 g AgBr; phát biểu "3,15 g" (cộng 1,27 g AgF) sai (M46). Thêm Ag, F, Br vào đề. |
| Q-B23-009 | Đạt | 0,15 mol Cl₂ → 3,7185 ≈ 3,72 L; 7,44 (M48). |
| Q-B23-010 | Đạt | Tăng giảm khối lượng: 1,70 : 85 = 0,02 → M = 103 → X = 80 (Br). |

---

## (c) Danh mục lỗi sai, bài học, thuật ngữ

### Danh mục M43–M48

| Mã | Kết luận | Ghi chú |
|---|---|---|
| M43 | Đạt | Đúng; bao cả phản ứng thế ngược chiều. |
| M44 | Đạt | Đúng; nêu rõ HF khắc thủy tinh không do tính acid mạnh. |
| M45 | Đạt | Đúng (F chỉ −1; Cl, Br, I còn +1, +3, +5, +7); bao vai trò tự oxi hóa – khử. |
| M46 | Đạt | Đúng (AgF tan; màu AgCl/AgBr/AgI). |
| M47 | Đạt | Số liệu −85, −67, −35, 20 °C đúng. |
| M48 | Đạt | Đúng; bao cả lỗi số mol nguyên tử/phân tử – dùng cho các ý tính toán mới. |

Không trùng bản chất giữa các mã. Chưa có mã cho "đảo chiều tính khử của ion halide" – các nhiễu này để null (Q-B22-005), chấp nhận.

### Bài học

| Bài | Kết luận | Ghi chú |
|---|---|---|
| B21 | Đã sửa | Số liệu vật lí (t°nc, t°s, màu), độ âm điện, phương trình đều đúng. Sửa: "hỗn hợp H₂ + Cl₂ tỉ lệ 1 : 1 gây nổ" → "nổ mạnh khi chiếu sáng trực tiếp" (tránh hiểu luôn nổ); key formula Cl₂ + NaOH nóng ghi "(70 °C)" thống nhất thân bài. An toàn hóa chất (tủ hút, bông tẩm NaOH, Br₂ gây bỏng) phù hợp. |
| B22 | Đã sửa | Bảng H–X thêm độ dài liên kết (0,092; 0,127; 0,141; 0,161 nm) và ghi chú số liệu thống nhất Chương 3, 5; thêm ghi chú NaHSO₄/Na₂SO₄ theo nhiệt độ và vì sao không điều chế HBr, HI bằng H₂SO₄ đặc; mục ứng dụng đổi tiêu đề thành "hydrogen halide và muối halide", thêm HF khắc thủy tinh (trước đó HCl bị xếp vào "muối halide"). |
| B23 | Đạt | Bảng hệ thống, chuỗi phản ứng, bảng bẫy lỗi đúng. |

Worked examples đã kiểm (17,4 g MnO₂ → 4,96 L; 11,7 g NaCl → 28,7 g AgCl; 26,1 g MnO₂ → 32,5 g FeCl₃) – đúng, không trùng câu luyện tập sau khi sửa Q-B21-006. quick_check (9 mã) đều đúng, đều mức NB/TH phù hợp kiểm tra nhanh.

### Thuật ngữ (T-601 – T-620)

| Nhóm | Kết luận | Ghi chú |
|---|---|---|
| B21: T-601 – T-612 | Đạt | IPA Anh – Anh đúng (fluorine /ˈflɔː.riːn/, iodine /ˈaɪ.ə.diːn/, electrolysis /ˌɪl.ekˈtrɒl.ə.sɪs/, oxidising power – chính tả Anh). |
| B22: T-613 – T-620 | Đạt | halide /ˈheɪ.laɪd/, precipitate (n.) /prɪˈsɪp.ɪ.tət/; hydrohalic acid – xem mục e #6. |

---

## (d) Danh sách sửa đã làm

| # | Vị trí | Trước | Sau | Lí do |
|---|---|---|---|---|
| 1 | Q-B21-006 đề, lời giải, terms | Cl₂ + 2NaOH → NaCl + NaClO + H₂O | Cl₂ + 2KOH → KCl + KClO + H₂O; bỏ T-608, thêm T-606 | Trùng ví dụ mẫu B21. |
| 2 | Q-B21-013 ý d | "Trong NaClO, Cl có số oxi hóa −1" (M45) | "2,479 L Cl₂ (đkc) + NaOH dư → 0,2 mol NaClO" – Sai (M48) | Đúng mức VD; bỏ trùng ý b. |
| 3 | Q-B22-008 `level` | VD | TH | Chỉ 1–2 bước. |
| 4 | Q-B22-011 ý d | Nhiệt độ sôi các HX "tạo thành" HF < … < HI (M47) | "NaI rắn + H₂SO₄ đặc để điều chế HI" – Sai (null) | Ý cũ mơ hồ, lệch ngữ cảnh thí nghiệm. |
| 5 | Q-B23-008 đề, ý d | "AgNO₃ + HF → kết tủa trắng AgF" | Tính khối lượng kết tủa từ 0,01 mol HF + 0,01 mol HBr: 3,15 g – Sai (M46); thêm Ag, F, Br | Đúng mức VD; bỏ trùng Q-B22-010. |
| 6 | B21 bảng H₂ + X₂ | "hỗn hợp tỉ lệ 1 : 1 gây nổ" | "tỉ lệ mol 1 : 1 nổ mạnh khi chiếu sáng trực tiếp" | Chính xác điều kiện. |
| 7 | B21 key_formulas | 3Cl₂ + 6NaOH →(t°) | →(70 °C) | Thống nhất thân bài. |
| 8 | B22 bảng H–X | Độ dài "ngắn nhất/dài nhất" | Số liệu nm + ghi chú nguồn số liệu | Đủ dữ kiện tự học; nhất quán C3, C5. |
| 9 | B22 "Tính khử của ion halide" | — | Ghi chú NaHSO₄ / Na₂SO₄ (> 400 °C); không điều chế HBr, HI bằng H₂SO₄ đặc | Mục e #5. |
| 10 | B22 "Ứng dụng" | "Ứng dụng của muối halide" (có cả HCl) | "…của một số hydrogen halide và muối halide", thêm HF | YCCĐ nêu ứng dụng hydrogen halide. |

Không đổi `id`, không đổi `reviewed`; không sửa `terms.json`, `misconceptions.json`.

---

## (e) Quyết định của chuyên gia (đã áp dụng – GV có thể đổi lại)

| # | Vấn đề | Quyết định đã áp dụng | Nếu GV muốn đổi lại |
|---|---|---|---|
| 1 | Màu F₂: "lục nhạt" hay "vàng lục nhạt" | **Giữ "lục nhạt"** (cách ghi trong bảng tính chất vật lí SGK KNTT và SGK cũ; "vàng lục nhạt" là cách ghi của một số tài liệu tham khảo). Không câu nào lấy màu F₂ làm điểm phân loại đúng/sai. | Thay đồng loạt trong B21, B23, T-601, M48, Q-B21-001, Q-B21-011 bằng "vàng lục nhạt". |
| 2 | Năng lượng liên kết H–X 565/431/364/297 kJ/mol | **Giữ**; khớp Chương 3 (H–Cl 431) và Chương 5 (H–F 565, H–Cl 431, H–Br 364); H–I 297 theo bảng KNTT. Thêm độ dài liên kết 0,092/0,127/0,141/0,161 nm và ghi chú "chênh 1–2 đơn vị tùy tài liệu". | Sửa theo số trong bảng SGK GV đang dùng (cả C3, C5, C7). |
| 3 | Điều kiện Cl₂ + NaOH nóng: 70 °C | **Giữ "khoảng 70 °C"** (cách SGK KNTT ghi trên mũi tên); key formula sửa thành "(70 °C)". Câu hỏi Q-B21-010 ghi "(t°)" – không phụ thuộc giá trị nhiệt độ. | Đổi thành "t°" hoặc "đun nóng" ở mọi chỗ. |
| 4 | YCCĐ có yêu cầu điều chế Cl₂ trong PTN? | YCCĐ CT 2018 chỉ nêu chung "ứng dụng … và phương pháp điều chế"; SGK KNTT nhấn mạnh **công nghiệp** (điện phân dung dịch NaCl có màng ngăn). **Giữ cả phương pháp PTN** (MnO₂/KMnO₄ + HCl đặc) vì đồng thời minh họa tính khử của HCl đặc (B22) và oxi hóa – khử (Chương 4); giữ 2 câu tính toán Q-B21-016, Q-B23-005 và ví dụ mẫu dùng phản ứng này. | Nếu GV chỉ dạy phương pháp công nghiệp: chuyển đoạn PTN thành "Mở rộng", hạ Q-B21-016/Q-B23-005 xuống mức tham khảo hoặc thay bằng bài tính theo điện phân. |
| 5 | NaCl + H₂SO₄ đặc: NaHSO₄ hay Na₂SO₄ | **Giữ NaHSO₄** (đun nóng vừa phải, phương trình SGK dùng cho điều chế HCl trong PTN); thêm ghi chú: > 400 °C tạo Na₂SO₄ + 2HCl. Q-B22-011 b chấp nhận phương trình NaHSO₄. | Đổi sang 2NaCl + H₂SO₄ → Na₂SO₄ + 2HCl nếu GV theo cách viết khác (sửa B22 bảng, key_formulas, Q-B22-011 b). |
| 6 | IPA "hydrohalic acid" | **Giữ /ˌhaɪ.drəʊˈhæl.ɪk ˈæs.ɪd/** (trọng âm ở "hal", theo cách đọc Anh – Anh của Oxford; Cambridge không có mục riêng). Biến thể chấp nhận: /ˌhaɪ.drəˈhæl.ɪk/. | Đổi sang biến thể /drə/ cho thống nhất với hydrochloric. |
| 7 | Mức độ các câu VD "nhẹ" | Tăng độ khó 2 câu (Q-B21-013, Q-B23-008 – thêm ý tính toán), hạ 1 câu (Q-B22-008 → TH). Tỉ lệ 25 / 47,5 / 27,5% – trong biên độ cho phép. | Khôi phục ý cũ và nhãn cũ. |

---

## (f) Nhận xét chung về ngân hàng câu hỏi

- **Độ chính xác:** tốt. Không câu nào sai đáp án; mọi phương trình đã cân bằng lại, mọi phép tính đã kiểm hai lần. Vấn đề chính là một câu trùng ví dụ mẫu, một ý đúng/sai mơ hồ và nhãn VD đặt cho câu chỉ ở mức hiểu.
- **Gắn mã lỗi:** 38/72 nhiễu mcq có mã; nhiễu null là nhiễu "loại trừ" (FeCl₂, nhiệt phân NaCl…) – hợp lí. Gợi ý `short` đúng là kết quả của lỗi tương ứng và nằm ngoài tolerance.
- **Mức độ:** NB 25% / TH 47,5% / VD 27,5%.
- **Phạm vi:** dùng kiến thức Chương 1–7 (độ âm điện C2, liên kết hydrogen/van der Waals C3, số oxi hóa C4, năng lượng liên kết C5); không dùng kiến thức lớp 11.
- **Độ phủ:** đủ 3 bài, 3 dạng, M43–M48 (M47 nay 3 câu – vẫn đủ). Gợi ý bổ sung sau: 1 câu về tính tẩy màu của nước chlorine (thí nghiệm YCCĐ), 1 câu về ứng dụng muối iodine/NaF.
- **Ngôn ngữ, thuật ngữ:** tên IUPAC (sodium chloride, potassium permanganate, manganese dioxide, hydrochloric acid…), Unicode, IPA Anh – Anh thống nhất.

**Việc còn lại cho HS/GV:** ghi nhật ký AI; GV duyệt 5 câu đã sửa, các sửa bài học và các quyết định ở mục (e); lập bảng "cách tạo phương án nhiễu" (CONTENT_GUIDE mục 4) cho M43–M48 khi chốt.
