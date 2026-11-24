// ui.js — khung dùng chung: header/nav/footer, theme, icon, chip thuật ngữ + popover phát âm,
// huy hiệu lỗi sai, vòng tiến độ, markdown mini, form đăng nhập, toast.
import { DEMO } from './config.js';
import { getSession, logout, login, getMode } from './store.js';
import { codeNum } from './content.js';

export const isDemo = () => getMode() === 'demo';

/* ---------------- tiện ích ---------------- */
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export const qs = (name) => new URLSearchParams(location.search).get(name);
export const pct = (x, digits = 0) => (x == null || Number.isNaN(x) ? '—' : `${(x * 100).toFixed(digits)}%`);
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- icon (stroke 24px) ---------------- */
const P = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7',
  flask: 'M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7 15h10',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  users: 'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.2a3.5 3.5 0 0 1 0 6.6',
  terms: 'M4 5h7v14H4zM13 5h7v6h-7zM13 13h7v6h-7z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',
  speaker: 'M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  check: 'M5 12.5 10 17l9-10',
  x: 'M6 6l12 12M18 6 6 18',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6zM9 12l2 2 4-4',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
  warn: 'M12 3 2 20h20zM12 10v4M12 17h.01',
  right: 'M5 12h14M13 6l6 6-6 6',
  left: 'M19 12H5M11 6l-6 6 6 6',
  refresh: 'M20 11a8 8 0 0 0-14.7-4.4L4 8M4 4v4h4M4 13a8 8 0 0 0 14.7 4.4L20 16M20 20v-4h-4',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
  lock: 'M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11',
  flip: 'M4 7h13l-3-3M20 17H7l3 3',
  shuffle: 'M16 4h4v4M4 20 20 4M20 16v4h-4M15 15l5 5M4 4l5 5',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  logout: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11',
};
export function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${P[name] || ''}"/></svg>`;
}

export const LOGO = `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs><linearGradient id="nvtLogoG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4338CA"/><stop offset="1" stop-color="#0F766E"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="16" fill="url(#nvtLogoG)"/><path d="M20 21H44L20 43H44" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="48" cy="14" r="4.2" fill="#FB923C" stroke="#fff" stroke-width="1.6"/><circle cx="16" cy="49" r="2.4" fill="#fff" fill-opacity=".7"/></svg>`;

/* ---------------- theme ---------------- */
const THEME_KEY = 'nvt.theme';
function effectiveTheme() {
  const t = document.documentElement.dataset.theme;
  if (t === 'light' || t === 'dark') return t;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function toggleTheme() {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
  syncThemeBtn();
}
function syncThemeBtn() {
  const btn = $('#themeBtn');
  if (!btn) return;
  const dark = effectiveTheme() === 'dark';
  btn.innerHTML = icon(dark ? 'sun' : 'moon');
  btn.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  btn.title = btn.getAttribute('aria-label');
}

/* ---------------- shell ---------------- */
const NAV = [
  { href: 'index.html', key: 'home', label: 'Trang chủ', icon: 'home' },
  { href: 'lesson.html', key: 'lesson', label: 'Bài học', icon: 'book' },
  { href: 'terms.html', key: 'terms', label: 'Thuật ngữ', icon: 'terms' },
  { href: 'practice.html', key: 'practice', label: 'Luyện tập', icon: 'flask' },
  { href: 'results.html', key: 'results', label: 'Kết quả', icon: 'chart' },
  { href: 'teacher.html', key: 'teacher', label: 'Giáo viên', icon: 'users' },
];

/**
 * mountShell(pageKey) — chèn skip-link, header, tab bar (di động) và footer.
 * Trang cần có <main id="main">.
 */
export function mountShell(pageKey) {
  const user = getSession();
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="container">
      <a class="brand" href="index.html" aria-label="NVT ChemZ – Trang chủ">${LOGO}
        <span class="brand__name">NVT ChemZ<span>Hóa 10 · học vui, hiểu sâu</span></span></a>
      <nav class="nav-desktop" aria-label="Điều hướng chính">
        ${NAV.map((n) => `<a href="${n.href}" ${n.key === pageKey ? 'aria-current="page"' : ''}>${n.label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        ${isDemo() ? `<span class="demo-ribbon" title="Dữ liệu chỉ lưu trên trình duyệt này">${icon('info')}<span>Demo</span><span class="long">&nbsp;· lưu trên máy</span></span>` : ''}
        ${user ? `<span class="user-pill" aria-label="Đang đăng nhập với mã ${esc(user.anon_id)}">${esc(user.anon_id)}</span>` : ''}
        <button type="button" class="icon-btn" id="themeBtn"></button>
        ${user ? `<button type="button" class="icon-btn icon-btn--logout" id="logoutBtn" aria-label="Đăng xuất (Thoát)" title="Thoát">${icon('logout')}</button>` : ''}
      </div>
    </div>`;
  const skip = document.createElement('a');
  skip.className = 'skip-link'; skip.href = '#main'; skip.textContent = 'Bỏ qua, tới nội dung chính';
  document.body.prepend(header);
  document.body.prepend(skip);

  const tabs = document.createElement('nav');
  tabs.className = 'tabbar'; tabs.setAttribute('aria-label', 'Điều hướng nhanh');
  tabs.innerHTML = NAV.filter((n) => n.key !== 'teacher').map((n) =>
    `<a href="${n.href}" ${n.key === pageKey ? 'aria-current="page"' : ''}>${icon(n.icon)}<span>${n.label}</span></a>`).join('');
  document.body.append(tabs);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `<div class="container">
      <span>© 2026 NVT ChemZ · Dự án KHKT</span>
      <span>Hóa học 10 (KNTT) · Không thu thập họ tên học sinh · <a href="teacher.html">Dành cho giáo viên</a></span>
    </div>`;
  document.body.append(footer);

  syncThemeBtn();
  $('#themeBtn').addEventListener('click', toggleTheme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', syncThemeBtn);
  $('#logoutBtn')?.addEventListener('click', () => {
    logout();
    try { sessionStorage.removeItem('nvt.teacher'); sessionStorage.removeItem('nvt.admin'); } catch { /* ignore */ }
    location.replace('index.html');
  });
}

/* ---------------- toast ---------------- */
export function toast(msg, ms = 2600) {
  $('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.append(t);
  setTimeout(() => t.remove(), ms);
}

/* ---------------- markdown mini (an toàn: escape trước) ---------------- */
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\^([^\s^]{1,8})\^/g, '<sup>$1</sup>')
    .replace(/~([^\s~]{1,8})~/g, '<sub>$1</sub>');
}
export function md(src) {
  if (!src) return '';
  const lines = String(src).replace(/\r/g, '').split('\n');
  let html = ''; let list = null; let para = []; let table = null;
  const cells = (l) => l.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
  const flushTable = () => {
    if (!table) return;
    const [head, ...body] = table;
    html += `<div class="table-wrap"><table class="table md-table"><thead><tr>${head.map((c) => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    table = null;
  };
  const flushPara = () => { if (para.length) { html += `<p>${inline(para.join(' '))}</p>`; para = []; } };
  const flushList = () => { if (list) { html += `<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`; list = null; } };
  for (const raw of lines) {
    const line = raw.trim();
    let m;
    if (line.startsWith('|')) {
      flushPara(); flushList();
      if (/^\|?[\s:|-]+\|?$/.test(line) && line.includes('-')) continue; // dòng phân cách
      (table ||= []).push(cells(line));
      continue;
    }
    flushTable();
    if (!line) { flushPara(); flushList(); continue; }
    if ((m = line.match(/^[-*•]\s+(.*)$/))) { flushPara(); if (!list || list.tag !== 'ul') { flushList(); list = { tag: 'ul', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = line.match(/^\d+[.)]\s+(.*)$/))) { flushPara(); if (!list || list.tag !== 'ol') { flushList(); list = { tag: 'ol', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = line.match(/^#{1,4}\s+(.*)$/))) { flushPara(); flushList(); html += `<h4>${inline(m[1])}</h4>`; continue; }
    flushList(); para.push(line);
  }
  flushPara(); flushList(); flushTable();
  return html;
}
/** Văn bản 1 dòng (stem, đáp án): giữ xuống dòng, hỗ trợ **đậm**, ^sup^, ~sub~ */
export function rich(s) { return inline(s).replace(/\n/g, '<br>'); }

/* ---------------- huy hiệu ---------------- */
export function misHue(code) {
  const map = { 1: 245, 2: 200, 3: 172, 4: 140, 5: 88, 6: 42, 7: 22, 8: 0, 9: 325, 10: 280 };
  const n = codeNum(code);
  return map[n] ?? (n * 47) % 360;
}
export function mbadge(code, title, opts = {}) {
  const t = title ? `<span>${esc(title)}</span>` : '';
  return `<span class="mbadge ${opts.lg ? 'mbadge--lg' : ''}" style="--h:${misHue(code)}" ${title ? '' : `title="Lỗi sai ${esc(code)}"`}><span class="mbadge__code">${esc(code)}</span>${t}</span>`;
}
export const unreviewedBadge = (q) => (q && q.reviewed === false
  ? `<span class="badge badge-unreviewed" title="Nội dung đang chờ giáo viên kiểm duyệt">${icon('warn')}Chưa duyệt</span>` : '');
export const LEVEL_LABEL = { NB: 'Nhận biết', TH: 'Thông hiểu', VD: 'Vận dụng' };
export const TYPE_LABEL = { mcq: 'Trắc nghiệm', true_false: 'Đúng / Sai', short: 'Trả lời ngắn' };

/* ---------------- vòng tiến độ ---------------- */
export function ring(value, { size = 56, stroke = 6, label, cls = '', aria } = {}) {
  const v = value == null || Number.isNaN(value) ? 0 : Math.max(0, Math.min(1, value));
  const r = 50 - stroke; const c = 2 * Math.PI * r;
  const text = label ?? (value == null ? '—' : `${Math.round(v * 100)}%`);
  return `<div class="ring ${cls}" style="--size:${size}px" role="img" aria-label="${esc(aria || `Tiến độ ${text}`)}">
    <svg viewBox="0 0 100 100"><circle class="ring__track" cx="50" cy="50" r="${r}" fill="none" stroke-width="${stroke}"/>
    <circle class="ring__val" cx="50" cy="50" r="${r}" fill="none" stroke-width="${stroke}" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c * (1 - v)).toFixed(2)}"/></svg>
    <span class="ring__label">${esc(text)}</span></div>`;
}

/* ---------------- ký hiệu kiểu "nguyên tố" cho thuật ngữ ---------------- */
// Nhãn lớn trên ô thuật ngữ. KHÔNG ghép chữ cái kiểu "Ne", "Ca", "Mn" vì trùng kí hiệu
// nguyên tố thật (neon, calcium, manganese) → dễ gây hiểu nhầm. Dùng mã thuật ngữ "T01".
export function termSymbol(t) {
  const n = String(t.id || '').replace(/\D/g, '');
  return n ? 'T' + String(Number(n)).padStart(2, '0') : 'T';
}

/* ---------------- phát âm (Web Speech API) ---------------- */
const ACCENT_KEY = 'nvt.accent';
export const speechSupported = () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
export function getAccent() { try { return localStorage.getItem(ACCENT_KEY) || 'en-US'; } catch { return 'en-US'; } }
export function speak(text, lang) {
  if (!speechSupported()) { toast('Trình duyệt này chưa hỗ trợ đọc phát âm.'); return; }
  lang = lang || getAccent();
  try { localStorage.setItem(ACCENT_KEY, lang); } catch { /* ignore */ }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = 0.9;
  const voice = synth.getVoices().find((v) => v.lang === lang) || synth.getVoices().find((v) => v.lang?.startsWith(lang.slice(0, 2)));
  if (voice) u.voice = voice;
  synth.speak(u);
}
export function speakButtons(text) {
  return `<div class="speak-row">
    <button type="button" class="btn btn-sm" data-speak="${esc(text)}" data-lang="en-US" aria-label="Nghe phát âm Anh–Mỹ: ${esc(text)}">${icon('speaker')} US</button>
    <button type="button" class="btn btn-sm" data-speak="${esc(text)}" data-lang="en-GB" aria-label="Nghe phát âm Anh–Anh: ${esc(text)}">${icon('speaker')} UK</button>
  </div>`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-speak]');
  if (b) { e.stopPropagation(); speak(b.dataset.speak, b.dataset.lang); }
});

/* ---------------- chip thuật ngữ + popover ---------------- */
let termIndex = new Map();
export function registerTerms(terms) { termIndex = new Map((terms || []).map((t) => [t.id, t])); }
export function termChip(id) {
  const t = termIndex.get(id);
  if (!t) return '';
  return `<button type="button" class="term-chip" data-term="${esc(t.id)}" aria-haspopup="dialog" aria-expanded="false" aria-label="Thuật ngữ ${esc(t.en)} – ${esc(t.vi)}">${esc(t.en)}</button>`;
}
export const termChips = (ids) => (ids || []).map(termChip).join('');

export function termCardHTML(t) {
  return `<div class="popover__head" data-lesson="${esc(t.lesson || '')}">
      <div class="popover__sym" aria-hidden="true">${esc(termSymbol(t))}</div>
      <div><p class="popover__en">${esc(t.en)}</p>
      <div class="popover__ipa">${esc(t.ipa || '')} ${t.pos ? `· <i>${esc(t.pos)}</i>` : ''}</div>
      <div class="popover__vi">${esc(t.vi)}</div></div>
    </div>
    ${t.definition_vi ? `<p class="popover__def">${rich(t.definition_vi)}</p>` : ''}
    ${t.example_en ? `<p class="popover__ex"><span lang="en">“${esc(t.example_en)}”</span>${t.example_vi ? `<br>${esc(t.example_vi)}` : ''}</p>` : ''}
    ${speakButtons(t.en)}`;
}

let openPop = null;
function closePopover(focusBack = true) {
  if (!openPop) return;
  const { el, trigger } = openPop;
  el.remove();
  trigger?.setAttribute('aria-expanded', 'false');
  if (focusBack) trigger?.focus();
  openPop = null;
}
export function openTermPopover(trigger, termId) {
  const t = termIndex.get(termId);
  if (!t) return;
  closePopover(false);
  const el = document.createElement('div');
  el.className = 'popover';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', `Thuật ngữ: ${t.en}`);
  el.innerHTML = `<button type="button" class="icon-btn popover__close" aria-label="Đóng">${icon('x')}</button>${termCardHTML(t)}`;
  document.body.append(el);
  const r = trigger.getBoundingClientRect();
  const w = el.offsetWidth; const h = el.offsetHeight;
  let left = Math.min(Math.max(16, r.left + window.scrollX), window.scrollX + document.documentElement.clientWidth - w - 16);
  let top = r.bottom + window.scrollY + 8;
  if (r.bottom + h + 16 > window.innerHeight && r.top - h - 8 > 0) top = r.top + window.scrollY - h - 8;
  el.style.left = `${left}px`; el.style.top = `${top}px`;
  trigger.setAttribute('aria-expanded', 'true');
  openPop = { el, trigger };
  el.querySelector('.popover__close').addEventListener('click', () => closePopover());
  el.querySelector('.popover__close').focus();
}
document.addEventListener('click', (e) => {
  const chip = e.target.closest('.term-chip');
  if (chip) { e.preventDefault(); if (openPop?.trigger === chip) closePopover(); else openTermPopover(chip, chip.dataset.term); return; }
  if (openPop && !e.target.closest('.popover')) closePopover(false);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openPop) closePopover(); });

/* ---------------- tile bài học ---------------- */
/** prog: { attempts, correct } (từ getMyStats().by_lesson), nQ: số câu của bài */
export function lessonTile(lesson, idx, prog, nQ) {
  const p = prog && prog.attempts ? prog.correct / prog.attempts : 0;
  return `<a class="etile etile--lesson" data-lesson="${esc(lesson.id)}" href="lesson.html?id=${encodeURIComponent(lesson.id)}">
    <div class="etile__top"><span>${lesson.number || idx + 1}</span><span>${nQ ? `${nQ} câu` : ''}</span></div>
    <div class="etile__sym">${esc(lesson.id)}</div>
    <div class="etile__name">${esc(lesson.title)}</div>
    <div class="etile__sub" lang="en">${esc(lesson.title_en || '')}</div>
    <div class="etile__foot"><div class="mini-bar" role="progressbar" aria-label="Độ chính xác ${esc(lesson.id)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p * 100)}"><i style="width:${(p * 100).toFixed(1)}%"></i></div>
    <span class="num small">${prog && prog.attempts ? `${Math.round(p * 100)}%` : 'Chưa làm'}</span></div>
  </a>`;
}

/* ---------------- form đăng nhập ẩn danh ---------------- */
export function loginFormHTML(title = 'Vào ôn tập') {
  const cls = DEMO.CLASSES.map((c) => c.code);
  return `<form class="card login-card" id="loginForm" novalidate>
    <p class="eyebrow">Đăng nhập ẩn danh</p>
    <h2>${esc(title)}</h2>
    <div class="login-grid">
      <div class="field"><label for="clsInput">Mã lớp</label>
        <input class="input" id="clsInput" name="cls" autocomplete="off" autocapitalize="characters" placeholder="${isDemo() ? 'DEMO-TN' : '10A1'}" list="clsList" required>
        <datalist id="clsList">${(isDemo() ? cls : []).map((c) => `<option value="${c}">`).join('')}</datalist></div>
      <div class="field"><label for="anonInput">Mã học sinh</label>
        <input class="input" id="anonInput" name="anon" autocapitalize="characters" autocomplete="off" placeholder="${isDemo() ? 'TN-01' : '10A1-07'}" required aria-describedby="anonHint"></div>
      <p class="form-error" id="loginErr" role="alert" style="grid-column:1/-1"></p>
      <button class="btn btn-primary btn-lg" type="submit">Bắt đầu ${icon('right')}</button>
    </div>
    <p class="small muted" id="anonHint" style="margin:8px 0 0">${isDemo() ? 'Chế độ demo: thử lớp <b>DEMO-TN</b>, mã <b>TN-01</b> (hoặc 10A1 / 10A2 với số thứ tự, ví dụ 07). Lớp DEMO-DC là lớp đối chứng (không có gợi ý AI).' : 'Nhập đúng mã lớp và mã học sinh thầy cô phát (ví dụ 10A1 và 10A1-07).'}</p>
    <div class="privacy-note">${icon('shield')}<span>Không thu thập họ tên, email hay số điện thoại. Kết quả chỉ gắn với mã ẩn danh thầy cô phát cho em.</span></div>
  </form>`;
}
export function bindLoginForm(onSuccess) {
  const form = $('#loginForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#loginErr');
    err.textContent = '';
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    const res = await login(form.cls.value, form.anon.value);
    btn.disabled = false;
    if (res.ok) {
      toast(`Xin chào ${res.data.anon_id}!`);
      onSuccess ? onSuccess(res.data) : location.reload();
    } else {
      err.textContent = res.message;
      form.anon.setAttribute('aria-invalid', 'true');
    }
  });
}

export function contentErrorNotice(content) {
  if (!content.errors?.length) return '';
  return `<div class="notice notice--warn" role="status">${icon('warn')}<div><b>Chưa tải được một phần dữ liệu nội dung.</b><br><span class="small">${content.errors.map(esc).join('<br>')}</span><br><span class="small">Nếu đang mở file trực tiếp, hãy chạy máy chủ tĩnh (ví dụ <code>npx serve web</code>).</span></div></div>`;
}
