# Hướng dẫn viết mã – NVT SMART CHEMISTRY

Dành cho 3 thành viên nhóm. Mục tiêu: mã **đơn giản, dễ đọc, ai cũng tự giải thích được** trước giám khảo. Khi dùng AI hỗ trợ viết mã, đọc hiểu từng dòng trước khi dán, và ghi vào `docs/management/AI_USAGE_LOG.md`.

## 1. Cấu trúc thư mục `web/`

```
web/
  index.html  practice.html  lesson.html  terms.html  results.html  teacher.html
  css/
    base.css            ← biến màu (sáng/tối), font, kiểu chung
    components.css      ← nút, thẻ, chip thuật ngữ…
  js/
    config.js           ← SUPABASE_URL, SUPABASE_ANON_KEY (để trống = chế độ demo)
    store.js            ← lớp truy cập dữ liệu (ARCHITECTURE.md mục 3) – DUY NHẤT nói chuyện với Supabase/localStorage
    content.js          ← tải web/data/*.json (bài học, câu hỏi, thuật ngữ, lỗi sai)
    grading.js          ← chấm câu: trả về { is_correct, misconception_codes }
    ui.js               ← hàm giao diện dùng chung: hiện thông báo, chip thuật ngữ, chế độ tối
    pages/
      practice.js  lesson.js  terms.js  results.js  teacher.js  index.js   ← mỗi trang 1 file
  data/                 ← do nhóm nội dung sở hữu, không sửa tay trong lúc code giao diện
  assets/
```

Mỗi trang HTML chỉ nạp **một** file JS của trang đó:

```html
<script type="module" src="js/pages/practice.js"></script>
```

## 2. ES modules

- Mỗi file JS là một module: dùng `export` cho thứ cần chia sẻ, `import` với **đường dẫn tương đối có đuôi `.js`**:
  ```js
  import { login, getSession } from "../store.js";
  import { loadQuestions } from "../content.js";
  ```
- Không dùng biến toàn cục (`window.xxx`). Không dùng `var`; dùng `const`, chỉ dùng `let` khi phải gán lại.
- Dùng `async/await` thay vì `.then()` lồng nhau.
- Hàm của `store.js` không ném lỗi, luôn trả `{ ok, data }` hoặc `{ ok: false, error, message }`:
  ```js
  const res = await requestHint(question.id, 1, selectedKey);
  if (!res.ok) {
    showMessage(res.message);          // message đã là tiếng Việt
    if (res.error === "RATE_LIMITED") hintButton.disabled = true;
    return;
  }
  renderHint(res.data.hint, res.data.disclaimer);
  ```
- **Không framework, không thư viện build** (không React, Vue, jQuery, Tailwind build, webpack…). Ngoại lệ duy nhất: `supabase-js` nạp động từ CDN trong `store.js` khi ở chế độ online.

## 3. Đặt tên

| Thứ | Quy ước | Ví dụ |
|---|---|---|
| Biến, hàm JS | `camelCase`, động từ cho hàm | `currentQuestion`, `renderHint()`, `loadQuestions()` |
| Hằng số cố định | `UPPER_SNAKE_CASE` | `HINT_DAILY_LIMIT` |
| Khóa dữ liệu (JSON, CSDL, store.js) | `snake_case` – **giống hệt CONTRACT** | `question_id`, `hint_level_used` |
| File | chữ thường, gạch ngang nếu nhiều từ | `practice.js`, `components.css` |
| Lớp CSS | chữ thường, gạch ngang | `.term-chip`, `.hint-box`, `.btn-primary` |
| Bảng / cột SQL | `snake_case`, tiếng Anh | `attempts.misconception_codes` |

Tên trong mã bằng **tiếng Anh**; chú thích (comment) và chữ hiển thị bằng **tiếng Việt có dấu**. Lưu mọi file ở mã hóa **UTF-8**.

## 4. HTML, CSS và khả năng tiếp cận (accessibility)

- Mỗi trang có `<html lang="vi">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Dùng thẻ đúng nghĩa: `<header>`, `<nav>`, `<main>`, `<button>` cho nút (không dùng `<div onclick>`), `<label for>` cho mọi ô nhập.
- Câu trắc nghiệm: dùng `<fieldset>` + `<legend>` (đề) + `<input type="radio">` có `<label>`. Có thể chọn bằng bàn phím (Tab, phím mũi tên, Space).
- Vùng hiện gợi ý AI có `aria-live="polite"` để trình đọc màn hình đọc khi gợi ý xuất hiện.
- Không truyền tải thông tin **chỉ bằng màu** (đúng/sai phải có chữ hoặc biểu tượng ✓/✗ kèm màu).
- Độ tương phản chữ ≥ 4,5 : 1 ở cả chế độ sáng và tối; nút bấm cao tối thiểu 44 px trên điện thoại.
- Ảnh có `alt`. Chip thuật ngữ tiếng Anh có `lang="en"`: `<span class="term-chip" lang="en">mass number</span>`.
- Thiết kế **mobile-first**: viết CSS cho màn hình nhỏ trước, rồi `@media (min-width: 768px)` cho màn hình lớn.
- Chèn chữ do người dùng hoặc AI tạo bằng `textContent`, **không** dùng `innerHTML` (tránh lỗi bảo mật XSS). Muốn xuống dòng trong gợi ý AI: CSS `white-space: pre-line`.

## 5. Chạy thử trên máy

Trình duyệt **không** cho ES module và `fetch("data/…json")` chạy khi mở file trực tiếp (`file://…`). Cần một máy chủ tĩnh nhỏ, chọn một trong hai:

```bash
# Cách 1 – Node.js
npx serve web
# mở http://localhost:3000

# Cách 2 – Python 3
python -m http.server 8000 --directory web
# mở http://localhost:8000
```

- Mặc định `config.js` để trống ⇒ chạy **chế độ demo**, không cần Supabase hay mạng. Thêm `?demo=1` vào địa chỉ để ép chế độ demo kể cả khi đã điền config.
- Đăng nhập demo: mã lớp `DEMO-TN`, mã học sinh `TN-01`. Dashboard giáo viên demo: `DEMO-TN` + PIN `demo-gv-2026`.
- Xóa dữ liệu demo: DevTools (F12) → Application → Local Storage → xóa các khóa bắt đầu bằng `nvt.`.
- Kiểm tra trên điện thoại: DevTools → biểu tượng điện thoại (Toggle device toolbar), chọn màn hình 360 px.
- Luôn mở tab **Console**: không được còn lỗi đỏ trước khi gộp mã.

## 6. Kiểm tra trước khi gộp mã (checklist)

- [ ] Chạy được ở chế độ demo **và** (nếu đã có Supabase) chế độ online.
- [ ] Console không có lỗi; không còn `console.log` thừa.
- [ ] Không có khóa bí mật nào trong `web/` (tìm chuỗi `sk-ant`, `service_role`).
- [ ] Dùng được bằng bàn phím; hiển thị đúng ở màn hình 360 px; chế độ tối đọc được.
- [ ] Chữ tiếng Việt có dấu đầy đủ; thuật ngữ tiếng Anh dạng chip.
- [ ] Đã ghi phần có AI hỗ trợ vào `AI_USAGE_LOG.md`.

## 7. Git cho người mới

- Mỗi người làm trên nhánh riêng: `git checkout -b ten-ban/tinh-nang` (ví dụ `an/trang-practice`).
- Commit nhỏ, thông điệp rõ: `git commit -m "practice: hiện gợi ý mức 2"`.
- File không được commit: `supabase/.env.local`, mọi file chứa khóa API. Thêm vào `.gitignore`.
