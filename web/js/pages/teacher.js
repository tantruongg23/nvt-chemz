import { mountShell, $, $$, esc, icon, pct, mbadge, misHue, contentErrorNotice, toast, unreviewedBadge, isDemo } from '../ui.js';
import { loadContent, getClassStats, getClassExport } from '../store.js';
import { DEMO } from '../config.js';

mountShell('teacher');
const app = $('#app');
const content = await loadContent();
const SS_KEY = 'nvt.teacher'; // chỉ sessionStorage: đóng tab là quên PIN
const MODES = [[null, 'Tất cả'], ['practice', 'Luyện tập'], ['pretest', 'KT trước'], ['posttest', 'KT sau']];
const MODE_LABEL = { practice: 'Luyện tập', pretest: 'Kiểm tra trước', posttest: 'Kiểm tra sau' };
let auth = null;
let mode = null;
try { auth = JSON.parse(sessionStorage.getItem(SS_KEY) || 'null'); } catch { /* ignore */ }


function renderLogin(err = '') {
  app.innerHTML = `${contentErrorNotice(content)}
    <p class="eyebrow">Dành cho giáo viên</p><h1>Dashboard lớp học</h1>
    <p class="muted">Xem độ chính xác theo bài, bản đồ lỗi sai M1–M${content.misconceptions.length || 10}, câu khó nhất và so sánh kiểm tra trước/sau.</p>
    <form class="card login-card" id="tForm" style="max-width:520px" novalidate>
      <div class="login-grid">
        <div class="field"><label for="tCls">Mã lớp</label><input class="input" id="tCls" name="cls" list="tClsList" autocomplete="off" placeholder="DEMO-TN" value="${esc(auth?.cls || '')}" required>
          <datalist id="tClsList">${isDemo() ? DEMO.CLASSES.map((c) => `<option value="${c.code}">`).join('') : ''}</datalist></div>
        <div class="field"><label for="tPin">PIN giáo viên</label><input class="input" id="tPin" name="pin" type="password" autocomplete="off" required></div>
        <p class="form-error" id="tErr" role="alert" style="grid-column:1/-1">${esc(err)}</p>
        <button class="btn btn-primary btn-lg" type="submit">${icon('lock')} Xem thống kê</button>
      </div>
      ${isDemo() ? `<p class="small muted" style="margin:10px 0 0">Chế độ demo: lớp ${DEMO.CLASSES.map((c) => c.code).join(' / ')}, PIN <b>${esc(DEMO.TEACHER_PIN)}</b>.</p>` : ''}
      <div class="privacy-note">${icon('shield')}<span>Thống kê chỉ hiển thị mã ẩn danh của học sinh, không có họ tên.</span></div>
    </form>`;
  $('#tForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target;
    const btn = f.querySelector('button[type="submit"]');
    btn.disabled = true; $('#tErr').textContent = '';
    const r = await openDashboard(f.cls.value, f.pin.value);
    btn.disabled = false;
    if (!r.ok) { $('#tErr').textContent = r.message; f.pin.setAttribute('aria-invalid', 'true'); f.pin.focus(); }
  });
}

async function openDashboard(cls, pin) {
  const [s, x] = await Promise.all([getClassStats(cls, pin, mode), getClassExport(cls, pin)]);
  if (!s.ok) return s;
  auth = { cls: s.data.class?.code || cls, pin };
  try { sessionStorage.setItem(SS_KEY, JSON.stringify(auth)); } catch { /* ignore */ }
  const rows = x.ok ? x.data.filter((r) => !mode || r.mode === mode) : [];
  renderDashboard(s.data, rows, x.ok ? x.data : []);
  return s;
}

/* ---------- biểu đồ SVG thuần ---------- */
// Bề rộng viewBox bám theo bề rộng thật để chữ luôn ~13px trên mọi màn hình.
const chartW = (full = false) => Math.max(300, Math.min(full ? 1060 : 560, (app.clientWidth || 560) / (!full && window.innerWidth >= 720 ? 2 : 1) - 56));
function hbars(items, { fmt = (v) => pct(v), labelW = 170, title = '', full = false } = {}) {
  const rowH = 36; const W = chartW(full); const barW = W - labelW - 56;
  const H = items.length * rowH + 24;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">
    ${[0, 0.25, 0.5, 0.75, 1].map((t) => `<line class="grid-line" x1="${labelW + t * barW}" x2="${labelW + t * barW}" y1="4" y2="${H - 18}"/>
      <text class="axis-label" x="${labelW + t * barW}" y="${H - 4}" text-anchor="middle">${Math.round(t * 100)}%</text>`).join('')}
    ${items.map((it, i) => {
      const y = i * rowH + 8; const w = Math.max(0, Math.min(1, it.value || 0)) * barW;
      return `<g><title>${esc(it.title || it.label)}: ${esc(it.value == null ? '—' : fmt(it.value))}</title>
        <text x="${labelW - 10}" y="${y + 18}" text-anchor="end">${esc(it.label)}</text>
        <rect class="bar-track" x="${labelW}" y="${y + 4}" width="${barW}" height="20" rx="6"/>
        <rect x="${labelW}" y="${y + 4}" width="${w.toFixed(1)}" height="20" rx="6" style="fill:${it.color}"/>
        <text class="val" x="${labelW + w + 8}" y="${y + 18}">${esc(it.value == null ? '—' : fmt(it.value))}</text></g>`;
    }).join('')}
  </svg>`;
}

function heatmap(rows) {
  const codes = content.misconceptions.map((m) => m.code);
  const lessons = content.lessons.map((l) => l.id);
  const heat = {};
  rows.forEach((r) => (r.misconception_codes || []).forEach((c) => { heat[r.lesson] ||= {}; heat[r.lesson][c] = (heat[r.lesson][c] || 0) + 1; }));
  let max = 0;
  lessons.forEach((l) => codes.forEach((c) => { max = Math.max(max, heat[l]?.[c] || 0); }));
  const cell = (n, l, c) => {
    const t = max ? n / max : 0;
    const bg = n ? `color-mix(in srgb, #4338CA ${Math.round(12 + t * 80)}%, var(--surface-2))` : 'var(--surface-2)';
    return `<td style="background:${bg};color:${t > 0.45 ? '#FFFFFF' : 'var(--text)'}" title="${esc(l)} · ${esc(c)}: ${n} lượt">${n || ''}</td>`;
  };
  return `<div class="heatmap-wrap"><table class="heatmap">
    <caption class="sr-only">Số lượt mắc lỗi theo bài (hàng) và mã lỗi (cột)</caption>
    <thead><tr><th scope="col"><span class="sr-only">Bài</span></th>${codes.map((c) => `<th scope="col" title="${esc(content.index.mis.get(c)?.title || '')}">${esc(c)}</th>`).join('')}</tr></thead>
    <tbody>${lessons.map((l) => `<tr><th scope="row">${esc(l)}</th>${codes.map((c) => cell(heat[l]?.[c] || 0, l, c)).join('')}</tr>`).join('')}</tbody>
  </table></div>
  <div class="heat-legend"><span>0</span><i></i><span class="num">${max} lượt</span></div>`;
}

function scoresCard(scores) {
  if (!scores?.length) return '';
  const get = (m) => scores.find((s) => s.mode === m);
  const pre = get('pretest'); const post = get('posttest');
  const delta = pre && post ? post.avg_score - pre.avg_score : null;
  return `<section class="card" style="margin-top:14px" aria-labelledby="c5"><h2 id="c5">Điểm trung bình theo hình thức</h2>
    ${hbars(scores.map((s) => ({ label: `${MODE_LABEL[s.mode] || s.mode} (${s.students} HS)`, value: s.avg_score, color: s.mode === 'posttest' ? 'var(--teal)' : s.mode === 'pretest' ? 'var(--text-faint)' : 'var(--primary)' })), { title: 'Điểm trung bình theo hình thức', labelW: 170, full: true })}
    ${delta != null ? `<p class="small" style="margin:6px 0 0">Chênh lệch sau – trước: <b class="num" style="color:${delta >= 0 ? 'var(--success)' : 'var(--error)'}">${delta >= 0 ? '+' : ''}${(delta * 100).toFixed(1)} điểm %</b> (điểm = tỉ lệ câu đúng của mỗi học sinh, lấy trung bình).</p>` : ''}
  </section>`;
}

function renderDashboard(stats, rows, allRows) {
  const lessons = content.lessons;
  const byLesson = Object.fromEntries((stats.by_lesson || []).map((x) => [x.lesson, x]));
  const hintTotal = (stats.hint_levels || []).reduce((s, h) => s + h.count, 0);
  const qMis = new Map();
  rows.forEach((a) => (a.misconception_codes || []).forEach((c) => { const m = qMis.get(a.question_id) || {}; m[c] = (m[c] || 0) + 1; qMis.set(a.question_id, m); }));
  const topMisOf = (qid) => Object.entries(qMis.get(qid) || {}).sort((a, b) => b[1] - a[1])[0]?.[0];
  const hardest = (stats.by_question || []).filter((q) => q.attempts >= 3).slice(0, 8);
  const active = stats.students_active || 1;
  const cls = stats.class || {};

  app.innerHTML = `${contentErrorNotice(content)}
    <p class="eyebrow">Dashboard giáo viên</p>
    <div class="row" style="align-items:end">
      <h1 style="margin:0">${esc(cls.name || cls.code)}</h1>
      <span class="badge">${cls.group === 'control' ? 'Nhóm đối chứng' : 'Nhóm thực nghiệm'}</span>
      ${isDemo() ? '<span class="badge badge-demo">Có dữ liệu minh họa</span>' : ''}
      <span class="spacer"></span>
      <button class="btn btn-sm" id="csvAttempts">${icon('download')} CSV lượt làm</button>
      <button class="btn btn-sm" id="csvMis">${icon('download')} CSV lỗi sai</button>
      <button class="btn btn-sm btn-ghost" id="tLogout">${icon('logout')} Thoát</button>
    </div>
    ${isDemo() ? `<p class="small muted" style="margin:8px 0 0">Chế độ demo: dữ liệu minh họa sinh tự động + ${stats.demo_real_attempts ?? 0} lượt làm thật trên trình duyệt này.</p>` : ''}
    <div class="seg" role="group" aria-label="Lọc theo hình thức" style="margin-top:14px">
      ${MODES.map(([m, label]) => `<button type="button" data-mode="${m ?? ''}" aria-pressed="${m === mode}">${label}</button>`).join('')}
    </div>

    <div class="kpis" style="margin-top:16px">
      <div class="kpi"><div class="kpi__label">Học sinh</div><div class="kpi__val">${stats.students_active}<small class="muted">/${stats.students_total}</small></div><div class="kpi__sub">có làm bài / sĩ số mã</div></div>
      <div class="kpi"><div class="kpi__label">Lượt làm</div><div class="kpi__val">${(stats.total_attempts || 0).toLocaleString('vi-VN')}</div><div class="kpi__sub">${mode ? esc(MODE_LABEL[mode]) : 'mọi hình thức'}</div></div>
      <div class="kpi"><div class="kpi__label">Độ chính xác</div><div class="kpi__val">${pct(stats.accuracy)}</div><div class="kpi__sub">lượt đúng hoàn toàn</div></div>
      <div class="kpi"><div class="kpi__label">Dùng gợi ý</div><div class="kpi__val">${stats.total_attempts ? pct(hintTotal / stats.total_attempts) : '—'}</div><div class="kpi__sub">${(stats.hint_levels || []).map((h) => `Mức ${h.level}: ${h.count}`).join(' · ') || 'chưa có'}</div></div>
    </div>

    ${!stats.total_attempts ? `<div class="card empty" style="margin-top:16px">${icon('chart')}<p>Chưa có lượt làm bài nào cho bộ lọc này.</p></div>` : `
    <div class="grid grid-2" style="margin-top:16px">
      <section class="card" aria-labelledby="c1"><h2 id="c1">Độ chính xác theo bài</h2>
        ${hbars(lessons.map((l) => ({ label: chartW() < 420 ? l.id : `${l.id} · ${l.title.length > 14 ? l.title.slice(0, 13) + '…' : l.title}`, title: `${l.id} – ${l.title}`, value: byLesson[l.id]?.accuracy ?? null, color: `var(--g-${l.id}, var(--primary))` })), { title: "Độ chính xác theo bài", labelW: chartW() < 420 ? 44 : 150 })}
        <p class="small muted" style="margin:6px 0 0">Tỉ lệ lượt làm đúng hoàn toàn của từng bài.</p>
      </section>
      <section class="card" aria-labelledby="c2"><h2 id="c2">Lỗi sai phổ biến</h2>
        ${(stats.by_misconception || []).length ? hbars([...stats.by_misconception].sort((a, b) => b.students - a.students || b.count - a.count).slice(0, 10).map((x) => ({ label: x.code, title: content.index.mis.get(x.code)?.title || x.code, value: x.students / active, color: `hsl(${misHue(x.code)} 62% 48%)` })), { title: 'Tỉ lệ học sinh mắc từng lỗi', labelW: 60 }) : '<p class="muted">Chưa ghi nhận lỗi sai.</p>'}
        <p class="small muted" style="margin:6px 0 0">Tỉ lệ học sinh (đang hoạt động) mắc lỗi ít nhất một lần.</p>
      </section>
    </div>

    ${scoresCard(stats.scores)}

    <section class="card" style="margin-top:14px" aria-labelledby="c3"><h2 id="c3">Bản đồ lỗi sai theo bài</h2>
      <p class="small muted">Mỗi ô là số lượt mắc lỗi; ô càng đậm, lỗi càng tập trung. Rê chuột lên mã lỗi để xem tên.</p>
      ${rows.length ? heatmap(rows) : '<p class="muted">Không tải được dữ liệu chi tiết.</p>'}
      <div class="term-row" style="margin-top:12px">${(stats.by_misconception || []).slice(0, 5).map((x) => mbadge(x.code, content.index.mis.get(x.code)?.title || '')).join(' ')}</div>
    </section>

    <section class="card" style="margin-top:14px" aria-labelledby="c4"><h2 id="c4">Câu hỏi khó nhất</h2>
      <div class="table-wrap"><table class="table">
        <thead><tr><th scope="col">Câu</th><th scope="col">Nội dung</th><th scope="col" class="num">Đúng</th><th scope="col" class="num">Lượt</th><th scope="col">Lỗi chính</th></tr></thead>
        <tbody>${hardest.map((h) => {
          const q = content.index.question.get(h.question_id);
          const tm = topMisOf(h.question_id);
          const stem = q?.stem || '';
          return `<tr><td class="num">${esc(h.question_id)}<br>${unreviewedBadge(q)}</td>
            <td class="stem-cell">${esc(stem.slice(0, 140))}${stem.length > 140 ? '…' : ''}</td>
            <td class="num" style="font-weight:800;color:${h.accuracy < 0.5 ? 'var(--error)' : 'var(--text)'}">${pct(h.accuracy)}</td>
            <td class="num">${h.attempts}</td><td>${tm ? mbadge(tm) : '—'}</td></tr>`;
        }).join('')}</tbody></table></div>
    </section>`}
  `;

  $$('[data-mode]').forEach((b) => b.addEventListener('click', async () => {
    mode = b.dataset.mode || null;
    const r = await openDashboard(auth.cls, auth.pin);
    if (!r.ok) toast(r.message);
    $(`[data-mode="${mode ?? ''}"]`)?.focus();
  }));
  $('#tLogout').addEventListener('click', () => { try { sessionStorage.removeItem(SS_KEY); } catch { /* ignore */ } auth = null; mode = null; renderLogin(); });
  $('#csvAttempts').addEventListener('click', () => exportAttempts(cls.code, allRows));
  $('#csvMis').addEventListener('click', () => exportMis(cls.code, stats, rows));
}

/* ---------- CSV ---------- */
function csvCell(v) { const s = v == null ? '' : String(v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }
function download(name, rows) {
  const csv = '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n'); // BOM để Excel hiển thị đúng tiếng Việt
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = name; document.body.append(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast(`Đã xuất ${name}`);
}
function exportAttempts(code, rows) {
  if (!rows.length) { toast('Không có dữ liệu để xuất.'); return; }
  const out = [['anon_id', 'question_id', 'lesson', 'is_correct', 'misconception_codes', 'hint_level_used', 'duration_ms', 'mode', 'created_at']];
  rows.forEach((a) => out.push([a.anon_id, a.question_id, a.lesson, a.is_correct ? 1 : 0, (a.misconception_codes || []).join(' '), a.hint_level_used, a.duration_ms, a.mode, a.created_at]));
  download(`nvt_${code}_luot_lam.csv`, out);
}
function exportMis(code, stats, rows) {
  const heat = {};
  rows.forEach((r) => (r.misconception_codes || []).forEach((c) => { heat[c] ||= {}; heat[c][r.lesson] = (heat[c][r.lesson] || 0) + 1; }));
  const out = [['code', 'title', 'count', 'students', 'students_pct', ...content.lessons.map((l) => `count_${l.id}`)]];
  (stats.by_misconception || []).forEach((x) => out.push([x.code, content.index.mis.get(x.code)?.title || '', x.count, x.students,
    ((x.students / (stats.students_active || 1)) * 100).toFixed(1), ...content.lessons.map((l) => heat[x.code]?.[l.id] || 0)]));
  download(`nvt_${code}_loi_sai${mode ? '_' + mode : ''}.csv`, out);
}

// Khởi động (đặt cuối tệp để mọi hằng số/hàm đã được khởi tạo)
if (auth) { const r = await openDashboard(auth.cls, auth.pin); if (!r.ok) renderLogin(); } else renderLogin();
