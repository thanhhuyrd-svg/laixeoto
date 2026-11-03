const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, HeadingLevel, BorderStyle, LevelFormat, PageBreak, ImageRun, Header, Footer,
  PageNumber, TableOfContents, VerticalAlign, TableLayoutType,
} = require('docx');
const D = require('./data.js');

const OUT = process.argv[2] || path.join(__dirname, 'out.docx');
const PNG = (k) => fs.readFileSync(path.join(__dirname, 'png', k + '.png'));

// ---- Palette & sizes
const C = {
  ink: '1B2430', navy: '123B5E', teal: '0E6E6E', amber: 'B26A00', red: 'B3261E', green: '2E7D32',
  head: 'E3ECF3', zebra: 'F5F8FA', line: 'C9D3DC', soft: 'EEF5F4', warnBg: 'FFF4E0', redBg: 'FDECEA',
};
const FONT = 'Arial';
const PAGE_W = 11906, MARGIN = 1134; // A4, lề 2 cm
const TW = PAGE_W - 2 * MARGIN; // 9638

// ---- Helpers
let listInstance = 0;
const run = (t, o = {}) => new TextRun({ text: t, font: FONT, ...o });
const P = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [run(children)], spacing: { after: 100, line: 300 }, ...o });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [run(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [run(t)] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [run(t)] });
const src = (t) => P([run('Căn cứ: ', { italics: true, color: '5A6672', size: 18 }), run(t, { italics: true, color: '5A6672', size: 18 })], { spacing: { after: 160 } });
const bullet = (t, lvl = 0) => new Paragraph({ numbering: { reference: 'bul', level: lvl }, spacing: { after: 60, line: 290 }, children: Array.isArray(t) ? t : [run(t)] });
function numbered(items) {
  listInstance += 1;
  const inst = listInstance;
  return items.map((t) => new Paragraph({ keepNext: true, keepLines: true, numbering: { reference: 'num', level: 0, instance: inst }, spacing: { after: 60, line: 290 }, children: [run(t)] }));
}
function checklist(items) {
  return items.map((t) => P([run('☐  ', { size: 22 }), run(t)], { spacing: { after: 60 }, indent: { left: 200 } }));
}

const border = { style: BorderStyle.SINGLE, size: 4, color: C.line };
const borders = { top: border, bottom: border, left: border, right: border };

function cell(content, w, o = {}) {
  const kids = (Array.isArray(content) ? content : [content]).map((c) =>
    c instanceof Paragraph ? c : new Paragraph({ spacing: { after: 40, line: 270 }, alignment: o.align || AlignmentType.LEFT, children: typeof c === 'string' ? [run(c, { bold: !!o.bold, color: o.color, size: o.size || 19 })] : [c] }));
  return new TableCell({
    children: kids, width: { size: w, type: WidthType.DXA }, borders,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 }, verticalAlign: o.valign || VerticalAlign.TOP,
    columnSpan: o.span,
  });
}

function table(headers, rows, widths, opts = {}) {
  const sum = widths.reduce((a, b) => a + b, 0);
  const scale = TW / sum;
  const W = widths.map((w) => Math.round(w * scale));
  W[W.length - 1] += TW - W.reduce((a, b) => a + b, 0);
  const head = new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, W[i], { bold: true, fill: C.head, color: C.navy, size: 19 })) });
  const body = rows.map((r, ri) => new TableRow({
    cantSplit: true,
    children: r.map((c, i) => {
      const o = { fill: ri % 2 ? C.zebra : undefined, size: 19 };
      if (opts.boldFirst && i === 0) o.bold = true;
      if (opts.center && opts.center.includes(i)) o.align = AlignmentType.CENTER;
      if (opts.cellStyle) Object.assign(o, opts.cellStyle(ri, i, c) || {});
      return cell(c, W[i], o);
    }),
  }));
  return new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: W, rows: [head, ...body], layout: TableLayoutType.FIXED });
}

function callout(title, lines, kind = 'info') {
  const fill = kind === 'warn' ? C.warnBg : kind === 'danger' ? C.redBg : C.soft;
  const color = kind === 'warn' ? C.amber : kind === 'danger' ? C.red : C.teal;
  const kids = [new Paragraph({ spacing: { after: 60 }, children: [run(title, { bold: true, color, size: 20 })] }),
    ...lines.map((l) => new Paragraph({ spacing: { after: 40, line: 280 }, children: [run(l, { size: 19 })] }))];
  const b = { style: BorderStyle.SINGLE, size: 18, color };
  const n = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return new Table({
    width: { size: TW, type: WidthType.DXA }, columnWidths: [TW],
    rows: [new TableRow({ children: [new TableCell({ children: kids, width: { size: TW, type: WidthType.DXA }, borders: { left: b, top: n, bottom: n, right: n }, shading: { fill, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 120, bottom: 120, left: 200, right: 160 } })] })],
  });
}
const gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });
const img = (k, w = 42, h = 42) => new ImageRun({ type: 'png', data: PNG(k), transformation: { width: w, height: h }, altText: { title: k, description: 'Minh họa biển ' + k, name: k } });

// ---- Content
const body = [];

// Bìa
body.push(
  new Paragraph({ spacing: { before: 1800, after: 200 }, children: [run('SỔ TAY', { bold: true, size: 36, color: C.teal, characterSpacing: 60 })] }),
  new Paragraph({ spacing: { after: 240 }, children: [run('LÁI XE Ô TÔ CHO NGƯỜI MỚI', { bold: true, size: 56, color: C.navy })] }),
  new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.teal, space: 8 } }, spacing: { after: 300 }, children: [run('Kỹ thuật lái và căn xe · Biển báo, vạch kẻ, đèn tín hiệu · Mức phạt và điểm GPLX · Kinh nghiệm an toàn', { size: 24, color: C.ink })] }),
  P([run('Cập nhật: ', { bold: true }), run(D.META.updated)]),
  P([run('Phạm vi: ', { bold: true }), run(D.META.scope)]),
  P([run('Văn bản áp dụng: ', { bold: true }), run('Luật 36/2024/QH15 · NĐ 168/2024/NĐ-CP · NĐ 238/2026/NĐ-CP (từ 15/8/2026) · TT 38/2024/TT-BGTVT · QCVN 41:2024/BGTVT · Giáo trình Kỹ thuật lái xe ô tô (Tổng cục Đường bộ Việt Nam, 2018).')]),
  gap(),
  table(['Ký hiệu trong sổ tay', 'Ý nghĩa'], [
    ['Căn cứ: Luật 36 Đ13', 'Nội dung lấy từ văn bản pháp luật hoặc giáo trình chính thức; có thể tra lại đúng điều khoản.'],
    ['Kinh nghiệm', 'Mẹo thực hành, không phải quy định pháp luật. Áp dụng có cân nhắc theo xe và hoàn cảnh.'],
    ['−2, −4, −6, −10', 'Số điểm bị trừ trên GPLX (mỗi GPLX có 12 điểm).'],
    ['MỚI', 'Nội dung sửa đổi, bổ sung bởi NĐ 238/2026/NĐ-CP, hiệu lực từ 15/8/2026.'],
  ], [2600, 7000], { boldFirst: true }),
  gap(),
  callout('Cách dùng sổ tay', [
    'Đọc tuần tự Phần A trước khi tập lái. Phần B và C dùng để tra cứu khi gặp biển lạ hoặc cần biết mức phạt.',
    'Phần D là những gì người lái lâu năm muốn dặn người mới. Trang cuối có checklist để in và để trong xe.',
    'Đi kèm sổ tay là trang Tra cứu nhanh (file HTML) có ô tìm kiếm mức phạt, dùng tốt trên điện thoại.',
  ]),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ spacing: { after: 200 }, children: [run('MỤC LỤC', { bold: true, size: 30, color: C.navy })] }),
  new TableOfContents('Mục lục', { hyperlink: true, headingStyleRange: '1-2' }),
  P([run('Nếu mục lục chưa hiện số trang: trong Word nhấn chuột phải vào mục lục, chọn "Update Field".', { italics: true, size: 17, color: '5A6672' })]),
);

// Phần 0
body.push(H1('Căn cứ pháp lý và tài liệu gốc'));
body.push(P('Toàn bộ quy định trong sổ tay được đối chiếu với các văn bản dưới đây. Khi có mâu thuẫn giữa sổ tay và văn bản gốc, văn bản gốc có giá trị.'));
body.push(table(['Văn bản', 'Số hiệu', 'Hiệu lực', 'Nội dung dùng trong sổ tay'], D.LEGAL, [2900, 1700, 1100, 3900], { boldFirst: true }));

// ===== PHẦN A
body.push(H1('Phần A. Kỹ thuật lái xe ô tô'));
body.push(P('Phần này đi theo đúng trình tự một lần lái: kiểm tra xe, ngồi vào ghế, cầm lái, khởi hành, căn đường, chuyển hướng, đỗ xe, rồi đến lái trên từng loại đường và xử lý sự cố. Các thao tác chuẩn lấy từ Giáo trình Kỹ thuật lái xe ô tô của Tổng cục Đường bộ Việt Nam (2018), phần kinh nghiệm được ghi rõ.'));

body.push(H2('A1. Kiểm tra trước khi lên xe'));
body.push(table(['Việc', 'Kiểm tra gì', 'Nguồn'], D.PRECHECK, [1800, 6000, 1600], { boldFirst: true }));

body.push(H2('A2. Tư thế ngồi, chỉnh ghế, gương và dây an toàn'));
body.push(P('Tư thế ngồi ảnh hưởng đến sức khỏe, độ chính xác thao tác và an toàn của xe. Chỉnh theo thứ tự trong bảng, khi xe đã đứng yên.'));
body.push(table(['Bước', 'Cách chỉnh đúng'], D.SEAT, [1900, 7700], { boldFirst: true }));
body.push(src('Giáo trình Kỹ thuật lái xe ô tô 2018, mục 2.4'));
body.push(callout('Kinh nghiệm', [
  'Nhiều người lái lâu năm chỉnh gương hai bên ra ngoài thêm một chút để gương ngoài nối tiếp vùng nhìn của gương trong, giảm điểm mù. Cách nào cũng vậy, vẫn phải quay đầu nhìn điểm mù trước khi chuyển làn.',
  'Cài dây an toàn trước khi khởi động và yêu cầu mọi người trên xe cùng thắt. Không thắt dây: 800 nghìn – 1 triệu cho mỗi lỗi (NĐ 168 Đ6 k3k, k3l).',
]));

body.push(H2('A3. Cầm vô lăng và đánh lái'));
body.push(table(['Nội dung', 'Cách làm', 'Nguồn'], D.STEERING, [2100, 6100, 1400], { boldFirst: true }));
body.push(gap());
body.push(callout('Sai lầm hay gặp của người mới', [
  'Cầm một tay hoặc cầm ở 12 giờ: khi cần tránh gấp không đủ lực và tầm đánh lái.',
  'Luồn tay vào trong vành vô lăng để quay: túi khí bung hoặc vô lăng giật có thể gây chấn thương tay.',
  'Nhìn sát đầu xe: xe sẽ lắc. Nhìn xa phía trước, xe tự đi thẳng hơn.',
], 'warn'));

body.push(H2('A4. Chân ga, phanh, ly hợp và cần số'));
body.push(table(['Bộ phận', 'Thao tác đúng'], D.PEDALS, [1900, 7700], { boldFirst: true }));
body.push(src('Giáo trình mục 2.6–2.8; dòng "Xe số tự động" là kinh nghiệm phổ biến'));
body.push(H3('Cần số tự động'));
body.push(table(['Vị trí', 'Dùng khi nào'], D.GEARS_AT, [1200, 8400], { boldFirst: true, center: [0] }));
body.push(src('Giáo trình mục 2.9.2'));
body.push(callout('Ghi nhớ', [
  'Gài D hoặc R xong phải giữ chặt phanh, nhìn lại đồng hồ xem đúng số chưa rồi mới cho xe lăn bánh.',
  'Đỗ xe: luôn về P và kéo phanh tay. Xuống dốc dài: dùng số 2 hoặc 1 (L) để phanh động cơ.',
], 'warn'));

body.push(H2('A5. Khởi động, khởi hành và dừng xe'));
body.push(H3('Khởi động và khởi hành'));
body.push(...numbered(D.START_STOP.start));
body.push(H3('Dừng và đỗ xe sát lề'));
body.push(...numbered(D.START_STOP.stop));
body.push(src('Giáo trình mục 2.10, 2.11; Luật 36 Đ18 k6 (bánh xe cách lề không quá 0,25 m)'));

body.push(H2('A6. Căn đường, căn xe và điểm căn'));
body.push(P('"Căn đường" là cách xác định vị trí và đường đi của xe trên mặt đường. Người lái ngồi lệch về bên trái xe, nên cảm giác "mình ở giữa" không có nghĩa là xe ở giữa. Phải dựa vào điểm chuẩn.'));
body.push(H3('Phương pháp căn đường theo giáo trình'));
body.push(table(['Kỹ thuật', 'Cách làm'], D.ALIGN_TEXTBOOK, [2400, 7200], { boldFirst: true }));
body.push(src('Giáo trình mục 3.1.2, 3.2.1'));
body.push(H3('Tự hiệu chỉnh điểm căn trên xe của mình (kinh nghiệm)'));
body.push(P('Các "điểm căn" truyền miệng như "vạch chạy vào giữa nắp capo" chỉ đúng với một mẫu xe, một chiều cao người lái và một tư thế ghế. Cách chắc chắn là tự đo trên xe của mình một lần ở bãi rộng, với một người đứng ngoài hỗ trợ. Chỉnh ghế và gương xong rồi mới đo, và lần sau phải ngồi đúng tư thế đó.'));
body.push(table(['Mốc cần biết', 'Cách tự xác định', 'Dùng khi'], D.ALIGN_CALIBRATE, [1700, 5300, 2600], { boldFirst: true }));
body.push(gap());
body.push(callout('Mẹo giữ xe giữa làn (kinh nghiệm)', [
  'Nhìn xa về giữa làn phía trước chứ không nhìn vạch sát đầu xe; tay sẽ tự chỉnh nhỏ.',
  'Kiểm tra chéo bằng gương: khoảng cách từ thân xe đến vạch ở gương trái và gương phải gần bằng nhau là xe đang ở giữa làn.',
  'Người mới thường để xe lệch về bên phải vì sợ xe ngược chiều. Sau mỗi lần dừng đèn đỏ, nhìn gương phải xem còn bao nhiêu khoảng trống.',
]));

body.push(H2('A7. Chuyển làn đường'));
body.push(...numbered(D.LANE_CHANGE));
body.push(src('Giáo trình mục 2.16; Luật 36 Đ13 k2 (mỗi lần chỉ chuyển sang một làn liền kề, phải có tín hiệu báo trước)'));
body.push(P('Chuyển từ làn nhanh sang làn chậm: giảm tốc khi chuyển, đủ khoảng trống thì nhập làn. Chuyển từ làn chậm sang làn nhanh: thấy xe đang tới ở làn trái thì không giảm tốc mà chờ xe đó đi qua rồi mới chuyển và tăng tốc.'));

body.push(H2('A8. Rẽ, vượt, quay đầu, lùi và ghép xe'));
D.MANEUVERS.forEach((m) => {
  body.push(H3(m.name));
  body.push(...numbered(m.steps));
  body.push(src(m.src));
});

body.push(H2('A9. Lái xe trên từng loại đường'));
D.ROADS.forEach((r) => {
  body.push(H3(r.name));
  r.items.forEach((t) => body.push(bullet(t)));
  body.push(src(r.src));
});

body.push(H2('A10. Xử lý sự cố và tình huống khẩn cấp'));
D.EMERGENCY.forEach((e) => {
  body.push(H3(e.name));
  body.push(...numbered(e.steps));
  body.push(src(e.src));
});

// ===== PHẦN B
body.push(H1('Phần B. Biển báo, vạch kẻ đường, đèn tín hiệu'));
body.push(H2('B1. Thứ tự hiệu lực của báo hiệu'));
body.push(P('Khi các báo hiệu ở cùng một khu vực có ý nghĩa khác nhau, chấp hành theo thứ tự từ trên xuống:'));
body.push(table(['Thứ tự', 'Loại báo hiệu', 'Ví dụ'], D.PRIORITY, [900, 4300, 4400], { center: [0] }));
body.push(src('Luật 36 Đ11 k2, k12; QCVN 41:2024 Điều 4'));

body.push(H2('B2. Hiệu lệnh của người điều khiển giao thông'));
body.push(table(['Tư thế', 'Ý nghĩa'], D.POLICE, [2800, 6800], { boldFirst: true }));
body.push(src('Luật 36 Đ11 k3'));

body.push(H2('B3. Đèn tín hiệu giao thông'));
body.push(table(['Tín hiệu', 'Ý nghĩa'], D.LIGHTS, [2500, 7100], { boldFirst: true }));
body.push(src('Luật 36 Đ11 k4; QCVN 41:2024 Điều 6'));
body.push(callout('Lưu ý', ['Vượt đèn đỏ hoặc không chấp hành đèn: 18–20 triệu, trừ 4 điểm (NĐ 168 Đ6 k9b). Đèn vàng không phải "đèn tăng tốc": nếu chưa đến vạch dừng thì phải dừng.'], 'danger'));

body.push(H2('B4. Đọc biển theo hình dạng và màu sắc'));
const grpIcon = { 'Biển báo cấm': 'p123a', 'Biển hiệu lệnh': 'r301a', 'Biển nguy hiểm và cảnh báo': 'w205', 'Biển chỉ dẫn': 'i408', 'Biển phụ, biển viết bằng chữ': 'aux' };
{
  const W = [1100, 1900, 1300, 2900, 2438];
  const head = new TableRow({ tableHeader: true, children: ['Mẫu', 'Nhóm biển', 'Mã', 'Hình dạng, màu sắc', 'Ý nghĩa'].map((h, i) => cell(h, W[i], { bold: true, fill: C.head, color: C.navy })) });
  const rows = D.SIGN_GROUPS.map((g, ri) => new TableRow({
    cantSplit: true,
    children: [
      cell(new Paragraph({ alignment: AlignmentType.CENTER, children: [grpIcon[g[0]] === 'aux' ? img('aux', 50, 25) : img(grpIcon[g[0]], 40, 40)] }), W[0], { fill: ri % 2 ? C.zebra : undefined, valign: VerticalAlign.CENTER }),
      cell(g[0], W[1], { bold: true, fill: ri % 2 ? C.zebra : undefined }),
      cell(g[1], W[2], { fill: ri % 2 ? C.zebra : undefined }),
      cell(g[2], W[3], { fill: ri % 2 ? C.zebra : undefined }),
      cell(g[3], W[4], { fill: ri % 2 ? C.zebra : undefined }),
    ],
  }));
  body.push(new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: W, rows: [head, ...rows], layout: TableLayoutType.FIXED }));
}
body.push(src('Luật 36 Đ11 k5; QCVN 41:2024 Điều 11, 22, 41'));

body.push(H2('B5. Hiệu lực và phạm vi của biển báo cấm'));
body.push(P('Đây là phần người mới hay nhầm nhất: một biển cấm có hiệu lực từ đâu, đến đâu, cho làn nào.'));
body.push(table(['Trường hợp', 'Quy tắc', 'Điều'], D.SIGN_SCOPE, [2400, 6100, 1100], { boldFirst: true }));
body.push(src('QCVN 41:2024/BGTVT Điều 15, 26'));

body.push(H2('B6. Biển phụ và cách đọc biển kết hợp'));
body.push(P('Biển phụ đặt ngay dưới biển chính để thu hẹp hoặc nói rõ phạm vi áp dụng. Đọc biển chính trước, sau đó đọc biển phụ để biết áp dụng cho ai, lúc nào, ở đâu, bao xa.'));
body.push(table(['Mã', 'Tên biển phụ', 'Tác dụng'], D.AUX_SIGNS, [1500, 3000, 5100], { boldFirst: true }));
body.push(src('QCVN 41:2024/BGTVT Điều 41'));
body.push(H3('Ví dụ đọc biển kết hợp'));
[
  ['P.131a + S.508 "6h–9h, 16h–19h"', 'Chỉ cấm đỗ trong hai khung giờ đó; ngoài giờ được đỗ (nếu không có cấm khác).'],
  ['P.103a + S.508 "6h–20h"', 'Ô tô không được đi vào đường đó từ 6h đến 20h. Đi vào trong giờ cấm: 4–6 triệu, trừ 2 điểm.'],
  ['P.106a + S.505a có hình xe tải', 'Biển phụ loại xe chỉ rõ đối tượng; ô tô con không bị cấm.'],
  ['W.205a + S.502 "150 m"', 'Còn 150 m nữa đến nơi giao nhau: bắt đầu giảm tốc, chọn làn.'],
  ['P.127 "60" đặt trước một ngã tư', 'Giới hạn 60 km/h hết hiệu lực ở nơi giao nhau tiếp theo nếu không có biển nhắc lại; sau đó áp dụng tốc độ mặc định theo khu vực.'],
  ['P.123a trên giá long môn, chỉ phía trên làn trái', 'Chỉ làn đó bị cấm rẽ trái. Biển trên làn có hiệu lực cho làn được chỉ.'],
  ['P.123a ở ngã tư, không có P.124', 'Cấm rẽ trái nhưng vẫn được quay đầu (nếu không có biển, vạch hay đèn cấm khác).'],
].forEach(([a, b]) => body.push(bullet([run(a + ': ', { bold: true }), run(b)])));

body.push(H2('B7. Biển báo thường gặp'));
body.push(P('Hình là minh họa giản lược theo hình dạng, màu sắc của QCVN 41:2024 để nhận diện nhanh; biển thật có thể khác chi tiết.'));
const signGroups = [['P', 'Biển báo cấm và hết cấm'], ['R', 'Biển hiệu lệnh'], ['W', 'Biển nguy hiểm và cảnh báo'], ['I', 'Biển chỉ dẫn']];
signGroups.forEach(([g, title]) => {
  body.push(H3(title));
  const W = [900, 1100, 2300, 3200, 2138];
  const head = new TableRow({ tableHeader: true, children: ['Biển', 'Mã', 'Tên', 'Ý nghĩa', 'Vi phạm thường gặp'].map((h, i) => cell(h, W[i], { bold: true, fill: C.head, color: C.navy })) });
  const list = D.SIGNS.filter((s) => (g === 'P' ? (s[5] === 'P' || s[5] === 'DP') : s[5] === g));
  const rows = list.map((s, ri) => {
    const f = ri % 2 ? C.zebra : undefined;
    return new TableRow({
      cantSplit: true,
      children: [
        cell(new Paragraph({ alignment: AlignmentType.CENTER, children: [img(s[4], 38, 38)] }), W[0], { fill: f, valign: VerticalAlign.CENTER }),
        cell(s[0], W[1], { bold: true, fill: f }), cell(s[1], W[2], { fill: f }), cell(s[2], W[3], { fill: f }), cell(s[3] || '—', W[4], { fill: f }),
      ],
    });
  });
  body.push(new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: W, rows: [head, ...rows], layout: TableLayoutType.FIXED }));
});
body.push(src('QCVN 41:2024/BGTVT; mức phạt theo NĐ 168/2024/NĐ-CP Điều 6'));

body.push(H2('B8. Vạch kẻ đường'));
body.push(table(['Loại vạch', 'Ý nghĩa và cách chấp hành'], D.MARKINGS, [3000, 6600], { boldFirst: true }));
body.push(src('QCVN 41:2024 Điều 49–50 (nguyên tắc chung); chi tiết từng vạch tại Phụ lục G của quy chuẩn. Không chấp hành vạch kẻ: 400–600 nghìn (NĐ 168 Đ6 k1a)'));

body.push(H2('B9. Quy tắc nhường đường'));
body.push(table(['Tình huống', 'Phải nhường ai'], D.YIELD_RULES, [3800, 5800], { boldFirst: true }));
body.push(src('Luật 36 Đ15 k3, Đ17, Đ22; QCVN 41:2024 Điều 7'));
body.push(P('Thứ tự đường ưu tiên theo QCVN 41:2024 Điều 5: đường cao tốc, quốc lộ, đường đô thị, đường tỉnh, đường huyện, đường xã, đường thôn, đường chuyên dùng.'));

body.push(H2('B10. Tốc độ tối đa và khoảng cách an toàn'));
body.push(P('Áp dụng khi đoạn đường không có biển báo tốc độ. Có biển thì làm theo biển. Khu đông dân cư bắt đầu từ biển R.420 và kết thúc ở biển R.421.'));
body.push(H3('Trong khu đông dân cư (trừ cao tốc)'));
body.push(table(['Phạm vi', 'Đường đôi; một chiều từ 2 làn (km/h)', 'Đường hai chiều; một chiều 1 làn (km/h)', 'Áp dụng'], D.SPEED_IN, [2300, 1900, 1900, 3500], { center: [1, 2], cellStyle: (r, i) => (i === 1 || i === 2 ? { bold: true, size: 22 } : null) }));
body.push(H3('Ngoài khu đông dân cư (trừ cao tốc)'));
body.push(table(['Loại xe', 'Đường đôi; một chiều từ 2 làn (km/h)', 'Đường hai chiều; một chiều 1 làn (km/h)'], D.SPEED_OUT, [5000, 2300, 2300], { center: [1, 2], cellStyle: (r, i) => (r === 0 && i > 0 ? { bold: true, size: 22, color: C.teal } : null) }));
body.push(P([run('Đường cao tốc: ', { bold: true }), run('tối đa 120 km/h, tối thiểu 60 km/h; trị số cụ thể theo biển trên từng tuyến, từng làn (TT 38 Điều 9).')]));
body.push(H3('Khoảng cách an toàn tối thiểu (đường khô ráo, tầm nhìn tốt)'));
body.push(table(['Tốc độ lưu hành (km/h)', 'Khoảng cách tối thiểu (m)'], D.DISTANCE, [4800, 4800], { center: [0, 1] }));
body.push(src('Thông tư 38/2024/TT-BGTVT Điều 6, 9, 11. Dưới 60 km/h tự giữ khoảng cách phù hợp. Mưa, sương mù, đường trơn, đèo dốc phải giãn xa hơn.'));
body.push(callout('Mẹo ước lượng (kinh nghiệm)', [
  'Trên nhiều tuyến cao tốc có cụm biển "0 m – 50 m – 100 m" để canh cự ly.',
  'Không có biển: dùng quy tắc 3 giây (mưa 4 giây). Ở 100 km/h xe đi khoảng 28 m mỗi giây, nên 3 giây ≈ 83 m; 4 giây ≈ 111 m.',
]));

// ===== PHẦN C
body.push(H1('Phần C. Mức phạt và điểm giấy phép lái xe'));
body.push(H2('C1. Nguyên tắc xử phạt cần biết'));
body.push(table(['Nguyên tắc', 'Nội dung', 'Căn cứ'], D.PENALTY_PRINCIPLES, [1900, 5900, 1800], { boldFirst: true }));
body.push(gap());
body.push(callout('Rượu bia: không có mức "uống một chút"', [
  'Luật 36 Điều 9 khoản 2 nghiêm cấm điều khiển phương tiện mà trong máu hoặc hơi thở có nồng độ cồn. Chỉ cần đo ra cồn (mức 1) đã bị phạt 6–8 triệu và trừ 4 điểm; mức 3 bị phạt 30–40 triệu và tước GPLX 22–24 tháng.',
], 'danger'));

body.push(H2('C2. Điểm giấy phép lái xe'));
body.push(table(['Vấn đề', 'Quy định', 'Căn cứ'], D.POINTS, [1900, 5900, 1800], { boldFirst: true }));

body.push(H2('C3. Bảng tra cứu mức phạt ô tô con'));
body.push(P('Mức phạt áp dụng cho cá nhân điều khiển ô tô con không kinh doanh vận tải. Cột "Trừ điểm" là số điểm bị trừ trên GPLX. Đơn vị: đồng.'));
D.FINE_GROUPS.forEach(([key, name]) => {
  body.push(H3(name));
  const rows = D.FINES.filter((f) => f[5] === key).map((f) => [
    (f[6] === 'moi' ? 'MỚI · ' : '') + f[0], f[1], f[2] ? '−' + f[2] : '—', f[3] || '—', f[4],
  ]);
  body.push(table(['Hành vi', 'Phạt tiền', 'Trừ điểm', 'Phạt bổ sung', 'Căn cứ'], rows, [4100, 1700, 800, 1200, 1800], {
    center: [2],
    cellStyle: (r, i, c) => {
      if (i === 2 && c !== '—') {
        const n = parseInt(c.replace('−', ''), 10);
        return { bold: true, color: n >= 6 ? C.red : n >= 4 ? C.amber : C.ink };
      }
      if (i === 1) return { bold: true };
      if (i === 0 && c.startsWith('MỚI')) return { color: C.teal };
      return null;
    },
  }));
});
body.push(src('NĐ 168/2024/NĐ-CP Điều 6, 13, 18, 20; sửa đổi, bổ sung bởi NĐ 238/2026/NĐ-CP (hiệu lực 15/8/2026)'));

body.push(H2('C4. Mười lỗi người mới hay mắc nhất'));
body.push(table(['Lỗi', 'Mức phạt', 'Cách tránh'], D.TOP_MISTAKES, [3300, 1700, 4600], { boldFirst: true }));
body.push(src('Mức phạt theo bảng C3; phần "Cách tránh" là kinh nghiệm'));

body.push(H2('C5. Tra cứu vi phạm và nộp phạt'));
[
  'Tra phạt nguội theo biển số trên Trang thông tin điện tử của Cục Cảnh sát giao thông (csgt.vn) và theo dõi thông báo trên ứng dụng VNeID, ứng dụng giao thông của Bộ Công an.',
  'Nộp phạt theo hướng dẫn ghi trên quyết định xử phạt (Cổng dịch vụ công hoặc kênh thanh toán được ghi). Cảnh giác tin nhắn, cuộc gọi giả danh CSGT yêu cầu chuyển tiền.',
  'Thời hiệu xử phạt là 01 năm: kiểm tra định kỳ, nhất là sau chuyến đi dài.',
].forEach((t) => body.push(bullet(t)));
body.push(src('NĐ 168 Đ4, Đ47 k8, Đ50; phần cảnh giác giả danh là kinh nghiệm'));

// ===== PHẦN D
body.push(H1('Phần D. Kinh nghiệm cho người mới lái'));
body.push(P('Phần này là kinh nghiệm thực hành của người lái lâu năm, không phải quy định pháp luật. Chỗ nào có căn cứ thì ghi kèm.'));
body.push(H2('D1. Mười hai nguyên tắc vàng'));
body.push(table(['Nguyên tắc', 'Giải thích'], D.GOLDEN, [2800, 6800], { boldFirst: true }));
body.push(src('Giáo trình chương IV, VI (điểm mù, khoảng cách, quan sát – phán đoán – xử lý, mệt mỏi); phần còn lại là kinh nghiệm'));

body.push(H2('D2. Lộ trình tập lái sau khi có bằng'));
body.push(table(['Giai đoạn', 'Nội dung tập'], D.TRAINING_PLAN, [3000, 6600], { boldFirst: true }));
body.push(src('Kinh nghiệm đào tạo; số buổi chỉ là gợi ý'));

body.push(H2('D3. Người lái xe và sự mệt mỏi'));
[
  'Nguyên nhân: ngủ không đủ, lái liên tục nhiều giờ, ngồi sai tư thế, khoang xe bí, đường đơn điệu như cao tốc, ăn quá no, dùng thuốc gây buồn ngủ.',
  'Xử lý: dừng ở nơi an toàn (trạm dừng nghỉ trên cao tốc), ra khỏi xe vận động, uống nước, chợp mắt 15–20 phút. Không dừng ở làn khẩn cấp để ngủ.',
  'Chuyến dài nên có người lái thay hoặc lên kế hoạch nghỉ sau mỗi khoảng 2 giờ.',
].forEach((t) => body.push(bullet(t)));
body.push(src('Giáo trình mục 6.2; con số 2 giờ và 15–20 phút là kinh nghiệm'));

body.push(H2('D4. Chở trẻ em an toàn'));
[
  'Trẻ dưới 10 tuổi và cao dưới 1,35 m không được ngồi cùng hàng ghế với người lái (trừ xe chỉ có một hàng ghế). Vi phạm: 800 nghìn – 1 triệu (NĐ 168 Đ6 k3m, sửa bởi NĐ 238/2026).',
  'Người lái phải sử dụng, hướng dẫn sử dụng thiết bị an toàn phù hợp cho trẻ (Luật 36 Đ10 k3). Xe cá nhân không dùng thiết bị phù hợp: phạt cảnh cáo (NĐ 238/2026).',
  'Kinh nghiệm: trẻ nhỏ ngồi ghế an toàn quay mặt về phía sau càng lâu càng tốt theo hướng dẫn nhà sản xuất ghế; không bế trẻ ngồi lòng; bật khóa trẻ em ở cửa sau; không để trẻ một mình trong xe.',
].forEach((t) => body.push(bullet(t)));

body.push(H2('D5. Checklist'));
body.push(H3('Mỗi lần lái'));
body.push(...checklist(D.CHECKLIST_DAILY));
body.push(H3('Trước chuyến đi xa'));
body.push(...checklist(D.CHECKLIST_TRIP));
body.push(H3('Số điện thoại khẩn cấp'));
body.push(table(['Số', 'Dịch vụ'], D.EMERGENCY_NUMBERS, [1500, 8100], { boldFirst: true, center: [0], cellStyle: (r, i) => (i === 0 ? { size: 26, color: C.red, bold: true } : null) }));

// ===== Phụ lục
body.push(H1('Phụ lục. Nguồn tham khảo và giới hạn'));
body.push(H2('Nguồn đã đối chiếu'));
body.push(table(['Tài liệu', 'Nơi đăng', 'Đường dẫn'], D.SOURCES.map((s) => [s[0], s[1], s[2] || '(văn bản gốc trong repo)']), [3600, 2000, 4000], { cellStyle: (r, i) => (i === 2 ? { size: 15 } : null) }));
body.push(H2('Những điều chưa xác minh được'));
D.LIMITS.forEach((t) => body.push(bullet(t)));

// ---- Document
const doc = new Document({
  creator: 'Sổ tay lái xe ô tô', title: D.META.title, description: 'Sổ tay lái xe ô tô cho người mới',
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: C.ink } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 34, bold: true, font: FONT, color: C.navy }, paragraph: { spacing: { before: 120, after: 240 }, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.teal, space: 6 } } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, font: FONT, color: C.teal }, paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 1, keepNext: true } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 22, bold: true, font: FONT, color: C.navy }, paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 2, keepNext: true } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 260 } } } }, { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 900, hanging: 260 } } } }] },
      { reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 320 } }, run: { bold: true, color: C.teal } } }] },
    ],
  },
  features: { updateFields: true },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 560, footer: 560 } }, titlePage: true },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run('Sổ tay lái xe ô tô cho người mới · cập nhật ' + D.META.updated, { size: 16, color: '7A8794' })] })] }) },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [run('Trang ', { size: 16, color: '7A8794' }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '7A8794', font: FONT }), run(' / ', { size: 16, color: '7A8794' }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: '7A8794', font: FONT })] })] }),
      first: new Footer({ children: [new Paragraph({ children: [] })] }),
    },
    children: body,
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log('wrote', OUT, buf.length); });
