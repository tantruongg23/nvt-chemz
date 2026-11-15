# 📓 Nhật ký phát triển (DEVLOG)

> Nhật ký này sẽ được **đính kèm hồ sơ dự thi** (phụ lục) để chứng minh quá trình làm việc thật của nhóm.
> Ghi ngắn, trung thực, ghi cả khó khăn và sai lầm – giám khảo đánh giá cao việc nhóm biết mình đã học được gì.
> Người trực nhật ký luân phiên: HS1 → HS2 → HS3 (xem [TEAM_WORKFLOW.md](TEAM_WORKFLOW.md)).

## Mẫu một mục nhật ký

```markdown
## [Thứ], [dd/mm/yyyy] – Sprint S? – Người ghi: HS?

**Đã làm**
- HS1: …(US-xx)
- HS2: …(US-xx)
- HS3: …(US-xx)
- GV: …

**Quyết định quan trọng** (và lý do)
- …

**Khó khăn / lỗi gặp phải → cách xử lý**
- …

**Có dùng AI không?** Không / Có – xem AI_USAGE_LOG ngày …

**Em học được gì hôm nay** (mỗi bạn 1 câu)
- HS1: …
- HS2: …
- HS3: …

**Việc ngày mai**
- [ ] …
```

---

## Chủ nhật, 15/11/2026 – Sprint S0 – Người ghi: [HS?] (cùng GV)

**Đã làm**
- Nhóm và GV thống nhất đề tài **NVT SMART CHEMISTRY**, phạm vi Chương 1 Hóa học 10 (KNTT, Bài 1–4).
- Viết xong **Kế hoạch nghiên cứu** (`NVT_SMART_CHEMISTRY_Ke_hoach_nghien_cuu.md`): lý do, mục tiêu, 4 câu hỏi nghiên cứu, giả thuyết, phương pháp thực nghiệm có lớp đối chứng, đạo đức và bảo vệ dữ liệu, khai báo dùng AI.
- Tạo bản **hồ sơ Word** từ kế hoạch nghiên cứu.
- Tạo **bộ khung nền tảng** của dự án **với sự hỗ trợ của công cụ AI (Claude)**, dưới sự định hướng của GV:
  - `docs/CONTRACT.md` – quy ước chung (thư mục, định dạng dữ liệu JSON, API gợi ý, định danh ẩn danh).
  - `docs/management/` – lộ trình, backlog, quy trình nhóm, nhật ký, sổ rủi ro, chuẩn bị hỏi đáp.
  - `docs/architecture/` – bản nháp kiến trúc kỹ thuật.
  - `docs/content/` và `web/data/` – bản nháp nội dung (**chưa duyệt**, `reviewed: false`).
  - `docs/design/` và các trang trong `web/` – bản mẫu giao diện.

**Quyết định quan trọng**
- Dùng HTML/CSS/JS thuần, không build step → dễ học, dễ sửa cho học sinh mới học lập trình.
- Mọi màn hình phải chạy được ở **chế độ demo** (không cần Supabase) → phòng trường hợp mất mạng khi thực nghiệm và khi thi.
- Ưu tiên chẩn đoán lỗi sai + thống kê; AI gợi ý là phần bổ sung, có phương án dự phòng.
- Khai báo công khai việc dùng AI ngay từ đầu.

**Lưu ý trung thực**
- Bộ khung ngày 15/11 do AI tạo theo yêu cầu và định hướng của GV. **Đây là điểm xuất phát, chưa phải sản phẩm của học sinh.** Trong S0–S1, mỗi bạn phải đọc, hiểu, chỉnh sửa và chịu trách nhiệm phần thuộc vai trò của mình. Những gì không hiểu hoặc không cần → được phép xóa hoặc viết lại.
- Toàn bộ nội dung Hóa học trong bản nháp **chưa được GV duyệt** và có thể có sai sót.

**Có dùng AI không?** Có – xem [AI_USAGE_LOG.md](AI_USAGE_LOG.md) ngày 15/11/2026.

**Em học được gì hôm nay** *(mỗi bạn tự điền sau khi đọc xong bộ khung)*
- HS1: …
- HS2: …
- HS3: …

**Việc ngày mai (T2 16/11)**
- [ ] Mỗi bạn đọc `docs/CONTRACT.md` và tài liệu thư mục mình phụ trách, ghi lại ít nhất 3 câu hỏi.
- [ ] HS3: tạo repo GitHub, mời cả nhóm; mỗi bạn clone và mở được `web/index.html`.
- [ ] HS1 + GV: rà và chốt danh mục lỗi sai M1–M10.
- [ ] HS1: hoàn thiện phiếu khảo sát, gửi GV duyệt, phát cho lớp 10.
- [ ] Cả nhóm: đọc BACKLOG, nhận story S1.
