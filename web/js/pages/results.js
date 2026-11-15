import { mountShell, $, esc, icon, rich, ring, pct, mbadge, misHue, loginFormHTML, bindLoginForm, contentErrorNotice, isDemo } from '../ui.js';
import { loadContent, getSession, getMyStats, getHintsRemaining } from '../store.js';

mountShell('results');
const app = $('#app');
const content = await loadContent();
const user = getSession();
const MODE_LABEL = { practice: 'Luyện tập', pretest: 'Kiểm tra trước', posttest: 'Kiểm tra sau' };

if (!user) {
  app.innerHTML = `<p class="eyebrow">Kết quả của em</p><h1>Đăng nhập để xem kết quả</h1>
    <div style="max-width:560px">${loginFormHTML('Đăng nhập')}</div>`;
  bindLoginForm(() => location.reload());
} else {
  const res = await getMyStats();
  if (!res.ok) {
    if (res.error === 'NOT_LOGGED_IN') location.href = 'index.html';
    app.innerHTML = `<div class="notice notice--error" role="alert">${icon('warn')}<span>${esc(res.message)}</span></div>`;
  } else {
    const rem = await getHintsRemaining();
    render(res.data, rem.ok ? rem.data : null);
  }
}

function render(stats, hintsLeft) {
  const byLesson = Object.fromEntries((stats.by_lesson || []).map((x) => [x.lesson, x]));
  const qCount = (id) => content.questions.filter((q) => q.lesson === id).length;
  const lessonsOf = (code) => {
    const ls = (content.index.mis.get(code)?.lessons || []).filter((l) => content.index.lesson.has(l));
    const core = ls.filter((l) => content.index.lesson.get(l)?.kind !== 'review');
    return core.length ? core : ls;
  };
  const total = stats.total_attempts || 0;

  app.innerHTML = `${contentErrorNotice(content)}
    <p class="eyebrow">Kết quả của em</p>
    <div class="row" style="align-items:end"><h1 style="margin:0">Mã ${esc(user.anon_id)}</h1><span class="spacer"></span>
      <a class="btn btn-primary" href="practice.html">${icon('flask')} Luyện tiếp</a></div>
    <p class="muted small" style="margin-top:6px">${esc(user.class_name || user.class_code)}${isDemo() ? ' · Chế độ demo: tính trên các lượt làm lưu ở trình duyệt này' : ''}.</p>

    ${total === 0 ? `<div class="card empty" style="margin-top:16px">${icon('chart')}<p>Em chưa làm câu nào. Bắt đầu luyện tập để xem thống kê nhé!</p><a class="btn btn-primary" href="practice.html">Bắt đầu</a></div>` : `
    <div class="kpis" style="margin-top:16px">
      <div class="kpi"><div class="kpi__label">Lượt làm</div><div class="kpi__val">${total}</div><div class="kpi__sub">trên ${content.questions.length} câu trong ngân hàng</div></div>
      <div class="kpi"><div class="kpi__label">Độ chính xác</div><div class="kpi__val">${pct(stats.accuracy)}</div><div class="kpi__sub">${stats.correct} lượt đúng hoàn toàn</div></div>
      <div class="kpi"><div class="kpi__label">Có dùng gợi ý</div><div class="kpi__val">${stats.hints_used}</div><div class="kpi__sub">lượt làm</div></div>
      <div class="kpi"><div class="kpi__label">Gợi ý hôm nay</div><div class="kpi__val">${stats.hints_today ?? 0}</div><div class="kpi__sub">${hintsLeft != null ? `còn ${hintsLeft} lượt` : ''}</div></div>
    </div>

    <div class="section-head"><h2>Theo bài học</h2></div>
    <div class="lesson-stats">${content.lessons.map((l) => {
      const L = byLesson[l.id];
      const a = L && L.attempts ? L.correct / L.attempts : null;
      return `<div class="lstat" data-lesson="${esc(l.id)}">
        ${ring(a, { size: 64, stroke: 8, aria: `Độ chính xác ${l.id}: ${pct(a)}` })}
        <div class="lstat__body"><b>${esc(l.id)} · ${esc(l.title)}</b>
          <span class="small muted num">${L ? `${L.attempts} lượt · ${L.correct} đúng` : 'Chưa làm'} · ${qCount(l.id)} câu trong bài</span></div>
        <a class="btn btn-sm" href="practice.html?lesson=${encodeURIComponent(l.id)}" aria-label="Luyện ${esc(l.id)}">Luyện</a>
      </div>`;
    }).join('')}</div>

    <div class="section-head"><h2>Lỗi sai em hay mắc</h2><span class="spacer"></span><span class="small muted">Sắp xếp theo số lần</span></div>
    ${(stats.by_misconception || []).length ? `<ol class="mis-list">${stats.by_misconception.map((x) => {
      const m = content.index.mis.get(x.code);
      return `<li class="mis-item" style="--h:${misHue(x.code)}">
        <div class="mis-item__head">${mbadge(x.code, m?.title || '', { lg: true })}<span class="mis-item__count" aria-label="${x.count} lần">× ${x.count}</span></div>
        ${m?.remedy ? `<p class="small" style="margin:0">${rich(m.remedy)}</p>` : ''}
        <div class="mis-item__actions">
          ${lessonsOf(x.code).map((l) => `<a class="btn btn-sm" href="lesson.html?id=${encodeURIComponent(l)}">${icon('book')} Ôn lại ${esc(l)}</a>`).join('')}
          <a class="btn btn-sm btn-primary" href="practice.html?m=${encodeURIComponent(x.code)}">${icon('flask')} Luyện lỗi ${esc(x.code)}</a>
        </div>
      </li>`;
    }).join('')}</ol>` : `<div class="notice">${icon('check')}<span>Chưa phát hiện lỗi sai nào được gắn mã. Tuyệt vời!</span></div>`}

    ${(stats.by_mode || []).length > 1 ? `<div class="section-head"><h2>Theo hình thức</h2></div>
      <div class="kpis">${stats.by_mode.map((m) => `<div class="kpi"><div class="kpi__label">${esc(MODE_LABEL[m.mode] || m.mode)}</div><div class="kpi__val">${pct(m.accuracy)}</div><div class="kpi__sub">${m.attempts} lượt</div></div>`).join('')}</div>` : ''}
    `}`;
}
