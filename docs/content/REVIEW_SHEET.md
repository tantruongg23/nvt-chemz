# Phiếu kiểm duyệt câu hỏi – Chương 1 (KNTT Hóa 10)

Nguồn dữ liệu: `web/data/questions.json` (40 câu, tất cả đang `"reviewed": false`).
Thầy/cô đánh dấu ✓ (đạt) hoặc ✗ (cần sửa) và ghi chú lỗi cụ thể. Nhóm HS sẽ sửa rồi đổi `reviewed` thành `true` cho các câu đã đạt (xem `CONTENT_GUIDE.md`, mục 6).

Kí hiệu cột "Đáp án": câu Đúng/Sai ghi dạng `aĐ bS …` (Đ = đúng, S = sai). Câu trả lời ngắn dùng dấu chấm thập phân (35.5 = 35,5).

## Ưu tiên kiểm tra trước
1. **Q-B1-010 (d) và lessons.json bài B1**: tỉ lệ kích thước nguyên tử/hạt nhân ≈ 10 000 lần (10⁻¹⁰ m / 10⁻¹⁴ m) – đề nghị đối chiếu số liệu SGK KNTT.
2. **Q-B2-007, Q-B2-012**: số liệu copper 73% / 27% là số liệu kiểu sách bài tập (số liệu thực ≈ 69% / 31%).
3. **Q-B4-003**: lithium 7,5% / 92,5% → 6,925, làm tròn 6,93.
4. **Q-B3-007, Q-B3-011**: cấu hình và số electron độc thân của Fe (3d⁶4s², 4 e độc thân) – kiểm tra cách viết cấu hình phù hợp với cách dạy trên lớp.
5. **Q-B3-008 (D), Q-B3-010 (c, d)**: quy tắc kim loại/phi kim theo số electron lớp ngoài cùng và ngoại lệ H, He, B.
6. Tên nguyên tố theo IUPAC/KNTT (sodium, potassium, aluminium, sulfur, iron, copper…).
7. **Q-B2-002 (B)** gắn M1 nhưng thực chất là đọc nhầm Z thành khối lượng – có nên đổi sang M3? **Q-B2-001 (B, D)** gắn M4/M1 hơi lỏng.
8. **T-027 "electron hóa trị"** và đoạn tương ứng trong bài B3: KNTT dạy kĩ ở Chương 2 – giữ ở Chương 1 hay chuyển sang B5?
9. **Q-B2-012** (VD) và **Q-B2-011** (TH) cùng kĩ năng tính nguyên tử khối trung bình – thống nhất mức độ.

### Đã sửa sau rà soát ngày 15/11 (AI hỗ trợ rà soát, GV xem lại)
- M3: "nơtron" → "neutron" (đúng quy ước SGK mới).
- Q-B2-007 phương án B (73%): gắn thêm M5 (ghép nhầm % cho đồng vị).
- Q-B1-007 phương án D (23 = số khối): gắn M3. Q-B2-003 phương án D (đồng vị cùng số khối): gắn M4.
- Q-B4-006: thêm giá trị sai đặc trưng "75" → M5 (ghép % cho nhầm đồng vị).
- Q-B1-003: mức TH → NB (chỉ nhớ số liệu).
- Ngân hàng hiện có **40/60 câu**; B4 mới có 6 câu (chưa có câu NB); M6 chỉ có câu ở B3 → ưu tiên khi bổ sung.

## Danh sách câu hỏi

| Mã câu | Dạng | Mức | Đáp án | Lỗi sai gắn kèm | GV duyệt (✓/✗) | Ghi chú |
|---|---|---|---|---|---|---|
| Q-B1-001 | Nhiều lựa chọn | NB | A | — | | |
| Q-B1-002 | Nhiều lựa chọn | NB | D | M2 | | |
| Q-B1-003 | Nhiều lựa chọn | NB | B | M2 | | |
| Q-B1-004 | Nhiều lựa chọn | NB | C | — | | |
| Q-B1-005 | Nhiều lựa chọn | TH | D | M3 | | |
| Q-B1-006 | Nhiều lựa chọn | TH | C | M9 | | |
| Q-B1-007 | Nhiều lựa chọn | VD | A | M3 | | |
| Q-B1-008 | Trả lời ngắn | TH | 30 | M3 | | |
| Q-B1-009 | Đúng/Sai | TH | aĐ bS cĐ dS | M3, M9 | | |
| Q-B1-010 | Đúng/Sai | NB | aĐ bS cĐ dS | M2 | | |
| Q-B2-001 | Nhiều lựa chọn | NB | C | M1, M4 | | |
| Q-B2-002 | Nhiều lựa chọn | NB | D | M1, M3 | | |
| Q-B2-003 | Nhiều lựa chọn | TH | A | M4 | | |
| Q-B2-004 | Nhiều lựa chọn | TH | B | M4 | | |
| Q-B2-005 | Nhiều lựa chọn | TH | C | M1, M5 | | |
| Q-B2-006 | Nhiều lựa chọn | VD | B | M5 | | |
| Q-B2-007 | Nhiều lựa chọn | VD | A | M5 (thêm phương án B) | | |
| Q-B2-008 | Đúng/Sai | TH | aĐ bS cĐ dS | M4, M9 | | |
| Q-B2-009 | Đúng/Sai | TH | aĐ bS cĐ dS | M1, M5 | | |
| Q-B2-010 | Đúng/Sai | VD | aĐ bĐ cS dĐ | M5 | | |
| Q-B2-011 | Trả lời ngắn | TH | 35.5 | M5 | | |
| Q-B2-012 | Trả lời ngắn | VD | 63.54 | M5 | | |
| Q-B3-001 | Nhiều lựa chọn | NB | B | M6 | | |
| Q-B3-002 | Nhiều lựa chọn | NB | A | M6 | | |
| Q-B3-003 | Nhiều lựa chọn | NB | C | M8 | | |
| Q-B3-004 | Nhiều lựa chọn | TH | D | M8 | | |
| Q-B3-005 | Nhiều lựa chọn | TH | C | M7 | | |
| Q-B3-006 | Nhiều lựa chọn | TH | A | M7, M8 | | |
| Q-B3-007 | Nhiều lựa chọn | VD | A | M7, M8 | | |
| Q-B3-008 | Nhiều lựa chọn | TH | B | M10 | | |
| Q-B3-009 | Đúng/Sai | TH | aĐ bĐ cS dS | M8 | | |
| Q-B3-010 | Đúng/Sai | TH | aĐ bS cS dĐ | M6, M10 | | |
| Q-B3-011 | Trả lời ngắn | VD | 4 | M7 | | |
| Q-B3-012 | Trả lời ngắn | TH | 1 | M7 | | |
| Q-B4-001 | Nhiều lựa chọn | VD | A | M3 | | |
| Q-B4-002 | Nhiều lựa chọn | TH | B | M2, M3, M10 | | |
| Q-B4-003 | Nhiều lựa chọn | VD | D | M1, M5 | | |
| Q-B4-004 | Nhiều lựa chọn | VD | A | M9 | | |
| Q-B4-005 | Đúng/Sai | VD | aĐ bĐ cS dS | M9, M10 | | |
| Q-B4-006 | Trả lời ngắn | VD | 25% | M5 | | |

## Ma trận bao phủ lỗi sai × bài

Số câu hỏi có ít nhất một phương án/ý/giá trị gợi ý gắn mã lỗi đó (một câu có thể gắn nhiều mã).

| Lỗi sai | B1 | B2 | B3 | B4 | Tổng |
|---|---|---|---|---|---|
| M1 | · | 4 | · | 1 | 5 |
| M2 | 3 | · | · | 1 | 4 |
| M3 | 4 | 1 | · | 2 | 7 |
| M4 | · | 4 | · | · | 4 |
| M5 | · | 7 | · | 2 | 9 |
| M6 | · | · | 3 | · | 3 |
| M7 | · | · | 5 | · | 5 |
| M8 | · | · | 5 | · | 5 |
| M9 | 2 | 1 | · | 2 | 5 |
| M10 | · | · | 2 | 2 | 4 |

Nhận xét: M4, M6, M7, M8 chưa có câu ở B4 (Ôn tập); M6 và M10 còn ít câu. Đợt bổ sung tiếp theo (mục tiêu 60–80 câu) nên ưu tiên các ô này.

## Kết luận của giáo viên

- Số câu đạt: ____ / 40  Số câu cần sửa: ____
- Nhận xét chung: ______________________________________________
- Ngày duyệt: ____/____/2026  Chữ kí: ____________________
