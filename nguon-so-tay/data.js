// Nguồn dữ liệu chung cho Sổ tay (Word) và Trang tra cứu nhanh (HTML).
// Mọi mức phạt đã đối chiếu với văn bản gốc NĐ 168/2024/NĐ-CP trong repo
// và phần sửa đổi của NĐ 238/2026/NĐ-CP (hiệu lực 15/8/2026).

const META = {
  title: 'Sổ tay lái xe ô tô cho người mới',
  updated: '03/11/2026',
  scope: 'Áp dụng cho người lái ô tô con (xe cá nhân, không kinh doanh vận tải), GPLX hạng B.',
};

// ---------------------------------------------------------------- CĂN CỨ
const LEGAL = [
  ['Luật Trật tự, an toàn giao thông đường bộ', '36/2024/QH15', '01/01/2025', 'Quy tắc giao thông: làn, vượt, chuyển hướng, dừng đỗ, cao tốc, điểm GPLX (Điều 10–26, 56–58, 80).'],
  ['Nghị định xử phạt VPHC giao thông đường bộ; trừ, phục hồi điểm GPLX', '168/2024/NĐ-CP', '01/01/2025', 'Mức phạt tiền, trừ điểm, tước GPLX (Điều 6 ô tô; Điều 13 điều kiện xe; Điều 18 GPLX).'],
  ['Nghị định sửa đổi, bổ sung NĐ 168', '238/2026/NĐ-CP', '15/08/2026', 'Sửa quy định chở trẻ em, bổ sung lỗi xe cá nhân chở khách thu tiền, sửa lỗi biển số, thẩm quyền.'],
  ['Thông tư về tốc độ và khoảng cách an toàn', '38/2024/TT-BGTVT', '01/01/2025', 'Tốc độ tối đa trong/ngoài khu đông dân cư, cao tốc; khoảng cách tối thiểu.'],
  ['Quy chuẩn kỹ thuật quốc gia về báo hiệu đường bộ', 'QCVN 41:2024/BGTVT', '01/01/2025', 'Thứ tự hiệu lực báo hiệu, ý nghĩa đèn, biển, biển phụ, vạch kẻ.'],
  ['Giáo trình Kỹ thuật lái xe ô tô (Tổng cục Đường bộ Việt Nam)', 'Bản 2018', '—', 'Thao tác chuẩn: tư thế, đánh lái, côn–ga–phanh, ghép xe, căn đường, lái trên các loại đường.'],
];

// ---------------------------------------------------------------- PHẦN A: KỸ THUẬT
const PRECHECK = [
  ['Vòng quanh xe', 'Lốp (non hơi, phồng, đinh), gầm xe có rò rỉ dầu/nước, vật cản và trẻ em quanh xe, gương và đèn không vỡ.', 'Giáo trình 2.2'],
  ['Khoang máy (định kỳ, xe nguội)', 'Mức dầu máy bằng que thăm, nước làm mát, nước rửa kính; cọc ắc quy chặt.', 'Giáo trình 2.10.1'],
  ['Trang phục', 'Giày đế thấp, mềm; không đi dép lê, guốc cao gót. Quần áo không vướng thao tác.', 'Giáo trình 2.1'],
  ['Giấy tờ', 'GPLX, đăng ký xe, chứng nhận kiểm định, bảo hiểm bắt buộc TNDS (bản giấy hoặc tích hợp VNeID).', 'Luật 36, Đ56'],
];

const SEAT = [
  ['Chiều cao ghế', 'Đùi và cẳng chân tạo góc khoảng 120°. Mắt nhìn vào khoảng giữa kính chắn gió.'],
  ['Tựa lưng', 'Ngả ra sau khoảng 20° so với phương thẳng đứng; khoảng 2/3 lưng tựa nhẹ vào đệm.'],
  ['Tiến – lùi ghế', 'Đạp hết hành trình phanh (và ly hợp với xe số sàn) mà đầu gối vẫn còn hơi chùng. Cẳng tay và bắp tay tạo góc khoảng 120° khi cầm vô lăng.'],
  ['Tựa đầu', 'Chiều cao tựa đầu ngang tầm mắt.'],
  ['Vô lăng', 'Chỉnh cao thấp, xa gần để thấy rõ đồng hồ, tay không phải vươn thẳng.'],
  ['Gương trong xe', 'Thấy trọn kính hậu. Có lẫy chống chói ban đêm.'],
  ['Gương hai bên', 'Chiều ngang: thấy một chút thân xe ở mép trong gương. Chiều dọc: theo giáo trình, khoảng 1/3 là mặt đường, 2/3 là không gian. Chỉnh khi xe đứng yên.'],
  ['Dây an toàn', 'Cắm đến khi nghe "cách". Đai vai qua giữa xương đòn, đai hông sát dưới bụng (phụ nữ mang thai đặt đai dưới bụng). Trẻ em dùng ghế chuyên dụng.'],
];
// Nguồn: Giáo trình KTLX 2018, mục 2.4

const STEERING = [
  ['Vị trí cầm', 'Coi vô lăng như mặt đồng hồ: tay trái ở 9–10 giờ, tay phải ở 2–3 giờ. Bốn ngón ôm vành, ngón cái đặt dọc vành. Vai và tay thả lỏng.', 'Giáo trình 2.5'],
  ['Tốc độ cao (chuyển làn, vào cua rộng)', 'Giữ tay 10 giờ – 2 giờ, kéo vô lăng nhẹ nhàng một góc nhỏ. Không buông tay, không chuyển tay. Gần đến vị trí mong muốn thì kéo nhẹ ngược lại để trả lái.', 'Giáo trình 2.5.1'],
  ['Tốc độ thấp, cua gấp, ghép xe (đánh lái chuyển tay)', 'Rẽ phải: tay phải kéo xuống, tay trái đẩy lên; khi tay phải xuống thấp thì buông, đưa lên nắm ở vị trí 11 giờ và kéo tiếp; tay trái chuyển xuống 8 giờ. Lặp lại đến khi đủ lái. Rẽ trái làm ngược lại.', 'Giáo trình 2.5.2'],
  ['Trả lái', 'Khi xe đã vào hướng mới phải trả lái kịp thời. Ở tốc độ thấp trả lái bằng cách chuyển tay ngược lại; không thả trôi vô lăng tự trả khi chưa thuần thục.', 'Giáo trình 2.5'],
  ['Nguyên tắc chiều đánh lái', 'Muốn xe đi về hướng nào thì quay vô lăng về hướng đó, cả khi tiến và khi lùi. Khi lùi: muốn đuôi xe sang phải thì đánh lái sang phải.', 'Giáo trình 2.5, 2.13.2'],
  ['Không đổi số khi đang đánh lái', 'Khi xe đang chuyển hướng hoặc tránh nhau thì không nên đổi số.', 'Giáo trình 3.1.2, 3.2.2'],
];

const PEDALS = [
  ['Chân ga', 'Đặt khoảng 2/3 bàn chân phải lên bàn đạp, gót tì sàn làm điểm tựa, dùng mũi bàn chân điều khiển. Tăng, giảm ga từ từ.'],
  ['Chân phanh', 'Chuyển hẳn chân phải từ ga sang phanh. Phanh gấp: dùng mũi bàn chân đạp mạnh, gót không tì sàn. Phanh xong nhấc chân về ga.'],
  ['Ly hợp (xe số sàn)', 'Đạp dứt khoát bằng chân trái sát sàn. Nhả: 2/3 hành trình đầu nhả nhanh, 1/3 cuối nhả từ từ kết hợp ga nhẹ. Nhả xong đặt chân xuống sàn, không gác chân lên bàn đạp.'],
  ['Xe số tự động', 'Chỉ dùng chân phải cho cả ga và phanh; chân trái để yên trên chỗ nghỉ chân. Không dùng hai chân.'],
];
// Nguồn: Giáo trình 2.6–2.8; dòng xe số tự động là kinh nghiệm phổ biến.

const GEARS_AT = [
  ['P', 'Đỗ xe. Khi đỗ phải về P và kéo phanh tay.'],
  ['R', 'Lùi. Từ P sang R phải đạp phanh hết hành trình.'],
  ['N', 'Số 0. Dừng ở N hoặc P vẫn phải giữ phanh chân.'],
  ['D', 'Số tiến bình thường. Gài D hoặc R xong, giữ phanh, kiểm tra đúng số rồi mới nhả phanh, đạp ga.'],
  ['2 / S', 'Số tiến chậm: lên, xuống dốc lớn, đường trơn. Chuyển từ D sang 2 cần giảm tốc.'],
  ['1 / L', 'Đi rất chậm, dốc rất cao. Chỉ dùng ngắn vì vòng tua máy cao; xe phải đi rất chậm hoặc dừng mới gài.'],
];
// Giáo trình 2.9.2

const START_STOP = {
  start: [
    'Kéo chặt phanh tay. Kiểm tra cần số ở P (hoặc N); xe số sàn về số 0.',
    'Đạp hết phanh (xe số sàn: đạp hết ly hợp), vặn chìa đến START hoặc giữ nút khởi động; máy nổ thì thả tay. Mỗi lần đề không quá 5 giây; 3 lần không nổ thì dừng kiểm tra, các lần cách nhau 2–3 phút.',
    'Quan sát xung quanh, bật xi nhan trái, nhìn gương, quay đầu kiểm tra điểm mù phía sau.',
    'Giữ phanh, gài D (số sàn: số 1), nhả phanh tay, nhả phanh từ từ, đánh lái nhẹ sang trái để ra đường.',
  ],
  stop: [
    'Nhả ga, nhìn gương trong và gương phải.',
    'Bật xi nhan phải, chuyển dần vào làn trong cùng bên phải, vừa đi vừa quan sát.',
    'Rà phanh giảm tốc; đánh lái cho xe song song với lề, hai bánh trước thẳng; bánh gần nhất cách lề không quá 0,25 m.',
    'Tăng lực phanh để dừng hẳn (số sàn: đạp ly hợp), về P (số sàn: về 0), kéo phanh tay, tắt máy.',
    'Quan sát phía sau trước khi mở cửa (mở bằng tay xa cửa, xem phần kinh nghiệm), xuống xe, khóa cửa.',
  ],
};
// Giáo trình 2.10, 2.11; Luật 36 Đ18 k6

// Căn đường theo giáo trình
const ALIGN_TEXTBOOK = [
  ['Ba điểm thẳng hàng', 'Để xe đi thẳng, hình dung đường dẫn hướng qua ba điểm: tâm vô lăng, một điểm trên hàng cúc áo ngực, và một điểm chọn trên mặt đường phía trước.'],
  ['So với điểm chuẩn trên tim đường', 'Chọn một điểm chuẩn di động trên trục tim đường. Thấy vị trí mình trùng điểm chuẩn là xe đang ở giữa đường; thấy mình lệch hẳn sang trái điểm chuẩn là xe đang ở bên trái đường, và ngược lại.'],
  ['Tránh ổ gà, chướng ngại', 'Căn theo vết bánh trước bên trái. Thông thường tâm người lái cách tâm vết bánh trước bên trái khoảng 100–150 mm.'],
  ['Tránh xe ngược chiều', 'Chia đường làm hai phần; chia phần đường tưởng tượng của xe mình thành 3 phần bằng nhau để giữ xe trong phần bên phải.'],
];
// Giáo trình 3.1.2, 3.2.1

// Điểm căn xe – phương pháp tự hiệu chỉnh (kinh nghiệm)
const ALIGN_CALIBRATE = [
  ['Bánh trước bên trái', 'Đặt một chai nước trên bãi. Tiến thật chậm cho bánh trái chạm chai (người hỗ trợ đứng ngoài báo). Ngồi đúng tư thế, ghi nhớ chai nằm ở đâu trên nắp capo hoặc mép kính.', 'Đi sát vạch giữa, tránh ổ gà bằng bánh trái.'],
  ['Bánh trước bên phải', 'Làm tương tự với bánh phải. Mốc này thường nằm lệch xa về bên phải so với cảm giác của người mới.', 'Đi sát lề phải, rẽ phải không leo vỉa.'],
  ['Mép cản trước', 'Đặt thùng carton, tiến đến khi cản cách thùng khoảng 30 cm. Ghi nhớ mép dưới thùng biến mất ở đâu trên capo.', 'Dừng trước vạch dừng, trong hầm gửi xe.'],
  ['Cách lề 25 cm', 'Đỗ xe cách vạch hoặc gờ đúng 25 cm (đo bằng thước). Ghi nhớ vạch hiện ở vị trí nào trong gương phải và qua kính trước.', 'Dừng, đỗ sát lề đúng luật (≤ 0,25 m).'],
  ['Giữa làn', 'Cho xe nằm chính giữa một ô đỗ có vạch hai bên. Ghi nhớ hai vạch đó chạy vào đâu trên kính và trong hai gương.', 'Chạy thẳng giữa làn trên phố và cao tốc.'],
  ['Mép đuôi xe', 'Dùng camera lùi kết hợp gương. Đặt cọc phía sau, lùi đến khi cảm biến kêu liên tục, xuống xe đo khoảng cách thật.', 'Lùi chuồng, ghép ngang, lùi sát tường.'],
];

const LANE_CHANGE = [
  'Nhìn gương trong xe và gương phía định chuyển.',
  'Bật xi nhan sớm (tối thiểu vài giây trước khi đánh lái) để xe sau kịp biết.',
  'Nhìn lại gương; quay đầu nhanh qua vai kiểm tra điểm mù phía chuyển.',
  'Đủ khoảng trống mới đánh lái nhẹ, mỗi lần chỉ sang một làn liền kề.',
  'Vào làn mới thì tắt xi nhan, chỉnh tốc độ theo dòng xe. Không chuyển làn ở nơi có vạch liền.',
];
// Giáo trình 2.16; Luật 36 Đ13 k2

const MANEUVERS = [
  {
    name: 'Rẽ phải',
    src: 'Giáo trình 2.18; Luật 36 Đ15',
    steps: [
      'Gần đến chỗ rẽ: nhìn gương phải, bật xi nhan phải, nhìn lại gương và điểm mù bên phải.',
      'Chuyển dần sang làn trong cùng bên phải từ sớm để xe máy không chen vào giữa xe và lề.',
      'Giảm tốc, nhường người đi bộ, xe thô sơ và xe đang đi thẳng từ bên trái tới.',
      'Đánh lái khi đầu xe ngang điểm bắt đầu cong của lề; giữ bánh sau không leo vỉa. Rẽ xong không lấn sang làn ngược chiều.',
    ],
  },
  {
    name: 'Rẽ trái',
    src: 'Giáo trình 2.17; Luật 36 Đ15',
    steps: [
      'Nhìn gương trái, bật xi nhan trái, kiểm tra điểm mù bên trái.',
      'Chuyển dần sang làn trong cùng bên trái hoặc làn có mũi tên rẽ trái.',
      'Có đèn thì theo đèn và biển. Không có đèn thì dừng quan sát, nhường xe theo quy tắc nơi giao nhau.',
      'Nhường người đi bộ và xe đi ngược chiều; rẽ theo cung rộng, không cắt góc.',
    ],
  },
  {
    name: 'Vượt xe (đường hai chiều mỗi chiều một làn)',
    src: 'Giáo trình 2.19; Luật 36 Đ14',
    steps: [
      'Giữ khoảng cách an toàn, không bám đuôi xe định vượt.',
      'Chỉ vượt trên đoạn thẳng, tầm nhìn tốt, không có biển cấm vượt, không có vạch liền, không có xe ngược chiều trong đoạn định vượt.',
      'Báo hiệu bằng nháy đèn pha hoặc còi (22h–5h trong đô thị chỉ được nháy đèn), bật xi nhan trái.',
      'Xe trước nhường (xi nhan phải, đi sát phải) mới tăng tốc vượt bên trái. Một lần vượt trung bình mất khoảng 20 giây.',
      'Vượt xong một khoảng an toàn, xi nhan phải, về làn. Đang vượt mà thấy xe ngược chiều và chưa qua hết thân xe: hủy vượt, giảm tốc, quay về làn.',
    ],
  },
  {
    name: 'Quay đầu tại dải phân cách hoặc ngã tư',
    src: 'Giáo trình 2.20; Luật 36 Đ15 k4',
    steps: [
      'Nhìn gương trái, xi nhan trái, chuyển dần vào làn trong cùng bên trái.',
      'Đến điểm quay: giảm tốc, về số thấp, kiểm tra gương trái lần nữa.',
      'Nhường xe ở làn ngược chiều; đủ an toàn thì đánh hết lái sang trái.',
      'Không quay đầu trên vạch đi bộ, trên cầu, đầu cầu, gầm cầu vượt, ngầm, đường hẹp, dốc, khúc cong khuất, đường một chiều, cao tốc, trong hầm, nơi giao đường sắt, nơi có biển cấm quay đầu.',
    ],
  },
  {
    name: 'Quay đầu trên đường hẹp (tiến – lùi nhiều lần)',
    src: 'Giáo trình 2.20.4',
    steps: [
      'Xi nhan phải, đưa xe sát lề phải. Quan sát, xi nhan trái.',
      'Đánh hết lái sang trái, tiến chậm đến giới hạn bên kia đường, dừng.',
      'Quan sát phía sau, lùi lại đồng thời đánh hết lái sang phải (đuôi về phía mép đường ban đầu), dừng.',
      'Tiến lên đánh lái sang trái để hoàn thành. Nơi địa hình nguy hiểm: đưa đầu xe về phía nguy hiểm, đuôi xe về phía an toàn. Dừng giữa các lần nên dùng cả phanh tay.',
    ],
  },
  {
    name: 'Lùi xe',
    src: 'Giáo trình 2.13; Luật 36 Đ16',
    steps: [
      'Kiểm tra gương trái, phải, gương trong, quay đầu nhìn trực tiếp, nếu cần xuống xe hoặc nhờ người chỉ dẫn. Camera và cảm biến chỉ là hỗ trợ.',
      'Bật tín hiệu lùi (xe tự bật đèn lùi khi gài R). Cho xe lùi thật chậm: nhả phanh từ từ (số sàn: vê ly hợp).',
      'Lệch hướng thì chỉnh lái từ từ; cần thiết dừng lại, tiến lên chỉnh rồi lùi tiếp.',
      'Không lùi ở đường một chiều, khu vực cấm dừng, vạch đi bộ, nơi giao nhau, giao đường sắt, nơi khuất tầm nhìn, trong hầm, trên cao tốc.',
    ],
  },
  {
    name: 'Lùi chuồng (ghép dọc) vào ô đỗ bên phải',
    src: 'Giáo trình 2.14.1',
    steps: [
      'Về số thấp, đi chậm, bật xi nhan phải. Kiểm tra gương phải, gương trong.',
      'Tiến đến khi nhìn qua vai sang phải thấy giữa ô đỗ ngang vị trí mình ngồi. Kiểm tra hông trái.',
      'Đánh hết lái sang trái, tiến lên cho đầu xe sang hết phần đường bên trái. Khi nhìn gương phải thấy cửa ô đỗ thì dừng.',
      'Gài R, lùi chậm đồng thời trả lái sang phải. Quan sát hai gương, chỉnh lái để thân xe song song hai vạch, lùi thẳng vào.',
      'Đến vị trí thì dừng, về P, kéo phanh tay.',
    ],
  },
  {
    name: 'Ghép ngang (đỗ song song) bên phải',
    src: 'Giáo trình 2.14.2',
    steps: [
      'Xi nhan phải, kiểm tra gương và hông trái. Tiến đến khi đuôi xe mình ngang đầu xe phía trước chỗ trống thì dừng.',
      'Gài R, kiểm tra lại xung quanh. Đánh lái sang phải và lùi chậm.',
      'Khi gương phải thấy góc cuối bên phải của vị trí đỗ thì trả lái để xe lùi thẳng vào.',
      'Gần đến điểm cuối thì đánh lái sang trái để đưa đầu xe vào. Gần xe phía sau thì dừng.',
      'Gài số tiến, trả lái sang phải, tiến chỉnh cho xe song song lề. Lùi về khoảng giữa hai xe. Về P, kéo phanh tay.',
    ],
  },
  {
    name: 'Ra khỏi chỗ ghép ngang',
    src: 'Giáo trình 2.15.2',
    steps: [
      'Quan sát phía sau (gương, camera) và hông trái. Lùi đến gần đầu xe phía sau thì dừng.',
      'Bật xi nhan trái, gài số tiến, đánh hết lái sang trái và tiến chậm.',
      'Khi khoảng 1/2 xe đã ra khỏi chỗ đỗ, lấy lái sang phải để xe thẳng hướng, rồi trả lái tiếp tục đi.',
    ],
  },
  {
    name: 'Dừng, đỗ và khởi hành trên dốc',
    src: 'Giáo trình 3.3.4–3.3.6; Luật 36 Đ18 k2',
    steps: [
      'Đỗ trên dốc phải đánh lái về phía lề đường và chèn bánh (luật). Giáo trình hướng dẫn: dốc lên không có bó vỉa thì đánh lái sang phải; dốc lên có bó vỉa thì đánh hết lái sang trái (bánh tì vào bó vỉa nếu xe trôi lùi); dốc xuống thì bánh quay vào bó vỉa.',
      'Đỗ lâu phải chèn bánh chắc chắn; đỗ cách xe trước, xe sau một khoảng an toàn.',
      'Khởi hành dốc lên (số sàn): giữ phanh tay, nhả 2/3 ly hợp đến khi xe "ghì", tăng ga nhẹ, nhả phanh tay, nhả hết ly hợp. Xe số tự động: dùng phanh tay hoặc tính năng hỗ trợ khởi hành ngang dốc, chuyển chân phanh sang ga dứt khoát.',
    ],
  },
];

const ROADS = [
  {
    name: 'Nội đô, khu đông dân cư',
    src: 'Luật 36 Đ12, Đ18, Đ19, Đ21; TT 38 Đ6; kinh nghiệm',
    items: [
      'Tốc độ tối đa (khi không có biển): 60 km/h trên đường đôi hoặc một chiều từ 2 làn; 50 km/h trên đường hai chiều hoặc một chiều 1 làn. Có biển thì theo biển.',
      'Xe máy là yếu tố nguy hiểm nhất: trước mỗi lần rẽ, chuyển làn, mở cửa đều nhìn gương rồi quay đầu nhìn điểm mù.',
      'Bật xi nhan sớm, đổi hướng chậm và dứt khoát. Rẽ phải ép sát lề phải từ sớm.',
      'Dừng đèn đỏ chừa khoảng một thân xe máy với xe trước để còn đường thoát.',
      'Không bấm còi 22h–5h trong khu đông dân cư; chỉ dùng còi khi có nguy cơ mất an toàn hoặc báo xin vượt.',
      'Đường nhiều làn: đi đúng làn theo mũi tên; đã vào làn nào thì đi theo hướng của làn đó.',
      'Chỉ đỗ ở bãi, hầm gửi xe hoặc nơi có biển, vạch cho phép đỗ. Không đỗ trong 5 m từ mép giao nhau, trước cổng cơ quan, trên vạch đi bộ.',
    ],
  },
  {
    name: 'Ngoài khu đông dân cư, quốc lộ',
    src: 'TT 38 Đ6 k2, Đ11; Luật 36 Đ14',
    items: [
      'Tốc độ tối đa ô tô con (khi không có biển): 90 km/h đường đôi hoặc một chiều từ 2 làn; 80 km/h đường hai chiều hoặc một chiều 1 làn.',
      'Nhiều xe tải, xe khách: không chạy song song lâu bên cạnh xe lớn, không đi vào điểm mù phía phải của xe đầu kéo khi nó rẽ phải.',
      'Chỉ vượt bên trái, khi không có vạch liền, khúc cua, đỉnh dốc, cầu hẹp, giao nhau.',
      'Qua thị trấn, chợ, trường học: giảm tốc, sẵn sàng dừng.',
    ],
  },
  {
    name: 'Đường cao tốc',
    src: 'Luật 36 Đ25; TT 38 Đ9, Đ11; Giáo trình 3.10',
    items: [
      'Trước chuyến đi: tìm hiểu lộ trình, lối ra; kiểm tra lốp (áp suất, độ mòn, vết nứt), đèn, gạt mưa, nhiên liệu, thẻ thu phí không dừng còn tiền.',
      'Nhập cao tốc: đi hết đường dẫn, tăng tốc trên làn tăng tốc đến gần tốc độ dòng xe, xi nhan trái, nhường xe đang chạy trên cao tốc rồi nhập vào làn sát bên phải. Không dừng ở cuối làn tăng tốc, không vượt xe trước trong làn tăng tốc.',
      'Tốc độ: tối đa 120 km/h, tối thiểu 60 km/h, theo biển trên từng tuyến, từng làn.',
      'Khoảng cách tối thiểu: 55 m (60–80 km/h), 70 m (80–100 km/h), 100 m (100–120 km/h). Mưa, sương phải giãn xa hơn.',
      'Đi giữa làn, giữ đều tốc độ. Làn trái để vượt; mỗi lần chuyển một làn.',
      'Ra cao tốc: quan sát biển báo lối ra từ xa, chuyển dần sang làn phải, giảm tốc trên làn giảm tốc.',
      'Đi quá lối ra thì đi tiếp đến nút giao sau. Tuyệt đối không lùi, không quay đầu, không đi ngược chiều.',
      'Không chạy trên làn dừng khẩn cấp và lề đường. Chỉ dừng đỗ ở nơi quy định; mệt thì vào trạm dừng nghỉ.',
    ],
  },
  {
    name: 'Đèo dốc, miền núi',
    src: 'Giáo trình 3.3; Luật 36 Đ17',
    items: [
      'Lên dốc thấp: lấy đà trước chân dốc. Dốc trung bình: lấy đà, tới giữa dốc về số. Dốc cao: về số thấp từ chân dốc.',
      'Gần đỉnh dốc: đi chậm, sát bên phải, báo hiệu bằng còi hoặc đèn cho xe phía bên kia.',
      'Xuống dốc dài: về số thấp, dùng phanh động cơ là chính, phanh chân chỉ hỗ trợ. Đạp phanh liên tục làm má phanh nóng, cháy, mất tác dụng.',
      'Dốc quá dài: chọn chỗ dừng an toàn để phanh và máy nguội.',
      'Đường hẹp: xe xuống dốc nhường xe lên dốc; xe gần chỗ tránh hơn phải vào tránh.',
      'Vào cua: giảm ga trước cua, đánh lái đều; ra khỏi cua mới tăng ga. Lực ly tâm tăng theo tốc độ, quá lực bám thì xe trượt, quá mô men chống lật thì xe lật.',
    ],
  },
  {
    name: 'Mưa, sương mù, ban đêm',
    src: 'Luật 36 Đ20; Giáo trình 3.9, 4.2',
    items: [
      'Bật đèn chiếu sáng từ 18h đến 6h, và khi mưa, sương mù, khói, bụi làm hạn chế tầm nhìn.',
      'Chuyển sang đèn chiếu gần khi gặp xe ngược chiều, gặp người đi bộ qua đường, khi đi trong khu đông dân cư có đèn đường, khi chuyển hướng tại nơi giao nhau.',
      'Không nhìn thẳng vào đèn xe ngược chiều; nhìn chếch sang lề phải theo chiều đi của mình.',
      'Mặt đường ướt làm quãng đường phanh tăng khoảng 1,5 lần, vì vậy khoảng cách an toàn cũng phải tăng tương ứng.',
      'Mưa quá to hoặc sương quá dày, không nhìn rõ: tìm nơi an toàn dừng lại.',
      'Ban đêm, bóng đen trên đường đến gần mà biến mất là ổ gà nhỏ; vẫn còn là ổ gà lớn. Ánh đèn bỗng "mất đường" là cua gấp hoặc xuống dốc cao.',
    ],
  },
  {
    name: 'Đường trơn, ngập nước',
    src: 'Giáo trình 3.4, 3.5',
    items: [
      'Đường trơn: giảm ga, giữ ga đều, hạn chế phanh, không phanh gấp; khoảng cách với xe trước 4–10 giây tùy độ bám.',
      'Đuôi xe trượt về phía nào thì đánh lái nhẹ về phía đó để xe thẳng lại.',
      'Trước khi qua chỗ ngập: chờ xe phía trước qua hết để quan sát mực nước. Tắt điều hòa, hạ kính cửa sổ để dễ thoát, gài số thấp, giữ ga đều, không dừng giữa chừng.',
      'Kinh nghiệm: nước ngập quá nửa bánh xe thì không nên lội. Xe chết máy trong nước tuyệt đối không đề nổ lại (nguy cơ thủy kích), gọi cứu hộ.',
      'Qua nước xong rà phanh nhẹ vài lần cho má phanh khô.',
    ],
  },
  {
    name: 'Đường sắt, cầu, hầm, phà, trạm thu phí',
    src: 'Luật 36 Đ23, Đ24, Đ26; Giáo trình 3.6–3.8, 3.11',
    items: [
      'Giao đường sắt: dừng trước vạch dừng; không có vạch thì dừng cách ray ngoài cùng tối thiểu 5 m. Tắt nhạc, hạ kính nghe còi tàu, nhìn hai phía. Qua bằng số thấp, không đổi số trên đường ray.',
      'Xe chết máy trên đường ray: mọi người rời xe ngay. Đẩy được thì đẩy ra; không đẩy được thì đi xa về phía ngược hướng tàu chạy tới và báo hiệu dừng tàu.',
      'Trong hầm: bật đèn chiếu gần, không dừng đỗ, không lùi, không quay đầu, không vượt.',
      'Cầu hẹp: số thấp, ga đều, không phanh gấp, không đổi số trên cầu.',
      'Phà: chỉ xuống, lên phà khi có lệnh; trên phà kéo phanh tay, gài số, chèn bánh nếu cần. Hành khách không ngồi trên xe (trừ trẻ em, người già yếu, phụ nữ mang thai, người khuyết tật, người bệnh).',
      'Trạm thu phí: giảm tốc theo biển, chuyển đèn chiếu gần ban đêm, vào đúng làn ETC khi xe có thẻ và tài khoản đủ tiền; xếp hàng, không chen làn.',
    ],
  },
];

const EMERGENCY = [
  {
    name: 'Xe hỏng trên cao tốc',
    src: 'Luật 36 Đ25 k2; NĐ 168 Đ6 k7c',
    steps: [
      'Bật đèn khẩn cấp ngay. Chuyển dần từng làn sang làn dừng khẩn cấp bên phải.',
      'Không vào được làn khẩn cấp: bật đèn khẩn cấp và đặt biển hoặc đèn cảnh báo phía sau xe tối thiểu 150 m (giáo trình khuyến nghị ban đêm 200 m).',
      'Mọi người ra khỏi xe về phía lề phải, đứng sau dải hộ lan; không đứng trước hoặc sau xe.',
      'Báo ngay Cảnh sát giao thông trên tuyến hoặc đơn vị quản lý cao tốc (số đường dây nóng ghi trên biển của tuyến).',
    ],
  },
  {
    name: 'Va chạm, tai nạn',
    src: 'Luật 36 Đ80',
    steps: [
      'Dừng ngay, bật đèn khẩn cấp, cảnh báo nguy hiểm, giữ nguyên hiện trường.',
      'Trợ giúp người bị nạn; gọi 115 (cấp cứu), 113 (công an), 114 (cứu nạn, cứu hộ).',
      'Ở lại hiện trường đến khi công an tới, trừ khi phải đi cấp cứu hoặc bị đe dọa tính mạng (khi đó phải trình báo ngay công an hoặc UBND nơi gần nhất).',
      'Cung cấp thông tin cho cơ quan có thẩm quyền. Chụp ảnh hiện trường, lưu video camera hành trình, báo bảo hiểm.',
    ],
  },
  {
    name: 'Xe trượt bánh',
    src: 'Giáo trình 3.4.2',
    steps: [
      'Bỏ ga từ từ, không phanh gấp.',
      'Đuôi xe trượt về phía nào thì đánh lái nhẹ về phía đó, nhìn về hướng muốn xe đi.',
      'Xe đã thẳng thì trả lái, giảm tốc bằng phanh động cơ.',
    ],
  },
  {
    name: 'Nổ lốp khi đang chạy (kinh nghiệm)',
    src: 'Kinh nghiệm thực tế',
    steps: [
      'Giữ chặt vô lăng bằng hai tay, giữ xe đi thẳng; không đánh lái gấp.',
      'Nhả ga từ từ, không đạp phanh mạnh ngay; khi tốc độ đã giảm mới rà phanh nhẹ.',
      'Bật đèn khẩn cấp, tấp vào lề hoặc làn khẩn cấp, đặt biển cảnh báo rồi mới thay lốp hoặc gọi cứu hộ.',
    ],
  },
  {
    name: 'Phanh yếu, phanh nóng khi xuống dốc (kinh nghiệm)',
    src: 'Giáo trình 3.3.3; kinh nghiệm',
    steps: [
      'Thấy mùi khét hoặc chân phanh mềm: về số thấp để phanh động cơ, bật đèn khẩn cấp.',
      'Kéo phanh tay từ từ, không giật mạnh; tìm chỗ an toàn (làn thoát hiểm trên đèo nếu có) để dừng.',
      'Chờ phanh nguội hoàn toàn mới đi tiếp; kiểm tra hệ thống phanh trước khi xuống dốc tiếp.',
    ],
  },
  {
    name: 'Bị Cảnh sát giao thông dừng xe',
    src: 'Luật 36 Đ56 k3; NĐ 168 Đ48 k3; kinh nghiệm',
    steps: [
      'Bật xi nhan, tấp vào lề an toàn theo hướng dẫn; tắt máy nếu được yêu cầu.',
      'Xuất trình giấy tờ bản giấy hoặc qua tài khoản định danh điện tử VNeID.',
      'Xe cá nhân không xuất trình được giấy tờ: bị lập biên bản lỗi "không có" giấy tờ và có thể bị tạm giữ xe; nếu trong thời hạn hẹn xuất trình được giấy tờ hợp lệ thì không bị xử phạt lỗi đó.',
      'Hỏi rõ lỗi và căn cứ, đọc kỹ biên bản trước khi ký, có quyền ghi ý kiến. Nộp phạt theo hướng dẫn trên quyết định (Cổng dịch vụ công hoặc kho bạc, ngân hàng).',
    ],
  },
];

// ---------------------------------------------------------------- PHẦN B: BÁO HIỆU
const PRIORITY = [
  ['1', 'Hiệu lệnh của người điều khiển giao thông', 'Đèn xanh nhưng CSGT ra hiệu dừng thì phải dừng.'],
  ['2', 'Tín hiệu đèn giao thông', 'Đèn hoạt động thì theo đèn, kể cả khi biển hoặc vạch nói khác.'],
  ['3', 'Biển báo hiệu đường bộ', 'Biển tạm thời (công trường, sự kiện) ưu tiên hơn biển cố định cùng vị trí.'],
  ['4', 'Vạch kẻ đường và dấu hiệu trên mặt đường', 'Biển và vạch mâu thuẫn thì theo biển.'],
  ['5', 'Cọc tiêu, tường bảo vệ, rào chắn, đinh phản quang, tiêu phản quang, cột Km, cọc H', ''],
  ['6', 'Thiết bị âm thanh báo hiệu đường bộ', ''],
];
// Luật 36 Đ11 k2, k12; QCVN 41:2024 Điều 4

const POLICE = [
  ['Tay phải giơ thẳng đứng', 'Người tham gia giao thông ở tất cả các hướng phải dừng lại.'],
  ['Hai tay hoặc một tay dang ngang', 'Phía trước và phía sau người điều khiển phải dừng; bên phải và bên trái được đi.'],
  ['Tay phải giơ về phía trước', 'Phía sau và bên phải phải dừng; phía trước được rẽ phải; bên trái được đi tất cả các hướng; người đi bộ qua đường đi sau lưng người điều khiển.'],
];
// Luật 36 Đ11 k3

const LIGHTS = [
  ['Xanh', 'Được đi. Người đi bộ, xe lăn đang ở lòng đường thì phải giảm tốc hoặc dừng nhường.'],
  ['Vàng', 'Phải dừng trước vạch dừng. Đang ở trên hoặc đã qua vạch dừng thì được đi tiếp.'],
  ['Vàng nhấp nháy', 'Được đi nhưng phải quan sát, giảm tốc hoặc dừng nhường người đi bộ, xe lăn, phương tiện khác. Lúc này theo biển và vạch.'],
  ['Đỏ', 'Cấm đi; dừng trước vạch dừng (không có vạch thì dừng trước đèn).'],
  ['Mũi tên xanh', 'Chỉ được đi theo hướng mũi tên khi mũi tên sáng. Mũi tên rẽ trái đồng thời cho phép quay đầu, trừ khi có biển cấm quay đầu P.124.'],
  ['Mũi tên xanh cùng đèn đỏ/vàng', 'Được đi theo mũi tên nhưng phải nhường đường cho phương tiện đi từ các hướng khác.'],
  ['Mũi tên đỏ cùng đèn xanh', 'Không được đi theo hướng mũi tên đỏ.'],
  ['Đỏ hình chữ thập (trên làn)', 'Xe phải dừng, không vào làn đó; đã ở trong nút thì nhanh chóng ra khỏi nút.'],
];
// Luật 36 Đ11 k4; QCVN 41:2024 Điều 6

const SIGN_GROUPS = [
  ['Biển báo cấm', 'P (hết cấm: DP)', 'Hình tròn, viền đỏ, nền trắng, hình vẽ màu đen', 'Biểu thị điều cấm.'],
  ['Biển hiệu lệnh', 'R', 'Hình tròn, nền xanh lam, hình vẽ màu trắng', 'Hiệu lệnh bắt buộc phải thi hành.'],
  ['Biển nguy hiểm và cảnh báo', 'W', 'Tam giác đều, viền đỏ, nền vàng, hình vẽ đen', 'Cảnh báo tình huống nguy hiểm phía trước để giảm tốc, quan sát.'],
  ['Biển chỉ dẫn', 'I (cao tốc: IE)', 'Hình chữ nhật, vuông hoặc mũi tên, nền xanh', 'Chỉ dẫn hướng đi hoặc điều cần biết.'],
  ['Biển phụ, biển viết bằng chữ', 'S', 'Hình chữ nhật hoặc vuông; nền trắng chữ đen hoặc nền xanh chữ trắng; đặt ngay dưới biển chính', 'Thuyết minh, bổ sung, thu hẹp phạm vi của biển chính.'],
];
// Luật 36 Đ11 k5; QCVN 41:2024 Điều 11, 22, 41

const SIGN_SCOPE = [
  ['Điểm bắt đầu', 'Biển báo cấm có hiệu lực từ vị trí đặt biển trở đi. Đặt xa vị trí cấm thì kèm biển phụ S.502 ghi khoảng cách.', 'QCVN 41 Đ26.1'],
  ['P.101 đến P.120', 'Không cần quy định phạm vi hiệu lực, không có biển hết cấm (ví dụ: đường cấm, cấm đi ngược chiều, cấm ô tô).', 'Đ26.3'],
  ['P.121, P.128', 'Hiệu lực đến hết khoảng cách ghi trên biển phụ S.501 hoặc đến biển DP.135 "Hết tất cả các lệnh cấm".', 'Đ26.5'],
  ['P.123a, P.123b (cấm rẽ trái, rẽ phải)', 'Hiệu lực tại khu vực đặt biển (nơi giao nhau ngay sau biển). Biển cấm rẽ trái không có giá trị cấm quay đầu.', 'Đ26.6'],
  ['P.124 (cấm quay đầu)', 'Hiệu lực tại nơi giao nhau hoặc chỗ mở dải phân cách, hoặc theo biển phụ S.503.', 'Đ26.7'],
  ['P.125, P.126, P.127, P.130, P.131', 'Cấm vượt, tốc độ tối đa, cấm dừng đỗ, cấm đỗ: hiệu lực đến nơi đường giao nhau tiếp giáp hoặc đến biển hết cấm (DP.133, DP.134, DP.135, DP.127d). P.130, P.131 còn căn cứ biển phụ.', 'Đ26.8'],
  ['Qua nút giao', 'Biển cấm muốn còn hiệu lực sau nút giao phải được nhắc lại phía sau nút giao (trừ ngõ, hẻm, lối ra vào cơ quan).', 'Đ26.9'],
  ['Biển trên làn, giá long môn', 'Biển cấm và biển hiệu lệnh có thể có giá trị trên tất cả các làn hoặc chỉ một số làn theo biển trên đường. Biển nguy hiểm và chỉ dẫn có giá trị cho các làn của chiều xe chạy.', 'Đ15.1–15.2'],
];

const AUX_SIGNS = [
  ['S.501', 'Phạm vi tác dụng của biển', 'Biển chính có hiệu lực trong đoạn dài ghi trên biển phụ (ví dụ "500 m").'],
  ['S.502', 'Khoảng cách đến đối tượng báo hiệu', 'Còn bao xa đến chỗ nguy hiểm hoặc chỗ bắt đầu cấm (ví dụ "150 m").'],
  ['S.503 (a–f)', 'Hướng tác dụng của biển', 'Mũi tên chỉ hướng và điểm bắt đầu, kết thúc hiệu lực (ví dụ cấm đỗ về hai phía).'],
  ['S.504', 'Làn đường', 'Biển chính chỉ áp dụng cho làn được chỉ.'],
  ['S.505a', 'Loại xe', 'Biển chính chỉ áp dụng cho loại xe vẽ trên biển phụ.'],
  ['S.505b, S.505c', 'Loại xe, tải trọng trục hạn chế qua cầu', 'Giới hạn qua cầu theo loại xe hoặc tải trọng trục.'],
  ['S.506 (a,b)', 'Hướng đường ưu tiên', 'Hình vẽ đường ưu tiên tại nút giao (nét đậm là đường ưu tiên).'],
  ['S.507', 'Hướng rẽ', 'Dùng độc lập, đặt ở lưng đường cong hoặc đảo giao thông, báo hướng rẽ gấp.'],
  ['S.508 (a,b)', 'Biểu thị thời gian', 'Biển chính chỉ có hiệu lực trong khung giờ ghi trên biển phụ (ví dụ "6h–9h, 16h–19h").'],
  ['S.509 (a,b)', 'Thuyết minh biển chính', 'Chữ giải thích thêm cho biển chính.'],
];
// QCVN 41:2024 Điều 41

const SIGNS = [
  // code, name, meaning, note/fine, icon key, group
  ['P.101', 'Đường cấm', 'Cấm mọi phương tiện đi lại cả hai hướng (trừ xe ưu tiên).', 'Đi vào đường cấm: 4–6 triệu, trừ 2 điểm.', 'p101', 'P'],
  ['P.102', 'Cấm đi ngược chiều', 'Cấm đi vào theo chiều đặt biển.', 'Đi vào: 18–20 triệu, trừ 4 điểm.', 'p102', 'P'],
  ['P.103a', 'Cấm xe ô tô', 'Cấm ô tô (thường kèm biển phụ giờ).', 'Đi vào: 4–6 triệu, trừ 2 điểm.', 'p103', 'P'],
  ['P.106a', 'Cấm xe tải', 'Cấm ô tô tải; ô tô con vẫn được đi.', '', 'p106', 'P'],
  ['P.123a', 'Cấm rẽ trái', 'Cấm rẽ trái tại nơi giao nhau ngay sau biển. Không cấm quay đầu.', 'Rẽ trái: 2–3 triệu.', 'p123a', 'P'],
  ['P.123b', 'Cấm rẽ phải', 'Cấm rẽ phải tại nơi giao nhau ngay sau biển.', 'Rẽ phải: 2–3 triệu.', 'p123b', 'P'],
  ['P.124a', 'Cấm quay đầu xe', 'Cấm quay đầu; vẫn được rẽ trái.', 'Quay đầu: 2–3 triệu.', 'p124a', 'P'],
  ['P.124c', 'Cấm rẽ trái và quay đầu', 'Cấm cả rẽ trái lẫn quay đầu.', '2–3 triệu.', 'p124c', 'P'],
  ['P.125', 'Cấm vượt', 'Cấm vượt các xe cơ giới (được vượt xe máy, xe thô sơ).', 'Vượt: 4–6 triệu, trừ 2 điểm.', 'p125', 'P'],
  ['P.127', 'Tốc độ tối đa cho phép', 'Không vượt quá trị số ghi trên biển (km/h).', 'Xem bảng phạt quá tốc độ.', 'p127', 'P'],
  ['P.128', 'Cấm sử dụng còi', 'Không bấm còi trong phạm vi hiệu lực.', '400–600 nghìn.', 'p128', 'P'],
  ['P.130', 'Cấm dừng xe và đỗ xe', 'Không dừng, không đỗ.', 'Dừng: 600–800 nghìn; đỗ: 800 nghìn–1 triệu.', 'p130', 'P'],
  ['P.131a', 'Cấm đỗ xe', 'Được dừng ngắn để đón trả, không được đỗ.', 'Đỗ: 800 nghìn–1 triệu.', 'p131a', 'P'],
  ['P.131b', 'Cấm đỗ xe ngày lẻ', 'Số La Mã I: cấm đỗ vào ngày lẻ.', '800 nghìn–1 triệu.', 'p131b', 'P'],
  ['P.131c', 'Cấm đỗ xe ngày chẵn', 'Số La Mã II: cấm đỗ vào ngày chẵn.', '800 nghìn–1 triệu.', 'p131c', 'P'],
  ['P.121', 'Cự ly tối thiểu giữa hai xe', 'Giữ khoảng cách không nhỏ hơn số ghi trên biển.', 'Không giữ để va chạm: 2–3 triệu.', 'p121', 'P'],
  ['DP.135', 'Hết tất cả các lệnh cấm', 'Hết hiệu lực các biển cấm đặt trước đó.', '', 'dp135', 'DP'],
  ['R.122', 'Dừng lại', 'Bát giác đỏ: dừng hẳn trước vạch dừng, quan sát rồi mới đi.', 'Không chấp hành biển: 400–600 nghìn.', 'r122', 'R'],
  ['R.301a', 'Hướng đi phải theo: đi thẳng', 'Chỉ được đi thẳng.', '', 'r301a', 'R'],
  ['R.302a', 'Hướng phải đi vòng chướng ngại vật', 'Vòng sang phải (đầu dải phân cách, đảo giao thông).', '', 'r302a', 'R'],
  ['R.303', 'Nơi giao nhau chạy theo vòng xuyến', 'Đi vòng xuyến ngược chiều kim đồng hồ; nhường xe đến từ bên trái.', 'Không nhường: 4–6 triệu, trừ 2 điểm.', 'r303', 'R'],
  ['R.306', 'Tốc độ tối thiểu cho phép', 'Không chạy chậm hơn trị số trên biển.', '800 nghìn–1 triệu.', 'r306', 'R'],
  ['R.412', 'Làn đường dành riêng', 'Làn chỉ dành cho loại xe vẽ trên biển (ví dụ xe buýt).', 'Đi sai làn: 4–6 triệu, trừ 2 điểm.', 'r412', 'R'],
  ['R.420', 'Bắt đầu khu đông dân cư', 'Từ đây áp dụng tốc độ và quy định khu đông dân cư (cấm còi 22h–5h).', '', 'r420', 'R'],
  ['R.421', 'Hết khu đông dân cư', 'Hết hiệu lực quy định khu đông dân cư.', '', 'r421', 'R'],
  ['W.201a', 'Chỗ ngoặt nguy hiểm vòng bên trái', 'Giảm tốc, không vượt.', '', 'w201', 'W'],
  ['W.205a', 'Đường giao nhau', 'Giao nhau cùng cấp; nhường xe bên phải nếu không có báo hiệu ưu tiên.', '', 'w205', 'W'],
  ['W.207a', 'Giao nhau với đường không ưu tiên', 'Mình đang đi trên đường ưu tiên; vẫn quan sát.', '', 'w207', 'W'],
  ['W.208', 'Giao nhau với đường ưu tiên', 'Tam giác ngược: phải nhường xe trên đường ưu tiên.', 'Không nhường: 4–6 triệu, trừ 2 điểm.', 'w208', 'W'],
  ['W.210', 'Giao nhau với đường sắt có rào chắn', 'Dừng khi rào hạ, đèn đỏ nháy, chuông kêu.', '', 'w210', 'W'],
  ['W.211a', 'Giao nhau với đường sắt không có rào chắn', 'Dừng, nhìn, nghe hai phía rồi mới qua.', '', 'w211', 'W'],
  ['W.224', 'Đường người đi bộ cắt ngang', 'Giảm tốc, sẵn sàng dừng nhường.', '', 'w224', 'W'],
  ['W.225', 'Trẻ em', 'Gần trường học, khu vui chơi.', '', 'w225', 'W'],
  ['W.227', 'Công trường', 'Đi chậm, theo biển tạm và người hướng dẫn.', '', 'w227', 'W'],
  ['W.245a', 'Đi chậm', 'Giảm tốc độ.', '', 'w245', 'W'],
  ['I.401', 'Bắt đầu đường ưu tiên', 'Xe trên đường này được ưu tiên tại nơi giao nhau.', '', 'i401', 'I'],
  ['I.402', 'Hết đoạn đường ưu tiên', 'Từ đây áp dụng quy tắc nhường xe bên phải.', '', 'i402', 'I'],
  ['I.408', 'Nơi đỗ xe', 'Được đỗ; xem biển phụ loại xe và giờ.', '', 'i408', 'I'],
  ['I.423', 'Đường người đi bộ sang ngang', 'Nhường người đi bộ.', '', 'i423', 'I'],
];

const MARKINGS = [
  ['Vạch liền', 'Không được đè lên, không được vượt qua.'],
  ['Vạch đứt', 'Được cắt qua để chuyển làn hoặc vượt khi an toàn.'],
  ['Vạch màu vàng', 'Phân chia hai chiều xe chạy ngược nhau.'],
  ['Vạch màu trắng', 'Phân chia các làn cùng chiều; vạch mép đường; phần lớn vạch trên mặt đường là màu trắng.'],
  ['Vạch liền kép (vàng)', 'Tuyệt đối không lấn qua; thường ở đèo, khúc cua khuất.'],
  ['Vạch liền – đứt song song', 'Bên phía vạch đứt được cắt qua; bên phía vạch liền thì không.'],
  ['Vạch dừng', 'Vạch ngang liền trước nút giao, đèn tín hiệu: dừng trước vạch, không đè lên.'],
  ['Vạch đi bộ (ngựa vằn)', 'Nhường người đi bộ; không dừng, đỗ trên vạch.'],
  ['Mũi tên trên làn', 'Vào làn nào thì đi theo hướng mũi tên của làn đó.'],
  ['Vạch chéo, vạch chữ V (vùng cấm)', 'Vùng cấm đi vào, cấm dừng đỗ (đầu dải phân cách, chỗ nhập làn).'],
  ['Ô vàng kẻ chéo ở nút giao', 'Không được dừng trong ô; chỉ đi vào khi chắc chắn qua hết ô.'],
  ['Vạch mép, làn khẩn cấp cao tốc', 'Vạch trắng liền ở mép; phần ngoài là làn dừng khẩn cấp, chỉ dùng khi sự cố.'],
];
// QCVN 41:2024 Điều 49–50 (nguyên tắc). Ý nghĩa chi tiết và mã hiệu từng vạch ở Phụ lục G.

const YIELD_RULES = [
  ['Đường nhánh, đường không ưu tiên ra đường chính, đường ưu tiên', 'Nhường xe trên đường chính, đường ưu tiên từ bất kỳ hướng nào tới.'],
  ['Nơi giao nhau không có báo hiệu vòng xuyến', 'Nhường xe đi đến từ bên phải.'],
  ['Nơi giao nhau có báo hiệu đi theo vòng xuyến', 'Nhường xe đi đến từ bên trái.'],
  ['Khi chuyển hướng', 'Nhường người đi bộ, xe lăn, xe thô sơ, xe đi ngược chiều.'],
  ['Xe ưu tiên phát tín hiệu', 'Giảm tốc, đi sát lề phải hoặc dừng lại nhường đường.'],
  ['Đường hẹp, đường dốc', 'Xe gần chỗ tránh hơn vào tránh; xe xuống dốc nhường xe lên dốc; xe có chướng ngại phía trước nhường xe không có chướng ngại.'],
];
// Luật 36 Đ15 k3, Đ17, Đ22; QCVN 41 Đ7.4

const SPEED_IN = [
  ['Trong khu đông dân cư (trừ cao tốc)', '60', '50', 'Mọi xe cơ giới (trừ xe gắn máy, xe máy chuyên dùng, xe bốn bánh có gắn động cơ)'],
];
const SPEED_OUT = [
  ['Ô tô chở người đến 28 chỗ (trừ xe buýt); ô tô tải đến 3,5 tấn', '90', '80'],
  ['Ô tô chở người trên 28 chỗ (trừ xe buýt); ô tô tải trên 3,5 tấn (trừ xi téc)', '80', '70'],
  ['Xe buýt; đầu kéo sơ mi rơ moóc; mô tô; ô tô chuyên dùng', '70', '60'],
  ['Ô tô kéo rơ moóc, kéo xe khác; xe trộn bê tông; xe xi téc', '60', '50'],
];
const DISTANCE = [
  ['60', '35'],
  ['Trên 60 đến 80', '55'],
  ['Trên 80 đến 100', '70'],
  ['Trên 100 đến 120', '100'],
];

// ---------------------------------------------------------------- PHẦN C: MỨC PHẠT
// [hành vi, phạt tiền, trừ điểm (số, 0 = không), bổ sung, căn cứ, nhóm, ghi chú mới?]
const FINES = [
  // Đèn, biển, hiệu lệnh
  ['Không chấp hành biển báo, vạch kẻ đường (lỗi chung, không thuộc lỗi riêng khác)', '400.000 – 600.000', 0, '', 'NĐ 168 Đ6 k1a', 'bao-hieu'],
  ['Vượt đèn đỏ, không chấp hành tín hiệu đèn giao thông', '18.000.000 – 20.000.000', 4, '', 'NĐ 168 Đ6 k9b', 'bao-hieu'],
  ['Không chấp hành hiệu lệnh, hướng dẫn của người điều khiển giao thông', '18.000.000 – 20.000.000', 4, '', 'NĐ 168 Đ6 k9c', 'bao-hieu'],
  ['Đi ngược chiều đường một chiều, đi vào đường có biển "Cấm đi ngược chiều"', '18.000.000 – 20.000.000', 4, '', 'NĐ 168 Đ6 k9d', 'bao-hieu'],
  ['Đi vào khu vực cấm, đường có biển cấm đi vào đối với loại xe đang điều khiển', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5i', 'bao-hieu'],
  ['Rẽ trái, rẽ phải, quay đầu tại nơi có biển cấm', '2.000.000 – 3.000.000', 0, '', 'NĐ 168 Đ6 k4k', 'bao-hieu'],
  ['Quay đầu trên vạch đi bộ, trên cầu, đầu cầu, gầm cầu vượt, ngầm, đường hẹp, dốc, khúc cong khuất, đường một chiều, nơi giao đường sắt', '2.000.000 – 3.000.000', 0, '', 'NĐ 168 Đ6 k4i', 'bao-hieu'],
  // Làn, vượt, chuyển hướng, nhường đường
  ['Chuyển làn không đúng nơi cho phép, không xi nhan, chuyển qua nhiều làn một lúc (đường thường)', '600.000 – 800.000', 0, '', 'NĐ 168 Đ6 k2a', 'lan-duong'],
  ['Không đi bên phải; đi sai phần đường, làn đường; đi qua dải phân cách cố định', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5b', 'lan-duong'],
  ['Chuyển hướng không quan sát, không giảm tốc, không xi nhan hoặc xi nhan không liên tục trong suốt quá trình chuyển hướng', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3c', 'lan-duong'],
  ['Chuyển hướng không nhường người đi bộ, xe lăn tại vạch đi bộ; xe thô sơ trên phần đường dành cho xe thô sơ', '4.000.000 – 6.000.000', 0, '', 'NĐ 168 Đ6 k5l', 'lan-duong'],
  ['Chuyển hướng không nhường xe đi ngược chiều; người đi bộ, xe thô sơ qua đường ở nơi không có vạch', '4.000.000 – 6.000.000', 0, '', 'NĐ 168 Đ6 k5m', 'lan-duong'],
  ['Vượt xe nơi cấm vượt, không có tín hiệu trước khi vượt, vượt bên phải trái phép', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5a', 'lan-duong'],
  ['Không nhường đường cho xe xin vượt khi đủ điều kiện an toàn', '2.000.000 – 3.000.000', 2, '', 'NĐ 168 Đ6 k4d', 'lan-duong'],
  ['Chạy chậm hơn xe khác cùng chiều mà không đi về làn bên phải', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3p', 'lan-duong'],
  ['Không tuân thủ quy định nhường đường tại nơi giao nhau (lỗi chung)', '600.000 – 800.000', 0, '', 'NĐ 168 Đ6 k2c', 'lan-duong'],
  ['Từ đường nhánh, đường không ưu tiên ra đường chính, đường ưu tiên không giảm tốc hoặc dừng nhường', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5n', 'lan-duong'],
  ['Không nhường xe đến từ bên phải (giao nhau không vòng xuyến) hoặc bên trái (có vòng xuyến)', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5o', 'lan-duong'],
  ['Tránh xe ngược chiều sai quy định; không nhường xe ngược chiều ở đường hẹp, dốc, nơi có chướng ngại', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5c', 'lan-duong'],
  ['Không nhường đường hoặc gây cản trở xe ưu tiên đang phát tín hiệu', '6.000.000 – 8.000.000', 4, '', 'NĐ 168 Đ6 k6b', 'lan-duong'],
  ['Lùi xe ở đường một chiều, nơi giao nhau, trên vạch đi bộ, nơi khuất tầm nhìn; lùi không quan sát, không có tín hiệu', '2.000.000 – 3.000.000', 0, '', 'NĐ 168 Đ6 k4e', 'lan-duong'],
  ['Điều khiển xe đi trên vỉa hè (trừ đi qua vỉa hè để vào nhà, cơ quan)', '6.000.000 – 8.000.000', 4, '', 'NĐ 168 Đ6 k6d', 'lan-duong'],
  // Tốc độ
  ['Quá tốc độ từ 05 đến dưới 10 km/h', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3a', 'toc-do'],
  ['Quá tốc độ từ 10 đến 20 km/h', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5đ', 'toc-do'],
  ['Quá tốc độ trên 20 đến 35 km/h', '6.000.000 – 8.000.000', 4, '', 'NĐ 168 Đ6 k6a', 'toc-do'],
  ['Quá tốc độ trên 35 km/h', '12.000.000 – 14.000.000', 6, '', 'NĐ 168 Đ6 k7a', 'toc-do'],
  ['Chạy dưới tốc độ tối thiểu trên đoạn có quy định tốc độ tối thiểu', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3o', 'toc-do'],
  ['Không giữ khoảng cách an toàn để xảy ra va chạm; không theo biển "Cự ly tối thiểu giữa hai xe"', '2.000.000 – 3.000.000', 0, '', 'NĐ 168 Đ6 k4l', 'toc-do'],
  ['Lạng lách, đánh võng; chạy quá tốc độ đuổi nhau; dùng chân điều khiển vô lăng', '40.000.000 – 50.000.000', 0, 'Tước GPLX 10–12 tháng; tái phạm lạng lách, đánh võng bị tịch thu xe', 'NĐ 168 Đ6 k12, k14, k15b', 'toc-do'],
  // Cồn, ma túy
  ['Nồng độ cồn mức 1: chưa vượt quá 50 mg/100 ml máu hoặc 0,25 mg/1 lít khí thở', '6.000.000 – 8.000.000', 4, '', 'NĐ 168 Đ6 k6c', 'con'],
  ['Nồng độ cồn mức 2: trên 50 đến 80 mg/100 ml máu hoặc trên 0,25 đến 0,4 mg/1 lít khí thở', '18.000.000 – 20.000.000', 10, '', 'NĐ 168 Đ6 k9a', 'con'],
  ['Nồng độ cồn mức 3: trên 80 mg/100 ml máu hoặc trên 0,4 mg/1 lít khí thở', '30.000.000 – 40.000.000', 0, 'Tước GPLX 22–24 tháng', 'NĐ 168 Đ6 k11a, k15c', 'con'],
  ['Không chấp hành yêu cầu kiểm tra nồng độ cồn', '30.000.000 – 40.000.000', 0, 'Tước GPLX 22–24 tháng', 'NĐ 168 Đ6 k11b, k15c', 'con'],
  ['Trong cơ thể có chất ma túy, chất kích thích bị cấm; không chấp hành kiểm tra ma túy', '30.000.000 – 40.000.000', 0, 'Tước GPLX 22–24 tháng', 'NĐ 168 Đ6 k11c, d; k15c', 'con'],
  // Điện thoại, dây an toàn, trẻ em, đèn, còi
  ['Dùng tay cầm và sử dụng điện thoại, thiết bị điện tử khi xe đang di chuyển', '4.000.000 – 6.000.000', 4, '', 'NĐ 168 Đ6 k5h', 'an-toan'],
  ['Người lái không thắt dây đai an toàn khi xe chạy', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3k', 'an-toan'],
  ['Chở người không thắt dây đai an toàn (tại vị trí có dây) khi xe chạy', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3l', 'an-toan'],
  ['Cho trẻ dưới 10 tuổi và cao dưới 1,35 m ngồi cùng hàng ghế với người lái (trừ xe chỉ có một hàng ghế)', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3m (sửa bởi NĐ 238/2026)', 'an-toan', 'moi'],
  ['Chở trẻ dưới 10 tuổi và cao dưới 1,35 m không dùng thiết bị an toàn phù hợp (xe không kinh doanh vận tải hành khách)', 'Cảnh cáo', 0, '', 'NĐ 168 Đ6 k1a (bổ sung bởi NĐ 238/2026)', 'an-toan', 'moi'],
  ['Không bật hoặc bật không đủ đèn chiếu sáng từ 18h đến 6h, hoặc khi mưa, sương mù, khói, bụi', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3g', 'an-toan'],
  ['Dùng đèn chiếu xa khi gặp xe ngược chiều, người đi bộ, trong khu đông dân cư có đèn đường, khi chuyển hướng tại giao nhau; còi, rú ga liên tục; còi hơi', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3b', 'an-toan'],
  ['Bấm còi từ 22h đến 5h trong khu đông dân cư, khu vực cơ sở khám chữa bệnh', '400.000 – 600.000', 0, '', 'NĐ 168 Đ6 k1đ', 'an-toan'],
  ['Chạy trong hầm đường bộ không bật đèn chiếu gần', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3n', 'an-toan'],
  ['Mở cửa xe, để cửa xe mở không bảo đảm an toàn', '4.000.000 – 6.000.000', 0, '', 'NĐ 168 Đ6 k5q', 'an-toan'],
  // Dừng đỗ
  ['Ra, vào vị trí dừng, đỗ không có tín hiệu báo', '400.000 – 600.000', 0, '', 'NĐ 168 Đ6 k1b', 'dung-do'],
  ['Gặp sự cố phải đỗ chiếm phần đường mà không bật đèn khẩn cấp, không đặt biển "Chú ý xe đỗ" (đường thường)', '400.000 – 600.000', 0, '', 'NĐ 168 Đ6 k1c', 'dung-do'],
  ['Dừng xe cách lề quá 0,25 m; dừng trên làn xe buýt, miệng cống; rời vị trí lái không dùng phanh đỗ; dừng trên vạch đi bộ; dừng nơi có biển "Cấm dừng xe và đỗ xe"', '600.000 – 800.000', 0, '', 'NĐ 168 Đ6 k2đ', 'dung-do'],
  ['Đỗ xe trên dốc không chèn bánh; dừng đỗ ngược chiều; dừng đỗ trên dải phân cách giữa; ngoài đô thị dừng đỗ trên phần đường xe chạy khi có lề rộng', '600.000 – 800.000', 0, '', 'NĐ 168 Đ6 k2d', 'dung-do'],
  ['Đỗ xe cách lề quá 0,25 m; đỗ trên làn xe buýt; đỗ trên vỉa hè trái quy định; đỗ nơi có biển "Cấm đỗ xe" hoặc "Cấm dừng xe và đỗ xe"', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3e', 'dung-do'],
  ['Dừng, đỗ tại nơi giao nhau hoặc trong 5 m từ mép giao nhau; điểm đón trả khách; trước cổng và 5 m hai bên cổng cơ quan; nơi đường chỉ đủ một làn; che biển, đèn; chỗ mở dải phân cách', '800.000 – 1.000.000', 0, '', 'NĐ 168 Đ6 k3đ', 'dung-do'],
  ['Dừng, đỗ bên trái đường một chiều; trên đường cong, đầu dốc khuất; trên cầu, gầm cầu vượt; song song với xe khác đang dừng đỗ', '2.000.000 – 3.000.000', 2, '', 'NĐ 168 Đ6 k4b', 'dung-do'],
  ['Lùi, quay đầu trong hầm; dừng đỗ trong hầm sai nơi quy định', '2.000.000 – 3.000.000', 2, '', 'NĐ 168 Đ6 k4đ', 'dung-do'],
  ['Dừng, đỗ, quay đầu trái quy định gây ùn tắc giao thông', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5k', 'dung-do'],
  // Cao tốc
  ['Xe không gắn thẻ thu phí không dừng đi vào làn ETC', '2.000.000 – 3.000.000', 2, '', 'NĐ 168 Đ6 k4a', 'cao-toc'],
  ['Chuyển làn sai trên cao tốc (không đúng nơi, không xi nhan, chuyển nhiều làn)', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5g', 'cao-toc'],
  ['Vào, ra cao tốc sai quy định; chạy trên làn dừng khẩn cấp hoặc lề; không giữ khoảng cách an toàn trên cao tốc', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ6 k5d', 'cao-toc'],
  ['Dừng, đỗ trên cao tốc sai nơi quy định; không bật đèn khẩn cấp khi dừng ở làn khẩn cấp; không đặt biển cảnh báo cách tối thiểu 150 m khi buộc dừng trên làn xe chạy', '12.000.000 – 14.000.000', 6, '', 'NĐ 168 Đ6 k7c', 'cao-toc'],
  ['Đi ngược chiều, lùi xe, quay đầu xe trên cao tốc', '30.000.000 – 40.000.000', 10, '', 'NĐ 168 Đ6 k11đ', 'cao-toc'],
  // Tai nạn
  ['Liên quan trực tiếp vụ tai nạn mà không dừng ngay, không giữ nguyên hiện trường, không trợ giúp người bị nạn', '2.000.000 – 3.000.000', 2, '', 'NĐ 168 Đ6 k4g', 'tai-nan'],
  ['Gây tai nạn mà không dừng, không giữ hiện trường, không trợ giúp, không ở lại hoặc không trình báo ngay', '16.000.000 – 18.000.000', 6, '', 'NĐ 168 Đ6 k8', 'tai-nan'],
  ['Vi phạm quy tắc (không quan sát, quá tốc độ, sai làn, khoảng cách, vượt, chuyển hướng, dừng đỗ, lùi…) mà gây tai nạn', '20.000.000 – 22.000.000', 10, '', 'NĐ 168 Đ6 k10', 'tai-nan'],
  // Giấy tờ, xe
  ['Không có GPLX; dùng GPLX đã bị trừ hết điểm, không còn hiệu lực, tẩy xóa, không do cơ quan có thẩm quyền cấp', '18.000.000 – 20.000.000', 0, '', 'NĐ 168 Đ18 k9b', 'giay-to'],
  ['GPLX không phù hợp loại xe, hoặc hết hạn từ 01 năm trở lên', '18.000.000 – 20.000.000', 0, '', 'NĐ 168 Đ18 k9a', 'giay-to'],
  ['GPLX hết hạn dưới 01 năm', '8.000.000 – 10.000.000', 0, '', 'NĐ 168 Đ18 k8a', 'giay-to'],
  ['Không có chứng nhận bảo hiểm bắt buộc TNDS của chủ xe cơ giới còn hiệu lực', '400.000 – 600.000', 0, '', 'NĐ 168 Đ18 k4c', 'giay-to'],
  ['Người từ đủ 16 đến dưới 18 tuổi điều khiển ô tô', '4.000.000 – 6.000.000', 0, '', 'NĐ 168 Đ18 k6', 'giay-to'],
  ['Không có chứng nhận đăng ký xe hoặc đăng ký đã hết hạn, hết hiệu lực', '2.000.000 – 3.000.000', 2, '', 'NĐ 168 Đ13 k4a', 'giay-to'],
  ['Kiểm định (đăng kiểm) hết hạn dưới 01 tháng', '3.000.000 – 4.000.000', 2, '', 'NĐ 168 Đ13 k5a', 'giay-to'],
  ['Không có kiểm định hoặc kiểm định hết hạn từ 01 tháng trở lên', '4.000.000 – 6.000.000', 2, '', 'NĐ 168 Đ13 k6b', 'giay-to'],
  ['Thiếu hoặc hỏng đèn chiếu sáng, đèn phanh, xi nhan, gạt mưa, gương, dây an toàn', '400.000 – 600.000', 0, '', 'NĐ 168 Đ13 k2a', 'giay-to'],
  ['Lắp thêm đèn phía trước, sau, nóc, gầm, hai bên (trừ đèn sương mù dạng rời đúng quy định)', '1.000.000 – 2.000.000', 2, '', 'NĐ 168 Đ13 k3a', 'giay-to'],
  ['Không gắn biển số', '10.000.000 – 12.000.000', 6, '', 'NĐ 168 Đ13 k7b', 'giay-to'],
  ['Gắn biển số sai vị trí, không đủ, không rõ chữ số; che, dán, bẻ cong; dùng vật liệu làm thay đổi khả năng nhận diện biển số', '20.000.000 – 26.000.000', 6, '', 'NĐ 168 Đ13 k8b (nội dung sửa bởi NĐ 238/2026)', 'giay-to', 'moi'],
  ['Gắn biển số không đúng chứng nhận đăng ký hoặc không do cơ quan có thẩm quyền cấp', '20.000.000 – 26.000.000', 10, 'Tịch thu biển số', 'NĐ 168 Đ13 k8a, k10a', 'giay-to'],
  ['Xe ô tô không kinh doanh vận tải hành khách nhưng chở người có thu tiền, ký hợp đồng hoặc nhận đặt chỗ', '12.000.000 – 14.000.000', 6, '', 'NĐ 168 Đ20 k8a (bổ sung bởi NĐ 238/2026)', 'giay-to', 'moi'],
];

const FINE_GROUPS = [
  ['bao-hieu', 'Đèn, biển, hiệu lệnh'],
  ['lan-duong', 'Làn, vượt, nhường đường'],
  ['toc-do', 'Tốc độ, khoảng cách'],
  ['con', 'Nồng độ cồn, ma túy'],
  ['an-toan', 'Điện thoại, dây an toàn, trẻ em, đèn, còi'],
  ['dung-do', 'Dừng, đỗ xe'],
  ['cao-toc', 'Cao tốc'],
  ['tai-nan', 'Tai nạn'],
  ['giay-to', 'Giấy tờ, điều kiện xe'],
];

const PENALTY_PRINCIPLES = [
  ['Hình thức xử phạt', 'Hình thức chính: cảnh cáo, phạt tiền, tịch thu phương tiện. Hình thức bổ sung: tước quyền sử dụng GPLX có thời hạn, tịch thu tang vật. Kèm biện pháp khắc phục hậu quả (buộc lắp lại thiết bị, khôi phục biển số…).', 'NĐ 168 Đ3'],
  ['Mức tiền cụ thể', 'Bảng ghi khung phạt. Mức thường áp dụng là mức trung bình của khung; có tình tiết giảm nhẹ thì giảm dần về mức tối thiểu, có tình tiết tăng nặng thì tăng dần về mức tối đa.', 'Luật XLVPHC Đ23; NĐ 68/2025/NĐ-CP'],
  ['Cá nhân và tổ chức', 'Các mức trong sổ tay là mức phạt cá nhân. Tổ chức vi phạm cùng hành vi bị phạt gấp đôi.', 'NĐ 168 Đ45 k2'],
  ['Thời hiệu', 'Thời hiệu xử phạt vi phạm giao thông đường bộ là 01 năm. Dữ liệu camera (phạt nguội) được dùng trong thời hạn này.', 'NĐ 168 Đ4'],
  ['Phạt nguội (qua camera)', 'Cơ quan chức năng gửi thông báo cho chủ xe bằng văn bản hoặc qua ứng dụng giao thông, đồng thời đăng trên Trang thông tin điện tử Cục CSGT. Chủ xe phải hợp tác xác định người lái; chủ xe là cá nhân không chứng minh được mình không phải người lái thì bị xử phạt.', 'NĐ 168 Đ47 k8'],
  ['Nhiều lỗi trong một lần', 'Mỗi lỗi đều bị phạt tiền. Riêng trừ điểm chỉ áp dụng cho lỗi bị trừ nhiều điểm nhất.', 'NĐ 168 Đ50 k1b'],
  ['Không xuất trình được giấy tờ', 'Bị lập biên bản lỗi "không có" giấy tờ, có thể bị tạm giữ xe. Xe cá nhân xuất trình được giấy tờ hợp lệ (bản giấy hoặc VNeID) trong thời hạn hẹn thì không bị phạt lỗi đó.', 'NĐ 168 Đ48 k3'],
  ['Thẩm quyền', 'Chủ tịch UBND cấp xã phạt tiền đến 37,5 triệu; Chủ tịch UBND cấp tỉnh, Giám đốc Công an tỉnh, Cục trưởng Cục CSGT phạt tiền đến 75 triệu.', 'NĐ 168 Đ42–43, sửa bởi NĐ 238/2026'],
];

const POINTS = [
  ['Số điểm', 'Mỗi GPLX có 12 điểm. Mỗi lần vi phạm bị trừ 2, 4, 6 hoặc 10 điểm tùy hành vi.', 'Luật 36 Đ58 k1'],
  ['Khi nào bị trừ', 'Ngay khi quyết định xử phạt có hiệu lực, dữ liệu trừ điểm cập nhật tự động; người vi phạm được thông báo (văn bản, Cổng dịch vụ công, ứng dụng giao thông, VNeID).', 'NĐ 168 Đ50 k3'],
  ['Phục hồi tự động', 'Chưa bị trừ hết điểm và không bị trừ thêm trong 12 tháng kể từ lần bị trừ gần nhất thì tự động phục hồi đủ 12 điểm.', 'Luật 36 Đ58 k2; NĐ 168 Đ51 k2'],
  ['Bị trừ hết điểm', 'Không được lái xe theo GPLX đó. Sau ít nhất 06 tháng được dự kiểm tra kiến thức pháp luật do CSGT tổ chức; đạt thì phục hồi đủ 12 điểm. Lái xe khi GPLX hết điểm bị phạt như không có GPLX (18–20 triệu).', 'Luật 36 Đ58 k3; NĐ 168 Đ18 k9b'],
  ['Đang bị tước GPLX', 'Không trừ điểm GPLX trong thời gian đang bị tước quyền sử dụng.', 'NĐ 168 Đ50 k1đ'],
  ['Đổi, cấp lại, nâng hạng', 'Giữ nguyên số điểm hiện có.', 'Luật 36 Đ58 k4'],
];

const TOP_MISTAKES = [
  ['Rẽ, quay đầu nơi có biển cấm (nhất là biển phụ theo giờ)', '2–3 triệu', 'Đọc cả biển phụ S.508 trước mỗi lần rẽ; bản đồ trên điện thoại không thay biển.'],
  ['Đi sai làn theo mũi tên tại nút giao', '4–6 triệu, −2 điểm', 'Vào làn sớm từ trước vạch liền; lỡ làn thì đi theo hướng làn rồi quay lại sau.'],
  ['Chuyển hướng không nhường người đi bộ', '4–6 triệu', 'Rẽ phải khi đèn xanh vẫn phải dừng nhường người đi bộ đang qua.'],
  ['Không xi nhan hoặc xi nhan muộn', '600 nghìn–1 triệu', 'Xi nhan trước, đánh lái sau; giữ xi nhan suốt quá trình chuyển hướng.'],
  ['Quá tốc độ 10–20 km/h khi xuống dốc, cao tốc vắng', '4–6 triệu, −2 điểm', 'Bật giới hạn tốc độ (speed limiter) hoặc ga tự động; nhìn đồng hồ sau mỗi biển tốc độ.'],
  ['Dừng đỗ sai: trong 5 m giao lộ, vạch đi bộ, cách lề > 0,25 m', '600 nghìn–1 triệu', 'Chỉ đỗ nơi có biển, vạch cho phép; dùng mốc 25 cm đã tự hiệu chỉnh.'],
  ['Cầm điện thoại khi xe đang chạy, kể cả lúc kẹt xe', '4–6 triệu, −4 điểm', 'Gắn giá đỡ, cài đặt bản đồ trước khi đi; cần gọi thì tấp vào nơi được dừng.'],
  ['Uống "một chút" rồi lái', 'Từ 6–8 triệu, −4 điểm', 'Đã uống rượu bia thì không lái, kể cả sáng hôm sau nếu còn cồn.'],
  ['Vào làn ETC khi tài khoản hết tiền hoặc xe chưa dán thẻ', '2–3 triệu, −2 điểm', 'Nạp tiền trước chuyến đi; kiểm tra ứng dụng thu phí.'],
  ['Lùi xe trên cao tốc vì quá lối ra', '30–40 triệu, −10 điểm', 'Đi tiếp đến nút giao sau; mất 10–20 phút còn hơn mất 10 điểm và gây tai nạn.'],
];

// ---------------------------------------------------------------- PHẦN D: KINH NGHIỆM
const GOLDEN = [
  ['Quan sát là kỹ năng số một', 'Nhìn xa (12–15 giây phía trước), quét gương 5–8 giây một lần. Giáo trình chia hoạt động lái thành ba việc: quan sát, phán đoán, xử lý.'],
  ['Luôn có "đường thoát"', 'Không đi vào chỗ không có lối thoát: không áp sát xe trước, không chạy song song lâu với xe tải, chừa khoảng trống khi dừng đèn đỏ.'],
  ['Quy tắc 3 giây', 'Chọn một mốc cố định; xe trước qua mốc, đếm "một nghìn lẻ một, một nghìn lẻ hai, một nghìn lẻ ba". Mình qua mốc trước khi đếm xong là quá gần. Mưa: 4 giây trở lên. Giáo trình cũng dùng mốc 3 giây (mưa 4 giây) cho cao tốc.'],
  ['Xi nhan – gương – điểm mù – đánh lái', 'Thứ tự bất biến cho mọi lần chuyển làn, rẽ, ra vào chỗ đỗ.'],
  ['Mở cửa bằng tay xa', 'Ngồi ghế lái dùng tay phải mở cửa trái: người tự xoay vai, nhìn được phía sau. Hành khách cũng làm vậy.'],
  ['Chậm mà chắc khi chưa chắc', 'Phân vân có nên vượt, có kịp đèn vàng: chọn không. Giảm tốc luôn rẻ hơn tai nạn.'],
  ['Xe lớn có điểm mù lớn', 'Không thấy gương chiếu hậu của tài xế xe tải thì họ cũng không thấy bạn. Không đi vào phía hông phải xe đầu kéo đang rẽ phải: đuôi rơ moóc quét vào bên trong.'],
  ['Không lái khi mệt, buồn ngủ', 'Nghỉ khoảng 15 phút sau mỗi 2 giờ lái (kinh nghiệm phổ biến). Ngáp liên tục, mắt nặng, không nhớ vài km vừa qua là phải dừng nghỉ ngay ở nơi an toàn.'],
  ['Điện thoại để chế độ lái xe', 'Cài bản đồ, nhạc trước khi lăn bánh. Không nhắn tin, không xem video, kể cả lúc kẹt xe.'],
  ['ADAS chỉ là hỗ trợ', 'Cảnh báo điểm mù, giữ làn, phanh tự động, camera 360 có giới hạn. Mắt và gương vẫn là chính.'],
  ['Bình tĩnh với tài xế khác', 'Không đôi co, không "dạy" người khác bằng cách phanh gấp, chặn đầu. Bị chèn ép thì nhường và ghi lại bằng camera hành trình.'],
  ['Nắm rõ xe của mình', 'Đọc sách hướng dẫn: vị trí đèn khẩn cấp, gạt mưa, sấy kính, phanh tay điện, Auto Hold, chế độ lái, áp suất lốp tiêu chuẩn (tem ở khung cửa).'],
];

const TRAINING_PLAN = [
  ['Giai đoạn 1 – Bãi rộng (2–4 buổi)', 'Tư thế, chỉnh ghế gương; đi thẳng, dừng đúng điểm; đánh lái chuyển tay; tự hiệu chỉnh các điểm căn bằng chai nước, thùng carton; lùi chuồng, ghép ngang, dừng và khởi hành ngang dốc.'],
  ['Giai đoạn 2 – Đường vắng (2–3 buổi)', 'Giữ giữa làn, chuyển làn, rẽ trái phải, quay đầu ở dải phân cách; tập vào lề và dừng cách lề 25 cm. Nên chọn sáng sớm cuối tuần, có người lái lâu năm ngồi cạnh.'],
  ['Giai đoạn 3 – Nội đô thấp điểm (3–5 buổi)', 'Đi qua nút giao có đèn, vòng xuyến; đọc biển phụ giờ; đỗ xe ở bãi, hầm gửi xe; tập xử lý xe máy chen sát.'],
  ['Giai đoạn 4 – Giờ cao điểm, ban đêm, trời mưa', 'Chỉ khi đã tự tin ở giai đoạn 3. Đi tuyến quen trước.'],
  ['Giai đoạn 5 – Cao tốc, đường tỉnh', 'Bắt đầu với đoạn ngắn, ít xe; tập nhập làn, giữ khoảng cách, ra đúng lối. Đèo dốc để sau cùng, đi cùng người có kinh nghiệm.'],
];
// Kinh nghiệm đào tạo; không phải quy định pháp luật.

const CHECKLIST_TRIP = [
  'Lốp: áp suất theo tem khung cửa, kiểm tra cả lốp dự phòng; độ mòn, vết nứt',
  'Dầu máy, nước làm mát, nước rửa kính, gạt mưa',
  'Đèn pha, cốt, phanh, xi nhan, đèn sương mù, còi',
  'Nhiên liệu hoặc mức pin đủ; tài khoản thu phí không dừng còn tiền',
  'Biển cảnh báo tam giác, đèn pin, bộ sơ cứu, nước uống, dây kéo',
  'GPLX, đăng ký xe, kiểm định, bảo hiểm (bản giấy hoặc VNeID)',
  'Ghế trẻ em lắp đúng chiều, đúng vị trí (không ngồi cùng hàng ghế người lái)',
  'Tải bản đồ ngoại tuyến cho đoạn đèo, vùng sóng yếu; xem trước lối vào, lối ra cao tốc',
  'Ngủ đủ; không uống rượu bia từ tối hôm trước',
];

const CHECKLIST_DAILY = [
  'Đi vòng quanh xe: trẻ em, vật cản, lốp',
  'Chỉnh ghế, tựa đầu, gương; thắt dây an toàn cho mọi người',
  'Cài bản đồ, để điện thoại vào giá đỡ',
  'Đạp phanh, kiểm tra cần số ở P trước khi khởi động',
  'Đèn báo trên đồng hồ tắt hết sau khi nổ máy (đèn đỏ là phải dừng kiểm tra)',
];

const EMERGENCY_NUMBERS = [
  ['113', 'Công an'],
  ['114', 'Cứu nạn, cứu hộ, phòng cháy chữa cháy'],
  ['115', 'Cấp cứu y tế'],
];

const SOURCES = [
  ['Luật Trật tự, an toàn giao thông đường bộ số 36/2024/QH15', 'Văn bản gốc (file trong repo: 36_2024_QH15_444251.docx)', ''],
  ['Nghị định 168/2024/NĐ-CP', 'Văn bản gốc (file trong repo: 168_2024_ND-CP_619502.docx)', ''],
  ['Giáo trình Kỹ thuật lái xe ô tô – Tổng cục Đường bộ Việt Nam (2018)', 'File trong repo: ky-thuat-lai-ban-cuoi19-9-2018.pdf', ''],
  ['Nghị định 238/2026/NĐ-CP – Cổng Xây dựng chính sách, Chính phủ', 'xaydungchinhsach.chinhphu.vn', 'https://xaydungchinhsach.chinhphu.vn/nghi-dinh-so-238-2026-nd-cp-sua-doi-quy-dinh-xu-phat-vi-pham-giao-thong-duong-bo-tru-diem-phuc-hoi-diem-giay-phep-lai-xe-119260630142033452.htm'],
  ['Nghị định 238/2026/NĐ-CP – Bộ Công an', 'bocongan.gov.vn', 'https://bocongan.gov.vn/chinh-sach-phap-luat/bai-viet/chinh-phu-ban-hanh-nghi-dinh-so-238-2026-nd-cp-sua-doi-bo-sung-mot-so-dieu-cua-nghi-dinh-so-168-2024-nd-cp-1786704471'],
  ['Nghị định 238/2026/NĐ-CP – LuatVietnam', 'luatvietnam.vn', 'https://luatvietnam.vn/vi-pham-hanh-chinh/nghi-dinh-238-2026-nd-cp-sua-doi-nghi-dinh-168-2024-ve-xu-phat-vi-pham-giao-thong-438987-d1.html'],
  ['Loạt quy định mới về xử phạt giao thông từ 15/8 – VnEconomy', 'vneconomy.vn', 'https://vneconomy.vn/automotive/loat-quy-dinh-moi-ve-xu-phat-vi-pham-giao-thong-duong-bo-tu-158.htm'],
  ['Thông tư 38/2024/TT-BGTVT (toàn văn) – LuatVietnam', 'luatvietnam.vn', 'https://luatvietnam.vn/giao-thong/thong-tu-38-2024-tt-bgtvt-toc-do-khoang-cach-an-toan-cua-xe-may-chuyen-dung-tham-gia-giao-thong-375831-d1.html'],
  ['QCVN 41:2024/BGTVT – Hệ thống pháp luật (Điều 4, 6, 7, 11, 15, 22, 26, 41, 49, 50)', 'hethongphapluat.com', 'https://hethongphapluat.com/quy-chuan-ky-thuat-quoc-gia-qcvn-41-2024-bgtvt-ve-bao-hieu-duong-bo/dieu-26'],
  ['Ban hành QCVN 41:2024/BGTVT – Sở Tư pháp Cần Thơ', 'pbgdpl.cantho.gov.vn', 'https://pbgdpl.cantho.gov.vn/ban-hanh-quy-chuan-ky-thuat-quoc-gia-ve-bao-hieu-duong-bo'],
  ['Cấm rẽ trái có cấm quay đầu? – VOV', 'vov.vn', 'https://vov.vn/o-to-xe-may/quy-dinh-moi-tai-xe-phai-biet-cam-re-trai-co-cam-quay-dau-xe-post1320128.vov'],
  ['Nguyên tắc xác định mức phạt khi có tình tiết tăng nặng, giảm nhẹ – Sở Tư pháp Cần Thơ', 'pbgdpl.cantho.gov.vn', 'https://pbgdpl.cantho.gov.vn/nguyen-tac-xac-dinh-muc-phat-tien-voi-mot-hanh-vi-vi-pham-hanh-chinh-co-tinh-tiet-tang-nang-giam-nhe'],
  ['Kinh nghiệm giữ xe giữa làn – oto.com.vn', 'oto.com.vn', 'https://oto.com.vn/kinh-nghiem-lai-xe/o-to-cho-nguoi-moi-cach-de-o-to-luon-o-chinh-giua-lan-duong-articleid-vjozod3'],
  ['Hai cách đỗ xe cơ bản cho tài xế mới – VnExpress', 'vnexpress.net', 'https://vnexpress.net/hai-cach-do-xe-co-ban-cho-tai-xe-moi-4861253.html'],
];

const LIMITS = [
  'Mã hiệu biển nhóm P, DP, S đã đối chiếu với QCVN 41:2024. Mã nhóm R, W, I lấy theo hệ thống mã của quy chuẩn qua nguồn thứ cấp; hình minh họa trong sổ tay là giản lược, biển thật có thể khác chi tiết.',
  'Mã hiệu từng loại vạch kẻ đường (Phụ lục G của QCVN 41:2024) chưa đọc được bản gốc nên sổ tay chỉ trình bày nguyên tắc, không ghi mã vạch.',
  'Thông tư 38/2024 được ghi nhận là có văn bản sửa đổi (09/2025/TT-BXD) và văn bản hợp nhất năm 2026; chưa đọc được nội dung sửa đổi. Các trị số tốc độ, khoảng cách trong sổ tay lấy theo toàn văn Thông tư 38/2024. Năm 2026, Bộ Xây dựng đang rà soát quy định khoảng cách an toàn trên cao tốc.',
  'Phần NĐ 238/2026 sau Điều 9 chỉ đọc được qua bản tóm tắt; chưa thấy sửa đổi nào về mức phạt nồng độ cồn, tốc độ, điện thoại, đèn đỏ, nhưng chưa thể khẳng định tuyệt đối.',
  'Phần "điểm căn xe" và "kinh nghiệm" là kinh nghiệm thực hành, không phải quy định pháp luật. Mỗi mẫu xe, chiều cao người lái và tư thế ghế cho mốc khác nhau, vì vậy sổ tay hướng dẫn cách tự hiệu chỉnh thay vì đưa con số cố định.',
  'Sổ tay mang tính tham khảo, không thay thế văn bản pháp luật gốc. Mức phạt cụ thể trong khung do người có thẩm quyền quyết định.',
];

module.exports = {
  META, LEGAL, PRECHECK, SEAT, STEERING, PEDALS, GEARS_AT, START_STOP, ALIGN_TEXTBOOK, ALIGN_CALIBRATE,
  LANE_CHANGE, MANEUVERS, ROADS, EMERGENCY, PRIORITY, POLICE, LIGHTS, SIGN_GROUPS, SIGN_SCOPE, AUX_SIGNS,
  SIGNS, MARKINGS, YIELD_RULES, SPEED_IN, SPEED_OUT, DISTANCE, FINES, FINE_GROUPS, PENALTY_PRINCIPLES,
  POINTS, TOP_MISTAKES, GOLDEN, TRAINING_PLAN, CHECKLIST_TRIP, CHECKLIST_DAILY, EMERGENCY_NUMBERS, SOURCES, LIMITS,
};
