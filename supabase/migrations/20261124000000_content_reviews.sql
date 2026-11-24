-- =====================================================================
-- 20261124000000: duyệt nội dung của giáo viên
-- Thêm bảng content_reviews + 2 hàm RPC get_content_reviews / set_content_review.
-- Chỉ THÊM mới, không đụng dữ liệu hiện có. Quy tắc: xem migrations/README.md
-- (file đã áp dụng thì KHÔNG sửa; thay đổi tiếp theo là một file mới).
-- =====================================================================

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

alter table public.content_reviews enable row level security;
revoke all on public.content_reviews from anon, authenticated;

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

revoke execute on function
  public.get_content_reviews(text, text),
  public.set_content_review(text, text, text, text, text, text)
from public, anon, authenticated;

grant execute on function
  public.get_content_reviews(text, text),
  public.set_content_review(text, text, text, text, text, text)
to anon, authenticated;
