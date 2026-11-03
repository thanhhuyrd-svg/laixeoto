// Bộ vẽ sơ đồ mặt đường nhìn từ trên xuống (SVG). Màu cố định vì là hình minh họa.
const COL = {
  asphalt: '#3E4449', asphalt2: '#4A5056', shoulder: '#8A9187', grass: '#7FA36B', white: '#F4F4F2', yellow: '#F2C200',
  ok: '#1FA34A', no: '#E0302A', car: '#2F6DB5', car2: '#C9CED3', truck: '#B07A2A', bus: '#D9822B', glass: '#BFD8EE',
  label: '#111111', labelBg: '#FFFFFF', walk: '#F4F4F2',
};
const W = 400, H = 240;

const svg = (inner, title, w = W, h = H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><rect width="${w}" height="${h}" fill="${COL.grass}"/>${inner}</svg>`;

// Đường nằm ngang: lanes = mảng chiều rộng; trả về y bắt đầu, các mốc
function hroad({ y = 60, lanes = 2, lw = 50, x0 = 0, x1 = W } = {}) {
  const h = lanes * lw;
  return { y, h, lw, x0, x1, svg: `<rect x="${x0}" y="${y - 6}" width="${x1 - x0}" height="${h + 12}" fill="${COL.shoulder}"/><rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" fill="${COL.asphalt}"/>` };
}
function vroad({ x = 160, lanes = 2, lw = 40, y0 = 0, y1 = H } = {}) {
  const w = lanes * lw;
  return { x, w, lw, svg: `<rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" fill="${COL.asphalt}"/>` };
}
// Vạch ngang (theo trục x)
function hline(y, x0, x1, { color = COL.white, dash = false, width = 3, double = false, gapD = 5, mixed = null } = {}) {
  const d = dash ? `stroke-dasharray="${typeof dash === 'string' ? dash : '18 14'}"` : '';
  if (mixed) { // mixed: 'solid-top' | 'solid-bottom'
    const top = mixed === 'solid-top' ? '' : 'stroke-dasharray="18 14"';
    const bot = mixed === 'solid-top' ? 'stroke-dasharray="18 14"' : '';
    return `<line x1="${x0}" y1="${y - gapD / 2 - 1}" x2="${x1}" y2="${y - gapD / 2 - 1}" stroke="${color}" stroke-width="${width}" ${top}/><line x1="${x0}" y1="${y + gapD / 2 + 1}" x2="${x1}" y2="${y + gapD / 2 + 1}" stroke="${color}" stroke-width="${width}" ${bot}/>`;
  }
  if (double) return `<line x1="${x0}" y1="${y - gapD / 2 - 1}" x2="${x1}" y2="${y - gapD / 2 - 1}" stroke="${color}" stroke-width="${width}" ${d}/><line x1="${x0}" y1="${y + gapD / 2 + 1}" x2="${x1}" y2="${y + gapD / 2 + 1}" stroke="${color}" stroke-width="${width}" ${d}/>`;
  return `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${color}" stroke-width="${width}" ${d}/>`;
}
function vline(x, y0, y1, { color = COL.white, dash = false, width = 3 } = {}) {
  const d = dash ? `stroke-dasharray="${typeof dash === 'string' ? dash : '18 14'}"` : '';
  return `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="${color}" stroke-width="${width}" ${d}/>`;
}
// Xe nhìn từ trên: tâm (cx,cy), hướng góc độ (0 = sang phải)
function car(cx, cy, angle = 0, { color = COL.car, len = 46, wid = 22, label = '' } = {}) {
  return `<g transform="translate(${cx} ${cy}) rotate(${angle})"><rect x="${-len / 2}" y="${-wid / 2}" width="${len}" height="${wid}" rx="6" fill="${color}" stroke="#1B1B1B" stroke-width="1"/><rect x="${len / 2 - 17}" y="${-wid / 2 + 3}" width="8" height="${wid - 6}" rx="2" fill="${COL.glass}"/><rect x="${-len / 2 + 5}" y="${-wid / 2 + 4}" width="5" height="${wid - 8}" rx="2" fill="${COL.glass}"/>${label ? `<text x="0" y="1" font-family="Arial" font-size="10" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="central" transform="rotate(${-angle})">${label}</text>` : ''}</g>`;
}
function truck(cx, cy, angle = 0, o = {}) { return car(cx, cy, angle, { color: COL.truck, len: 70, wid: 24, ...o }); }
function bus(cx, cy, angle = 0, o = {}) { return car(cx, cy, angle, { color: COL.bus, len: 74, wid: 24, ...o }); }
// Đường đi (path d) có mũi tên; ok=true xanh, false đỏ + dấu X ở giữa
let _id = 0;
function path(d, ok = true, { x, y, dashed = false } = {}) {
  const c = ok ? COL.ok : COL.no; const id = 'm' + (++_id) + (ok ? 'k' : 'n');
  const marker = `<defs><marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="${c}"/></marker></defs>`;
  const p = `<path d="${d}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" ${dashed ? 'stroke-dasharray="7 6"' : ''} marker-end="url(#${id})"/>`;
  const mark = x !== undefined ? (ok ? okMark(x, y) : noMark(x, y)) : '';
  return marker + p + mark;
}
const okMark = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="${COL.ok}" stroke="#fff" stroke-width="2"/><path d="M-5 0 L-1 4 L6 -4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const noMark = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="${COL.no}" stroke="#fff" stroke-width="2"/><path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
function label(x, y, t, { size = 11, anchor = 'middle', bg = true } = {}) {
  const w = t.length * size * 0.56 + 10;
  const bx = anchor === 'middle' ? x - w / 2 : anchor === 'start' ? x - 4 : x - w + 4;
  return `${bg ? `<rect x="${bx}" y="${y - size / 2 - 4}" width="${w}" height="${size + 8}" rx="4" fill="${COL.labelBg}" opacity="0.92"/>` : ''}<text x="${x}" y="${y + 0.5}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="700" fill="${COL.label}" text-anchor="${anchor}" dominant-baseline="central">${t}</text>`;
}
// Vạch người đi bộ dọc (khi đường nằm ngang) tại x
function zebraV(x, y0, y1, { stripe = 6, gap = 6, len = 26 } = {}) {
  let s = '';
  for (let y = y0 + 3; y < y1 - 3; y += stripe + gap) s += `<rect x="${x}" y="${y}" width="${len}" height="${stripe}" fill="${COL.walk}"/>`;
  return s;
}
// Vạch chéo vùng cấm (tam giác/đa giác) – vẽ đường biên + gạch chéo trong clip
function hatch(points, { color = COL.white, step = 10 } = {}) {
  const id = 'c' + (++_id);
  const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
  const minX = Math.min(...xs) - 60, maxX = Math.max(...xs) + 60, minY = Math.min(...ys), maxY = Math.max(...ys);
  let lines = '';
  for (let x = minX; x < maxX; x += step) lines += `<line x1="${x}" y1="${maxY}" x2="${x + (maxY - minY)}" y2="${minY}" stroke="${color}" stroke-width="3"/>`;
  const pts = points.map((p) => p.join(',')).join(' ');
  return `<defs><clipPath id="${id}"><polygon points="${pts}"/></clipPath></defs><g clip-path="url(#${id})">${lines}</g><polygon points="${pts}" fill="none" stroke="${color}" stroke-width="3"/>`;
}
// Mũi tên sơn trên mặt đường (hướng đi xe sang phải). kind: straight|left|right|straight-left|straight-right|uturn
function laneArrow(x, y, kind = 'straight', color = COL.white) {
  const s = `stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"`;
  const head = (tx, ty, ang) => `<path d="M0 -6 L10 0 L0 6 Z" fill="${color}" transform="translate(${tx} ${ty}) rotate(${ang})"/>`;
  let g = '';
  if (kind.includes('straight')) g += `<line x1="-18" y1="0" x2="12" y2="0" ${s}/>` + head(12, 0, 0);
  if (kind.includes('left')) g += `<path d="M-18 0 L-2 0 Q4 0 4 -6 L4 -12" ${s}/>` + head(4, -12, -90);
  if (kind.includes('right')) g += `<path d="M-18 0 L-2 0 Q4 0 4 6 L4 12" ${s}/>` + head(4, 12, 90);
  if (kind === 'uturn') g += `<path d="M-18 4 L2 4 Q10 4 10 -4 Q10 -12 2 -12 L-8 -12" ${s}/>` + head(-8, -12, 180);
  return `<g transform="translate(${x} ${y})">${g}</g>`;
}
function stopLineV(x, y0, y1) { return `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="${COL.white}" stroke-width="6"/>`; }
function boxJunction(x, y, w, h) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${COL.yellow}" stroke-width="3"/>`;
  s += `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="${COL.yellow}" stroke-width="3"/><line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${COL.yellow}" stroke-width="3"/>`;
  return s;
}
function triangleWarn(x, y, s = 14) { return `<path d="M${x} ${y - s} L${x + s} ${y + s * 0.8} L${x - s} ${y + s * 0.8} Z" fill="#fff" stroke="${COL.no}" stroke-width="3"/>`; }

module.exports = { COL, W, H, svg, hroad, vroad, hline, vline, car, truck, bus, path, okMark, noMark, label, zebraV, hatch, laneArrow, stopLineV, boxJunction, triangleWarn };
