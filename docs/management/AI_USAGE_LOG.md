# 🤖 Nhật ký sử dụng công cụ AI (AI_USAGE_LOG)

## Vì sao phải ghi trung thực?

- **Giám khảo KHKT phỏng vấn trực tiếp từng thành viên.** Họ thường chỉ vào một đoạn code hay một câu hỏi và hỏi "Em giải thích phần này?". Nếu em không giải thích được, cả dự án mất uy tín – dù phần còn lại rất tốt.
- **Dùng AI không phải là gian lận; giấu việc dùng AI mới là vấn đề.** Kế hoạch nghiên cứu của nhóm (mục 8) đã cam kết khai báo công khai.
- Nhật ký này giúp nhóm **chứng minh phần đóng góp của chính mình**: AI đưa ra gì, em đã sửa gì, kiểm tra gì.
- Sản phẩm của nhóm dạy học sinh "dùng AI để được gợi ý chứ không chép đáp án" – nhóm cần làm đúng như điều mình xây dựng.

## Cách ghi

- Ghi **trong ngày**, ngay sau khi dùng. Mỗi lần AI đóng góp đáng kể = 1 dòng.
- Không cần ghi những câu hỏi tra cứu nhỏ (ví dụ "cú pháp `for` trong JS"). Cần ghi khi AI **viết ra** code, nội dung, câu hỏi, văn bản mà em đưa vào dự án.
- Cột **"Em giải thích được?"**: chỉ ghi **C (Có)** khi em có thể giải thích cho bạn khác mà không mở lại AI. Ghi **K (Không)** là bình thường – nhưng phải học lại cho đến khi thành C trước khi commit/nộp.
- Không dán dữ liệu cá nhân của học sinh vào công cụ AI.

## Mẫu dòng

| Ngày | Thành viên | Công cụ | Mục đích | AI đã tạo ra gì | Em đã sửa / kiểm chứng gì | Em giải thích được? (C/K) |
|---|---|---|---|---|---|---|
| dd/mm | HS? | Claude / ChatGPT / Copilot… | Vì sao dùng | File/đoạn nào, khoảng bao nhiêu | Thử chạy? Đối chiếu SGK? GV duyệt? Sửa những gì? | C / K |

## Nhật ký

| Ngày | Thành viên | Công cụ | Mục đích | AI đã tạo ra gì | Em đã sửa / kiểm chứng gì | Em giải thích được? (C/K) |
|---|---|---|---|---|---|---|
| 15/11/2026 | GV + nhóm | Claude | Rà soát, biên tập kế hoạch nghiên cứu | Góp ý cấu trúc, câu chữ cho `NVT_SMART_CHEMISTRY_Ke_hoach_nghien_cuu.md` | Nhóm và GV quyết định đề tài, mục tiêu, phương pháp; GV đọc duyệt bản cuối | *Mỗi HS tự điền* |
| 15/11/2026 | GV + nhóm | Claude | Tạo bản hồ sơ Word | File Word dựng từ kế hoạch nghiên cứu | *Cần kiểm tra: định dạng theo mẫu của BTC, điền thông tin nhóm* | *Mỗi HS tự điền* |
| 15/11/2026 | GV (định hướng) | Claude | Tạo quy ước chung | `docs/CONTRACT.md` | *Cả nhóm đọc và hỏi lại những điểm chưa hiểu* | *HS1/HS2/HS3 tự điền* |
| 15/11/2026 | GV (định hướng) | Claude | Tạo bộ tài liệu quản lý | Toàn bộ `docs/management/` (README, ROADMAP, BACKLOG, TEAM_WORKFLOW, DEVLOG, AI_USAGE_LOG, RISKS, JUDGE_PREP) | *Cả nhóm đọc, chỉnh ước lượng và phân công cho đúng thực tế* | *Mỗi HS tự điền* |
| 15/11/2026 | GV (định hướng) | Claude | Bản nháp kiến trúc kỹ thuật | `docs/architecture/`, `supabase/` (lược đồ dữ liệu, hàm gợi ý AI) | *HS3 phải đọc hiểu từng dòng trước S1* | *HS3 tự điền* |
| 15/11/2026 | GV (định hướng) | Claude | Bản nháp nội dung Hóa học | `docs/content/`, `web/data/*.json` (bài học, thuật ngữ, lỗi sai, câu hỏi – tất cả `reviewed: false`) | *HS1 đối chiếu SGK KNTT; GV duyệt từng lô theo quy trình* | *HS1 tự điền* |
| 15/11/2026 | GV (định hướng) | Claude | Bản mẫu giao diện | `docs/design/`, các trang và CSS/JS trong `web/` | *HS2 đọc hiểu, chạy thử trên điện thoại, sửa theo ý nhóm* | *HS2 tự điền* |
| 15/11/2026 | GV (định hướng) | Claude | Điều chỉnh kế hoạch sang 7 chương | Sửa Kế hoạch nghiên cứu (md + Word), ROADMAP, BACKLOG, CONTRACT, RISKS, CONTENT_GUIDE, JUDGE_PREP, TEAM_WORKFLOW; danh mục lỗi dự thảo M11–M48 | *GV đọc lại, chốt danh mục lỗi từng chương trước khi soạn câu hỏi* | *Mỗi HS tự điền* |
| 15/11/2026 | GV (định hướng) | Claude | Rà soát nội dung C1 và mã nguồn | Báo cáo rà soát; sửa nhỏ trong `web/data/*.json`, `web/js/`, `supabase/` (liệt kê ở DEVLOG và REVIEW_SHEET) | *GV xem lại các câu đã sửa; HS2, HS3 đọc hiểu các chỗ sửa trong code* | *HS2/HS3 tự điền* |

> ⚠️ Các dòng ngày 15/11 ghi nhận rằng **bộ khung ban đầu do AI tạo** dưới sự định hướng của GV. Khi trình bày với giám khảo, nhóm nói rõ điều này và chỉ ra phần nào các em đã đọc hiểu, sửa đổi, viết lại hoặc làm mới sau đó (đối chiếu với lịch sử commit Git).

<!-- Thêm dòng mới ở cuối bảng "Nhật ký" phía trên. -->
