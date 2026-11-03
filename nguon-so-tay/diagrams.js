// Sơ đồ tình huống (chỉ hình học). Chú thích nằm trong data.js.
const S = require('./scene.js');
const { COL, svg, hroad, hline, vline, car, truck, bus, path, okMark, noMark, label, zebraV, hatch, laneArrow, stopLineV, boxJunction, triangleWarn } = S;
const SI = require('./signs.js');

// Đường 2 chiều, mỗi chiều 1 làn: làn dưới đi sang phải, làn trên đi sang trái
function twoWay(centerOpts, extra = '') {
  const r = hroad({ y: 70, lanes: 2, lw: 50 });
  const cy = r.y + r.lw;
  return r.svg + hline(r.y + 2, 0, 400, { width: 2 }) + hline(r.y + r.h - 2, 0, 400, { width: 2 }) + hline(cy, 0, 400, { color: COL.yellow, ...centerOpts }) + extra;
}
const dirTags = label(30, 95, '←', { size: 13 }) + label(30, 145, '→', { size: 13 });

const D = {};

// ---- VẠCH DỌC PHÂN CHIA HAI CHIỀU
D.m_yellow_solid = () => svg(
  twoWay({}) + truck(230, 145, 0, { label: 'XE TẢI' }) + car(120, 145, 0) +
  path('M140 145 C170 145 175 98 210 96 L300 96', false, { x: 205, y: 96 }) + car(360, 95, 180, { color: COL.car2 }) +
  label(200, 30, 'Vạch vàng liền: không được đè, không được lấn sang để vượt') + dirTags, 'Vạch vàng liền');

D.m_yellow_dash = () => svg(
  twoWay({ dash: true }) + truck(230, 145, 0, { label: 'XE TẢI' }) + car(110, 145, 0) +
  path('M130 145 C165 145 170 96 205 96 L285 96 C315 96 320 145 350 145', true, { x: 240, y: 96 }) +
  label(200, 30, 'Vạch vàng đứt: được cắt qua để vượt khi an toàn') + dirTags, 'Vạch vàng đứt');

D.m_yellow_double = () => svg(
  twoWay({ double: true }) + car(150, 145, 0) + path('M172 145 C210 145 215 96 260 96', false, { x: 225, y: 118 }) +
  car(330, 95, 180, { color: COL.car2 }) + path('M305 95 C270 95 265 145 225 145', false) +
  label(200, 30, 'Vạch vàng kép liền: cả hai chiều đều không được cắt qua') + dirTags, 'Vạch vàng kép liền');

D.m_yellow_mixed = () => svg(
  twoWay({ mixed: 'solid-top' }) + truck(130, 145, 0, { label: 'XE TẢI' }) + car(40, 145, 0) +
  path('M62 145 C85 145 90 99 115 99 L160 99 C185 99 190 145 220 145', true, { x: 140, y: 99 }) +
  truck(290, 95, 180, { color: COL.car2 }) + car(372, 95, 180) +
  path('M350 92 C332 92 330 140 300 142', false, { x: 330, y: 122 }) +
  label(200, 30, 'Liền + đứt: phía có vạch đứt được cắt qua, phía vạch liền thì không') + label(200, 214, 'làn dưới sát vạch đứt (được) · làn trên sát vạch liền (cấm)', { size: 10 }), 'Vạch vàng liền và đứt song song');

// ---- VẠCH PHÂN LÀN CÙNG CHIỀU
function threeLanes(sep) {
  const r = hroad({ y: 50, lanes: 3, lw: 46 });
  return r.svg + hline(r.y + 2, 0, 400, { width: 2 }) + hline(r.y + r.h - 2, 0, 400, { width: 2 }) +
    hline(r.y + 46, 0, 400, sep) + hline(r.y + 92, 0, 400, sep);
}
D.m_white_dash = () => svg(
  threeLanes({ dash: true }) + car(90, 119, 0) + path('M115 119 C160 119 165 73 215 73', true, { x: 165, y: 96 }) +
  car(290, 165, 0, { color: COL.car2 }) + car(310, 73, 0, { color: COL.car2 }) +
  label(200, 22, 'Vạch trắng đứt: được chuyển làn sang làn liền kề khi an toàn') + label(370, 214, 'cùng chiều →', { size: 10 }), 'Vạch trắng đứt');

D.m_white_solid = () => svg(
  threeLanes({}) + car(90, 119, 0) + path('M115 119 C160 119 165 73 215 73', false, { x: 165, y: 96 }) +
  car(260, 119, 0, { color: COL.car2 }) + path('M285 119 L360 119', true) +
  label(200, 22, 'Vạch trắng liền: không chuyển làn, đi tiếp trong làn của mình') + label(370, 214, 'cùng chiều →', { size: 10 }), 'Vạch trắng liền');

D.m_multi_lane = () => svg(
  threeLanes({ dash: true }) + car(70, 165, 0) + path('M95 165 C150 165 160 73 230 73', false, { x: 160, y: 120 }) +
  car(70, 119, 0, { color: COL.car2 }) + path('M95 119 C130 119 140 73 190 73', true) +
  label(200, 22, 'Mỗi lần chỉ chuyển sang một làn liền kề, không cắt chéo nhiều làn'), 'Chuyển nhiều làn một lúc');

// ---- NÚT GIAO: VẠCH DỪNG, VẠCH ĐI BỘ, MŨI TÊN
function junction(extra = '') {
  // đường ngang 3 làn hướng sang phải (y 70–208), đường dọc x 300–380
  let s = `<rect x="0" y="64" width="400" height="150" fill="${COL.shoulder}"/><rect x="0" y="70" width="400" height="138" fill="${COL.asphalt}"/>`;
  s += `<rect x="300" y="0" width="80" height="240" fill="${COL.asphalt}"/>`;
  s += hline(72, 0, 244, { width: 2 }) + hline(206, 0, 244, { width: 2 }) + hline(116, 0, 244, { dash: true }) + hline(162, 0, 210, { dash: true });
  s += hline(162, 210, 244, {}) + hline(116, 190, 244, {});
  s += stopLineV(246, 70, 208) + zebraV(254, 70, 208, { len: 30 });
  return s + extra;
}
D.m_stop_zebra = () => svg(junction(
  car(222, 139, 0) + okMark(222, 115) + car(268, 185, 0, { color: COL.car2 }) + noMark(268, 160) +
  label(200, 30, 'Dừng trước vạch dừng, không dừng trên vạch đi bộ') + label(340, 225, 'đèn đỏ', { size: 10 })), 'Vạch dừng và vạch đi bộ');

D.m_lane_arrows = () => svg(junction(
  laneArrow(160, 93, 'left') + laneArrow(160, 139, 'straight') + laneArrow(160, 185, 'straight-right') +
  car(70, 93, 0) + path('M95 93 L240 93 L290 93', false, { x: 220, y: 93 }) +
  car(70, 185, 0, { color: COL.car2 }) + path('M95 185 L230 185 C290 185 310 200 320 232', true) +
  label(200, 30, 'Đã vào làn nào thì đi theo hướng mũi tên của làn đó')), 'Mũi tên chỉ hướng trên làn');

// ---- VÙNG CẤM: VẠCH CHÉO, Ô VÀNG
D.m_hatch = () => {
  let s = `<rect x="0" y="40" width="400" height="160" fill="${COL.shoulder}"/><rect x="0" y="46" width="400" height="148" fill="${COL.asphalt}"/>`;
  s += hline(48, 0, 400, { width: 2 }) + hline(192, 0, 400, { width: 2 }) + hline(96, 0, 400, { dash: true });
  s += hatch([[150, 144], [400, 120], [400, 168]]);
  s += hline(144, 0, 150, { dash: true });
  s += car(70, 120, 0) + path('M95 120 C150 120 200 140 260 144 L330 144', false, { x: 265, y: 144 });
  s += car(70, 168, 0, { color: COL.car2 }) + path('M95 168 L360 176', true);
  s += label(200, 22, 'Vạch chéo (vùng cấm): không được đi vào, không dừng đỗ trên vạch') + label(330, 212, 'nhánh rẽ phải', { size: 10 });
  return svg(s, 'Vạch chéo vùng cấm');
};

D.m_box = () => {
  let s = `<rect x="0" y="80" width="400" height="80" fill="${COL.asphalt}"/><rect x="160" y="0" width="80" height="240" fill="${COL.asphalt}"/>`;
  s += boxJunction(162, 82, 76, 76);
  s += car(80, 140, 0) + okMark(80, 115) + car(200, 140, 0, { color: COL.car2 }) + noMark(200, 115);
  s += car(330, 140, 0, { color: COL.car2 }) + car(390, 140, 0, { color: COL.car2 });
  s += label(200, 24, 'Ô vàng kẻ chéo: chỉ đi vào khi chắc chắn ra hết khỏi ô') + label(330, 180, 'xe phía trước đang dừng', { size: 10 });
  return svg(s, 'Ô vàng kẻ chéo');
};

D.m_bus_lane = () => {
  const r = hroad({ y: 60, lanes: 3, lw: 46 });
  let s = r.svg + hline(62, 0, 400, { width: 2 }) + hline(196, 0, 400, { width: 2 }) + hline(106, 0, 400, { dash: true }) + hline(152, 0, 400, { color: COL.yellow, width: 4 });
  s += `<text x="230" y="174" font-family="Arial" font-size="16" font-weight="700" fill="${COL.yellow}" text-anchor="middle" dominant-baseline="central">BUS</text>`;
  s += bus(110, 174, 0, { label: 'BUÝT' }) + car(320, 174, 0) + noMark(320, 150) + car(300, 128, 0, { color: COL.car2 }) + okMark(300, 104);
  s += label(200, 24, 'Làn dành riêng: xe khác không đi vào (theo biển, vạch và giờ áp dụng)');
  return svg(s, 'Làn dành riêng xe buýt');
};

D.m_edge = () => {
  let s = `<rect x="0" y="150" width="400" height="40" fill="${COL.shoulder}"/><rect x="0" y="50" width="400" height="100" fill="${COL.asphalt}"/>`;
  s += hline(100, 0, 400, { color: COL.yellow, dash: true }) + hline(147, 0, 400, { width: 3 });
  s += car(70, 125, 0) + path('M95 125 C150 125 165 168 220 168', true) + car(300, 168, 0) + okMark(300, 142);
  s += label(200, 24, 'Vạch mép đường (trắng liền): giới hạn phần xe chạy') + label(330, 205, 'lề đường', { size: 10 });
  return svg(s, 'Vạch mép phần đường xe chạy');
};


D.m_curb = () => {
  let s = `<rect x="0" y="40" width="400" height="34" fill="#B9B4A8"/><rect x="0" y="74" width="400" height="120" fill="${COL.asphalt}"/><rect x="0" y="194" width="400" height="30" fill="#B9B4A8"/>`;
  s += `<rect x="0" y="72" width="400" height="4" fill="#ddd"/><rect x="0" y="192" width="400" height="4" fill="#ddd"/>`;
  s += hline(134, 0, 400, { color: COL.yellow, dash: true });
  s += hline(80, 0, 400, { color: COL.yellow, width: 4 }) + hline(188, 0, 200, { color: COL.yellow, width: 4, dash: '14 10' });
  s += car(110, 170, 0) + okMark(110, 146) + label(150, 212, 'vạch vàng đứt sát lề (6.1): được dừng, cấm đỗ', { size: 9.5 });
  s += car(300, 98, 180, { color: COL.car2 }) + noMark(300, 122) + label(270, 56, 'vạch vàng liền sát lề (6.2): cấm dừng và đỗ', { size: 9.5 });
  s += label(200, 18, 'Vạch vàng trên mép bó vỉa: báo cấm dừng, đỗ bên đường');
  return svg(s, 'Vạch cấm dừng, cấm đỗ');
};
D.m_giveway = () => {
  let s = `<rect x="0" y="120" width="400" height="80" fill="${COL.asphalt}"/><rect x="150" y="0" width="80" height="240" fill="${COL.asphalt}"/>`;
  s += hline(160, 0, 400, { color: COL.yellow, dash: true });
  // đường nhánh đi xuống từ trên, vạch nhường đường tại y=112
  s += `<line x1="150" y1="112" x2="230" y2="112" stroke="${COL.white}" stroke-width="3" stroke-dasharray="8 6"/><line x1="150" y1="104" x2="230" y2="104" stroke="${COL.white}" stroke-width="3" stroke-dasharray="8 6"/>`;
  s += `<path d="M168 70 L212 70 L190 96 Z" fill="none" stroke="${COL.white}" stroke-width="3"/>`;
  s += car(190, 40, 90) + path('M190 62 L190 92', true) + okMark(214, 86);
  s += car(330, 180, 180, { color: COL.car2 }) + path('M300 180 L250 180', true);
  s += label(310, 100, 'dừng hoặc đi chậm,', { size: 10 }) + label(310, 116, 'nhường xe trên đường chính', { size: 10 });
  s += label(200, 225, 'Vạch nhường đường (7.2) + tam giác ngược, thường kèm biển W.208', { size: 10 });
  return svg(s, 'Vạch nhường đường');
};
D.m_zigzag = () => {
  let s = `<rect x="0" y="40" width="400" height="30" fill="#B9B4A8"/><rect x="0" y="70" width="400" height="140" fill="${COL.asphalt}"/>`;
  let z = 'M60 76'; for (let x = 60; x < 340; x += 20) z += ` L${x + 10} 100 L${x + 20} 76`;
  s += `<path d="${z}" stroke="${COL.yellow}" stroke-width="3" fill="none"/><line x1="60" y1="76" x2="340" y2="76" stroke="${COL.yellow}" stroke-width="3"/>`;
  s += bus(200, 90, 180, { label: 'BUÝT' }) + car(380, 92, 180, { color: COL.car2 }) + noMark(380, 118);
  s += hline(140, 0, 400, { color: COL.yellow, dash: true });
  s += label(200, 22, 'Vạch zigzag (9.2): điểm dừng xe buýt, taxi') + label(200, 190, 'xe khác không dừng, đỗ trong phạm vi vạch và 15 m hai đầu', { size: 10 });
  return svg(s, 'Vạch zigzag điểm dừng xe buýt');
};
D.x_red_arrow = () => {
  let s = `<rect x="0" y="80" width="400" height="120" fill="${COL.asphalt}"/><rect x="280" y="0" width="80" height="240" fill="${COL.asphalt}"/>`;
  s += hline(140, 0, 260, { dash: true }) + stopLineV(262, 80, 200);
  s += car(220, 170, 0) + path('M245 170 C290 170 310 190 318 232', true, { x: 300, y: 196 });
  s += car(220, 110, 0, { color: COL.car2 }) + noMark(250, 110);
  s += `<g transform="translate(40 18)"><rect x="0" y="0" width="96" height="40" rx="6" fill="#111"/><circle cx="20" cy="20" r="12" fill="#E0302A"/><circle cx="48" cy="20" r="12" fill="#333"/><g transform="translate(76 20)"><circle r="12" fill="#1FA34A"/><path d="M-6 -2 L2 -2 L2 -6 L8 0 L2 6 L2 2 L-6 2 Z" fill="#111"/></g></g>`;
  s += label(200, 225, 'Đèn đỏ + mũi tên xanh rẽ phải: rẽ phải được, nhưng nhường xe đang được đi', { size: 9.5 });
  return svg(s, 'Mũi tên xanh cùng đèn đỏ');
};


D.x_parked_solid = () => svg(
  twoWay({}) + car(250, 145, 0, { color: COL.car2 }) + `<circle cx="226" cy="137" r="3.5" fill="#FFB000"/><circle cx="226" cy="153" r="3.5" fill="#FFB000"/>` +
  car(120, 145, 0) + path('M142 145 C180 145 185 98 225 96 L300 96 C330 96 335 145 360 145', false, { x: 250, y: 96 }) + okMark(150, 120) +
  label(200, 30, 'Xe đỗ chắn làn, vạch vàng liền: dừng chờ, không lấn vạch') + label(120, 185, 'dừng chờ phía sau', { size: 10 }) + dirTags, 'Xe đỗ chắn làn trên đường vạch liền');

D.x_emergency_red = () => {
  let s = `<rect x="0" y="80" width="400" height="120" fill="${COL.asphalt}"/><rect x="290" y="0" width="80" height="240" fill="${COL.asphalt}"/>`;
  s += hline(140, 0, 270, { dash: true }) + stopLineV(272, 80, 200);
  s += car(248, 170, 0) + path('M262 176 C278 184 282 190 292 192', true) + car(312, 190, 8, { color: '#2F6DB5' });
  s += path('M338 194 L396 194', false, { x: 372, y: 174 });
  s += car(150, 140, 0, { color: '#F2F2F2', label: '+' }) + `<rect x="138" y="128" width="8" height="4" fill="#E0302A"/><rect x="138" y="148" width="8" height="4" fill="#2F6DB5"/>`;
  s += path('M176 136 L380 120', true, { x: 225, y: 118 });
  s += `<g transform="translate(40 18)"><rect x="0" y="0" width="70" height="30" rx="5" fill="#111"/><circle cx="16" cy="15" r="9" fill="#E0302A"/><circle cx="35" cy="15" r="9" fill="#333"/><circle cx="54" cy="15" r="9" fill="#333"/></g>`;
  s += label(150, 175, 'xe cứu thương', { size: 9.5 });
  s += label(200, 225, 'Nhích qua vạch dừng, ép sát lề phải mở đường; không đi tiếp qua giao lộ khi đèn còn đỏ', { size: 9 });
  return svg(s, 'Nhường xe ưu tiên khi đèn đỏ');
};

D.x_turn_right_moto = () => {
  let s = `<rect x="0" y="70" width="400" height="110" fill="${COL.asphalt}"/><rect x="250" y="70" width="80" height="170" fill="${COL.asphalt}"/>`;
  s += hline(72, 0, 250, { width: 2 }) + hline(178, 0, 250, { width: 2 }) + hline(125, 0, 230, { dash: true });
  s += car(160, 145, 0) + path('M184 147 C226 150 252 166 262 226', false, { x: 236, y: 156 });
  s += `<g transform="translate(200 167)"><rect x="-15" y="-5" width="30" height="10" rx="5" fill="#111"/><circle cx="-10" cy="0" r="3.5" fill="#999"/><circle cx="10" cy="0" r="3.5" fill="#999"/></g>` + path('M218 167 L330 167', true);
  s += label(200, 200, 'xe máy đi thẳng sát lề', { size: 10 });
  s += label(200, 30, 'Rẽ phải: ép sát lề từ sớm; xe máy đã ở bên phải thì chờ nó đi qua');
  return svg(s, 'Rẽ phải khi có xe máy đi thẳng');
};

D.x_bus_dash_turn = () => {
  let s = `<rect x="0" y="60" width="400" height="140" fill="${COL.asphalt}"/><rect x="300" y="60" width="80" height="180" fill="${COL.asphalt}"/>`;
  s += hline(62, 0, 300, { width: 2 }) + hline(108, 0, 300, { dash: true }) + hline(152, 0, 180, { color: COL.yellow, width: 4 }) + hline(152, 180, 290, { color: COL.yellow, width: 4, dash: '14 10' });
  s += `<text x="110" y="176" font-family="Arial" font-size="15" font-weight="700" fill="${COL.yellow}" text-anchor="middle" dominant-baseline="central">BUS</text>`;
  s += car(60, 130, 0) + path('M85 130 L180 130 C220 130 225 176 255 176 C290 176 305 200 312 236', true, { x: 230, y: 152 });
  s += noMark(150, 152);
  s += label(200, 30, 'Làn buýt: chỉ nhập vào ở đoạn vạch đứt trước nút giao, nhường xe buýt') + label(110, 212, 'nét liền: cấm vào', { size: 10 }) + label(240, 212, 'nét đứt: được vào', { size: 10 });
  return svg(s, 'Nhập làn xe buýt để rẽ phải');
};

D.x_yield_right = () => {
  let s = `<rect x="0" y="90" width="400" height="70" fill="${COL.asphalt}"/><rect x="165" y="0" width="70" height="240" fill="${COL.asphalt}"/>`;
  s += car(90, 140, 0) + path('M112 140 L150 140', false, { x: 132, y: 116 });
  s += car(212, 215, -90, { color: COL.car2 }) + path('M212 190 L212 70', true, { x: 240, y: 175 });
  s += label(90, 192, 'xe mình', { size: 10 }) + label(300, 222, 'xe đến từ bên phải đi trước', { size: 10 });
  s += label(200, 30, 'Nơi giao nhau không có báo hiệu: nhường xe đến từ bên phải');
  return svg(s, 'Nhường xe bên phải');
};

// ---- NGOẠI LỆ
D.x_pass_right = () => svg(
  twoWay({ dash: true }) + car(230, 140, -12, { color: COL.car2 }) + `<circle cx="244" cy="126" r="4" fill="#FFB000"/>` +
  car(110, 145, 0) + path('M135 150 C175 160 260 165 340 150', true, { x: 270, y: 166 }) +
  path('M250 128 C270 118 280 100 300 96', true, {}) +
  label(200, 30, 'Xe trước đang báo rẽ trái hoặc đang rẽ trái: được vượt bên phải') + dirTags, 'Vượt bên phải khi xe trước rẽ trái');

D.x_uturn_arrow = () => {
  let s = `<rect x="0" y="70" width="400" height="140" fill="${COL.asphalt}"/><rect x="0" y="134" width="300" height="10" fill="${COL.shoulder}"/>`;
  s += laneArrow(130, 160, 'left') + car(60, 160, 0) + path('M85 162 L250 162 C300 162 300 110 250 105 L150 105', true, { x: 290, y: 136 });
  s += `<g transform="translate(330 30) scale(0.42)">${SI.ICONS.p123a()}</g>` + label(330, 78, 'P.123a', { size: 10 });
  s += label(150, 30, 'Biển cấm rẽ trái không cấm quay đầu (QCVN 41:2024)');
  return svg(s, 'Quay đầu tại nơi có biển cấm rẽ trái');
};

D.x_breakdown_highway = () => {
  let s = `<rect x="0" y="40" width="400" height="160" fill="${COL.asphalt}"/><rect x="0" y="160" width="400" height="40" fill="${COL.asphalt2}"/>`;
  s += hline(42, 0, 400, { width: 2 }) + hline(100, 0, 400, { dash: true }) + hline(158, 0, 400, { width: 3 });
  s += car(330, 180, 0, { color: COL.car2 }) + `<circle cx="352" cy="172" r="4" fill="#FFB000"/><circle cx="352" cy="188" r="4" fill="#FFB000"/>`;
  s += triangleWarn(60, 180, 10) + `<line x1="72" y1="214" x2="306" y2="214" stroke="#fff" stroke-width="2"/><path d="M72 214 l8 -4 v8 z M306 214 l-8 -4 v8 z" fill="#fff"/>`;
  s += label(190, 226, 'tối thiểu 150 m (ban đêm nên xa hơn)', { size: 10 });
  s += `<rect x="360" y="196" width="34" height="4" fill="#bbb"/>` + label(375, 150, 'người đứng sau hộ lan', { size: 9, anchor: 'end' });
  s += car(150, 71, 0, { color: COL.car2 }) + car(260, 129, 0, { color: COL.car2 });
  s += label(200, 20, 'Hỏng xe trên cao tốc: vào làn khẩn cấp, bật đèn khẩn cấp');
  return svg(s, 'Xe hỏng trên cao tốc');
};

D.x_accident_scene = () => {
  let s = `<rect x="0" y="60" width="400" height="120" fill="${COL.asphalt}"/>` + hline(120, 0, 400, { color: COL.yellow, dash: true });
  s += car(250, 150, 10) + car(296, 146, 190, { color: COL.car2 });
  s += triangleWarn(120, 150, 9) + label(110, 196, 'biển cảnh báo', { size: 10 });
  [[218, 136], [330, 160], [270, 166], [240, 132]].forEach(([x, y]) => { s += `<path d="M${x - 6} ${y} L${x + 6} ${y} M${x} ${y - 6} L${x} ${y + 6}" stroke="#FFEB3B" stroke-width="3"/>`; });
  s += label(290, 205, 'dấu + : đánh dấu vị trí bánh xe', { size: 10 });
  s += label(200, 22, 'Giữ nguyên hiện trường, cảnh báo phía sau, chụp ảnh từ nhiều góc');
  s += `<g transform="translate(40 70)"><rect x="-22" y="-14" width="44" height="28" rx="4" fill="#fff"/><circle cx="0" cy="0" r="8" fill="none" stroke="#111" stroke-width="3"/><rect x="-14" y="-18" width="10" height="5" fill="#fff"/></g>` + label(40, 100, 'ảnh 4 góc', { size: 9 });
  return svg(s, 'Hiện trường va chạm');
};

// Biển chính + biển phụ ghép
function signStack(mainKey, plate, { plateW = 120 } = {}) {
  const main = SI.ICONS[mainKey]();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" role="img" aria-label="${mainKey}"><rect width="160" height="200" fill="none"/><line x1="80" y1="150" x2="80" y2="200" stroke="#888" stroke-width="5"/><g transform="translate(30 4)">${main}</g><g transform="translate(${80 - plateW / 2} 112)">${plate}</g></svg>`;
}
const plateBox = (w, h, inner) => `<rect x="0" y="0" width="${w}" height="${h}" fill="#fff" stroke="#111" stroke-width="3"/>${inner}`;
const plateText = (t, w = 120, h = 40, size = 18) => plateBox(w, h, `<text x="${w / 2}" y="${h / 2 + 1}" font-family="Arial" font-size="${size}" font-weight="700" fill="#111" text-anchor="middle" dominant-baseline="central">${t}</text>`);
const plateArrow = (dir) => {
  const w = 120, h = 40;
  const a = (x1, x2) => `<line x1="${x1}" y1="20" x2="${x2}" y2="20" stroke="#111" stroke-width="5"/>`;
  const hd = (x, r) => `<path d="M0 -9 L14 0 L0 9 Z" fill="#111" transform="translate(${x} 20) rotate(${r})"/>`;
  let g = '';
  if (dir === 'both') g = a(22, 98) + hd(98, 0) + hd(22, 180);
  if (dir === 'right') g = a(18, 96) + hd(96, 0);
  if (dir === 'left') g = a(24, 102) + hd(24, 180);
  if (dir === 'start-right') g = `<line x1="16" y1="8" x2="16" y2="32" stroke="#111" stroke-width="5"/>` + a(16, 96) + hd(96, 0);
  return plateBox(w, h, g);
};
const plateTruck = () => plateBox(120, 40, `<g transform="translate(60 20) scale(1.1)" fill="#111"><rect x="-18" y="-12" width="22" height="18"/><path d="M5 -6 L13 -6 L18 1 L18 6 L5 6 Z"/><circle cx="-11" cy="9" r="4"/><circle cx="11" cy="9" r="4"/></g>`);
const plateCarCross = () => plateBox(120, 40, `<text x="36" y="14" font-family="Arial" font-size="10" font-weight="700" fill="#111" text-anchor="middle" dominant-baseline="central">Except</text><text x="36" y="28" font-family="Arial" font-size="10" font-weight="700" fill="#111" text-anchor="middle" dominant-baseline="central">Ngoại lệ</text><rect x="72" y="10" width="38" height="20" rx="3" fill="#111"/><text x="91" y="21" font-family="Arial" font-size="9" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="central">BUS</text>`);

const STACKS = {
  s_time: () => signStack('p131a', plateText('6h–9h, 16h–19h', 120, 40, 15)),
  s_dist: () => signStack('w205', plateText('150 m')),
  s_range: () => signStack('p125', plateText('500 m')),
  s_both: () => signStack('p131a', plateArrow('both')),
  s_start: () => signStack('p130', plateArrow('start-right')),
  s_truck: () => signStack('p103', plateTruck()),
  s_except: () => signStack('p103', plateCarCross()),
  s_speedtime: () => signStack('p127', plateText('22h–5h', 120, 40, 17)),
};

module.exports = { D, STACKS };
