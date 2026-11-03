const fs = require('fs');
const path = require('path');
const D = require('./data.js');
const { signSvg, auxSvg, ICONS } = require('./signs.js');
const E = require('./data2.js');
const T = require('./data3.js');
const { D: DG, STACKS } = require('./diagrams.js');

const OUT = process.argv[2] || path.join(__dirname, 'tra-cuu.html');
const svgs = {};
Object.keys(ICONS).forEach((k) => { svgs[k] = signSvg(k, k); });
svgs.aux = auxSvg('6h–9h');

const diag = {}; Object.keys(DG).forEach((k) => { diag[k] = DG[k](); }); Object.keys(STACKS).forEach((k) => { diag[k] = STACKS[k](); });
const CAP = {
  m_yellow_dash: 'Vạch 1.1 vàng đứt: được cắt qua để vượt khi an toàn.', m_yellow_solid: 'Vạch 1.2 vàng liền: không lấn, không đè vạch.',
  m_yellow_double: 'Vạch 1.3 vàng kép liền: cả hai chiều không được cắt qua.', m_yellow_mixed: 'Vạch 1.4 liền + đứt: phía vạch đứt được cắt qua, phía vạch liền thì không.',
  m_white_dash: 'Vạch 2.1 trắng đứt: được chuyển làn.', m_white_solid: 'Vạch 2.2 trắng liền: không chuyển làn.',
  m_multi_lane: 'Mỗi lần chỉ chuyển sang một làn liền kề.', m_bus_lane: 'Vạch 2.3 liền giới hạn làn dành riêng: xe khác không đi vào.',
  m_edge: 'Vạch 3.1 mép phần xe chạy: được đè khi cần thiết, nhường xe thô sơ.', m_hatch: 'Vạch 4.1 gạch chéo: không đi vào, trừ trường hợp khẩn cấp.',
  m_box: 'Vạch 4.4 mắt võng vàng: không dừng trong ô.', m_curb: 'Vạch 6.1 vàng đứt: cấm đỗ. Vạch 6.2 vàng liền: cấm dừng và đỗ.',
  m_stop_zebra: 'Vạch 7.1 dừng xe và 7.3 người đi bộ.', m_giveway: 'Vạch 7.2 nhường đường: đi chậm hoặc dừng nhường.',
  m_zigzag: 'Vạch 9.2 zigzag: không dừng, đỗ trong phạm vi vạch và 15 m hai đầu.', m_lane_arrows: 'Vạch 9.3 mũi tên: đi theo hướng mũi tên của làn.',
  x_red_arrow: 'Mũi tên xanh cùng đèn đỏ: đi theo mũi tên, nhường xe đang được đi.', x_pass_right: 'Được vượt bên phải khi xe trước báo rẽ trái hoặc đang rẽ trái.',
  x_uturn_arrow: 'Biển P.123a cấm rẽ trái không cấm quay đầu.', x_breakdown_highway: 'Xe hỏng trên cao tốc: làn khẩn cấp, đèn khẩn cấp, biển cách ≥ 150 m.',
  x_accident_scene: 'Hiện trường va chạm: cảnh báo, giữ nguyên, chụp ảnh, đánh dấu bánh xe.',
};
Object.assign(CAP, {
  x_parked_solid: 'Xe đỗ chắn làn trên đường vạch vàng liền: dừng chờ, không lấn vạch.',
  x_emergency_red: 'Đèn đỏ, xe ưu tiên phía sau: nhích qua vạch dừng ép sát lề phải, không đi tiếp qua giao lộ.',
  x_turn_right_moto: 'Rẽ phải: không cắt ngang trước xe máy đang đi thẳng bên phải.',
  x_bus_dash_turn: 'Làn buýt: chỉ nhập vào ở đoạn vạch đứt, nhường xe buýt.',
  x_yield_right: 'Giao nhau không có báo hiệu: nhường xe đến từ bên phải.',
});
const DATA = { ...D, ...E, ...T, SVG: svgs, DIAG: diag, CAP };
const json = JSON.stringify(DATA).replace(/</g, '\\u003c');

const html = `<title>Lái Xe Ô Tô – Tra Cứu Nhanh</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap">
<style>
/* Bố cục: thanh đầu dính như biển chỉ dẫn xanh, nội dung một cột rộng 1100px; thẻ tra cứu có dải màu theo mức trừ điểm. */
:root{
  --bg:#F3F5F7; --surface:#FFFFFF; --sunk:#E8EDF1; --fg:#17202A; --muted:#55626F; --line:#D3DBE2;
  --road:#0B3D6B; --road-fg:#FFFFFF; --accent:#0B5CAD; --accent-soft:#E2EEF9;
  --ok:#2E7D32; --warn:#A35F00; --warn-soft:#FFF2DB; --crit:#B3261E; --crit-soft:#FCE8E6; --new:#00704A; --new-soft:#E1F3EB;
  --font-display:"Barlow Condensed","Arial Narrow",Arial,sans-serif;
  --font-body:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  --r:10px;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#0F151B; --surface:#17202A; --sunk:#1F2A35; --fg:#E7EDF2; --muted:#9AA8B5; --line:#2C3946;
  --road:#0A2F52; --road-fg:#F2F6FA; --accent:#6DB1F2; --accent-soft:#16324D;
  --ok:#7BC47F; --warn:#F2B25C; --warn-soft:#3A2A10; --crit:#F28B82; --crit-soft:#3B1715; --new:#5CC79A; --new-soft:#123326;
  color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#0F151B; --surface:#17202A; --sunk:#1F2A35; --fg:#E7EDF2; --muted:#9AA8B5; --line:#2C3946;
  --road:#0A2F52; --road-fg:#F2F6FA; --accent:#6DB1F2; --accent-soft:#16324D;
  --ok:#7BC47F; --warn:#F2B25C; --warn-soft:#3A2A10; --crit:#F28B82; --crit-soft:#3B1715; --new:#5CC79A; --new-soft:#123326;
  color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font-family:var(--font-body);font-size:15px;line-height:1.55}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--road)}
.wrap{max-width:1100px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
header.top{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--road);color:var(--road-fg);box-shadow:0 1px 0 rgba(0,0,0,.15)}
.brand{display:flex;align-items:center;gap:12px;padding-block:12px 6px}
.brand-mark{width:34px;height:34px;flex:none;border-radius:6px;background:var(--road-fg);display:grid;place-items:center}
.brand h1{font-family:var(--font-display);font-weight:700;font-size:26px;letter-spacing:.02em;margin:0;line-height:1.05;text-transform:uppercase}
.brand small{display:block;font-size:12px;opacity:.82;font-family:var(--font-body);text-transform:none;letter-spacing:0;font-weight:400}
nav.tabs{display:flex;gap:4px;overflow-x:auto;padding-block:4px 0;scrollbar-width:none}
nav.tabs::-webkit-scrollbar{display:none}
nav.tabs a{flex:none;color:var(--road-fg);text-decoration:none;padding:9px 12px 10px;border-radius:8px 8px 0 0;font-weight:600;font-size:14px;opacity:.85;white-space:nowrap}
nav.tabs a:hover{opacity:1;background:rgba(255,255,255,.08)}
nav.tabs a[aria-current="page"]{background:var(--bg);color:var(--fg);opacity:1}
a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible,select:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
main{padding-block:20px 48px}
section.view{display:grid;gap:20px}
h2.sec{font-family:var(--font-display);font-size:28px;font-weight:700;margin:0;letter-spacing:.01em;text-wrap:balance}
h3{font-size:17px;margin:0 0 8px;text-wrap:balance}
p{margin:0}
.lead{color:var(--muted);max-width:70ch}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:16px}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr));gap:16px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:12px}
.eyebrow{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.src{font-size:12.5px;color:var(--muted);margin-top:8px}
.note{border-left:4px solid var(--accent);background:var(--accent-soft);padding:10px 14px;border-radius:0 8px 8px 0}
.note.warn{border-color:var(--warn);background:var(--warn-soft)}
.note.crit{border-color:var(--crit);background:var(--crit-soft)}
.tag{display:inline-block;font-size:11.5px;font-weight:700;padding:1px 7px;border-radius:999px;letter-spacing:.02em;vertical-align:middle}
.tag.new{background:var(--new-soft);color:var(--new)}
.tag.exp{background:var(--sunk);color:var(--muted)}
.tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r);background:var(--surface)}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);vertical-align:top}
th{background:var(--sunk);font-weight:600;font-size:13px;color:var(--muted)}
tr:last-child td{border-bottom:0}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.big{font-family:var(--font-display);font-size:24px;font-weight:700;font-variant-numeric:tabular-nums}

/* Tra phạt */
.search{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.search input{flex:1 1 260px;min-width:0;font:inherit;font-size:16px;padding:12px 14px;border:2px solid var(--line);border-radius:10px;background:var(--surface);color:var(--fg)}
.search input:focus{border-color:var(--accent);outline:none}
.chips{display:flex;gap:6px;flex-wrap:wrap}
.chip{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface);color:var(--fg);padding:6px 11px;border-radius:999px;cursor:pointer}
.chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--surface)}
.count{font-size:13px;color:var(--muted)}
.fines{display:grid;gap:8px}
.fine{display:grid;grid-template-columns:6px 1fr auto;gap:0 14px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);overflow:hidden}
.fine .bar{background:var(--line)}
.fine.p2 .bar{background:var(--accent)} .fine.p4 .bar{background:var(--warn)} .fine.p6 .bar,.fine.p10 .bar,.fine.px .bar{background:var(--crit)}
.fine .body{padding:12px 0;min-width:0}
.fine .what{font-weight:600}
.fine .meta{font-size:12.5px;color:var(--muted);margin-top:4px}
.fine .extra{font-size:13px;color:var(--crit);font-weight:600;margin-top:4px}
.fine .right{padding:12px 14px 12px 0;text-align:right;display:grid;gap:6px;align-content:start;justify-items:end}
.fine .money{font-variant-numeric:tabular-nums;font-weight:700;white-space:nowrap}
.pts{font-size:12px;font-weight:700;padding:2px 8px;border-radius:6px;white-space:nowrap;background:var(--sunk);color:var(--muted)}
.p2 .pts{background:var(--accent-soft);color:var(--accent)} .p4 .pts{background:var(--warn-soft);color:var(--warn)}
.p6 .pts,.p10 .pts,.px .pts{background:var(--crit-soft);color:var(--crit)}
@media (max-width:560px){.fine{grid-template-columns:6px 1fr}.fine .right{grid-column:2;justify-items:start;text-align:left;padding:0 14px 12px 0;grid-auto-flow:column;justify-content:start;align-items:center}}
.calc{display:grid;gap:10px}
.calc .row{display:flex;gap:10px;flex-wrap:wrap}
.calc label{display:grid;gap:4px;font-size:13px;color:var(--muted);flex:1 1 120px}
.calc input,.calc select{font:inherit;font-size:16px;padding:9px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--fg);width:100%}
.result{padding:12px 14px;border-radius:8px;background:var(--sunk)}
.result.bad{background:var(--crit-soft)} .result.mid{background:var(--warn-soft)} .result.good{background:var(--new-soft)}

/* Biển báo */
.signs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,230px),1fr));gap:10px}
.sign{display:grid;grid-template-columns:64px 1fr;gap:12px;align-items:start;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:12px}
.sign svg{width:64px;height:64px;display:block}
.sign .code{font-family:var(--font-display);font-weight:700;font-size:18px;color:var(--accent);line-height:1}
.sign .nm{font-weight:600;line-height:1.3;margin-top:2px}
.sign .mean{font-size:13px;color:var(--muted);margin-top:4px}
.sign .fn{font-size:12.5px;color:var(--crit);font-weight:600;margin-top:4px}
.shape{display:grid;grid-template-columns:52px 1fr;gap:12px;align-items:center}
.shape svg{width:52px;height:52px}
.prio{counter-reset:p;display:grid;gap:8px;margin:0;padding:0;list-style:none}
.prio li{display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:start}
.prio li::before{counter-increment:p;content:counter(p);font-family:var(--font-display);font-weight:700;font-size:20px;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;background:var(--road);color:var(--road-fg)}
.lights{display:grid;gap:8px}
.light{display:grid;grid-template-columns:22px 1fr;gap:10px;align-items:start}
.dot{width:18px;height:18px;border-radius:50%;margin-top:3px;border:2px solid var(--line)}

/* Sơ đồ */
.figs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:12px}
figure.fig{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);overflow:hidden}
figure.fig svg{display:block;width:100%;height:auto}
figure.fig figcaption{padding:8px 12px;font-size:13px;color:var(--muted)}
.mk-ok{color:var(--ok);font-weight:700} .mk-no{color:var(--crit);font-weight:700} .mk-mid{color:var(--warn);font-weight:700}
.stack{display:grid;grid-template-columns:72px 1fr;gap:12px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:10px 12px}
.stack svg{width:72px;height:90px;display:block}
/* Tình huống khó */
.cases{display:grid;gap:12px}
.case{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:14px 16px;display:grid;gap:10px}
.case .head{display:flex;gap:12px;align-items:flex-start}
.verdict{flex:none;font-family:var(--font-display);font-weight:700;font-size:18px;letter-spacing:.03em;padding:4px 10px;border-radius:8px;white-space:nowrap}
.verdict.no{background:var(--crit-soft);color:var(--crit)} .verdict.yes{background:var(--new-soft);color:var(--new)}
.verdict.cond{background:var(--warn-soft);color:var(--warn)} .verdict.must{background:var(--accent-soft);color:var(--accent)}
.case .qq{font-weight:600;font-size:16px;line-height:1.4}
.case .cert{font-size:12px;color:var(--muted);margin-top:4px}
.case .fine2{font-size:13.5px}.case .fine2 b{color:var(--crit)}
.case .cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:12px;align-items:start}
.case h4{margin:0 0 4px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.case figure.fig{max-width:420px}
/* Kỹ thuật */
details.acc{background:var(--surface);border:1px solid var(--line);border-radius:var(--r)}
details.acc+details.acc{margin-top:8px}
details.acc summary{cursor:pointer;padding:12px 16px;font-weight:600;list-style:none;display:flex;justify-content:space-between;gap:10px}
details.acc summary::-webkit-details-marker{display:none}
details.acc summary::after{content:"+";font-weight:700;color:var(--accent);font-size:20px;line-height:1}
details.acc[open] summary::after{content:"–"}
details.acc .in{padding:0 16px 14px}
ol.steps{margin:0;padding-left:22px;display:grid;gap:6px}
ol.steps li::marker{font-weight:700;color:var(--accent)}
ul.dots{margin:0;padding-left:20px;display:grid;gap:5px}

/* Checklist */
.check{display:grid;gap:6px}
.check label{display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border-radius:8px;background:var(--surface);border:1px solid var(--line);cursor:pointer}
.check input{width:20px;height:20px;margin-top:1px;flex:none;accent-color:var(--accent)}
.check input:checked+span{text-decoration:line-through;color:var(--muted)}
.btn{font:inherit;font-weight:600;font-size:14px;padding:8px 14px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--fg);cursor:pointer}
.btn:hover{border-color:var(--accent)}
.sos{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:10px}
.sos div{background:var(--crit-soft);border-radius:var(--r);padding:12px 14px;display:grid;gap:2px}
.sos b{font-family:var(--font-display);font-size:38px;line-height:1;color:var(--crit);user-select:all}
footer{font-size:12.5px;color:var(--muted);padding-block:16px 32px;border-top:1px solid var(--line)}
@media (max-width:560px){.brand small{display:none}.brand h1{font-size:22px}.chips{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.chips::-webkit-scrollbar{display:none}.chip{flex:none}.search .count{flex-basis:100%}}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
</style>

<header class="top">
  <div class="wrap">
    <div class="brand">
      <div class="brand-mark" aria-hidden="true">${svgs.r301a.replace('<svg ', '<svg width="30" height="30" ')}</div>
      <h1>Lái xe ô tô · Tra cứu nhanh<small>Theo Luật 36/2024, NĐ 168/2024, NĐ 238/2026, TT 38/2024, QCVN 41:2024 · cập nhật ${D.META.updated}</small></h1>
    </div>
    <nav class="tabs" aria-label="Mục tra cứu">
      <a href="#muc-phat">Mức phạt</a>
      <a href="#bien-bao">Biển báo</a>
      <a href="#vach-ke">Vạch kẻ</a>
      <a href="#ngoai-le">Ngoại lệ</a>
      <a href="#tinh-huong-kho">Tình huống khó</a>
      <a href="#toc-do">Tốc độ</a>
      <a href="#ky-thuat">Kỹ thuật</a>
      <a href="#tai-nan">Tai nạn</a>
      <a href="#tinh-huong">Sự cố</a>
      <a href="#kinh-nghiem">Kinh nghiệm</a>
      <a href="#checklist">Checklist</a>
      <a href="#nguon">Nguồn</a>
    </nav>
  </div>
</header>

<main class="wrap" id="app"></main>
<footer class="wrap">Trang tham khảo, không thay thế văn bản pháp luật gốc. Mức phạt áp dụng cho cá nhân lái ô tô con không kinh doanh vận tải; mức cụ thể trong khung do người có thẩm quyền quyết định.</footer>

<script id="data" type="application/json">${json}</script>
<script>
(function(){
const D = JSON.parse(document.getElementById('data').textContent);
const $ = (s, r=document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/đ/g,'d');
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
};
const app = $('#app');
const src = (t) => '<p class="src">Căn cứ: ' + esc(t) + '</p>';
const table = (heads, rows, numCols=[]) => '<div class="tbl-wrap"><table><thead><tr>' + heads.map((h,i)=>'<th'+(numCols.includes(i)?' class="num"':'')+'>'+esc(h)+'</th>').join('') + '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map((c,i)=>'<td'+(numCols.includes(i)?' class="num"':'')+'>'+c+'</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
const ptsClass = (f) => f[2] ? 'p'+f[2] : (/Tước|Tịch thu/.test(f[3]) ? 'px' : '');

// ---------------- MỨC PHẠT
function viewFines(){
  const state = { q: store.get('lx_q',''), g: store.get('lx_g','all') };
  app.innerHTML = '<section class="view" aria-labelledby="h-fines">'
  + '<div><h2 class="sec" id="h-fines">Tra cứu mức phạt ô tô con</h2><p class="lead">Gõ từ khóa không dấu cũng được, ví dụ "den do", "con", "dien thoai", "cao toc". Dải màu bên trái cho biết mức trừ điểm GPLX.</p></div>'
  + '<div class="search"><input id="q" type="search" placeholder="Tìm lỗi: vượt đèn đỏ, nồng độ cồn, đỗ xe…" aria-label="Tìm hành vi vi phạm" autocomplete="off"><span class="count" id="cnt" aria-live="polite"></span></div>'
  + '<div class="chips" id="chips" role="group" aria-label="Lọc theo nhóm"></div>'
  + '<div class="fines" id="list"></div>'
  + '<div class="grid2">'
  +   '<div class="panel calc"><h3>Quá tốc độ bao nhiêu thì phạt bao nhiêu?</h3><div class="row"><label for="lim">Tốc độ cho phép (km/h)<input id="lim" type="number" inputmode="numeric" value="60" min="5" max="120"></label><label for="spd">Tốc độ của bạn (km/h)<input id="spd" type="number" inputmode="numeric" value="75" min="0" max="250"></label></div><div class="result" id="spdres" aria-live="polite"></div><p class="src">Căn cứ: NĐ 168 Đ6 k3a, k5đ, k6a, k7a</p></div>'
  +   '<div class="panel"><h3>Điểm giấy phép lái xe</h3>' + D.POINTS.map(p => '<p style="margin-bottom:8px"><b>'+esc(p[0])+':</b> '+esc(p[1])+' <span class="src" style="display:inline">('+esc(p[2])+')</span></p>').join('') + '</div>'
  + '</div>'
  + '<div><h3>Nguyên tắc xử phạt</h3>' + table(['Nguyên tắc','Nội dung','Căn cứ'], D.PENALTY_PRINCIPLES.map(r=>['<b>'+esc(r[0])+'</b>', esc(r[1]), esc(r[2])])) + '</div>'
  + '<div><h3>Mười lỗi người mới hay mắc</h3>' + table(['Lỗi','Mức phạt','Cách tránh (kinh nghiệm)'], D.TOP_MISTAKES.map(r=>['<b>'+esc(r[0])+'</b>', esc(r[1]), esc(r[2])])) + '</div>'
  + '</section>';
  const chips = $('#chips');
  chips.innerHTML = [['all','Tất cả']].concat(D.FINE_GROUPS).map(([k,n]) => '<button class="chip" type="button" data-g="'+k+'" aria-pressed="'+(state.g===k)+'">'+esc(n)+'</button>').join('');
  const q = $('#q'); q.value = state.q;
  function render(){
    const terms = fold(state.q).split(/\\s+/).filter(Boolean);
    const rows = D.FINES.filter(f => (state.g==='all' || f[5]===state.g) && terms.every(t => fold(f[0]+' '+f[4]+' '+(f[3]||'')).includes(t)));
    $('#cnt').textContent = rows.length + ' / ' + D.FINES.length + ' hành vi';
    $('#list').innerHTML = rows.length ? rows.map(f => '<article class="fine '+ptsClass(f)+'"><div class="bar"></div><div class="body"><div class="what">'+(f[6]==='moi'?'<span class="tag new">MỚI 15/8/2026</span> ':'')+esc(f[0])+'</div>'+(f[3]?'<div class="extra">'+esc(f[3])+'</div>':'')+'<div class="meta">'+esc(f[4])+'</div></div><div class="right"><span class="money">'+esc(f[1])+(f[1]==='Cảnh cáo'?'':' đ')+'</span><span class="pts">'+(f[2]?'Trừ '+f[2]+' điểm':'Không trừ điểm')+'</span></div></article>').join('') : '<div class="panel">Không tìm thấy hành vi phù hợp. Thử từ khóa ngắn hơn, ví dụ "đỗ", "làn", "tốc độ".</div>';
  }
  q.addEventListener('input', () => { state.q = q.value; store.set('lx_q', state.q); render(); });
  chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if(!b) return; state.g = b.dataset.g; store.set('lx_g', state.g); chips.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c===b))); render(); });
  render();
  function speed(){
    const lim = +$('#lim').value, v = +$('#spd').value, over = v - lim, r = $('#spdres');
    let cls='good', msg;
    if(!lim || isNaN(v)) { msg='Nhập hai giá trị tốc độ.'; }
    else if(over < 5) msg = over > 0 ? 'Vượt '+over+' km/h: chưa đến ngưỡng phạt (từ 5 km/h), nhưng vẫn là chạy quá tốc độ. Giảm tốc.' : 'Trong giới hạn cho phép.';
    else if(over < 10){ cls='mid'; msg='Vượt '+over+' km/h → phạt 800.000 – 1.000.000 đ, không trừ điểm.'; }
    else if(over <= 20){ cls='mid'; msg='Vượt '+over+' km/h → phạt 4.000.000 – 6.000.000 đ, trừ 2 điểm.'; }
    else if(over <= 35){ cls='bad'; msg='Vượt '+over+' km/h → phạt 6.000.000 – 8.000.000 đ, trừ 4 điểm.'; }
    else { cls='bad'; msg='Vượt '+over+' km/h → phạt 12.000.000 – 14.000.000 đ, trừ 6 điểm.'; }
    r.className = 'result ' + cls; r.textContent = msg;
  }
  ['lim','spd'].forEach(id => $('#'+id).addEventListener('input', speed)); speed();
}

// ---------------- BIỂN BÁO
function viewSigns(){
  const gIcon = {'Biển báo cấm':'p123a','Biển hiệu lệnh':'r301a','Biển nguy hiểm và cảnh báo':'w205','Biển chỉ dẫn':'i408','Biển phụ, biển viết bằng chữ':'aux'};
  const state = { g: store.get('lx_sg','P') };
  app.innerHTML = '<section class="view" aria-labelledby="h-signs">'
  + '<div><h2 class="sec" id="h-signs">Biển báo, đèn, vạch kẻ</h2><p class="lead">Nhận diện biển theo hình dạng trước, rồi mới đọc chi tiết. Hình là minh họa giản lược theo QCVN 41:2024.</p></div>'
  + '<div class="grid2"><div class="panel"><h3>Thứ tự hiệu lực khi các báo hiệu khác nhau</h3><ol class="prio">' + D.PRIORITY.map(p => '<li><div><b>'+esc(p[1])+'</b>'+(p[2]?'<div class="src" style="margin-top:2px">'+esc(p[2])+'</div>':'')+'</div></li>').join('') + '</ol>'+src('Luật 36 Đ11 k2, k12; QCVN 41:2024 Điều 4')+'</div>'
  + '<div class="panel"><h3>Năm nhóm biển</h3><div style="display:grid;gap:12px">' + D.SIGN_GROUPS.map(g => '<div class="shape">'+(gIcon[g[0]]==='aux'?D.SVG.aux.replace('<svg ','<svg style="width:52px;height:26px" '):D.SVG[gIcon[g[0]]])+'<div><b>'+esc(g[0])+'</b> <span class="tag exp">'+esc(g[1])+'</span><div class="src" style="margin-top:2px">'+esc(g[2])+'. '+esc(g[3])+'</div></div></div>').join('') + '</div></div></div>'
  + '<div><div class="chips" id="sg" role="group" aria-label="Lọc biển"></div></div><div class="signs" id="signs"></div>'
  + '<div><h3>Biển cấm có hiệu lực từ đâu đến đâu?</h3>' + table(['Trường hợp','Quy tắc','QCVN 41'], D.SIGN_SCOPE.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])) + '</div>'
  + '<div><h3>Đọc biển phụ theo 6 bước</h3>' + table(['Bước','Biển phụ trả lời'], D.AUX_HOWTO.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + '</div>'
  + '<div><h3>Ví dụ biển ghép (minh họa)</h3><div class="grid2">' + D.AUX_EXAMPLES.map(x => '<div class="stack">'+D.DIAG[x[0]]+'<div><b>'+esc(x[1])+'</b><div class="src" style="margin-top:4px">'+esc(x[2])+'</div></div></div>').join('') + '</div></div>'
  + '<div class="note warn"><b>Dễ nhầm:</b> S.505a "Loại xe" thì biển chính CHỈ áp dụng cho loại xe vẽ trên biển phụ. S.H,6 "Except – Ngoại lệ" thì loại xe vẽ trên biển phụ ĐƯỢC MIỄN.</div>'
  + '<div><h3>Danh mục biển phụ</h3>' + table(['Mã','Tên','Tác dụng'], D.AUX_SIGNS.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])) + src('QCVN 41:2024 Điều 41, Phụ lục F') + '</div>'
  + '<div class="grid2"><div class="panel"><h3>Đèn tín hiệu</h3><div class="lights">' + D.LIGHTS.map(l => { const c = /Xanh|xanh/.test(l[0]) ? '#2E9D4A' : /Vàng/.test(l[0]) ? '#F2B600' : '#D2302A'; return '<div class="light"><span class="dot" style="background:'+c+'"></span><div><b>'+esc(l[0])+'</b>: '+esc(l[1])+'</div></div>'; }).join('') + '</div>'+src('Luật 36 Đ11 k4; QCVN 41:2024 Điều 6')+'</div>'
  + '<div class="panel"><h3>Hiệu lệnh của CSGT</h3>' + D.POLICE.map(p => '<p style="margin-bottom:8px"><b>'+esc(p[0])+':</b> '+esc(p[1])+'</p>').join('') + src('Luật 36 Đ11 k3') + '<h3 style="margin-top:14px">Nhường đường</h3>' + D.YIELD_RULES.map(p => '<p style="margin-bottom:6px"><b>'+esc(p[0])+':</b> '+esc(p[1])+'</p>').join('') + src('Luật 36 Đ15, Đ17, Đ22') + '</div></div>'
  + '<div class="note">Vạch kẻ đường có tab riêng kèm sơ đồ: <a href="#vach-ke">mở tab Vạch kẻ</a>. Các trường hợp "trừ khi…": <a href="#ngoai-le">mở tab Ngoại lệ</a>.</div>'
  + '</section>';
  const groups = [['P','Cấm'],['R','Hiệu lệnh'],['W','Nguy hiểm'],['I','Chỉ dẫn'],['all','Tất cả']];
  const sg = $('#sg');
  sg.innerHTML = groups.map(([k,n]) => '<button class="chip" type="button" data-g="'+k+'" aria-pressed="'+(state.g===k)+'">'+n+'</button>').join('');
  function render(){
    const list = D.SIGNS.filter(s => state.g==='all' || s[5]===state.g || (state.g==='P' && s[5]==='DP'));
    $('#signs').innerHTML = list.map(s => '<div class="sign">'+(D.SVG[s[4]]||'')+'<div><div class="code">'+esc(s[0])+'</div><div class="nm">'+esc(s[1])+'</div><div class="mean">'+esc(s[2])+'</div>'+(s[3]?'<div class="fn">'+esc(s[3])+'</div>':'')+'</div></div>').join('');
  }
  sg.addEventListener('click', e => { const b = e.target.closest('.chip'); if(!b) return; state.g = b.dataset.g; store.set('lx_sg', state.g); sg.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c===b))); render(); });
  render();
}

// ---------------- TỐC ĐỘ
function viewSpeed(){
  app.innerHTML = '<section class="view" aria-labelledby="h-spd">'
  + '<div><h2 class="sec" id="h-spd">Tốc độ và khoảng cách an toàn</h2><p class="lead">Áp dụng khi đoạn đường không có biển tốc độ. Có biển thì theo biển. Khu đông dân cư bắt đầu từ biển R.420, kết thúc ở R.421.</p></div>'
  + '<div class="grid3">'
  + '<div class="panel"><div class="eyebrow">Trong khu đông dân cư</div><div class="big">60 km/h</div><p class="src">Đường đôi; đường một chiều từ 2 làn</p><div class="big" style="margin-top:8px">50 km/h</div><p class="src">Đường hai chiều; đường một chiều 1 làn</p></div>'
  + '<div class="panel"><div class="eyebrow">Ngoài khu đông dân cư · ô tô con</div><div class="big">90 km/h</div><p class="src">Đường đôi; đường một chiều từ 2 làn</p><div class="big" style="margin-top:8px">80 km/h</div><p class="src">Đường hai chiều; đường một chiều 1 làn</p></div>'
  + '<div class="panel"><div class="eyebrow">Cao tốc</div><div class="big">≤ 120 km/h</div><p class="src">Tối đa</p><div class="big" style="margin-top:8px">≥ 60 km/h</div><p class="src">Tối thiểu; trị số cụ thể theo biển từng tuyến, từng làn</p></div>'
  + '</div>'
  + '<div><h3>Ngoài khu đông dân cư theo loại xe (km/h)</h3>' + table(['Loại xe','Đường đôi; 1 chiều ≥ 2 làn','Đường 2 chiều; 1 chiều 1 làn'], D.SPEED_OUT.map(r=>[esc(r[0]),'<b>'+r[1]+'</b>','<b>'+r[2]+'</b>']), [1,2]) + src('TT 38/2024/TT-BGTVT Điều 6, 9') + '</div>'
  + '<div class="grid2"><div><h3>Khoảng cách tối thiểu (đường khô, tầm nhìn tốt)</h3>' + table(['Tốc độ (km/h)','Khoảng cách tối thiểu (m)'], D.DISTANCE.map(r=>[esc(r[0]),'<b>'+r[1]+'</b>']), [1]) + src('TT 38/2024 Điều 11. Dưới 60 km/h tự giữ khoảng cách phù hợp; mưa, sương, đèo dốc phải giãn xa hơn.') + '</div>'
  + '<div class="panel calc"><h3>Quy tắc 3 giây</h3><p class="src" style="margin-top:0">Kinh nghiệm: đếm từ lúc xe trước qua một mốc đến lúc xe mình qua mốc đó.</p><div class="row"><label for="v3">Tốc độ (km/h)<input id="v3" type="number" inputmode="numeric" value="100" min="10" max="130"></label><label for="w3">Thời tiết<select id="w3"><option value="3">Khô ráo · 3 giây</option><option value="4">Mưa · 4 giây</option><option value="6">Mưa to, sương · 6 giây</option></select></label></div><div class="result" id="r3" aria-live="polite"></div></div></div>'
  + '<div class="note crit"><b>Quá tốc độ:</b> 5 đến dưới 10 km/h: 800 nghìn – 1 triệu · 10–20 km/h: 4–6 triệu, −2 điểm · trên 20–35 km/h: 6–8 triệu, −4 điểm · trên 35 km/h: 12–14 triệu, −6 điểm (NĐ 168 Đ6).</div>'
  + '</section>';
  function calc(){
    const v = +$('#v3').value, s = +$('#w3').value; const m = Math.round(v/3.6*s);
    const legal = v > 100 ? 100 : v > 80 ? 70 : v > 60 ? 55 : v >= 60 ? 35 : null;
    $('#r3').textContent = v ? (s+' giây ở '+v+' km/h ≈ '+m+' m.'+(legal?' Mức tối thiểu theo TT 38: '+legal+' m.':'')) : 'Nhập tốc độ.';
  }
  $('#v3').addEventListener('input', calc); $('#w3').addEventListener('change', calc); calc();
}

// ---------------- KỸ THUẬT
function acc(title, inner, open){ return '<details class="acc"'+(open?' open':'')+'><summary>'+esc(title)+'</summary><div class="in">'+inner+'</div></details>'; }
const steps = (a) => '<ol class="steps">' + a.map(s=>'<li>'+esc(s)+'</li>').join('') + '</ol>';
const dots = (a) => '<ul class="dots">' + a.map(s=>'<li>'+esc(s)+'</li>').join('') + '</ul>';
function viewTech(){
  app.innerHTML = '<section class="view" aria-labelledby="h-tech">'
  + '<div><h2 class="sec" id="h-tech">Kỹ thuật lái xe</h2><p class="lead">Thao tác chuẩn theo Giáo trình Kỹ thuật lái xe ô tô (Tổng cục Đường bộ Việt Nam, 2018). Mục có nhãn <span class="tag exp">Kinh nghiệm</span> là mẹo thực hành, không phải quy định.</p></div>'
  + '<div>'
  + acc('Kiểm tra trước khi lên xe', table(['Việc','Kiểm tra gì','Nguồn'], D.PRECHECK.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])), true)
  + acc('Chỉnh ghế, tựa đầu, gương, dây an toàn', table(['Bước','Cách chỉnh đúng'], D.SEAT.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + src('Giáo trình 2.4'))
  + acc('Cầm vô lăng và đánh lái', table(['Nội dung','Cách làm','Nguồn'], D.STEERING.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])))
  + acc('Chân ga, phanh, ly hợp và cần số tự động', table(['Bộ phận','Thao tác'], D.PEDALS.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + '<div style="height:10px"></div>' + table(['Số','Dùng khi'], D.GEARS_AT.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + src('Giáo trình 2.6–2.9'))
  + acc('Khởi hành và dừng xe', '<h3>Khởi động, khởi hành</h3>' + steps(D.START_STOP.start) + '<h3 style="margin-top:12px">Dừng, đỗ sát lề</h3>' + steps(D.START_STOP.stop) + src('Giáo trình 2.10–2.11; Luật 36 Đ18 k6'))
  + acc('Căn đường theo giáo trình', table(['Kỹ thuật','Cách làm'], D.ALIGN_TEXTBOOK.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + src('Giáo trình 3.1.2, 3.2.1'))
  + acc('Tự hiệu chỉnh điểm căn trên xe của mình · Kinh nghiệm', '<p class="note" style="margin-bottom:10px">Mốc căn phụ thuộc mẫu xe, chiều cao và tư thế ghế. Đo một lần ở bãi rộng với người hỗ trợ, rồi luôn ngồi đúng tư thế đó.</p>' + table(['Mốc','Cách tự xác định','Dùng khi'], D.ALIGN_CALIBRATE.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])))
  + acc('Chuyển làn đường', steps(D.LANE_CHANGE) + src('Giáo trình 2.16; Luật 36 Đ13 k2'))
  + D.MANEUVERS.map(m => acc(m.name, steps(m.steps) + src(m.src))).join('')
  + '</div><div><h3>Lái trên từng loại đường</h3>'
  + D.ROADS.map(r => acc(r.name, dots(r.items) + src(r.src))).join('')
  + '</div></section>';
}

// ---------------- TÌNH HUỐNG
function viewEmergency(){
  app.innerHTML = '<section class="view" aria-labelledby="h-em">'
  + '<div><h2 class="sec" id="h-em">Sự cố và tình huống khẩn cấp</h2></div>'
  + '<div class="sos">' + D.EMERGENCY_NUMBERS.map(n => '<div><b>'+n[0]+'</b><span>'+esc(n[1])+'</span></div>').join('') + '</div>'
  + '<div class="grid2">' + D.EMERGENCY.map(e => '<div class="panel"><h3>'+esc(e.name)+'</h3>'+steps(e.steps)+src(e.src)+'</div>').join('') + '</div>'
  + '</section>';
}


// ---------------- VẠCH KẺ
const fig = (k) => '<figure class="fig">'+(D.DIAG[k]||'')+'<figcaption>'+esc(D.CAP[k]||'')+'</figcaption></figure>';
const mkClass = (c) => /^Cấm/.test(c) ? 'mk-no' : /^Được/.test(c) ? 'mk-ok' : 'mk-mid';
function viewMarkings(){
  app.innerHTML = '<section class="view" aria-labelledby="h-mk">'
  + '<div><h2 class="sec" id="h-mk">Vạch kẻ đường</h2><p class="lead">Theo QCVN 41:2024 Phụ lục G. Cột cuối cho biết có được cắt qua, đè lên vạch hay không. Sơ đồ là hình vẽ minh họa nhìn từ trên xuống: xanh là được, đỏ là không được.</p></div>'
  + '<div class="figs">' + ['m_yellow_dash','m_yellow_solid','m_yellow_double','m_yellow_mixed','m_white_dash','m_white_solid','m_multi_lane','m_bus_lane','m_edge','m_hatch','m_box','m_curb','m_stop_zebra','m_giveway','m_zigzag','m_lane_arrows'].map(fig).join('') + '</div>'
  + D.MARKINGS_G.map(g => '<div><h3>'+esc(g.grp)+'</h3>' + table(['Mã','Vạch','Màu','Quy định','Được cắt, đè?'], g.rows.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2]),esc(r[3]),'<span class="'+mkClass(r[4])+'">'+esc(r[4])+'</span>'])) + '</div>').join('')
  + src('QCVN 41:2024/BGTVT Điều 48–51, Phụ lục G')
  + '<div class="panel"><h3>Cần nhớ</h3>' + dots(D.MARKING_NOTES) + '</div>'
  + '</section>';
}
// ---------------- NGOẠI LỆ
function viewExceptions(){
  app.innerHTML = '<section class="view" aria-labelledby="h-ex">'
  + '<div><h2 class="sec" id="h-ex">Khi nào được phép? Các ngoại lệ</h2><p class="lead">Gom các trường hợp "trừ khi…" có trong Luật 36/2024, NĐ 168/2024 và QCVN 41:2024. Quy tắc không có trong danh sách thì coi là không có ngoại lệ.</p></div>'
  + D.EXCEPTIONS.map(g => { const figs = g.rows.map(r=>r[3]).filter(Boolean); return '<div><h3>'+esc(g.grp)+'</h3>' + table(['Quy định chung','Được phép khi','Căn cứ'], g.rows.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])) + (figs.length?'<div class="figs" style="margin-top:10px">'+figs.map(fig).join('')+'</div>':'') + '</div>'; }).join('')
  + '<div class="note warn"><b>Không chắc có thuộc ngoại lệ không?</b> Ngoại lệ chỉ áp dụng đúng như văn bản ghi. Hiệu lệnh CSGT và biển tạm thời là cách hợp pháp để đi khác biển, vạch cố định. Không chắc thì chọn phương án an toàn hơn.</div>'
  + '</section>';
}
// ---------------- TAI NẠN & BẢO HIỂM
function viewAccident(){
  const ck = (id, items) => '<div class="check">' + items.map((t,i)=>'<label for="'+id+i+'"><input type="checkbox" id="'+id+i+'"><span>'+esc(t)+'</span></label>').join('') + '</div>';
  app.innerHTML = '<section class="view" aria-labelledby="h-acc">'
  + '<div><h2 class="sec" id="h-acc">Xảy ra tai nạn: làm gì, theo thứ tự nào</h2><p class="lead">Căn cứ Luật 36/2024 Điều 80–83, Thông tư 72/2024/TT-BCA, Nghị định 67/2023/NĐ-CP về bảo hiểm bắt buộc, BLDS và BLHS.</p></div>'
  + '<div class="sos">' + D.EMERGENCY_NUMBERS.map(n => '<div><b>'+n[0]+'</b><span>'+esc(n[1])+'</span></div>').join('') + '<div style="background:var(--accent-soft)"><b style="color:var(--accent);font-size:20px">Bảo hiểm</b><span>Số đường dây nóng in trên giấy chứng nhận bảo hiểm của bạn</span></div></div>'
  + '<div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))">' + D.ACC_PRINCIPLES.map((p,i)=>'<div class="panel"><div class="eyebrow">Nguyên tắc '+(i+1)+'</div><h3 style="margin-top:4px">'+esc(p[0])+'</h3><p style="font-size:14px">'+esc(p[1])+'</p></div>').join('') + '</div>'
  + '<div class="figs">' + fig('x_accident_scene') + fig('x_breakdown_highway') + '</div>'
  + '<div><h3>Trình tự theo thời gian</h3>' + D.ACC_TIMELINE.map((ph,i)=>acc(ph.phase, steps(ph.steps), i===0)).join('') + src('Luật 36 Đ25, Đ80–83; TT 72/2024/TT-BCA; NĐ 67/2023 Đ12') + '</div>'
  + '<div><h3>Theo từng tình huống</h3>' + table(['Tình huống','Cách xử lý','Căn cứ'], D.ACC_SCENARIOS.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])) + '</div>'
  + '<div class="grid2"><div class="panel"><h3>Chứng cứ cần thu thập</h3>' + ck('ev', D.ACC_EVIDENCE) + '</div><div class="panel"><h3>Văn bản tự thỏa thuận nên có</h3>' + ck('ag', D.ACC_AGREEMENT) + '<p class="src">Pháp luật không cấm tự thỏa thuận. Vụ chỉ thiệt hại tài sản không đáng kể: các bên có thể đề nghị thỏa thuận dân sự tại hiện trường; CSGT vẫn lập biên bản, báo cáo đề xuất trong 07 ngày làm việc (TT 72/2024). Gọi bảo hiểm trước khi chốt số tiền.</p></div></div>'
  + '<div><h3>Bảo hiểm bắt buộc trách nhiệm dân sự</h3>' + table(['Nội dung','Quy định','Căn cứ'], D.INS_TNDS.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2])])) + '</div>'
  + '<div class="grid2"><div class="panel"><h3>Bảo hiểm bắt buộc KHÔNG bồi thường khi</h3>' + dots(D.INS_EXCLUSIONS) + src('NĐ 67/2023 Đ7 k2') + '</div><div class="panel"><h3>Hồ sơ bồi thường</h3>' + D.INS_DOCS.map(r=>'<p style="margin-bottom:8px"><b>'+esc(r[0])+':</b> '+esc(r[1])+'</p>').join('') + src('NĐ 67/2023 Đ13') + '</div></div>'
  + '<div><h3>Bảo hiểm vật chất xe (tự nguyện)</h3>' + table(['Nội dung','Thông tin'], D.INS_VCX.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + '<p class="src">Thông tin chung; điều kiện cụ thể theo hợp đồng của bạn.</p></div>'
  + '<div><h3>Trách nhiệm pháp lý</h3>' + table(['Loại','Nội dung'], D.LIABILITY.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + src('NĐ 168/2024 Đ6; BLDS 2015 Đ601; BLHS 2015 (sửa đổi 2017) Đ260') + '</div>'
  + '<div class="grid2"><div class="panel"><h3>Tuyệt đối không làm</h3>' + D.ACC_DONTS.map(r=>'<p style="margin-bottom:8px"><b>'+esc(r[0])+':</b> '+esc(r[1])+'</p>').join('') + '</div><div class="panel"><h3>Sơ cứu ở mức an toàn</h3>' + D.FIRST_AID.map(r=>'<p style="margin-bottom:8px"><b>'+esc(r[0])+':</b> '+esc(r[1])+'</p>').join('') + '<p class="src">Khuyến cáo sơ cứu phổ biến, không phải quy định pháp luật.</p></div></div>'
  + '</section>';
}


// ---------------- TÌNH HUỐNG KHÓ
function viewHard(){
  const vcls = (v) => v==='KHÔNG'?'no':v==='ĐƯỢC'?'yes':(v==='PHẢI'||v==='THEO CSGT')?'must':'cond';
  const state = { g: 'all', q: '' };
  const N = D.EMERGENCY_NECESSITY;
  app.innerHTML = '<section class="view" aria-labelledby="h-hard">'
  + '<div><h2 class="sec" id="h-hard">Tình huống khó: được hay không?</h2><p class="lead">Mỗi tình huống có kết luận ngắn, mức độ chắc chắn, lý do kèm điều khoản, cách xử lý và mức phạt nếu làm sai. Gõ không dấu cũng tìm được, ví dụ "cuu thuong", "vach lien", "xe buyt".</p></div>'
  + '<div class="panel"><h3>"Tình thế cấp thiết": khi nào vi phạm mà không bị phạt</h3><p style="margin-bottom:8px">'+esc(N.def)+'</p>' + dots(N.conditions) + '<p class="note warn" style="margin-top:10px">'+esc(N.notAuto)+'</p></div>'
  + '<div class="search"><input id="hq" type="search" placeholder="Tìm tình huống: xe cứu thương, vạch liền, đèn vàng…" aria-label="Tìm tình huống" autocomplete="off"><span class="count" id="hcnt" aria-live="polite"></span></div>'
  + '<div class="chips" id="hg" role="group" aria-label="Lọc nhóm tình huống"></div>'
  + '<div class="cases" id="hlist"></div>'
  + src('Luật 36/2024; NĐ 168/2024; QCVN 41:2024; Luật XLVPHC Đ2 k11, Đ11 k1; hướng dẫn của Cục CSGT (3/2026, 9/2026); Công an TP.HCM (1/2025); phân tích báo Thanh Niên (27/10/2026). Xem tab Nguồn.')
  + '</section>';
  $('#hg').innerHTML = [['all','Tất cả']].concat(D.HARD_CASES.map(g=>[g.grp,g.grp])).map(([k,n])=>'<button class="chip" type="button" data-g="'+esc(k)+'" aria-pressed="'+(k==='all')+'">'+esc(n)+'</button>').join('');
  function render(){
    const terms = fold(state.q).split(/\\s+/).filter(Boolean); let n = 0, tot = 0;
    const html = D.HARD_CASES.filter(g => state.g==='all' || g.grp===state.g).map(g => g.items.filter(c => { tot++; const hay = fold(c.q+' '+c.why.join(' ')+' '+c.todo.join(' ')); return terms.every(t=>hay.includes(t)); }).map(c => { n++; return '<article class="case"><div class="head"><span class="verdict '+vcls(c.v)+'">'+esc(c.v)+'</span><div><div class="qq">'+esc(c.q)+'</div><div class="cert">'+esc(D.CERT[c.cert])+'</div></div></div>'
      + '<div class="cols"><div><h4>Vì sao</h4>'+dots(c.why)+'</div><div><h4>Nên làm</h4>'+dots(c.todo)+'<p class="fine2" style="margin-top:8px"><b>Nếu làm sai:</b> '+esc(c.fine)+'</p></div></div>'
      + (c.fig ? fig(c.fig) : '') + '</article>'; }).join('')).join('');
    $('#hlist').innerHTML = html || '<div class="panel">Không tìm thấy tình huống phù hợp.</div>';
    $('#hcnt').textContent = n + ' tình huống';
  }
  $('#hq').addEventListener('input', e => { state.q = e.target.value; render(); });
  $('#hg').addEventListener('click', e => { const b = e.target.closest('.chip'); if(!b) return; state.g = b.dataset.g; $('#hg').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed', String(c===b))); render(); });
  render();
}

// ---------------- KINH NGHIỆM
function viewExp(){
  app.innerHTML = '<section class="view" aria-labelledby="h-exp">'
  + '<div><h2 class="sec" id="h-exp">Kinh nghiệm cho người mới</h2><p class="lead">Kinh nghiệm của người lái lâu năm, không phải quy định pháp luật.</p></div>'
  + '<div class="grid3">' + D.GOLDEN.map((g,i) => '<div class="panel"><div class="eyebrow">Nguyên tắc '+(i+1)+'</div><h3 style="margin-top:4px">'+esc(g[0])+'</h3><p style="font-size:14px">'+esc(g[1])+'</p></div>').join('') + '</div>'
  + '<div><h3>Lộ trình tập lái sau khi có bằng</h3>' + table(['Giai đoạn','Nội dung tập'], D.TRAINING_PLAN.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1])])) + '</div>'
  + '</section>';
}

// ---------------- CHECKLIST
function viewCheck(){
  const saved = store.get('lx_ck', {});
  const block = (id, title, items) => '<div class="panel"><h3>'+esc(title)+'</h3><div class="check">' + items.map((t,i) => { const k=id+i; return '<label for="'+k+'"><input type="checkbox" id="'+k+'" data-k="'+k+'"'+(saved[k]?' checked':'')+'><span>'+esc(t)+'</span></label>'; }).join('') + '</div></div>';
  app.innerHTML = '<section class="view" aria-labelledby="h-ck">'
  + '<div style="display:flex;justify-content:space-between;align-items:end;gap:12px;flex-wrap:wrap"><div><h2 class="sec" id="h-ck">Checklist</h2><p class="lead">Đánh dấu được lưu trên trình duyệt của bạn.</p></div><button class="btn" type="button" id="reset">Bỏ hết đánh dấu</button></div>'
  + '<div class="grid2">' + block('d','Mỗi lần lái', D.CHECKLIST_DAILY) + block('t','Trước chuyến đi xa', D.CHECKLIST_TRIP) + '</div>'
  + '</section>';
  app.addEventListener('change', onCk);
  $('#reset').addEventListener('click', () => { store.set('lx_ck', {}); app.querySelectorAll('.check input').forEach(i => i.checked = false); });
}
function onCk(e){ const i = e.target; if(!i.dataset || !i.dataset.k) return; const s = store.get('lx_ck', {}); s[i.dataset.k] = i.checked; store.set('lx_ck', s); }

// ---------------- NGUỒN
function viewSources(){
  app.innerHTML = '<section class="view" aria-labelledby="h-src">'
  + '<div><h2 class="sec" id="h-src">Căn cứ và nguồn</h2></div>'
  + '<div><h3>Văn bản áp dụng</h3>' + table(['Văn bản','Số hiệu','Hiệu lực','Dùng cho'], D.LEGAL.map(r=>['<b>'+esc(r[0])+'</b>',esc(r[1]),esc(r[2]),esc(r[3])])) + '</div>'
  + '<div><h3>Nguồn đã đối chiếu</h3><ul class="dots">' + D.SOURCES.map(s => '<li>'+(s[2]?'<a href="'+esc(s[2])+'" target="_blank" rel="noopener">'+esc(s[0])+'</a>':esc(s[0]))+' <span class="src" style="display:inline">· '+esc(s[1])+'</span></li>').join('') + '</ul></div>'
  + '<div class="note warn"><b>Những điều chưa xác minh được</b><ul class="dots" style="margin-top:6px">' + D.LIMITS.map(l=>'<li>'+esc(l)+'</li>').join('') + '</ul></div>'
  + '</section>';
}

const VIEWS = { 'muc-phat': viewFines, 'bien-bao': viewSigns, 'vach-ke': viewMarkings, 'ngoai-le': viewExceptions, 'tinh-huong-kho': viewHard, 'tai-nan': viewAccident, 'toc-do': viewSpeed, 'ky-thuat': viewTech, 'tinh-huong': viewEmergency, 'kinh-nghiem': viewExp, 'checklist': viewCheck, 'nguon': viewSources };
function route(){
  const h = (location.hash || '').slice(1);
  const key = VIEWS[h] ? h : 'muc-phat';
  app.removeEventListener('change', onCk);
  VIEWS[key]();
  document.querySelectorAll('nav.tabs a').forEach(a => { if(a.getAttribute('href') === '#'+key) { a.setAttribute('aria-current','page'); const n=a.parentElement; if(a.offsetLeft < n.scrollLeft || a.offsetLeft + a.offsetWidth > n.scrollLeft + n.clientWidth) n.scrollLeft = a.offsetLeft - 16; } else a.removeAttribute('aria-current'); });
}
window.addEventListener('hashchange', () => { route(); window.scrollTo(0,0); });
route();
})();
</script>
`;
fs.writeFileSync(OUT, html);
console.log('wrote', OUT, html.length);
