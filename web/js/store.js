// =====================================================================
// store.js — lớp truy cập dữ liệu người dùng (theo docs/architecture/ARCHITECTURE.md §2–3).
//
// Đồng bộ:  getMode() → "demo" | "online";  getSession() → phiên | null;  logout()
// Bất đồng bộ — luôn trả { ok: true, data } hoặc { ok: false, error: "MÃ_LỖI", message }, không ném lỗi:
//   login(classCode, anonId)                   → { anon_id, class_code, class_name, group }
//   saveAttempt(attempt)                       → { id, queued }
//   flushPendingAttempts()                     → { sent, remaining }
//   getMyStats()                               → thống kê cá nhân (§3.4)
//   getClassStats(classCode, teacherPin, mode) → thống kê lớp (§3.4)
//   getClassExport(classCode, teacherPin)      → mảng dòng bài làm ẩn danh
//   requestHint(questionId, level, studentAnswer) → { level, hint, remaining_today, disclaimer }
//   getHintsRemaining()                        → number
//   getTestStatus()                            → [{ test_type: 'pre'|'post', available, is_open, started, submitted, score?, max_score }]
//   startTest(type) / submitTest(type, answers) → đề kín: câu hỏi KHÔNG kèm đáp án; máy chủ chấm, mỗi mã nộp 1 lần
//   getTestOverview(classCode, teacherPin) / setTestOpen(classCode, teacherPin, type, open) → giáo viên bật/tắt bài
//   getContentReviews(classCode?, teacherPin?) → [{ question_id, status, note?, content_hash, reviewed_at }]
//   setContentReview(classCode, teacherPin, question, status, note) → duyệt / cần sửa / bỏ duyệt (status: approved|needs_fix|pending)
// Nội dung tĩnh: xem content.js (loadContent được re-export ở đây cho tiện).
// =====================================================================
import { CONFIG, DEMO } from './config.js';
import { loadContent as loadStaticContent, grade, parseNumber, questionHash } from './content.js';

const K = { session: 'nvt.session', attempts: 'nvt.attempts', pending: 'nvt.pending', hints: 'nvt.hints', demo: 'nvt.demo', reviews: 'nvt.reviews' };
const DISCLAIMER = 'AI có thể sai. Hãy đối chiếu với SGK và lời giải đã được giáo viên duyệt.';
const MODES = ['practice', 'pretest', 'posttest'];
const SUPABASE_ESM = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';

/* ---------------- tiện ích ---------------- */
const ok = (data) => ({ ok: true, data });
const fail = (error, message) => ({ ok: false, error, message });
function lsGet(key, fallback) { try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; } }
function lsSet(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
function lsDel(key) { try { localStorage.removeItem(key); } catch { /* ignore */ } }
const up = (s) => String(s ?? '').trim().toUpperCase();
const uuid = () => (crypto.randomUUID ? crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); }));
const vnToday = () => new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10);
const round3 = (x) => Math.round(x * 1000) / 1000;

/* ---------------- chế độ ---------------- */
(function readDemoParam() {
  try {
    const p = new URLSearchParams(location.search).get('demo');
    if (p === '1') sessionStorage.setItem(K.demo, '1');
    if (p === '0') sessionStorage.removeItem(K.demo);
  } catch { /* ignore */ }
}());
export function getMode() {
  let forced = false;
  try { forced = sessionStorage.getItem(K.demo) === '1'; } catch { /* ignore */ }
  return !CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY || forced ? 'demo' : 'online';
}
const isOnline = () => getMode() === 'online';

let sbPromise = null;
function supabase() {
  if (!sbPromise) {
    sbPromise = import(SUPABASE_ESM).then((m) => m.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY, { auth: { persistSession: false } }));
    sbPromise.catch(() => { sbPromise = null; });
  }
  return sbPromise;
}
function rpcError(error) {
  const msg = String(error?.message || '');
  if (/INVALID_PIN/.test(msg)) return fail('INVALID_PIN', 'PIN không đúng.');
  if (/INVALID_ADMIN/.test(msg)) return fail('INVALID_ADMIN', 'Mã quản trị không đúng.');
  const detail = msg.match(/INVALID_INPUT:\s*(.+)/);
  if (detail) return fail('INVALID_INPUT', `Dữ liệu không hợp lệ: ${detail[1]}.`);
  if (/INVALID_INPUT/.test(msg)) return fail('INVALID_INPUT', 'Dữ liệu gửi lên không hợp lệ.');
  if (/TEST_CLOSED/.test(msg)) return fail('TEST_CLOSED', 'Giáo viên chưa mở bài kiểm tra này.');
  if (/TEST_ALREADY_SUBMITTED/.test(msg)) return fail('TEST_ALREADY_SUBMITTED', 'Mã của em đã nộp bài kiểm tra này rồi, không làm lại được.');
  if (/TEST_NOT_STARTED/.test(msg)) return fail('TEST_NOT_STARTED', 'Em chưa bắt đầu bài kiểm tra này.');
  if (/TEST_UNAVAILABLE/.test(msg)) return fail('TEST_UNAVAILABLE', 'Đề kiểm tra chưa được nạp lên máy chủ.');
  if (/UNKNOWN_STUDENT/.test(msg)) return fail('UNKNOWN_STUDENT', 'Mã lớp hoặc mã học sinh không đúng.');
  if (/fetch|network|Failed/i.test(msg)) return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.');
  return fail('SERVER_ERROR', 'Máy chủ gặp lỗi, hãy thử lại sau.');
}

/* ---------------- quản trị lớp và mã học sinh (US-29) ---------------- */
// Cần chế độ online (Supabase). Mọi hàm kiểm MÃ QUẢN TRỊ ở máy chủ; mã chỉ giữ trong sessionStorage của trang admin.
async function adminRpc(fn, params) {
  if (!isOnline()) return fail('DEMO', 'Trang quản trị chỉ dùng được khi đã kết nối Supabase (không phải chế độ demo).');
  try {
    const sb = await supabase();
    const { data, error } = await sb.rpc(fn, params);
    return error ? rpcError(error) : ok(data);
  } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
}
export const adminListClasses = (code) => adminRpc('manage_list_classes', { p_admin_code: code });
export const adminListStudents = (code, cls) => adminRpc('manage_list_students', { p_admin_code: code, p_class_code: up(cls) });
export const adminSaveClass = (code, cls, name, group, pin = '') =>
  adminRpc('manage_save_class', { p_admin_code: code, p_code: up(cls), p_name: String(name ?? '').trim(), p_group: group, p_teacher_pin: pin || null });
export const adminAddStudents = (code, cls, prefix, count) =>
  adminRpc('manage_add_students', { p_admin_code: code, p_class_code: up(cls), p_prefix: up(prefix), p_count: Number(count) });
export const adminDeleteStudent = (code, anon) => adminRpc('manage_delete_student', { p_admin_code: code, p_anon_id: up(anon) });
export const adminDeleteClass = (code, cls, confirm) =>
  adminRpc('manage_delete_class', { p_admin_code: code, p_class_code: up(cls), p_confirm: String(confirm ?? '') });

/* ---------------- định danh ẩn danh ---------------- */
const CLASS_RE = /^[A-Z0-9][A-Z0-9-]{1,19}$/;
const ANON_RE = /^[A-Z0-9][A-Z0-9-]{2,29}$/;
function demoClass(code) {
  return DEMO.CLASSES.find((c) => c.code === code)
    || { code, name: `Lớp ${code} (demo)`, group: 'experiment', prefix: code, size: 30 };
}
/** "7" / "07" → "<tiền tố>-07" (DEMO-TN → TN-07, 10A1 → 10A1-07); mã đầy đủ giữ nguyên */
export function normalizeAnonId(classCode, anonId) {
  const cls = up(classCode); const raw = up(anonId).replace(/\s+/g, '-');
  if (/^\d{1,3}$/.test(raw)) return `${demoClass(cls).prefix}-${raw.padStart(2, '0')}`;
  return raw;
}

export async function login(classCode, anonId) {
  const cls = up(classCode);
  const anon = normalizeAnonId(cls, anonId);
  if (!CLASS_RE.test(cls) || !ANON_RE.test(anon)) return fail('UNKNOWN_STUDENT', 'Mã lớp hoặc mã học sinh không đúng định dạng (ví dụ: DEMO-TN và TN-01).');
  let data;
  if (isOnline()) {
    try {
      const sb = await supabase();
      const { data: row, error } = await sb.rpc('login_student', { p_class_code: cls, p_anon_id: anon });
      if (error) return rpcError(error);
      if (!row) return fail('UNKNOWN_STUDENT', 'Mã lớp hoặc mã học sinh không đúng.');
      data = row;
    } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
  } else {
    const c = demoClass(cls);
    data = { anon_id: anon, class_code: cls, class_name: c.name, group: c.group };
  }
  lsSet(K.session, { ...data, logged_in_at: new Date().toISOString() });
  flushPendingAttempts();
  return ok(data);
}

export function getSession() {
  const s = lsGet(K.session, null);
  return s && s.anon_id && s.class_code ? s : null;
}
export function logout() { lsDel(K.session); }

/* ---------------- bài làm ---------------- */
function validateAttempt(a) {
  if (!a || typeof a !== 'object') return 'attempt rỗng';
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(String(a.question_id || ''))) return 'question_id';
  if (!/^B([1-9]|1[0-9]|2[0-3])$/.test(String(a.lesson || ''))) return 'lesson'; // B1–B23 (số bài SGK KNTT)
  if (typeof a.is_correct !== 'boolean') return 'is_correct';
  const mode = a.mode || 'practice';
  if (!MODES.includes(mode)) return 'mode';
  const h = Number(a.hint_level_used || 0);
  if (!Number.isInteger(h) || h < 0 || h > 3) return 'hint_level_used';
  if (mode !== 'practice' && h !== 0) return 'hint_level_used phải bằng 0 ở pretest/posttest';
  if (mode !== 'practice' && isOnline()) return 'bài kiểm tra chỉ nộp qua submitTest (đề kín)';
  return null;
}

export async function saveAttempt(attempt) {
  const s = getSession();
  if (!s) return fail('NOT_LOGGED_IN', 'Em cần đăng nhập để lưu kết quả.');
  const bad = validateAttempt(attempt);
  if (bad) { console.error('[store] saveAttempt INVALID_INPUT:', bad, attempt); return fail('INVALID_INPUT', `Dữ liệu bài làm không hợp lệ (${bad}).`); }
  const row = {
    id: uuid(),
    anon_id: s.anon_id,
    question_id: attempt.question_id,
    lesson: attempt.lesson,
    answer: attempt.answer ?? null,
    is_correct: attempt.is_correct,
    misconception_codes: (attempt.misconception_codes || []).slice(0, 10),
    hint_level_used: Number(attempt.hint_level_used || 0),
    duration_ms: Math.max(0, Math.min(3600000, Math.round(Number(attempt.duration_ms) || 0))),
    mode: attempt.mode || 'practice',
  };
  if (!isOnline()) {
    const list = lsGet(K.attempts, []);
    list.push({ ...row, class_code: s.class_code, created_at: new Date().toISOString() });
    if (list.length > 5000) list.splice(0, list.length - 5000);
    lsSet(K.attempts, list);
    return ok({ id: row.id, queued: false });
  }
  const sent = await insertAttempt(row);
  if (sent === true) return ok({ id: row.id, queued: false });
  if (sent === 'invalid') return fail('INVALID_INPUT', 'Máy chủ từ chối dữ liệu bài làm.');
  const q = lsGet(K.pending, []); q.push(row); lsSet(K.pending, q);
  return ok({ id: row.id, queued: true });
}

/** true = đã gửi; 'invalid' = bị từ chối vĩnh viễn; false = lỗi mạng (xếp hàng) */
async function insertAttempt(row) {
  try {
    const sb = await supabase();
    const { error } = await sb.from('attempts').insert(row); // không .select(): học sinh không có quyền đọc bảng
    if (!error || error.code === '23505') return true;       // trùng id = đã gửi trước đó
    return /fetch|network/i.test(error.message || '') ? false : 'invalid';
  } catch { return false; }
}

export async function flushPendingAttempts() {
  const q = lsGet(K.pending, []);
  if (!isOnline() || !q.length) return ok({ sent: 0, remaining: q.length });
  const remaining = []; let sent = 0;
  for (const row of q) {
    const r = await insertAttempt(row);
    if (r === true) sent++; else if (r === false) remaining.push(row);
  }
  lsSet(K.pending, remaining);
  return ok({ sent, remaining: remaining.length });
}
try { window.addEventListener('online', () => flushPendingAttempts()); } catch { /* ignore */ }

/* ---------------- duyệt nội dung (giáo viên) ---------------- */
// Nội dung câu hỏi nằm trong JSON tĩnh; dấu duyệt nằm ở Supabase (demo: localStorage) và được
// trộn vào câu hỏi khi tải: q.reviewed = true chỉ khi dấu "approved" khớp mã băm nội dung hiện tại.
// q.review_status: 'pending' | 'approved' | 'needs_fix' | 'stale' (đã duyệt nhưng nội dung bị sửa sau đó).
export const REVIEW_STATUSES = ['approved', 'needs_fix', 'pending'];

export async function getContentReviews(classCode = null, teacherPin = null) {
  if (isOnline()) {
    try {
      const sb = await supabase();
      const { data, error } = await sb.rpc('get_content_reviews', { p_class_code: classCode ? up(classCode) : null, p_teacher_pin: teacherPin == null ? null : String(teacherPin) });
      return error ? rpcError(error) : ok(data || []);
    } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
  }
  if (teacherPin != null && String(teacherPin).trim() !== DEMO.TEACHER_PIN) return fail('INVALID_PIN', 'PIN không đúng.');
  return ok(Object.values(lsGet(K.reviews, {})));
}

function applyReviews(content, reviews) {
  const by = new Map((reviews || []).map((r) => [r.question_id, r]));
  content.questions.forEach((q) => {
    if (q.review_status) return;
    const hash = questionHash(q);
    const r = by.get(q.id);
    const approved = r?.status === 'approved' && r.content_hash === hash;
    q.content_hash = hash;
    q.review_note = r?.note ?? null;
    q.review_status = approved ? 'approved' : r?.status === 'approved' ? 'stale' : (r?.status || 'pending');
    if (approved) q.reviewed = true;
    else if (r) q.reviewed = false; // đã có dấu duyệt nhưng hết hiệu lực / cần sửa ⇒ coi như chưa duyệt
  });
}

let contentPromise = null;
/** Như content.loadContent nhưng đã trộn dấu duyệt của giáo viên. Lỗi tải dấu duyệt ⇒ giữ nguyên giá trị trong JSON. */
export function loadContent() {
  if (!contentPromise) {
    contentPromise = (async () => {
      const [content, rv] = await Promise.all([loadStaticContent(), getContentReviews()]);
      applyReviews(content, rv.ok ? rv.data : []);
      return content;
    })();
  }
  return contentPromise;
}

/** question: câu hỏi đã qua loadContent (cần content_hash). status: approved | needs_fix | pending */
export async function setContentReview(classCode, teacherPin, question, status, note = '') {
  if (!REVIEW_STATUSES.includes(status) || !question?.id) return fail('INVALID_INPUT', 'Yêu cầu duyệt không hợp lệ.');
  const cleanNote = String(note || '').trim().slice(0, 500);
  if (status === 'needs_fix' && !cleanNote) return fail('INVALID_INPUT', 'Hãy ghi chú điều cần sửa.');
  const hash = question.content_hash || questionHash(question);
  if (isOnline()) {
    try {
      const sb = await supabase();
      const { error } = await sb.rpc('set_content_review', { p_class_code: up(classCode), p_teacher_pin: String(teacherPin ?? ''), p_question_id: question.id, p_status: status, p_note: cleanNote || null, p_content_hash: hash });
      if (error) return rpcError(error);
    } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
  } else {
    if (String(teacherPin ?? '').trim() !== DEMO.TEACHER_PIN) return fail('INVALID_PIN', 'PIN không đúng.');
    const all = lsGet(K.reviews, {});
    if (status === 'pending') delete all[question.id];
    else all[question.id] = { question_id: question.id, status, note: cleanNote || null, content_hash: hash, reviewed_at: new Date().toISOString() };
    lsSet(K.reviews, all);
  }
  // cập nhật ngay bản trong bộ nhớ để giao diện phản ánh liền
  question.review_status = status;
  question.review_note = status === 'pending' ? null : cleanNote || null;
  question.reviewed = status === 'approved' ? true : false;
  return ok({ question_id: question.id, status });
}

/* ---------------- thống kê ---------------- */
function lessonAgg(rows) {
  const m = new Map();
  rows.forEach((a) => { const x = m.get(a.lesson) || { lesson: a.lesson, attempts: 0, correct: 0 }; x.attempts++; if (a.is_correct) x.correct++; m.set(a.lesson, x); });
  return [...m.values()].sort((a, b) => a.lesson.localeCompare(b.lesson));
}
function misAgg(rows, withStudents) {
  const m = new Map();
  rows.forEach((a) => (a.misconception_codes || []).forEach((code) => {
    const x = m.get(code) || { code, count: 0, s: new Set() }; x.count++; x.s.add(a.anon_id); m.set(code, x);
  }));
  return [...m.values()].sort((a, b) => b.count - a.count || a.code.localeCompare(b.code, 'en', { numeric: true }))
    .map((x) => (withStudents ? { code: x.code, count: x.count, students: x.s.size } : { code: x.code, count: x.count }));
}
const acc = (rows) => (rows.length ? round3(rows.filter((a) => a.is_correct).length / rows.length) : null);

export async function getMyStats() {
  const s = getSession();
  if (!s) return fail('NOT_LOGGED_IN', 'Em cần đăng nhập để xem kết quả.');
  if (isOnline()) {
    try {
      const sb = await supabase();
      const { data, error } = await sb.rpc('get_my_stats', { p_class_code: s.class_code, p_anon_id: s.anon_id });
      return error ? rpcError(error) : ok(data);
    } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
  }
  const rows = lsGet(K.attempts, []).filter((a) => a.anon_id === s.anon_id);
  const hc = lsGet(K.hints, {});
  const modes = MODES.map((mode) => { const r = rows.filter((a) => a.mode === mode); return r.length ? { mode, attempts: r.length, accuracy: acc(r) } : null; }).filter(Boolean);
  return ok({
    total_attempts: rows.length,
    correct: rows.filter((a) => a.is_correct).length,
    accuracy: acc(rows),
    hints_used: rows.filter((a) => a.hint_level_used > 0).length,
    hints_today: hc.day === vnToday() && hc.anon_id === s.anon_id ? hc.used : 0,
    by_lesson: lessonAgg(rows),
    by_misconception: misAgg(rows, false),
    by_mode: modes,
  });
}

async function demoClassRows(cls, pin) {
  if (String(pin ?? '').trim() !== DEMO.TEACHER_PIN) {
    await new Promise((r) => setTimeout(r, 600));
    return fail('INVALID_PIN', 'PIN không đúng.');
  }
  if (!CLASS_RE.test(cls)) return fail('INVALID_PIN', 'Mã lớp không đúng định dạng.');
  const content = await loadContent();
  const real = lsGet(K.attempts, []).filter((a) => a.class_code === cls);
  return ok({ rows: [...seedClassAttempts(cls, content), ...real], real: real.length, size: demoClass(cls).size });
}

export async function getClassStats(classCode, teacherPin, mode = null) {
  const cls = up(classCode);
  if (mode != null && !MODES.includes(mode)) return fail('INVALID_INPUT', 'Chế độ thống kê không hợp lệ.');
  if (isOnline()) {
    try {
      const sb = await supabase();
      const { data, error } = await sb.rpc('get_class_stats', { p_class_code: cls, p_teacher_pin: String(teacherPin ?? ''), p_mode: mode });
      return error ? rpcError(error) : ok(data);
    } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
  }
  const r = await demoClassRows(cls, teacherPin);
  if (!r.ok) return r;
  const all = r.data.rows;
  const rows = mode ? all.filter((a) => a.mode === mode) : all;
  const c = demoClass(cls);
  const qm = new Map();
  rows.forEach((a) => { const x = qm.get(a.question_id) || { question_id: a.question_id, lesson: a.lesson, attempts: 0, c: 0 }; x.attempts++; if (a.is_correct) x.c++; qm.set(a.question_id, x); });
  const hl = new Map();
  rows.forEach((a) => { if (a.hint_level_used > 0) hl.set(a.hint_level_used, (hl.get(a.hint_level_used) || 0) + 1); });
  const scores = MODES.map((m) => {
    const per = new Map();
    all.filter((a) => a.mode === m).forEach((a) => { const x = per.get(a.anon_id) || [0, 0]; x[0]++; if (a.is_correct) x[1]++; per.set(a.anon_id, x); });
    if (!per.size) return null;
    const avg = [...per.values()].reduce((s, [n, k]) => s + k / n, 0) / per.size;
    return { mode: m, students: per.size, avg_score: round3(avg) };
  }).filter(Boolean);
  return ok({
    class: { code: c.code, name: c.name, group: c.group },
    mode,
    students_total: Math.max(c.size, new Set(all.map((a) => a.anon_id)).size),
    students_active: new Set(rows.map((a) => a.anon_id)).size,
    total_attempts: rows.length,
    accuracy: acc(rows),
    by_misconception: misAgg(rows, true),
    by_lesson: lessonAgg(rows).map((x) => ({ lesson: x.lesson, attempts: x.attempts, accuracy: round3(x.correct / x.attempts) })),
    by_question: [...qm.values()].map((x) => ({ question_id: x.question_id, lesson: x.lesson, attempts: x.attempts, accuracy: round3(x.c / x.attempts) }))
      .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts).slice(0, 20),
    hint_levels: [...hl.entries()].sort((a, b) => a[0] - b[0]).map(([level, count]) => ({ level, count })),
    scores,
    // Chỉ có ở chế độ demo (giao diện dùng để ghi chú nguồn dữ liệu):
    demo_real_attempts: r.data.real,
  });
}

export async function getClassExport(classCode, teacherPin) {
  const cls = up(classCode);
  if (isOnline()) {
    try {
      const sb = await supabase();
      const { data, error } = await sb.rpc('get_class_export', { p_class_code: cls, p_teacher_pin: String(teacherPin ?? '') });
      return error ? rpcError(error) : ok(data || []);
    } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
  }
  const r = await demoClassRows(cls, teacherPin);
  if (!r.ok) return r;
  return ok(r.data.rows
    .map((a) => ({ anon_id: a.anon_id, question_id: a.question_id, lesson: a.lesson, is_correct: a.is_correct, misconception_codes: a.misconception_codes, hint_level_used: a.hint_level_used, duration_ms: a.duration_ms, mode: a.mode, created_at: a.created_at }))
    .sort((a, b) => a.anon_id.localeCompare(b.anon_id) || a.created_at.localeCompare(b.created_at)));
}

/* ---- dữ liệu minh họa tất định cho dashboard demo ---- */
function hashStr(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const seedCache = new Map();
function seedClassAttempts(cls, content) {
  if (seedCache.has(cls)) return seedCache.get(cls);
  const c = demoClass(cls);
  const r = rng(hashStr(cls));
  const qs = content.questions;
  const out = [];
  const base = { NB: 0.8, TH: 0.6, VD: 0.42 };
  const start = Date.parse('2026-11-24T01:00:00Z');
  const answerFor = (q, p) => {
    if (q.type === 'mcq') {
      if (r() < p) return q.answer;
      const wrong = (q.options || []).filter((o) => o.key !== q.answer);
      const tagged = wrong.filter((o) => o.misconception);
      const pool = tagged.length && r() < 0.8 ? tagged : wrong;
      return pool.length ? pool[Math.floor(r() * pool.length)].key : q.answer;
    }
    if (q.type === 'true_false') {
      const a = {}; (q.statements || []).forEach((s) => { a[s.key] = r() < p + 0.12 ? Boolean(s.answer) : !s.answer; }); return a;
    }
    if (r() < p) return String(q.answer);
    const hs = q.misconception_hints || [];
    return hs.length && r() < 0.75 ? String(hs[Math.floor(r() * hs.length)].value) : String((parseNumber(q.answer) || 1) * 2);
  };
  const push = (anon, q, mode, p, hint, day) => {
    const answer = answerFor(q, p);
    const g = grade(q, answer);
    out.push({
      id: `seed-${anon}-${mode}-${q.id}`, anon_id: anon, class_code: cls, question_id: q.id, lesson: q.lesson,
      answer, is_correct: g.is_correct, misconception_codes: g.misconception_codes, hint_level_used: hint,
      duration_ms: Math.round(15000 + r() * 75000), mode,
      created_at: new Date(start + day * 864e5 + r() * 8 * 3600e3).toISOString(), sample: true,
    });
  };
  const testSet = qs.filter((_, i) => i % 4 === 0); // ~10 câu cho kiểm tra trước/sau
  const gain = c.group === 'control' ? 0.05 : 0.16;
  for (let s = 1; s <= c.size; s++) {
    const anon = `${c.prefix}-${String(s).padStart(2, '0')}`;
    const skill = (r() - 0.5) * 0.3;
    const p = (q) => Math.min(0.97, Math.max(0.08, (base[q.level] ?? 0.6) + skill));
    testSet.forEach((q) => push(anon, q, 'pretest', p(q) - 0.08, 0, 0));
    qs.forEach((q) => {
      if (r() > 0.72) return;
      const hint = c.group === 'control' ? 0 : (r() < 0.28 ? 1 + Math.floor(r() * 3) : 0);
      push(anon, q, 'practice', p(q) + 0.04, hint, 1 + Math.floor(r() * 3));
    });
    testSet.forEach((q) => push(anon, q, 'posttest', p(q) - 0.08 + gain, 0, 4));
  }
  seedCache.set(cls, out);
  return out;
}

/* ---------------- gợi ý AI ---------------- */
let lastRemaining = null;
function demoCounter(anon) {
  const h = lsGet(K.hints, {});
  return h.day === vnToday() && h.anon_id === anon ? h : { day: vnToday(), anon_id: anon, used: 0 };
}

export async function getHintsRemaining() {
  const s = getSession();
  if (!s) return fail('NOT_LOGGED_IN', 'Em cần đăng nhập.');
  if (isOnline()) {
    if (lastRemaining != null) return ok(lastRemaining);
    // Chưa hỏi gợi ý trong phiên trang này (ví dụ vừa mở trang Kết quả): tính từ số lượt máy chủ đã ghi hôm nay.
    const st = await getMyStats();
    return ok(st.ok ? Math.max(0, CONFIG.HINT_DAILY_LIMIT - (st.data.hints_today || 0)) : CONFIG.HINT_DAILY_LIMIT);
  }
  return ok(Math.max(0, CONFIG.HINT_DAILY_LIMIT - demoCounter(s.anon_id).used));
}

function serializeAnswer(a) {
  if (a == null || a === '') return null;
  if (typeof a === 'object') return a; // true_false: gửi nguyên đối tượng {a:true,…} để máy chủ dò được mã lỗi sai
  return String(a).slice(0, 200);    // máy chủ từ chối chuỗi > 200 ký tự
}

export async function requestHint(questionId, level, studentAnswer) {
  const s = getSession();
  if (!s) return fail('NOT_LOGGED_IN', 'Em cần đăng nhập để dùng gợi ý.');
  const lvl = Number(level);
  if (![1, 2, 3].includes(lvl) || !questionId) return fail('INVALID_INPUT', 'Yêu cầu gợi ý không hợp lệ.');
  if (isOnline()) {
    try {
      const res = await fetch(`${CONFIG.SUPABASE_URL}/functions/v1/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: CONFIG.SUPABASE_ANON_KEY, Authorization: `Bearer ${CONFIG.SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ question_id: questionId, level: lvl, student_answer: serializeAnswer(studentAnswer), anon_id: s.anon_id }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) return fail(body.error || 'SERVER_ERROR', body.message || 'Không lấy được gợi ý, hãy thử lại sau.');
      if (Number.isFinite(body.remaining_today)) lastRemaining = body.remaining_today;
      return ok({ level: body.level ?? lvl, hint: body.hint, remaining_today: body.remaining_today, disclaimer: body.disclaimer || DISCLAIMER });
    } catch { return fail('NETWORK', 'Mất kết nối – chưa lấy được gợi ý. Em có thể xem lời giải chuẩn.'); }
  }
  // ---- chế độ demo: gợi ý soạn sẵn, KHÔNG gọi AI ----
  if (s.group === 'control') return fail('HINTS_DISABLED', 'Lớp đối chứng không dùng gợi ý AI.');
  const content = await loadContent();
  const q = content.index.question.get(questionId);
  if (!q) return fail('QUESTION_NOT_FOUND', 'Không tìm thấy câu hỏi.');
  const counter = demoCounter(s.anon_id);
  if (counter.used >= CONFIG.HINT_DAILY_LIMIT) return fail('RATE_LIMITED', 'Em đã dùng hết lượt gợi ý hôm nay. Em vẫn có thể xem lời giải chuẩn.');
  counter.used++; lsSet(K.hints, counter);
  return ok({ level: lvl, hint: demoHint(q, lvl, studentAnswer, content), remaining_today: Math.max(0, CONFIG.HINT_DAILY_LIMIT - counter.used), disclaimer: DISCLAIMER });
}

function demoHint(q, level, studentAnswer, content) {
  if (level === 3) return q.explanation || 'Câu hỏi này chưa có lời giải đã duyệt.';
  const has = studentAnswer != null && studentAnswer !== '' && !(typeof studentAnswer === 'object' && !Object.keys(studentAnswer).length);
  const g = has ? grade(q, studentAnswer) : null;
  const mis = g && !g.is_correct && g.misconception_codes[0] ? content.index.mis.get(g.misconception_codes[0]) : null;
  if (level === 1) {
    const byType = {
      mcq: 'Đề bài đang hỏi về đại lượng nào? Em hãy nhắc lại định nghĩa của nó, rồi thử loại những phương án trái với định nghĩa đó.',
      true_false: 'Với mỗi ý, từ khóa nào quyết định ý đó đúng hay sai? Ý đó có đúng trong mọi trường hợp không?',
      short: 'Đề bài cho những dữ kiện nào và yêu cầu tìm gì? Công thức nào liên hệ các đại lượng đó?',
    };
    return (byType[q.type] || byType.mcq) + (mis ? ' Em kiểm tra lại xem mình có đang nhầm lẫn điều gì ở bước vừa làm không?' : '');
  }
  if (mis) return `${mis.remedy || mis.description || mis.title}`;
  const lesson = content.index.lesson.get(q.lesson);
  const f = (lesson?.key_formulas || []).slice(0, 2);
  return f.length ? `Hãy áp dụng kiến thức trọng tâm của ${lesson.id}: ${f.join('; ')}.` : `Hãy xem lại phần ý chính của bài ${q.lesson}.`;
}

/* ---------------- đề kiểm tra trước / sau KÍN (US-12) ---------------- */
// Đề, đáp án và mã lỗi chỉ nằm ở máy chủ (bảng test_items, học sinh không đọc được). Không có chế độ demo cho đề kín.
const TEST_TYPES = ['pre', 'post'];
async function testRpc(fn, params) {
  if (!isOnline()) return fail('DEMO', 'Bài kiểm tra kín cần kết nối máy chủ (không dùng được ở chế độ demo).');
  try {
    const sb = await supabase();
    const { data, error } = await sb.rpc(fn, params);
    return error ? rpcError(error) : ok(data);
  } catch { return fail('NETWORK', 'Mất kết nối mạng. Hãy thử lại.'); }
}
export function getTestStatus() {
  const s = getSession();
  if (!s) return Promise.resolve(fail('NOT_LOGGED_IN', 'Em cần đăng nhập.'));
  return testRpc('get_test_status', { p_class_code: s.class_code, p_anon_id: s.anon_id });
}
export function startTest(type) {
  const s = getSession();
  if (!s) return Promise.resolve(fail('NOT_LOGGED_IN', 'Em cần đăng nhập.'));
  if (!TEST_TYPES.includes(type)) return Promise.resolve(fail('INVALID_INPUT', 'Loại bài kiểm tra không hợp lệ.'));
  return testRpc('start_test', { p_class_code: s.class_code, p_anon_id: s.anon_id, p_test_type: type });
}
/** answers: { 'TA-01': 'B', ... } — câu bỏ trống thì không có khóa. Trả { score, max_score, correct, total }. */
export function submitTest(type, answers) {
  const s = getSession();
  if (!s) return Promise.resolve(fail('NOT_LOGGED_IN', 'Em cần đăng nhập.'));
  if (!TEST_TYPES.includes(type)) return Promise.resolve(fail('INVALID_INPUT', 'Loại bài kiểm tra không hợp lệ.'));
  return testRpc('submit_test', { p_class_code: s.class_code, p_anon_id: s.anon_id, p_test_type: type, p_answers: answers || {} });
}
export const getTestOverview = (classCode, teacherPin) => testRpc('get_test_overview', { p_class_code: up(classCode), p_teacher_pin: String(teacherPin ?? '') });
export const setTestOpen = (classCode, teacherPin, type, open) =>
  testRpc('set_test_open', { p_class_code: up(classCode), p_teacher_pin: String(teacherPin ?? ''), p_test_type: type, p_open: Boolean(open) });
