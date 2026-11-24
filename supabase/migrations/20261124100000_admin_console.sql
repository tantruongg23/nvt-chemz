-- =====================================================================
-- 20261124100000: trang quản trị lớp và mã học sinh (US-29)
-- Thêm bảng admin_config (băm mã quản trị) và các hàm manage_* gọi từ web/admin.html.
-- Mọi hàm đều yêu cầu MÃ QUẢN TRỊ (khác PIN giáo viên). Chỉ THÊM mới.
-- Quy tắc: xem migrations/README.md. Mã quản trị thật KHÔNG nằm trong file này;
-- đặt bằng SQL Editor:  select public.admin_set_code('<mã-quản-trị-ít-nhất-12-ký-tự>');
-- =====================================================================

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
