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
| US-01 | Vào app bằng mã lớp + mã ẩn danh | Must | HS2, HS3 | S1 | M | ⬜ |
| US-02 | Ôn lại kiến thức Bài 1–4 | Must | HS1, HS2 | S1 | M | ⬜ |
| US-03 | Tra thuật ngữ Việt – Anh, nghe phát âm | Must | HS1, HS2 | S1 | M | ⬜ |
| US-04 | Luyện tập theo bài với 3 dạng câu hỏi | Must | HS2 | S1 | L | ⬜ |
| US-05 | Chẩn đoán ngay lỗi sai khi trả lời sai | Must | HS2, HS1 | S1 | M | ⬜ |
| US-06 | Ngân hàng ≥ 60 câu gắn nhãn lỗi sai | Must | HS1, GV | S1 | L | ⬜ |
| US-07 | Thang gợi ý 3 mức (bản soạn sẵn) | Must | HS2 | S1 | M | ⬜ |
| US-08 | Gợi ý mức 1–2 do AI sinh qua Edge Function | Should | HS3 | S1–S2 | L | ⬜ |
| US-09 | Xem điểm yếu của bản thân và bài nên ôn lại | Must | HS2 | S1 | M | ⬜ |
| US-10 | Dashboard giáo viên theo lớp và theo lỗi sai | Should | HS2, HS3 | S2 | M | ⬜ |
| US-11 | Xuất CSV để phân tích | Must | HS3 | S2 | S | ⬜ |
| US-12 | Chế độ kiểm tra trước / sau (pre/post-test) | Should | HS2, HS3 | S2 | M | ⬜ |
| US-13 | Chế độ demo không cần backend | Must | HS2, HS3 | S1 | S | ⬜ |
| US-14 | Nhãn "Chưa duyệt" cho nội dung chưa được GV duyệt | Must | HS2, GV | S1 | S | ⬜ |
| US-15 | Giới hạn số lượt hỏi AI mỗi ngày | Should* | HS3 | S2 | S | ⬜ |
| US-16 | Thông báo quyền riêng tư | Must | HS1, HS2 | S1 | S | ⬜ |
| US-17 | Ghi nhận mỗi lượt làm bài và mức gợi ý đã dùng | Must | HS3, HS2 | S1 | M | ⬜ |
| US-18 | Kiểm thử AI trên bộ 30 câu chuẩn | Should* | HS3, GV | S2 | M | ⬜ |
| US-19 | Khảo sát thực trạng | Must | HS1, GV | S0 | S | ⬜ |
| US-20 | Chuyển chế độ sáng/tối | Could | HS2 | S2 | S | ⬜ |
| US-21 | Thẻ ghi nhớ (flashcard) luyện thuật ngữ | Could | HS1, HS2 | S2 | M | ⬜ |
| US-22 | Hoạt động offline hoàn toàn (PWA) | Could | HS2 | S4 | M | ⬜ |
| — | Bảng xếp hạng điểm giữa học sinh | Won't | — | — | — | — |
| — | Chat tự do với AI về mọi chủ đề | Won't | — | — | — | — |
| — | Đăng nhập bằng họ tên / email / Google | Won't | — | — | — | — |

\* **US-15** và **US-18** bắt buộc phải xong **nếu** US-08 (AI thật) được bật trong thực nghiệm. Nếu không bật AI, hai story này không cần.

**Ước tính khối lượng Must:** 7 M + 2 L + 5 S ≈ 45 giờ cho cả nhóm ≈ 15 giờ mỗi bạn trong S0–S2 → vừa sức nếu mỗi bạn làm 3–4 giờ/ngày. Không nhận thêm Should khi Must của mình chưa xong.

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

### US-02 · Ôn lại kiến thức Bài 1–4
**Là học sinh, em muốn** đọc tóm tắt kiến thức từng bài B1–B4 **để** nhớ lại ý chính trước khi làm bài.
Must · HS1 (nội dung `lessons.json`), HS2 (trang `lesson.html`) · S1 · M

- [ ] Có đủ 4 bài B1–B4, mỗi bài có tên tiếng Việt + tiếng Anh, phần "Ý chính", các mục nội dung, công thức chính.
- [ ] Thuật ngữ trong bài hiện dạng chip; bấm vào chip mở định nghĩa thuật ngữ.
- [ ] Cuối mỗi bài có nút "Luyện tập bài này" dẫn sang US-04.
- [ ] Đọc dễ trên điện thoại màn hình 360px (không phải cuộn ngang).
- [ ] Nội dung do HS1 soạn, GV đã đọc (xem US-14).

### US-03 · Tra thuật ngữ Việt – Anh và nghe phát âm
**Là học sinh, em muốn** xem các thuật ngữ Hóa học tiếng Anh của chương và nghe phát âm **để** đọc hiểu được tài liệu tiếng Anh.
Must · HS1 (`terms.json` ~30 thuật ngữ), HS2 (`terms.html`) · S1 · M

- [ ] Hiển thị ≥ 30 thuật ngữ, mỗi thuật ngữ có: từ tiếng Anh, nghĩa tiếng Việt, phiên âm IPA, định nghĩa, câu ví dụ Anh – Việt.
- [ ] Lọc được theo bài (B1–B4) và tìm kiếm theo từ tiếng Anh hoặc tiếng Việt.
- [ ] Nút 🔊 phát âm bằng Web Speech API (giọng `en-US` hoặc `en-GB`).
- [ ] Trình duyệt không hỗ trợ giọng đọc → nút bị ẩn hoặc hiện "Trình duyệt chưa hỗ trợ phát âm", **không** báo lỗi đỏ.
- [ ] HS1 đã đối chiếu IPA với một từ điển uy tín (ghi nguồn trong `docs/content/`).

### US-04 · Luyện tập theo bài với 3 dạng câu hỏi
**Là học sinh, em muốn** chọn một bài và làm các câu nhiều lựa chọn, đúng/sai, trả lời ngắn **để** quen với định dạng đề thi mới.
Must · HS2 · S1 · L (nên chia: 4a mcq · 4b true_false · 4c short)

- [ ] Chọn được bài B1, B2, B3, B4 hoặc "Cả chương".
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

- [ ] ≥ 60 câu, phân bổ cả 4 bài và 3 mức NB/TH/VD; có đủ 3 dạng câu hỏi.
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

- [ ] Trang `results.html` hiện: số câu đã làm, tỉ lệ đúng theo bài, top 3 lỗi sai em mắc nhiều nhất.
- [ ] Mỗi lỗi có link "Ôn lại" đến đúng mục bài học liên quan (trường `lessons` trong `misconceptions.json`).
- [ ] Chưa làm câu nào → hiện hướng dẫn "Hãy làm ít nhất 5 câu…", không hiện bảng trống.
- [ ] Chỉ hiện dữ liệu của chính mã ẩn danh đang đăng nhập.

### US-10 · Dashboard giáo viên
**Là giáo viên, tôi muốn** xem thống kê theo lớp và theo loại lỗi sai **để** biết cần giảng lại nội dung nào.
Should · HS2 (giao diện), HS3 (truy vấn) · S2 · M

- [ ] Chọn lớp → thấy số học sinh đã làm, tổng lượt, tỉ lệ đúng theo bài.
- [ ] Biểu đồ cột tần suất M1–M10 của lớp; bấm một lỗi thấy các câu hay gây lỗi đó.
- [ ] Chỉ hiển thị mã ẩn danh, không có họ tên.
- [ ] Trang được bảo vệ bằng mã giáo viên (học sinh không vào được bằng mã lớp).
- [ ] Phương án dự phòng: nếu chưa kịp, GV dùng file CSV (US-11) + bảng tính.

### US-11 · Xuất CSV
**Là giáo viên, tôi muốn** tải dữ liệu làm bài dạng CSV **để** nhóm phân tích bằng Excel/Google Sheets.
Must · HS3 · S2 · S

- [ ] Một nút tải file CSV, mỗi dòng là một lượt trả lời: `anon_id, class, question_id, lesson, type, is_correct, misconception, hint_level_max, created_at`.
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

- [ ] Bộ 30 câu có đáp án chuẩn được GV duyệt, gồm cả vài câu **ngoài phạm vi** (ví dụ hỏi bài Toán, hỏi chuyện riêng).
- [ ] Bảng ghi từng câu: gợi ý có sai kiến thức không, mức 1 có lộ đáp án không, câu ngoài phạm vi có bị từ chối không – do GV/HS chấm thủ công.
- [ ] Báo cáo 3 tỉ lệ: đúng kiến thức, lộ đáp án sớm, từ chối đúng. Ghi **số thật**.
- [ ] Ngưỡng đề xuất để bật AI cho thực nghiệm: 0 lỗi kiến thức nghiêm trọng (GV quyết định). Không đạt → chỉ dùng gợi ý soạn sẵn.

### US-19 · Khảo sát thực trạng
**Là giáo viên, tôi muốn** có số liệu khảo sát về cách học sinh lớp 10 đang ôn tập **để** kiểm chứng lý do chọn đề tài.
Must · HS1, GV · S0 · S

- [ ] Phiếu ~15 câu, ẩn danh, không hỏi họ tên; GV duyệt trước khi phát.
- [ ] Có câu về: cách ôn hiện nay, khó khăn Chương 1, hiểu thuật ngữ tiếng Anh, thói quen dùng AI.
- [ ] Đến 20/11 có bảng tổng hợp + biểu đồ, ghi rõ số phiếu thu về (n = …).

### US-20 / US-21 / US-22 (Could)
- **US-20** Là học sinh, em muốn chuyển chế độ sáng/tối **để** đỡ mỏi mắt buổi tối. *(Giao diện đã theo hệ thống; story này chỉ thêm nút chuyển tay.)*
- **US-21** Là học sinh, em muốn luyện thuật ngữ bằng thẻ lật **để** nhớ từ nhanh hơn.
- **US-22** Là học sinh, em muốn mở app khi hoàn toàn không có mạng **để** ôn ở nhà không có Wi-Fi.
