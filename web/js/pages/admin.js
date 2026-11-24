// Trang quản trị lớp và mã học sinh (US-29). Không có tài khoản: chỉ cần MÃ QUẢN TRỊ (kiểm ở máy chủ).
import { mountShell, $, $$, esc, icon, toast, isDemo } from '../ui.js';
import {
  adminListClasses, adminListStudents, adminSaveClass, adminAddStudents, adminDeleteStudent, adminDeleteClass,
} from '../store.js';

mountShell('admin');
const app = $('#app');
const SS_KEY = 'nvt.admin'; // chỉ sessionStorage: đóng tab là quên mã quản trị
const GROUP_LABEL = { experiment: 'Thực nghiệm', control: 'Đối chứng' };
let code = '';
try { code = sessionStorage.getItem(SS_KEY) || ''; } catch { /* ignore */ }
let classes = [];
let openClass = null; // lớp đang xem danh sách mã

const fmtDate = (s) => (s ? new Date(s).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '—');

function csvCell(v) { const s = v == null ? '' : String(v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }
function download(name, rows) {
  const csv = '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = name; document.body.append(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast(`Đã xuất ${name}`);
}

function renderLogin(err = '') {
  app.innerHTML = `
    <p class="eyebrow">Dành cho quản trị viên</p><h1>Quản trị lớp và mã học sinh</h1>
    <p class="muted">Tạo lớp, đặt PIN giáo viên, sinh và xóa mã ẩn danh của học sinh. Trang này dùng <b>mã quản trị</b>, khác với PIN giáo viên.</p>
    ${isDemo() ? `<div class="notice">${icon('info')}<span>Đang ở chế độ demo: trang quản trị chỉ hoạt động khi đã kết nối Supabase.</span></div>` : ''}
    <form class="card login-card" id="aForm" style="max-width:520px" novalidate>
      <div class="field"><label for="aCode">Mã quản trị</label>
        <input class="input" id="aCode" name="code" type="password" autocomplete="new-password" required></div>
      <p class="form-error" id="aErr" role="alert">${esc(err)}</p>
      <button class="btn btn-primary btn-lg" type="submit">${icon('lock')} Vào quản trị</button>
      <div class="privacy-note">${icon('shield')}<span>Không nhập họ tên học sinh vào hệ thống. Danh sách đối chiếu mã với tên do giáo viên giữ riêng.</span></div>
    </form>`;
  $('#aForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target; const btn = f.querySelector('button[type="submit"]');
    btn.disabled = true; $('#aErr').textContent = '';
    const r = await adminListClasses(f.code.value);
    btn.disabled = false;
    if (!r.ok) { $('#aErr').textContent = r.message; f.code.setAttribute('aria-invalid', 'true'); f.code.focus(); return; }
    code = f.code.value;
    try { sessionStorage.setItem(SS_KEY, code); } catch { /* ignore */ }
    classes = r.data;
    render();
  });
}

function logout() {
  code = ''; classes = []; openClass = null;
  try { sessionStorage.removeItem(SS_KEY); } catch { /* ignore */ }
  renderLogin();
}

async function refresh() {
  const r = await adminListClasses(code);
  if (!r.ok) { if (r.error === 'INVALID_ADMIN') { logout(); } toast(r.message); return false; }
  classes = r.data;
  return true;
}

function classForm(c) {
  const edit = !!c;
  return `<form class="card" id="clsForm" novalidate>
    <div class="card-title">${icon('users')}<h2>${edit ? `Sửa lớp ${esc(c.code)}` : 'Thêm lớp mới'}</h2></div>
    <div class="login-grid">
      <div class="field"><label for="cCode">Mã lớp</label>
        <input class="input" id="cCode" name="code" value="${esc(c?.code || '')}" ${edit ? 'readonly' : ''} placeholder="10A1" autocapitalize="characters" autocomplete="off" required>
        <span class="hint">Chữ in hoa, số, dấu gạch ngang (2–20 ký tự).</span></div>
      <div class="field"><label for="cName">Tên lớp</label>
        <input class="input" id="cName" name="name" value="${esc(c?.name || '')}" placeholder="Lớp 10A1" maxlength="80" required></div>
      <div class="field"><label for="cGroup">Nhóm nghiên cứu</label>
        <select class="input" id="cGroup" name="group">
          ${Object.entries(GROUP_LABEL).map(([k, v]) => `<option value="${k}" ${c?.group === k ? 'selected' : ''}>${v}</option>`).join('')}
        </select></div>
      <div class="field"><label for="cPin">${edit ? 'PIN giáo viên mới (để trống = giữ nguyên)' : 'PIN giáo viên'}</label>
        <input class="input" id="cPin" name="pin" type="password" autocomplete="new-password" ${edit ? '' : 'required'} minlength="8">
        <span class="hint">Ít nhất 8 ký tự. Nhóm đối chứng không dùng gợi ý AI.</span></div>
      <p class="form-error" id="cErr" role="alert" style="grid-column:1/-1"></p>
      <button class="btn btn-primary" type="submit">${edit ? 'Lưu thay đổi' : 'Tạo lớp'}</button>
    </div>
  </form>`;
}

function render() {
  const open = openClass ? classes.find((c) => c.code === openClass) : null;
  app.innerHTML = `
    <div class="row" style="justify-content:space-between">
      <div><p class="eyebrow">Dành cho quản trị viên</p><h1 style="margin:0">Quản trị lớp và mã học sinh</h1></div>
      <button class="btn btn-ghost btn-sm" id="aOut" type="button">${icon('lock')} Thoát</button>
    </div>
    <section class="card" style="margin-top:16px">
      <div class="card-title">${icon('users')}<h2>Các lớp (${classes.length})</h2></div>
      ${classes.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Mã lớp</th><th>Tên</th><th>Nhóm</th><th>Học sinh</th><th>Lượt làm bài</th><th></th></tr></thead>
        <tbody>${classes.map((c) => `<tr>
          <td><b>${esc(c.code)}</b></td><td>${esc(c.name)}</td>
          <td><span class="badge ${c.group === 'control' ? '' : 'badge-ai'}">${GROUP_LABEL[c.group] || esc(c.group)}</span></td>
          <td>${c.students}</td><td>${c.attempts}</td>
          <td><div class="row" style="gap:6px">
            <button class="btn btn-ghost btn-sm" data-act="students" data-code="${esc(c.code)}" type="button">Mã học sinh</button>
            <button class="btn btn-ghost btn-sm" data-act="edit" data-code="${esc(c.code)}" type="button">Sửa</button>
            <button class="btn btn-ghost btn-sm" data-act="delclass" data-code="${esc(c.code)}" type="button">Xóa</button>
          </div></td></tr>`).join('')}</tbody></table></div>`
        : '<p class="muted">Chưa có lớp nào. Hãy thêm lớp bên dưới.</p>'}
    </section>
    <div id="formSlot" style="margin-top:16px">${classForm(null)}</div>
    ${open ? `<section class="card" id="stuCard" style="margin-top:16px"></section>` : ''}`;

  $('#aOut').addEventListener('click', logout);
  bindClassForm();
  $$('[data-act]').forEach((b) => b.addEventListener('click', () => onAction(b.dataset.act, b.dataset.code)));
  if (open) renderStudents(open);
}

function bindClassForm() {
  const form = $('#clsForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target; const btn = f.querySelector('button[type="submit"]');
    btn.disabled = true; $('#cErr').textContent = '';
    const r = await adminSaveClass(code, f.code.value, f.name.value, f.group.value, f.pin.value);
    btn.disabled = false;
    if (!r.ok) { $('#cErr').textContent = r.message; return; }
    toast(r.data.created ? `Đã tạo lớp ${r.data.code}` : `Đã lưu lớp ${r.data.code}`);
    if (await refresh()) { if (r.data.created) openClass = r.data.code; render(); }
  });
}

async function onAction(act, cls) {
  if (act === 'edit') {
    $('#formSlot').innerHTML = classForm(classes.find((c) => c.code === cls));
    bindClassForm();
    $('#cName').focus();
    $('#formSlot').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else if (act === 'students') {
    openClass = cls; render();
    $('#stuCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (act === 'delclass') {
    const c = classes.find((x) => x.code === cls);
    const typed = prompt(`XÓA lớp ${cls}: sẽ xóa ${c.students} mã học sinh và ${c.attempts} lượt làm bài, không khôi phục được.\nGõ lại mã lớp để xác nhận:`);
    if (typed == null) return;
    const r = await adminDeleteClass(code, cls, typed);
    if (!r.ok) { toast(r.message); return; }
    toast(`Đã xóa lớp ${cls}`);
    if (openClass === cls) openClass = null;
    if (await refresh()) render();
  }
}

async function renderStudents(c) {
  const card = $('#stuCard');
  card.innerHTML = `<div class="card-title">${icon('users')}<h2>Mã học sinh lớp ${esc(c.code)}</h2></div><p class="muted">Đang tải…</p>`;
  const r = await adminListStudents(code, c.code);
  if (!r.ok) { card.innerHTML = `<p class="form-error">${esc(r.message)}</p>`; return; }
  const rows = r.data;
  card.innerHTML = `
    <div class="card-title">${icon('users')}<h2>Mã học sinh lớp ${esc(c.code)} (${rows.length})</h2></div>
    <form class="row" id="addForm" novalidate style="align-items:flex-end;margin-bottom:12px">
      <div class="field"><label for="sPrefix">Tiền tố mã</label><input class="input" id="sPrefix" name="prefix" value="${esc(c.code)}" style="width:140px" autocapitalize="characters"></div>
      <div class="field"><label for="sCount">Số mã (1–200)</label><input class="input" id="sCount" name="count" type="number" min="1" max="200" value="${rows.length ? '' : 40}" placeholder="40" style="width:120px"></div>
      <button class="btn btn-primary" type="submit">Sinh mã PREFIX-01…NN</button>
      ${rows.length ? '<button class="btn btn-ghost" id="csvBtn" type="button">Tải danh sách (CSV)</button>' : ''}
    </form>
    <p class="form-error" id="sErr" role="alert"></p>
    <p class="small muted">Mã đã tồn tại sẽ được bỏ qua, không bị ghi đè. Giáo viên tự ghi đối chiếu mã với tên học sinh ra giấy, không đưa lên hệ thống.</p>
    ${rows.length ? `<div class="table-wrap"><table class="table">
      <thead><tr><th>Mã</th><th>Lượt làm bài</th><th>Lần cuối</th><th></th></tr></thead>
      <tbody>${rows.map((s) => `<tr><td><b>${esc(s.anon_id)}</b></td><td>${s.attempts}</td><td>${fmtDate(s.last_at)}</td>
        <td><button class="btn btn-ghost btn-sm" data-del="${esc(s.anon_id)}" data-n="${s.attempts}" type="button">Xóa</button></td></tr>`).join('')}</tbody></table></div>`
      : '<p class="muted">Lớp này chưa có mã học sinh nào.</p>'}`;

  $('#addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target; const btn = f.querySelector('button[type="submit"]');
    btn.disabled = true; $('#sErr').textContent = '';
    const res = await adminAddStudents(code, c.code, f.prefix.value, f.count.value);
    btn.disabled = false;
    if (!res.ok) { $('#sErr').textContent = res.message; return; }
    toast(`Đã tạo ${res.data.inserted} mã mới${res.data.skipped ? `, bỏ qua ${res.data.skipped} mã đã có` : ''}`);
    if (await refresh()) render();
  });
  $('#csvBtn')?.addEventListener('click', () => download(`nvt_${c.code}_ma_hoc_sinh.csv`,
    [['anon_id', 'class', 'nhom'], ...rows.map((s) => [s.anon_id, c.code, c.group])]));
  $$('[data-del]', card).forEach((b) => b.addEventListener('click', async () => {
    const n = Number(b.dataset.n);
    if (!confirm(`Xóa mã ${b.dataset.del}${n ? ` cùng ${n} lượt làm bài` : ''}? Không khôi phục được.`)) return;
    const res = await adminDeleteStudent(code, b.dataset.del);
    if (!res.ok) { toast(res.message); return; }
    toast(`Đã xóa mã ${b.dataset.del}`);
    if (await refresh()) render();
  }));
}

if (code) {
  const r = await adminListClasses(code);
  if (r.ok) { classes = r.data; render(); } else { renderLogin(r.error === 'INVALID_ADMIN' ? '' : r.message); }
} else {
  renderLogin();
}
