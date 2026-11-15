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

---

## Chủ nhật, 15/11/2026 (buổi chiều) – Sprint S0 – Người ghi: [HS?] (cùng GV)

**Đã làm**
- GV quyết định **mở rộng sản phẩm ra toàn bộ Hóa học 10 (7 chương, 23 bài)** để phục vụ cả ôn tập và tự học trước; **thực nghiệm sư phạm giữ nguyên trên Chương 1**.
- Cập nhật Kế hoạch nghiên cứu (thêm câu hỏi nghiên cứu 5, chỉ tiêu nội dung từng chương, tiêu chuẩn "chương hoàn thiện", danh mục lỗi sai dự thảo M11–M48, mục 6.4 đánh giá sử dụng C2–C7), ROADMAP (dây chuyền chương, bảng trạng thái 7 chương), BACKLOG (US-23…US-28, US-C1…US-C7), CONTRACT (mã B1–B23, M1–M48, `chapters.json`, thư mục theo chương), RISKS (R16–R21).
- Rà soát bản nháp nội dung C1 và mã nguồn (có AI hỗ trợ – xem AI_USAGE_LOG):
  - Nội dung: các phép tính và đáp án đều đúng; sửa 6 điểm nhỏ (ghi ở `docs/content/REVIEW_SHEET.md`). Ngân hàng mới có 40/60 câu.
  - Code: sửa lỗi XSS ở tham số `?lesson=`, nút Kiểm tra không bật khi gõ đáp án ngắn, gợi ý AI không nhận diện lỗi ở câu đúng/sai, CSV thiếu cột `class`, `type`, lọc kí tự `< >` trong câu trả lời gửi AI, tăng `max_tokens`, sửa `seed.sql` cho khớp đáp án.

**Quyết định quan trọng** (và lý do)
- Mã bài trùng số bài SGK (B1–B23), mã lỗi đánh số liên tục M1–M48 → dữ liệu C1 không phải đổi mã, học sinh dễ nhớ.
- Ưu tiên: C1 + thực nghiệm > C2, C3 > C4–C7 > AI. Chương chưa duyệt giữ nhãn "Bản nháp", không trình bày như nội dung đã duyệt.

**Việc còn mở**
- [ ] GV kiểm tra thể lệ: số học sinh tối đa của một dự án tập thể (RISKS R21).
- [ ] GV nộp phiếu khảo sát + kế hoạch thực nghiệm xin phép nhà trường (R19).
- [ ] Chưa có chế độ pre/post-test trên web (US-12) → nếu không kịp, dùng đề giấy.

**Có dùng AI không?** Có – xem AI_USAGE_LOG ngày 15/11/2026.

---

## Chủ nhật, 15/11/2026 (tối) – Sprint S0 – Người ghi: AI (Claude), theo yêu cầu của GV

**Quyết định của GV:** phần soạn nội dung và kỹ thuật do AI thực hiện; GV và học sinh tập trung chuẩn bị thuyết trình. Việc dùng AI ghi đầy đủ ở AI_USAGE_LOG.

**Đã làm (AI)**
- Chương 1 hoàn thiện nội dung: 61 câu, yêu cầu cần đạt, ví dụ mẫu, kiểm tra nhanh; bỏ câu vượt phạm vi 20 nguyên tố đầu.
- Chương 2 (B5–B9) và Chương 3 (B10–B14): soạn song song, mỗi chương 50 câu, 25 thuật ngữ, 8 mã lỗi; mỗi chương được một agent khác rà soát độc lập.
- Web đọc dữ liệu theo chương (`chapters.json`), trang chủ nhóm theo chương, màu theo chương; đã chạy thử trên trình duyệt (bài B3, B12, kiểm tra nhanh B6) không lỗi.
- Phiếu khảo sát, phiếu đồng ý, đề pre/post-test Chương 1 (đề chỉ lưu trên máy, không đưa lên repo công khai).

**Việc GV cần làm**
- [ ] Đọc mục "Quyết định của chuyên gia" trong `docs/content/EXPERT_REVIEW_C1.md`, `_C2.md`, `_C3.md`; đối chiếu những điểm chuyên gia AI ghi "theo trí nhớ, chưa đối chiếu SGK in".
- [ ] Duyệt câu hỏi (đổi `reviewed` sang `true`) – ưu tiên 61 câu Chương 1 trước thực nghiệm.
- [ ] Duyệt phiếu khảo sát, phiếu đồng ý, đề pre/post-test; xin phép nhà trường.
- [ ] Kiểm tra thể lệ về số học sinh / mức độ AI được phép.

