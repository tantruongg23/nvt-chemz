// content.js — đọc nội dung tĩnh web/data/*.json (không đi qua store.js, theo ARCHITECTURE.md §3.2)
// và các hàm chấm điểm dùng chung.

const DATA_FILES = ['lessons', 'misconceptions', 'terms', 'questions'];
let contentPromise = null;

export function codeNum(code) { const n = parseInt(String(code).replace(/\D/g, ''), 10); return Number.isFinite(n) ? n : 999; }

async function fetchJSON(path, errors, label) {
  try {
    const res = await fetch(new URL(`../data/${path}`, import.meta.url), { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error('không phải mảng JSON');
    return json;
  } catch (e) {
    if (errors) errors.push(`${label || path}: ${e.message}`);
    return null;
  }
}

/**
 * loadContent() → { chapters, lessons, misconceptions, terms, questions, errors[], index{chapter,lesson,mis,term,question: Map} }
 * Đọc chapters.json; mỗi chương có "dir" ("" = thư mục data/ gốc, "c2" = data/c2/…, null = chưa có nội dung).
 * Không ném lỗi: tệp nào lỗi thì bỏ qua và ghi vào errors.
 */
export function loadContent() {
  if (contentPromise) return contentPromise;
  contentPromise = (async () => {
    const errors = [];
    let chapters = await fetchJSON('chapters.json', null);
    if (!chapters) chapters = [{ id: 'C1', number: 1, title: 'Cấu tạo nguyên tử', dir: '', lessons: [] }];
    const parts = await Promise.all(chapters.map(async (ch) => {
      if (ch.dir == null) return null;
      const base = ch.dir ? `${ch.dir}/` : '';
      const files = await Promise.all(DATA_FILES.map((name) => fetchJSON(`${base}${name}.json`, errors, `${base}${name}.json`)));
      const tag = (arr) => (arr || []).map((x) => (x && typeof x === 'object' && !x.chapter ? { ...x, chapter: ch.id } : x));
      return Object.fromEntries(DATA_FILES.map((name, i) => [name, tag(files[i])]));
    }));
    const all = (name) => parts.flatMap((p) => (p ? p[name] : []));
    const lessonNum = (l) => l.number || codeNum(l.id);
    const content = {
      chapters: chapters.filter((c) => c && c.id).sort((a, b) => (a.number || 0) - (b.number || 0)),
      lessons: all('lessons').filter((l) => l && l.id).sort((a, b) => lessonNum(a) - lessonNum(b)),
      misconceptions: all('misconceptions').filter((m) => m && m.code).sort((a, b) => codeNum(a.code) - codeNum(b.code)),
      terms: all('terms').filter((t) => t && t.id && t.en),
      questions: all('questions').filter((q) => q && q.id && q.type),
      errors,
    };
    content.index = {
      chapter: new Map(content.chapters.map((c) => [c.id, c])),
      lesson: new Map(content.lessons.map((l) => [l.id, l])),
      mis: new Map(content.misconceptions.map((m) => [m.code, m])),
      term: new Map(content.terms.map((t) => [t.id, t])),
      question: new Map(content.questions.map((q) => [q.id, q])),
    };
    return content;
  })();
  return contentPromise;
}

/** Chương chứa một bài (theo trường chapter của bài, hoặc danh sách lessons trong chapters.json) */
export function chapterOfLesson(content, lessonId) {
  const l = content.index.lesson.get(lessonId);
  return content.index.chapter.get(l && l.chapter) || content.chapters.find((c) => (c.lessons || []).includes(lessonId)) || null;
}

/** Tất cả mã lỗi sai có thể gặp trong một câu hỏi */
export function questionMisconceptions(q) {
  const set = new Set();
  (q.options || []).forEach((o) => o && o.misconception && set.add(o.misconception));
  (q.statements || []).forEach((s) => s && s.misconception && set.add(s.misconception));
  (q.misconception_hints || []).forEach((h) => h && h.misconception && set.add(h.misconception));
  return [...set];
}

export function parseNumber(v) {
  if (v == null) return NaN;
  const s = String(v).trim().replace(/\s/g, '').replace(',', '.');
  return s === '' ? NaN : Number(s);
}

/** Thang điểm câu Đúng/Sai theo định dạng thi mới: 1 ý 0,1; 2 ý 0,25; 3 ý 0,5; 4 ý 1 (quy về 0..1) */
const TF_SCALE = [0, 0.1, 0.25, 0.5, 1];

/**
 * grade(question, answer) → { is_correct, score (0..1, chỉ để hiển thị), misconception_codes[], detail }
 * answer: mcq → "A"; true_false → { a: true, b: false, … }; short → "35,5"
 */
export function grade(q, answer) {
  const out = (is_correct, score, misconception_codes, detail = {}) => ({ is_correct, score, misconception_codes, detail });
  if (!q) return out(false, 0, []);
  if (q.type === 'mcq') {
    const ok = String(answer) === String(q.answer);
    const opt = (q.options || []).find((o) => String(o.key) === String(answer));
    return out(ok, ok ? 1 : 0, !ok && opt && opt.misconception ? [opt.misconception] : [], { chosen: opt || null });
  }
  if (q.type === 'true_false') {
    const st = q.statements || [];
    const per = {}; const mis = []; let right = 0;
    st.forEach((s) => {
      const ok = (answer ? answer[s.key] : undefined) === Boolean(s.answer);
      per[s.key] = ok;
      if (ok) right++;
      else if (s.misconception && !mis.includes(s.misconception)) mis.push(s.misconception);
    });
    const n = st.length || 4;
    return out(right === n && n > 0, n === 4 ? TF_SCALE[right] : right / n, mis, { per, right, total: n });
  }
  if (q.type === 'short') {
    const x = parseNumber(answer);
    const target = parseNumber(q.answer);
    const tol = Number.isFinite(Number(q.tolerance)) ? Math.abs(Number(q.tolerance)) : 0;
    const eps = 1e-9;
    const ok = Number.isFinite(target)
      ? Number.isFinite(x) && Math.abs(x - target) <= tol + eps
      : String(answer).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
    const mis = [];
    if (!ok) {
      (q.misconception_hints || []).forEach((h) => {
        const hv = parseNumber(h.value);
        const hit = Number.isFinite(hv) && Number.isFinite(x) ? Math.abs(x - hv) <= Math.max(tol, 1e-6) + eps : String(h.value).trim() === String(answer).trim();
        if (hit && h.misconception && !mis.includes(h.misconception)) mis.push(h.misconception);
      });
    }
    return out(ok, ok ? 1 : 0, mis, { value: x });
  }
  return out(false, 0, []);
}
