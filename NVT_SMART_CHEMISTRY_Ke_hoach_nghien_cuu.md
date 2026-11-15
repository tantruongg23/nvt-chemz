# KẾ HOẠCH NGHIÊN CỨU – CUỘC THI KHOA HỌC KỸ THUẬT CẤP TRƯỜNG

**Trường THPT Nguyễn Văn Thoại – Năm học 2026–2027**

| Mục | Nội dung |
|---|---|
| Tên dự án | **NVT SMART CHEMISTRY** – Nền tảng ôn tập Hóa học 10 tích hợp thuật ngữ tiếng Anh, chẩn đoán lỗi sai và trợ lý AI gợi ý từng bước |
| Lĩnh vực dự thi | Phần mềm hệ thống *(hoặc lĩnh vực phù hợp theo danh mục của Ban tổ chức)* |
| Nhóm tác giả | [Học sinh 1] – lớp [..]; [Học sinh 2] – lớp [..]; [Học sinh 3] – lớp [..] |
| Giáo viên hướng dẫn | [Họ tên] – Giáo viên Hóa học |
| Phạm vi thí điểm | Chương 1 Hóa học 10 – **Cấu tạo nguyên tử**, dùng cho ôn tập, bám theo SGK Hóa học 10 bộ **Kết nối tri thức với cuộc sống** (Bài 1–4) |

---

## 1. Lý do chọn đề tài

Sau khi học xong một chương, học sinh thường tự ôn tập bằng cách đọc lại vở hoặc làm đề trên mạng. Cách ôn này có ba hạn chế:

- Học sinh **không biết mình sai ở đâu và vì sao sai**. Đề trắc nghiệm thông thường chỉ báo đúng hoặc sai.
- Khi hỏi các công cụ AI phổ biến, học sinh dễ **nhận ngay đáp án**, có thể nhận câu trả lời không chính xác, và không được dẫn dắt để tự suy luận.
- Học sinh ít được tiếp cận **thuật ngữ Hóa học bằng tiếng Anh**, dù đây là định hướng đang được ngành giáo dục khuyến khích.

Nhóm muốn xây dựng một công cụ ôn tập kết hợp ba yếu tố: (1) câu hỏi được thiết kế để **chẩn đoán lỗi sai thường gặp**, (2) **trợ lý AI chỉ gợi ý từng bước**, dựa trên học liệu đã được giáo viên kiểm duyệt, và (3) **thuật ngữ tiếng Anh** lồng ghép ngay trong bài.

> Các khó khăn trên là giả định ban đầu, sẽ được kiểm chứng bằng khảo sát (mục 6.1).

## 2. Mục tiêu

1. Xây dựng website ôn tập Chương 1 Hóa học 10, dùng được trên điện thoại và máy tính.
2. Xây dựng ngân hàng câu hỏi có **gắn nhãn lỗi sai** (quan niệm sai) cho từng phương án nhiễu.
3. Xây dựng bộ thuật ngữ Việt – Anh của chương, có phát âm và ví dụ.
4. Tích hợp trợ lý AI **gợi ý 3 mức**: câu hỏi gợi mở, gợi ý trọng tâm, lời giải chi tiết. Trợ lý giới hạn trong phạm vi học liệu của chương.
5. Thống kê kết quả theo lớp và theo loại lỗi sai để giáo viên và học sinh biết nội dung cần ôn lại.
6. Thực nghiệm và đánh giá hiệu quả ôn tập so với cách ôn tập thông thường.

## 3. Câu hỏi nghiên cứu

1. Những lỗi sai nào học sinh lớp 10 thường mắc trong Chương Cấu tạo nguyên tử?
2. Ôn tập bằng nền tảng (câu hỏi chẩn đoán + gợi ý AI từng bước) có giúp học sinh **giảm lỗi sai** và **tăng điểm** so với ôn tập thông thường không?
3. Học sinh có cải thiện khả năng nhận biết thuật ngữ Hóa học tiếng Anh sau khi sử dụng không?
4. Học sinh đánh giá thế nào về tính dễ dùng và mức hữu ích của nền tảng? Khi có lựa chọn, học sinh dùng gợi ý từng bước hay xem ngay đáp án?

## 4. Giả thuyết

Học sinh ôn tập bằng NVT SMART CHEMISTRY sẽ có mức tiến bộ (điểm sau trừ điểm trước) **cao hơn** nhóm ôn tập thông thường, và tỷ lệ mắc các lỗi sai đã gắn nhãn sẽ giảm.

*Giả thuyết sẽ được kiểm chứng. Kết quả, dù ủng hộ hay không ủng hộ giả thuyết, đều được báo cáo trung thực.*

## 5. Sản phẩm (phiên bản thí điểm)

| Phân hệ | Chức năng |
|---|---|
| **Bài ôn tập** | Tóm tắt kiến thức theo SGK KNTT: Bài 1 – Thành phần của nguyên tử; Bài 2 – Nguyên tố hóa học (số hiệu, số khối, đồng vị, nguyên tử khối trung bình); Bài 3 – Cấu trúc lớp vỏ electron nguyên tử (orbital, lớp, phân lớp, cấu hình electron); Bài 4 – Ôn tập chương. Có hình minh họa. |
| **English Chemistry** | Khoảng 30 thuật ngữ (*atom, nucleus, proton, neutron, electron, atomic number, mass number, isotope, orbital, electron configuration…*), có phát âm, nghĩa và câu ví dụ |
| **Luyện tập chẩn đoán** | 60–80 câu theo định dạng mới: nhiều lựa chọn, đúng/sai, trả lời ngắn. Mỗi phương án sai gắn với một loại lỗi sai. |
| **Trợ lý AI gợi ý** | Khi học sinh làm sai, AI gợi ý theo 3 mức. AI chỉ trả lời trong phạm vi chương và luôn hiển thị cảnh báo "AI có thể sai". |
| **Bảng kết quả** | Học sinh xem các lỗi mình hay mắc và được gợi ý bài nên xem lại. Giáo viên xem thống kê theo lớp và theo loại lỗi. |

### Danh mục lỗi sai dự kiến (sẽ hiệu chỉnh sau khảo sát)

| Mã | Lỗi sai |
|---|---|
| M1 | Nhầm số khối (A) với nguyên tử khối |
| M2 | Cho rằng electron đóng góp đáng kể vào khối lượng nguyên tử |
| M3 | Tính sai số nơtron (ví dụ N = A + Z, hoặc nhầm Z với N) |
| M4 | Cho rằng các đồng vị khác nhau về số proton |
| M5 | Tính nguyên tử khối trung bình bằng trung bình cộng, không theo tỉ lệ phần trăm |
| M6 | Hiểu orbital là quỹ đạo chuyển động xác định (theo mô hình hành tinh) |
| M7 | Điền electron theo thứ tự lớp thay vì theo mức năng lượng (ví dụ điền 3d trước 4s) |
| M8 | Sai số electron tối đa của lớp hoặc phân lớp |
| M9 | Cho rằng số proton thay đổi khi nguyên tử tạo thành ion |
| M10 | Xác định sai tính kim loại hoặc phi kim dựa trên số electron lớp ngoài cùng |

### Công nghệ

- Giao diện: HTML, CSS, JavaScript (responsive cho điện thoại).
- Dữ liệu: Supabase (hoặc Firebase), gói miễn phí.
- AI: gọi API mô hình ngôn ngữ thông qua hàm xử lý phía máy chủ. **Khóa API không đặt trong mã giao diện.** Mỗi học sinh bị giới hạn số lượt hỏi mỗi ngày.
- Nội dung học liệu và đáp án do nhóm biên soạn, **giáo viên hướng dẫn kiểm duyệt**.

## 6. Phương pháp nghiên cứu

### 6.1. Khảo sát thực trạng
Khảo sát trực tuyến ẩn danh khoảng 15 câu, dành cho học sinh lớp 10. Nội dung gồm: cách ôn tập hiện nay, khó khăn trong Chương 1, mức độ hiểu thuật ngữ tiếng Anh, thói quen sử dụng AI khi học.

### 6.2. Xây dựng sản phẩm
Phân tích yêu cầu → thiết kế giao diện và dữ liệu → lập trình → kiểm thử.

**Kiểm thử AI:** dùng bộ 30 câu hỏi có đáp án chuẩn do giáo viên duyệt. Ghi nhận tỷ lệ AI trả lời đúng, tỷ lệ AI tự đưa ngay đáp án khi chưa được yêu cầu, và khả năng từ chối câu hỏi ngoài phạm vi.

### 6.3. Thực nghiệm sư phạm
- **Đối tượng:** 2 lớp 10 có kết quả học tập tương đương. Một lớp là nhóm **thực nghiệm** (ôn tập bằng nền tảng), một lớp là nhóm **đối chứng** (ôn tập bằng phiếu bài tập thông thường, cùng nội dung và cùng thời lượng).
- **Bài kiểm tra trước (pre-test):** 20 câu kiến thức và 10 câu thuật ngữ, khoảng 15 phút.
- **Thời gian ôn tập:** khoảng 1 tuần, gồm 1 buổi trên lớp và phần tự ôn ở nhà.
- **Bài kiểm tra sau (post-test):** tương đương bài trước về nội dung và độ khó (giáo viên kiểm duyệt). Thêm phiếu khảo sát mức độ hài lòng theo thang Likert 5 mức.
- **Dữ liệu sử dụng:** số lượt luyện tập, tần suất mắc từng loại lỗi, mức gợi ý AI được sử dụng.

### 6.4. Phân tích dữ liệu
- So sánh điểm trước và sau của từng nhóm (kiểm định t ghép cặp). So sánh mức tiến bộ giữa hai nhóm (kiểm định t độc lập). Tính mức độ ảnh hưởng (Cohen's d).
- So sánh tỷ lệ mắc từng lỗi M1–M10 trước và sau thực nghiệm.
- Thống kê mô tả cho khảo sát và dữ liệu sử dụng.
- **Hạn chế dự kiến:** mẫu nhỏ, thời gian ngắn, chưa phân công lớp ngẫu nhiên. Các hạn chế này sẽ được nêu rõ trong báo cáo.

## 7. An toàn, đạo đức và bảo vệ dữ liệu

- Thực nghiệm chỉ tiến hành khi có sự đồng ý của nhà trường và giáo viên bộ môn. Học sinh tham gia được giải thích mục đích và tự nguyện tham gia, có thể dừng bất cứ lúc nào. Phiếu đồng ý của phụ huynh được thực hiện theo yêu cầu của thể lệ.
- Học sinh dùng **mã số ẩn danh**. Không thu thập họ tên, số điện thoại hay email trên nền tảng.
- **Không gửi thông tin cá nhân của học sinh tới dịch vụ AI.** Chỉ gửi nội dung câu hỏi học tập. Chọn dịch vụ AI không dùng dữ liệu đầu vào để huấn luyện mô hình.
- Kết quả chỉ công bố ở dạng tổng hợp, không công bố điểm của từng cá nhân.
- Kết quả thực nghiệm không ảnh hưởng đến điểm số chính thức của học sinh.
- Hình ảnh và tài liệu dùng trong học liệu có nguồn hợp pháp và được ghi nguồn.

## 8. Khai báo sử dụng công cụ AI trong quá trình thực hiện

Nhóm có sử dụng công cụ AI để hỗ trợ lập trình, rà soát mã nguồn và soạn thảo một phần tài liệu. Toàn bộ nội dung Hóa học, đáp án và thuật ngữ do nhóm biên soạn và giáo viên kiểm duyệt. Phần việc của từng thành viên và các nội dung có AI hỗ trợ được ghi trong **nhật ký phát triển** (đính kèm phụ lục). Mỗi thành viên có thể tự giải thích phần việc mình phụ trách.

## 9. Phân công

| Thành viên | Nhiệm vụ chính |
|---|---|
| [Học sinh 1] | Học liệu, thuật ngữ Việt – Anh, ngân hàng câu hỏi và nhãn lỗi sai; khảo sát |
| [Học sinh 2] | Giao diện, phân hệ luyện tập và bảng kết quả |
| [Học sinh 3] | Cơ sở dữ liệu, tích hợp trợ lý AI, kiểm thử AI; phân tích số liệu |
| Cả nhóm | Thực nghiệm, báo cáo, poster, thuyết trình |
| Giáo viên hướng dẫn | Định hướng, kiểm duyệt nội dung Hóa học, phối hợp tổ chức thực nghiệm |

## 10. Tiến độ

| Thời gian | Công việc |
|---|---|
| 15/11 – 18/11 | Khảo sát; chốt danh mục lỗi sai; biên soạn học liệu, thuật ngữ và câu hỏi; dựng khung website |
| 19/11 – 22/11 | Hoàn thiện luyện tập, AI gợi ý và bảng kết quả; kiểm thử AI; thử nghiệm với 5–8 học sinh rồi chỉnh sửa |
| **23/11** | **Nộp hồ sơ dự thi** (kế hoạch nghiên cứu, sản phẩm thí điểm, kết quả khảo sát và kiểm thử AI) |
| 24/11 – 28/11 | Kiểm tra trước, ôn tập, kiểm tra sau với 2 lớp 10 |
| 29/11 – trước ngày thi (đầu tháng 12) | Phân tích số liệu thực nghiệm, hoàn thiện báo cáo và poster, luyện thuyết trình |

*Kết quả dự thi cấp trường là kết quả bước đầu. Nếu dự án được chọn đi tiếp, nhóm sẽ mở rộng thực nghiệm (thêm lớp, kéo dài thời gian, kiểm tra kết quả sau 3–4 tuần) và mở rộng thêm chương.*

## 11. Rủi ro và phương án xử lý

| Rủi ro | Phương án |
|---|---|
| AI trả lời sai | Giới hạn phạm vi, kiểm thử trước, hiển thị cảnh báo; luôn có lời giải chuẩn do giáo viên duyệt để đối chiếu |
| Học sinh lạm dụng xem đáp án | Gợi ý theo thứ tự 3 mức; ghi nhận mức gợi ý đã dùng |
| Không đủ thời gian | Ưu tiên phần luyện tập chẩn đoán và thống kê; AI là phần bổ sung |
| Lỗi mạng hoặc thiết bị khi thực nghiệm | Tổ chức tại phòng máy; chuẩn bị phiếu giấy dự phòng cho bài kiểm tra |
| Chi phí AI | Giới hạn số lượt hỏi; dùng mô hình chi phí thấp |

## 12. Kết quả dự kiến

- Website ôn tập Chương 1 Hóa học 10 hoạt động được, có thể trình diễn.
- Bộ học liệu, khoảng 30 thuật ngữ Việt – Anh, 60–80 câu hỏi gắn nhãn lỗi sai, đã được kiểm duyệt.
- Báo cáo kiểm thử AI và báo cáo thực nghiệm (số liệu thật, nêu rõ hạn chế).
- Danh mục lỗi sai thường gặp của học sinh lớp 10 tại trường. Danh mục này giáo viên có thể dùng lại khi dạy.

## 13. Tài liệu tham khảo

- Bộ Giáo dục và Đào tạo (2018). *Chương trình giáo dục phổ thông môn Hóa học.*
- Sách giáo khoa Hóa học 10, bộ Kết nối tri thức với cuộc sống. NXB Giáo dục Việt Nam.
- [Bổ sung tài liệu về quan niệm sai trong Hóa học, học tập tích hợp nội dung và ngôn ngữ (CLIL), và AI trong giáo dục mà nhóm đã đọc.]
