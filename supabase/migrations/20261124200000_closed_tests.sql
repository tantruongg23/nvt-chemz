-- =====================================================================
-- 20261124200000: đề kiểm tra trước / sau KÍN (US-12)
-- Toàn bộ nội dung đề, đáp án và mã lỗi của phương án nằm ở máy chủ; web/ không chứa đề.
-- Học sinh chỉ nhận câu hỏi (không kèm đáp án) qua start_test và gửi bài qua submit_test;
-- máy chủ tự chấm, ghi vào attempts (mode = pretest/posttest) và chỉ cho nộp 1 lần mỗi mã.
-- Giáo viên bật/tắt từng bài (pre/post) cho lớp mình bằng PIN.
-- Nội dung đề KHÔNG nằm trong file này: nạp bằng supabase/seed_closed_tests.sql
-- (sinh từ docs/research bằng docs/content/build_closed_tests.js --sql; file đó bị Git bỏ qua).
-- Quy tắc: xem migrations/README.md. Chỉ THÊM mới, trừ chính sách INSERT của attempts (xem cuối file).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. BẢNG
-- ---------------------------------------------------------------------

-- Ngân hàng đề kín. test_type: pre = Đề A, post = Đề B.
create table if not exists public.test_items (
  id                    text primary key check (id ~ '^T[AB]-[0-9]{2}$'),
  test_type             text not null check (test_type in ('pre', 'post')),
  no                    smallint not null check (no between 1 and 60),
  part                  smallint not null check (part in (1, 2)),   -- 1 = kiến thức, 2 = thuật ngữ
  lesson                text not null check (lesson ~ '^B([1-9]|1[0-9]|2[0-3])$'),
  target_misconception  text check (target_misconception is null or target_misconception ~ '^M[0-9]{1,2}$'),
  stem                  text not null,
  options               jsonb not null,   -- [{key, text, misconception}] — CHỈ máy chủ đọc
  answer                text not null check (answer in ('A', 'B', 'C', 'D')),
  unique (test_type, no)
);

-- Giáo viên bật / tắt bài kiểm tra cho từng lớp (mặc định tắt).
create table if not exists public.test_settings (
  class_code text not null references public.classes (code) on delete cascade,
  test_type  text not null check (test_type in ('pre', 'post')),
  is_open    boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (class_code, test_type)
);

-- Mỗi mã một dòng cho mỗi bài. submitted_at khác NULL ⇒ đã nộp, không làm lại được.
create table if not exists public.test_submissions (
  anon_id       text not null references public.students (anon_id) on delete cascade,
  test_type     text not null check (test_type in ('pre', 'post')),
  started_at    timestamptz not null default now(),
  submitted_at  timestamptz,
  correct_count smallint check (correct_count between 0 and 60),
  score         numeric(4, 1) check (score between 0 and 10),
  primary key (anon_id, test_type)
);

alter table public.test_items       enable row level security;
alter table public.test_settings    enable row level security;
alter table public.test_submissions enable row level security;
revoke all on public.test_items, public.test_settings, public.test_submissions from anon, authenticated;

-- ---------------------------------------------------------------------
-- 2. HÀM
-- ---------------------------------------------------------------------

-- Nội bộ: mã học sinh phải thuộc đúng lớp, nếu không báo UNKNOWN_STUDENT.
create or replace function public._require_student(p_class_code text, p_anon_id text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_anon text := upper(trim(p_anon_id));
begin
  if not exists (select 1 from public.students
                 where anon_id = v_anon and class_code = upper(trim(p_class_code))) then
    raise exception 'UNKNOWN_STUDENT' using errcode = 'P0001';
  end if;
  return v_anon;
end;
$$;

-- Trạng thái hai bài kiểm tra của một học sinh (không lộ nội dung đề).
create or replace function public.get_test_status(p_class_code text, p_anon_id text)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_anon text := public._require_student(p_class_code, p_anon_id);
  v_class text := upper(trim(p_class_code));
begin
  return coalesce((
    select json_agg(json_build_object(
      'test_type', t.test_type,
      'available', exists (select 1 from public.test_items i where i.test_type = t.test_type),
      'is_open',   coalesce((select s.is_open from public.test_settings s
                             where s.class_code = v_class and s.test_type = t.test_type), false),
      'started',   sub.anon_id is not null,
      'submitted', sub.submitted_at is not null,
      'score',     case when sub.submitted_at is not null then sub.score end,
      'max_score', 10
    ) order by t.test_type desc)
    from (values ('pre'), ('post')) as t(test_type)
    left join public.test_submissions sub on sub.anon_id = v_anon and sub.test_type = t.test_type
  ), '[]'::json);
end;
$$;

-- Bắt đầu (hoặc làm tiếp) một bài. Trả về câu hỏi KHÔNG kèm đáp án / mã lỗi.
-- Lỗi: TEST_CLOSED (GV chưa bật), TEST_ALREADY_SUBMITTED (đã nộp), TEST_UNAVAILABLE (chưa nạp đề).
create or replace function public.start_test(p_class_code text, p_anon_id text, p_test_type text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_anon text := public._require_student(p_class_code, p_anon_id);
  v_class text := upper(trim(p_class_code));
  v_sub public.test_submissions;
begin
  if p_test_type not in ('pre', 'post') then raise exception 'INVALID_INPUT: loại bài kiểm tra'; end if;
  if not exists (select 1 from public.test_items where test_type = p_test_type) then
    raise exception 'TEST_UNAVAILABLE';
  end if;

  select * into v_sub from public.test_submissions where anon_id = v_anon and test_type = p_test_type;
  if found and v_sub.submitted_at is not null then raise exception 'TEST_ALREADY_SUBMITTED'; end if;

  -- Làm tiếp bài đã bắt đầu thì không cần GV còn mở; bắt đầu mới thì phải đang mở.
  if not found then
    if not coalesce((select is_open from public.test_settings
                     where class_code = v_class and test_type = p_test_type), false) then
      raise exception 'TEST_CLOSED';
    end if;
    insert into public.test_submissions (anon_id, test_type) values (v_anon, p_test_type)
    on conflict do nothing;
    select * into v_sub from public.test_submissions where anon_id = v_anon and test_type = p_test_type;
  end if;

  return json_build_object(
    'test_type',    p_test_type,
    'started_at',   v_sub.started_at,
    'server_now',   now(),
    'duration_min', 25,
    'items', (
      select json_agg(json_build_object(
        'id', i.id, 'no', i.no, 'part', i.part, 'stem', i.stem,
        'options', (select json_agg(json_build_object('key', o.value ->> 'key', 'text', o.value ->> 'text')
                                    order by o.ord)
                    from jsonb_array_elements(i.options) with ordinality as o(value, ord))
      ) order by i.no)
      from public.test_items i where i.test_type = p_test_type)
  );
end;
$$;

-- Nộp bài: p_answers = {"TA-01": "B", ...}. Máy chủ chấm, ghi attempts, khóa không cho nộp lại.
-- Điểm: phần 1 mỗi câu 0,4; phần 2 mỗi câu 0,2 (tối đa 10). Chỉ trả về điểm tổng, không trả đáp án.
create or replace function public.submit_test(
  p_class_code text, p_anon_id text, p_test_type text, p_answers jsonb)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_anon text := public._require_student(p_class_code, p_anon_id);
  v_sub public.test_submissions;
  v_score numeric := 0;
  v_correct integer := 0;
  v_total integer := 0;
  v_mode text := case p_test_type when 'pre' then 'pretest' else 'posttest' end;
  v_ans text;
  v_ok boolean;
  v_code text;
  r record;
begin
  if p_test_type not in ('pre', 'post') then raise exception 'INVALID_INPUT: loại bài kiểm tra'; end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' or pg_column_size(p_answers) > 4000 then
    raise exception 'INVALID_INPUT: bài làm';
  end if;

  select * into v_sub from public.test_submissions
   where anon_id = v_anon and test_type = p_test_type for update;
  if not found then raise exception 'TEST_NOT_STARTED'; end if;
  if v_sub.submitted_at is not null then raise exception 'TEST_ALREADY_SUBMITTED'; end if;

  for r in select * from public.test_items where test_type = p_test_type order by no loop
    v_total := v_total + 1;
    v_ans := upper(nullif(trim(p_answers ->> r.id), ''));
    if v_ans is not null and v_ans !~ '^[A-D]$' then v_ans := null; end if;
    v_ok := v_ans is not distinct from r.answer;
    v_code := null;
    if v_ans is not null and not v_ok then
      select o ->> 'misconception' into v_code
        from jsonb_array_elements(r.options) o where o ->> 'key' = v_ans;
    end if;
    if v_ok then
      v_correct := v_correct + 1;
      v_score := v_score + case r.part when 1 then 0.4 else 0.2 end;
    end if;
    insert into public.attempts (anon_id, question_id, lesson, answer, is_correct,
                                 misconception_codes, hint_level_used, duration_ms, mode)
    values (v_anon, r.id, r.lesson, to_jsonb(v_ans), v_ok,
            case when v_code is null then '{}'::text[] else array[v_code] end, 0, null, v_mode);
  end loop;

  update public.test_submissions
     set submitted_at = now(), correct_count = v_correct, score = round(v_score, 1)
   where anon_id = v_anon and test_type = p_test_type;

  return json_build_object('score', round(v_score, 1), 'max_score', 10,
                           'correct', v_correct, 'total', v_total);
end;
$$;

-- Giáo viên: bật / tắt một bài cho lớp của mình.
create or replace function public.set_test_open(
  p_class_code text, p_teacher_pin text, p_test_type text, p_open boolean)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_class public.classes;
begin
  v_class := public._require_teacher_pin(p_class_code, p_teacher_pin);
  if p_test_type not in ('pre', 'post') then raise exception 'INVALID_INPUT: loại bài kiểm tra'; end if;
  if p_open is null then raise exception 'INVALID_INPUT: trạng thái'; end if;
  insert into public.test_settings (class_code, test_type, is_open)
  values (v_class.code, p_test_type, p_open)
  on conflict (class_code, test_type) do update set is_open = excluded.is_open, updated_at = now();
  return json_build_object('test_type', p_test_type, 'is_open', p_open);
end;
$$;

-- Giáo viên: tình hình hai bài của lớp (đang mở?, bao nhiêu em bắt đầu / đã nộp, điểm trung bình).
create or replace function public.get_test_overview(p_class_code text, p_teacher_pin text)
returns json
language plpgsql
stable
security definer
set search_path = public, extensions
as $$
declare
  v_class public.classes;
begin
  v_class := public._require_teacher_pin(p_class_code, p_teacher_pin);
  return coalesce((
    select json_agg(json_build_object(
      'test_type', t.test_type,
      'available', exists (select 1 from public.test_items i where i.test_type = t.test_type),
      'is_open',   coalesce((select s.is_open from public.test_settings s
                             where s.class_code = v_class.code and s.test_type = t.test_type), false),
      'students',  (select count(*) from public.students where class_code = v_class.code),
      'started',   (select count(*) from public.test_submissions x
                    join public.students st on st.anon_id = x.anon_id
                    where st.class_code = v_class.code and x.test_type = t.test_type),
      'submitted', (select count(*) from public.test_submissions x
                    join public.students st on st.anon_id = x.anon_id
                    where st.class_code = v_class.code and x.test_type = t.test_type
                      and x.submitted_at is not null),
      'avg_score', (select round(avg(x.score), 2) from public.test_submissions x
                    join public.students st on st.anon_id = x.anon_id
                    where st.class_code = v_class.code and x.test_type = t.test_type
                      and x.submitted_at is not null)
    ) order by t.test_type desc)
    from (values ('pre'), ('post')) as t(test_type)), '[]'::json);
end;
$$;

-- ---------------------------------------------------------------------
-- 3. QUYỀN THỰC THI (quy tắc 7: revoke/grant ngay trong cùng file)
-- ---------------------------------------------------------------------
revoke execute on function
  public._require_student(text, text),
  public.get_test_status(text, text),
  public.start_test(text, text, text),
  public.submit_test(text, text, text, jsonb),
  public.set_test_open(text, text, text, boolean),
  public.get_test_overview(text, text)
from public, anon, authenticated;

grant execute on function
  public.get_test_status(text, text),
  public.start_test(text, text, text),
  public.submit_test(text, text, text, jsonb),
  public.set_test_open(text, text, text, boolean),
  public.get_test_overview(text, text)
to anon, authenticated;

-- ---------------------------------------------------------------------
-- 4. ĐÓNG LỖ HỔNG: bài kiểm tra chỉ được ghi qua submit_test
-- Trước đây khóa anon công khai INSERT thẳng vào attempts với mode = pretest/posttest nên
-- học sinh có thể tự bơm điểm. Nay chỉ cho INSERT trực tiếp khi mode = 'practice'.
-- (submit_test chạy với quyền chủ sở hữu bảng nên không bị chính sách này chặn.)
-- ---------------------------------------------------------------------
drop policy if exists attempts_insert_registered on public.attempts;
create policy attempts_insert_registered
  on public.attempts
  for insert
  to anon, authenticated
  with check (public.is_registered_student(anon_id) and mode = 'practice');
