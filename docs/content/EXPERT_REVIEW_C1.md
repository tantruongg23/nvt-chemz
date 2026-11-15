# Rà soát chuyên môn nội dung Chương 1 – Cấu tạo nguyên tử

> **Rà soát bởi agent AI đóng vai chuyên gia, ngày 15/11/2026 – không thay thế phê duyệt của giáo viên hướng dẫn.**
> Mọi câu vẫn giữ `reviewed: false`. Các sửa đổi dưới đây cần được ghi vào `docs/management/AI_USAGE_LOG.md` và được GV xem lại.

Phạm vi rà soát: `web/data/misconceptions.json` (M1–M10), `web/data/lessons.json` (B1–B4), `web/data/terms.json` (T-001 – T-032), `web/data/questions.json` (60 câu ban đầu, nay 61 câu), `docs/research/DE_KIEM_TRA_TRUOC_SAU_C1.md` (đề pre/post). Đối chiếu: SGK Hóa học 10 KNTT, yêu cầu cần đạt (YCCĐ) CT GDPT 2018, `docs/content/CONTENT_GUIDE.md`, `docs/CONTRACT.md` mục 3. Mọi phép tính đã được tính lại độc lập. Sau khi sửa: `node docs/content/validate.js web/data` → **ALL CHECKS PASSED** (61 câu: mcq 36, true_false 13, short 12; NB 15 / TH 30 / VD 16).

Quá trình gồm hai vòng: **vòng 1** – rà soát, sửa lỗi rõ ràng, liệt kê điểm cần GV quyết định; **vòng 2** – theo yêu cầu của GV, chuyên gia tự quyết định và áp dụng các điểm đó (mục e), thêm câu Q-B2-017 và rà soát đề pre/post (mục g).

**Tổng hợp 61 câu:** Đạt 44 · Đã sửa 16 · Mới thêm 1 (Q-B2-017).

---

## (b) Kết quả từng câu hỏi

| Mã câu | Kết luận | Ghi chú ngắn |
|---|---|---|
| Q-B1-001 | Đạt | Đúng, NB. |
| Q-B1-002 | Đã sửa | Phương án B "phân bố đều giữa…" không nối được với câu dẫn → viết lại. |
| Q-B1-003 | Đạt | 9,109 × 10⁻³¹ / 1,6605 × 10⁻²⁷ ≈ 0,00055 amu. |
| Q-B1-004 | Đạt | Loại trừ ¹H hợp lí. |
| Q-B1-005 | Đạt | N = 12; nhiễu 11, 34, 23 đúng M3. |
| Q-B1-006 | Đã sửa | Phương án B (11 p, 12 e – nhầm chiều) gắn M9 (theo mô tả M9 mở rộng); thêm "Lưu ý" trong lời giải. |
| Q-B1-007 | Đạt | 4Z = 44 → Z = 11. Nhiễu 23 (= A) gắn M3 khớp mô tả M3 mới. |
| Q-B1-008 | Đạt | Fe chỉ dùng để tính N = A − Z, không cần cấu hình → trong phạm vi. |
| Q-B1-009 | Đạt | N = 20; 58 = 39 + 19 (M3); K⁺ vẫn 19 p (M9). |
| Q-B1-010 | Đạt | Ý d để null hợp lí. |
| Q-B1-011 | Đạt | Đúng. |
| Q-B1-012 | Đã sửa | Thêm gợi ý {"value": "14", "misconception": "M9"} (trừ thay vì cộng – nhầm chiều). |
| Q-B1-013 | Đạt | 13 + 14 + 13 = 40 (M2). |
| Q-B1-014 | Đạt | 3Z + 1 = 52 → Z = 17, A = 35. |
| Q-B2-001 | Đạt | Đúng định nghĩa KNTT. |
| Q-B2-002 | Đã sửa | Phương án B "…là 17" (gắn M1, sai bản chất) → "…là 35" (lấy số khối thay nguyên tử khối trung bình); thêm "Lưu ý". |
| Q-B2-003 | Đã sửa | "có khác số proton" → "khác số proton" (B, C). |
| Q-B2-004 | Đạt | Ar/Ca cùng A; K/Ca cùng N = 20. |
| Q-B2-005 | Đạt | Đúng. |
| Q-B2-006 | Đã sửa | Mức VD → TH (áp dụng trực tiếp công thức). Tính đúng 10,8. |
| Q-B2-007 | Đã sửa | Thêm "(số liệu dùng cho bài tập)": ⁶⁵Cu 27% theo SBT, thực tế ≈ 30,9%. |
| Q-B2-008 | Đạt | Đúng. |
| Q-B2-009 | Đạt | Đúng. |
| Q-B2-010 | Đạt | 2432/100 = 24,32 (thực tế 24,305). |
| Q-B2-011 | Đã sửa | Thêm "(làm tròn đến hàng phần mười)". |
| Q-B2-012 | Đã sửa | Mức VD → TH; thêm "(số liệu dùng cho bài tập)". 6354/100 = 63,54. |
| Q-B2-013 | Đạt | Đúng. |
| Q-B2-014 | Đạt | Đúng. |
| Q-B2-015 | Đã sửa | **Lỗi chấm:** tolerance 0,01 khiến "80" (gợi ý M5) được chấm đúng (máy chấm so ≤ tol + 1e-9). Đổi thành 0,005. |
| Q-B2-016 | Đạt | Đúng. |
| Q-B2-017 | Mới thêm | Phổ khối lượng silicon (m/z 28/29/30, cường độ 100/5,1/3,4) → A̅ = 3049,9/108,5 ≈ 28,11; VD; gợi ý 29 (trung bình cộng) và 30,5 (chia 100 thay vì tổng cường độ) gắn M5. Thực tế 28,085 – sát. |
| Q-B3-001 | Đạt | Đúng (~90%). |
| Q-B3-002 | Đạt | Đúng. |
| Q-B3-003 | Đạt | Đúng. |
| Q-B3-004 | Đạt | Đúng. |
| Q-B3-005 | Đạt | Đúng. |
| Q-B3-006 | Đạt | Đúng. |
| Q-B3-007 | Đã sửa | Fe (Z = 26) vượt YCCĐ → thay bằng: tổng hạt 60, mang điện gấp đôi không mang điện → Z = 20 (Ca), chọn cấu hình. Giữ mcq, VD, nhiễu 3d² (M7), 3p⁸ (M8), 4s¹4p¹ (null). Đáp án C. |
| Q-B3-008 | Đạt | Đúng. |
| Q-B3-009 | Đã sửa | Ý c (4 e độc thân ở 3p⁴ – phân bố ô orbital sai) gắn M7 theo mô tả M7 mở rộng (gồm quy tắc Hund). |
| Q-B3-010 | Đạt | Đúng. |
| Q-B3-011 | Đã sửa | Fe vượt YCCĐ → thay bằng: tổng e phân lớp p là 9 → 2p⁶3p³ (P, Z = 15) → 3 e độc thân. Giữ short, VD; gợi ý 1 (ghép đôi sai Hund) gắn M7. Không trùng Q-B3-017 (3p một e độc thân). |
| Q-B3-012 | Đạt | Đúng; gợi ý 9 đúng M7. |
| Q-B3-013 | Đạt | Đúng. |
| Q-B3-014 | Đạt | Đúng. |
| Q-B3-015 | Đã sửa | Viết lại "Lưu ý" cho gợi ý 18 và 16. |
| Q-B3-016 | Đạt | Đúng. |
| Q-B3-017 | Đạt | Al và Cl → 2. |
| Q-B4-001 | Đạt | Z = 13 (Al). |
| Q-B4-002 | Đạt | Đúng. |
| Q-B4-003 | Đã sửa | Mức VD → TH. 6,925 ≈ 6,93 đúng. |
| Q-B4-004 | Đã sửa | Phương án C (oxygen, Z = 10 − 2 – nhầm chiều) gắn M9. |
| Q-B4-005 | Đạt | Đúng. |
| Q-B4-006 | Đạt | x = 25%. |
| Q-B4-007 | Đạt | Đúng. |
| Q-B4-008 | Đạt | Đúng. |
| Q-B4-009 | Đạt | Đúng. |
| Q-B4-010 | Đạt | Z = 12, A = 24; gợi ý 23 đúng M9. |
| Q-B4-011 | Đạt | Đúng. |
| Q-B4-012 | Đạt | Đúng. |
| Q-B4-013 | Đạt | Đúng. |

---

## (c) Danh mục lỗi sai, bài học, thuật ngữ

### Danh mục M1–M10

| Mã | Kết luận | Ghi chú |
|---|---|---|
| M1 | Đạt | Mô tả, remedy, ví dụ đúng. |
| M2 | Đạt | 0,00055 amu; ≈ 1/1836 proton. |
| M3 | Đã sửa | Tên/mô tả mở rộng: "Đọc sai kí hiệu nguyên tử, nhầm lẫn giữa Z, N và A" – khớp cách gắn mã thực tế (hỏi Z hoặc A cũng dùng M3). |
| M4 | Đạt | Đúng. |
| M5 | Đạt | Đúng. |
| M6 | Đạt | Đúng định nghĩa KNTT. |
| M7 | Đã sửa | Mở rộng thành "Điền electron sai thứ tự (3d trước 4s, hoặc sai quy tắc Hund trong ô orbital)"; ví dụ Fe trong remedy thay bằng Ca (…3p⁶4s², không phải …3p⁶3d²) và N (2p³ ↑ ↑ ↑). |
| M8 | Đạt | Đúng. |
| M9 | Đã sửa | Mở rộng thành "Hiểu sai sự thay đổi số hạt khi nguyên tử tạo thành ion", gồm cả nhầm chiều (cation Z + n e, anion Z − n e). |
| M10 | Đạt | Đúng KNTT. |

Không thêm mã mới (M11–M48 dành cho Chương 2–7). **Lưu ý cho HS biên soạn:** bảng "cách tạo phương án nhiễu" ở `CONTENT_GUIDE.md` mục 4 (dòng M3, M7, M9) chưa cập nhật theo mô tả mới – tôi không được phép sửa file này.

### Bài học

| Bài | Kết luận | Ghi chú |
|---|---|---|
| B1 | Đạt | Số liệu đúng. Ion dạy sớm (KNTT đưa ion ở Chương 3) – chấp nhận vì HS đã học ở KHTN 7. |
| B2 | Đạt | Ne 20,182 đúng. Ví dụ Br đã ghi "số liệu dùng cho bài tập" (⁸¹Br 45,5%, thực tế ≈ 49,3%). YCCĐ phổ khối lượng nay có Q-B2-017. |
| B3 | Đã sửa | Bổ sung so sánh mô hình Rutherford – Bohr / hiện đại; ví dụ Fe → Ca; thêm câu "không ghép đôi khi còn ô trống"; bước 3 cách viết cấu hình ghi rõ phân lớp d là mở rộng. |
| B4 | Đã sửa | "s2 p6 d10 f14" → chỉ số Unicode; bảng "Bẫy lỗi sai" cập nhật dòng M3, M7, M9 theo mô tả mới. |

### Thuật ngữ (T-001 – T-032)

| Nhóm | Kết luận | Ghi chú |
|---|---|---|
| B1: T-001 – T-011 | Đạt | IPA khớp Cambridge (UK). |
| B2: T-012 – T-020 | Đạt | Đúng. |
| B3: T-021 – T-032 | Đạt | Đúng. Góp ý không bắt buộc: T-008 có thể ghi /iˌlek.trɒn ˈklaʊd/. |

---

## (d) Danh sách sửa đã làm

### Vòng 1 – lỗi rõ ràng

| # | Vị trí | Trước | Sau | Lí do |
|---|---|---|---|---|
| 1 | Q-B1-002 B | "phân bố đều giữa hạt nhân và lớp vỏ." | "cả hạt nhân và lớp vỏ, mỗi phần chiếm khoảng một nửa." | Sai ngữ pháp với câu dẫn. |
| 2 | Q-B2-002 B | "…là 17." (M1) | "…là 35." (M1) + "Lưu ý" | 17 không phải bản chất M1. |
| 3 | Q-B2-003 B, C | "có khác số proton" | "khác số proton" | Diễn đạt. |
| 4 | Q-B2-011 đề | (không nói làm tròn) | "(làm tròn đến hàng phần mười)" | CONTENT_GUIDE 3.3. |
| 5 | Q-B2-015 `tolerance` | 0.01 | 0.005 | "80" (M5) bị chấm đúng. |
| 6 | Q-B3-015 lời giải | Lưu ý thiếu 18, câu về 16 khó hiểu | Giải thích 18 và 16 | Khớp `misconception_hints`. |
| 7 | B3 "Orbital nguyên tử" | — | Thêm mô hình Rutherford – Bohr / hiện đại | YCCĐ 1 chưa có nội dung. |
| 8 | B4 bảng M8 | "s2 p6 d10 f14" | "s² p⁶ d¹⁰ f¹⁴" | Quy ước Unicode. |

### Vòng 2 – quyết định của chuyên gia

| # | Vị trí | Trước | Sau |
|---|---|---|---|
| 9 | Q-B3-007 | Cấu hình Fe (Z = 26), đáp án A | Tổng hạt 60 → Ca, chọn cấu hình, đáp án C |
| 10 | Q-B3-011 | Số e độc thân Fe = 4 | 9 e phân lớp p → P → 3 e độc thân; gợi ý 1 (M7) |
| 11 | Q-B2-006, Q-B2-012, Q-B4-003 | level VD | level TH |
| 12 | Q-B2-007, Q-B2-012 | "Copper có hai đồng vị" | "Copper có hai đồng vị (số liệu dùng cho bài tập)" |
| 13 | Q-B1-006 B; Q-B4-004 C | null | M9 (nhầm chiều) |
| 14 | Q-B1-012 | gợi ý chỉ có 16 | thêm 14 → M9 |
| 15 | Q-B3-009 c | null | M7 (phân bố ô orbital sai) |
| 16 | Q-B2-017 | — | Câu mới phổ khối lượng silicon (short, VD, M5) |
| 17 | M3, M7, M9 (title, description; remedy M7) | xem mục (c) | xem mục (c) |
| 18 | B3 mục "Cấu hình electron" | Ví dụ Fe …3d⁶4s² | Ví dụ Ca …3p⁶4s²; thêm ví dụ sai quy tắc Hund |
| 19 | B4 bảng "Bẫy lỗi sai" | Dòng M3, M7, M9 cũ | Theo mô tả mới |

Không đổi `id` cũ, không đổi `reviewed`, không sửa `terms.json`.

---

## (e) Quyết định của chuyên gia (đã áp dụng – GV có thể đổi lại)

| # | Vấn đề | Quyết định đã áp dụng | Nếu GV muốn đổi lại |
|---|---|---|---|
| 1 | Q-B3-007 cấu hình Fe vượt YCCĐ | Thay bằng Ca (qua bài toán tổng số hạt để giữ mức VD) | Khôi phục nội dung Fe và gắn nhãn "Mở rộng" |
| 2 | Q-B3-011 e độc thân Fe vượt YCCĐ | Thay bằng P (suy ngược từ 9 e phân lớp p) | Như trên |
| 3 | Ví dụ Fe ở B3 và M7 | **Thay bằng Ca** (không chỉ ghi "mở rộng"), vì HS dễ học thuộc ví dụ ngoài phạm vi; ⁵⁶₂₆Fe trong M3 và Q-B1-008 giữ lại vì chỉ dùng tính N = A − Z | Thêm lại ví dụ Fe kèm "(mở rộng)" |
| 4 | Mức độ 3 câu tính A̅ thuận | Đổi sang TH; tỉ lệ nay NB 25% / TH 49% / VD 26% | Đổi lại VD |
| 5 | Lỗi quy tắc Hund chưa có mã | Gộp vào **M7** (cùng bản chất "sai thứ tự điền electron"); gắn Q-B3-009 c, gợi ý Q-B3-011 | Để null và giữ M7 như cũ |
| 6 | Nhầm chiều thêm/bớt e khi tạo ion | Gộp vào **M9**; gắn Q-B1-006 B, Q-B4-004 C, gợi ý 14 của Q-B1-012 | Gỡ các tag này về null |
| 7 | M3 dùng rộng hơn tên gọi | Đổi tên/mô tả M3 | Giữ tên cũ và gắn null cho nhiễu hỏi A/Z |
| 8 | YCCĐ "phổ khối lượng" chưa có câu | Thêm Q-B2-017 (silicon) | Xóa Q-B2-017 |
| 9 | Số liệu Cu, Br khác thực tế | Thêm "(số liệu dùng cho bài tập)" vào Q-B2-007, Q-B2-012 (ví dụ Br ở B2 đã có sẵn) | — |
| 10 | "hóa" và "hoá" | Giữ "hóa" thống nhất toàn dự án | — |

**Việc còn lại cho HS/GV:** cập nhật bảng mục 4 của `CONTENT_GUIDE.md` (M3, M7, M9); ghi nhật ký AI; GV duyệt lại các câu đã sửa.

---

## (f) Nhận xét chung về ngân hàng câu hỏi

- **Độ chính xác:** rất tốt. Không câu nào sai đáp án; lỗi duy nhất ảnh hưởng chấm điểm là tolerance của Q-B2-015 (đã sửa).
- **Gắn mã lỗi:** 76/108 phương án nhiễu mcq có mã; sau khi mở rộng M3, M7, M9 thì các nhiễu trước đây phải để null (nhầm chiều tạo ion, sai quy tắc Hund) đã có mã.
- **Phạm vi:** nay bám đúng YCCĐ "20 nguyên tố đầu" cho cấu hình electron; Cr, Cu ngoại lệ vẫn loại trừ.
- **Độ phủ:** đủ 4 bài, 3 dạng câu, M1–M10; đã có câu phổ khối lượng. Còn thiếu (gợi ý bổ sung sau): câu về biểu diễn ô orbital của cả nguyên tử (chọn sơ đồ ô đúng), câu so sánh mô hình Rutherford – Bohr ở dạng đúng/sai.
- **Ngôn ngữ, thuật ngữ:** IUPAC, "neutron", Unicode, IPA Anh – Anh đều thống nhất.

---

## (g) Rà soát đề kiểm tra trước/sau (`docs/research/DE_KIEM_TRA_TRUOC_SAU_C1.md`)

Đã kiểm tra: đáp án đúng và duy nhất (40 câu kiến thức), mã lỗi của nhiễu, tính tương đương từng cặp A–B, trùng/gần trùng với `web/data/questions.json` (cả các câu vừa sửa), khóa đáp án mục 4, lời giải mục 5.

**Kết quả chung:** không câu nào sai đáp án; khóa đáp án mục 4 khớp 40/40 câu (cả trước và sau khi sửa – các câu viết lại giữ nguyên vị trí đáp án đúng). Lỗi chính là **gần trùng với ngân hàng luyện tập** (vi phạm chính yêu cầu "tài liệu kín" của đề) và một số cặp chưa tương đương.

| Câu | Kết luận | Vấn đề → cách sửa |
|---|---|---|
| A1, B1, A4, B4, A5, B5, A6, B6, A8, B8, A9, B9, B10, A14, A15, B15, A16, B16, A19, B19, A20, B20 | Đạt | Đáp án đúng, duy nhất. (B10: Li 6% theo số liệu đẹp, thực tế 7,6% – chấp nhận.) |
| A2, B2 | Đã sửa | Gần trùng Q-B2-005 (cùng mẫu phương án "số khối là 35,5 / trung bình theo tỉ lệ đồng vị"). Viết lại: cho hai đồng vị và A̅, hỏi "số khối của một nguyên tử bất kì" → 63 hoặc 65 / 79 hoặc 81; nhiễu A̅ (M1), A̅ làm tròn (M1), Z (M3). |
| A3 | Đã sửa | Dùng ²³Na trùng đúng ví dụ sai của M2 và bài B1 (HS được xem trên web) → đổi sang ³¹₁₅P (31 / 46 / 15 / 16 amu). |
| A7, B7 | Đã sửa | 3 cặp trùng nguyên văn Q-B2-004 (⁴⁰Ar/⁴⁰Ca, ¹⁴C/¹⁴N, ³⁹K/⁴⁰Ca). Thay bằng ³H/³He, ³⁶S/³⁶Ar (A7) và ⁴⁰K/⁴⁰Ca, ¹⁵N/¹⁵O, ²³Na/³⁵Cl (B7); hai đề cùng cấu trúc: 2 nhiễu cùng A (M4) + 1 cặp không liên quan. |
| A10 | Đã sửa | Gần trùng Q-B2-007 (63/65, hỏi % ⁶⁵Cu, nhiễu 75%, 50%). Đổi sang ¹⁰⁷X/¹⁰⁹X, A̅ = 107,9, hỏi % ¹⁰⁷X = 55% (giống B10 hỏi % đồng vị nhẹ); nhiễu 45% (M5), 50% (M5), 90% (quên chia 2). Số liệu bài tập (Ag thực tế 51,8%). |
| A11 | Đã sửa | Gần như trùng nguyên văn Q-B3-001 (cùng 4 phương án, cùng vị trí đáp án). Đổi thành câu về orbital 2pₓ, song song với B11 (orbital 1s). |
| A12 | Đạt | — |
| B12 | Đã sửa | Gần trùng Q-B3-013 (cùng câu dẫn, cùng đáp án). Đổi thành "Phát biểu nào về mô hình Rutherford – Bohr là đúng?", song song A12 (1 nhiễu M6 + 2 null). |
| A13 | Đã sửa | A13 (viết cấu hình Ca, TH) không tương đương B13 (phát biểu, NB) và có cùng 4 phương án với Q-B3-007 mới. Đổi thành câu phát biểu về cách điền electron (2 nhiễu M7 + 1 null), song song B13. |
| B13 | Đạt | — |
| B14 | Đã sửa | A14 hỏi "phân lớp của electron cuối" còn B14 hỏi "số lớp" – khác dạng. Đổi B14 thành "electron cuối của Y (19 e) điền vào phân lớp" (đáp án 4s, vẫn vị trí C). |
| A17, B17 | Đã sửa | Nhiễu nhầm chiều (13p 16e; 8p 6e) từ "—" → M9 theo mô tả M9 mới. |
| A18 | Đã sửa | Gần trùng Q-B4-004 (ion 2+ có 10 e → Z = 12). Đổi thành ion X²⁺ có 18 e → Z = 20; nhiễu 18 (M9), 16 (M9 – nhầm chiều), 2 (—). (Không dùng X³⁺ 10 e vì A17 đã cho Al³⁺ có 10 e.) |
| B18 | Đã sửa | Nhiễu 19 (nhầm chiều) → M9. |
| Phần II (thuật ngữ) | Đạt | Cặp A–B cùng nhóm, độ quen thuộc tương đương. Lưu ý: các thuật ngữ này trùng `terms.json` – không tránh được vì đề đo đúng việc học thuật ngữ. |
| Mục 4 (khóa) | Đạt | Khớp mọi câu sau khi sửa. |
| Mục 5 (lời giải) | Đã sửa | Cập nhật A3, A10, A18; thêm lời giải A2/B2. Các lời giải A9, B9, B10, A19, B19 tính lại đúng. |

**Còn lưu ý cho GV (không sửa):** A16 có 1 nhiễu M8, B16 có 2 nhiễu M8 – lệch nhẹ về số nhiễu có mã, có thể chấp nhận. Một số câu cùng *dạng* với ngân hàng (tính số neutron, tính A̅ thuận) là không tránh khỏi; đã bảo đảm không câu nào dùng cùng nguyên tố và cùng số liệu với ngân hàng ở cùng dạng câu.
