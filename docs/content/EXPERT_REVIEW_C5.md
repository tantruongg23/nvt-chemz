# Rà soát chuyên môn nội dung Chương 5 – Năng lượng hóa học

> **Rà soát bởi agent AI đóng vai chuyên gia, ngày 15/11/2026 – không thay thế phê duyệt của giáo viên hướng dẫn.**
> Mọi câu vẫn giữ `reviewed: false`. Các sửa đổi dưới đây cần được ghi vào `docs/management/AI_USAGE_LOG.md` và được GV xem lại.

Phạm vi rà soát: `web/data/c5/misconceptions.json` (M33–M37), `web/data/c5/lessons.json` (B17–B18), `web/data/c5/terms.json` (T-401 – T-415), `web/data/c5/questions.json` (30 câu). Đối chiếu: SGK Hóa học 10 KNTT (Bài 17, 18), YCCĐ CT GDPT 2018 chủ đề "Năng lượng hóa học", `docs/content/CONTENT_GUIDE.md`, `docs/CONTRACT.md` mục 3, bảng Eb ở `web/data/c3/lessons.json`. Đã tính lại độc lập mọi ΔrH°₂₉₈ (từ ΔfH° và từ Eb), mọi kết quả nhiễu và gợi ý `short`, số mol, nhiệt lượng; kiểm tra dấu, hệ số, thể của chất, cách làm tròn. Sau khi sửa: `node docs/content/validate.js web/data/c5` → **ALL CHECKS PASSED** (30 câu: mcq 18, true_false 6, short 6; NB 8 / TH 13 / VD 9 = 27% / 43% / 30%; đáp án mcq A 5 · B 4 · C 4 · D 5; 46/54 phương án nhiễu mcq có mã lỗi).

Rà soát một vòng: sửa lỗi rõ ràng và tự quyết định các điểm chuyên môn chưa chắc (mục e) theo ủy quyền của GV.

**Tổng hợp 30 câu:** Đạt 25 · Đã sửa 5 (trong đó 1 câu thay nội dung) · Mới thêm 0.

---

## (b) Kết quả từng câu hỏi

| Mã câu | Kết luận | Ghi chú ngắn |
|---|---|---|
| Q-B17-001 | Đạt | Nung đá vôi thu nhiệt; đốt than/cồn gắn M34 đúng. |
| Q-B17-002 | Đã sửa | Đáp án A đúng. Lời giải "điều kiện tiêu chuẩn đã dùng trước đây" → "đktc dùng trong tài liệu cũ" (HS học KHTN 8 – CT 2018 – đã dùng 25 °C, 1 bar). |
| Q-B17-003 | Đạt | −393,5 kJ → tỏa nhiệt. |
| Q-B17-004 | Đạt | O₂(g); O₃ gắn M35 khớp mô tả. |
| Q-B17-005 | Đạt | Sản phẩm cao hơn → thu nhiệt, ΔrH > 0. |
| Q-B17-006 | Đạt | −890,2 = −393,5 + 2(−285,8) + 74,9 ✓; +178,4 ✓. 2 đúng/2 sai. |
| Q-B17-007 | Đạt | −571,6 : 2, đổi dấu → +285,8. A (M33), B (M35 – quên chia) đúng bản chất. |
| Q-B17-008 | Đạt | Định nghĩa ΔfH°₂₉₈. |
| Q-B17-009 | Đã sửa | −197,8 ✓; gợi ý +197,8 / −98,9 / +98,9 ✓. `tolerance` 0,1 → 0,05 (theo CONTENT_GUIDE 3.3). |
| Q-B17-010 | Đạt | −183 ✓; +248 = 679 − 431 (quên hệ số), −248 (cả hai lỗi) ✓. |
| Q-B17-011 | Đạt | Chỉ B toàn chất khí. |
| Q-B17-012 | Đạt | NO +90,3 → thu nhiệt; d gắn M37. |
| Q-B17-013 | Đạt | 4,0/16 = 0,25 mol → 222,55 kJ; D = 0,5 × 890,2 (lấy nhầm mol O₂). |
| Q-B17-014 | Đã sửa | −906,0 ✓ (361,2 − 1450,8 + 183,6); gợi ý ✓. `tolerance` 0,1 → 0,05. |
| Q-B17-015 | Đạt | 2652 − 3454 = −802 ✓; −372 (quên hệ số), −3 (CO₂ 1 liên kết C=O) ✓. |
| Q-B17-016 | Đạt | 3,4/17 = 0,2 mol; 0,2 × 45,9 = 9,18 kJ ✓. |
| Q-B17-017 | Đạt | Đúng. |
| Q-B17-018 | Đạt | 945 + 3·436 = 2253; 6·391 = 2346; −93 ✓ (ΔfH cho −91,8). |
| Q-B17-019 | Đã sửa | Phương án B "phương trình không ghi trạng thái (…)" gây tranh cãi (vẫn "biểu diễn" đúng về số liệu) → thay bằng "…→ H₂O(g) ΔrH = −285,8 kJ" (sai thể của nước, sai chắc chắn). Đáp án C duy nhất. |
| Q-B17-020 | Đạt | F −535; Cl −183; Br −99 ✓; A duy nhất đúng. |
| Q-B17-021 | Đạt | −1675,7 + 824,2 = −851,5 ✓. |
| Q-B18-001 | Đạt | 298 K = 25 °C. |
| Q-B18-002 | Đạt | Đúng. |
| Q-B18-003 | Đạt | 2 đúng/2 sai, rõ ràng. |
| Q-B18-004 | Đạt | Đúng; nội dung gần Q-B17-017 (chấp nhận – củng cố M34 ở bài ôn tập). |
| Q-B18-005 | Đạt | ΔfH°(diamond) = +1,9 kJ/mol. |
| Q-B18-006 | Đã sửa (thay nội dung) | Câu cũ (CaCO₃ → CaO + CO₂, đáp án +178,4) có **đáp án in sẵn trong bài học** (phương trình ví dụ, sơ đồ) và lời giải còn ghi lấp lửng "SGK có thể ghi +178,49". Thay bằng phản ứng tôi vôi CaO(s) + H₂O(l) → Ca(OH)₂(s), số liệu cho trong đề (Ca(OH)₂ −985,2): đáp án **−64,3 kJ**, tol 0,05; gợi ý +64,3 (cđ − sp) và −1906,1 (cộng tất cả) – M35. Vẫn TH. |
| Q-B18-007 | Đã sửa | Phương án B (2270, quên liên kết H–H) null → **M36** (đếm thiếu liên kết, đúng mô tả M36). |
| Q-B18-008 | Đạt | 2706 − 2831 = −125 ✓; −561, −1367 ✓; ΔfH cho −136,5. |
| Q-B18-009 | Đạt | −2219,9 ✓; c −1362,5 (quên hệ số 4) M35; d 0,1 mol → 222,0 kJ ✓. |

---

## (c) Danh mục lỗi sai, bài học, thuật ngữ

### Danh mục M33–M37

| Mã | Kết luận | Ghi chú |
|---|---|---|
| M33 | Đạt | Bao đủ: nhầm dấu, đọc ngược sơ đồ, đảo chiều không đổi dấu. |
| M34 | Đạt | Đúng bản chất "khơi mào ≠ thu nhiệt" và chiều ngược lại. |
| M35 | Đã sửa | Mô tả đúng. `example_wrong/right` dùng đúng phản ứng 2SO₂ + O₂ của Q-B17-009 → lộ đáp án; đổi sang 2NO + O₂ → 2NO₂ (−114,2 kJ; sai: +57,1 kJ). |
| M36 | Đã sửa | Mô tả đúng. Ví dụ dùng H₂ + Cl₂ trùng đáp án Q-B17-010 → đổi sang 2H₂ + O₂ → 2H₂O(g) (−486 kJ, trùng ví dụ mẫu của bài, không trùng câu luyện tập). |
| M37 | Đạt | Đúng; "điều kiện tiêu chuẩn cũ" hợp lí. |

Không thiếu lỗi quan trọng của chủ đề; không có hai mã trùng bản chất. Lỗi "ghi sai/bỏ trạng thái chất" chưa có mã – để null (Q-B17-019 B).

### Bài học

| Bài | Kết luận | Ghi chú |
|---|---|---|
| B17 | Đã sửa | Kiến thức đúng KNTT, đủ YCCĐ. Bổ sung mục thí nghiệm đơn giản (CaO + nước; nhiệt phân Cu(OH)₂) cho mục tiêu 6; sửa câu đktc "đã học trước đây"; bỏ "NO₂ kém bền, dễ phân hủy" (không chính xác ở điều kiện thường); ghi chú nguồn số liệu ΔfH° và Eb, "luôn dùng số liệu trong đề"; thêm O₃, Ca(OH)₂ vào bảng ΔfH°. Mọi số trong bảng khớp NIST/CRC làm tròn; mọi phép tính ví dụ mẫu đúng. |
| B18 | Đạt | Bảng hệ thống, dạng bài, bảng bẫy lỗi đúng. Ví dụ mẫu CO (−283,0; 56,6 kJ) và C₂H₆ (−84,0 kJ/mol) đúng. |

Worked examples không trùng câu luyện tập; quick_check (6 mã) đúng. Bảng Eb nhất quán với Chương 3 (H–H 436, Cl–Cl 243, H–Cl 431, O=O 498, N≡N 945).

### Thuật ngữ (T-401 – T-415)

| Nhóm | Kết luận | Ghi chú |
|---|---|---|
| T-401 – T-405, T-407 – T-415 | Đạt | IPA Anh – Anh đúng (enthalpy /ˈen.θəl.pi/, exothermic /ˌek.səʊˈθɜː.mɪk/, thermochemical /ˌθɜː.məʊˈkem.ɪ.kəl/, product /ˈprɒd.ʌkt/). |
| T-406 | Đã sửa | "Trạng thái bền nhất của một chất" chưa chính xác (dạng bền nhất chỉ là quy ước chọn cho đơn chất) → "trạng thái quy ước ở điều kiện chuẩn (chất nguyên chất, 1 bar); với đơn chất chọn dạng bền nhất". |

---

## (d) Danh sách sửa đã làm

| # | Vị trí | Trước | Sau | Lí do |
|---|---|---|---|---|
| 1 | Q-B17-009, Q-B17-014 `tolerance` | 0,1 | 0,05 | Đáp án làm tròn hàng phần mười; theo CONTENT_GUIDE. |
| 2 | Q-B17-002 lời giải | "đã dùng trước đây" | "dùng trong tài liệu cũ" | HS CT 2018 không học đktc 0 °C. |
| 3 | Q-B17-019 B | phương trình không ghi trạng thái | H₂O(g), −285,8 kJ (null) + "Lưu ý" mới | Bảo đảm B sai chắc chắn. |
| 4 | Q-B18-006 | CaCO₃ → CaO + CO₂, +178,4 | CaO + H₂O → Ca(OH)₂, −64,3 | Đáp án cũ in sẵn trong bài học. |
| 5 | Q-B18-007 B | null | M36 | Quên liên kết H–H = đếm thiếu liên kết. |
| 6 | M35 ví dụ | 2SO₂ + O₂ (trùng Q-B17-009) | 2NO + O₂ → 2NO₂ | Tránh lộ đáp án. |
| 7 | M36 ví dụ | H₂ + Cl₂ (trùng Q-B17-010) | 2H₂ + O₂ → 2H₂O(g) | Tránh lộ đáp án. |
| 8 | T-406 `definition_vi` | "trạng thái bền nhất của một chất" | định nghĩa quy ước | Chính xác thuật ngữ. |
| 9 | B17 mục 1 | — | thêm "Thí nghiệm đơn giản" + an toàn | YCCĐ thí nghiệm; tự học trước. |
| 10 | B17 mục 2 | "điều kiện tiêu chuẩn … đã học trước đây" | "đktc … tài liệu cũ"; thêm 24,79 L/mol ở 25 °C, 1 bar | Đúng chương trình mới. |
| 11 | B17 mục 4 | "(như NO, NO₂) kém bền, dễ phân hủy" | "(như NO) kém bền hơn về năng lượng…" | NO₂ không dễ phân hủy ở điều kiện thường. |
| 12 | B17 mục 4 bảng | "đối chiếu bảng phụ lục SGK…" | ghi nguồn NIST/CRC, ví dụ chênh lệch, "dùng số liệu trong đề"; thêm O₃, Ca(OH)₂ | Minh bạch số liệu (mục e). |
| 13 | B17 mục 6 bảng Eb | "đối chiếu bảng SGK" | nêu thống nhất với C3, chênh 1–3 kJ/mol, "dùng số liệu trong đề" | Như trên. |

Không đổi `id`, không đổi `reviewed`; thuật ngữ chỉ tham chiếu T-401…T-415.

---

## (e) Quyết định của chuyên gia (đã áp dụng – GV có thể đổi lại)

| # | Vấn đề | Quyết định đã áp dụng | Nếu GV muốn đổi lại |
|---|---|---|---|
| 1 | Nguồn số liệu ΔfH°, Eb (NIST/CRC làm tròn vs bảng SGK) | Giữ số tham khảo làm tròn 0,1 kJ/mol ở bảng bài học, ghi rõ nguồn và "có thể chênh với SGK"; **mọi câu hỏi đều cho số liệu ngay trong đề** (đã kiểm: 30/30 câu tính toán tự đủ dữ kiện), nên đáp án tự nhất quán bất kể bảng. | Thay bảng bằng đúng số phụ lục SGK GV dùng; không cần sửa câu hỏi. |
| 2 | Giá trị SGK KNTT nhớ được (không chắc chắn tuyệt đối) | Theo trí nhớ, KNTT ghi CaCO₃ → CaO + CO₂ **+178,49 kJ** và dùng số 2 chữ số thập phân (CO₂ −393,50; H₂O(l) −285,84; CaCO₃ −1206,92); C=C trong bảng Eb có thể là **611 hoặc 612** (bài dùng 614), Fe₂O₃ có thể −825,5, Al₂O₃ −1676. Không đổi số trong dữ liệu vì chưa chắc; ghi chú trong bài. | GV đối chiếu phụ lục SGK; nếu C=C khác, chỉ cần sửa bảng B17 và đề Q-B18-007/008 (đáp án tính lại: 2706/2831 thay theo số mới). |
| 3 | Câu "đktc 0 °C, 1 atm" | Gọi là "tài liệu cũ", không "đã học trước đây"; vẫn giữ làm nhiễu M37 vì HS gặp trong sách tham khảo cũ. | Bỏ hẳn nhắc đktc nếu GV thấy gây nhiễu. |
| 4 | Q-B18-006 trùng số liệu bài học | Thay bằng phản ứng tôi vôi (−64,3 kJ). | Khôi phục câu nung đá vôi và bỏ ví dụ +178,4 khỏi bài học. |
| 5 | `tolerance` câu `short` làm tròn 0,1 | 0,05 (chặt theo CONTENT_GUIDE; không gợi ý sai nào rơi vào khoảng). | Để 0,1 nếu muốn chấp nhận sai số bấm máy. |
| 6 | Lỗi "ghi sai trạng thái chất" | Không lập mã mới (danh mục M33–M37 đã chốt); để null. | Đề xuất mã mới trong danh mục M (cần GV chốt). |
| 7 | Thí nghiệm nhiệt phân Cu(OH)₂ | Dùng làm ví dụ thu nhiệt (đã có trong bảng ví dụ của bài). | Thay bằng thí nghiệm khác theo SGK/điều kiện phòng thí nghiệm của trường. |
| 8 | T-410 "energy diagram" | Giữ (dễ hiểu với HS); thuật ngữ Anh chặt hơn là "enthalpy (level/profile) diagram". | Đổi `en` thành "enthalpy profile diagram" (cần sửa IPA tương ứng). |

---

## (f) Nhận xét chung về ngân hàng câu hỏi

- **Độ chính xác:** tốt. Không câu nào sai đáp án; mọi ΔrH°₂₉₈ (11 phép tính ΔfH°, 7 phép tính Eb) và mọi gợi ý `short` đã tính lại khớp. Vấn đề đáng kể nhất là lộ đáp án (Q-B18-006 trong bài học; M35/M36 ví dụ trùng Q-B17-009/010) và một phương án nhiễu mơ hồ (Q-B17-019 B).
- **Gắn mã lỗi:** 46/54 nhiễu mcq có mã; các null còn lại là nhiễu tính toán/khái niệm không thuộc M33–M37 – hợp lí.
- **Mức độ:** NB 27% / TH 43% / VD 30% – sát 25/45/30.
- **Phạm vi:** chỉ dùng Chương 1–5; tính từ Eb chỉ cho phản ứng toàn chất khí; công thức cấu tạo (C₂H₄, C₂H₆) được cho trong đề.
- **Định dạng:** 6/6 câu đúng/sai đều 2 đúng – 2 sai; có thể đa dạng 1–3 ở lần soạn sau. Q-B18-004 gần trùng ý Q-B17-017.
- **Gợi ý bổ sung sau:** 1 câu đọc sơ đồ có số liệu (tính ΔrH từ hai mức enthalpy), 1 câu so sánh nhiệt lượng tỏa ra khi đốt cùng khối lượng hai nhiên liệu (ứng dụng thực tiễn).

**Việc còn lại cho HS/GV:** ghi nhật ký AI; GV duyệt các câu đã sửa, các quyết định ở mục (e) và đối chiếu số liệu bảng với phụ lục SGK.
