// Đọc đề kín docs/research/DE_KIEM_TRA_TRUOC_SAU_C1.md → kiểm tra → (tùy chọn) ghi JSON máy đọc được.
//   node docs/content/build_closed_tests.js            chỉ kiểm tra
//   node docs/content/build_closed_tests.js --write    kiểm tra, nếu đạt thì ghi docs/research/de_kin_c1.json
// File JSON nằm ngoài web/ nên KHÔNG được Vercel phục vụ công khai. Đừng chép nó vào web/.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..');
const md = fs.readFileSync(path.join(root, 'docs/research/DE_KIEM_TRA_TRUOC_SAU_C1.md'), 'utf8').replace(/\r\n/g, '\n');
const bank = JSON.parse(fs.readFileSync(path.join(root, 'web/data/questions.json'), 'utf8'));
const terms = JSON.parse(fs.readFileSync(path.join(root, 'web/data/terms.json'), 'utf8'));
const miscs = new Set(JSON.parse(fs.readFileSync(path.join(root, 'web/data/misconceptions.json'), 'utf8')).map((m) => m.code));
const err = [], warn = [];

// ---------- Phần I ----------
const part1 = md.split('## 3. Phần II')[0].split('## 2. Phần I')[1];
const items = [];
let target = null;
for (const block of part1.split(/\n(?=### |\*\*[AB]\d+\.\*\*)/)) {
  const h = block.match(/^### Lỗi (M\d+)/);
  if (h) { target = h[1]; continue; }
  const m = block.match(/^\*\*([AB])(\d+)\.\*\* ([^\n]*)\n([\s\S]*)$/);
  if (!m) continue;
  const [, form, no, stem, rest] = m;
  const toks = rest.replace(/\*\*/g, '').trim().split(/\n| · (?=[A-D]\. )/).map((s) => s.trim()).filter(Boolean);
  const options = toks.map((t) => {
    const o = t.match(/^([A-D])\.\s+(.*?)\s*(✓)?\s*(?:\((M\d+|—)[^)]*\))?$/);
    if (!o) { err.push(`${form}${no}: không đọc được phương án "${t}"`); return null; }
    return { key: o[1], text: o[2].replace(/\s*✓$/, '').trim(), correct: !!o[3], misconception: o[4] && o[4] !== '—' ? o[4] : null };
  }).filter(Boolean);
  items.push({ form, no: +no, target, stem: stem.trim(), options });
}

const key = { A: {}, B: {} };
const rows = [...md.matchAll(/^\| Đề (A|B) \|((?: [A-D] \|){20})$/gm)];
rows.forEach((r) => r[0].split('|').slice(2, 22).forEach((c, i) => { key[r[1]][i + 1] = c.trim(); }));
if (rows.length !== 2) err.push(`Bảng đáp án nhanh: đọc được ${rows.length}/2 hàng`);

for (const f of ['A', 'B']) for (let n = 1; n <= 20; n++) {
  const it = items.find((x) => x.form === f && x.no === n);
  const id = `${f}${n}`;
  if (!it) { err.push(`${id}: thiếu câu`); continue; }
  if (it.options.length !== 4 || it.options.map((o) => o.key).join('') !== 'ABCD') err.push(`${id}: cần đúng 4 phương án A–D`);
  const ok = it.options.filter((o) => o.correct);
  if (ok.length !== 1) { err.push(`${id}: có ${ok.length} đáp án ✓`); continue; }
  it.answer = ok[0].key;
  if (key[f][n] !== it.answer) err.push(`${id}: đáp án trong câu (${it.answer}) khác bảng đáp án nhanh (${key[f][n]})`);
  it.options.forEach((o) => {
    if (o.correct && o.misconception) err.push(`${id}: đáp án đúng bị gắn lỗi ${o.misconception}`);
    if (o.misconception && !miscs.has(o.misconception)) err.push(`${id}: mã lỗi lạ ${o.misconception}`);
    if (!o.correct && o.misconception && o.misconception !== it.target) warn.push(`${id}: phương án ${o.key} gắn ${o.misconception}, khác lỗi mục tiêu ${it.target}`);
  });
  if (!it.options.some((o) => !o.correct && o.misconception === it.target)) warn.push(`${id}: không có phương án sai nào gắn lỗi mục tiêu ${it.target}`);
  if (new Set(it.options.map((o) => o.text)).size !== 4) err.push(`${id}: có hai phương án trùng nội dung`);
}

// Ghép cặp A–B: cùng lỗi mục tiêu, và số phương án gắn lỗi tương đương (±1)
for (let n = 1; n <= 20; n++) {
  const a = items.find((x) => x.form === 'A' && x.no === n), b = items.find((x) => x.form === 'B' && x.no === n);
  if (!a || !b) continue;
  if (a.target !== b.target) err.push(`Cặp ${n}: lỗi mục tiêu khác nhau (${a.target} / ${b.target})`);
  const tag = (x) => x.options.filter((o) => o.misconception).length;
  if (Math.abs(tag(a) - tag(b)) > 1) warn.push(`Cặp ${n}: số phương án gắn lỗi lệch (${tag(a)} / ${tag(b)})`);
}
for (let k = 1; k <= 10; k++) {
  const c = items.filter((x) => x.target === `M${k}`).length;
  if (c !== 4) err.push(`M${k}: có ${c} câu (cần 2 câu mỗi đề = 4)`);
}

// Vị trí đáp án: không quá lệch
for (const f of ['A', 'B']) {
  const dist = { A: 0, B: 0, C: 0, D: 0 };
  items.filter((x) => x.form === f).forEach((x) => dist[x.answer]++);
  console.log(`Đề ${f} – phân bố đáp án đúng:`, JSON.stringify(dist));
  if (Math.max(...Object.values(dist)) > 8) warn.push(`Đề ${f}: một vị trí chiếm quá 8/20 câu đúng`);
  const s = items.filter((x) => x.form === f).map((x) => x.answer).join('');
  if (/(.)\1\1/.test(s)) warn.push(`Đề ${f}: có 3 đáp án liên tiếp cùng một chữ (${s})`);
}

// Kiểm tra số học các câu tính toán
const near = (a, b) => Math.abs(a - b) < 1e-9;
const num = (f, n, k) => +items.find((x) => x.form === f && x.no === n).options.find((o) => o.key === k).text.replace(',', '.').replace('%', '');
const calc = [['A', 9, (69 * 60 + 71 * 40) / 100], ['B', 9, (85 * 70 + 87 * 30) / 100], ['A', 10, 55], ['B', 10, 6]];
// A10: 107(100−x)+109x=10790 → x=45 → ⁱ⁰⁷X = 55%; B10: 6(100−y)+7y=694 → y=94 → ⁶Y = 6%
calc.forEach(([f, n, v]) => { const it = items.find((x) => x.form === f && x.no === n); if (!near(num(f, n, it.answer), v)) err.push(`${f}${n}: đáp án ${it.answer} khác kết quả tính ${v}`); });

// ---------- Phần II ----------
const part2 = [];
for (const r of md.matchAll(/^\| (2\d|30) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)) {
  part2.push({ no: +r[1], A: { en: r[2].trim(), vi: r[3].trim() }, B: { en: r[4].trim(), vi: r[5].trim() } });
}
if (part2.length !== 10) err.push(`Phần II: đọc được ${part2.length}/10 dòng`);
const termByEn = new Map(terms.map((t) => [t.en.toLowerCase(), t]));
for (const row of part2) for (const f of ['A', 'B']) {
  const t = termByEn.get(row[f].en.toLowerCase());
  if (!t) { err.push(`Câu ${row.no} đề ${f}: thuật ngữ "${row[f].en}" không có trong terms.json`); continue; }
  row[f].term = t.id;
}
// Hai đề không dùng chung thuật ngữ
const enA = new Set(part2.map((r) => r.A.en.toLowerCase()));
part2.forEach((r) => enA.has(r.B.en.toLowerCase()) && err.push(`Phần II: "${r.B.en}" có ở cả hai đề`));
// Phương án nhiễu: 3 nghĩa của các thuật ngữ khác cùng đề, cố định (xác định, không ngẫu nhiên); vị trí đáp án xoay vòng
const part2Items = [];
for (const f of ['A', 'B']) {
  part2.forEach((row, i) => {
    const pool = part2.map((r) => r[f].vi);
    const wrong = [3, 5, 7].map((d) => pool[(i + d) % 10]);
    const pos = (i * 3 + (f === 'A' ? 1 : 2)) % 4;
    const texts = [...wrong]; texts.splice(pos, 0, row[f].vi);
    part2Items.push({
      form: f, no: row.no, target: 'term', stem: `Thuật ngữ "${row[f].en}" có nghĩa là`, term: row[f].term,
      options: texts.map((t, k) => ({ key: 'ABCD'[k], text: t, correct: k === pos, misconception: null })), answer: 'ABCD'[pos],
    });
  });
}
warn.push('Phần II: phương án nhiễu do script chọn cố định (nghĩa của 3 thuật ngữ khác trong cùng đề) – GV xem lại các câu 21–30 trước khi dùng.');

// ---------- Trùng ngân hàng luyện tập ----------
const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const grams = (s) => { const w = norm(s).split(' '); const g = new Set(); for (let i = 0; i < w.length - 1; i++) g.add(w[i] + ' ' + w[i + 1]); return g; };
const jac = (a, b) => { if (!a.size || !b.size) return 0; let i = 0; a.forEach((x) => b.has(x) && i++); return i / (a.size + b.size - i); };
const textOf = (q) => [q.stem, ...(q.options || []).map((o) => o.text), ...(q.statements || []).map((s) => s.text)].join(' ');
const bankG = bank.map((q) => ({ id: q.id, g: grams(textOf(q)) }));
let maxSim = 0;
for (const it of [...items, ...part2Items]) {
  const g = grams([it.stem, ...it.options.map((o) => o.text)].join(' '));
  for (const b of bankG) {
    const s = jac(g, b.g);
    maxSim = Math.max(maxSim, s);
    if (s >= 0.6) err.push(`${it.form}${it.no} gần trùng ${b.id} (độ giống ${s.toFixed(2)})`);
    else if (s >= 0.4) warn.push(`${it.form}${it.no} hơi giống ${b.id} (độ giống ${s.toFixed(2)}) – GV xem lại`);
  }
}
console.log(`Đã đọc: ${items.length} câu phần I, ${part2Items.length} câu phần II. Độ giống lớn nhất với ngân hàng luyện tập: ${maxSim.toFixed(2)}`);

warn.forEach((w) => console.log('⚠ ' + w));
if (err.length) { console.log('ERRORS:\n' + err.join('\n')); process.exit(1); }
console.log('ALL CHECKS PASSED');

const LESSON_OF = { M1: 'B2', M2: 'B1', M3: 'B1', M4: 'B2', M5: 'B2', M6: 'B3', M7: 'B3', M8: 'B3', M9: 'B1', M10: 'B3' };
const lessonOf = (it) => (it.target === 'term' ? terms.find((t) => t.id === it.term)?.lesson : LESSON_OF[it.target]);
const flat = [...items, ...part2Items].sort((a, b) => a.form.localeCompare(b.form) || a.no - b.no).map((it) => ({
  id: `T${it.form}-${String(it.no).padStart(2, '0')}`, form: it.form, test_type: it.form === 'A' ? 'pre' : 'post', no: it.no,
  part: it.no <= 20 ? 1 : 2, lesson: lessonOf(it), target_misconception: it.target === 'term' ? null : it.target, term: it.term || undefined,
  stem: it.stem, options: it.options.map(({ key, text, misconception }) => ({ key, text, misconception })), answer: it.answer,
}));
flat.forEach((x) => { if (!/^B([1-9]|1[0-9]|2[0-3])$/.test(x.lesson || '')) { console.log(`ERRORS:\n${x.id}: không xác định được bài (lesson)`); process.exit(1); } });

if (process.argv.includes('--write')) {
  const out = {
    note: 'Đề kín – KHÔNG chép vào web/. Sinh tự động từ DE_KIEM_TRA_TRUOC_SAU_C1.md bằng docs/content/build_closed_tests.js. Bản nháp AI, chờ GV duyệt.',
    reviewed: false,
    forms: { A: { test_type: 'pre' }, B: { test_type: 'post' } },
    points: { part1_each: 0.4, part2_each: 0.2 },
    items: flat,
  };
  fs.writeFileSync(path.join(root, 'docs/research/de_kin_c1.json'), JSON.stringify(out, null, 2) + '\n');
  console.log('Đã ghi docs/research/de_kin_c1.json (' + out.items.length + ' câu)');
}

// --sql: sinh supabase/seed_closed_tests.sql (nạp đề vào bảng test_items trên máy chủ). File này chứa ĐÁP ÁN, Git bỏ qua.
if (process.argv.includes('--sql')) {
  const dq = (tag, v) => { if (String(v).includes(`$${tag}$`)) throw new Error('chuỗi chứa dấu phân cách'); return `$${tag}$${v}$${tag}$`; };
  const rowsSql = flat.map((x) => `  (${dq('i', x.id)}, ${dq('t', x.test_type)}, ${x.no}, ${x.part}, ${dq('l', x.lesson)}, ${x.target_misconception ? dq('m', x.target_misconception) : 'null'}, ${dq('s', x.stem)}, ${dq('j', JSON.stringify(x.options))}::jsonb, ${dq('a', x.answer)})`);
  const sql = `-- Sinh tự động bởi docs/content/build_closed_tests.js --sql. CHỨA ĐÁP ÁN – không commit, không chia sẻ.
-- Chạy trong Supabase SQL Editor (hoặc supabase db query --linked -f). Chạy lại được: ghi đè theo id.
insert into public.test_items (id, test_type, no, part, lesson, target_misconception, stem, options, answer) values
${rowsSql.join(',\n')}
on conflict (id) do update set test_type = excluded.test_type, no = excluded.no, part = excluded.part,
  lesson = excluded.lesson, target_misconception = excluded.target_misconception, stem = excluded.stem,
  options = excluded.options, answer = excluded.answer;
-- Phải đủ 30 câu mỗi đề:
select test_type, count(*) as so_cau from public.test_items group by test_type order by test_type desc;
`;
  fs.writeFileSync(path.join(root, 'supabase/seed_closed_tests.sql'), sql);
  console.log('Đã ghi supabase/seed_closed_tests.sql (' + flat.length + ' câu)');
}
