# 📋 Backlog sản phẩm

> Mỗi dòng là một **user story** – một điều người dùng muốn làm được, viết theo mẫu *"Là …, em/tôi muốn … để …"*.
> Story chỉ được coi là xong khi **mọi tiêu chí nghiệm thu** được kiểm tra thật (bấm thử, mở Console, xem dữ liệu) và đạt [Definition of Done](TEAM_WORKFLOW.md#5-definition-of-ready-và-definition-of-done).

## Cách đọc bảng

| Ký hiệu | Ý nghĩa |
|---|---|
| **Must** | Bắt buộc phải có trước thực nghiệm. Thiếu là dự án không chạy được. |
| **Should** | Nên có, quan trọng, nhưng có phương án thay thế nếu trễ. |
| **Could** | Có thì tốt. Chỉ làm khi Must/Should đã xong. |
| **Won't** | Quyết định **không** làm ở phiên bản này (ghi lại để trả lời giám khảo). |
| **Ước lượng** | **S** ≈ dưới 2 giờ · **M** ≈ nửa ngày (3–4 giờ) · **L** ≈ 1 ngày (6–8 giờ, nên chia nhỏ) |
| **Người làm** | HS1 nội dung · HS2 giao diện · HS3 dữ liệu & AI · GV giáo viên. Người đầu tiên là người chịu trách nhiệm chính. |
| **Trạng thái** | ⬜ Chưa làm · 🟨 Đang làm · 🟦 Chờ review · ✅ Xong |

## Tổng quan

| ID | Story (rút gọn) | Ưu tiên | Người làm | Sprint | Ước lượng | Trạng thái |
|---|---|---|---|---|---|---|
| US-01 | Vào app bằng mã lớp + mã ẩn danh | Must | HS2, HS3 | S1 | M | 🟦 |
| US-02 | Đọc bài học (23 bài, có ví dụ mẫu) | Must | HS1, HS2 | S1 | M | 🟦 |
| US-03 | Tra thuật ngữ Việt – Anh, nghe phát âm | Must | HS1, HS2 | S1 | M | 🟦 |
| US-04 | Luyện tập theo bài/chương với 3 dạng câu hỏi | Must | HS2 | S1 | L | 🟦 |
| US-05 | Chẩn đoán ngay lỗi sai khi trả lời sai | Must | HS2, HS1 | S1 | M | 🟦 |
| US-06 | Ngân hàng C1 ≥ 60 câu gắn nhãn lỗi sai | Must | HS1, GV | S1 | L | 🟦 61/60 câu, 0 duyệt |
| US-07 | Thang gợi ý 3 mức (bản soạn sẵn) | Must | HS2 | S1 | M | 🟦 |
| US-08 | Gợi ý mức 1–2 do AI sinh qua Edge Function | Should | HS3 | S1–S2 | L | 🟦 hàm hint (Gemini) đã triển khai, gọi thử OK |
| US-09 | Xem điểm yếu của bản thân và bài nên ôn lại | Must | HS2 | S1 | M | 🟦 |
| US-10 | Dashboard giáo viên theo lớp và theo lỗi sai | Should | HS2, HS3 | S2 | M | 🟦 |
| US-11 | Xuất CSV để phân tích | Must | HS3 | S2 | S | 🟦 |
| US-12 | Chế độ kiểm tra trước / sau (pre/post-test) | Should | HS2, HS3 | S2 | M | 🟨 có chế độ, chưa có đề kín |
| US-13 | Chế độ demo không cần backend | Must | HS2, HS3 | S1 | S | 🟦 |
| US-14 | Nhãn "Chưa duyệt" cho nội dung chưa được GV duyệt | Must | HS2, GV | S1 | S | 🟦 |
| US-15 | Giới hạn số lượt hỏi AI mỗi ngày | Should* | HS3 | S2 | S | 🟦 đã thấy remaining_today giảm (16/20) |
| US-16 | Thông báo quyền riêng tư | Must | HS1, HS2 | S1 | S | 🟨 |
| US-17 | Ghi nhận mỗi lượt làm bài và mức gợi ý đã dùng | Must | HS3, HS2 | S1 | M | 🟦 |
| US-18 | Kiểm thử AI: 30 câu C1 + 5 câu/chương C2–C7 | Should* | HS3, GV | S2, S4 | M | ⬜ |
| US-19 | Khảo sát thực trạng | Must | HS1, GV | S0 | S | 🟨 chưa phát phiếu |
| US-20 | Chuyển chế độ sáng/tối | Could | HS2 | S2 | S | 🟦 |
| US-21 | Thẻ ghi nhớ (flashcard) luyện thuật ngữ | Could | HS1, HS2 | S2 | M | ⬜ |
| US-22 | Hoạt động offline hoàn toàn (PWA) | Could | HS2 | S4 | M | ⬜ |
| US-23 | Dữ liệu tách theo chương, tải theo chương | Must | HS3 | S1 | M | 🟦 |
| US-24 | Trang chủ chọn chương + tiến độ theo chương | Must | HS2 | S1 | M | 🟦 |
| US-25 | Chế độ "Học trước": bài → kiểm tra nhanh → luyện tập | Should | HS2, HS1 | S1–S2 | M | 🟨 thiếu mode=learn |
| US-26 | Báo lỗi nội dung trên từng câu | Should | HS2 | S2 | S | ⬜ |
| US-27 | Luyện tập tổng hợp nhiều chương | Could | HS2 | S4 | S | ⬜ |
| US-28 | Trợ lý AI dùng được cho mọi chương | Should | HS3 | S2 | S | 🟦 hàm đã triển khai |
| US-29 | Trang quản trị lớp và mã học sinh (mã quản trị) | Should | HS3, HS2 | S2 | M | 🟦 đã áp migration, thử RPC thật OK |
| US-C1 | Nội dung Chương 1 hoàn thiện (4 bài, 30 thuật ngữ, 60 câu) | Must | HS1, GV | S1–S2 | L | 🟦 61 câu, 0 duyệt |
| US-C2 | Nội dung Chương 2 hoàn thiện (5 bài, 25 thuật ngữ, 50 câu) | Must | HS1, GV | S1–S2 | L | 🟦 chưa duyệt |
| US-C3 | Nội dung Chương 3 hoàn thiện (5 bài, 25 thuật ngữ, 50 câu) | Must | HS1, GV | S1–S2 | L | 🟦 chưa duyệt |
| US-C4 | Nội dung Chương 4 hoàn thiện (2 bài, 15 thuật ngữ, 35 câu) | Should | HS3, GV | S2–S3 | L | 🟦 chưa duyệt |
| US-C5 | Nội dung Chương 5 hoàn thiện (2 bài, 15 thuật ngữ, 30 câu) | Should | HS3, GV | S2–S3 | L | 🟦 chưa duyệt |
| US-C6 | Nội dung Chương 6 hoàn thiện (2 bài, 15 thuật ngữ, 30 câu) | Should | HS2, GV | S3–S4 | L | 🟦 chưa duyệt |
| US-C7 | Nội dung Chương 7 hoàn thiện (3 bài, 20 thuật ngữ, 40 câu) | Should | HS2, GV | S3–S4 | L | 🟦 chưa duyệt |
| — | Bảng xếp hạng điểm giữa học sinh | Won't | — | — | — | — |
| — | Chat tự do với AI về mọi chủ đề | Won't | — | — | — | — |
| — | Đăng nhập bằng họ tên / email / Google | Won't | — | — | — | — |

> **Rà soát 24/11/2026 (đối chiếu với mã nguồn, chưa chạy thử từng chức năng trên trình duyệt):**
> - 🟦 = code đã có, đang chờ kiểm tra thực tế theo tiêu chí nghiệm thu. Chưa dòng nào được đánh ✅ vì chưa ai bấm thử đủ tiêu chí.
> - `validate.js` báo ALL CHECKS PASSED: 296 câu, 7 chương (C1 = 61 câu). Tất cả `reviewed: false`.
> - Supabase đã nối và link CLI: schema, RPC, migration `admin_console` đã áp dụng. **Hàm `hint` đã triển khai (dùng Gemini `gemini-3.5-flash-lite`)**; gọi thử với mã TN-01 trả gợi ý mức 1 không lộ đáp án, `remaining_today` giảm. Chưa chạy bộ kiểm thử AI (US-18) và chưa xác nhận bậc miễn phí.
> - **US-12:** `practice.html?mode=pretest|posttest` đã có (tắt gợi ý, không phản hồi từng câu, lưu `mode`). Còn thiếu: dùng đề kín thay vì ngân hàng luyện tập, giới hạn nộp 1 lần/mã, giáo viên bật/tắt.
> - **US-14:** giáo viên duyệt ngay trên trang giáo viên (Đã duyệt / Cần sửa / Chưa duyệt, tự đánh dấu "stale" khi nội dung bị sửa), lưu trong bảng `content_reviews`. Chưa có bộ lọc chỉ lấy câu đã duyệt.
> - **US-29 (24/11):** migration đã áp lên Supabase thật, mã quản trị đã đặt. Đã chạy thử RPC thật với lớp ZZTEST (tạo, sửa, sinh mã, xóa mã, xóa lớp, kiểm PIN/xác nhận) đều đúng; giao diện `admin.html` mới thử với máy chủ giả lập, chưa thử trên bản Vercel.
> - Chưa thấy trong code: nút "Xóa dữ liệu demo" (US-13), liên kết "Quyền riêng tư" ở chân trang (US-16), cột `chapter` trong CSV (US-11/23), dữ liệu C1 trong `data/c1/` (US-23), `mode=learn` (US-25), nút "Báo lỗi" (US-26), PWA (US-22).

\* **US-15** và **US-18** bắt buộc phải xong **nếu** US-08 (AI thật) được bật trong thực nghiệm. Nếu không bật AI, hai story này không cần.

**Ước tính khối lượng:** phần kỹ thuật Must ≈ 50 giờ. Phần nội dung 7 chương (soạn có AI hỗ trợ + đối chiếu SGK + sửa theo góp ý GV) ≈ **25 giờ**, chưa kể ≈ 12–13 giờ duyệt của GV. Tổng ≈ 25 giờ mỗi bạn trong 18 ngày → **chỉ vừa sức nếu đi đúng thứ tự ưu tiên** ở [ROADMAP](ROADMAP.md#6-nếu-bị-trễ-thì-cắt-gì-thứ-tự-cắt). Không nhận thêm Should khi Must của mình chưa xong.

> **Vì sao C1–C3 là Must còn C4–C7 là Should?** C1 phục vụ thực nghiệm; C2, C3 là các chương lớp 10 đã/đang học tới cuối tháng 11 nên dùng ngay được để ôn tập. C4–C7 phục vụ học trước – rất nên có trước ngày thi, nhưng nếu trễ vẫn có phương án (nhãn "Bản nháp", hoàn thiện trong học kì 2).

---

## Chi tiết user story

### US-01 · Vào app bằng mã lớp và mã ẩn danh
**Là học sinh, em muốn** vào app bằng mã lớp và mã số giáo viên phát (ví dụ `10A1-07`) **để** làm bài mà không phải khai họ tên.
Must · HS2 (giao diện), HS3 (kiểm tra mã) · S1 · M

Tiêu chí nghiệm thu:
- [ ] Nhập mã lớp hợp lệ + mã ẩn danh đúng định dạng `<lớp>-<số>` → vào được trang chủ, góc trên hiện mã của em.
- [ ] Mã sai định dạng → hiện thông báo lỗi bằng tiếng Việt, không vào được.
- [ ] Form **không có** ô họ tên, email, số điện thoại.
- [ ] Tải lại trang vẫn giữ đăng nhập; có nút "Đổi mã / Thoát".
- [ ] Hoạt động ở cả chế độ demo và chế độ Supabase.

### US-02 · Đọc bài học (23 bài)
**Là học sinh, em muốn** đọc bài học của từng bài B1–B23 **để** nhớ lại ý chính khi ôn tập, hoặc tự học trước khi học trên lớp.
Must · HS1 (nội dung `lessons.json`), HS2 (trang `lesson.html`) · S1 · M

- [ ] Mỗi bài có tên tiếng Việt + tiếng Anh, **yêu cầu cần đạt**, phần "Ý chính", các mục nội dung, công thức chính, **ít nhất 1 ví dụ mẫu có lời giải** và 3 câu kiểm tra nhanh.
- [ ] Có nút "Bài trước / Bài sau" trong cùng chương; tiêu đề hiện đúng "Chương X – Bài N" lấy từ dữ liệu (không suy ra từ vị trí).
- [ ] Thuật ngữ trong bài hiện dạng chip; bấm vào chip mở định nghĩa thuật ngữ.
- [ ] Cuối mỗi bài có nút "Luyện tập bài này" dẫn sang US-04.
- [ ] Đọc dễ trên điện thoại màn hình 360px (không phải cuộn ngang).
- [ ] Nội dung do HS1 soạn, GV đã đọc (xem US-14).

### US-03 · Tra thuật ngữ Việt – Anh và nghe phát âm
**Là học sinh, em muốn** xem các thuật ngữ Hóa học tiếng Anh của chương và nghe phát âm **để** đọc hiểu được tài liệu tiếng Anh.
Must · HS1 (`terms.json` ~30 thuật ngữ), HS2 (`terms.html`) · S1 · M

- [ ] Hiển thị thuật ngữ của chương đang chọn (C1 ≥ 30; cả 7 chương ≈ 145), mỗi thuật ngữ có: từ tiếng Anh, nghĩa tiếng Việt, phiên âm IPA, định nghĩa, câu ví dụ Anh – Việt.
- [ ] Lọc được theo chương và theo bài; tìm kiếm theo từ tiếng Anh hoặc tiếng Việt trên toàn bộ 7 chương.
- [ ] Nút 🔊 phát âm bằng Web Speech API (giọng `en-US` hoặc `en-GB`).
- [ ] Trình duyệt không hỗ trợ giọng đọc → nút bị ẩn hoặc hiện "Trình duyệt chưa hỗ trợ phát âm", **không** báo lỗi đỏ.
- [ ] HS1 đã đối chiếu IPA với một từ điển uy tín (ghi nguồn trong `docs/content/`).

### US-04 · Luyện tập theo bài với 3 dạng câu hỏi
**Là học sinh, em muốn** chọn một bài và làm các câu nhiều lựa chọn, đúng/sai, trả lời ngắn **để** quen với định dạng đề thi mới.
Must · HS2 · S1 · L (nên chia: 4a mcq · 4b true_false · 4c short)

- [ ] Chọn được chương, rồi chọn một bài của chương hoặc "Cả chương".
- [ ] `mcq`: chọn 1 trong 4 phương án, bấm "Kiểm tra".
- [ ] `true_false`: chọn Đúng/Sai cho từng ý a–d; chấm từng ý.
- [ ] `short`: nhập số; chấp nhận dấu phẩy hoặc dấu chấm thập phân (`35,5` = `35.5`); chấm đúng trong khoảng `tolerance`.
- [ ] Hiện tiến độ (ví dụ "Câu 3/10") và có nút "Câu tiếp".
- [ ] Đọc câu hỏi từ `questions.json` đúng lược đồ CONTRACT mục 3; không viết cứng câu hỏi trong JS.

### US-05 · Chẩn đoán ngay lỗi sai
**Là học sinh, em muốn** khi trả lời sai thì biết ngay mình đang hiểu nhầm điều gì **để** sửa đúng chỗ, không chỉ biết "sai".
Must · HS2 (hiển thị), HS1 (nội dung `misconceptions.json`) · S1 · M

- [ ] Chọn phương án sai có gắn mã lỗi (ví dụ M1) → hiện thẻ "Có thể em đang nhầm: *Nhầm số khối với nguyên tử khối*" kèm `remedy`, ví dụ sai/đúng.
- [ ] Với `short`, nếu đáp án khớp `misconception_hints` → hiện đúng lỗi đó.
- [ ] Phương án sai không gắn mã (`null`) → chỉ hiện lời giải, không bịa lỗi.
- [ ] Trả lời đúng → hiện "Chính xác!" và lời giải ngắn.
- [ ] Mã lỗi được ghi lại cùng lượt làm bài (xem US-17).

### US-06 · Ngân hàng câu hỏi gắn nhãn lỗi sai
**Là giáo viên, tôi muốn** có ngân hàng câu hỏi trong đó mỗi phương án nhiễu gắn với một lỗi sai cụ thể **để** biết học sinh sai vì hiểu nhầm gì.
Must · HS1 (soạn), GV (duyệt) · S1 · L

- [ ] Chương 1: ≥ 60 câu, phân bổ cả 4 bài và 3 mức NB/TH/VD; có đủ 3 dạng câu hỏi. *(Các chương khác: xem US-C2…US-C7.)*
- [ ] Mỗi lỗi M1–M10 xuất hiện ở ít nhất 3 câu.
- [ ] Mỗi câu có `explanation` từng bước.
- [ ] File JSON hợp lệ (kiểm bằng công cụ kiểm tra JSON hoặc script của HS3), đúng lược đồ CONTRACT.
- [ ] Trước thực nghiệm: mọi câu được dùng đều `reviewed: true` (GV duyệt).

### US-07 · Thang gợi ý 3 mức (bản soạn sẵn)
**Là học sinh, em muốn** khi bí được gợi ý từng bậc **để** tự nghĩ ra lời giải thay vì xem ngay đáp án.
Must · HS2 · S1 · M

- [ ] Sau khi trả lời sai, hiện nút "Gợi ý 1"; chỉ khi đã xem mức 1 mới mở "Gợi ý 2"; sau mức 2 mới mở "Xem lời giải" (mức 3).
- [ ] Mức 3 luôn lấy từ `explanation` đã duyệt, không cần AI.
- [ ] Khi không có AI (demo hoặc AI lỗi), mức 1–2 dùng gợi ý dựng sẵn từ `remedy` của lỗi sai.
- [ ] Mỗi lần mở một mức gợi ý được ghi lại (US-17).

### US-08 · Gợi ý mức 1–2 do AI sinh
**Là học sinh, em muốn** nhận gợi ý sát với câu trả lời sai của em **để** hiểu đúng chỗ mình vướng.
Should · HS3 · S1–S2 · L

- [ ] Gọi `POST /functions/v1/hint` đúng hợp đồng CONTRACT mục 4.
- [ ] Server tự đọc câu hỏi theo `question_id`; **không** dùng nội dung câu hỏi do client gửi.
- [ ] Không gửi `anon_id` hay bất kỳ định danh nào sang dịch vụ AI.
- [ ] Gợi ý mức 1 **không chứa đáp án** (kiểm bằng bộ test US-18).
- [ ] Câu trả lời luôn kèm dòng "AI có thể sai…".
- [ ] AI lỗi/hết lượt/mất mạng → tự chuyển sang gợi ý soạn sẵn (US-07), học sinh vẫn học tiếp được.
- [ ] Khóa API chỉ nằm trong biến môi trường của Supabase; `grep` thư mục `web/` không thấy khóa.

### US-09 · Điểm yếu của em và bài nên ôn lại
**Là học sinh, em muốn** xem tóm tắt các lỗi em hay mắc **để** biết nên ôn lại bài nào.
Must · HS2 · S1 · M

- [ ] Trang `results.html` hiện: số câu đã làm, tiến độ và tỉ lệ đúng **theo chương** và theo bài, top 3 lỗi sai em mắc nhiều nhất.
- [ ] Mỗi lỗi có link "Ôn lại" đến đúng mục bài học liên quan (trường `lessons` trong `misconceptions.json`).
- [ ] Chưa làm câu nào → hiện hướng dẫn "Hãy làm ít nhất 5 câu…", không hiện bảng trống.
- [ ] Chỉ hiện dữ liệu của chính mã ẩn danh đang đăng nhập.

### US-10 · Dashboard giáo viên
**Là giáo viên, tôi muốn** xem thống kê theo lớp và theo loại lỗi sai **để** biết cần giảng lại nội dung nào.
Should · HS2 (giao diện), HS3 (truy vấn) · S2 · M

- [ ] Chọn lớp → thấy số học sinh đã làm, tổng lượt, tỉ lệ đúng theo bài.
- [ ] Lọc theo chương; biểu đồ tần suất lỗi của chương đó; bấm một lỗi thấy các câu hay gây lỗi đó.
- [ ] Chỉ hiển thị mã ẩn danh, không có họ tên.
- [ ] Trang được bảo vệ bằng mã giáo viên (học sinh không vào được bằng mã lớp).
- [ ] Phương án dự phòng: nếu chưa kịp, GV dùng file CSV (US-11) + bảng tính.

### US-11 · Xuất CSV
**Là giáo viên, tôi muốn** tải dữ liệu làm bài dạng CSV **để** nhóm phân tích bằng Excel/Google Sheets.
Must · HS3 · S2 · S

- [ ] Một nút tải file CSV, mỗi dòng là một lượt trả lời: `anon_id, class, question_id, chapter, lesson, type, is_correct, misconception, hint_level_max, created_at`.
- [ ] Mở bằng Excel không lỗi font tiếng Việt (UTF-8 có BOM).
- [ ] Không có cột họ tên hay thông tin cá nhân.
- [ ] Đã thử mở file bằng Google Sheets và đếm khớp số dòng với dashboard.

### US-12 · Chế độ kiểm tra trước / sau
**Là giáo viên, tôi muốn** cho học sinh làm bài pre-test và post-test trên app **để** chấm nhanh và ghép điểm theo mã ẩn danh.
Should · HS2, HS3 · S2 · M

- [ ] GV bật chế độ "Kiểm tra" với một bộ đề cố định (pre hoặc post); khi đó **tắt** gợi ý, tắt chẩn đoán, tắt lời giải.
- [ ] Mỗi mã chỉ nộp được 1 lần mỗi bài kiểm tra.
- [ ] Kết quả xuất CSV có cột `test_type = pre | post`.
- [ ] Phương án dự phòng: đề giấy in sẵn (cùng nội dung) khi mất mạng.

### US-13 · Chế độ demo không cần backend
**Là học sinh, em muốn** dùng được app ngay cả khi chưa có Supabase hoặc mất mạng **để** việc ôn tập và buổi trình diễn không bị gián đoạn.
Must · HS2, HS3 · S1 · S

- [ ] Không có cấu hình Supabase → app tự chạy chế độ demo, hiện nhãn nhỏ "Chế độ demo".
- [ ] Kết quả lưu trong `localStorage` thông qua `web/js/store.js` (không gọi `localStorage` rải rác).
- [ ] Mọi trang US-01 → US-09 chạy được ở chế độ demo.
- [ ] Có nút "Xóa dữ liệu demo".

### US-14 · Nhãn "Chưa duyệt"
**Là giáo viên, tôi muốn** nội dung chưa được tôi duyệt phải hiện rõ là "Chưa duyệt" **để** học sinh không tin tuyệt đối vào nội dung chưa kiểm tra.
Must · HS2 (hiển thị), GV (duyệt) · S1 · S

- [ ] Câu hỏi có `reviewed: false` hiện nhãn "Chưa duyệt" màu cảnh báo.
- [ ] Có cách lọc chỉ lấy câu `reviewed: true` (dùng cho thực nghiệm).
- [ ] Chỉ GV (hoặc HS1 theo xác nhận bằng tin nhắn của GV) được đổi `reviewed` thành `true` – xem [quy trình duyệt](TEAM_WORKFLOW.md#6-quy-trình-kiểm-duyệt-nội-dung).

### US-15 · Giới hạn lượt hỏi AI
**Là giáo viên, tôi muốn** mỗi học sinh chỉ hỏi AI một số lượt mỗi ngày **để** kiểm soát chi phí và tránh lạm dụng.
Should* · HS3 · S2 · S

- [ ] Giới hạn N lượt/ngày/mã (đề xuất N = 20, cấu hình được ở server).
- [ ] Phản hồi có `remaining_today`; giao diện hiện "Còn X lượt gợi ý AI hôm nay".
- [ ] Hết lượt → vẫn xem được gợi ý soạn sẵn và lời giải (US-07).
- [ ] Giới hạn được kiểm ở **server**, không chỉ ở giao diện.

### US-16 · Thông báo quyền riêng tư
**Là học sinh, em muốn** biết app thu thập dữ liệu gì và dùng làm gì **để** yên tâm tham gia.
Must · HS1 (soạn nội dung), HS2 (hiển thị) · S1 · S

- [ ] Lần đầu vào app hiện thông báo ngắn (≤ 6 dòng): chỉ lưu mã ẩn danh + kết quả làm bài; không lưu họ tên; câu hỏi gửi AI không kèm thông tin cá nhân; kết quả chỉ công bố dạng tổng hợp; không ảnh hưởng điểm số; có thể dừng bất cứ lúc nào.
- [ ] Có link "Quyền riêng tư" ở chân trang.
- [ ] GV đã đọc và đồng ý nội dung.

### US-17 · Ghi nhận lượt làm bài
**Là giáo viên, tôi muốn** hệ thống ghi lại từng lượt trả lời, lỗi sai và mức gợi ý đã dùng **để** trả lời câu hỏi nghiên cứu số 2 và số 4.
Must · HS3 (bảng dữ liệu), HS2 (gọi `store.js`) · S1 · M

- [ ] Mỗi lần bấm "Kiểm tra" lưu 1 bản ghi: mã ẩn danh, lớp, câu hỏi, đúng/sai, mã lỗi (nếu có), mức gợi ý cao nhất đã mở, thời điểm.
- [ ] Cùng một API trong `store.js` cho cả demo và Supabase.
- [ ] Đã kiểm tra trên Supabase: làm 3 câu → thấy đúng 3 dòng.

### US-18 · Kiểm thử AI trên bộ 30 câu chuẩn
**Là giáo viên, tôi muốn** biết AI gợi ý đúng đến mức nào trước khi cho học sinh dùng **để** đảm bảo an toàn học tập.
Should* · HS3, GV · S2 · M

- [ ] Bộ 30 câu C1 (trước thực nghiệm) + 5 câu/chương C2–C7 (ưu tiên câu tính toán), có đáp án chuẩn được GV duyệt, gồm cả vài câu **ngoài phạm vi** (ví dụ hỏi bài Toán, hỏi chuyện riêng).
- [ ] Bảng ghi từng câu: gợi ý có sai kiến thức không, mức 1 có lộ đáp án không, câu ngoài phạm vi có bị từ chối không – do GV/HS chấm thủ công.
- [ ] Báo cáo 3 tỉ lệ: đúng kiến thức, lộ đáp án sớm, từ chối đúng. Ghi **số thật**.
- [ ] Ngưỡng đề xuất để bật AI: 0 lỗi kiến thức nghiêm trọng **trên từng chương** (GV quyết định). Chương nào không đạt → chương đó chỉ dùng gợi ý soạn sẵn.

### US-19 · Khảo sát thực trạng
**Là giáo viên, tôi muốn** có số liệu khảo sát về cách học sinh lớp 10 đang ôn tập **để** kiểm chứng lý do chọn đề tài.
Must · HS1, GV · S0 · S

- [ ] Phiếu ~15 câu, ẩn danh, không hỏi họ tên; GV duyệt trước khi phát.
- [ ] Có câu về: cách ôn hiện nay, khó khăn Chương 1, **nhu cầu học trước/học bù và chương thấy khó nhất**, hiểu thuật ngữ tiếng Anh, thói quen dùng AI.
- [ ] Nhà trường đã đồng ý phiếu khảo sát trước khi phát.
- [ ] Đến 20/11 có bảng tổng hợp + biểu đồ, ghi rõ số phiếu thu về (n = …).

### US-20 / US-21 / US-22 (Could)
- **US-20** Là học sinh, em muốn chuyển chế độ sáng/tối **để** đỡ mỏi mắt buổi tối. *(Giao diện đã theo hệ thống; story này chỉ thêm nút chuyển tay.)*
- **US-21** Là học sinh, em muốn luyện thuật ngữ bằng thẻ lật **để** nhớ từ nhanh hơn.
- **US-22** Là học sinh, em muốn mở app khi hoàn toàn không có mạng **để** ôn ở nhà không có Wi-Fi.

---

## Story mới cho phạm vi 7 chương

### US-23 · Dữ liệu tách theo chương
**Là thành viên nhóm, em muốn** dữ liệu mỗi chương nằm trong thư mục riêng và chỉ tải chương đang mở **để** 3 bạn soạn song song không đụng file của nhau, và trang nhẹ trên điện thoại.
Must · HS3 · S1 · M

- [ ] Có `web/data/chapters.json` và thư mục `web/data/c1/ … c7/` đúng [CONTRACT](../CONTRACT.md) mục 2–3.
- [ ] Dữ liệu C1 hiện có được chuyển vào `web/data/c1/` **không đổi mã** (B1–B4, M1–M10, T-001…, Q-B1-001…).
- [ ] `content.js` tách thành `loadIndex()` (tải ngay `chapters.json`) và `loadChapter(id)` (tải khi cần); trang Thuật ngữ tìm kiếm được cả 7 chương.
- [ ] Bỏ danh sách bài cố định B1–B4 trong `store.js` và ràng buộc `lesson` trong `schema.sql` (cho phép B1–B23); thêm cột `chapter` vào bảng `attempts`, thống kê và CSV.
- [ ] Bỏ các chỗ viết cứng "Chương 1" (`lesson.js`, `ui.js`, tiêu đề trang) và màu riêng B1–B4 trong `style.css` (chuyển sang màu theo chương).
- [ ] `results.js` nhận biết bài ôn tập bằng trường `kind: "review"`, không viết cứng `'B4'`.
- [ ] `validate.js` kiểm tra từng chương và kiểm tra mã không trùng **giữa các chương**.

### US-24 · Trang chủ chọn chương
**Là học sinh, em muốn** thấy 7 chương và tiến độ của em ở từng chương **để** biết mình đã ôn đến đâu.
Must · HS2 · S1 · M

- [ ] 7 thẻ chương, mỗi thẻ: tên chương, số bài, % câu đã làm, tỉ lệ đúng, số câu đã duyệt / tổng.
- [ ] Chương chưa có câu hỏi hiện "Đang biên soạn"; chương có nội dung chưa duyệt hiện nhãn "Bản nháp".
- [ ] Hiển thị tốt ở màn hình 360px.

### US-25 · Chế độ "Học trước"
**Là học sinh, em muốn** học một bài chưa học trên lớp theo trình tự đọc bài → kiểm tra nhanh → luyện tập **để** tự học có định hướng.
Should · HS2 (giao diện), HS1 (nội dung kiểm tra nhanh) · S1–S2 · M

- [ ] Trong mỗi bài có nút "Học bài này" dẫn qua 3 bước, có thanh tiến độ.
- [ ] 3 câu kiểm tra nhanh lấy từ trường `quick_check` của bài; sai thì hiện đoạn bài học liên quan.
- [ ] Ghi nhận lượt học trước (`mode = "learn"`) để trả lời câu hỏi nghiên cứu 5.

### US-26 · Báo lỗi nội dung
**Là học sinh, em muốn** bấm "Báo lỗi" khi thấy câu hỏi có vẻ sai **để** GV kiểm tra lại.
Should · HS2 · S2 · S

- [ ] Nút "Báo lỗi" trên mỗi câu; ghi mã câu + loại lỗi (đáp án / lời giải / chính tả / khác), không ghi thông tin cá nhân.
- [ ] GV xem danh sách báo lỗi trên dashboard (hoặc CSV).

### US-27 · Luyện tập tổng hợp (Could)
**Là học sinh, em muốn** làm một bộ câu trộn từ nhiều chương **để** ôn thi học kì.

### US-28 · Trợ lý AI cho mọi chương
**Là học sinh, em muốn** nhận gợi ý AI ở mọi chương đã được kiểm thử **để** được hỗ trợ cả khi học trước.
Should · HS3 · S2 · S

- [ ] Hướng dẫn hệ thống (system prompt) trong `supabase/functions/hint/index.ts` lấy tên chương/bài từ dữ liệu, không viết cứng "Chương 1".
- [ ] Hàm tìm câu hỏi theo mã ở đúng file chương (qua `chapters.json`), có bộ nhớ đệm.
- [ ] Có danh sách chương được bật AI (chỉ chương đã đạt kiểm thử US-18).

### US-29 · Trang quản trị lớp và mã học sinh
**Là quản trị viên (giáo viên phụ trách), tôi muốn** tạo lớp, đặt PIN giáo viên, sinh và xóa mã ẩn danh ngay trên website **để** không phải chạy SQL tay trong Supabase.
Should · HS3, HS2 · S2 · M

- [ ] `admin.html` yêu cầu **mã quản trị** (khác PIN giáo viên, ≥ 12 ký tự), kiểm ở máy chủ; sai mã chờ 1 giây rồi báo lỗi. Mã chỉ giữ trong sessionStorage.
- [ ] Thêm/sửa lớp: mã lớp, tên, nhóm thực nghiệm/đối chứng, PIN giáo viên (≥ 8 ký tự; để trống khi sửa = giữ nguyên).
- [ ] Sinh hàng loạt mã `PREFIX-01…NN` (1–200); mã đã có thì bỏ qua, không ghi đè; tải danh sách mã ra CSV.
- [ ] Xóa một mã hoặc cả lớp (kèm bài làm) chỉ sau khi xác nhận; xóa lớp phải gõ lại mã lớp.
- [ ] Không có ô họ tên/email; bảng đối chiếu mã với tên do giáo viên giữ ngoài hệ thống.
- [ ] Chỉ dùng được ở chế độ online; chế độ demo hiện thông báo. Trang không có trong thanh điều hướng.
- [ ] Đã chạy migration `20261124100000_admin_console.sql` và đặt mã quản trị bằng `select public.admin_set_code(...)`.

### US-C1 … US-C7 · Nội dung từng chương
**Là học sinh, em muốn** mỗi chương có đủ bài học, thuật ngữ và câu hỏi đã được GV duyệt **để** ôn tập và học trước một cách tin cậy.

Tiêu chí nghiệm thu chung = **tiêu chuẩn "chương hoàn thiện"** (Kế hoạch nghiên cứu mục 5.3; dây chuyền 7 bước ở [ROADMAP mục 3](ROADMAP.md#3-dây-chuyền-chương-áp-dụng-cho-mỗi-chương-c1c7)):
- [ ] Danh mục lỗi sai của chương đã được GV chốt.
- [ ] Mỗi bài: yêu cầu cần đạt, ý chính, mục nội dung, công thức, ≥ 1 ví dụ mẫu, 3 câu kiểm tra nhanh.
- [ ] Đủ chỉ tiêu thuật ngữ và câu hỏi; đủ 3 dạng; NB/TH/VD ≈ 25/45/30; mỗi lỗi ≥ 3 câu; đáp án đúng rải đều A–D.
- [ ] `validate.js` báo `ALL CHECKS PASSED`.
- [ ] 100% nội dung `reviewed: true` (GV duyệt) – trước đó luôn hiện nhãn "Chưa duyệt".
- [ ] Kiểm thử AI 5 câu của chương (US-18), riêng C1 là 30 câu.
- [ ] ≥ 3 học sinh ngoài nhóm đọc thử và góp ý.
- [ ] Ghi AI_USAGE_LOG cho mọi phần có AI hỗ trợ soạn.

Lưu ý riêng theo chương:
- **C1:** ưu tiên bổ sung B4 (chưa có câu NB) và M6 (mới có ở B3). Xem các mục còn mở trong `docs/content/REVIEW_SHEET.md`.
- **C2:** cần hình bảng tuần hoàn rút gọn (tự vẽ SVG hoặc nguồn có giấy phép mở). Cân nhắc chuyển thuật ngữ "valence electron" từ C1 sang B5.
- **C3:** công thức Lewis, liên kết σ/π cần hình minh họa; phân loại liên kết theo hiệu độ âm điện đúng ngưỡng SGK.
- **C4:** câu cân bằng phản ứng nên dùng dạng `short` (nhập tổng hệ số) hoặc `mcq`; lời giải ghi rõ các bước thăng bằng electron.
- **C5:** dùng số liệu ΔfH° và năng lượng liên kết **đúng bảng trong SGK** để học sinh đối chiếu được.
- **C6:** câu tính tốc độ trung bình và hệ số nhiệt độ dùng dạng `short`, ghi rõ đơn vị và cách làm tròn.
- **C7:** thí nghiệm halogen chỉ ở dạng hình ảnh/video có nguồn; nhấn mạnh an toàn hóa chất.
