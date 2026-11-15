import { mountShell, $, $$, esc, icon, rich, registerTerms, openTermPopover, termSymbol, speakButtons, contentErrorNotice, qs, speechSupported } from '../ui.js';
import { loadContent } from '../store.js';

mountShell('terms');
const app = $('#app');
const content = await loadContent();
registerTerms(content.terms);

const state = {
  q: '',
  lesson: (qs('lesson') || 'all').toUpperCase() === 'ALL' ? 'all' : (qs('lesson') || 'all').toUpperCase(),
  mode: qs('mode') === 'flash' ? 'flash' : 'grid',
  i: 0,
  flipped: false,
  order: null,
};
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

function filtered() {
  const q = norm(state.q);
  let list = content.terms.filter((t) => (state.lesson === 'all' || t.lesson === state.lesson)
    && (!q || norm(`${t.en} ${t.vi} ${t.definition_vi} ${t.id}`).includes(q)));
  if (state.order) list = state.order.map((id) => list.find((t) => t.id === id)).filter(Boolean).concat(list.filter((t) => !state.order.includes(t.id)));
  return list;
}

app.innerHTML = `
  ${contentErrorNotice(content)}
  <p class="eyebrow">Từ điển Việt – Anh</p>
  <h1>Thuật ngữ Hóa học</h1>
  <p class="muted">${content.terms.length} thuật ngữ của Chương 1. Bấm vào ô để xem nghĩa, ví dụ và nghe phát âm${speechSupported() ? '' : ' (trình duyệt này chưa hỗ trợ đọc)'}.</p>
  <div class="toolbar">
    <div class="search">${icon('search')}<label class="sr-only" for="q">Tìm thuật ngữ</label>
      <input class="input" id="q" type="search" placeholder="Tìm: isotope, đồng vị, orbital…" autocomplete="off"></div>
    <div class="seg" role="group" aria-label="Chế độ xem">
      <button type="button" data-mode="grid">Lưới</button>
      <button type="button" data-mode="flash">Thẻ ghi nhớ</button>
    </div>
  </div>
  <div class="filter-chips" role="group" aria-label="Lọc theo bài" style="margin-bottom:16px">
    <button type="button" class="fchip" data-lesson-f="all">Tất cả</button>
    ${content.lessons.map((l) => `<button type="button" class="fchip" data-lesson="${esc(l.id)}" data-lesson-f="${esc(l.id)}" title="${esc(l.title)}">${esc(l.id)}</button>`).join('')}
  </div>
  <p class="sr-only" id="count" aria-live="polite"></p>
  <div id="view"></div>`;

function gridView(list) {
  if (!list.length) return `<div class="empty">${icon('search')}<p>Không tìm thấy thuật ngữ phù hợp.</p></div>`;
  return `<div class="tile-grid tile-grid--terms">${list.map((t) => {
    const n = content.terms.indexOf(t) + 1;
    return `<button type="button" class="etile etile--term" data-lesson="${esc(t.lesson)}" data-term-tile="${esc(t.id)}" aria-haspopup="dialog" aria-expanded="false" aria-label="${esc(t.en)}: ${esc(t.vi)}">
      <span class="etile__top"><span>${n}</span><span>${esc(t.lesson || '')}</span></span>
      <span class="etile__sym" aria-hidden="true">${esc(termSymbol(t))}</span>
      <span class="etile__name" lang="en">${esc(t.en)}</span>
      <span class="etile__sub">${esc(t.vi)}</span>
    </button>`;
  }).join('')}</div>`;
}

function flashView(list) {
  if (!list.length) return `<div class="empty">${icon('search')}<p>Không có thẻ nào.</p></div>`;
  state.i = Math.min(state.i, list.length - 1);
  const t = list[state.i];
  return `<div class="flash-wrap" data-lesson="${esc(t.lesson)}">
    <div class="flashcard ${state.flipped ? 'is-flipped' : ''}" id="card" role="button" tabindex="0" aria-pressed="${state.flipped}" aria-label="Thẻ ${state.i + 1}/${list.length}. ${state.flipped ? `Mặt sau: ${esc(t.vi)}` : `Mặt trước: ${esc(t.en)}`}. Bấm hoặc nhấn Space để lật.">
      <div class="flashcard__inner">
        <div class="flashcard__face" ${state.flipped ? 'aria-hidden="true"' : ''}>
          <span class="flashcard__corner">${state.i + 1} / ${list.length} · ${esc(t.lesson || '')}</span>
          <div class="flashcard__sym" aria-hidden="true">${esc(termSymbol(t))}</div>
          <div class="flashcard__en" lang="en">${esc(t.en)}</div>
          <div class="muted">${esc(t.ipa || '')}${t.pos ? ` · <i>${esc(t.pos)}</i>` : ''}</div>
          ${speakButtons(t.en)}
          <p class="small muted" style="margin-top:14px">Em có nhớ nghĩa không? Chạm để lật.</p>
        </div>
        <div class="flashcard__face flashcard__back" ${state.flipped ? '' : 'aria-hidden="true"'}>
          <span class="flashcard__corner">${state.i + 1} / ${list.length}</span>
          <div class="flashcard__vi">${esc(t.vi)}</div>
          ${t.definition_vi ? `<p class="small" style="margin:12px 0 0">${rich(t.definition_vi)}</p>` : ''}
          ${t.example_en ? `<p class="small muted" style="margin:12px 0 0"><span lang="en">“${esc(t.example_en)}”</span></p>` : ''}
        </div>
      </div>
    </div>
    <div class="flash-controls">
      <button type="button" class="icon-btn" id="prev" aria-label="Thẻ trước" ${state.i === 0 ? 'disabled' : ''}>${icon('left')}</button>
      <button type="button" class="btn" id="flip">${icon('flip')} Lật thẻ</button>
      <button type="button" class="icon-btn" id="next" aria-label="Thẻ sau" ${state.i >= list.length - 1 ? 'disabled' : ''}>${icon('right')}</button>
      <button type="button" class="icon-btn" id="shuffle" aria-label="Xáo trộn thẻ" title="Xáo trộn">${icon('shuffle')}</button>
    </div>
    <p class="small muted" style="text-align:center">Phím tắt: <span class="kbd">Space</span> lật · <span class="kbd">←</span> <span class="kbd">→</span> chuyển thẻ</p>
  </div>`;
}

function render(keepFocus) {
  const list = filtered();
  $$('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
  $$('[data-lesson-f]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lessonF === state.lesson)));
  $('#count').textContent = `${list.length} thuật ngữ`;
  $('#view').innerHTML = state.mode === 'grid' ? gridView(list) : flashView(list);
  if (state.mode === 'flash' && list.length) bindFlash(list, keepFocus);
}

function go(delta, list) {
  const n = state.i + delta;
  if (n < 0 || n >= list.length) return;
  state.i = n; state.flipped = false; render('card');
}
function bindFlash(list, keepFocus) {
  const card = $('#card');
  const flip = () => { state.flipped = !state.flipped; card.classList.toggle('is-flipped', state.flipped); card.setAttribute('aria-pressed', String(state.flipped)); };
  card.addEventListener('click', (e) => { if (!e.target.closest('[data-speak]')) flip(); });
  card.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
  $('#flip').addEventListener('click', flip);
  $('#prev').addEventListener('click', () => go(-1, list));
  $('#next').addEventListener('click', () => go(1, list));
  $('#shuffle').addEventListener('click', () => {
    const ids = list.map((t) => t.id);
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    state.order = ids; state.i = 0; state.flipped = false; render('card');
  });
  if (keepFocus) $('#' + keepFocus)?.focus();
}

document.addEventListener('keydown', (e) => {
  if (state.mode !== 'flash' || e.target.matches('input, textarea')) return;
  if (e.key === 'ArrowRight') go(1, filtered());
  if (e.key === 'ArrowLeft') go(-1, filtered());
});

$('#q').addEventListener('input', (e) => { state.q = e.target.value; state.i = 0; render(); });
$$('[data-mode]').forEach((b) => b.addEventListener('click', () => { state.mode = b.dataset.mode; state.flipped = false; render(); }));
$$('[data-lesson-f]').forEach((b) => b.addEventListener('click', () => { state.lesson = b.dataset.lessonF; state.i = 0; render(); }));
$('#view').addEventListener('click', (e) => {
  const tile = e.target.closest('[data-term-tile]');
  if (tile) { e.stopPropagation(); openTermPopover(tile, tile.dataset.termTile); }
});
render();
