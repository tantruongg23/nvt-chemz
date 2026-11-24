-- =====================================================================
-- NVT CHEMZ – Lược đồ cơ sở dữ liệu (Supabase / PostgreSQL 15+)
-- Cách chạy: Supabase Dashboard → SQL Editor → dán toàn bộ file → Run.
-- File chạy lại nhiều lần được (idempotent). Sau đó chạy supabase/seed.sql.
-- Đây là bản ĐẦY ĐỦ cho CSDL mới. CSDL đã có dữ liệu thì nâng cấp bằng các file
-- trong supabase/migrations/ (xem migrations/README.md); khi thêm migration mới, nhớ
-- cập nhật cả file này để hai đường cho ra cùng một lược đồ.
-- Tài liệu giải thích: docs/architecture/DATA_MODEL.md
-- =====================================================================

-- pgcrypto dùng để băm (hash) mã PIN giáo viên. Trên Supabase, extension
-- nằm trong schema "extensions".
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- Supabase đã có sẵn 3 vai trò này. Khối dưới chỉ để file chạy được trên
-- PostgreSQL thường (ví dụ khi tự kiểm thử bằng Docker); trên Supabase nó không làm gì.
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then
    create role service_role nologin bypassrls;
  end if;
end
$$;

-- ---------------------------------------------------------------------
-- 1. BẢNG
-- ---------------------------------------------------------------------

-- Lớp học. "group" là từ khóa SQL nên cột được đặt tên study_group.
create table if not exists public.classes (
  code             text primary key
                   check (code ~ '^[A-Z0-9-]{2,20}$'),
  name             text not null check (char_length(name) <= 80),
  teacher_pin_hash text not null,
  study_group      text not null check (study_group in ('experiment', 'control')),
  created_at       timestamptz not null default now()
);

-- Học sinh: CHỈ có mã ẩn danh, không có họ tên/email/số điện thoại.
create table if not exists public.students (
  anon_id    text primary key check (anon_id ~ '^[A-Z0-9-]{3,30}$'),
  class_code text not null references public.classes (code) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists students_class_code_idx on public.students (class_code);

-- Mỗi lần học sinh trả lời một câu hỏi.
-- id do trình duyệt tạo (crypto.randomUUID()) để gửi lại không bị trùng.
create table if not exists public.attempts (
  id                  uuid primary key default gen_random_uuid(),
  anon_id             text not null references public.students (anon_id) on delete cascade,
  question_id         text not null check (question_id ~ '^[A-Za-z0-9_-]{1,40}$'),
  lesson              text not null check (lesson ~ '^B([1-9]|1[0-9]|2[0-3])$'),  -- B1–B23 (7 chương Hóa 10 KNTT)
  answer              jsonb check (answer is null or pg_column_size(answer) <= 2000),
  is_correct          boolean not null,
  misconception_codes text[] not null default '{}'
                      check (cardinality(misconception_codes) <= 10),
  hint_level_used     smallint not null default 0 check (hint_level_used between 0 and 3),
  duration_ms         integer check (duration_ms between 0 and 3600000),
  mode                text not null default 'practice'
                      check (mode in ('practice', 'pretest', 'posttest')),
  created_at          timestamptz not null default now(),
  -- Bài kiểm tra trước/sau không được dùng gợi ý AI.
  constraint attempts_no_hint_in_tests check (mode = 'practice' or hint_level_used = 0)
);
create index if not exists attempts_anon_id_idx on public.attempts (anon_id);
create index if not exists attempts_question_id_idx on public.attempts (question_id);

-- Đếm số lượt gợi ý AI mỗi học sinh mỗi ngày (giờ Việt Nam).
create table if not exists public.hint_usage (
  anon_id text not null references public.students (anon_id) on delete cascade,
  day     date not null,
  count   integer not null default 0 check (count >= 0),
  primary key (anon_id, day)
);

-- Kết quả duyệt nội dung của giáo viên. Nội dung câu hỏi nằm trong web/data/*.json
-- nên bảng chỉ lưu "dấu duyệt". content_hash là mã băm nội dung câu lúc duyệt:
-- câu bị sửa sau đó có mã băm khác ⇒ dấu duyệt cũ tự mất hiệu lực (phải duyệt lại).
create table if not exists public.content_reviews (
  question_id  text primary key check (question_id ~ '^[A-Za-z0-9_-]{1,40}$'),
  status       text not null check (status in ('approved', 'needs_fix')),
  note         text check (note is null or char_length(note) <= 500),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{8}$'),
  reviewed_by  text references public.classes (code) on delete set null,
  reviewed_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2. QUYỀN TRUY CẬP + ROW LEVEL SECURITY
-- Nguyên tắc: khóa "anon" công khai trong web/ CHỈ được
--   (a) INSERT vào attempts cho học sinh đã đăng ký,
--   (b) gọi một số hàm RPC an toàn được liệt kê ở mục 4.
-- Không có quyền SELECT/UPDATE/DELETE trực tiếp trên bảng nào.
-- ---------------------------------------------------------------------

alter table public.classes    enable row level security;
alter table public.students   enable row level security;
alter table public.attempts   enable row level security;
alter table public.hint_usage enable row level security;
alter table public.content_reviews enable row level security;

revoke all on public.classes, public.students, public.attempts, public.hint_usage,
  public.content_reviews
  from anon, authenticated;

-- Chỉ cho phép ghi các cột này; created_at luôn do máy chủ điền.
grant insert (id, anon_id, question_id, lesson, answer, is_correct,
              misconception_codes, hint_level_used, duration_ms, mode)
  on public.attempts to anon, authenticated;

-- Hàm kiểm tra mã học sinh có tồn tại. SECURITY DEFINER để chính sách RLS
-- đọc được bảng students mà không phải mở quyền SELECT cho anon.
create or replace function public.is_registered_student(p_anon_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.students where anon_id = p_anon_id);
$$;

drop policy if exists attempts_insert_registered on public.attempts;
create policy attempts_insert_registered
  on public.attempts
  for insert
  to anon, authenticated
  with check (public.is_registered_student(anon_id));
-- Không tạo policy SELECT ⇒ học sinh không đọc được bài làm của ai (kể cả của mình)
-- trực tiếp từ bảng; thống kê cá nhân lấy qua hàm get_my_stats (chỉ trả số tổng hợp).

-- ---------------------------------------------------------------------
-- 3. HÀM TIỆN ÍCH NỘI BỘ
-- ---------------------------------------------------------------------

-- "Hôm nay" theo giờ Việt Nam, dùng cho giới hạn gợi ý mỗi ngày.
create or replace function public.vn_today()
returns date
language sql
stable
as $$
  select (now() at time zone 'Asia/Ho_Chi_Minh')::date;
$$;

-- Kiểm tra PIN giáo viên. Sai PIN ⇒ chờ 1 giây rồi báo lỗi (làm chậm dò PIN).
create or replace function public._require_teacher_pin(p_class_code text, p_teacher_pin text)
returns public.classes
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_class public.classes;
begin
  select * into v_class from public.classes where code = upper(trim(p_class_code));
  if not found
     or p_teacher_pin is null
     or v_class.teacher_pin_hash is distinct from extensions.crypt(p_teacher_pin, v_class.teacher_pin_hash)
  then
    perform pg_sleep(1);
    raise exception 'INVALID_PIN' using errcode = 'P0001';
  end if;
  return v_class;
end;
$$;

-- ---------------------------------------------------------------------
-- 4. HÀM RPC (gọi từ web/js/store.js bằng supabase.rpc(...))
-- ---------------------------------------------------------------------

-- 4.1 Đăng nhập học sinh: trả về thông tin lớp, hoặc NULL nếu sai mã.
create or replace function public.login_student(p_class_code text, p_anon_id text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
           'anon_id',    s.anon_id,
           'class_code', c.code,
           'class_name', c.name,
           'group',      c.study_group)
  from public.students s
  join public.classes c on c.code = s.class_code
  where s.anon_id = upper(trim(p_anon_id))
    and c.code    = upper(trim(p_class_code));
$$;

-- 4.2 Thống kê cá nhân (chỉ số tổng hợp, không trả về từng bài làm).
create or replace function public.get_my_stats(p_class_code text, p_anon_id text)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_anon text := upper(trim(p_anon_id));
  v_result json;
begin
  if not exists (select 1 from public.students
                 where anon_id = v_anon and class_code = upper(trim(p_class_code))) then
    raise exception 'UNKNOWN_STUDENT' using errcode = 'P0001';
  end if;

  with att as (
    select * from public.attempts where anon_id = v_anon
  )
  select json_build_object(
    'total_attempts', (select count(*) from att),
    'correct',        (select count(*) from att where is_correct),
    'accuracy',       (select round(avg(is_correct::int), 3) from att),
    'hints_used',     (select count(*) from att where hint_level_used > 0),
    'hints_today',    coalesce((select count from public.hint_usage
                                where anon_id = v_anon and day = public.vn_today()), 0),
    'by_lesson', coalesce((
        select json_agg(x order by x.lesson) from (
          select lesson, count(*) as attempts, count(*) filter (where is_correct) as correct
          from att group by lesson) x), '[]'::json),
    'by_misconception', coalesce((
        select json_agg(x order by x.count desc, x.code) from (
          select m.code, count(*) as count
          from att cross join lateral unnest(att.misconception_codes) as m(code)
          group by m.code) x), '[]'::json),
    'by_mode', coalesce((
        select json_agg(x order by x.mode) from (
          select mode, count(*) as attempts, round(avg(is_correct::int), 3) as accuracy
          from att group by mode) x), '[]'::json)
  ) into v_result;

  return v_result;
end;
$$;

-- 4.3 Thống kê lớp cho dashboard giáo viên (yêu cầu PIN).
-- p_mode: null = tất cả; hoặc 'practice' | 'pretest' | 'posttest'.
create or replace function public.get_class_stats(
  p_class_code text, p_teacher_pin text, p_mode text default null)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_class  public.classes;
  v_result json;
begin
  v_class := public._require_teacher_pin(p_class_code, p_teacher_pin);

  with att_all as (
    select a.* from public.attempts a
    join public.students s on s.anon_id = a.anon_id
    where s.class_code = v_class.code
  ), att as (
    select * from att_all where p_mode is null or mode = p_mode
  )
  select json_build_object(
    'class', json_build_object('code', v_class.code, 'name', v_class.name,
                               'group', v_class.study_group),
    'mode',            p_mode,
    'students_total',  (select count(*) from public.students where class_code = v_class.code),
    'students_active', (select count(distinct anon_id) from att),
    'total_attempts',  (select count(*) from att),
    'accuracy',        (select round(avg(is_correct::int), 3) from att),
    'by_misconception', coalesce((
        select json_agg(x order by x.count desc, x.code) from (
          select m.code, count(*) as count, count(distinct att.anon_id) as students
          from att cross join lateral unnest(att.misconception_codes) as m(code)
          group by m.code) x), '[]'::json),
    'by_lesson', coalesce((
        select json_agg(x order by x.lesson) from (
          select lesson, count(*) as attempts, round(avg(is_correct::int), 3) as accuracy
          from att group by lesson) x), '[]'::json),
    'by_question', coalesce((
        select json_agg(x order by x.accuracy, x.attempts desc) from (
          select question_id, lesson, count(*) as attempts,
                 round(avg(is_correct::int), 3) as accuracy
          from att group by question_id, lesson
          order by avg(is_correct::int), count(*) desc
          limit 20) x), '[]'::json),
    'hint_levels', coalesce((
        select json_agg(x order by x.level) from (
          select hint_level_used as level, count(*) as count
          from att where hint_level_used > 0 group by hint_level_used) x), '[]'::json),
    -- Điểm trung bình theo học sinh cho từng chế độ (luôn tính trên mọi chế độ).
    'scores', coalesce((
        select json_agg(x order by x.mode) from (
          select mode, count(*) as students, round(avg(score), 3) as avg_score
          from (select anon_id, mode, avg(is_correct::int) as score
                from att_all group by anon_id, mode) per_student
          group by mode) x), '[]'::json)
  ) into v_result;

  return v_result;
end;
$$;

-- 4.4 Xuất dữ liệu thô của lớp (ẩn danh) để phân tích t-test trong Excel/Sheets.
create or replace function public.get_class_export(p_class_code text, p_teacher_pin text)
returns table (
  anon_id text, question_id text, lesson text, is_correct boolean,
  misconception_codes text[], hint_level_used smallint, duration_ms integer,
  mode text, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_class public.classes;
begin
  v_class := public._require_teacher_pin(p_class_code, p_teacher_pin);
  return query
    select a.anon_id, a.question_id, a.lesson, a.is_correct, a.misconception_codes,
           a.hint_level_used, a.duration_ms, a.mode, a.created_at
    from public.attempts a
    join public.students s on s.anon_id = a.anon_id
    where s.class_code = v_class.code
    order by a.anon_id, a.created_at;
end;
$$;

-- 4.5 Danh sách dấu duyệt nội dung.
-- Không có PIN: ai cũng xem được (để học sinh thấy nhãn "Chưa duyệt"), KHÔNG kèm ghi chú.
-- Có PIN giáo viên đúng: kèm ghi chú. PIN sai ⇒ lỗi INVALID_PIN.
create or replace function public.get_content_reviews(
  p_class_code text default null, p_teacher_pin text default null)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_teacher boolean := false;
begin
  if p_teacher_pin is not null then
    perform public._require_teacher_pin(p_class_code, p_teacher_pin);
    v_teacher := true;
  end if;
  return coalesce((
    select json_agg(json_build_object(
      'question_id', r.question_id, 'status', r.status,
      'note', case when v_teacher then r.note end,
      'content_hash', r.content_hash, 'reviewed_at', r.reviewed_at))
    from public.content_reviews r), '[]'::json);
end;
$$;

-- 4.6 Giáo viên duyệt / đánh dấu cần sửa / bỏ duyệt một câu hỏi (yêu cầu PIN).
-- p_status: 'approved' | 'needs_fix' | 'pending' (xóa dấu duyệt).
create or replace function public.set_content_review(
  p_class_code text, p_teacher_pin text, p_question_id text,
  p_status text, p_note text, p_content_hash text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_class public.classes;
begin
  v_class := public._require_teacher_pin(p_class_code, p_teacher_pin);
  if p_status = 'pending' then
    delete from public.content_reviews where question_id = p_question_id;
    return;
  end if;
  if p_status not in ('approved', 'needs_fix') then
    raise exception 'INVALID_INPUT' using errcode = 'P0001';
  end if;
  insert into public.content_reviews as r (question_id, status, note, content_hash, reviewed_by, reviewed_at)
  values (p_question_id, p_status, nullif(trim(p_note), ''), p_content_hash, v_class.code, now())
  on conflict (question_id) do update
    set status = excluded.status, note = excluded.note, content_hash = excluded.content_hash,
        reviewed_by = excluded.reviewed_by, reviewed_at = excluded.reviewed_at;
end;
$$;

-- ---------------------------------------------------------------------
-- 5. HÀM CHỈ DÀNH CHO EDGE FUNCTION (service_role) – không mở cho anon
-- ---------------------------------------------------------------------

-- Nhóm của lớp chứa học sinh ('experiment' | 'control'), NULL nếu không có mã.
create or replace function public.hint_student_group(p_anon_id text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select c.study_group
  from public.students s join public.classes c on c.code = s.class_code
  where s.anon_id = p_anon_id;
$$;

-- Trừ 1 lượt gợi ý (nguyên tử, không bị đếm sai khi bấm nhanh).
-- Trả về số lượt còn lại hôm nay, hoặc -1 nếu đã hết lượt.
create or replace function public.consume_hint(p_anon_id text, p_limit integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.hint_usage as h (anon_id, day, count)
  values (p_anon_id, public.vn_today(), 1)
  on conflict (anon_id, day)
    do update set count = h.count + 1
    where h.count < p_limit
  returning h.count into v_count;

  if v_count is null then
    return -1;
  end if;
  return greatest(p_limit - v_count, 0);
end;
$$;

-- Hoàn lại 1 lượt khi gọi AI bị lỗi (không phải lỗi của học sinh).
create or replace function public.refund_hint(p_anon_id text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.hint_usage
  set count = greatest(count - 1, 0)
  where anon_id = p_anon_id and day = public.vn_today();
$$;

-- ---------------------------------------------------------------------
-- 6. HÀM QUẢN TRỊ – chỉ chạy trong SQL Editor (không mở cho web)
-- ---------------------------------------------------------------------

-- Tạo/cập nhật lớp. Ví dụ: select public.admin_upsert_class('10A1', 'Lớp 10A1', 'PIN-bi-mat-8-ky-tu', 'experiment');
create or replace function public.admin_upsert_class(
  p_code text, p_name text, p_teacher_pin text, p_group text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  insert into public.classes (code, name, teacher_pin_hash, study_group)
  values (upper(trim(p_code)), p_name,
          extensions.crypt(p_teacher_pin, extensions.gen_salt('bf')), p_group)
  on conflict (code) do update
    set name = excluded.name,
        teacher_pin_hash = excluded.teacher_pin_hash,
        study_group = excluded.study_group;
$$;

-- Tạo hàng loạt mã ẩn danh: PREFIX-01 … PREFIX-NN. Trả về số mã mới tạo.
-- Ví dụ: select public.admin_add_students('10A1', '10A1', 45);  ⇒ 10A1-01 … 10A1-45
create or replace function public.admin_add_students(
  p_class_code text, p_prefix text, p_count integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inserted integer;
begin
  insert into public.students (anon_id, class_code)
  select upper(trim(p_prefix)) || '-' || lpad(i::text, 2, '0'), upper(trim(p_class_code))
  from generate_series(1, p_count) as i
  on conflict (anon_id) do nothing;
  get diagnostics v_inserted = row_count;
  return v_inserted;
end;
$$;

-- ---------------------------------------------------------------------
-- 7. CẤP QUYỀN THỰC THI HÀM
-- Mặc định PostgreSQL cho PUBLIC chạy mọi hàm ⇒ thu hồi hết rồi cấp lại từng hàm.
-- ---------------------------------------------------------------------

revoke execute on function
  public.is_registered_student(text),
  public.vn_today(),
  public._require_teacher_pin(text, text),
  public.login_student(text, text),
  public.get_my_stats(text, text),
  public.get_class_stats(text, text, text),
  public.get_class_export(text, text),
  public.get_content_reviews(text, text),
  public.set_content_review(text, text, text, text, text, text),
  public.hint_student_group(text),
  public.consume_hint(text, integer),
  public.refund_hint(text),
  public.admin_upsert_class(text, text, text, text),
  public.admin_add_students(text, text, integer)
from public, anon, authenticated;

-- Dùng trong chính sách RLS nên anon phải chạy được.
grant execute on function public.is_registered_student(text) to anon, authenticated;

-- RPC công khai cho website.
grant execute on function
  public.login_student(text, text),
  public.get_my_stats(text, text),
  public.get_class_stats(text, text, text),
  public.get_class_export(text, text),
  public.get_content_reviews(text, text),
  public.set_content_review(text, text, text, text, text, text)
to anon, authenticated;

-- Chỉ Edge Function (dùng service_role key) được gọi.
grant execute on function
  public.hint_student_group(text),
  public.consume_hint(text, integer),
  public.refund_hint(text),
  public.vn_today()
to service_role;

-- ---------------------------------------------------------------------
-- 8. TRANG QUẢN TRỊ LỚP VÀ MÃ HỌC SINH (migration 20261124100000_admin_console.sql)
-- ---------------------------------------------------------------------
create table if not exists public.admin_config (
  id        boolean primary key default true check (id),   -- chỉ một dòng
  code_hash text not null,
  updated_at timestamptz not null default now()
);
alter table public.admin_config enable row level security;
revoke all on public.admin_config from anon, authenticated;

-- Đặt / đổi mã quản trị. CHỈ chạy trong SQL Editor (không cấp cho web).
create or replace function public.admin_set_code(p_new_code text)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if p_new_code is null or char_length(p_new_code) < 12 then
    raise exception 'INVALID_INPUT: mã quản trị cần ít nhất 12 ký tự';
  end if;
  insert into public.admin_config (id, code_hash)
  values (true, extensions.crypt(p_new_code, extensions.gen_salt('bf')))
  on conflict (id) do update set code_hash = excluded.code_hash, updated_at = now();
end;
$$;

-- Kiểm tra mã quản trị. Sai (hoặc chưa đặt) ⇒ chờ 1 giây rồi báo INVALID_ADMIN.
create or replace function public._require_admin(p_admin_code text)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text;
begin
  select code_hash into v_hash from public.admin_config where id;
  if v_hash is null
     or p_admin_code is null
     or v_hash is distinct from extensions.crypt(p_admin_code, v_hash)
  then
    perform pg_sleep(1);
    raise exception 'INVALID_ADMIN' using errcode = 'P0001';
  end if;
end;
$$;

-- Danh sách lớp kèm số học sinh và số lượt làm bài.
create or replace function public.manage_list_classes(p_admin_code text)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  perform public._require_admin(p_admin_code);
  return coalesce((
    select json_agg(json_build_object(
      'code', c.code, 'name', c.name, 'group', c.study_group, 'created_at', c.created_at,
      'students', (select count(*) from public.students s where s.class_code = c.code),
      'attempts', (select count(*) from public.attempts a
                   join public.students s on s.anon_id = a.anon_id
                   where s.class_code = c.code)
    ) order by c.code)
    from public.classes c), '[]'::json);
end;
$$;

-- Danh sách mã học sinh của một lớp (chỉ mã ẩn danh, không có thông tin cá nhân).
create or replace function public.manage_list_students(p_admin_code text, p_class_code text)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  perform public._require_admin(p_admin_code);
  return coalesce((
    select json_agg(json_build_object(
      'anon_id', s.anon_id, 'created_at', s.created_at,
      'attempts', (select count(*) from public.attempts a where a.anon_id = s.anon_id),
      'last_at', (select max(a.created_at) from public.attempts a where a.anon_id = s.anon_id)
    ) order by s.anon_id)
    from public.students s where s.class_code = upper(trim(p_class_code))), '[]'::json);
end;
$$;

-- Tạo lớp mới (bắt buộc có PIN) hoặc sửa lớp (PIN để trống = giữ nguyên PIN cũ).
create or replace function public.manage_save_class(
  p_admin_code text, p_code text, p_name text, p_group text, p_teacher_pin text default null)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_code text := upper(trim(p_code));
  v_exists boolean;
begin
  perform public._require_admin(p_admin_code);
  if v_code !~ '^[A-Z0-9][A-Z0-9-]{1,19}$' then raise exception 'INVALID_INPUT: mã lớp'; end if;
  if p_name is null or char_length(trim(p_name)) not between 1 and 80 then raise exception 'INVALID_INPUT: tên lớp'; end if;
  if p_group not in ('experiment', 'control') then raise exception 'INVALID_INPUT: nhóm'; end if;
  if p_teacher_pin is not null and p_teacher_pin = '' then p_teacher_pin := null; end if;
  if p_teacher_pin is not null and char_length(p_teacher_pin) < 8 then raise exception 'INVALID_INPUT: PIN cần ít nhất 8 ký tự'; end if;

  select exists (select 1 from public.classes where code = v_code) into v_exists;
  if v_exists then
    update public.classes
       set name = trim(p_name), study_group = p_group,
           teacher_pin_hash = case when p_teacher_pin is null then teacher_pin_hash
                                   else extensions.crypt(p_teacher_pin, extensions.gen_salt('bf')) end
     where code = v_code;
  else
    if p_teacher_pin is null then raise exception 'INVALID_INPUT: lớp mới cần PIN giáo viên'; end if;
    insert into public.classes (code, name, teacher_pin_hash, study_group)
    values (v_code, trim(p_name), extensions.crypt(p_teacher_pin, extensions.gen_salt('bf')), p_group);
  end if;
  return json_build_object('code', v_code, 'created', not v_exists);
end;
$$;

-- Tạo hàng loạt mã ẩn danh PREFIX-01 … PREFIX-NN cho một lớp. Trả về số mã mới.
-- Mã đã tồn tại (kể cả ở lớp khác) được bỏ qua, không bị ghi đè.
create or replace function public.manage_add_students(
  p_admin_code text, p_class_code text, p_prefix text, p_count integer)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_class text := upper(trim(p_class_code));
  v_prefix text := upper(trim(p_prefix));
  v_inserted integer;
begin
  perform public._require_admin(p_admin_code);
  if not exists (select 1 from public.classes where code = v_class) then raise exception 'INVALID_INPUT: lớp không tồn tại'; end if;
  if v_prefix !~ '^[A-Z0-9][A-Z0-9-]{0,19}$' then raise exception 'INVALID_INPUT: tiền tố mã'; end if;
  if p_count is null or p_count not between 1 and 200 then raise exception 'INVALID_INPUT: số lượng 1–200'; end if;
  insert into public.students (anon_id, class_code)
  select v_prefix || '-' || lpad(i::text, 2, '0'), v_class from generate_series(1, p_count) as i
  on conflict (anon_id) do nothing;
  get diagnostics v_inserted = row_count;
  return json_build_object('inserted', v_inserted, 'skipped', p_count - v_inserted);
end;
$$;

-- Xóa một mã học sinh (kèm toàn bộ bài làm của mã đó).
create or replace function public.manage_delete_student(p_admin_code text, p_anon_id text)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id text := upper(trim(p_anon_id));
  v_attempts integer;
begin
  perform public._require_admin(p_admin_code);
  select count(*) into v_attempts from public.attempts where anon_id = v_id;
  delete from public.students where anon_id = v_id;
  return json_build_object('deleted', found, 'attempts_deleted', v_attempts);
end;
$$;

-- Xóa cả lớp (kèm mã học sinh và bài làm). p_confirm phải trùng mã lớp.
create or replace function public.manage_delete_class(p_admin_code text, p_class_code text, p_confirm text)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_code text := upper(trim(p_class_code));
  v_students integer;
begin
  perform public._require_admin(p_admin_code);
  if upper(trim(coalesce(p_confirm, ''))) is distinct from v_code then raise exception 'INVALID_INPUT: xác nhận không khớp mã lớp'; end if;
  select count(*) into v_students from public.students where class_code = v_code;
  delete from public.classes where code = v_code;
  return json_build_object('deleted', found, 'students_deleted', v_students);
end;
$$;

-- Quyền thực thi: thu hồi hết, chỉ mở các hàm manage_* (đều tự kiểm mã quản trị).
revoke execute on function
  public.admin_set_code(text),
  public._require_admin(text),
  public.manage_list_classes(text),
  public.manage_list_students(text, text),
  public.manage_save_class(text, text, text, text, text),
  public.manage_add_students(text, text, text, integer),
  public.manage_delete_student(text, text),
  public.manage_delete_class(text, text, text)
from public, anon, authenticated;

grant execute on function
  public.manage_list_classes(text),
  public.manage_list_students(text, text),
  public.manage_save_class(text, text, text, text, text),
  public.manage_add_students(text, text, text, integer),
  public.manage_delete_student(text, text),
  public.manage_delete_class(text, text, text)
to anon, authenticated;
