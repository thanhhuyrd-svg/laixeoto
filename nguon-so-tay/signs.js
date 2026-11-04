// Minh họa giản lược biển báo theo hình dạng, màu sắc của QCVN 41:2024.
// Mỗi hàm trả về chuỗi SVG viewBox 0 0 100 100 (màu cố định vì biển thật có màu cố định).
const RED = '#C8102E', BLUE = '#0B4EA2', YEL = '#F6C700', BLK = '#111111', WHT = '#FFFFFF', GRN = '#00704A';

const wrap = (inner, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="${label}">${inner}</svg>`;

// Khung biển
const prohib = (inner) => `<circle cx="50" cy="50" r="46" fill="${WHT}" stroke="${RED}" stroke-width="9"/>${inner}`;
const slash = `<line x1="20" y1="20" x2="80" y2="80" stroke="${RED}" stroke-width="8"/>`;
const blueRound = (inner) => `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${WHT}" stroke-width="2"/>${inner}`;
const warn = (inner) => `<path d="M50 6 L95 88 L5 88 Z" fill="${YEL}" stroke="${RED}" stroke-width="7" stroke-linejoin="round"/>${inner}`;
const warnInv = (inner) => `<path d="M5 12 L95 12 L50 94 Z" fill="${WHT}" stroke="${RED}" stroke-width="8" stroke-linejoin="round"/>${inner}`;
const blueSquare = (inner) => `<rect x="6" y="6" width="88" height="88" rx="6" fill="${BLUE}" stroke="${WHT}" stroke-width="2"/>${inner}`;
const text = (t, size, fill, y = 50, weight = 700) =>
  `<text x="50" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="middle" dominant-baseline="central">${t}</text>`;

// Ký hiệu
const car = (x, y, s, c = BLK) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M-14 2 L-11 -6 Q-10 -9 -6 -9 L6 -9 Q10 -9 11 -6 L14 2 L16 3 L16 9 L-16 9 L-16 3 Z"/><circle cx="-9" cy="10" r="4" fill="${c}"/><circle cx="9" cy="10" r="4" fill="${c}"/></g>`;
const truck = (x, y, s, c = BLK) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><rect x="-18" y="-12" width="22" height="18"/><path d="M5 -6 L13 -6 L18 1 L18 6 L5 6 Z"/><circle cx="-11" cy="9" r="4"/><circle cx="11" cy="9" r="4"/></g>`;
const arrowUp = (c, w = 9) => `<path d="M50 78 L50 30" stroke="${c}" stroke-width="${w}" fill="none"/><path d="M34 40 L50 20 L66 40 Z" fill="${c}"/>`;
const arrowLeft = (c) => `<path d="M60 80 L60 50 Q60 40 50 40 L34 40" stroke="${c}" stroke-width="9" fill="none"/><path d="M38 26 L20 40 L38 54 Z" fill="${c}"/>`;
const arrowRight = (c) => `<path d="M40 80 L40 50 Q40 40 50 40 L66 40" stroke="${c}" stroke-width="9" fill="none"/><path d="M62 26 L80 40 L62 54 Z" fill="${c}"/>`;
const uturn = (c) => `<path d="M62 80 L62 42 Q62 26 46 26 Q32 26 32 42 L32 58" stroke="${c}" stroke-width="9" fill="none"/><path d="M20 54 L32 72 L44 54 Z" fill="${c}"/>`;

const ICONS = {
  p101: () => prohib(''),
  p102: () => `<circle cx="50" cy="50" r="46" fill="${RED}"/><rect x="18" y="42" width="64" height="16" fill="${WHT}"/>`,
  p103: () => prohib(car(50, 52, 1.7) + slash),
  p106: () => prohib(truck(50, 52, 1.5) + slash),
  p123a: () => prohib(arrowLeft(BLK) + slash),
  p123b: () => prohib(arrowRight(BLK) + slash),
  p124a: () => prohib(uturn(BLK) + slash),
  p124c: () => prohib(`<g transform="translate(-4 6) scale(0.62)">${arrowLeft(BLK)}</g><g transform="translate(34 18) scale(0.62)">${uturn(BLK)}</g>` + slash),
  p125: () => prohib(car(36, 52, 1.0, RED) + car(64, 52, 1.0, BLK)),
  p127: () => prohib(text('60', 38, BLK, 52)),
  p128: () => prohib(`<path d="M30 42 L42 42 L58 30 L58 70 L42 58 L30 58 Z" fill="${BLK}"/><path d="M64 38 Q72 50 64 62" stroke="${BLK}" stroke-width="4" fill="none"/>` + slash),
  p130: () => `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${RED}" stroke-width="9"/><line x1="22" y1="22" x2="78" y2="78" stroke="${RED}" stroke-width="8"/><line x1="78" y1="22" x2="22" y2="78" stroke="${RED}" stroke-width="8"/>`,
  p131a: () => `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${RED}" stroke-width="9"/><line x1="22" y1="22" x2="78" y2="78" stroke="${RED}" stroke-width="8"/>`,
  p131b: () => `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${RED}" stroke-width="9"/><line x1="22" y1="22" x2="78" y2="78" stroke="${RED}" stroke-width="8"/>${text('I', 30, WHT, 30)}`,
  p131c: () => `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${RED}" stroke-width="9"/><line x1="22" y1="22" x2="78" y2="78" stroke="${RED}" stroke-width="8"/>${text('II', 26, WHT, 30)}`,
  p121: () => prohib(car(50, 36, 0.9) + `<path d="M30 64 L70 64 M30 58 L30 70 M70 58 L70 70" stroke="${BLK}" stroke-width="4"/>` + text('70m', 16, BLK, 80)),
  dp135: () => `<circle cx="50" cy="50" r="46" fill="${WHT}" stroke="${BLK}" stroke-width="3"/><line x1="20" y1="80" x2="80" y2="20" stroke="${BLK}" stroke-width="5"/><line x1="26" y1="86" x2="86" y2="26" stroke="${BLK}" stroke-width="3"/><line x1="14" y1="74" x2="74" y2="14" stroke="${BLK}" stroke-width="3"/>`,
  r122: () => `<path d="M31 5 L69 5 L95 31 L95 69 L69 95 L31 95 L5 69 L5 31 Z" fill="${RED}" stroke="${WHT}" stroke-width="3"/>${text('STOP', 24, WHT, 52)}`,
  r301a: () => blueRound(arrowUp(WHT)),
  r302a: () => blueRound(`<path d="M30 30 L70 70" stroke="${WHT}" stroke-width="10"/><path d="M50 74 L74 74 L74 50 Z" fill="${WHT}"/>`),
  r303: () => blueRound(`<path d="M50 24 A26 26 0 1 1 26 52" stroke="${WHT}" stroke-width="8" fill="none"/><path d="M14 46 L26 64 L38 46 Z" fill="${WHT}"/>`),
  r306: () => blueRound(text('60', 36, WHT, 52)),
  r412: () => `<rect x="6" y="6" width="88" height="88" rx="4" fill="${BLUE}"/>${text('BUS', 26, WHT, 50)}<path d="M18 80 L82 80" stroke="${WHT}" stroke-width="3"/>`,
  r420: () => `<rect x="4" y="16" width="92" height="68" fill="${WHT}" stroke="${BLK}" stroke-width="3"/><path d="M20 66 L20 48 L32 38 L44 48 L44 66 Z M54 66 L54 44 L68 32 L82 44 L82 66 Z" fill="${BLK}"/>`,
  r421: () => `<rect x="4" y="16" width="92" height="68" fill="${WHT}" stroke="${BLK}" stroke-width="3"/><path d="M20 66 L20 48 L32 38 L44 48 L44 66 Z M54 66 L54 44 L68 32 L82 44 L82 66 Z" fill="${BLK}"/><line x1="10" y1="80" x2="90" y2="22" stroke="${RED}" stroke-width="6"/>`,
  w201: () => warn(`<path d="M58 78 L58 56 Q58 44 46 44 L40 44" stroke="${BLK}" stroke-width="7" fill="none"/><path d="M42 34 L28 44 L42 54 Z" fill="${BLK}"/>`),
  w205: () => warn(`<path d="M50 34 L50 80 M30 58 L70 58" stroke="${BLK}" stroke-width="8"/>`),
  w207: () => warn(`<path d="M50 32 L50 82" stroke="${BLK}" stroke-width="10"/><path d="M32 60 L68 60" stroke="${BLK}" stroke-width="4"/>`),
  w208: () => warnInv(''),
  w210: () => warn(`<path d="M28 74 L36 50 L64 50 L72 74 M30 66 L70 66 M33 58 L67 58" stroke="${BLK}" stroke-width="4" fill="none"/>`),
  w211: () => warn(`<path d="M30 74 L30 52 L60 52 L60 46 L70 46 L70 74 Z" fill="${BLK}"/><circle cx="38" cy="76" r="4" fill="${BLK}"/><circle cx="62" cy="76" r="4" fill="${BLK}"/>`),
  w224: () => warn(`<circle cx="50" cy="38" r="5" fill="${BLK}"/><path d="M50 44 L46 60 L38 76 M46 60 L56 76 M48 50 L60 56 M48 50 L38 56" stroke="${BLK}" stroke-width="5" fill="none" stroke-linecap="round"/>`),
  w225: () => warn(`<circle cx="42" cy="40" r="5" fill="${BLK}"/><circle cx="60" cy="46" r="4" fill="${BLK}"/><path d="M42 46 L40 62 L34 78 M40 62 L46 78 M60 51 L60 64 L56 78 M60 64 L64 78" stroke="${BLK}" stroke-width="5" fill="none" stroke-linecap="round"/>`),
  w227: () => warn(`<circle cx="44" cy="38" r="5" fill="${BLK}"/><path d="M44 44 L40 62 L32 78 M40 62 L50 78 M42 50 L60 58" stroke="${BLK}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M58 78 L72 66 L76 78 Z" fill="${BLK}"/>`),
  w245: () => warn(text('ĐI', 15, BLK, 56) + text('CHẬM', 15, BLK, 73)),
  i401: () => `<rect x="18" y="18" width="64" height="64" fill="${WHT}" stroke="${BLK}" stroke-width="2" transform="rotate(45 50 50)"/><rect x="28" y="28" width="44" height="44" fill="${YEL}" transform="rotate(45 50 50)"/>`,
  i402: () => `<rect x="18" y="18" width="64" height="64" fill="${WHT}" stroke="${BLK}" stroke-width="2" transform="rotate(45 50 50)"/><rect x="28" y="28" width="44" height="44" fill="${YEL}" transform="rotate(45 50 50)"/><line x1="20" y1="80" x2="80" y2="20" stroke="${BLK}" stroke-width="6"/>`,
  i408: () => blueSquare(text('P', 60, WHT, 54)),
  i423: () => blueSquare(`<path d="M50 14 L86 78 L14 78 Z" fill="${WHT}"/><circle cx="50" cy="42" r="5" fill="${BLK}"/><path d="M50 48 L46 60 L40 72 M46 60 L56 72" stroke="${BLK}" stroke-width="5" fill="none" stroke-linecap="round"/>`),
};

// Biển mẫu cho bảng phân nhóm
const GROUP_ICONS = { P: 'p123a', R: 'r301a', W: 'w205', I: 'i408', S: null };

function signSvg(key, label = '') {
  const f = ICONS[key];
  if (!f) return '';
  return wrap(f(), label);
}

function auxSvg(t = '6h–9h') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" role="img" aria-label="Biển phụ ${t}"><rect x="3" y="3" width="94" height="44" fill="${WHT}" stroke="${BLK}" stroke-width="3"/>${`<text x="50" y="27" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${BLK}" text-anchor="middle" dominant-baseline="central">${t}</text>`}</svg>`;
}


// Hình đại diện theo nhóm (dùng khi chưa vẽ riêng): hình dạng, màu nhóm + mã biển
function genericSvg(code, label = '') {
  const c = String(code).replace(/\s*\(.*\)/, '');
  const t = (y, size, fill) => `<text x="50" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="700" fill="${fill}" text-anchor="middle" dominant-baseline="central">${c}</text>`;
  const fs = c.length > 6 ? 15 : 17;
  let inner;
  if (/^DP/.test(c)) inner = `<circle cx="50" cy="50" r="46" fill="${WHT}" stroke="${BLK}" stroke-width="3"/><line x1="22" y1="78" x2="78" y2="22" stroke="${BLK}" stroke-width="3"/>` + t(50, fs, BLK);
  else if (/^P/.test(c)) inner = `<circle cx="50" cy="50" r="46" fill="${WHT}" stroke="${RED}" stroke-width="9"/>` + t(50, fs, BLK);
  else if (/^R\.122/.test(c)) inner = ICONS.r122();
  else if (/^R/.test(c)) inner = `<circle cx="50" cy="50" r="46" fill="${BLUE}"/>` + t(50, fs, WHT);
  else if (/^W/.test(c)) inner = `<path d="M50 6 L95 88 L5 88 Z" fill="${YEL}" stroke="${RED}" stroke-width="7" stroke-linejoin="round"/>` + t(64, fs - 2, BLK);
  else if (/^IE/.test(c)) inner = `<rect x="6" y="14" width="88" height="72" rx="6" fill="${GRN}"/>` + t(50, fs, WHT);
  else if (/^I/.test(c)) inner = `<rect x="6" y="6" width="88" height="88" rx="6" fill="${BLUE}"/>` + t(50, fs, WHT);
  else inner = `<rect x="4" y="26" width="92" height="48" fill="${WHT}" stroke="${BLK}" stroke-width="3"/>` + t(50, fs, BLK);
  return wrap(inner, label || c);
}

module.exports = { signSvg, auxSvg, genericSvg, ICONS, GROUP_ICONS };
