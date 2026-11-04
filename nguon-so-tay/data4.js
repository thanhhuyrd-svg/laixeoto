// Bản 4: lái xe số tự động, câu truyền miệng, lời đồn sai.
// src: 'gt' giáo trình KTLX 2018; 'luat' văn bản pháp luật; 'bao' báo chí, trang chuyên ngành; 'kn' kinh nghiệm phổ biến

const AT_GEARS_EXTRA = [
  ['P (Park)', 'Khóa hộp số khi đỗ. Chỉ gài khi xe đã dừng hẳn. Không thay cho phanh tay.'],
  ['R (Reverse)', 'Lùi. Chỉ gài khi xe đã dừng hẳn; đạp phanh hết hành trình khi chuyển từ P sang R.'],
  ['N (Neutral)', 'Số 0, không truyền lực. Dùng khi dừng lâu (kèm phanh tay), đẩy xe, qua trạm rửa xe. Không dùng khi xe đang chạy.'],
  ['D (Drive)', 'Số tiến bình thường, hộp số tự lên xuống cấp.'],
  ['L, 1, 2, D3, S, B', 'Giới hạn số thấp: lên dốc cao, xuống dốc dài (phanh động cơ), đường trơn. Tên gọi tùy hãng; S ở nhiều xe là chế độ thể thao hoặc cho phép chuyển tay.'],
  ['M, +/−, lẫy chuyển số', 'Chuyển số bằng tay: gạt "−" để xuống số (tăng phanh động cơ), "+" để lên số. Hộp số vẫn tự can thiệp để bảo vệ động cơ.'],
];

const AT_RULES = [
  { t: 'Chỉ dùng một chân phải', d: 'VnExpress: "Chân trái luôn luôn để ở phần chờ, không dùng vào bất cứ thao tác nào trên xe số tự động." Chân phải điều khiển cả ga lẫn phanh. Dùng hai chân dễ đạp cùng lúc ga và phanh hoặc nhầm chân khi hoảng.', src: 'kn', ref: 'VnExpress 3/10/2014; oto.com.vn' },
  { t: 'Chuyển số phải đạp phanh, P sang R thì đạp hết hành trình', d: 'Giáo trình: "Để chuyển từ số P sang số lùi (R), người lái xe phải đạp phanh chân hết hành trình". Hầu hết xe có khóa cần số: không đạp phanh thì không gạt được ra khỏi P. Nguyên tắc chung: mọi lần đổi số giữa P, R, N, D đều đạp phanh.', src: 'gt', ref: 'Giáo trình 2.9.2' },
  { t: 'Gài xong phải kiểm tra lại số', d: 'Giáo trình: "Khi gài số D để tiến (hoặc số R để lùi), phải giữ chặt chân phanh và kiểm tra lại xem có bị nhầm số không rồi mới được cho xe lăn bánh." Nhìn chữ P, R, N, D trên đồng hồ, không chỉ nhìn cần số.', src: 'gt', ref: 'Giáo trình 2.9.2' },
  { t: 'Chỉ đổi giữa D và R khi xe đã dừng hẳn', d: 'Đổi chiều khi xe còn lăn làm hộp số chịu tải sốc, có thể hỏng. Dừng hẳn, giữ phanh, rồi mới gạt.', src: 'bao', ref: 'oto.com.vn; mytour.vn' },
  { t: 'Khởi động ở P, đạp hết phanh', d: 'Cần số ở P (hoặc N), đạp hết hành trình phanh, rồi vặn chìa hoặc bấm nút khởi động. Đèn báo trên đồng hồ phải tắt hết sau khi nổ máy.', src: 'gt', ref: 'Giáo trình 2.10.2' },
  { t: 'Xe tự bò: nhả phanh là xe đi', d: 'Ở D hoặc R, nhả phanh thì xe tự chạy chậm mà không cần ga. Khi lùi chuồng, ra vào hầm, kẹt xe: chỉ điều khiển bằng việc nhả và rà phanh, không chạm ga.', src: 'kn', ref: 'Kinh nghiệm phổ biến; Giáo trình 2.9.2 (hiện tượng xe tự chuyển động)' },
  { t: 'Dừng ở N hoặc P vẫn phải giữ phanh', d: 'Giáo trình: "Khi dừng xe mà cài số P hoặc số N cần đạp phanh chân nếu không xe vẫn cứ tiến…, trường hợp cần thiết phải kéo phanh tay cho an toàn." Dừng đèn đỏ ngắn: cứ để D và giữ phanh (hoặc dùng Auto Hold). Dừng lâu: có thể về N hoặc P kèm phanh tay. Các nguồn chưa thống nhất việc nên về N khi dừng đèn đỏ.', src: 'gt', ref: 'Giáo trình 2.9.2; VnExpress; oto.com.vn' },
  { t: 'Không về N khi xe đang chạy', d: 'Thả trôi ở N làm mất phanh động cơ, xe trôi nhanh, phải phanh nhiều hơn; khi cần tăng tốc tránh nguy hiểm thì không có lực kéo. Đặc biệt không về N khi xuống dốc.', src: 'bao', ref: 'oto.com.vn; Giáo trình 3.3.3 (xuống dốc dùng phanh động cơ)' },
  { t: 'Đỗ xe: phanh chân, phanh tay, rồi mới về P', d: 'Trình tự: đạp phanh cho xe dừng hẳn → kéo phanh tay (hoặc bật phanh tay điện) → nhả nhẹ phanh chân cho xe tì vào phanh tay → về P → tắt máy. Làm vậy để trọng lượng xe không dồn lên chốt khóa P, nhất là khi đỗ dốc. Các nguồn không thống nhất thứ tự (VnExpress 2014 hướng dẫn về P, tắt máy rồi kéo phanh tay; oto.com.vn 2019 khuyên kéo phanh tay trước rồi mới về P); điểm chung là phải có cả P và phanh tay. Đỗ dốc còn phải đánh lái về phía lề và chèn bánh (Luật 36 Đ18 k2).', src: 'bao', ref: 'oto.com.vn; VnExpress; Giáo trình 2.9.2 ("Khi đỗ xe phải cài số P và kéo phanh tay")' },
  { t: 'Xuống dốc dài dùng số thấp', d: 'Giáo trình: "Nếu xuống dốc dài phải cài số 2 hoặc số 1 (L)." Báo Quốc tế (2025): số L hoặc 1 cho dốc đứng, đèo dài; số 2 cho dốc trung bình; S giữ xe ở cấp số thấp; tránh đổ đèo bằng số D vì phải rà phanh nhiều, dễ nóng phanh. Kinh nghiệm: lên dốc dùng số nào thì xuống dốc dùng số ấy (khi độ dốc như nhau; dốc gắt hơn thì số thấp hơn).', src: 'gt', ref: 'Giáo trình 2.9.2, 3.3.3; Báo Quốc tế 28/5/2025; oto.com.vn' },
  { t: 'Lên dốc cao: số thấp từ chân dốc', d: 'Chọn L, 2 hoặc chế độ M số thấp trước khi lên dốc dài, đều ga. Dừng giữa dốc: dùng phanh, Auto Hold hoặc hỗ trợ khởi hành ngang dốc; không giữ xe đứng yên trên dốc bằng chân ga.', src: 'kn', ref: 'Giáo trình 3.3.2; kinh nghiệm (đặc biệt với hộp số ly hợp kép DCT)' },
  { t: 'Không đạp ga khi đang ở N hoặc P rồi gạt vào D', d: 'Vòng tua cao mà vào số sẽ làm xe giật mạnh, có thể lao đi và hại hộp số. Gạt số khi máy ở vòng tua không tải.', src: 'kn', ref: 'Kinh nghiệm phổ biến' },
  { t: 'Kick-down khi cần vượt', d: 'Đạp ga sâu dứt khoát thì hộp số tự giảm cấp để tăng tốc. Chỉ dùng khi đã chắc chắn đủ điều kiện vượt; đạp ga sâu ở đường trơn có thể làm bánh xe trượt.', src: 'kn', ref: 'Kinh nghiệm phổ biến' },
  { t: 'Chống nhầm chân ga, chân phanh', d: 'Đặt gót chân phải cố định trước bàn đạp phanh, xoay mũi bàn chân sang ga khi cần ga. Hoảng hoặc không chắc: nhấc chân khỏi ga trước. Không đi dép, giày cao gót khi lái.', src: 'kn', ref: 'Kinh nghiệm phổ biến; Giáo trình 2.1 (giày đế thấp)' },
  { t: 'Biết dùng Auto Hold và phanh tay điện', d: 'Auto Hold giữ xe đứng yên khi dừng mà không cần giữ phanh; đạp ga là tự nhả. Phanh tay điện thường tự nhả khi thắt dây an toàn, đóng cửa và đạp ga. Đọc sách hướng dẫn của xe để biết điều kiện cụ thể.', src: 'kn', ref: 'Sách hướng dẫn sử dụng của từng xe' },
  { t: 'Kéo xe số tự động hỏng: theo sách hướng dẫn', d: 'Nhiều xe số tự động không được kéo với bánh chủ động lăn trên đường quãng dài. Gọi cứu hộ nâng bánh hoặc chở cả xe nếu sách hướng dẫn yêu cầu.', src: 'kn', ref: 'Sách hướng dẫn sử dụng của từng xe' },
];

const AT_ROUTINES = [
  { name: 'Khởi hành', steps: ['Thắt dây an toàn, chỉnh ghế, gương.', 'Đạp hết phanh, khởi động (cần số ở P).', 'Giữ phanh, gạt sang D (hoặc R); nhìn đồng hồ xác nhận số.', 'Nhả phanh tay; quan sát gương, điểm mù, xi nhan.', 'Nhả phanh từ từ cho xe bò, rồi chuyển chân sang ga nhẹ.'] },
  { name: 'Lùi xe vào chỗ đỗ', steps: ['Dừng hẳn, giữ phanh, gạt R, nhìn đồng hồ.', 'Quan sát gương, camera, quay đầu nhìn trực tiếp.', 'Chỉ nhả phanh từ từ để xe bò lùi, không đạp ga (trừ khi lên dốc).', 'Lệch hướng thì dừng, tiến lên chỉnh rồi lùi tiếp.', 'Đến vị trí: phanh dừng hẳn → phanh tay → về P → tắt máy.'] },
  { name: 'Dừng đèn đỏ, kẹt xe', steps: ['Dừng ngắn: để D, giữ phanh (hoặc bật Auto Hold).', 'Dừng lâu hoặc phải rời tay chân: về N hoặc P và kéo phanh tay.', 'Kẹt xe nhích từng đoạn: chỉ nhả và rà phanh, không chạm ga.', 'Giữ khoảng cách đủ thấy bánh sau của xe trước để còn đường thoát.'] },
  { name: 'Xuống đèo, dốc dài', steps: ['Trước khi xuống dốc: giảm tốc, chọn số thấp (L, 2, D3, S hoặc M với số nhỏ).', 'Dùng phanh động cơ là chính; rà phanh chân ngắt quãng khi xe nhanh lên.', 'Xe vẫn nhanh dù đã rà phanh: xuống thêm một số.', 'Không về N, không tắt máy khi đổ dốc.', 'Có mùi khét hoặc phanh mềm: tìm chỗ an toàn dừng cho phanh nguội.'] },
  { name: 'Đỗ xe trên dốc', steps: ['Phanh dừng hẳn, đánh lái về phía lề (có bó vỉa: theo hướng dẫn mục A8).', 'Kéo phanh tay chắc chắn, nhả nhẹ phanh chân cho xe tì vào phanh tay.', 'Về P, tắt máy, chèn bánh nếu đỗ lâu.', 'Khi đi: đạp phanh, khởi động, gạt D hoặc R, rồi mới nhả phanh tay.'] },
];

// Câu truyền miệng, câu dễ nhớ
// [câu, ý nghĩa, đánh giá, nguồn]
const SAYINGS = [
  { grp: 'Quan sát và thao tác', rows: [
    ['Gương – xi nhan – ngoái đầu – đánh lái', 'Thứ tự cho mọi lần chuyển làn, rẽ, ra vào chỗ đỗ.', 'Đúng', 'Giáo trình 2.16–2.18 (quan sát, báo hiệu, quan sát lại rồi mới đánh lái)'],
    ['Mắt nhìn xa, tay lái nhẹ', 'Nhìn xa phía trước thì xe đi thẳng, tay chỉ chỉnh nhẹ; nhìn sát đầu xe thì xe lắc.', 'Đúng', 'Giáo trình 3.1.2 (ba điểm thẳng hàng)'],
    ['Xi nhan trước, đánh lái sau', 'Bật xi nhan trước vài giây để người khác kịp biết.', 'Đúng', 'Luật 36 Đ13 k2, Đ15 k2'],
    ['Mở cửa bằng tay xa', 'Ngồi ghế lái dùng tay phải mở cửa trái để buộc người xoay vai nhìn ra sau.', 'Đúng', 'Kinh nghiệm phổ biến; Luật 36 Đ19 (phải quan sát trước khi mở cửa)'],
    ['Không thấy gương tài xế xe tải thì họ không thấy mình', 'Tránh đi vào điểm mù của xe lớn.', 'Đúng', 'Giáo trình 4.1 (điểm mù)'],
    ['Đầu xe về phía nguy hiểm, đuôi xe về phía an toàn', 'Khi quay đầu ở nơi địa hình nguy hiểm, tiến lùi nhiều lần.', 'Đúng', 'Giáo trình 2.20.4'],
  ]},
  { grp: 'Tốc độ, khoảng cách, đường xấu', rows: [
    ['Ba giây an toàn, mưa thì bốn', 'Giữ khoảng cách bằng thời gian đếm qua một mốc cố định.', 'Đúng', 'Giáo trình 3.10.1 (3 giây, mưa 4 giây)'],
    ['Nhả ga trước cua, ra cua mới ga', 'Giảm tốc trước khi vào cua, đánh lái đều, ra khỏi cua mới tăng ga.', 'Đúng', 'Giáo trình 3.3.7'],
    ['Lên dốc số nào, xuống dốc số ấy', 'Xuống dốc dùng cùng số thấp như khi leo một con dốc tương đương để phanh động cơ; dốc gắt hơn thì về số thấp hơn.', 'Đúng, là mẹo kinh nghiệm', 'Giáo viên sát hạch (qua báo chí); oto.com.vn; Giáo trình 3.3.3'],
    ['Đầu lạnh, phanh lạnh', 'Đổ đèo cần cái đầu bình tĩnh và phanh không bị nóng: dùng số thấp, ít đạp phanh. "Một tài già đổ đèo có tổng thời gian đạp phanh chỉ bằng 10% một lính mới."', 'Đúng', 'VnExpress 21/10/2016 (bài độc giả)'],
    ['Không ga thì hờ phanh', 'Khi chân không đạp ga thì đặt hờ trên phanh, sẵn sàng phanh ngay.', 'Đúng', 'oto.com.vn'],
    ['Chân trái để yên, chân phải làm hết', 'Xe số tự động chỉ dùng chân phải cho cả ga và phanh.', 'Đúng', 'VnExpress 3/10/2014'],
    ['Lùi xe: nhả phanh là đủ', 'Xe số tự động tự bò khi nhả phanh; lùi chuồng không cần chạm ga.', 'Đúng (đường bằng)', 'Kinh nghiệm phổ biến'],
    ['Đường trơn: nhẹ ga, nhẹ lái, nhẹ phanh', 'Mọi thao tác nhẹ nhàng, không phanh gấp, không đánh lái gấp.', 'Đúng', 'Giáo trình 3.4.2'],
    ['Đuôi trượt bên nào, đánh lái bên đó', 'Khi đuôi xe trượt, đánh lái nhẹ theo hướng đuôi xe trượt để xe thẳng lại.', 'Đúng', 'Giáo trình 3.4.2'],
    ['Đèn pha gặp xe thì cốt', 'Gặp xe ngược chiều, người đi bộ, khu dân cư có đèn đường thì chuyển đèn chiếu gần.', 'Đúng', 'Luật 36 Đ20 k2'],
    ['Bóng đen biến mất là ổ gà nhỏ, còn là ổ gà lớn', 'Kinh nghiệm đọc mặt đường ban đêm bằng đèn pha.', 'Đúng', 'Giáo trình 3.9.1'],
  ]},
  { grp: 'Nhường đường', rows: [
    ['Xuống dốc nhường lên dốc', 'Trên đường hẹp, xe xuống dốc phải nhường xe lên dốc.', 'Đúng', 'Luật 36 Đ17 k2b'],
    ['Gần chỗ tránh thì vào tránh', 'Đường chỉ đủ một xe: xe nào gần chỗ tránh hơn thì vào chỗ tránh.', 'Đúng', 'Luật 36 Đ17 k2a'],
    ['Không vòng xuyến nhường phải, có vòng xuyến nhường trái', 'Quy tắc nhường đường tại nơi giao nhau không có đèn, biển ưu tiên.', 'Đúng', 'Luật 36 Đ22'],
    ['Nhất sớm, nhì tiên, tam đèn, tứ hướng', 'Mẹo thi lý thuyết về thứ tự xe qua ngã tư: (1) xe đã vào nút giao (qua vạch dừng) đi trước; (2) xe ưu tiên, rồi xe trên đường ưu tiên; (3) theo đèn tín hiệu; (4) theo hướng: rẽ phải, đi thẳng, rẽ trái. Có nhiều biến thể truyền miệng khác nhau.', 'Mẹo thi; ngoài đường vẫn áp dụng Luật 36 Đ22, Đ27', 'oto.com.vn (22/6/2021, đọc qua bản tóm tắt)'],
  ]},
  { grp: 'Biển báo, vạch kẻ', rows: [
    ['Tròn đỏ cấm, tròn xanh làm, tam giác coi chừng, vuông xanh chỉ dẫn', 'Nhận diện nhóm biển bằng hình dạng và màu.', 'Đúng', 'Luật 36 Đ11 k5; QCVN 41:2024 Điều 11'],
    ['Vàng chia hai chiều, trắng chia cùng chiều', 'Vạch vàng phân chia hai chiều ngược nhau; vạch trắng phân chia làn cùng chiều.', 'Đúng', 'QCVN 41:2024 Phụ lục G'],
    ['Liền là cấm, đứt mới qua', 'Vạch liền không được đè, vạch đứt được cắt qua khi an toàn.', 'Đúng, nhưng vạch mép 3.1 là ngoại lệ (được đè khi cần thiết)', 'QCVN 41:2024 Phụ lục G'],
    ['Biển gặp ngã tư là hết', 'Nhiều biển cấm (cấm vượt, tốc độ tối đa, cấm dừng đỗ) hết hiệu lực ở nơi giao nhau kế tiếp nếu không được nhắc lại.', 'Đúng một phần: P.101 đến P.120 không có biển hết cấm', 'QCVN 41:2024 Điều 26'],
  ]},
  { grp: 'Khẩu hiệu an toàn quen thuộc', rows: [
    ['Đã uống rượu bia thì không lái xe', 'Không có mức cồn nào được phép.', 'Đúng', 'Luật 36 Đ9 k2'],
    ['Chậm một chút, an toàn hơn nhiều', 'Giảm tốc khi không chắc chắn.', 'Đúng', 'Luật 36 Đ12 k2, k3'],
    ['Đi trước về sau', 'Xuất phát sớm để không phải vội trên đường.', 'Kinh nghiệm', 'Truyền miệng'],
  ]},
];

// Lời đồn sai hoặc chưa đúng hẳn
const MYTHS = [
  ['Đèn vàng còn kịp thì cứ đi, dừng lại mới nguy hiểm', 'Sai', 'Chưa đến vạch dừng thì phải dừng. Chỉ khi đang ở trên hoặc đã qua vạch dừng mới được đi tiếp. Phạt 18–20 triệu, trừ 4 điểm.', 'Luật 36 Đ11 k4b; NĐ 168 Đ6 k9b'],
  ['Rẽ phải thì lúc nào cũng được đi, kể cả đèn đỏ', 'Sai', 'Chỉ được rẽ khi có mũi tên xanh rẽ phải đang sáng; QCVN 41:2024 không có biển cho phép rẽ phải khi đèn đỏ.', 'QCVN 41 Đ6.4.3'],
  ['Biển cấm rẽ trái thì cũng cấm quay đầu', 'Sai', 'P.123a không có giá trị cấm quay đầu; cấm quay đầu là P.124.', 'QCVN 41 Phụ lục B.23'],
  ['Vạch đứt là có quyền vượt', 'Chưa đủ', 'Vạch đứt chỉ cho phép cắt qua; vẫn phải đủ điều kiện vượt và không ở nơi cấm vượt.', 'Luật 36 Đ14 k3, k6'],
  ['Gặp xe đỗ chắn làn thì được lấn vạch liền', 'Sai', 'Vạch 1.2, 1.3, 2.2 không có ngoại lệ chướng ngại vật; phải dừng chờ, trừ khi CSGT hoặc biển tạm thời hướng dẫn.', 'QCVN 41 Phụ lục G'],
  ['Uống một chút, đo dưới 0,25 là không sao', 'Sai', 'Có cồn là vi phạm; mức 1 đã phạt 6–8 triệu, trừ 4 điểm.', 'Luật 36 Đ9 k2; NĐ 168 Đ6 k6c'],
  ['Xuống dốc về N cho đỡ tốn xăng', 'Sai, nguy hiểm', 'Mất phanh động cơ, phanh nóng nhanh. Xuống dốc dài phải dùng số thấp.', 'Giáo trình 2.9.2, 3.3.3'],
  ['Mưa to thì bật đèn khẩn cấp cho xe sau thấy', 'Không nên', 'Luật yêu cầu bật đèn chiếu sáng khi mưa; đèn khẩn cấp làm xe sau không phân biệt được xi nhan và tưởng xe đang dừng. Bật đèn chiếu gần, đèn sương mù, giảm tốc.', 'Luật 36 Đ20 k1; kinh nghiệm'],
  ['Chạy đúng tốc độ tối đa trên biển là an toàn', 'Chưa đủ', 'Phải giữ tốc độ phù hợp điều kiện đường, mật độ, thời tiết; nhiều tình huống bắt buộc giảm tốc.', 'Luật 36 Đ12 k2, k3'],
  ['Xe số tự động lùi thì phải đạp ga', 'Không cần', 'Nhả phanh là xe tự bò; đạp ga khi lùi chuồng dễ va chạm.', 'Kinh nghiệm; Giáo trình 2.9.2'],
  ['Dừng đèn đỏ xe số tự động bắt buộc phải về N', 'Không bắt buộc', 'Dừng ngắn có thể giữ D và phanh; dừng lâu có thể về N hoặc P kèm phanh tay. Các nguồn chưa thống nhất.', 'Giáo trình 2.9.2; báo chí'],
  ['Phạt nguội quá 1 năm là hết bị phạt', 'Đúng một phần', 'Thời hiệu xử phạt là 1 năm; quá thời hạn mà chưa ra quyết định thì kết quả camera hết giá trị, trừ trường hợp cố tình trốn tránh, cản trở việc xử phạt.', 'NĐ 168 Đ4 k1, k2'],
  ['Có camera 360, cảm biến thì không cần quay đầu nhìn', 'Sai', 'Thiết bị chỉ hỗ trợ; luật yêu cầu người lái quan sát hai bên và phía sau khi lùi, chuyển hướng.', 'Luật 36 Đ15 k2, Đ16 k1; Giáo trình 2.13'],
];

module.exports = { AT_GEARS_EXTRA, AT_RULES, AT_ROUTINES, SAYINGS, MYTHS };
