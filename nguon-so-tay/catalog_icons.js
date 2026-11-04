// Gán hình cho từng mã trong danh mục: dùng hình vẽ riêng nếu có, không thì hình đại diện nhóm.
const D = require('./data.js');
const SI = require('./signs.js');
const byCode = {}; D.SIGNS.forEach((s) => { byCode[s[0]] = s[4]; });
function keyFor(code) {
  const base = String(code).replace(/\s*\(.*\)/, '').trim();
  if (byCode[base]) return byCode[base];
  if (byCode[base + 'a']) return byCode[base + 'a'];
  return null;
}
function iconSvg(code) { const k = keyFor(code); return k ? SI.signSvg(k, code) : SI.genericSvg(code, code); }
function iconId(code) { const k = keyFor(code); return k || ('g_' + String(code).replace(/\s*\(.*\)/, '').replace(/[^A-Za-z0-9]/g, '_')); }
module.exports = { keyFor, iconSvg, iconId };
