# Edge Function `hint` – Hướng dẫn triển khai

Hàm này nhận yêu cầu gợi ý từ website, đọc câu hỏi phía máy chủ, gọi Gemini (bậc miễn phí) và trả về gợi ý theo 3 mức. Hợp đồng API: `docs/CONTRACT.md` mục 4. Thiết kế chi tiết: `docs/architecture/AI_TUTOR_DESIGN.md`.

## 1. Chuẩn bị (làm một lần)

1. Cài Node.js LTS (đã có nếu chạy được `npx`).
2. Đăng nhập Supabase CLI và liên kết với dự án:
   ```bash
   npx supabase login
   npx supabase init            # chỉ chạy nếu thư mục supabase/ chưa có config.toml
   npx supabase link --project-ref <PROJECT_REF>
   ```
   `<PROJECT_REF>` là chuỗi trong địa chỉ `https://<PROJECT_REF>.supabase.co` (Dashboard → Project Settings → General).
3. Tạo API key Gemini tại <https://aistudio.google.com/apikey> trong dự án Google **không bật thanh toán** (chỉ dùng bậc miễn phí, hết hạn mức sẽ nhận 429 và web tự dùng gợi ý soạn sẵn).

## 2. Đặt biến bí mật (secrets)

```bash
# Cách nhanh: nạp cả file supabase/.env (đã gitignore)
npx supabase secrets set --env-file supabase/.env
# Hoặc từng biến:
npx supabase secrets set GEMINI_API_KEY=xxxxxxxx
npx supabase secrets set CONTENT_BASE_URL=https://nvt-chemz.vercel.app/data
npx supabase secrets set ALLOWED_ORIGIN=https://nvt-chemz.vercel.app
# Tùy chọn:
npx supabase secrets set HINT_DAILY_LIMIT=20
npx supabase secrets set GEMINI_MODEL=gemini-3.5-flash-lite
```

> ⚠ **Không bao giờ** dán `GEMINI_API_KEY` vào bất kỳ file nào trong `web/`, không gửi qua Zalo/Messenger, không commit lên GitHub. Nếu lỡ lộ: vào Google AI Studio xóa key cũ, tạo key mới, chạy lại lệnh `secrets set`.

`SUPABASE_URL` và `SUPABASE_SERVICE_ROLE_KEY` được Supabase tự cung cấp cho hàm, không cần đặt.

## 3. Triển khai

```bash
npx supabase functions deploy hint --no-verify-jwt
```

Vì sao `--no-verify-jwt`? Website không dùng tài khoản Supabase Auth; hàm tự kiểm tra mã học sinh trong bảng `students`, chặn lớp đối chứng và giới hạn 20 lượt/ngày.

## 4. Thử nhanh

```bash
curl -X POST "https://<PROJECT_REF>.supabase.co/functions/v1/hint" \
  -H "Content-Type: application/json" \
  -H "apikey: <SUPABASE_ANON_KEY>" \
  -d '{"question_id":"Q-B2-001","level":1,"student_answer":"A","anon_id":"TN-01"}'
```

Kết quả mong đợi: `{"level":1,"hint":"…","remaining_today":19,"disclaimer":"AI có thể sai…"}`.

| Thử với | Kết quả đúng |
|---|---|
| `anon_id: "DC-01"` (lớp đối chứng) | 403 `HINTS_DISABLED` |
| `anon_id: "KHONG-CO"` | 403 `UNKNOWN_STUDENT` |
| `question_id: "Q-XX-999"` | 404 `QUESTION_NOT_FOUND` |
| `level: 5` | 400 `INVALID_INPUT` |
| Gọi 21 lần trong ngày | lần 21 trả 429 `RATE_LIMITED` |

## 5. Chạy thử trên máy (không bắt buộc, cần Docker)

```bash
# Tạo file supabase/.env.local (KHÔNG commit) với các dòng:
#   GEMINI_API_KEY=…
#   CONTENT_BASE_URL=http://host.docker.internal:3000/data
npx supabase start
npx serve web -l 3000            # ở cửa sổ terminal khác
npx supabase functions serve hint --no-verify-jwt --env-file supabase/.env.local
```

`host.docker.internal` giúp hàm (chạy trong Docker) đọc được website đang chạy trên máy.

## 6. Xem nhật ký và chi phí

- Nhật ký: Dashboard → Edge Functions → `hint` → Logs. Nhật ký chỉ có `question_id`, mức gợi ý, số token, thời gian – **không** có mã học sinh hay câu trả lời.
- Hạn mức: Google AI Studio → Usage (bậc miễn phí, không phát sinh chi phí).

## 7. Đổi mô hình

```bash
npx supabase secrets set GEMINI_MODEL=<tên mô hình có bậc miễn phí>
```

Chỉ chọn mô hình có bậc miễn phí. Chạy lại bộ kiểm thử AI (`docs/architecture/ai_test_cases.md`) trước khi dùng với học sinh.
