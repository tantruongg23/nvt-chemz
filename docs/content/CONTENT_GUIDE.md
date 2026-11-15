# Hướng dẫn biên soạn và kiểm duyệt nội dung

Áp dụng cho các file trong `web/data/` (sau US-23: `web/data/c1/` … `web/data/c7/`): `lessons.json`, `misconceptions.json`, `terms.json`, `questions.json`. Lược đồ dữ liệu bắt buộc nằm ở `docs/CONTRACT.md` mục 3 – **tên trường phải giữ đúng như hợp đồng**.

Phạm vi: **Hóa học 10, 7 chương, 23 bài**, SGK Kết nối tri thức (Chương trình GDPT 2018) – xem bảng chương/bài/mã lỗi ở `docs/CONTRACT.md` mục 1. Mỗi câu hỏi chỉ dùng kiến thức **của chương đó và các chương trước** (học sinh học trước chưa biết chương sau). Không đưa nội dung ngoài chương trình Hóa 10 (ví dụ cấu hình ngoại lệ Cr, Cu; cân bằng ion – electron; hằng số cân bằng).

**Thứ tự soạn một chương:** khung + yêu cầu cần đạt → GV chốt lỗi sai → bài học + thuật ngữ → câu hỏi → kiểm tra tự động → GV duyệt → đọc thử (xem `docs/management/ROADMAP.md` mục 3).

Mọi nội dung soạn với hỗ trợ của AI phải ghi vào `docs/management/AI_USAGE_LOG.md` và **phải được giáo viên duyệt** trước khi bật `reviewed: true`.

---

## 1. Quy ước chung

| Nội dung | Quy ước |
|---|---|
| Tên nguyên tố | Theo IUPAC như SGK KNTT: hydrogen, helium, lithium, boron, carbon, nitrogen, oxygen, fluorine, neon, sodium, magnesium, aluminium, silicon, phosphorus, sulfur, chlorine, argon, potassium, calcium, iron, copper |
| Tên hạt | proton, neutron, electron (SGK mới viết "neutron", không viết "nơtron") |
| Số mũ, chỉ số | Dùng kí tự Unicode: ³⁵₁₇Cl, 1s²2s²2p⁶, Na⁺, O²⁻, 10⁻¹⁰ m |
| Kí hiệu nguyên tử | Số khối A ở góc trên bên trái, Z ở góc dưới bên trái: ⁵⁶₂₆Fe |
| Số thập phân | Trong lời văn dùng dấu phẩy (35,5). Trường `answer` của câu trả lời ngắn dùng **dấu chấm** ("35.5") để máy chấm |
| Đơn vị khối lượng | amu (1 amu = 1,6605 × 10⁻²⁷ kg) |
| Số liệu đồng vị | Ưu tiên số "đẹp" kiểu SGK/SBT (Cl 75%/25% → 35,5). Nếu dùng số liệu khác số liệu thực, ghi chú cho GV |
| Mã định danh | Bài `B1`…`B23` (trùng số bài SGK); lỗi sai `M1`…`M48`; thuật ngữ `T-001`… (đánh số tiếp, toàn cục); câu hỏi `Q-B2-013` (bài – số thứ tự 3 chữ số). Không đổi hoặc tái sử dụng mã đã có |
| Ký hiệu khác | ΔrH°₂₉₈, ΔfH°₂₉₈ (Chương 5); số oxi hóa viết trên kí hiệu dạng +2, −1 (Chương 4); đơn vị tốc độ mol/(L·s) (Chương 6) |

## 2. Mức độ nhận thức

| Mức | Ý nghĩa | Dấu hiệu | Ví dụ |
|---|---|---|---|
| **NB** – Nhận biết | Nhớ, nhận ra định nghĩa, kí hiệu, số liệu | Một bước, không tính toán | "Hạt nào mang điện tích dương?" |
| **TH** – Thông hiểu | Giải thích, đọc kí hiệu, áp dụng trực tiếp một công thức hoặc quy tắc | 1–2 bước | "Tính số neutron của ²³₁₁Na"; "Viết cấu hình K (Z = 19)" |
| **VD** – Vận dụng | Kết hợp nhiều kiến thức, lập hệ phương trình, bài toán ngược | ≥ 2 bước, có suy luận | Bài toán tổng số hạt; tính % đồng vị từ A̅; số e độc thân của Fe |

Tỉ lệ gợi ý cho một bộ câu: NB ≈ 25%, TH ≈ 45%, VD ≈ 30%.

## 3. Viết câu hỏi

### 3.1. Câu nhiều lựa chọn (`mcq`)
```json
{
  "id": "Q-B2-013", "lesson": "B2", "type": "mcq", "level": "TH",
  "stem": "Nguyên tử ³⁷₁₇Cl có số neutron là",
  "terms": ["T-004", "T-013"],
  "options": [
    { "key": "A", "text": "17", "misconception": "M3" },
    { "key": "B", "text": "20", "misconception": null },
    { "key": "C", "text": "37", "misconception": "M3" },
    { "key": "D", "text": "54", "misconception": "M3" }
  ],
  "answer": "B",
  "explanation": "Bước 1: …\nBước 2: …\nĐáp án: B.",
  "reviewed": false
}
```
- 4 phương án A–D, chỉ một đáp án đúng. Phương án đúng luôn có `"misconception": null`.
- Rải đều đáp án đúng giữa A, B, C, D (không để đa số là B).
- Tránh "Tất cả đều đúng/sai"; tránh phủ định kép.

### 3.2. Câu đúng/sai (`true_false`) – định dạng thi mới
- Một phần dẫn chung + **đúng 4 ý a, b, c, d**, mỗi ý `answer: true/false`.
- Nên có 2 ý đúng, 2 ý sai (hoặc 1–3), ý sai nên gắn mã lỗi. Ý đúng luôn có `misconception: null`.
- Mức độ tăng dần từ a đến d.

### 3.3. Câu trả lời ngắn (`short`)
- Đáp án là **một số** (chuỗi, dấu chấm thập phân), kèm `tolerance` (0 với số nguyên; 0,01–0,05 với số thập phân) và `unit` ("" hoặc "%").
- `misconception_hints`: liệt kê các **kết quả sai đặc trưng** và mã lỗi tương ứng, ví dụ `{ "value": "36", "misconception": "M5" }` (lấy trung bình cộng).
- Đề phải nói rõ cách làm tròn.

### 3.4. Lời giải (`explanation`)
- Viết từng bước "Bước 1: …\nBước 2: …", kết thúc bằng "Đáp án: …".
- Với mỗi phương án nhiễu quan trọng, thêm "Lưu ý: …" giải thích vì sao sai – trợ lý AI dựa vào lời giải này để gợi ý mức 3.
- Kiểm tra lại mọi phép tính hai lần (bấm máy tính, ghi ra giấy).

## 4. Thiết kế phương án nhiễu từ lỗi sai (ví dụ Chương 1: M1–M10)

Danh mục lỗi sai của các chương 2–7 (M11–M48, bản dự thảo) nằm trong Kế hoạch nghiên cứu mục 5.4. Khi soạn một chương mới, HS phụ trách lập bảng "cách tạo phương án nhiễu" tương tự bảng dưới cho các mã của chương đó, GV chốt trước khi soạn câu hỏi.

Nguyên tắc: mỗi phương án sai nên là **kết quả mà học sinh sẽ thu được nếu mắc đúng một lỗi cụ thể**. Khi học sinh chọn phương án đó, hệ thống ghi nhận mã lỗi.

| Mã | Cách tạo phương án nhiễu | Ví dụ |
|---|---|---|
| M1 | Đưa nguyên tử khối trung bình (số lẻ) làm số khối; lấy số khối thay cho nguyên tử khối trung bình | "Số khối của Cl là 35,5" |
| M2 | Electron nặng ≈ 1 amu; khối lượng tập trung ở vỏ | "Khối lượng tập trung ở lớp vỏ" |
| M3 | N = A + Z; N = Z; N = A; đảo vị trí A và Z | ⁵⁶₂₆Fe → 82 hoặc 26 |
| M4 | Cặp cùng số khối hoặc cùng số neutron nhưng khác Z | ¹⁴₆C và ¹⁴₇N |
| M5 | Trung bình cộng; ghép nhầm % cho đồng vị | (35 + 37)/2 = 36 |
| M6 | Orbital là đường tròn/elip | "Electron chạy trên đường tròn 1s" |
| M7 | Điền 3d trước 4s; bỏ qua 3d sang 4p | K: …3p⁶3d¹ |
| M8 | Lớp nào cũng tối đa 8 e; p chứa 3 e; 2p⁸, 3p⁷ | "Lớp M tối đa 8 e" |
| M9 | Số proton thay đổi khi tạo ion | Na⁺ có 10 proton |
| M10 | Quên ngoại lệ H, He, B; "nhiều e ngoài cùng → kim loại"; 4 e chắc chắn là kim loại/phi kim | "Cl có 7 e nên là kim loại" |

- Phương án sai **không** ứng với lỗi nào trong danh mục thì ghi `null` – không gán mã cho có.
- Nếu phát hiện lỗi sai mới phổ biến (qua khảo sát/thực nghiệm), đề xuất với GV để bổ sung M11… vào `misconceptions.json` trước khi dùng.

## 5. Viết thuật ngữ tiếng Anh (`terms.json`)

```json
{ "id": "T-033", "en": "outer shell", "vi": "lớp ngoài cùng", "ipa": "/ˌaʊt.ə ˈʃel/",
  "pos": "noun phrase", "lesson": "B3",
  "definition_vi": "…", "example_en": "…", "example_vi": "…" }
```
- **Phiên âm IPA theo giọng Anh – Anh (British English)**, đối chiếu với Cambridge Dictionary; giữ thống nhất trong toàn bộ file (ví dụ: number /ˈnʌm.bə/, orbital /ˈɔː.bɪ.təl/, proton /ˈprəʊ.tɒn/).
- `pos`: noun, noun phrase, verb, adjective… (ghi số nhiều bất quy tắc nếu có: "noun (plural: nuclei)").
- `definition_vi` ngắn (1–2 câu), đúng SGK. `example_en` là câu đơn giản (trình độ A2–B1), có chứa thuật ngữ; `example_vi` là bản dịch sát.
- Trong câu hỏi, liệt kê các thuật ngữ liên quan ở trường `terms` để giao diện hiện "chip" tiếng Anh.

## 6. Quy trình kiểm duyệt của giáo viên

1. HS biên soạn → chạy kiểm tra tự động (mục 7) → cập nhật `docs/content/REVIEW_SHEET.md`.
2. GV đọc từng câu theo bảng kiểm dưới đây, đánh ✓/✗ và ghi chú trên phiếu.
3. HS sửa các câu ✗, GV xem lại.
4. Với câu ✓: HS đổi `"reviewed": false` thành `"reviewed": true` trong `questions.json` (chỉ đổi đúng câu đó), ghi vào nhật ký: ngày, mã câu, tên GV duyệt. Sau khi sửa nội dung một câu đã duyệt, **phải đổi lại `false`** và duyệt lại.

### Bảng kiểm cho giáo viên
- [ ] Kiến thức đúng SGK KNTT, nằm trong phạm vi chương đó (và các chương trước).
- [ ] Đáp án đúng; phép tính đã kiểm tra lại; đơn vị, làm tròn rõ ràng.
- [ ] Câu mcq có duy nhất một phương án đúng; câu đúng/sai có 4 ý với đáp án rõ ràng, không mơ hồ.
- [ ] Mã lỗi gắn đúng bản chất phương án sai và thuộc danh mục của chương.
- [ ] Mức độ NB/TH/VD phù hợp.
- [ ] Lời giải từng bước dễ hiểu, không có bước sai.
- [ ] Tên nguyên tố, thuật ngữ, kí hiệu đúng quy ước (IUPAC, Unicode).
- [ ] Tiếng Việt đúng chính tả; thuật ngữ tiếng Anh và IPA chính xác.

## 7. Kiểm tra tự động trước khi nộp duyệt

Chạy script kiểm tra (Node.js) để bảo đảm: mọi file JSON hợp lệ; mã không trùng; mọi mã thuật ngữ và mã lỗi được tham chiếu đều tồn tại; đáp án mcq nằm trong các phương án; câu đúng/sai có đủ 4 ý; `reviewed` là `false` với câu mới.

Lệnh chạy (từ thư mục gốc dự án):

```
node docs/content/validate.js web/data
```

Kết quả mong đợi: dòng `ALL CHECKS PASSED` cùng số lượng câu theo dạng, mức độ, bài và ma trận bao phủ lỗi sai.
