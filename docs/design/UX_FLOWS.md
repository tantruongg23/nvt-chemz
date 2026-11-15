# Luồng trải nghiệm (UX flows)

Các sơ đồ dưới đây mô tả hành trình chính trên website. Tên trang khớp với tệp trong `web/`. Dữ liệu người dùng luôn đi qua `web/js/store.js` (xem `docs/architecture/ARCHITECTURE.md` §3).

## 1. Học sinh – đăng nhập và ôn tập

```mermaid
flowchart TD
  A([Mở index.html]) --> B{Đã có phiên?}
  B -- Chưa --> C[Nhập mã lớp + mã học sinh<br/>ví dụ DEMO-TN / TN-01]
  C --> D{store.login ok?}
  D -- Không --> C1[Báo lỗi tiếng Việt<br/>giữ nguyên ô nhập] --> C
  D -- Có --> E
  B -- Rồi --> E[Trang chủ: thẻ chào mừng<br/>vòng độ chính xác + gợi ý bài nên luyện]
  E --> F[Chọn ô bài B1–B4]
  E --> G[Thuật ngữ]
  E --> H[Luyện tổng hợp]
  E --> R[Kết quả]
  F --> L[lesson.html: ý chính, công thức,<br/>các mục + chip thuật ngữ, lỗi hay gặp]
  L -->|Bấm chip| P[Popover: nghĩa, IPA, 🔊 US/UK]
  L -->|Luyện tập bài này| Q[practice.html?lesson=Bx]
  H --> Q
```

## 2. Học sinh – trả lời một câu hỏi (practice.html)

```mermaid
flowchart TD
  S([Hiện câu hỏi + nhãn dạng/mức độ/Chưa duyệt]) --> T{Cần gợi ý?}
  T -- Có --> H1[Mức 1 – Gợi mở] --> H2[Mức 2 – Gợi ý trọng tâm] --> H3{Mở lời giải<br/>trước khi trả lời?}
  H3 -- Xác nhận --> H4[Mức 3 – Lời giải]
  T -- Không --> A
  H1 --> A
  H2 --> A
  H4 --> A
  A[Chọn / nhập đáp án] --> K[Kiểm tra]
  K --> G[grade → is_correct, misconception_codes]
  G --> SV[store.saveAttempt<br/>hint_level_used, duration_ms, mode]
  SV --> D{Đúng?}
  D -- Đúng --> OK[Phản hồi xanh + nảy nhẹ + chuỗi đúng<br/>hiện lời giải]
  D -- Một phần/Sai --> BAD[Phản hồi + huy hiệu lỗi M# + cách sửa<br/>liên kết Ôn lại / Luyện lỗi này]
  BAD --> T2{Muốn tự tìm chỗ sai?}
  T2 -- Có --> H1
  T2 -- Không --> X[Xem lời giải chi tiết]
  OK --> N[Câu tiếp theo]
  X --> N
  N --> E{Hết câu?}
  E -- Chưa --> S
  E -- Rồi --> SUM[Tổng kết: vòng điểm, lỗi gặp trong phiên,<br/>Làm lại / Xem thống kê / Ôn bài]
```

Biến thể:
- **Lớp đối chứng** (`group = control`) – không hiện thang gợi ý; sau khi trả lời hiện lời giải ngay.
- **Kiểm tra trước/sau** (`practice.html?mode=pretest|posttest`) – không gợi ý, không phản hồi từng câu, `hint_level_used = 0`; chỉ hiện tổng kết cuối bài.
- **Hết lượt gợi ý / AI lỗi** (`RATE_LIMITED`, `AI_BUSY`, `NETWORK`…) – thông báo ngắn, khóa nút gợi ý, vẫn cho "Xem lời giải chi tiết".

## 3. Học sinh – xem kết quả và ôn lỗi sai

```mermaid
flowchart LR
  R([results.html]) --> S[store.getMyStats]
  S --> K[KPI: lượt làm, độ chính xác,<br/>số lượt dùng gợi ý, gợi ý hôm nay]
  S --> B[Vòng độ chính xác B1–B4 → Luyện]
  S --> M[Danh sách lỗi M# theo số lần]
  M --> M1[Ôn lại Bx → lesson.html?id=Bx]
  M --> M2[Luyện lỗi này → practice.html?m=M#]
```

## 4. Giáo viên – dashboard lớp

```mermaid
flowchart TD
  T([teacher.html]) --> L[Nhập mã lớp + PIN]
  L --> V{store.getClassStats ok?}
  V -- INVALID_PIN --> E[Báo "PIN không đúng"] --> L
  V -- ok --> D[Dashboard]
  D --> F[Lọc: Tất cả / Luyện tập / KT trước / KT sau]
  F --> D
  D --> C1[Độ chính xác theo bài]
  D --> C2[Tỉ lệ học sinh mắc từng lỗi]
  D --> C3[Điểm TB KT trước vs KT sau]
  D --> C4[Bản đồ nhiệt bài × mã lỗi<br/>từ getClassExport]
  D --> C5[Câu khó nhất + lỗi chính]
  D --> X1[CSV lượt làm → phân tích t-test]
  D --> X2[CSV lỗi sai theo bài]
  D --> O[Thoát → xóa PIN khỏi sessionStorage]
```

## 5. Trình diễn tại hội thi (dự phòng mất mạng)

```mermaid
sequenceDiagram
  participant GK as Giám khảo
  participant W as Website (?demo=1)
  participant LS as localStorage
  GK->>W: Mở index.html?demo=1
  W->>W: getMode() = "demo"
  GK->>W: Đăng nhập DEMO-TN / TN-01
  W->>LS: nvt.session
  GK->>W: Làm câu, xin gợi ý (soạn sẵn, nhãn "Chế độ demo")
  W->>LS: nvt.attempts, nvt.hints
  GK->>W: teacher.html, PIN demo-gv-2026
  W-->>GK: Dashboard = dữ liệu minh họa + lượt làm vừa thực hiện
```
