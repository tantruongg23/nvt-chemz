# ⚠️ Sổ đăng ký rủi ro (Risk Register)

> Rủi ro là điều **có thể** xảy ra và làm hỏng kế hoạch. Ghi ra trước để không bị bất ngờ.
> **Người theo dõi chung:** HS3. Mỗi tối thứ Năm và trước mỗi mốc lớn, cả nhóm đọc lại bảng này 5 phút.

**Thang đánh giá:** Khả năng xảy ra (KN) và Mức ảnh hưởng (AH) chấm **1 (thấp) – 3 (cao)**. **Điểm = KN × AH**. Điểm ≥ 6 là 🔴 cần theo dõi hằng ngày; 3–4 là 🟡; 1–2 là 🟢.

**"Dấu hiệu kích hoạt"** = khi thấy dấu hiệu này thì lập tức thực hiện phương án xử lý, không chờ.

## Bảng rủi ro

| ID | Rủi ro | KN | AH | Điểm | Phương án phòng ngừa / xử lý | Người phụ trách | Dấu hiệu kích hoạt |
|---|---|---|---|---|---|---|---|
| R01 | **Không đủ thời gian** hoàn thành trước 23/11 (khối lượng tăng do mở rộng 7 chương) | 3 | 3 | 🔴 9 | Làm Must trước (C1–C3 + kỹ thuật); cắt theo thứ tự ở [ROADMAP mục 4](ROADMAP.md#4-nếu-bị-trễ-thì-cắt-gì-thứ-tự-cắt); MVP chế độ demo xong trước 20/11 | Cả nhóm (HS2 theo dõi) | Tối 18/11 chưa xong luồng luyện tập cơ bản |
| R02 | **Học sinh quá tải** vì trùng lịch kiểm tra trên lớp | 3 | 2 | 🔴 6 | Mỗi bạn khai lịch kiểm tra từ S0; giới hạn 2–4 giờ/ngày; chia lại việc khi một bạn báo quá tải; GV xin linh động nếu cần | GV, cả nhóm | Một bạn 2 ngày liền không cập nhật họp nhanh, hoặc ghi "quá tải" |
| R03 | **AI gợi ý sai kiến thức** | 2 | 3 | 🔴 6 | Server chỉ đưa vào AI câu hỏi + lời giải đã duyệt; kiểm thử 30 câu (US-18); luôn hiện "AI có thể sai"; mức 3 dùng lời giải đã duyệt, không dùng AI | HS3, GV | Bất kỳ lỗi kiến thức nào trong kiểm thử, hoặc học sinh báo gợi ý sai |
| R04 | **AI lộ đáp án ngay ở mức 1** (phá mục đích gợi ý từng bước) | 2 | 2 | 🟡 4 | Hướng dẫn hệ thống (prompt) cấm nêu đáp án ở mức 1–2; kiểm thử riêng tiêu chí này; nếu tỉ lệ lộ cao → dùng gợi ý soạn sẵn | HS3 | Tỉ lệ lộ đáp án trong kiểm thử > 10% (ngưỡng đề xuất, GV chốt) |
| R05 | **Lộ khóa API** (đưa nhầm vào code giao diện hoặc commit lên GitHub) | 2 | 3 | 🔴 6 | Khóa chỉ để trong biến môi trường Supabase; `.gitignore` file `.env`; trước mỗi PR chạy tìm kiếm chuỗi khóa trong `web/`; đặt giới hạn chi tiêu trên tài khoản API | HS3 | Thấy khóa trong commit/PR → **thu hồi khóa ngay**, tạo khóa mới, ghi DEVLOG |
| R06 | **Chi phí API vượt dự kiến** | 1 | 2 | 🟢 2 | Giới hạn lượt/ngày (US-15); dùng mô hình chi phí thấp; giới hạn độ dài câu trả lời; đặt hạn mức chi tiêu | HS3 | Chi phí theo dõi vượt 50% hạn mức trước khi thực nghiệm kết thúc |
| R07 | **Phòng máy không có mạng / mạng yếu** khi thực nghiệm | 2 | 3 | 🔴 6 | Chế độ demo chạy offline (US-13); thử phòng máy trước 1 ngày; phiếu giấy dự phòng cho pre/post-test; điểm phát Wi-Fi dự phòng của GV | GV, HS2 | Buổi thử phòng máy (23/11) không truy cập được Supabase |
| R08 | **Sai sót nội dung Hóa học** (đáp án sai, phương án nhiễu gắn sai lỗi) | 2 | 3 | 🔴 6 | Quy trình duyệt GV ([TEAM_WORKFLOW mục 6](TEAM_WORKFLOW.md#6-quy-trình-kiểm-duyệt-nội-dung)); nhãn "Chưa duyệt"; thực nghiệm chỉ dùng câu `reviewed: true`; có nút/kênh báo lỗi | HS1, GV | Đến 21/11 còn < 60 câu được duyệt |
| R09 | **Hai lớp không tương đương** hoặc học sinh vắng nhiều → dữ liệu khó so sánh | 2 | 2 | 🟡 4 | GV chọn 2 lớp có kết quả học tập tương đương; so sánh **mức tiến bộ** (sau − trước), không chỉ điểm sau; chỉ phân tích học sinh có đủ 2 bài; nêu rõ trong mục Hạn chế | GV, HS3 | Pre-test 2 lớp chênh lệch lớn, hoặc > 20% học sinh thiếu 1 trong 2 bài |
| R10 | **Mất dữ liệu thực nghiệm** | 1 | 3 | 🟡 3 | Xuất CSV cuối mỗi ngày thực nghiệm, lưu 2 nơi (Drive của GV + máy HS3); giữ phiếu giấy | HS3 | Supabase báo lỗi hoặc gói miễn phí sắp chạm giới hạn |
| R11 | **Vi phạm quyền riêng tư** (lỡ thu họ tên, công bố điểm cá nhân) | 1 | 3 | 🟡 3 | Không có ô nhập họ tên; danh sách đối chiếu mã ↔ học sinh chỉ GV giữ, không đưa lên hệ thống; chỉ công bố số liệu tổng hợp | GV, HS3 | Thấy họ tên trong bất kỳ file dữ liệu/ảnh chụp màn hình nào |
| R12 | **Thành viên không giải thích được phần mình làm** khi giám khảo hỏi | 2 | 3 | 🔴 6 | DoD có tiêu chí "giải thích được từng dòng"; review chéo; ghi AI_USAGE_LOG; luyện hỏi đáp theo [JUDGE_PREP.md](JUDGE_PREP.md) ≥ 3 lần | Cả nhóm, GV | Trong buổi luyện, một bạn không trả lời được câu về phần mình |
| R13 | **Kết quả thực nghiệm không ủng hộ giả thuyết** | 2 | 1 | 🟢 2 | Đây **không phải thất bại**: báo cáo trung thực, phân tích nguyên nhân, nêu hướng cải tiến. Không chỉnh sửa số liệu | HS3, GV | Kiểm định cho kết quả không có ý nghĩa thống kê |
| R14 | **Web Speech API không có giọng tiếng Anh** trên một số máy | 2 | 1 | 🟢 2 | Ẩn nút phát âm khi không hỗ trợ; vẫn hiện IPA; có thể bổ sung file âm thanh sau | HS2 | Thử trên máy phòng máy không phát âm được |
| R15 | **Ngày thi thay đổi** so với giả định ~03/12 | 2 | 2 | 🟡 4 | Theo dõi thông báo của BTC; ưu tiên hoàn thành báo cáo trước poster | GV | BTC công bố lịch chính thức |
| R16 | **GV không duyệt kịp nội dung 7 chương** (≈ 295 câu, ≈ 12–13 giờ duyệt) | 3 | 2 | 🔴 6 | Duyệt theo lô 15–20 câu/ngày theo thứ tự C1 → C7; HS tự kiểm tra kỹ trước khi gửi; chương chưa duyệt giữ nhãn "Bản nháp" ([ROADMAP mục 6](ROADMAP.md#6-nếu-bị-trễ-thì-cắt-gì-thứ-tự-cắt)) | GV, HS1 | Cuối ngày còn > 40 câu chờ duyệt |
| R17 | **Mở rộng 7 chương làm trễ Chương 1 / thực nghiệm** | 2 | 3 | 🔴 6 | C1 và thực nghiệm luôn ưu tiên; không ai làm C4–C7 khi việc C1 của mình chưa xong | Cả nhóm (HS1 theo dõi) | 21/11 C1 chưa đủ 60 câu đã duyệt |
| R18 | **Sai sót Hóa học do soạn nhanh / AI soạn nháp** ở chương mới | 3 | 3 | 🔴 9 | HS đối chiếu SGK từng câu; `validate.js`; GV duyệt 100%; nút báo lỗi (US-26); kiểm tra lại mọi phép tính | HS phụ trách chương, GV | GV trả lại > 20% câu trong một lô |
| R19 | **Chưa được phê duyệt** khảo sát / thực nghiệm có sự tham gia của học sinh | 2 | 3 | 🔴 6 | Nộp phiếu khảo sát, kế hoạch thực nghiệm, phiếu đồng ý cho nhà trường ngay trong S0; không thu dữ liệu trước khi được đồng ý | GV | 18/11 chưa có phản hồi của nhà trường |
| R20 | **Dữ liệu sử dụng C2–C7 quá ít** để nói được điều gì (ít học sinh tự nguyện, thời gian ngắn) | 3 | 1 | 🟡 3 | Báo cáo đúng là "số liệu bước đầu"; không suy diễn; tiếp tục thu trong học kì 2 | HS3 | < 20 học sinh dùng C2–C7 đến 01/12 |
| R21 | **Số thành viên vượt quy định** của thể lệ KHKT (nhiều cuộc thi giới hạn dự án tập thể tối đa 2 học sinh) | 2 | 3 | 🔴 6 | GV kiểm tra thể lệ cấp trường và cấp trên ngay trong S0; nếu giới hạn 2 → điều chỉnh tên tác giả, ghi nhận bạn thứ ba là cộng tác viên đúng quy định | GV | Thể lệ ghi giới hạn số tác giả |

## Lịch sử cập nhật

| Ngày | Thay đổi | Người cập nhật |
|---|---|---|
| 15/11/2026 | Tạo sổ rủi ro ban đầu (bản nháp có AI hỗ trợ) | GV |
| 15/11/2026 | Mở rộng phạm vi 7 chương: thêm R16–R21 (bản nháp có AI hỗ trợ) | GV |
