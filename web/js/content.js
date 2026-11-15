// content.js — đọc nội dung tĩnh web/data/*.json (không đi qua store.js, theo ARCHITECTURE.md §3.2)
// và các hàm chấm điểm dùng chung.

const DATA_FILES = ['lessons', 'misconceptions', 'terms', 'questions'];
let contentPromise = null;

export function codeNum(code) { const n = parseInt(String(code).replace(/\D/g, ''), 10); return Number.isFinite(n) ? n : 999; }

/**
 * loadContent() → { lessons, misconceptions, terms, questions, errors[], index{lesson,mis,term,question: Map} }
 * Không ném lỗi: tệp nào lỗi thì trả mảng rỗng và ghi vào errors.
 */
export function loadContent() {
  if (contentPromise) return contentPromise;
  contentPromise = (async () => {
    const errors = [];
    const results = await Promise.all(DATA_FILES.map(async (name) => {
      try {
        const res = await fetch(new URL(`../data/${name}.json`, import.meta.url), { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!Array.isArray(json)) throw new Error('không phải mảng JSON');
        return json;
      } catch (e) {
        errors.push(`${name}.json: ${e.message}`);
        return [];
      }
    }));
    const [lessons, misconceptions, terms, questions] = results;
    const content = {
      lessons: lessons.filter((l) => l && l.id).sort((a, b) => String(a.id).localeCompare(String(b.id), 'vi', { numeric: true })),
      misconceptions: misconceptions.filter((m) => m && m.code).sort((a, b) => codeNum(a.code) - codeNum(b.code)),
      terms: terms.filter((t) => t && t.id && t.en),
      questions: questions.filter((q) => q && q.id && q.type),
      errors,
    };
    content.index = {
      lesson: new Map(content.lessons.map((l) => [l.id, l])),
      mis: new Map(content.misconceptions.map((m) => [m.code, m])),
      term: new Map(content.terms.map((t) => [t.id, t])),
      question: new Map(content.questions.map((q) => [q.id, q])),
    };
    return content;
  })();
  return contentPromise;
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
