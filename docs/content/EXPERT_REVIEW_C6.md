# Rà soát chuyên môn nội dung Chương 6 – Tốc độ phản ứng

> **Rà soát bởi agent AI đóng vai chuyên gia, ngày 15/11/2026 – không thay thế phê duyệt của giáo viên hướng dẫn.**
> Mọi câu vẫn giữ `reviewed: false`. Các sửa đổi dưới đây cần được ghi vào `docs/management/AI_USAGE_LOG.md` và được GV xem lại.

Phạm vi rà soát: `web/data/c6/misconceptions.json` (M38–M42), `web/data/c6/lessons.json` (B19–B20), `web/data/c6/terms.json` (T-501 – T-515), `web/data/c6/questions.json` (30 câu). Đối chiếu: SGK Hóa học 10 KNTT (Bài 19, Bài 20), yêu cầu cần đạt (YCCĐ) CT GDPT 2018 chủ đề "Tốc độ phản ứng", `docs/content/CONTENT_GUIDE.md`, `docs/CONTRACT.md` mục 3. Đã tính lại độc lập mọi tốc độ trung bình (dấu, chia hệ số tỉ lượng), mọi tỉ số tốc độ theo biểu thức v = k·C_A^a·C_B^b, mọi lũy thừa γ^(ΔT/10), cân bằng phương trình Na₂S₂O₃ + H₂SO₄, và kiểm tra mọi giá trị `misconception_hints` đúng là kết quả của lỗi được gắn. Sau khi sửa: `node docs/content/validate.js web/data/c6` → **ALL CHECKS PASSED** (30 câu: mcq 18, true_false 6, short 6; NB 8 / TH 13 / VD 9 = 27% / 43% / 30%; đáp án mcq A 4 · B 5 · C 5 · D 4; 41/54 phương án nhiễu mcq có mã lỗi).

Rà soát một vòng: sửa lỗi rõ ràng và tự quyết định các điểm chuyên môn người soạn chưa chắc (mục e) theo ủy quyền của GV. Không phát hiện đáp án sai; không có nội dung cân bằng hóa học.

**Tổng hợp 30 câu:** Đạt 25 · Đã sửa 5 · Mới thêm 0.

---

## (b) Kết quả từng câu hỏi

| Mã câu | Kết luận | Ghi chú ngắn |
|---|---|---|
| Q-B19-001 | Đạt | Định nghĩa KNTT. D (khối lượng xúc tác biến thiên) gắn M39 hợp lí. |
| Q-B19-002 | Đạt | mol/(L·s). |
| Q-B19-003 | Đạt | Đun nóng nhẹ. A (M40), B (giảm nồng độ – M42) đúng bản chất. |
| Q-B19-004 | Đạt | Định nghĩa chất xúc tác; A, B, C đều M39. |
| Q-B19-005 | Đạt | 2NO + O₂ (đề ghi "phản ứng đơn giản"): v = k·C²_NO·C_O₂. |
| Q-B19-006 | Đạt | γ ứng với mỗi 10 °C; A, B gắn M41. |
| Q-B19-007 | Đạt | Kẽm bột nhanh nhất. |
| Q-B19-008 | Đạt | (1/4)·0,32/40 = 0,002; gợi ý 0,008 / 0,004 / −0,002 đều đúng M38; tolerance 0,0002 không nuốt gợi ý. |
| Q-B19-009 | Đạt | 2 × 0,0010 × 60 = 0,12 mol/L; gợi ý 0,06 / 0,03 đúng. |
| Q-B19-010 | Đạt | 2³ = 8; 6, 3, 60 đều là cách tính tuyến tính (M41). |
| Q-B19-011 | Đã sửa | 3³ = 27; 54 : 27 = 2 phút (gợi ý 6, 18 đúng). Thêm "(Kết quả là số nguyên.)" – đề phải nói rõ làm tròn. |
| Q-B19-012 | Đạt | 3² = 9. |
| Q-B19-013 | Đạt | 2 đúng / 2 sai; d: 2² = 4. |
| Q-B19-014 | Đạt | Ý d (năng lượng hoạt hóa) ở mức định tính – khớp bài học (xem mục e). |
| Q-B19-015 | Đạt | Than tổ ong – diện tích bề mặt. |
| Q-B19-016 | Đạt | γ³ = 27 → γ = 3; nhiễu 9 / 0,9 / 2,7 đúng M41. |
| Q-B19-017 | Đạt | 3² × ½ = 4,5; gợi ý 1,5 (quên mũ) và 3 (2 × 3 × ½) đúng M42. |
| Q-B19-018 | Đạt | Chỉ SO₂ + O₂ có chất khí tham gia. |
| Q-B19-019 | Đạt | 0,040/2 = 0,020. |
| Q-B19-020 | Đạt | 1 đúng / 3 sai; c: 3² = 9; d: n(CaCO₃) = 0,01 mol, HCl 0,05 mol dư. Ý b gắn M42 – đã mở rộng mô tả M42 cho khớp. |
| Q-B19-021 | Đạt | n(O₂) = 0,4958/24,79 = 0,02 mol; ΔC(O₂) = 0,04 M; v̄ = 0,002 (kiểm theo H₂O₂ cùng kết quả). |
| Q-B20-001 | Đạt | k = v khi C = 1 mol/L. |
| Q-B20-002 | Đạt | Nồi áp suất → nhiệt độ sôi > 100 °C. |
| Q-B20-003 | Đã sửa | Ý c "thổi không khí vào lò than" **trùng ví dụ mẫu B20 (quạt bếp than)** và bảng ứng dụng → thay bằng "dùng oxygen nguyên chất trong đèn xì" (vẫn yếu tố nồng độ, vẫn Đúng). |
| Q-B20-004 | Đạt | Ý nghĩa dấu trừ. |
| Q-B20-005 | Đạt | 2,5² = 6,25. |
| Q-B20-006 | Đã sửa | Ý a và b cùng hỏi một đại lượng (a đúng ⇒ b sai) – thừa. Ý b → "Trong 20 giây đầu, nồng độ X đã giảm 0,20 mol/L" (Sai: 0,10 mol/L; M38 – tính ngược sai theo hệ số). a: 0,005; c: 0,003 < 0,005 – đúng. |
| Q-B20-007 | Đã sửa | Đáp án 8 đúng. Lời giải nhiễu D: "cộng/nhân sai (2 × 2 + 2)" → "cộng các thừa số (2² + 2) thay vì nhân". |
| Q-B20-008 | Đã sửa | 16 = 2⁴ → 80 °C; gợi ý 120 °C đúng M41. Thêm "(Kết quả là số nguyên.)". |
| Q-B20-009 | Đạt | V₂O₅; 0,060/2 = 0,030. |


---

## (c) Danh mục lỗi sai, bài học, thuật ngữ

### Danh mục M38–M42

| Mã | Kết luận | Ghi chú |
|---|---|---|
| M38 | Đạt | Ví dụ: 0,30/10/3 = 0,01 đúng. Bao cả tính ngược lượng chất. |
| M39 | Đạt | Đúng (tiêu hao, thành sản phẩm, tăng lượng sản phẩm). |
| M40 | Đạt | Đúng (hạt to/bột, "như nhau", tăng lượng sản phẩm). |
| M41 | Đạt | 2^3 = 8 đúng. |
| M42 | Đã sửa | Thêm "bỏ qua ảnh hưởng của nồng độ" để khớp tag Q-B19-020 b. Mã này gộp 3 nhóm lỗi (biểu thức tốc độ, hướng ảnh hưởng nồng độ, áp suất) – chấp nhận vì danh mục cố định 5 mã; có thể tách khi có dữ liệu thực nghiệm. |

### Bài học

| Bài | Kết luận | Ghi chú |
|---|---|---|
| B19 | Đã sửa | Objectives khớp 6 YCCĐ CT 2018. Thêm: chú ý "phản ứng đơn giản" và ghi "(coi là phản ứng đơn giản)" cho ví dụ H₂ + I₂, 2NO + O₂; đơn vị của k (không bắt nhớ); phương trình, cách làm và lưu ý an toàn (SO₂) cho thí nghiệm Na₂S₂O₃ + H₂SO₄; định nghĩa năng lượng hoạt hóa thành câu riêng + "chỉ định tính"; "thời gian giảm bấy nhiêu lần" thêm điều kiện; summary về k thêm "(và chất xúc tác)" cho nhất quán. |
| B20 | Đạt | Bảng hệ thống, bẫy lỗi đúng. |

Worked examples (5 bài) đều tính đúng (0,005 / 0,015; 0,008 / 0,016; 16 lần, 2 phút; 0,0025, 18 lần). Không còn trùng câu luyện tập sau khi sửa Q-B20-003 c. Quick_check (6 mã) đều đúng, đủ dễ để tự kiểm tra sau khi đọc.

### Thuật ngữ (T-501 – T-515)

| Nhóm | Kết luận | Ghi chú |
|---|---|---|
| T-501 – T-507 | Đạt | IPA UK đúng: reaction /riˈæk.ʃən/, stoichiometric /ˌstɔɪ.ki.əˈmet.rɪk/ (trong cụm hạ thành trọng âm phụ), coefficient /ˌkəʊ.ɪˈfɪʃ.ənt/, concentration /ˌkɒn.sənˈtreɪ.ʃən/. |
| T-508 – T-515 | Đạt | pressure /ˈpreʃ.ə/, temperature /ˈtem.prə.tʃə/, catalyst /ˈkæt.əl.ɪst/, enzyme /ˈen.zaɪm/, collision /kəˈlɪʒ.ən/, activation /ˌæk.tɪˈveɪ.ʃən/. Định nghĩa T-508, T-509 thiên về "ảnh hưởng" hơn là định nghĩa – chấp nhận trong ngữ cảnh chương. |

---

## (d) Danh sách sửa đã làm

| # | Vị trí | Trước | Sau | Lí do |
|---|---|---|---|---|
| 1 | B19 summary (k) | "bản chất phản ứng và nhiệt độ" | "…, nhiệt độ (và chất xúc tác)" | Nhất quán với mục bài và T-507. |
| 2 | B19 "Biểu thức tốc độ" | Ví dụ H₂ + I₂, 2NO + O₂ không chú thích | "(coi là phản ứng đơn giản)" + đoạn **Chú ý** về phản ứng đơn giản | Xem mục e-2. |
| 3 | B19 "Biểu thức tốc độ" | Không nói đơn vị k | Thêm câu đơn vị k (L/(mol·s) cho H₂ + I₂), không bắt nhớ | Xem mục e-4. |
| 4 | B19 "Nhiệt độ" | Thí nghiệm Na₂S₂O₃ một dòng | Phương trình, cách làm, an toàn SO₂ | Xem mục e-3. |
| 5 | B19 "Nhiệt độ" | "thời gian giảm bấy nhiêu lần" | thêm "(với cùng lượng chất, các điều kiện khác như nhau)" | Chặt chẽ. |
| 6 | B19 "Chất xúc tác" | Năng lượng hoạt hóa trong ngoặc | Câu định nghĩa riêng + "chỉ định tính" | Xem mục e-1. |
| 7 | M42 description | — | thêm "bỏ qua ảnh hưởng của nồng độ" | Khớp Q-B19-020 b. |
| 8 | Q-B19-011, Q-B20-008 đề | — | "(Kết quả là số nguyên.)" | CONTENT_GUIDE 3.3. |
| 9 | Q-B20-003 c + lời giải | Thổi không khí vào lò than | Oxygen nguyên chất trong đèn xì | Trùng ví dụ mẫu B20. |
| 10 | Q-B20-006 b + lời giải | "v̄ 20 s đầu là 0,010" | "nồng độ X đã giảm 0,20 mol/L" | Ý b cũ là phủ định của ý a. |
| 11 | Q-B20-007 lời giải | "cộng/nhân sai (2 × 2 + 2)" | "cộng các thừa số (2² + 2) thay vì nhân" | Mô tả đúng lỗi. |

Không đổi `id`, không đổi `reviewed`, không sửa `terms.json`.

---

## (e) Quyết định của chuyên gia (đã áp dụng – GV có thể đổi lại)

| # | Vấn đề | Quyết định đã áp dụng | Nếu GV muốn đổi lại |
|---|---|---|---|
| 1 | Mức độ trình bày năng lượng hoạt hóa | **Định tính**: định nghĩa (năng lượng tối thiểu để va chạm hiệu quả) + "chất xúc tác làm giảm năng lượng hoạt hóa". Không giản đồ năng lượng, không phương trình Arrhenius (thuộc Chuyên đề 10). Giữ T-515 và ý d Q-B19-014. | Bỏ đoạn và ý d nếu GV chỉ muốn giải thích xúc tác bằng "va chạm hiệu quả". |
| 2 | H₂ + I₂ và 2NO + O₂ là "phản ứng đơn giản"? | **Giữ** (là ví dụ quen thuộc của SGK/SBT; biểu thức v = k·C_H₂·C_I₂ và v = k·C²_NO·C_O₂ cũng trùng biểu thức thực nghiệm) nhưng ghi "(coi là phản ứng đơn giản)" và thêm chú ý: chỉ lấy số mũ = hệ số khi là phản ứng đơn giản; mọi câu hỏi đều ghi "phản ứng đơn giản" hoặc cho sẵn biểu thức. Q-B20-009 (SO₂ + O₂) **không** hỏi biểu thức tốc độ. | Thay bằng phản ứng giả định A + B → C trong bài học. |
| 3 | Thí nghiệm Na₂S₂O₃ + H₂SO₄ | **Giữ** (thí nghiệm kinh điển về ảnh hưởng nhiệt độ/nồng độ); bổ sung phương trình đã cân bằng (dùng kiến thức Chương 4), cách đo thời gian vẩn đục và lưu ý an toàn SO₂. Không ra câu hỏi về phương trình này. | Đổi sang thí nghiệm SGK GV đang dùng (ví dụ Zn/CaCO₃ + HCl ở hai nhiệt độ). |
| 4 | Đơn vị của k | Nêu một ví dụ (L/(mol·s)), ghi "phụ thuộc dạng biểu thức, không cần ghi nhớ"; **không** câu nào hỏi đơn vị k. Q-B19-002 phương án C "L/(mol·s)" giữ làm nhiễu null. | Bỏ câu này khỏi bài học. |
| 5 | Trường `unit` của câu short ("mol/(L·s)", "mol/L", "phút", "lần", "°C") | **Giữ** – CONTENT_GUIDE ghi "" hoặc "%", nhưng Chương 5 đã dùng "kJ" và validator chấp nhận; đơn vị hiển thị giúp HS tránh nhập sai thang. Đề đều nêu rõ đơn vị cần nhập. | Đặt "" và để đơn vị trong đề; hoặc cập nhật CONTENT_GUIDE 3.3. |
| 6 | M42 gộp nhiều lỗi | Giữ 1 mã, mở rộng mô tả (mục d-7). | Tách mã khi có danh mục chương sau còn trống. |

---

## (f) Nhận xét chung về ngân hàng câu hỏi

- **Độ chính xác:** tốt. Mọi phép tính đúng; mọi gợi ý `short` đúng là kết quả của lỗi tương ứng; tolerance không bao gợi ý sai nào.
- **Gắn mã lỗi:** 41/54 nhiễu mcq có mã; các nhiễu null là nhiễu loại trừ (đơn vị, enthalpy, nồng độ do nhiệt độ…) – hợp lí.
- **Mức độ:** NB 27% / TH 43% / VD 30% – sát đích.
- **Phạm vi:** chỉ dùng kiến thức Chương 1–6 (mol, đkc 24,79 L/mol, phương trình đã cân bằng); không cân bằng hóa học, không Arrhenius, không bậc phản ứng thực nghiệm.
- **Độ phủ:** đủ 5 yếu tố, M38–M42, 3 dạng. Gợi ý bổ sung sau: 1 câu đọc bảng/đồ thị nồng độ – thời gian; 1 câu về ảnh hưởng của nồng độ trong thí nghiệm Na₂S₂O₃; đa dạng tỉ lệ đúng/sai (hiện 5/6 câu là 2–2).
- **Ngôn ngữ, thuật ngữ:** IUPAC (oxygen, manganese dioxide, sulfur…), Unicode, IPA Anh – Anh thống nhất.

**Việc còn lại cho HS/GV:** ghi nhật ký AI; GV duyệt các câu đã sửa và các quyết định ở mục (e); đối chiếu lại ví dụ thí nghiệm với đúng bản SGK KNTT GV đang dùng.
