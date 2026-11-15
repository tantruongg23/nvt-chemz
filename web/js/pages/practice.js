import {
  mountShell, $, $$, esc, icon, rich, registerTerms, termChips, mbadge, misHue, unreviewedBadge, LEVEL_LABEL, TYPE_LABEL,
  loginFormHTML, bindLoginForm, contentErrorNotice, qs, ring, pct, reducedMotion, toast,
} from '../ui.js';
import { loadContent, getSession, saveAttempt, requestHint } from '../store.js';
import { grade, questionMisconceptions } from '../content.js';
import { isDemo } from '../ui.js';

mountShell('practice');
const app = $('#app');
const content = await loadContent();
registerTerms(content.terms);

const lessonId = (qs('lesson') || '').toUpperCase() || null;
const misCode = (qs('m') || '').toUpperCase() || null;
const lesson = lessonId ? content.index.lesson.get(lessonId) : null;
const mis = misCode ? content.index.mis.get(misCode) : null;
// mode: practice (mặc định) | pretest | posttest — kiểm tra trước/sau: không gợi ý, không phản hồi từng câu
const MODE = ['pretest', 'posttest'].includes(qs('mode')) ? qs('mode') : 'practice';
const TEST = MODE !== 'practice';
const sessionUser = getSession();
let hintsAllowed = !TEST && sessionUser?.group !== 'control';

function filterBar() {
  const link = (l) => {
    const p = new URLSearchParams();
    if (l) p.set('lesson', l);
    if (misCode) p.set('m', misCode);
    const s = p.toString();
    return `practice.html${s ? '?' + s : ''}`;
  };
  return `<div class="filter-chips" role="navigation" aria-label="Chọn bài để luyện">
    <a class="fchip" href="${link(null)}" aria-pressed="${!lessonId}" style="text-decoration:none">Tổng hợp</a>
    ${content.lessons.map((l) => `<a class="fchip" data-lesson="${esc(l.id)}" href="${link(l.id)}" aria-pressed="${l.id === lessonId}" style="text-decoration:none" title="${esc(l.title)}">${esc(l.id)}</a>`).join('')}
    ${misCode ? `<a class="fchip" aria-pressed="true" href="${lessonId ? `practice.html?lesson=${lessonId}` : 'practice.html'}" style="text-decoration:none;--h:${misHue(misCode)}" aria-label="Bỏ lọc lỗi ${esc(misCode)}">Lỗi ${esc(misCode)} ✕</a>` : ''}
  </div>`;
}

function header() {
  if (TEST) {
    return `<p class="eyebrow">${MODE === 'pretest' ? 'Kiểm tra trước thực nghiệm' : 'Kiểm tra sau thực nghiệm'}</p>
      <h1 style="margin-bottom:10px">${MODE === 'pretest' ? 'Bài kiểm tra trước' : 'Bài kiểm tra sau'}${lesson ? ` · ${esc(lesson.id)}` : ''}</h1>
      <div class="notice">${icon('info')}<span>Bài kiểm tra không có gợi ý và không hiện đáp án từng câu. Em làm hết rồi xem tổng kết.</span></div>`;
  }
  const title = lesson ? `${lesson.id} · ${lesson.title}` : 'Luyện tập tổng hợp';
  return `<p class="eyebrow">Luyện tập chẩn đoán</p>
    <h1 style="margin-bottom:10px">${esc(title)}</h1>
    ${mis ? `<p class="row small" style="gap:8px;margin-bottom:10px">Đang luyện các câu liên quan: ${mbadge(mis.code, mis.title)}</p>` : ''}
    ${filterBar()}`;
}

if (!sessionUser) {
  app.innerHTML = `${header()}<div style="max-width:560px;margin-top:20px">${loginFormHTML('Đăng nhập để lưu kết quả luyện tập')}</div>`;
  bindLoginForm(() => location.reload());
} else {
  start();
}

function start() {
  let questions = content.questions.filter((q) => (!lessonId || q.lesson === lessonId) && (!misCode || questionMisconceptions(q).includes(misCode)));
  if (!lessonId) { // tổng hợp: xáo trộn
    questions = [...questions];
    for (let i = questions.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [questions[i], questions[j]] = [questions[j], questions[i]]; }
  }
  const session = { i: 0, done: 0, correct: 0, score: 0, streak: 0, best: 0, mis: new Map(), hintsUsed: 0 };

  if (!questions.length) {
    app.innerHTML = `${contentErrorNotice(content)}${header()}<div class="empty card" style="margin-top:20px">${icon('flask')}<p>Chưa có câu hỏi phù hợp với bộ lọc này.</p><a class="btn" href="practice.html">Luyện tổng hợp</a></div>`;
    return;
  }

  app.innerHTML = `${contentErrorNotice(content)}${header()}
    <div class="practice-top" style="margin-top:16px" ${lessonId ? `data-lesson="${esc(lessonId)}"` : ''}>
      <span class="num small" id="pos"></span>
      <div class="progress-track" role="progressbar" aria-label="Tiến độ phiên luyện tập" aria-valuemin="0" id="ptrack"><i id="pbar"></i></div>
      <span class="streak" id="streak" title="Chuỗi câu đúng liên tiếp" aria-live="polite"></span>
    </div>
    <div id="stage"></div>`;

  renderQuestion();

  function renderQuestion() {
    const q = questions[session.i];
    const st = { q, t0: performance.now(), hintLevel: 0, answered: false, result: null, hints: [] };
    $('#pos').textContent = `Câu ${session.i + 1}/${questions.length}`;
    $('#pbar').style.width = `${(session.i / questions.length) * 100}%`;
    $('#ptrack').setAttribute('aria-valuemax', String(questions.length));
    $('#ptrack').setAttribute('aria-valuenow', String(session.i));
    $('#streak').innerHTML = session.streak >= 2 ? `${icon('sparkle')} ${session.streak} câu đúng liên tiếp` : '';

    $('#stage').innerHTML = `
      <article class="card q-card" id="qcard" data-lesson="${esc(q.lesson)}" aria-labelledby="qstem">
        <div class="q-meta">
          <span class="badge" data-lesson="${esc(q.lesson)}">${esc(q.lesson)}</span>
          <span class="badge">${esc(TYPE_LABEL[q.type] || q.type)}</span>
          ${q.level ? `<span class="badge badge-level">${esc(LEVEL_LABEL[q.level] || q.level)}</span>` : ''}
          ${unreviewedBadge(q)}
          <span class="badge num" title="Mã câu hỏi">${esc(q.id)}</span>
        </div>
        <div class="q-stem" id="qstem">${rich(q.stem)}</div>
        <form id="qform" novalidate>
          ${answerArea(q)}
          <div class="q-actions" id="qactions">
            <button class="btn btn-primary btn-lg" type="submit" id="checkBtn">${icon('check')} Kiểm tra</button>
            <span class="small muted hide-mobile">${q.type === 'mcq' ? 'Phím <span class="kbd">A</span>–<span class="kbd">D</span> để chọn, ' : ''}<span class="kbd">Enter</span> để kiểm tra</span>
          </div>
        </form>
        <div id="feedback"></div>
        ${hintsAllowed ? ladderHTML() : ''}
        <div id="explain"></div>
        ${(q.terms || []).length ? `<div class="term-row" style="margin-top:14px" aria-label="Thuật ngữ liên quan">${termChips(q.terms)}</div>` : ''}
      </article>`;

    const form = $('#qform');
    form.addEventListener('submit', (e) => { e.preventDefault(); if (!st.answered) check(st); });
    $$('.ladder__btn').forEach((b) => b.addEventListener('click', () => askHint(st, Number(b.dataset.level))));
    form.addEventListener('change', () => { $('#checkBtn').disabled = getAnswer(q, true) == null; });
    $('#checkBtn').disabled = true;
    st.keyHandler = (e) => keyNav(e, st);
    document.addEventListener('keydown', st.keyHandler);
    if (session.i > 0) $('#qstem').setAttribute('tabindex', '-1'), $('#qstem').focus({ preventScroll: false });
  }

  function answerArea(q) {
    if (q.type === 'mcq') {
      return `<fieldset class="options" id="answers"><legend class="sr-only">Chọn một đáp án</legend>
        ${(q.options || []).map((o) => `<label class="option" data-key="${esc(o.key)}">
          <input type="radio" name="ans" value="${esc(o.key)}">
          <span class="option__key" aria-hidden="true">${esc(o.key)}</span>
          <span class="option__text"><span class="sr-only">${esc(o.key)}. </span>${rich(o.text)}<span class="opt-extra"></span></span>
        </label>`).join('')}</fieldset>`;
    }
    if (q.type === 'true_false') {
      return `<div class="tf-list" id="answers" role="group" aria-label="Chọn Đúng hoặc Sai cho từng ý">
        ${(q.statements || []).map((s) => `<div class="tf-item" data-key="${esc(s.key)}" role="radiogroup" aria-labelledby="tf-${esc(s.key)}">
          <span class="option__key" aria-hidden="true">${esc(s.key)}</span>
          <span id="tf-${esc(s.key)}"><span class="sr-only">Ý ${esc(s.key)}: </span>${rich(s.text)}</span>
          <span class="tf-choices">
            <label><input type="radio" name="tf-${esc(s.key)}" value="true"><span>Đúng</span></label>
            <label><input type="radio" name="tf-${esc(s.key)}" value="false"><span>Sai</span></label>
          </span>
          <span class="tf-verdict" hidden></span>
        </div>`).join('')}</div>`;
    }
    return `<div class="short-answer" id="answers">
      <label class="sr-only" for="shortInput">Nhập đáp số</label>
      <input class="input" id="shortInput" name="short" inputmode="decimal" autocomplete="off" placeholder="Nhập đáp số">
      ${q.unit ? `<span class="unit">${esc(q.unit)}</span>` : ''}
    </div>
    <p class="small muted" style="margin:6px 0 0">Dùng dấu phẩy hoặc dấu chấm cho số thập phân (ví dụ 35,5).</p>`;
  }

  /** partialOk=true: trả null nếu chưa đủ để chấm (dùng cho nút Kiểm tra) */
  function getAnswer(q, strict = false) {
    const form = $('#qform');
    if (q.type === 'mcq') return form.querySelector('input[name="ans"]:checked')?.value ?? null;
    if (q.type === 'true_false') {
      const ans = {};
      (q.statements || []).forEach((s) => {
        const v = form.querySelector(`input[name="tf-${CSS.escape(s.key)}"]:checked`)?.value;
        if (v != null) ans[s.key] = v === 'true';
      });
      if (strict && Object.keys(ans).length < (q.statements || []).length) return null;
      return Object.keys(ans).length ? ans : null;
    }
    const v = form.short?.value.trim();
    return v ? v : null;
  }

  function ladderHTML() {
    return `<section class="ladder" aria-labelledby="ladderTitle">
      <div class="ladder__head">${icon('bulb')}<h3 id="ladderTitle">Cần gợi ý?</h3>
        <span class="badge badge-ai">${icon('sparkle')} Trợ lý AI</span>
        ${isDemo() ? '<span class="badge badge-demo">Chế độ demo</span>' : ''}</div>
      <ol class="ladder__steps">
        <li class="ladder__step"><button type="button" class="ladder__btn" data-level="1"><small>Mức 1</small><b>Gợi mở</b></button></li>
        <li class="ladder__step"><button type="button" class="ladder__btn" data-level="2" disabled><small>Mức 2</small><b>Gợi ý</b></button></li>
        <li class="ladder__step"><button type="button" class="ladder__btn" data-level="3" disabled><small>Mức 3</small><b>Lời giải</b></button></li>
      </ol>
      <div class="ladder__out" id="hintOut" aria-live="polite"></div>
      <p class="ai-notice">${icon('warn')}<span><b>AI có thể sai.</b> Gợi ý chỉ để em tự suy nghĩ tiếp; hãy đối chiếu với SGK và lời giải đã được giáo viên duyệt. Dùng gợi ý không bị trừ điểm nhưng được ghi lại để thống kê.</span></p>
    </section>`;
  }

  async function askHint(st, level) {
    const btn = $(`.ladder__btn[data-level="${level}"]`);
    if (!btn || btn.disabled || btn.classList.contains('is-used')) return;
    if (level === 3 && !st.answered && !confirm('Mở lời giải trước khi trả lời? Lượt làm vẫn được tính nhưng ghi nhận đã xem lời giải.')) return;
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    try {
      const r = await requestHint(st.q.id, level, getAnswer(st.q));
      if (!r.ok) {
        if (r.error === 'HINTS_DISABLED') { hintsAllowed = false; const l = $('.ladder'); if (l) l.hidden = true; }
        else if (r.error === 'RATE_LIMITED') { $$('.ladder__btn').forEach((b) => { b.disabled = true; }); showRevealButton(st.q); }
        else { btn.disabled = false; if (['AI_BUSY', 'AI_UNAVAILABLE', 'CONTENT_UNAVAILABLE', 'NETWORK'].includes(r.error)) showRevealButton(st.q); }
        if (r.error === 'INVALID_INPUT') console.error('[hint]', r);
        toast(r.message || 'Không lấy được gợi ý.');
        return;
      }
      const res = r.data;
      if (!st.answered) st.hintLevel = Math.max(st.hintLevel, level);
      session.hintsUsed += 1;
      btn.classList.add('is-used');
      btn.disabled = false;
      btn.setAttribute('aria-pressed', 'true');
      const names = { 1: 'Gợi mở', 2: 'Gợi ý trọng tâm', 3: 'Lời giải từng bước' };
      $('#hintOut').insertAdjacentHTML('beforeend', `<div class="hint-bubble">
        <div class="hint-bubble__lvl">Mức ${level} · ${names[level]} ${isDemo() ? '<span class="badge badge-demo">Chế độ demo · soạn sẵn</span>' : ''}</div>
        <div>${rich(res.hint)}</div>
        ${level < 3 && Number.isFinite(res.remaining_today) ? `<div class="small muted" style="margin-top:4px">Còn ${res.remaining_today} lượt gợi ý hôm nay</div>` : ''}
      </div>`);
      const nextBtn = $(`.ladder__btn[data-level="${level + 1}"]`);
      if (nextBtn) nextBtn.disabled = false;
      if (level === 3) $('#explain').innerHTML = '';
    } catch (e) {
      btn.disabled = false;
      toast(e.message || 'Không lấy được gợi ý.');
    } finally { btn.removeAttribute('aria-busy'); }
  }

  async function check(st) {
    const q = st.q;
    const answer = getAnswer(q, true);
    if (answer == null) { toast(q.type === 'true_false' ? 'Hãy chọn Đúng/Sai cho cả 4 ý.' : 'Hãy chọn hoặc nhập đáp án.'); return; }
    const g = grade(q, answer);
    st.answered = true; st.result = g;
    const duration = Math.round(performance.now() - st.t0);
    $('#checkBtn').disabled = true;
    const saved = await saveAttempt({ question_id: q.id, lesson: q.lesson, answer, is_correct: g.is_correct, misconception_codes: g.misconception_codes, hint_level_used: TEST ? 0 : st.hintLevel, duration_ms: duration, mode: MODE });
    if (!saved.ok) toast('Chưa lưu được kết quả: ' + saved.message);
    else if (saved.data.queued) toast('Mất mạng – kết quả được lưu tạm và sẽ tự gửi lại.');
    session.done++; session.score += g.score;
    if (g.is_correct) session.correct++;
    if (TEST) { next(st); return; }

    // khóa input
    $$('#qform input').forEach((i) => { i.disabled = true; });
    $('#answers').classList.add('is-locked');
    markAnswers(q, answer, g);

    // phiên
    if (g.is_correct) { session.streak++; session.best = Math.max(session.best, session.streak); } else session.streak = 0;
    g.misconception_codes.forEach((c) => session.mis.set(c, (session.mis.get(c) || 0) + 1));

    // phản hồi
    const part = !g.is_correct && g.score > 0;
    const kind = g.is_correct ? 'ok' : part ? 'part' : 'bad';
    const title = g.is_correct ? pickPraise() : part ? `Đúng một phần (${g.detail.right}/${g.detail.total} ý)` : 'Chưa đúng';
    const iconPath = g.is_correct ? 'M10 17.5 14.5 22 23 12' : 'M11 11l10 10M21 11 11 21';
    const correctText = q.type === 'mcq' ? `Đáp án đúng: <b>${esc(q.answer)}</b>` : q.type === 'short' ? `Đáp số đúng: <b class="num">${esc(String(q.answer).replace('.', ','))}${q.unit ? ' ' + esc(q.unit) : ''}</b>` : '';
    const misBlocks = g.misconception_codes.map((c) => {
      const m = content.index.mis.get(c);
      return `<div class="remedy">${mbadge(c, m?.title || '')}<p>${rich(m?.remedy || m?.description || '')}</p>
        <a class="small" href="lesson.html?id=${encodeURIComponent(q.lesson)}">Ôn lại ${esc(q.lesson)}</a> · <a class="small" href="practice.html?m=${encodeURIComponent(c)}">Luyện thêm về lỗi ${esc(c)}</a></div>`;
    }).join('');
    $('#feedback').innerHTML = `<div class="feedback feedback--${kind}" role="status">
      <p class="feedback__title"><svg class="feedback__icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16"/><path d="${iconPath}" transform="translate(-0.5 -0.5)"/></svg>${esc(title)}</p>
      ${!g.is_correct && correctText ? `<div>${correctText}</div>` : ''}
      ${misBlocks ? `<div><div class="small" style="font-weight:700;margin-bottom:6px">Có thể em đang mắc lỗi:</div><div class="stack" style="--gap:8px">${misBlocks}</div></div>` : ''}
      ${!g.is_correct && !misBlocks && hintsAllowed ? '<div class="small">Hãy thử dùng gợi ý bên dưới để tìm ra chỗ sai trước khi xem lời giải.</div>' : ''}
    </div>`;

    const card = $('#qcard');
    if (g.is_correct) {
      card.classList.remove('pulse-ok'); void card.offsetWidth; card.classList.add('pulse-ok');
      if (!reducedMotion()) { const p = document.createElement('span'); p.className = 'plus-one'; p.textContent = session.streak >= 2 ? `+1 · chuỗi ${session.streak}` : '+1'; card.append(p); setTimeout(() => p.remove(), 1100); }
    } else {
      const a = $('#answers'); a.classList.remove('shake'); void a.offsetWidth; a.classList.add('shake');
    }
    $('#streak').innerHTML = session.streak >= 2 ? `${icon('sparkle')} ${session.streak} câu đúng liên tiếp` : '';
    $('#pbar').style.width = `${((session.i + 1) / questions.length) * 100}%`;

    // lời giải: đúng → hiện luôn; sai → để học sinh dùng thang gợi ý, có nút xem lời giải
    const solutionShown = Boolean($('.ladder__btn[data-level="3"]')?.classList.contains('is-used'));
    if ((g.is_correct || !hintsAllowed) && !solutionShown) showExplanation(q);
    else if (!solutionShown) showRevealButton(q);

    // nút câu tiếp
    const last = session.i >= questions.length - 1;
    $('#qactions').innerHTML = `<button type="button" class="btn btn-primary btn-lg" id="nextBtn">${last ? 'Xem tổng kết' : 'Câu tiếp theo'} ${icon('right')}</button>
      <a class="btn btn-ghost" href="#" id="endBtn">Kết thúc phiên</a>`;
    $('#nextBtn').addEventListener('click', () => next(st));
    $('#endBtn').addEventListener('click', (e) => { e.preventDefault(); finish(st); });
    $('#nextBtn').focus({ preventScroll: true });
  }

  function showRevealButton(q) {
    if ($('#revealBtn') || $('#exTitle')) return;
    $('#explain').innerHTML = `<div class="row" style="margin-top:14px"><button type="button" class="btn" id="revealBtn">${icon('book')} Xem lời giải chi tiết</button></div>`;
    $('#revealBtn').addEventListener('click', () => showExplanation(q));
  }

  function showExplanation(q) {
    $('#explain').innerHTML = `<section class="explain" aria-labelledby="exTitle">
      <h3 id="exTitle">${icon('book')} Lời giải ${unreviewedBadge(q)}</h3>
      <div>${rich(q.explanation || 'Chưa có lời giải.')}</div></section>`;
  }

  function markAnswers(q, answer, g) {
    if (q.type === 'mcq') {
      $$('.option').forEach((el) => {
        const key = el.dataset.key;
        if (key === String(q.answer)) el.classList.add('is-correct');
        else if (key === String(answer)) {
          el.classList.add('is-wrong');
          const opt = (q.options || []).find((o) => o.key === key);
          if (opt?.misconception) el.querySelector('.opt-extra').innerHTML = `<br>${mbadge(opt.misconception)}`;
        }
      });
    } else if (q.type === 'true_false') {
      (q.statements || []).forEach((s) => {
        const el = $(`.tf-item[data-key="${CSS.escape(s.key)}"]`);
        const ok = g.detail.per[s.key];
        el.classList.add(ok ? 'is-correct' : 'is-wrong');
        const v = el.querySelector('.tf-verdict');
        v.hidden = false;
        v.innerHTML = `${ok ? '✓ Chính xác' : '✗ Chưa đúng'} – ý này <b>${s.answer ? 'Đúng' : 'Sai'}</b> ${!ok && s.misconception ? mbadge(s.misconception) : ''}`;
      });
    } else {
      $('#answers').classList.add(g.is_correct ? 'is-correct' : 'is-wrong');
    }
  }

  function keyNav(e, st) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const inText = e.target.matches('input[type="text"], input:not([type]), input[inputmode], textarea');
    if (e.key === 'Enter' && !inText && !e.target.closest('button, a')) {
      e.preventDefault();
      if (!st.answered) $('#qform').requestSubmit(); else next(st);
      return;
    }
    if (st.answered || inText || st.q.type !== 'mcq') return;
    const k = e.key.toUpperCase();
    const map = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' };
    const key = map[k] || k;
    const input = $(`#qform input[name="ans"][value="${CSS.escape(key)}"]`);
    if (input && /^[A-F1-6]$/.test(k)) { input.checked = true; input.focus(); input.dispatchEvent(new Event('change', { bubbles: true })); }
  }

  function next(st) {
    document.removeEventListener('keydown', st.keyHandler);
    if (session.i >= questions.length - 1) { finish(st); return; }
    session.i++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function finish(st) {
    if (st) document.removeEventListener('keydown', st.keyHandler);
    const avg = session.done ? session.score / session.done : null;
    const misList = [...session.mis.entries()].sort((a, b) => b[1] - a[1]);
    $('#pbar').style.width = '100%';
    $('#pos').textContent = 'Hoàn thành';
    $('#streak').textContent = '';
    $('#stage').innerHTML = `<section class="card summary-hero" aria-labelledby="sumT">
      ${ring(avg, { cls: 'ring--lg', size: 132, stroke: 9, aria: `Điểm trung bình ${pct(avg)}` })}
      <h2 id="sumT">${avg == null ? 'Em chưa làm câu nào' : avg >= 0.8 ? 'Xuất sắc! Em nắm bài rất chắc.' : avg >= 0.5 ? 'Khá tốt – còn vài chỗ cần ôn.' : 'Cùng ôn lại nhé, em sẽ tiến bộ!'}</h2>
      <p class="muted num">Đúng hoàn toàn ${session.correct}/${session.done} câu · Chuỗi đúng dài nhất ${session.best} ${hintsAllowed ? ` · Đã dùng ${session.hintsUsed} gợi ý` : ''}</p>
      ${misList.length ? `<div style="text-align:left;width:100%;max-width:560px"><h3>Lỗi sai gặp trong phiên</h3>
        <div class="stack">${misList.map(([c, n]) => { const m = content.index.mis.get(c); return `<div class="remedy" style="background:var(--surface-2)">${mbadge(c, m?.title || '')} <span class="num small muted">× ${n}</span><p>${rich(m?.remedy || '')}</p></div>`; }).join('')}</div></div>` : ''}
      <div class="row" style="justify-content:center;margin-top:8px">
        <button type="button" class="btn btn-primary" id="againBtn">${icon('refresh')} Làm lại</button>
        <a class="btn" href="results.html">${icon('chart')} Xem thống kê</a>
        ${lesson ? `<a class="btn" href="lesson.html?id=${lesson.id}">${icon('book')} Ôn ${esc(lesson.id)}</a>` : ''}
      </div>
    </section>`;
    $('#againBtn').addEventListener('click', () => location.reload());
    $('#sumT').setAttribute('tabindex', '-1'); $('#sumT').focus();
  }
}

const PRAISE = ['Chính xác!', 'Tuyệt vời!', 'Rất tốt!', 'Đúng rồi!', 'Chuẩn luôn!'];
function pickPraise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }
