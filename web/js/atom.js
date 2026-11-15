// atom.js — mô hình nguyên tử Bohr động (SVG + CSS), chạm để đổi nguyên tố.
// Tôn trọng prefers-reduced-motion (CSS tắt animation).
import { esc } from './ui.js';

export const ELEMENTS = [
  { sym: 'Na', name: 'Sodium', vi: 'Sodium', z: 11, n: 12, shells: [2, 8, 1] },
  { sym: 'C', name: 'Carbon', vi: 'Carbon', z: 6, n: 6, shells: [2, 4] },
  { sym: 'O', name: 'Oxygen', vi: 'Oxygen', z: 8, n: 8, shells: [2, 6] },
  { sym: 'Cl', name: 'Chlorine', vi: 'Chlorine', z: 17, n: 18, shells: [2, 8, 7] },
  { sym: 'H', name: 'Hydrogen', vi: 'Hydrogen', z: 1, n: 0, shells: [1] },
];

const C = 200;
const RADII = [78, 118, 158];
const SPEED = [9, 15, 24];

function nucleus(z, n) {
  // xếp hạt theo kiểu "hoa hướng dương" (phyllotaxis), tối đa 26 hạt hiển thị
  const total = Math.min(z + n, 26);
  const pRatio = z / Math.max(1, z + n);
  let out = '';
  let pCount = 0;
  for (let i = 0; i < total; i++) {
    const r = 6.2 * Math.sqrt(i + 0.5);
    const a = i * 2.39996;
    const x = C + r * Math.cos(a); const y = C + r * Math.sin(a);
    const isP = pCount / (i + 1) < pRatio || n === 0;
    if (isP) pCount++;
    out += `<circle class="${isP ? 'proton' : 'neutron'}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>`;
  }
  return out;
}

export function atomSVG(el) {
  const shells = el.shells.map((count, i) => {
    const r = RADII[i];
    let electrons = '';
    for (let k = 0; k < count; k++) {
      const a = (k / count) * Math.PI * 2 + i * 0.6;
      const x = C + r * Math.cos(a); const y = C + r * Math.sin(a);
      electrons += `<circle class="electron-glow" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10"/><circle class="electron" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5"/>`;
    }
    const dir = i % 2 ? 'reverse' : 'normal';
    return `<circle class="shell" cx="${C}" cy="${C}" r="${r}"/>
      <text class="shell-label" x="${C + r * Math.cos(-0.78) + 6}" y="${C + r * Math.sin(-0.78) - 4}">${'KLM'[i]}</text>
      <g class="spin" style="animation-duration:${SPEED[i]}s;animation-direction:${dir}">${electrons}</g>`;
  }).join('');
  return `<svg class="atom-svg" viewBox="0 0 400 400" role="img" aria-label="Mô hình nguyên tử ${esc(el.name)} (${esc(el.sym)}): ${el.z} proton, ${el.n} neutron, các lớp electron ${el.shells.join(', ')}">
    <defs><radialGradient id="atomHalo"><stop offset="0" stop-color="#FB923C" stop-opacity=".35"/><stop offset="1" stop-color="#FB923C" stop-opacity="0"/></radialGradient></defs>
    <circle class="halo" cx="${C}" cy="${C}" r="60"/>
    ${shells}
    <g class="nucleus">${nucleus(el.z, el.n)}</g>
  </svg>`;
}

/** Gắn mô hình vào container; trả về hàm dọn dẹp */
export function mountAtom(container) {
  let i = 0;
  const render = () => {
    const el = ELEMENTS[i];
    container.innerHTML = `${atomSVG(el)}
      <div class="atom-caption" aria-live="polite">
        <b>${esc(el.sym)}</b><span>${esc(el.name)}</span>
        <span class="num">Z = ${el.z} · ${el.shells.join('/')}</span>
        <button type="button" class="btn btn-sm" id="atomNext" aria-label="Đổi sang nguyên tố khác">Đổi</button>
      </div>`;
    container.querySelector('#atomNext').addEventListener('click', () => { next(); container.querySelector('#atomNext').focus(); });
    container.querySelector('svg').addEventListener('click', next);
  };
  const next = () => { i = (i + 1) % ELEMENTS.length; render(); };
  render();
}
