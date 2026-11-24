# Migration CSDL (Supabase CLI, quy tắc kiểu Flyway)

Công cụ: [Supabase CLI](https://supabase.com/docs/guides/local-development/overview) (`npx supabase ...`, không cần cài).
Project: `qnfvjpqkisvitmrpdxbw`. Lịch sử đã áp dụng được CLI ghi ở bảng `supabase_migrations.schema_migrations` trên CSDL.

## Quy tắc

1. **Tên file:** `<YYYYMMDDHHMMSS>_<mô_tả_không_dấu>.sql`, tạo bằng `npx supabase migration new <mô_tả>` (CLI bắt buộc dạng timestamp; số phiên bản chính là timestamp này).
2. **Chỉ đi tới, không sửa file đã áp dụng.** Muốn đổi gì → tạo file mới. Muốn hoàn tác → file mới làm việc ngược lại. Sửa file đã chạy thì CSDL và repo lệch nhau mà CLI không báo.
3. **Không chèn xen:** timestamp của file mới phải lớn hơn mọi file đã có. Hai người cùng làm thì người merge sau đổi tên file của mình.
4. **Một migration = một thay đổi có ý nghĩa**, viết sao cho chạy lại được (`if not exists`, `create or replace`) để lỡ chạy dở vẫn chạy lại an toàn.
5. **Chỉ đổi cấu trúc/quyền/hàm.** Không để mật khẩu, PIN thật hay dữ liệu cá nhân trong migration. Dữ liệu mẫu ở `../seed.sql`.
6. **Không `drop`/`truncate` bảng có dữ liệu** nếu chưa có sao lưu và nhóm đồng ý.
7. **Hàm mới phải có `revoke`/`grant` ngay trong cùng file** (mặc định Supabase cho `anon` chạy mọi hàm).
8. **`../schema.sql` là bản chụp đầy đủ** để dán nhanh vào SQL Editor khi tạo CSDL mới. Mỗi lần thêm migration, cập nhật `schema.sql` cho khớp.
9. Không có `down`/`undo`. Không dùng `supabase db reset` trên CSDL thật.

## File hiện có

| File | Nội dung |
|---|---|
| `20261101000000_baseline.sql` | Nguyên văn `schema.sql` ban đầu (trước tính năng duyệt nội dung). CSDL thật đã chạy nội dung này từ trước nên **đánh dấu đã áp dụng, không chạy lại** (bước 3 bên dưới). |
| `20261124000000_content_reviews.sql` | Bảng `content_reviews` + RPC `get_content_reviews`, `set_content_review`. |

## Thiết lập lần đầu (làm một lần)

Chạy từ thư mục gốc repo. Lệnh `login` và `link` hỏi thông tin nên gõ với tiền tố `!` trong Claude Code.

```bash
npx supabase login                                   # mở trình duyệt lấy access token
npx supabase link --project-ref qnfvjpqkisvitmrpdxbw # hỏi mật khẩu CSDL (Project Settings → Database)
npx supabase migration repair --status applied 20261101000000   # baseline đã có sẵn trên CSDL
npx supabase migration list                          # kiểm tra: baseline = applied, content_reviews = chưa
npx supabase db push --dry-run                       # xem sẽ chạy gì (chỉ nên thấy content_reviews)
npx supabase db push                                 # áp dụng
```

## Việc thường ngày

```bash
npx supabase migration new add_something   # tạo file trống trong supabase/migrations/
# ... viết SQL, cập nhật schema.sql cho khớp ...
npx supabase db push --dry-run
npx supabase db push
```

Đặt `SUPABASE_DB_PASSWORD` trong môi trường để khỏi bị hỏi mật khẩu mỗi lần. Không commit mật khẩu hay access token.
