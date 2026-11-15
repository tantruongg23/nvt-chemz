# Rà soát chuyên môn nội dung Chương 2 – Bảng tuần hoàn các nguyên tố hóa học

> **Rà soát bởi agent AI đóng vai chuyên gia, ngày 15/11/2026 – không thay thế phê duyệt của giáo viên hướng dẫn.**
> Mọi câu vẫn giữ `reviewed: false`. Các sửa đổi dưới đây cần được ghi vào `docs/management/AI_USAGE_LOG.md` và được GV xem lại.

Phạm vi rà soát: `web/data/c2/misconceptions.json` (M11–M18), `web/data/c2/lessons.json` (B5–B9), `web/data/c2/terms.json` (T-101 – T-125), `web/data/c2/questions.json` (50 câu). Đối chiếu: SGK Hóa học 10 KNTT, yêu cầu cần đạt (YCCĐ) CT GDPT 2018 chủ đề "Bảng tuần hoàn các nguyên tố hóa học", `docs/content/CONTENT_GUIDE.md`, `docs/CONTRACT.md` mục 3, mẫu Chương 1 (`EXPERT_REVIEW_C1.md`). Mọi phép tính (phần trăm khối lượng, tổng hạt, tổng proton) đã được tính lại độc lập; mọi đáp án đã được giải lại.

Theo yêu cầu của GV, chuyên gia **tự quyết định** các điểm chuyên môn chưa chắc chắn và đã áp dụng ngay (mục e) – GV có thể đổi lại.

Sau khi sửa: `node docs/content/validate.js web/data/c2` → **ALL CHECKS PASSED** (50 câu: mcq 30, true_false 11, short 9; NB 12 / TH 24 / VD 14 = 24% / 48% / 28%; 56/90 phương án nhiễu mcq có mã lỗi).

**Tổng hợp 50 câu:** Đạt 44 · Đã sửa 6 · Mới thêm 0.

---

## (b) Kết quả từng câu hỏi

| Mã câu | Kết luận | Ghi chú ngắn |
|---|---|---|
| Q-B5-001 | Đạt | Đúng nguyên tắc sắp xếp KNTT. |
| Q-B5-002 | Đạt | Nhiễu A, C gắn M11 đúng. |
| Q-B5-003 | Đạt | Đúng. |
| Q-B5-004 | Đạt | 3 đúng / 1 sai, d gắn M11. |
| Q-B5-005 | Đã sửa | Nhiễu C "chu kì 3, nhóm IVA" (chỉ đếm 3p⁴) từ null → **M11** (M11 đã mở rộng gồm "đếm sai electron lớp ngoài cùng"). |
| Q-B5-006 | Đạt | Nhiễu B "nhóm IIB" (M12) nay khớp mô tả M12 mở rộng (xếp nguyên tố s vào nhóm B). |
| Q-B5-007 | Đạt | Fe: a + b = 8 → VIIIB; cấu hình cho sẵn trong đề. |
| Q-B5-008 | Đạt | 8 electron hóa trị; gợi ý 2, 6 (M12) đúng. |
| Q-B5-009 | Đạt | Đúng. |
| Q-B5-010 | Đã sửa | Mức VD → **TH** (cấu hình Mn cho sẵn, áp dụng trực tiếp quy tắc). Đáp án đúng (VIIB). |
| Q-B5-011 | Đạt | X²⁺ 10 e → Mg; nhiễu D (IIB) khớp M12 mở rộng. |
| Q-B5-012 | Đạt | Mg → 24; gợi ý 10 (đảo chu kì – nhóm → Z = 5) đúng M11. |
| Q-B6-001 | Đạt | Đúng. |
| Q-B6-002 | Đạt | Số liệu F, Cl, Br, I đúng thang Pauling. |
| Q-B6-003 | Đạt | Đúng; caesium viết theo IUPAC. |
| Q-B6-004 | Đạt | Al < Mg < Na < K. |
| Q-B6-005 | Đạt | Si 1,90 < P 2,19 < S 2,58 < Cl 3,16. |
| Q-B6-006 | Đạt | K. |
| Q-B6-007 | Đạt | O. |
| Q-B6-008 | Đạt | Đúng. |
| Q-B6-009 | Đạt | Đúng. |
| Q-B6-010 | Đạt | Mg < Na < K. |
| Q-B6-011 | Đạt | 17; không xét Ar nên không vướng bán kính khí hiếm. |
| Q-B6-012 | Đạt | 19; gợi ý 9, 11 đúng M13. |
| Q-B7-001 | Đạt | SO₃. |
| Q-B7-002 | Đạt | Đúng. |
| Q-B7-003 | Đã sửa | C "số thứ tự chu kì" và D "số lớp electron" là **cùng một ý** (hai nhiễu tương đương). D → "số hiệu nguyên tử." (null); bổ sung lời giải. |
| Q-B7-004 | Đạt | Đúng. |
| Q-B7-005 | Đạt | HClO₄. |
| Q-B7-006 | Đã sửa | Lời giải ý a minh họa "tác dụng với acid" bằng Na₂O + H₂O → sai minh họa; đổi thành Na₂O + 2HCl → 2NaCl + H₂O. |
| Q-B7-007 | Đạt | P₂O₅ → 7; gợi ý 5 (P₂O₃) đúng M16. |
| Q-B7-008 | Đạt | R/(R + 48) = 0,4 → 32; gợi ý 11 (RO) đúng. |
| Q-B7-009 | Đạt | 32/(R + 32) = 0,5333 → R = 28 (Si); RO₄ → R = 56 (Fe) đúng. Dùng nội dung mở rộng "hợp chất khí với hydrogen" (xem mục e). |
| Q-B7-010 | Đạt | Đúng; ý d dùng nội dung mở rộng. |
| Q-B8-001 | Đạt | Đúng phát biểu định luật tuần hoàn KNTT. |
| Q-B8-002 | Đạt | Đúng. |
| Q-B8-003 | Đạt | Đúng. |
| Q-B8-004 | Đạt | Đúng. |
| Q-B8-005 | Đạt | Đúng. |
| Q-B8-006 | Đạt | Al < Mg < Ca. |
| Q-B8-007 | Đạt | RH₂, chu kì 3 → S (16); gợi ý 12 đúng M16. Dùng nội dung mở rộng. |
| Q-B9-001 | Đạt | Đúng. |
| Q-B9-002 | Đạt | X₂O₅ / H₃XO₄. |
| Q-B9-003 | Đạt | Ti IVB; cấu hình cho sẵn. |
| Q-B9-004 | Đạt | Li 0,98 > Na 0,93 > K 0,82. |
| Q-B9-005 | Đạt | Mg, Al. (Ví dụ mẫu B9 trước đây trùng nguyên văn câu này – đã đổi ví dụ.) |
| Q-B9-006 | Đã sửa | Bổ sung lí do loại cặp ở chu kì 1–2 (H – Li hơn kém 2, không phải 8) để lời giải chặt chẽ. Đáp án C không đổi. |
| Q-B9-007 | Đạt | Đúng; ý b dùng nội dung mở rộng. |
| Q-B9-008 | Đã sửa | 112/0,612 = 183,01 → R = 35,50. `tolerance` 0,1 → **0,05** (đề yêu cầu làm tròn 1 chữ số thập phân; theo CONTENT_GUIDE 3.3). Gợi ý 5,1 (R₂O) đúng. |
| Q-B9-009 | Đạt | 5 + 3 = 8; gợi ý 10, 6 đúng. Dùng nội dung mở rộng. |

---

## (c) Danh mục lỗi sai, bài học, thuật ngữ

### Danh mục M11–M18

| Mã | Kết luận | Ghi chú |
|---|---|---|
| M11 | Đã sửa | Mở rộng thành "Xác định sai chu kì, nhóm A từ cấu hình electron (nhầm chu kì với nhóm, đếm sai electron lớp ngoài cùng)" – thêm biến thể rất phổ biến "chỉ đếm electron p" (3s²3p⁴ → IVA); `lessons` thêm B7 (Q-B7-003 C gắn M11). |
| M12 | Đã sửa | Mở rộng thành "Nhầm lẫn nhóm A – nhóm B", gồm cả chiều ngược (xếp nguyên tố s, p vào nhóm B) – khớp cách gắn mã ở Q-B5-006 B, Q-B5-011 D. |
| M13 | Đạt | Đúng. |
| M14 | Đạt | Đúng; F 3,98, Cl 3,16. |
| M15 | Đạt | Đúng. |
| M16 | Đã sửa | Remedy: quy tắc 8 − số nhóm ghi "(Mở rộng)". Bản chất lỗi (dùng hóa trị với hydrogen để viết oxide cao nhất) vẫn giữ vì vẫn xảy ra khi HS biết công thức HCl, H₂S, NH₃ từ KHTN. |
| M17 | Đạt | Đúng; thứ tự acid/base chu kì 3 khớp KNTT. |
| M18 | Đạt | Đúng. |

**Trùng/thiếu:** M13, M14, M15 cùng dạng "đảo chiều biến đổi" nhưng cho ba tính chất khác nhau – giữ tách để dashboard chỉ ra đúng tính chất HS yếu. Lỗi chưa có mã (để null, không đề xuất thêm mã vì dải M11–M18 đã cố định): (1) xác định vị trí theo cấu hình của **ion** thay vì nguyên tử (Q-B5-011 A – gần M9 Chương 1); (2) cho rằng bảng tuần hoàn hiện nay xếp theo nguyên tử khối (Q-B5-001 A, Q-B8-001 B). GV có thể cân nhắc gộp (2) vào M11 nếu thực nghiệm thấy phổ biến.

### Bài học

| Bài | Kết luận | Ghi chú |
|---|---|---|
| B5 | Đã sửa | "Đầu thế kỉ XIX … Newlands" sai mốc (Newlands 1865) → "Trong thế kỉ XIX, trước Mendeleev …" kèm năm. Thêm ngoại lệ helium cho quy tắc nhóm A. Bảng a + b nhóm B ghi "Mở rộng – chỉ dùng khi đề cho sẵn cấu hình". Ví dụ mẫu 2 (Fe, trùng Q-B5-007 và tự viết cấu hình Z = 26) → zinc (Z = 30), **cho sẵn cấu hình**, minh họa a + b = 12 → IIB. |
| B6 | Đã sửa | Ví dụ mẫu 1 trùng nguyên văn bộ nguyên tố của Q-B6-004 (câu quick_check) → đổi sang Mg, Al, K, Ca (Al < Mg < Ca < K). Mục năng lượng ion hóa giữ là "Mở rộng" (không câu hỏi nào dựa vào). Bảng độ âm điện Pauling đúng. |
| B7 | Đã sửa | Phần "hợp chất khí với hydrogen" (summary, section, key_formulas) gắn nhãn "Mở rộng". Giữ Na[Al(OH)₄], thêm cách viết gọn NaAlO₂ trong ngoặc. Các phương trình đã kiểm tra cân bằng. |
| B8 | Đã sửa | Gắn "(mở rộng)" cho hóa trị với hydrogen ở section và key_formulas. |
| B9 | Đã sửa | Ví dụ Dạng 3 (RO₃ 40% R) trùng Q-B7-008 → RO 60% R → Mg. Dạng 4 "hai chu kì nhỏ liên tiếp: ΔZ = 8" sai với chu kì 1–2 (H – Li: 2) và cần lưu ý chu kì 3–4 → viết lại chính xác. Ví dụ mẫu 1 (tổng proton 25) trùng Q-B9-005 → tổng 23 (Na, Mg). Ví dụ mẫu 2 (R₂O₇, 61,2% O) trùng Q-B9-008 → R₂O₅ có 43,66% R → P. |

Objectives B5–B8 khớp YCCĐ CT 2018 (B5 mục 2 có thêm "(nhóm A, nhóm B)" – diễn giải, chấp nhận). quick_check của các bài trỏ đúng câu có thật và đúng bài.

### Thuật ngữ (T-101 – T-125)

| Nhóm | Kết luận | Ghi chú |
|---|---|---|
| B5: T-101 – T-110 | Đã sửa | IPA khớp Cambridge (UK). T-103: thêm "(trừ helium)". |
| B6: T-111 – T-117 | Đạt | IPA đúng (electronegativity /iˌlek.trəʊ.neɡ.əˈtɪv.ə.ti/, radius /ˈreɪ.di.əs/). |
| B7: T-118 – T-123 | Đã sửa | T-119: định nghĩa cũ "hợp chất tương ứng với oxide cao nhất khi kết hợp với nước" không đúng với Mg(OH)₂, Al(OH)₃ (MgO, Al₂O₃ không tạo hydroxide với nước) → viết lại. |
| B8: T-124 – T-125 | Đạt | Định luật tuần hoàn đúng nguyên văn KNTT. |

---

## (d) Danh sách sửa đã làm

| # | Vị trí | Trước | Sau | Lí do |
|---|---|---|---|---|
| 1 | Q-B5-005 C | misconception null | M11 | Lỗi "chỉ đếm electron 3p" nay thuộc M11 mở rộng. |
| 2 | Q-B5-010 `level` | VD | TH | Cấu hình cho sẵn, một bước áp dụng quy tắc. |
| 3 | Q-B7-003 D | "số lớp electron của nguyên tử." (M11) | "số hiệu nguyên tử." (null) | Trùng ý với phương án C. |
| 4 | Q-B7-006 lời giải a | Na₂O + H₂O → 2NaOH (minh họa tác dụng với acid) | Na₂O + 2HCl → 2NaCl + H₂O | Phương trình không minh họa đúng ý. |
| 5 | Q-B9-006 lời giải | — | Thêm lí do loại chu kì 1–2 | Lời giải chặt chẽ. |
| 6 | Q-B9-008 `tolerance` | 0.1 | 0.05 | Làm tròn 1 chữ số thập phân. |
| 7 | M11 title/description/remedy/lessons | Nhầm chu kì với nhóm | + đếm sai electron lớp ngoài cùng; lessons + B7 | Khớp cách gắn mã. |
| 8 | M12 title/description | Chỉ chiều "nguyên tố d → nhóm A" | + chiều "nguyên tố s, p → nhóm B" | Khớp Q-B5-006 B, Q-B5-011 D. |
| 9 | M16 remedy | Quy tắc 8 − nhóm như kiến thức chính | Ghi "(Mở rộng)" | Quyết định e-1. |
| 10 | T-103, T-119 | xem mục (c) | xem mục (c) | Chính xác khái niệm. |
| 11 | B5 section 1 | "Đầu thế kỉ XIX … Newlands" | "Trong thế kỉ XIX, trước Mendeleev … (1829; 1865)" | Sai mốc thời gian. |
| 12 | B5 section nhóm | — | Ngoại lệ helium; nhãn "Mở rộng" cho bảng a + b | Chính xác; phạm vi YCCĐ. |
| 13 | B5 worked_examples[1] | Fe (tự viết cấu hình Z = 26) | Zn, cấu hình cho sẵn → IIB | Ngoài 20 nguyên tố đầu; trùng Q-B5-007. |
| 14 | B6 worked_examples[0] | Na, Mg, Al, K | Mg, Al, K, Ca | Trùng Q-B6-004 (quick_check). |
| 15 | B7 summary[1], section 1, key_formulas[1] | Hợp chất khí với hydrogen như nội dung chính | Gắn nhãn "Mở rộng" | Quyết định e-1. |
| 16 | B7 section 2, 3 | Chỉ Na[Al(OH)₄] | + "(viết gọn: NaAlO₂ …)" | Quyết định e-3. |
| 17 | B8 section 3, key_formulas[1] | — | "(mở rộng)" | Quyết định e-1. |
| 18 | B9 summary[3], key_formulas[2] | — | "(mở rộng)" | Quyết định e-1. |
| 19 | B9 section Dạng 3 | RO₃ 40% R → S | RO 60% R → Mg | Trùng Q-B7-008. |
| 20 | B9 section Dạng 4, key_formulas[4] | "hai chu kì nhỏ liên tiếp: ΔZ = 8 (chu kì lớn 18 hoặc 32)" | "chu kì 2 và 3: ΔZ = 8; chu kì 3–4: 8 (IA, IIA) hoặc 18 (IIIA–VIIIA)" | Phát biểu cũ sai với chu kì 1–2, mơ hồ với chu kì 3–4. |
| 21 | B9 worked_examples[0] | Tổng proton 25 (Mg, Al) | Tổng proton 23 (Na, Mg) | Trùng Q-B9-005. |
| 22 | B9 worked_examples[1] | R₂O₇, 61,2% O → Cl | R₂O₅, 43,66% R → P (2R/(2R + 80) = 0,4366 → R ≈ 31,0) | Trùng Q-B9-008. |

Không đổi `id`, không đổi `reviewed`, thuật ngữ chỉ tham chiếu T-101 – T-125, định dạng JSON (2 dấu cách) giữ nguyên.

---

## (e) Quyết định của chuyên gia (đã áp dụng – GV có thể đổi lại)

| # | Vấn đề | Quyết định đã áp dụng | Nếu GV muốn đổi lại |
|---|---|---|---|
| 1 | "Hợp chất khí với hydrogen" và quy tắc 8 − số nhóm có trong SGK KNTT 10 không | YCCĐ CT 2018 chỉ nói "thành phần và tính chất acid/base của các **oxide và hydroxide**"; Bài 7 KNTT trình bày oxide cao nhất và hydroxide, không đặt quy tắc 8 − số nhóm thành nội dung chính (đây là nội dung SGK cũ, vẫn hay gặp trong sách bài tập/đề kiểm tra). → **Giữ, gắn nhãn "Mở rộng"** trong B7, B8, B9, M16. **Giữ** các câu dùng quy tắc này: Q-B7-009, Q-B7-010 d, Q-B8-007, Q-B9-007 b, Q-B9-009 (và Q-B7-003 B, Q-B7-006 c chỉ dùng như phương án nhiễu/giải thích). M16 giữ nguyên bản chất | Nếu GV coi là kiến thức chính: bỏ các nhãn "(mở rộng)". Nếu GV muốn loại hẳn: ẩn/xóa 5 câu trên và rút M16 về "nhầm hóa trị cao nhất với oxygen" |
| 2 | Năng lượng ion hóa ở B6 | Không có trong YCCĐ và KNTT 10 → **giữ ở mục "Mở rộng"** (đã có sẵn), không câu hỏi nào dựa vào; giữ T-113 làm thuật ngữ tham khảo | Xóa mục mở rộng nếu muốn bài gọn |
| 3 | Al(OH)₃ + NaOH | **Giữ Na[Al(OH)₄]** (cách viết của SGK mới, đúng bản chất phức hydroxo) và thêm cách viết gọn NaAlO₂ trong ngoặc để HS không bối rối khi gặp tài liệu khác | Đổi hẳn sang NaAlO₂ + 2H₂O nếu GV dạy theo cách đó |
| 4 | Bảng độ âm điện Pauling | Số liệu trong B6 (Li 0,98 … F 3,98; Na 0,93 … Cl 3,16; K 0,82; Ca 1,00) và trong lời giải (Br 2,96; I 2,66) là giá trị Pauling chuẩn, khớp bảng tuần hoàn dùng trong SGK → **giữ nguyên** | — |
| 5 | Ti (Z = 22), Mn (Z = 25), Fe (Z = 26) làm ví dụ nhóm B | YCCĐ yêu cầu biết khái niệm nhóm B và phân loại nguyên tố d, nhưng chỉ yêu cầu viết cấu hình 20 nguyên tố đầu. → **Giữ các câu Q-B5-007, Q-B5-008, Q-B5-010, Q-B9-003** vì **đề đã cho sẵn cấu hình**; bảng a + b ở B5 gắn nhãn "Mở rộng"; ví dụ mẫu Fe (HS phải tự viết cấu hình) đổi sang Zn có cấu hình cho sẵn; hạ Q-B5-010 xuống TH | Nếu GV muốn chặt hơn: chỉ giữ Q-B5-007 (Fe) và đổi Q-B5-010, Q-B9-003 thành câu "nguyên tố d thuộc nhóm A hay B" |
| 6 | Mở rộng M11 (đếm sai e lớp ngoài cùng) và M12 (xếp nguyên tố s, p vào nhóm B) | Áp dụng như mục (c) để các nhiễu phổ biến có mã | Thu hẹp lại và gắn null cho Q-B5-005 C, Q-B5-006 B, Q-B5-011 D |
| 7 | Ví dụ mẫu trùng câu luyện tập | Đổi 5 ví dụ (B5, B6, B9 ×3) để HS không "học thuộc đáp án" trước khi luyện | Khôi phục nếu GV muốn ví dụ là câu mẫu của chính bài |

---

## (f) Nhận xét chung về ngân hàng câu hỏi

- **Độ chính xác:** tốt. Không câu nào sai đáp án, không câu mcq có hai đáp án đúng, các ý đúng/sai rõ ràng. Lỗi chủ yếu nằm ở lời giải (một minh họa sai phương trình), một cặp nhiễu trùng ý và tolerance.
- **Gắn mã lỗi:** 56/90 nhiễu mcq có mã; mã gắn đúng bản chất sau khi mở rộng M11, M12. Các nhiễu null còn lại là nhiễu "ngẫu nhiên" hợp lí.
- **Mức độ:** NB 24% / TH 48% / VD 28% – sát đích 25/45/30.
- **Phạm vi:** chỉ dùng kiến thức Chương 1–2; nội dung vượt YCCĐ (hydrogen 8 − n, a + b nhóm B, năng lượng ion hóa) đã được gắn nhãn "Mở rộng" và luôn cho sẵn dữ kiện cần thiết.
- **Độ phủ:** đủ 5 bài, 3 dạng câu, M11–M18 đều có câu. Còn thiếu (gợi ý bổ sung sau): câu về lịch sử bảng tuần hoàn (Mendeleev để trống ô, dự đoán Ga, Ge); câu phân loại nguyên tố s/p/d/f dạng đúng/sai; câu viết phương trình minh họa tính lưỡng tính (có thể ở dạng chọn phương trình đúng).
- **Ngôn ngữ, thuật ngữ:** tên IUPAC (sodium, aluminium, sulfur, caesium…), kí hiệu nhóm IA…VIIIA, IIIB…IIB, Unicode, IPA Anh – Anh đều thống nhất.

**Việc còn lại cho HS/GV:** ghi nhật ký AI; GV duyệt lại 6 câu đã sửa và các quyết định ở mục (e); cập nhật bảng "cách tạo phương án nhiễu" cho M11–M18 trong `CONTENT_GUIDE.md` mục 4 (tôi không sửa file này).
