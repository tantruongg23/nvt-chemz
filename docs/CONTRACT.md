# Quy ước chung của dự án (Shared Contract)

Tất cả thành phần (quản lý, kiến trúc, nội dung, giao diện) tuân theo file này. Muốn đổi quy ước thì sửa file này trước.

## 1. Bối cảnh
- Dự án KHKT cấp trường của **3 học sinh** THPT Nguyễn Văn Thoại, có giáo viên Hóa hướng dẫn.
- Phạm vi thí điểm: **Hóa học 10, Chương 1 – Cấu tạo nguyên tử, SGK Kết nối tri thức (KNTT)**, dùng để **ôn tập**.
  - B1 – Thành phần của nguyên tử
  - B2 – Nguyên tố hóa học
  - B3 – Cấu trúc lớp vỏ electron nguyên tử
  - B4 – Ôn tập chương 1
- Các mốc thời gian: hôm nay 15/11/2026; **nộp hồ sơ 23/11/2026**; thực nghiệm với 2 lớp 10 từ 24 đến 28/11; thi cấp trường đầu tháng 12/2026.
- Điểm khác biệt chính: **câu hỏi chẩn đoán gắn mã lỗi sai (M1–M10)**, **thuật ngữ Việt – Anh**, **AI gợi ý 3 mức** (gợi mở → gợi ý trọng tâm → lời giải), **dashboard cho giáo viên** theo lớp và theo lỗi sai.
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
  data/                  ← dữ liệu nội dung (JSON) – do agent nội dung sở hữu
    lessons.json  misconceptions.json  terms.json  questions.json
supabase/
  schema.sql
  functions/hint/index.ts  ← Edge Function gọi Claude để sinh gợi ý
```

## 3. Lược đồ dữ liệu nội dung (`web/data/*.json`)

**misconceptions.json** – mảng các phần tử:
```json
{ "code": "M1", "title": "Nhầm số khối với nguyên tử khối",
  "description": "…", "lessons": ["B2"], "remedy": "Gợi ý cách sửa, 1–2 câu",
  "example_wrong": "…", "example_right": "…" }
```

**lessons.json** – mảng các phần tử:
```json
{ "id": "B1", "title": "Thành phần của nguyên tử", "title_en": "Atomic composition",
  "summary": ["ý chính 1", "…"],
  "sections": [{ "heading": "…", "body_md": "markdown ngắn", "terms": ["T-001"] }],
  "key_formulas": ["A = Z + N"] }
```

**terms.json** – mảng các phần tử:
```json
{ "id": "T-001", "en": "atom", "vi": "nguyên tử", "ipa": "/ˈæt.əm/",
  "pos": "noun", "lesson": "B1",
  "definition_vi": "…", "example_en": "…", "example_vi": "…" }
```

**questions.json** – mảng các phần tử. Trường chung:
```json
{ "id": "Q-B2-001", "lesson": "B2", "type": "mcq | true_false | short",
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
