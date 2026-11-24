// Bài kiểm tra trước / sau — đề kín. Câu hỏi và đáp án nằm ở máy chủ (xem supabase/migrations/20261124200000_closed_tests.sql):
// trang này chỉ hiển thị câu hỏi nhận được, không có gợi ý, không có đáp án, không có lời giải. Mỗi mã nộp 1 lần.
import { mountShell, $, esc, icon, rich, qs, loginFormHTML, bindLoginForm, toast } from '../ui.js';
import { getSession, getTestStatus, startTest, submitTest } from '../store.js';

mountShell('practice');
const app = $('#app');
const NAME = { pre: 'Bài kiểm tra trước', post: 'Bài kiểm tra sau' };
const user = getSession();
const typeParam = ['pre', 'post'].includes(qs('type')) ? qs('type') : null;
const draftKey = (t) => `nvt.testdraft.${user.anon_id}.${t}`; // chỉ lưu các chữ cái đã chọn, không có đề
const lsGet = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };
const lsDel = (k) => { try { localStorage.removeItem(k); } catch { /* ignore */ } };
const notice = (cls, msg) => `<div class="notice ${cls}" role="${cls.includes('error') ? 'alert' : 'status'}">${icon(cls.includes('error') ? 'warn' : 'info')}<span>${msg}</span></div>`;
let timer = null;

async function showStatus() {
  app.innerHTML = '<p class="eyebrow">Kiểm tra</p><h1>Bài kiểm tra của lớp</h1><div class="skeleton" aria-hidden="true"></div>';
  const r = await getTestStatus();
  if (!r.ok) { app.innerHTML = `<p class="eyebrow">Kiểm tra</p><h1>Bài kiểm tra của lớp</h1>${notice('notice--error', esc(r.message))}`; return; }
  app.innerHTML = `<p class="eyebrow">Kiểm tra</p><h1 style="margin-bottom:6px">Bài kiểm tra của lớp</h1>
    <p class="muted">Mã ${esc(user.anon_id)} · Mỗi bài chỉ nộp được <b>một lần</b>. Khi làm bài không có gợi ý và không hiện đáp án.</p>
    <div class="grid grid-2" style="margin-top:16px">${r.data.map((t) => {
      const state = t.submitted ? `Đã nộp · ${String(t.score).replace('.', ',')}/${t.max_score} điểm`
        : !t.available ? 'Chưa có đề' : t.started ? 'Đang làm dở — có thể làm tiếp' : t.is_open ? 'Đang mở' : 'Giáo viên chưa mở';
      const can = !t.submitted && t.available && (t.is_open || t.started);
      return `<section class="card"><h2 style="margin-top:0">${NAME[t.test_type]}</h2><p class="muted small">${esc(state)}</p>
        ${can ? `<a class="btn btn-primary" href="test.html?type=${t.test_type}">${t.started ? 'Làm tiếp' : 'Bắt đầu làm bài'} ${icon('right')}</a>` : '<button class="btn" disabled>Chưa làm được</button>'}</section>`;
    }).join('')}</div>`;
}

function fail(type, r) {
  app.innerHTML = `<p class="eyebrow">Kiểm tra</p><h1>${NAME[type]}</h1>${notice('notice--error', esc(r.message))}
    <p style="margin-top:14px"><a class="btn" href="test.html">← Về danh sách bài kiểm tra</a></p>`;
}

async function openTest(type) {
  app.innerHTML = `<p class="eyebrow">Kiểm tra</p><h1>${NAME[type]}</h1><div class="skeleton" aria-hidden="true"></div>`;
  const st = await getTestStatus();
  if (!st.ok) return fail(type, st);
  const me = st.data.find((t) => t.test_type === type);
  if (me?.submitted) return done(type, { score: me.score, max_score: me.max_score }, true);
  if (!me?.started) return intro(type, me);
  return begin(type); // đã bắt đầu từ trước (tải lại trang) → làm tiếp
}

function intro(type, me) {
  if (!me?.available) return fail(type, { message: 'Đề kiểm tra chưa được nạp lên máy chủ.' });
  if (!me.is_open) return fail(type, { message: 'Giáo viên chưa mở bài kiểm tra này. Hãy đợi thầy/cô thông báo.' });
  app.innerHTML = `<p class="eyebrow">Kiểm tra</p><h1>${NAME[type]}</h1>
    <div class="card" style="max-width:640px;margin-top:12px">
      <ul class="small" style="margin:0 0 14px;padding-left:18px;line-height:1.7">
        <li>30 câu trắc nghiệm, thời gian <b>25 phút</b> (đồng hồ chạy từ lúc em bấm bắt đầu).</li>
        <li>Không có gợi ý, không hiện đáp án từng câu. Em được xem điểm tổng khi nộp bài.</li>
        <li>Mã của em chỉ nộp được <b>một lần</b>. Em có thể đổi đáp án trước khi nộp.</li>
        <li>Làm bằng sức của mình, không tra cứu và không trao đổi.</li>
      </ul>
      <button class="btn btn-primary btn-lg" id="goBtn">${icon('right')} Bắt đầu làm bài</button>
      <a class="btn btn-ghost" href="test.html">Để sau</a>
    </div>`;
  $('#goBtn').addEventListener('click', async (e) => { e.currentTarget.disabled = true; await begin(type); });
}

async function begin(type) {
  const r = await startTest(type);
  if (!r.ok) { if (r.error === 'TEST_ALREADY_SUBMITTED') return openTest(type); return fail(type, r); }
  return renderTest(type, r.data);
}

function renderTest(type, t) {
  const items = t.items || [];
  const answers = lsGet(draftKey(type)) || {};
  const skew = Date.now() - Date.parse(t.server_now); // theo đồng hồ máy chủ → đếm ngược không phụ thuộc đồng hồ máy em
  const endAt = Date.parse(t.started_at) + t.duration_min * 60000 + skew;
  const parts = [[1, 'Phần I – Kiến thức'], [2, 'Phần II – Thuật ngữ']];

  const card = (i) => `<article class="card q-card" style="margin-top:12px" data-id="${esc(i.id)}">
      <div class="q-meta"><span class="badge num">Câu ${i.no}</span></div>
      <div class="q-stem">${rich(i.stem)}</div>
      <fieldset class="options"><legend class="sr-only">Chọn một đáp án cho câu ${i.no}</legend>
        ${i.options.map((o) => `<label class="option" data-key="${esc(o.key)}">
          <input type="radio" name="${esc(i.id)}" value="${esc(o.key)}" ${answers[i.id] === o.key ? 'checked' : ''}>
          <span class="option__key" aria-hidden="true">${esc(o.key)}</span>
          <span class="option__text"><span class="sr-only">${esc(o.key)}. </span>${rich(o.text)}</span></label>`).join('')}
      </fieldset></article>`;

  app.innerHTML = `<p class="eyebrow">Kiểm tra</p>
    <div class="row" style="align-items:end"><h1 style="margin:0">${NAME[type]}</h1><span class="spacer"></span>
      <span class="badge num" id="clock" role="timer" aria-live="off">--:--</span></div>
    <p class="small muted" id="progress" aria-live="polite" style="margin:6px 0 0"></p>
    <form id="tForm" novalidate>
      ${parts.map(([p, title]) => `<h2 style="margin:22px 0 8px">${title}</h2>${items.filter((i) => i.part === p).map(card).join('')}`).join('')}
      <div class="q-actions" style="margin-top:20px"><button class="btn btn-primary btn-lg" type="submit" id="submitBtn">${icon('check')} Nộp bài</button>
        <span class="small muted">Chỉ nộp được một lần.</span></div>
      <p class="form-error" id="tErr" role="alert"></p>
    </form>`;

  const form = $('#tForm');
  const count = () => Object.keys(answers).length;
  const sync = () => { $('#progress').textContent = `Đã trả lời ${count()}/${items.length} câu`; };
  sync();
  form.addEventListener('change', (e) => {
    if (e.target.type !== 'radio') return;
    answers[e.target.name] = e.target.value; lsSet(draftKey(type), answers); sync();
  });

  let sending = false;
  async function send(auto) {
    if (sending) return;
    const blank = items.length - count();
    if (!auto) {
      const msg = blank > 0 ? `Em còn ${blank} câu chưa trả lời. Vẫn nộp bài? (Chỉ nộp được một lần.)` : 'Nộp bài ngay bây giờ? Em sẽ không làm lại được.';
      if (!confirm(msg)) return;
    }
    sending = true; $('#submitBtn').disabled = true; $('#tErr').textContent = '';
    const r = await submitTest(type, answers);
    sending = false;
    if (!r.ok) {
      if (r.error === 'TEST_ALREADY_SUBMITTED') { clearInterval(timer); lsDel(draftKey(type)); return openTest(type); }
      $('#tErr').textContent = `${r.message} Bài làm vẫn được giữ trên máy, em bấm nộp lại.`;
      $('#submitBtn').disabled = false; form.dataset.auto = ''; return;
    }
    clearInterval(timer); lsDel(draftKey(type));
    done(type, r.data, false);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); send(false); });

  const tick = () => {
    const left = Math.max(0, endAt - Date.now());
    const m = Math.floor(left / 60000); const s = Math.floor((left % 60000) / 1000);
    $('#clock').textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    $('#clock').style.color = left < 5 * 60000 ? 'var(--error)' : '';
    if (left === 0 && !form.dataset.auto) { form.dataset.auto = '1'; toast('Hết giờ, bài đang được nộp.'); send(true); }
  };
  clearInterval(timer); tick(); timer = setInterval(tick, 1000);
}

function done(type, r, again) {
  clearInterval(timer);
  app.innerHTML = `<p class="eyebrow">Kiểm tra</p><h1>${NAME[type]}</h1>
    <div class="card" style="max-width:560px;margin-top:12px;text-align:center">
      ${icon('check')}<h2 style="margin:8px 0 4px">${again ? 'Em đã nộp bài này rồi' : 'Đã nộp bài!'}</h2>
      <p style="font-size:2rem;font-weight:800;margin:6px 0" class="num">${String(r.score).replace('.', ',')}<small class="muted"> / ${r.max_score} điểm</small></p>
      <p class="small muted">Đáp án và lời giải không hiển thị để giữ bài kiểm tra công bằng cho cả lớp. Mã của em không làm lại được bài này.</p>
      <a class="btn btn-primary" href="test.html">Về danh sách bài kiểm tra</a>
    </div>`;
}

if (!user) {
  app.innerHTML = `<p class="eyebrow">Kiểm tra</p><h1>${typeParam ? NAME[typeParam] : 'Bài kiểm tra'}</h1>
    <div style="max-width:560px;margin-top:16px">${loginFormHTML('Đăng nhập để làm bài kiểm tra')}</div>`;
  bindLoginForm(() => location.reload());
} else if (typeParam) {
  await openTest(typeParam);
} else {
  await showStatus();
}
