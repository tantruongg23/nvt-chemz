import { mountShell, $, esc, icon, md, rich, registerTerms, termChips, mbadge, misHue, lessonTile, contentErrorNotice, qs } from '../ui.js';
import { loadContent, getMyStats, getSession } from '../store.js';

mountShell('lesson');
const app = $('#app');
const content = await loadContent();
registerTerms(content.terms);
const statsRes = getSession() ? await getMyStats() : null;
const byLesson = Object.fromEntries(((statsRes?.ok && statsRes.data.by_lesson) || []).map((x) => [x.lesson, x]));
const qCount = (lid) => content.questions.filter((q) => q.lesson === lid).length;
const id = (qs('id') || '').toUpperCase();
const lesson = content.index.lesson.get(id);

if (!lesson) {
  document.title = 'Bài học · NVT Smart Chemistry';
  app.innerHTML = `${contentErrorNotice(content)}
    <p class="eyebrow">Chương 1 · Cấu tạo nguyên tử</p><h1>Chọn bài để ôn</h1>
    ${id ? `<div class="notice notice--warn" role="status">${icon('warn')}Không tìm thấy bài “${esc(id)}”.</div>` : ''}
    <div class="tile-grid" style="margin-top:16px">${content.lessons.map((l, i) => lessonTile(l, i, byLesson[l.id], qCount(l.id))).join('')}</div>`;
} else {
  document.title = `${lesson.id} – ${lesson.title} · NVT Smart Chemistry`;
  const idx = content.lessons.indexOf(lesson);
  const prev = content.lessons[idx - 1];
  const next = content.lessons[idx + 1];
  const mis = content.misconceptions.filter((m) => (m.lessons || []).includes(lesson.id));
  const nQ = qCount(lesson.id);
  const allTerms = [...new Set((lesson.sections || []).flatMap((s) => s.terms || []))];

  app.innerHTML = `
    <nav aria-label="Đường dẫn" class="small muted" style="margin-bottom:10px"><a href="lesson.html">Bài học</a> / ${esc(lesson.id)}</nav>
    <header class="lesson-hero" data-lesson="${esc(lesson.id)}">
      <div class="etile" data-lesson="${esc(lesson.id)}" aria-hidden="true">
        <div class="etile__top"><span>${idx + 1}</span><span></span></div>
        <div class="etile__sym">${esc(lesson.id)}</div>
        <div class="etile__sub">Chương 1</div>
      </div>
      <div>
        <p class="eyebrow">Bài ${idx + 1} · Chương 1</p>
        <h1>${esc(lesson.title)}</h1>
        <p class="muted" lang="en" style="margin:0">${esc(lesson.title_en || '')}</p>
      </div>
    </header>

    <div class="stack" data-lesson="${esc(lesson.id)}">
      <section class="card" aria-labelledby="sumTitle">
        <div class="card-title">${icon('sparkle')}<h2 id="sumTitle">Ý chính cần nhớ</h2></div>
        <ul class="summary-list">${(lesson.summary || []).map((s) => `<li>${rich(s)}</li>`).join('')}</ul>
      </section>

      ${(lesson.key_formulas || []).length ? `<section class="card" aria-labelledby="fTitle">
        <div class="card-title">${icon('target')}<h2 id="fTitle">Công thức & quy tắc trọng tâm</h2></div>
        <div class="formula-grid">${lesson.key_formulas.map((f) => `<div class="formula">${rich(f)}</div>`).join('')}</div>
      </section>` : ''}

      ${(lesson.sections || []).map((s, i) => `<section class="card lesson-section" aria-labelledby="sec${i}">
        <h2 id="sec${i}">${esc(s.heading)}</h2>
        <div class="md">${md(s.body_md)}</div>
        ${(s.terms || []).length ? `<div class="term-row" aria-label="Thuật ngữ tiếng Anh trong mục này">${termChips(s.terms)}</div>` : ''}
      </section>`).join('')}

      ${mis.length ? `<section aria-labelledby="misTitle">
        <div class="section-head" style="margin-top:20px"><h2 id="misTitle">Lỗi sai hay gặp ở bài này</h2></div>
        <div class="stack">${mis.map((m) => `<article class="card mis-card" style="--h:${misHue(m.code)}">
          <div class="row">${mbadge(m.code, m.title, { lg: true })}</div>
          <p class="small" style="margin:10px 0 0">${rich(m.remedy || m.description || '')}</p>
          ${m.example_wrong || m.example_right ? `<div class="mis-compare">
            ${m.example_wrong ? `<div class="wrong"><b>${icon('x')} Hiểu sai</b>${rich(m.example_wrong)}</div>` : ''}
            ${m.example_right ? `<div class="right"><b>${icon('check')} Hiểu đúng</b>${rich(m.example_right)}</div>` : ''}
          </div>` : ''}
          <div class="row" style="margin-top:10px"><a class="btn btn-sm" href="practice.html?m=${encodeURIComponent(m.code)}">Luyện câu về lỗi ${esc(m.code)} ${icon('right')}</a></div>
        </article>`).join('')}</div>
      </section>` : ''}

      ${allTerms.length ? `<section class="card" aria-labelledby="tTitle"><h2 id="tTitle">Thuật ngữ của bài</h2>
        <div class="term-row">${termChips(allTerms)}</div>
        <p class="small muted" style="margin:10px 0 0">Bấm vào chip để xem nghĩa và nghe phát âm. <a href="terms.html?lesson=${encodeURIComponent(lesson.id)}">Ôn bằng thẻ ghi nhớ</a></p>
      </section>` : ''}
    </div>

    <nav class="pager" aria-label="Bài trước, bài sau">
      ${prev ? `<a class="btn" href="lesson.html?id=${prev.id}">${icon('left')} ${esc(prev.id)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="lesson.html?id=${next.id}">${esc(next.id)} ${icon('right')}</a>` : '<span></span>'}
    </nav>
    <div class="cta-bar"><a class="btn btn-primary btn-lg" href="practice.html?lesson=${encodeURIComponent(lesson.id)}">${icon('flask')} Luyện tập bài này${nQ ? ` · ${nQ} câu` : ''}</a></div>
  `;
}
