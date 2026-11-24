# Quy ước chung của dự án (Shared Contract)

Tất cả thành phần (quản lý, kiến trúc, nội dung, giao diện) tuân theo file này. Muốn đổi quy ước thì sửa file này trước.

## 1. Bối cảnh
- Dự án KHKT cấp trường của **3 học sinh** THPT, có giáo viên Hóa hướng dẫn.
- Phạm vi sản phẩm (điều chỉnh 15/11/2026): **toàn bộ Hóa học 10 – 7 chương, 23 bài, SGK Kết nối tri thức (KNTT)**, dùng để **ôn tập** và **tự học trước**. Mã bài trùng số bài SGK:

| Chương | Bài | Mã lỗi sai |
|---|---|---|
| C1 Cấu tạo nguyên tử | B1–B4 | M1–M10 |
| C2 Bảng tuần hoàn các nguyên tố hóa học | B5–B9 | M11–M18 |
| C3 Liên kết hóa học | B10–B14 | M19–M26 |
| C4 Phản ứng oxi hóa – khử | B15–B16 | M27–M32 |
| C5 Năng lượng hóa học | B17–B18 | M33–M37 |
| C6 Tốc độ phản ứng | B19–B20 | M38–M42 |
| C7 Nguyên tố nhóm VIIA | B21–B23 | M43–M48 |

- **Thực nghiệm sư phạm chỉ đo trên Chương 1** (B1–B4, M1–M10).
- Các mốc thời gian: hôm nay 15/11/2026; **nộp hồ sơ 23/11/2026**; thực nghiệm với 2 lớp 10 từ 24 đến 28/11; thi cấp trường đầu tháng 12/2026.
- Điểm khác biệt chính: **câu hỏi chẩn đoán gắn mã lỗi sai (M1–M48)**, **thuật ngữ Việt – Anh**, **AI gợi ý 3 mức** (gợi mở → gợi ý trọng tâm → lời giải), **dashboard cho giáo viên** theo lớp và theo lỗi sai.
- Mọi phần có AI hỗ trợ phải được ghi vào `docs/management/AI_USAGE_LOG.md`. Dự án không giấu việc dùng AI.

## 2. Cấu trúc thư mục
```
docs/
  CONTRACT.md            ← file này
  management/            ← lộ trình, backlog, quy trình nhóm, nhật ký
  architecture/          ← kiến trúc, mô hình dữ liệu, thiết kế trợ lý AI
  design/                ← design system, hướng dẫn UI
  content/               ← hướng dẫn biên soạn và kiểm duyệt nội dung
web/                     ← website tĩnh (HTML/CSS/JS thuần, không build step)
  index.html  practice.html  terms.html  lesson.html  results.html  teacher.html
  css/  js/  assets/
  data/                  ← dữ liệu nội dung (JSON)
    chapters.json        ← danh sách 7 chương (tải ngay khi mở app)
    c1/ … c7/            ← mỗi chương một thư mục, HS phụ trách chương sở hữu
      lessons.json  misconceptions.json  terms.json  questions.json
supabase/
  schema.sql
  functions/hint/index.ts  ← Edge Function gọi Claude để sinh gợi ý
```

## 3. Lược đồ dữ liệu nội dung (`web/data/`)

> **Chuyển đổi:** dữ liệu Chương 1 hiện nằm phẳng trong `web/data/*.json`. Story US-23 chuyển vào `web/data/c1/` **không đổi mã**. Đến khi US-23 xong, code vẫn đọc vị trí cũ.

**Quy tắc mã (toàn cục, không trùng giữa các chương, không tái sử dụng):** chương `C1`…`C7`; bài `B1`…`B23` (trùng số bài SGK); lỗi sai `M1`…`M48` (đánh số liên tục, **không** dùng dạng `C2-M3`); thuật ngữ `T-001`…; câu hỏi `Q-B12-003`.

**chapters.json** – mảng các phần tử:
```json
{ "id": "C1", "number": 1, "title": "Cấu tạo nguyên tử", "title_en": "Atomic structure",
  "lessons": ["B1", "B2", "B3", "B4"], "misconceptions": ["M1", "…", "M10"],
  "status": "draft | complete", "ai_enabled": false }
```


**misconceptions.json** – mảng các phần tử:
```json
{ "code": "M1", "chapter": "C1", "title": "Nhầm số khối với nguyên tử khối",
  "description": "…", "lessons": ["B2"], "remedy": "Gợi ý cách sửa, 1–2 câu",
  "example_wrong": "…", "example_right": "…" }
```

**lessons.json** – mảng các phần tử:
```json
{ "id": "B1", "number": 1, "chapter": "C1", "kind": "lesson | review",
  "title": "Thành phần của nguyên tử", "title_en": "Atomic composition",
  "objectives": ["Yêu cầu cần đạt theo CT GDPT 2018 …"],
  "summary": ["ý chính 1", "…"],
  "sections": [{ "heading": "…", "body_md": "markdown ngắn", "terms": ["T-001"] }],
  "key_formulas": ["A = Z + N"],
  "worked_examples": [{ "problem": "…", "solution": "Bước 1: …" }],
  "quick_check": ["Q-B1-001", "Q-B1-004", "Q-B1-005"] }
```
- `number`, `chapter`, `kind`, `objectives`, `worked_examples`, `quick_check` là **trường mới** (bắt buộc với bài mới; C1 bổ sung dần). `kind: "review"` cho bài Ôn tập chương.

**terms.json** – mảng các phần tử:
```json
{ "id": "T-001", "en": "atom", "vi": "nguyên tử", "ipa": "/ˈæt.əm/",
  "pos": "noun", "chapter": "C1", "lesson": "B1",
  "definition_vi": "…", "example_en": "…", "example_vi": "…" }
```

**questions.json** – mảng các phần tử. Trường chung:
```json
{ "id": "Q-B2-001", "chapter": "C1", "lesson": "B2", "type": "mcq | true_false | short",
  "level": "NB | TH | VD", "stem": "…", "terms": ["T-005"],
  "explanation": "Lời giải chuẩn, từng bước", "reviewed": false }
```
- `mcq`: `"options": [{ "key": "A", "text": "…", "misconception": "M1" | null }], "answer": "B"`
- `true_false`: `"statements": [{ "key": "a", "text": "…", "answer": true, "misconception": "M4" | null }]` (theo định dạng thi mới: 4 ý a–d)
- `short`: `"answer": "35.5", "tolerance": 0.05, "unit": "" , "misconception_hints": [{ "value": "36", "misconception": "M5" }]`
- `reviewed` luôn là `false` cho đến khi giáo viên duyệt. UI hiển thị nhãn "Chưa duyệt" khi giá trị là `false`.

## 4. Hợp đồng API gợi ý AI
`POST {SUPABASE_URL}/functions/v1/hint`
```json
// request
{ "question_id": "Q-B2-001", "level": 1, "student_answer": "A", "anon_id": "10A1-07" }
// response
{ "level": 1, "hint": "…", "remaining_today": 18, "disclaimer": "AI có thể sai…" }
```
- `level`: 1 = câu hỏi gợi mở, 2 = gợi ý trọng tâm, 3 = lời giải từng bước (dựa trên `explanation` đã duyệt).
- Phía server tự đọc câu hỏi theo `question_id` (không tin nội dung câu hỏi do client gửi lên). Không gửi định danh học sinh lên Claude.

## 5. Định danh học sinh
Học sinh đăng nhập bằng **mã ẩn danh** do giáo viên phát (ví dụ `10A1-07`) kèm mã lớp. Hệ thống không lưu họ tên, email hay số điện thoại.

## 6. Giao diện
- Tiếng Việt là ngôn ngữ chính; thuật ngữ tiếng Anh hiển thị dạng "chip".
- Thiết kế ưu tiên di động trước (mobile-first), hỗ trợ cả chế độ sáng và tối.
- Font chữ phải hiển thị đầy đủ dấu tiếng Việt.
- Mọi màn hình chạy được **ngay cả khi chưa có Supabase**: chế độ demo lưu kết quả bằng `localStorage`. Lớp truy cập dữ liệu nằm trong `web/js/store.js`.
