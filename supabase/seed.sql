-- =====================================================================
-- NVT CHEMZ – Dữ liệu mẫu (chạy SAU schema.sql)
-- 2 lớp demo để thử website và dashboard giáo viên trước khi thực nghiệm thật.
-- ⚠ PIN demo là công khai. KHÔNG dùng lại cho lớp thật.
-- =====================================================================

-- Lớp thực nghiệm (được dùng gợi ý AI) và lớp đối chứng (không có gợi ý AI).
select public.admin_upsert_class('DEMO-TN', 'Lớp demo – Thực nghiệm', 'demo-gv-2026', 'experiment');
select public.admin_upsert_class('DEMO-DC', 'Lớp demo – Đối chứng',   'demo-gv-2026', 'control');

-- 10 mã ẩn danh mỗi lớp: TN-01 … TN-10 và DC-01 … DC-10.
select public.admin_add_students('DEMO-TN', 'TN', 10);
select public.admin_add_students('DEMO-DC', 'DC', 10);

-- Bài làm mẫu cho lớp DEMO-TN để dashboard có số liệu khi trình diễn.
-- Dùng hàm băm của (học sinh, câu) nên kết quả giống nhau mỗi lần chạy.
delete from public.attempts where anon_id like 'TN-%';

insert into public.attempts
  (anon_id, question_id, lesson, answer, is_correct, misconception_codes,
   hint_level_used, duration_ms, mode, created_at)
select
  s.anon_id,
  q.question_id,
  q.lesson,
  to_jsonb(case when r.v < 60 then q.right_key else q.wrong_key end),
  r.v < 60                                            as is_correct,
  case when r.v < 60 or q.misconception is null then '{}'::text[] else array[q.misconception] end,
  case when m.mode = 'practice' and r.v >= 60 then (r.v % 4) else 0 end,
  20000 + r.v * 900                                   as duration_ms,
  m.mode,
  timestamptz '2026-11-24 08:00:00+07'
    + (m.day_offset || ' days')::interval + (r.v || ' minutes')::interval
from public.students s
cross join (values
  -- (khớp đáp án và mã lỗi của phương án sai trong web/data/questions.json)
  ('Q-B1-001', 'B1', 'A', 'B', null::text),
  ('Q-B1-002', 'B1', 'D', 'A', 'M2'),
  ('Q-B2-001', 'B2', 'C', 'D', 'M1'),
  ('Q-B2-002', 'B2', 'D', 'B', 'M1'),
  ('Q-B2-003', 'B2', 'A', 'B', 'M4'),
  ('Q-B3-001', 'B3', 'B', 'A', 'M6'),
  ('Q-B3-002', 'B3', 'A', 'B', 'M6'),
  ('Q-B3-003', 'B3', 'C', 'A', 'M8')
) as q(question_id, lesson, right_key, wrong_key, misconception)
cross join (values ('pretest', 0), ('practice', 2), ('posttest', 4)) as m(mode, day_offset)
cross join lateral (
  -- Số giả ngẫu nhiên 0–99; bài sau (posttest) có tỉ lệ đúng cao hơn bài trước.
  select greatest(0, (abs(hashtext(s.anon_id || q.question_id || m.mode)) % 100)
         - case m.mode when 'posttest' then 20 when 'practice' then 5 else 0 end
         + 10) as v
) as r
where s.class_code = 'DEMO-TN';
