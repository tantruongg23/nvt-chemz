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
| 15/11/2026 | GV (yêu cầu) | Claude | Hoàn thiện nội dung Chương 1 | **AI soạn toàn bộ**: 20 câu hỏi mới (Q-B1-011…Q-B4-013, đủ 60 câu), yêu cầu cần đạt, ví dụ mẫu, kiểm tra nhanh cho B1–B4; thêm trường `chapter`; trang bài học hiển thị phần mới | Một agent AI đóng vai chuyên gia Hóa học rà soát độc lập (`docs/content/EXPERT_REVIEW_C1.md`). **GV chưa duyệt** – mọi câu vẫn `reviewed: false` | *Chưa – HS phải học lại trước khi trình bày* |
| 15/11/2026 | GV (yêu cầu) | Claude | Công cụ nghiên cứu | **AI soạn**: phiếu khảo sát, phiếu đồng ý, đề pre/post-test Chương 1 (`docs/research/`) | GV duyệt; nhà trường đồng ý trước khi phát | — |
| 15/11/2026 | GV (yêu cầu) | Claude (agent đóng vai chuyên gia) | Rà soát độc lập Chương 1 + đề pre/post | Báo cáo `docs/content/EXPERT_REVIEW_C1.md`; sửa 16 câu, thêm Q-B2-017 (phổ khối lượng), bỏ câu Fe ngoài phạm vi, mở rộng mô tả M3/M7/M9; viết lại 9 câu pre/post gần trùng ngân hàng | **AI rà soát AI** – không thay thế duyệt của GV; GV xem mục "Quyết định của chuyên gia" và có thể đổi lại | — |
| 15/11/2026 | GV (yêu cầu) | Claude (agent soạn + agent đóng vai chuyên gia rà soát) | Nội dung Chương 2, Chương 3 | **AI soạn toàn bộ** `web/data/c2/`, `web/data/c3/` (10 bài, 50 thuật ngữ, 16 mã lỗi M11–M26, 100 câu); agent khác rà soát độc lập, sửa 14 câu (`docs/content/EXPERT_REVIEW_C2.md`, `EXPERT_REVIEW_C3.md`) | Chuyên gia AI tự nhận chưa đối chiếu được SGK bản in → **GV cần kiểm các mục "Quyết định của chuyên gia"**; mọi câu `reviewed: false` | *Chưa* |
| 15/11/2026 | GV (yêu cầu) | Claude (agent soạn + agent đóng vai chuyên gia rà soát) | Nội dung Chương 4–7 | **AI soạn toàn bộ** `web/data/c4`…`c7` (9 bài, 65 thuật ngữ, 22 mã lỗi M27–M48, 135 câu), 4 chương soạn song song; agent khác rà soát từng chương, sửa 21 câu và một lỗi kiến thức trong bài B15 (`docs/content/EXPERT_REVIEW_C4.md`…`C7.md`) | Chuyên gia AI tự nhận chưa đối chiếu SGK in (số liệu ΔfH°, Eb, màu F₂, điều kiện phản ứng…) → **GV cần kiểm mục "Quyết định của chuyên gia"**; mọi câu `reviewed: false` | *Chưa* |
| 24/11/2026 | GV (yêu cầu) | Claude | Làm đề kín US-12 (đề, đáp án chỉ ở máy chủ) | **AI viết**: `docs/content/build_closed_tests.js` (kiểm tra và sinh dữ liệu đề), migration `20261124200000_closed_tests.sql` (bảng, RPC chấm bài, siết RLS), `web/test.html`, `web/js/pages/test.js`, phần bật/tắt ở trang giáo viên, hàm trong `store.js`; không sửa nội dung đề | Chạy thử SQL trên Postgres tạm (không lộ đáp án, nộp 1 lần, RLS chặn chèn điểm). **GV chưa duyệt đề**; câu 21–30 (phương án nhiễu do script chọn) và câu A19 cần GV xem; HS3 phải đọc hiểu RPC `submit_test` trước khi trình bày | *HS3 tự điền* |

> ⚠️ Các dòng ngày 15/11 ghi nhận rằng **bộ khung ban đầu do AI tạo** dưới sự định hướng của GV. Khi trình bày với giám khảo, nhóm nói rõ điều này và chỉ ra phần nào các em đã đọc hiểu, sửa đổi, viết lại hoặc làm mới sau đó (đối chiếu với lịch sử commit Git).

<!-- Thêm dòng mới ở cuối bảng "Nhật ký" phía trên. -->
