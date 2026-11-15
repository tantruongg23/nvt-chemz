import { mountShell, $, esc, icon, ring, lessonTile, loginFormHTML, bindLoginForm, contentErrorNotice, pct } from '../ui.js';
import { loadContent, getSession, getMyStats } from '../store.js';
import { mountAtom } from '../atom.js';

mountShell('home');

const app = $('#app');
const content = await loadContent();
const user = getSession();
const statsRes = user ? await getMyStats() : null;
const stats = statsRes?.ok ? statsRes.data : null;
const byLesson = Object.fromEntries((stats?.by_lesson || []).map((x) => [x.lesson, x]));
const qCount = (id) => content.questions.filter((q) => q.lesson === id).length;

const nQ = content.questions.length;
const nT = content.terms.length;
const nM = content.misconceptions.length;

function chapterBlocks() {
  return content.chapters.map((ch) => {
    const ls = content.lessons.filter((l) => l.chapter === ch.id);
    const n = ls.reduce((s, l) => s + qCount(l.id), 0);
    const draft = content.questions.some((q) => q.chapter === ch.id && q.reviewed === false);
    const tag = !ls.length ? '<span class="badge">Đang biên soạn</span>' : draft ? '<span class="badge badge--warn">Bản nháp – chưa duyệt</span>' : '';
    return `<div class="section-head"><h2>Chương ${ch.number} · ${esc(ch.title)}</h2>${tag}<span class="spacer"></span>${n ? `<span class="small muted">${n} câu</span>` : ''}</div>
    ${ls.length ? `<div class="tile-grid">${ls.map((l, i) => lessonTile(l, i, byLesson[l.id], qCount(l.id))).join('')}</div>` : `<p class="small muted">Chương ${ch.number} (${(ch.lessons || []).join(', ')}) đang được biên soạn.</p>`}`;
  }).join('');
}

function welcomeCard() {
  const total = stats?.total_attempts || 0;
  // gợi ý bài tiếp theo: bài chưa làm, hoặc bài có độ chính xác thấp nhất
  const next = content.lessons
    .map((l) => ({ l, p: byLesson[l.id]?.attempts ? byLesson[l.id].correct / byLesson[l.id].attempts : -1 }))
    .sort((a, b) => a.p - b.p)[0]?.l;
  const top = stats?.by_misconception?.[0];
  return `<section class="card login-card" aria-labelledby="welcomeTitle">
    <p class="eyebrow">Chào mừng trở lại</p>
    <div class="row" style="align-items:center;gap:18px">
      ${ring(stats?.accuracy ?? null, { size: 92, stroke: 9, aria: `Độ chính xác ${pct(stats?.accuracy)}` })}
      <div style="flex:1;min-width:180px">
        <h2 id="welcomeTitle" style="margin:0">Mã ${esc(user.anon_id)}</h2>
        <p class="muted small" style="margin:4px 0 0">${esc(user.class_name || user.class_code)} · <b class="num">${total}</b> lượt làm · Độ chính xác <b class="num">${pct(stats?.accuracy)}</b>${top ? ` · Lỗi hay gặp nhất: <b>${esc(top.code)}</b>` : ''}</p>
      </div>
    </div>
    <div class="row" style="margin-top:16px">
      ${next ? `<a class="btn btn-primary btn-lg" href="practice.html?lesson=${encodeURIComponent(next.id)}">${icon('flask')} Luyện ${esc(next.id)} – ${esc(next.title)}</a>` : ''}
      <a class="btn" href="results.html">${icon('chart')} Xem kết quả</a>
    </div>
  </section>`;
}

app.innerHTML = `
  ${contentErrorNotice(content)}
  <section class="hero">
    <div>
      <p class="eyebrow">Hóa học 10 · Kết nối tri thức</p>
      <h1>Hiểu <span class="grad">Hóa học 10</span> – không chỉ học thuộc.</h1>
      <p class="hero__lead">Ôn tập và tự học trước bằng câu hỏi chẩn đoán: mỗi đáp án sai cho biết em đang hiểu nhầm điều gì, kèm gợi ý từng bước và thuật ngữ tiếng Anh.</p>
      <div class="hero__pills" aria-label="Nội dung hiện có">
        <span class="hero__pill"><b class="num">${nQ}</b> câu chẩn đoán</span>
        <span class="hero__pill"><b class="num">${nM}</b> lỗi sai được gắn mã</span>
        <span class="hero__pill"><b class="num">${nT}</b> thuật ngữ Việt – Anh</span>
      </div>
      <div id="entry">${user ? welcomeCard() : loginFormHTML()}</div>
    </div>
    <div class="atom-stage" id="atom" aria-label="Mô hình nguyên tử tương tác"></div>
  </section>

  ${chapterBlocks()}

  <div class="section-head"><h2>Ôn theo cách của em</h2></div>
  <div class="quick-links">
    <a class="qlink" href="terms.html"><span class="qlink__icon" style="background:var(--teal)">${icon('terms')}</span><span><b>Thuật ngữ & thẻ ghi nhớ</b><span>Nghe phát âm, lật thẻ để nhớ</span></span></a>
    <a class="qlink" href="practice.html"><span class="qlink__icon" style="background:var(--primary)">${icon('flask')}</span><span><b>Luyện tập tổng hợp</b><span>Trắc nghiệm · Đúng/Sai · Trả lời ngắn</span></span></a>
    <a class="qlink" href="results.html"><span class="qlink__icon" style="background:var(--accent-ink)">${icon('target')}</span><span><b>Lỗi sai của em</b><span>Biết mình hay nhầm ở đâu để ôn lại</span></span></a>
  </div>

  <div class="section-head"><h2>Cách NVT Smart Chemistry giúp em</h2></div>
  <div class="grid grid-2" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
    <div class="card"><p class="eyebrow">Bước 1</p><h3>Làm câu chẩn đoán</h3><p class="muted small">Mỗi phương án nhiễu gắn với một lỗi sai thường gặp (M1–M${nM || 10}).</p></div>
    <div class="card"><p class="eyebrow">Bước 2</p><h3>Gợi ý 3 mức</h3><p class="muted small">Gợi mở → Gợi ý trọng tâm → Lời giải. Em tự nghĩ trước, AI chỉ dẫn đường.</p></div>
    <div class="card"><p class="eyebrow">Bước 3</p><h3>Biết mình cần ôn gì</h3><p class="muted small">Thống kê lỗi sai cá nhân; thầy cô xem tổng hợp theo lớp.</p></div>
  </div>
`;

mountAtom($('#atom'));
bindLoginForm(() => location.reload());
