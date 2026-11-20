# 📁 Tài liệu quản lý dự án – NVT CHEMZ

> Thư mục này là "bảng điều khiển" của cả nhóm: làm gì, ai làm, khi nào xong, và làm sao chứng minh được mình hiểu những gì mình làm.
> Quy ước chung (cấu trúc thư mục, định dạng dữ liệu, API) nằm ở [`../CONTRACT.md`](../CONTRACT.md) – **bắt buộc tuân theo**.

## 💡 Dự án trong một đoạn

**NVT CHEMZ** là website ôn tập và tự học trước **Hóa học 10 – cả 7 chương, 23 bài** (SGK Kết nối tri thức). Khác với đề trắc nghiệm thông thường chỉ báo "đúng/sai", mỗi phương án sai trong ngân hàng câu hỏi được gắn với một **lỗi sai thường gặp (M1–M48)**, nên khi em chọn sai, hệ thống cho biết *em đang hiểu nhầm điều gì* và nên xem lại phần nào. Khi bí, em được **trợ lý AI gợi ý theo 3 mức** – từ câu hỏi gợi mở đến lời giải – thay vì nhận ngay đáp án. Thuật ngữ **Việt – Anh** có phát âm được lồng ngay trong bài. Giáo viên xem **thống kê theo lớp và theo lỗi sai** để biết cần dạy lại gì. Nhóm sẽ kiểm chứng hiệu quả bằng thực nghiệm **trên Chương 1** với 2 lớp 10 (có lớp đối chứng), đánh giá việc dùng các chương còn lại qua dữ liệu sử dụng, và báo cáo kết quả trung thực, dù kết quả thế nào.

## 🗂️ Mục lục

| File | Dùng để làm gì | Ai hay mở nhất |
|---|---|---|
| [ROADMAP.md](ROADMAP.md) | Các mốc thời gian, 5 sprint (S0–S4), Gantt, dây chuyền chương và **bảng trạng thái 7 chương** | Cả nhóm, GV |
| [BACKLOG.md](BACKLOG.md) | Danh sách user story (US-01…), ưu tiên, tiêu chí nghiệm thu | Cả nhóm |
| [TEAM_WORKFLOW.md](TEAM_WORKFLOW.md) | Phân vai, họp nhanh hằng ngày, Git, DoR/DoD, quy trình duyệt nội dung, dùng AI trung thực | Cả nhóm |
| [DEVLOG.md](DEVLOG.md) | Nhật ký phát triển (đính kèm hồ sơ dự thi) | Người trực nhật ký mỗi ngày |
| [AI_USAGE_LOG.md](AI_USAGE_LOG.md) | Khai báo mọi lần dùng công cụ AI | Ai dùng AI thì ghi |
| [RISKS.md](RISKS.md) | Sổ rủi ro và phương án xử lý | HS3 theo dõi, cả nhóm cập nhật |
| [JUDGE_PREP.md](JUDGE_PREP.md) | 25 câu hỏi giám khảo hay hỏi + gợi ý ý trả lời | Cả nhóm (luyện từ S2) |

Tài liệu liên quan ở thư mục khác: `docs/architecture/` (kiến trúc, dữ liệu, trợ lý AI), `docs/design/` (giao diện), `docs/content/` (biên soạn và kiểm duyệt nội dung).

## 📅 Các mốc phải nhớ

| Ngày | Mốc |
|---|---|
| CN 15/11/2026 | Khởi động – nền tảng dự án |
| T6 20/11 | Bản MVP đa chương chạy được (chế độ demo); C1 đủ 60 câu |
| **T2 23/11** | **Nộp hồ sơ dự thi** – C1 duyệt 100%, C2–C3 hoàn thiện |
| T3 24/11 – T7 28/11 | Thực nghiệm Chương 1 với 2 lớp 10; C4–C5 hoàn thiện |
| T3 01/12 | Khóa nội dung – C6–C7 hoàn thiện |
| ~T5 03/12 | Thi KHKT cấp trường (ngày chính xác: chờ BTC thông báo) |

## ✅ Checklist bắt đầu mỗi buổi làm việc (5 phút)

- [ ] Đọc tin nhắn họp nhanh hôm nay trong nhóm Zalo (xem mẫu ở [TEAM_WORKFLOW.md](TEAM_WORKFLOW.md#2-họp-nhanh-hằng-ngày-10-phút)).
- [ ] Mở [ROADMAP.md](ROADMAP.md): hôm nay thuộc sprint nào, còn mấy ngày đến mốc tiếp theo?
- [ ] Mở [BACKLOG.md](BACKLOG.md): chọn **một** story của mình, ưu tiên Must trước. Story đã đạt *Definition of Ready* chưa?
- [ ] `git checkout main` → `git pull` → tạo nhánh mới `feature/US-xx-ten-ngan` (hoặc tiếp tục nhánh đang làm).
- [ ] Nếu sẽ dùng AI: mở sẵn [AI_USAGE_LOG.md](AI_USAGE_LOG.md) để ghi ngay khi dùng xong.
- [ ] Cuối buổi: commit + push, mở Pull Request nếu xong, ghi 2–3 dòng vào [DEVLOG.md](DEVLOG.md).
- [ ] Gặp vướng mắc quá 30 phút? Nhắn nhóm ngay, đừng ngồi một mình.

> 🎯 Nguyên tắc vàng: **làm ít mà chắc, hiểu từng dòng mình nộp.** Giám khảo sẽ hỏi trực tiếp từng bạn.
