// Nội dung mở rộng (bản 2): ngoại lệ, vạch kẻ theo Phụ lục G, đọc biển phụ, biển cấm và ngoại lệ,
// xử lý tai nạn, bảo hiểm, trách nhiệm pháp lý.

// ---------------------------------------------------------------- VẠCH KẺ ĐƯỜNG (QCVN 41:2024 Phụ lục G)
// [mã, tên, hình thức – màu, quy định (trích sát văn bản), được cắt/đè?, sơ đồ]
const MARKINGS_G = [
  { grp: 'Vạch phân chia hai chiều xe chạy (vạch tim đường)', rows: [
    ['1.1', 'Vạch đơn, đứt nét', 'Vàng', 'Xe được phép cắt qua để sử dụng làn ngược chiều từ cả hai phía (dùng nơi không có yêu cầu cấm vượt).', 'Được cắt qua', 'm_yellow_dash'],
    ['1.2', 'Vạch đơn, liền nét', 'Vàng', 'Xe không được lấn làn, không được đè lên vạch. Dùng ở đoạn không đủ tầm nhìn để vượt xe.', 'Cấm', 'm_yellow_solid'],
    ['1.3', 'Vạch đôi song song, liền nét', 'Vàng', 'Xe không được lấn làn, không được đè lên vạch. Dùng cho đường từ 4 làn xe cơ giới trở lên không có dải phân cách giữa. Chỗ cần cho xe cắt ngang qua thì vạch được đổi thành đoạn đứt nét màu vàng.', 'Cấm (trừ đoạn sơn đứt)', 'm_yellow_double'],
    ['1.4', 'Vạch đôi: một liền, một đứt', '—', 'Xe ở phía vạch đứt được phép cắt qua và sử dụng làn ngược chiều khi cần thiết; xe ở phía vạch liền không được lấn làn hoặc đè lên vạch.', 'Tùy phía', 'm_yellow_mixed'],
    ['1.5', 'Vạch đôi, đứt nét', 'Vàng', 'Giới hạn làn có thể thay đổi chiều xe chạy; chiều đi của làn do người điều khiển giao thông, đèn tín hiệu, biển báo quy định.', 'Theo đèn, biển', ''],
  ]},
  { grp: 'Vạch phân chia các làn cùng chiều', rows: [
    ['2.1', 'Vạch đơn, đứt nét', 'Trắng', 'Xe được phép chuyển làn qua vạch.', 'Được chuyển làn', 'm_white_dash'],
    ['2.2', 'Vạch đơn, liền nét', 'Trắng', 'Không cho phép xe chuyển làn hoặc sử dụng làn khác; xe không được lấn làn, không được đè lên vạch. Thường gặp gần nút giao, trên cầu, trong hầm.', 'Cấm', 'm_white_solid'],
    ['2.3', 'Vạch giới hạn làn dành riêng (liền) hoặc làn ưu tiên (đứt), rộng 30 cm', 'Trắng', 'Vạch liền: xe khác không được đi vào làn, trừ trường hợp khẩn cấp. Vạch đứt: xe khác được dùng làn nhưng phải nhường đường cho xe được ưu tiên. Với làn xe buýt (biển R.412): vạch nét đứt thì xe khác được đi vào nhưng phải ưu tiên xe buýt; vạch nét liền thì xe khác không được đi vào.', 'Liền: cấm · Đứt: được, nhường', 'm_bus_lane'],
    ['2.4', 'Vạch đôi: một liền, một đứt', 'Trắng', 'Phía vạch đứt được phép cắt qua khi cần thiết; phía vạch liền không được lấn làn hoặc đè lên vạch.', 'Tùy phía', ''],
  ]},
  { grp: 'Vạch mép đường, vạch chuyển làn', rows: [
    ['3.1', 'Vạch giới hạn mép phần xe chạy: liền (3.1a) hoặc đứt (3.1b)', '—', 'Xác định mép ngoài phần xe chạy hoặc phân cách xe cơ giới với xe thô sơ. Xe chạy được phép đè lên vạch khi cần thiết và phải nhường đường cho xe thô sơ.', 'Được đè khi cần thiết', 'm_edge'],
    ['3.2', 'Vạch chuyển làn, liền (rộng 30 cm, cao tốc 45 cm)', 'Trắng', 'Xe không được phép chuyển làn qua vạch, trừ các trường hợp khẩn cấp (dùng ở lối vào, lối ra, làn tăng tốc, giảm tốc).', 'Cấm (trừ khẩn cấp)', ''],
    ['3.3', 'Vạch chuyển làn, đứt', 'Trắng', 'Xe được phép cắt, chuyển làn qua vạch.', 'Được', ''],
    ['3.4', 'Vạch đứt báo trước', 'Trắng', 'Báo trước sắp đến đoạn vạch liền (1.2 hoặc 2.2): chuẩn bị ở đúng làn.', 'Được (sắp hết)', ''],
  ]},
  { grp: 'Vạch kênh hóa, vùng cấm', rows: [
    ['4.1', 'Gạch chéo song song (vạch chéo)', 'Trắng', 'Phương tiện phải đi theo tuyến quy định, không được lấn vạch hoặc cắt qua vạch, trừ trường hợp khẩn cấp. Thường ở đầu dải phân cách, chỗ tách, nhập làn.', 'Cấm (trừ khẩn cấp)', 'm_hatch'],
    ['4.2', 'Vạch hình chữ V', 'Trắng', 'Như vạch 4.1.', 'Cấm (trừ khẩn cấp)', 'm_hatch'],
    ['4.3', 'Vạch vành khuyên ở tâm nút giao', 'Trắng', 'Xe đi vòng ngược chiều kim đồng hồ; không được lấn vạch hoặc cắt qua vạch, trừ trường hợp khẩn cấp.', 'Cấm (trừ khẩn cấp)', ''],
    ['4.4', 'Vạch mắt võng (ô kẻ chéo)', 'Vàng', 'Báo cho người lái không được dừng phương tiện trong phạm vi phần mặt đường có kẻ vạch.', 'Được đi qua, cấm dừng trong ô', 'm_box'],
  ]},
  { grp: 'Vạch dẫn hướng qua nút', rows: [
    ['5.1, 5.2', 'Nối dài vạch tim, vạch làn qua nút giao', 'Theo màu vạch gốc', 'Xe có thể cắt qua vạch khi cần thiết.', 'Được khi cần thiết', ''],
    ['5.3', 'Làn chờ rẽ trái trong nút', 'Trắng', 'Xe rẽ trái chưa đi được thì dừng chờ trong làn này, trước vạch dừng.', '—', ''],
  ]},
  { grp: 'Vạch cấm dừng, cấm đỗ (sơn trên mép bó vỉa hoặc sát mép đường)', rows: [
    ['6.1', 'Vạch đứt khúc', 'Vàng', 'Báo hiệu không được phép đỗ xe bên đường.', 'Được dừng, cấm đỗ', 'm_curb'],
    ['6.2', 'Vạch liền', 'Vàng', 'Báo hiệu không được phép dừng xe, đỗ xe bên đường.', 'Cấm dừng và đỗ', 'm_curb'],
  ]},
  { grp: 'Vạch ngang và ký hiệu trên mặt đường', rows: [
    ['7.1', 'Vạch dừng xe (liền, rộng 20–40 cm), có thể kèm chữ STOP', 'Trắng', 'Vị trí phải dừng khi đèn đỏ hoặc khi có biển R.122 "Dừng lại". Dừng trước vạch, không đè lên vạch.', 'Dừng trước vạch', 'm_stop_zebra'],
    ['7.2', 'Vạch nhường đường (vạch đôi đứt, kèm tam giác)', 'Trắng', 'Báo xe phải đi chậm hoặc dừng lại khi cần thiết để nhường đường cho xe trên đường ưu tiên; dùng kèm biển W.208.', 'Nhường đường', 'm_giveway'],
    ['7.3', 'Vạch người đi bộ qua đường (ngựa vằn hoặc 2 vạch liền)', 'Trắng', 'Phạm vi dành cho người đi bộ qua đường. Nhường người đi bộ; không dừng, đỗ, quay đầu, lùi trên vạch.', 'Không dừng trên vạch', 'm_stop_zebra'],
    ['7.4', 'Vạch xe đạp qua đường (2 vạch đứt)', '—', 'Nơi không có đèn tín hiệu thì xe đạp phải nhường xe cơ giới.', '—', ''],
    ['7.6', 'Vạch hình thoi', 'Trắng', 'Báo trước sắp đến vạch người đi bộ: giảm tốc, quan sát.', 'Cảnh báo', ''],
    ['7.7', 'Chữ X và chữ R', 'Trắng', 'Báo trước nơi giao với đường sắt không có người gác.', 'Cảnh báo', ''],
    ['7.8', 'Các nhóm vạch mũi nhọn song song tim đường (cao tốc)', 'Trắng', 'Giúp ước lượng và giữ khoảng cách giữa các xe.', 'Hỗ trợ giữ cự ly', ''],
    ['9.1', 'Vạch cấm quay đầu', 'Vàng', 'Cấm quay đầu tại nút giao hoặc chỗ mở dải phân cách.', 'Cấm quay đầu', ''],
    ['9.2', 'Vạch zigzag (hình chữ M)', 'Vàng', 'Điểm dừng xe buýt, taxi: phương tiện khác và người đi bộ không được dừng, đỗ trong phạm vi vạch và trong khoảng 15 m hai đầu.', 'Cấm dừng, đỗ', 'm_zigzag'],
    ['9.3', 'Mũi tên chỉ hướng trên làn', 'Trắng', 'Chỉ hướng xe phải đi trên làn đó; phối hợp với biển R.411.', 'Đi theo mũi tên', 'm_lane_arrows'],
    ['9.4', 'Mũi tên báo giảm số làn', 'Trắng', 'Phía trước bớt làn: phải chuyển làn theo hướng mũi tên.', 'Phải chuyển làn', ''],
    ['9.5, 9.6', 'Chữ trên mặt đường (STOP, Ô TÔ, XE MÁY, XE BUÝT…) và biểu tượng xe đạp', 'Trắng', 'Bổ sung cho báo hiệu khác: làn dành cho loại xe ghi trên mặt đường.', 'Theo chữ', ''],
  ]},
];

const MARKING_NOTES = [
  'Quy tắc nhớ nhanh: vàng phân chia hai chiều ngược nhau; trắng phân chia làn cùng chiều. Liền là cấm cắt qua, cấm đè; đứt là được cắt qua khi an toàn.',
  'Ngoại lệ duy nhất mà Phụ lục G ghi cho các vạch liền 2.3, 3.2, 4.1, 4.2, 4.3 là "trường hợp khẩn cấp". Với vạch tim đường liền 1.2, 1.3 và vạch phân làn liền 2.2, văn bản không ghi ngoại lệ nào.',
  'Vạch mép đường 3.1 là loại vạch liền duy nhất mà quy chuẩn cho phép đè lên "khi cần thiết" (ví dụ tấp vào lề dừng xe), nhưng phải nhường đường cho xe thô sơ.',
  'Hiệu lệnh của CSGT và đèn tín hiệu có hiệu lực cao hơn vạch kẻ (Luật 36 Đ11). Khi CSGT hướng dẫn đi qua vạch liền để tránh sự cố thì làm theo CSGT. Biển và vạch mâu thuẫn thì theo biển.',
  'Gặp chướng ngại vật (xe hỏng, công trình) trên đoạn vạch liền: văn bản không có điều khoản riêng cho phép cắt vạch. Kinh nghiệm an toàn: giảm tốc, dừng chờ, chỉ đi qua khi có người hướng dẫn, biển báo tạm thời hoặc CSGT cho phép; biển tạm thời có hiệu lực cao hơn biển, vạch cố định.',
  'Vạch kẻ cũ được lắp trước 01/01/2025 nếu không gây hiểu nhầm vẫn được dùng tiếp, phải thay xong trước 20/8/2030 (QCVN 41:2024 Điều 83.2). Vì vậy ngoài đường có thể vẫn gặp ký hiệu theo quy chuẩn cũ.',
  'Mức phạt: không chấp hành vạch kẻ (lỗi chung) 400–600 nghìn; chuyển làn qua vạch liền là "chuyển làn không đúng nơi cho phép" 600–800 nghìn (cao tốc 4–6 triệu, −2 điểm); lấn sang phần đường ngược chiều qua vạch tim liền là "đi không đúng phần đường" 4–6 triệu, −2 điểm; vượt ở đoạn cấm vượt 4–6 triệu, −2 điểm (NĐ 168 Đ6).',
];

// ---------------------------------------------------------------- NGOẠI LỆ (quy định chung → khi nào được phép)
const EXCEPTIONS = [
  { grp: 'Đèn tín hiệu, hiệu lệnh', rows: [
    ['Đèn đỏ là cấm đi', 'Được đi theo hướng mũi tên xanh khi mũi tên xanh sáng cùng đèn đỏ hoặc vàng, nhưng phải nhường xe đang được đi. Không có mũi tên xanh thì không được rẽ phải khi đèn đỏ: QCVN 41:2024 không có biển nào cho phép rẽ phải khi đèn đỏ.', 'QCVN 41 Đ6.4.3; Luật 36 Đ11 k4', 'x_red_arrow'],
    ['Đèn vàng phải dừng trước vạch', 'Đang ở trên vạch dừng hoặc đã qua vạch thì được đi tiếp.', 'Luật 36 Đ11 k4b', ''],
    ['Đèn xanh là được đi', 'Vẫn phải giảm tốc, dừng nhường người đi bộ, xe lăn đang ở lòng đường.', 'Luật 36 Đ11 k4a', ''],
    ['Mũi tên rẽ trái chỉ cho rẽ trái', 'Mũi tên xanh rẽ trái đồng thời cho phép quay đầu, trừ khi có biển P.124 cấm quay đầu.', 'QCVN 41 Đ6.2.2', ''],
    ['Thứ tự: CSGT > đèn > biển > vạch', 'Hiệu lệnh CSGT có thể cho phép đi trái với đèn, biển, vạch. Biển tạm thời có hiệu lực hơn biển cố định cùng vị trí.', 'Luật 36 Đ11 k2, k12', ''],
  ]},
  { grp: 'Vượt xe, làn đường, chuyển hướng', rows: [
    ['Phải vượt bên trái', 'Được vượt bên phải khi xe phía trước có tín hiệu rẽ trái hoặc đang rẽ trái, hoặc khi xe chuyên dùng đang làm việc trên đường mà không thể vượt bên trái.', 'Luật 36 Đ14 k2', 'x_pass_right'],
    ['Đi nhanh hơn xe làn bên cạnh có phải là "vượt"?', 'Trên đường có từ 2 làn cơ giới cùng chiều có vạch phân làn, xe phía sau đi lên trước xe phía trước thì áp dụng quy tắc sử dụng làn (Đ13), không coi là vượt. Vì vậy đi đúng làn bên phải mà nhanh hơn xe làn trái không phải lỗi vượt phải.', 'Luật 36 Đ14 k1', ''],
    ['Biển P.125 cấm vượt', 'Vẫn được vượt xe máy 2 bánh, xe gắn máy. Xe ưu tiên cũng bị cấm vượt theo biển này.', 'QCVN 41 Phụ lục B.25', ''],
    ['Xe chạy chậm phải đi về làn bên phải', 'Không phạt khi các xe khác cùng chiều đang chạy quá tốc độ.', 'NĐ 168 Đ6 k3p', ''],
    ['Cấm quay đầu ở vạch đi bộ, cầu, đầu cầu, gầm cầu vượt, ngầm, đường hẹp, dốc, khúc cong khuất, đường một chiều, cao tốc, hầm, đường ngang', 'Được quay đầu khi có hiệu lệnh của người điều khiển giao thông hoặc chỉ dẫn của biển báo hiệu tạm thời; nơi tổ chức giao thông có bố trí chỗ quay đầu.', 'Luật 36 Đ15 k4; NĐ 168 Đ6 k4i', ''],
    ['Biển P.123a cấm rẽ trái', 'Không cấm quay đầu (muốn cấm quay đầu phải có P.124a, P.124c…). Biển P.124a cấm quay đầu thì không cấm rẽ trái.', 'QCVN 41 Phụ lục B.23, B.24', 'x_uturn_arrow'],
    ['Còi xin vượt', 'Trong đô thị và khu đông dân cư từ 22h đến 5h chỉ được xin vượt bằng đèn, không dùng còi.', 'Luật 36 Đ14 k5', ''],
  ]},
  { grp: 'Dừng, đỗ xe', rows: [
    ['Khi dừng xe không được tắt máy, không rời vị trí lái', 'Được rời vị trí lái để đóng, mở cửa xe, xếp dỡ hàng, kiểm tra kỹ thuật xe, nhưng phải dùng phanh đỗ hoặc biện pháp an toàn khác.', 'Luật 36 Đ18 k1', ''],
    ['Không dừng, đỗ trên cầu, gầm cầu vượt', 'Trừ trường hợp tổ chức giao thông cho phép (cầu) hoặc nơi được phép dừng đỗ (gầm cầu vượt).', 'Luật 36 Đ18 k4c, d', ''],
    ['Không dừng, đỗ nơi bị cấm', 'Sự cố kỹ thuật hoặc bất khả kháng buộc phải đỗ thì được đỗ, nhưng phải bật đèn khẩn cấp hoặc đặt biển cảnh báo phía sau xe.', 'Luật 36 Đ18 k7', ''],
    ['Cao tốc chỉ dừng, đỗ ở nơi quy định', 'Sự cố: được dừng ở làn dừng khẩn cấp, bật đèn khẩn cấp. Không vào được làn khẩn cấp: bật đèn và đặt biển hoặc đèn cảnh báo phía sau tối thiểu 150 m, báo ngay CSGT hoặc đơn vị quản lý.', 'Luật 36 Đ25 k2', 'x_breakdown_highway'],
    ['Biển P.131 cấm đỗ', 'Biển chỉ cấm đỗ, không cấm dừng. Muốn cấm cả dừng phải là P.130. Hai biển chỉ có hiệu lực ở phía đường có đặt biển.', 'QCVN 41 Phụ lục B.30, B.31', ''],
    ['Vạch vàng đứt sát lề (6.1)', 'Chỉ cấm đỗ; vạch vàng liền sát lề (6.2) mới cấm cả dừng và đỗ.', 'QCVN 41 Phụ lục G', 'm_curb'],
  ]},
  { grp: 'Đèn, còi, vỉa hè, chở người', rows: [
    ['Phải chuyển sang đèn chiếu gần khi gặp xe ngược chiều', 'Trừ trường hợp có dải phân cách có khả năng chống chói.', 'Luật 36 Đ20 k2c', ''],
    ['Không dùng còi từ 22h đến 5h trong khu đông dân cư, khu cơ sở khám chữa bệnh', 'Trừ xe ưu tiên.', 'Luật 36 Đ21 k2', ''],
    ['Cấm điều khiển ô tô đi trên vỉa hè', 'Trừ trường hợp đi qua vỉa hè để vào nhà, cơ quan.', 'NĐ 168 Đ6 k6d', ''],
    ['Trẻ dưới 10 tuổi và cao dưới 1,35 m không ngồi cùng hàng ghế người lái', 'Trừ loại xe ô tô chỉ có một hàng ghế.', 'Luật 36 Đ10 k3', ''],
    ['Phải mang theo giấy tờ khi lái xe', 'Giấy tờ đã tích hợp vào tài khoản định danh điện tử (VNeID) thì xuất trình qua tài khoản đó.', 'Luật 36 Đ56 k3', ''],
    ['Cầm điện thoại khi lái xe', 'Văn bản dùng cụm "khi điều khiển phương tiện… đang di chuyển trên đường bộ". Tôi không tìm thấy hướng dẫn chính thức về trường hợp xe dừng chờ đèn đỏ, nên khuyến nghị không cầm điện thoại khi còn ngồi ở vị trí lái trên đường.', 'Luật 36 Đ9 k6; NĐ 168 Đ6 k5h', ''],
  ]},
  { grp: 'Xe ưu tiên và các biển cấm', rows: [
    ['Hầu hết biển cấm (P.101, P.102, P.103, P.123, P.124, P.127, P.130, P.131, P.136–P.139)', 'Không áp dụng với xe ưu tiên đang làm nhiệm vụ. Biển P.101 đặt vì đường hoặc cầu bị tắc thì xe ưu tiên cũng không được đi vào.', 'QCVN 41 Phụ lục B', ''],
    ['Biển hạn chế kích thước, tải trọng (P.115–P.121) và P.125, P.126, P.132', 'Áp dụng cả với xe ưu tiên.', 'QCVN 41 Phụ lục B', ''],
    ['Xe ưu tiên (cứu hỏa, quân sự, công an, kiểm sát làm nhiệm vụ khẩn cấp, cứu thương, hộ đê, cứu nạn)', 'Khi phát tín hiệu: không bị hạn chế tốc độ, được đi không phụ thuộc đèn tín hiệu, được đi vào đường ngược chiều; trên cao tốc chỉ được đi ngược chiều ở làn dừng khẩn cấp. Vẫn phải theo hiệu lệnh CSGT và biển báo tạm thời. Xe khác phải giảm tốc, đi sát lề phải hoặc dừng nhường.', 'Luật 36 Đ27 k4, k5', ''],
    ['Biển phụ "Except – Ngoại lệ" (S.H,6)', 'Nhóm đối tượng ghi trên biển phụ không phải chấp hành biển cấm, hạn chế ở phía trên.', 'QCVN 41 Phụ lục F.17', ''],
    ['Biển phụ "Loại xe" (S.505a)', 'Ngược lại với S.H,6: biển chính chỉ áp dụng cho loại xe vẽ trên biển phụ; loại xe khác không bị điều chỉnh.', 'QCVN 41 Phụ lục F.5', ''],
  ]},
  { grp: 'Nồng độ cồn, xử phạt', rows: [
    ['Nồng độ cồn', 'Không có ngoại lệ: Luật nghiêm cấm điều khiển phương tiện mà trong máu hoặc hơi thở có nồng độ cồn, ở bất kỳ mức nào.', 'Luật 36 Đ9 k2', ''],
    ['Phạt nguội gửi về chủ xe', 'Chủ xe là cá nhân chứng minh hoặc giải trình được mình không phải người lái thì người lái thực tế bị xử phạt.', 'NĐ 168 Đ47 k8b', ''],
    ['Không xuất trình được giấy tờ', 'Xe cá nhân xuất trình được giấy tờ hợp lệ trong thời hạn hẹn ghi trên biên bản thì không bị xử phạt lỗi không có, không mang theo giấy tờ.', 'NĐ 168 Đ48 k3c', ''],
  ]},
];

// ---------------------------------------------------------------- BIỂN PHỤ: CÁCH ĐỌC
const AUX_HOWTO = [
  ['1. Đọc biển chính', 'Biển chính cho biết điều gì bị cấm, bắt buộc hoặc cần cảnh báo.'],
  ['2. Ai? (S.505a loại xe, S.H,6 ngoại lệ)', 'S.505a: biển chính CHỈ áp dụng cho loại xe vẽ trên biển phụ (mỗi biển tối đa 2 loại xe). S.H,6 "Except – Ngoại lệ": loại đối tượng vẽ trên biển phụ ĐƯỢC MIỄN.'],
  ['3. Khi nào? (S.508 thời gian)', 'Biển chính chỉ có hiệu lực trong khoảng giờ trong ngày, ngày chẵn, ngày lẻ, thứ trong tuần hoặc khoảng thời gian ghi trên biển phụ (ví dụ "> 5 phút"). Ngoài thời gian đó biển chính không có hiệu lực.'],
  ['4. Ở đâu, bao xa? (S.501, S.502, S.504)', 'S.502: còn bao nhiêu mét nữa đến chỗ nguy hiểm hoặc chỗ bắt đầu cấm. S.501: hiệu lực trong đoạn dài bao nhiêu mét kể từ biển. S.504: biển chỉ áp dụng cho làn được chỉ.'],
  ['5. Hướng nào? (S.503)', 'S.503a, b, c đặt dưới biển cấm hoặc hiệu lệnh, chỉ hướng tác dụng vuông góc với chiều đi (sang trái, sang phải; S.503b là cả hai hướng). S.503d, e, f đặt dưới P.124, P.130, P.131, chỉ hướng tác dụng song song với chiều đi (phía trước, phía sau; S.503e là cả trước và sau) và đánh dấu điểm bắt đầu, kết thúc đoạn cấm.'],
  ['6. Còn gì cần thuyết minh? (S.509, S.510)', 'S.509a: chiều cao an toàn dưới đường dây điện. S.509b: chữ "Cấm đỗ xe" làm rõ cho P.130, P.131. S.509 cũng dùng với P.127 ghi "Lối vào", "Lối ra" ở chỗ nhập, tách làn. S.510a: chú ý đường trơn có băng tuyết; S.510b: chú ý đường sắt khi rẽ vào nhánh có đường sắt cách dưới 100 m.'],
];

const AUX_EXAMPLES = [
  ['s_time', 'P.131a + S.508 "6h–9h, 16h–19h"', 'Cấm đỗ ở phía đường có biển trong hai khung giờ đó. Ngoài giờ được đỗ nếu không có cấm khác. Dừng xe để đón, trả người vẫn được vì P.131 chỉ cấm đỗ.'],
  ['s_dist', 'W.205a + S.502 "150 m"', 'Còn 150 m nữa đến nơi giao nhau: giảm tốc, chọn làn từ bây giờ.'],
  ['s_range', 'P.125 + S.501 "500 m"', 'Cấm vượt trong đoạn 500 m kể từ biển (nếu chưa gặp nơi giao nhau hoặc biển hết cấm).'],
  ['s_both', 'P.131a + S.503 mũi tên hai đầu', 'Cấm đỗ cả phía trước và phía sau vị trí đặt biển, trên phía đường có đặt biển.'],
  ['s_start', 'P.130 + S.503 có vạch đứng và mũi tên', 'Đánh dấu điểm bắt đầu đoạn cấm dừng và đỗ, hiệu lực theo hướng mũi tên. Văn bản quy chuẩn ghi không thống nhất mã S.503d, S.503f cho điểm đầu và điểm cuối, nên hãy nhìn hình mũi tên trên biển thật.'],
  ['s_truck', 'P.103a + S.505a hình xe tải', 'Biển chính chỉ áp dụng cho loại xe vẽ trên biển phụ: ở đây chỉ cấm xe tải. Ô tô con được đi.'],
  ['s_except', 'P.103a + S.H,6 "Except – Ngoại lệ" hình xe buýt', 'Cấm ô tô, nhưng xe buýt được miễn. Ô tô con vẫn bị cấm.'],
  ['s_speedtime', 'P.127 "60" + S.508 "22h–5h"', 'Giới hạn 60 km/h chỉ áp dụng ban đêm trong khung giờ ghi trên biển phụ.'],
];

// ---------------------------------------------------------------- XỬ LÝ TAI NẠN
const ACC_PRINCIPLES = [
  ['An toàn trước tiên', 'Bảo vệ mình và người khác khỏi va chạm thứ hai: bật đèn khẩn cấp, đặt biển cảnh báo, đưa người ra khỏi làn xe chạy.'],
  ['Cứu người trước, tài sản sau', 'Trợ giúp người bị nạn và gọi cấp cứu là nghĩa vụ pháp lý (Luật 36 Đ80). Bỏ chạy bị phạt nặng hơn (NĐ 168 Đ6 k8: 16–18 triệu, trừ 6 điểm) và là tình tiết định khung tăng nặng của tội Đ260 BLHS.'],
  ['Không rời hiện trường', 'Ở lại đến khi công an đến, trừ khi phải đi cấp cứu, đưa người bị nạn đi cấp cứu hoặc bị đe dọa tính mạng; khi đó phải trình báo ngay công an hoặc UBND nơi gần nhất.'],
  ['Giữ nguyên hiện trường, lưu chứng cứ', 'Không tự ý di chuyển xe, tài sản khi chưa có ý kiến của công an hoặc doanh nghiệp bảo hiểm, trừ khi cần để bảo đảm an toàn hoặc theo yêu cầu của cơ quan có thẩm quyền.'],
  ['Báo bảo hiểm ngay', 'Gọi đường dây nóng in trên giấy chứng nhận bảo hiểm ngay khi có thể; gửi thông báo tai nạn bằng văn bản hoặc điện tử trong 5 ngày làm việc.'],
  ['Bình tĩnh, không đôi co', 'Không cãi nhau, không xô xát, không nhận lỗi hoặc hứa bồi thường bằng lời trước khi có kết luận. Mọi thỏa thuận phải bằng văn bản.'],
];

const ACC_TIMELINE = [
  { phase: 'Ngay lập tức (0–2 phút)', steps: [
    'Dừng xe ngay, về P (số sàn: về 0), kéo phanh tay, bật đèn khẩn cấp. Tắt máy nếu có mùi xăng, khói.',
    'Kiểm tra bản thân và người trên xe. Ra khỏi xe ở phía an toàn (phía lề), nhìn xe phía sau trước khi mở cửa.',
    'Đặt biển cảnh báo tam giác phía sau xe. Cao tốc: tối thiểu 150 m. Đường thường: luật không ghi khoảng cách cụ thể, kinh nghiệm đặt đủ xa để xe sau kịp giảm tốc (thường vài chục mét, xa hơn ở khúc cua, ban đêm).',
  ]},
  { phase: 'Cứu người, báo tin (2–10 phút)', steps: [
    'Có người bị thương: gọi 115 (cấp cứu), 113 (công an); cháy hoặc người bị kẹt trong xe: gọi 114.',
    'Sơ cứu ở mức an toàn (xem bảng sơ cứu). Chỉ dùng xe liên quan đến tai nạn để chở nạn nhân đi cấp cứu khi không có phương tiện nào khác, và phải đánh dấu vị trí xe, vị trí nạn nhân trước khi đi.',
    'Có người chết: giữ nguyên hiện trường và che đậy thi thể (Luật 36 Đ80 k3).',
    'Gọi đường dây nóng của doanh nghiệp bảo hiểm (bắt buộc và vật chất nếu có) để được hướng dẫn và cử giám định.',
  ]},
  { phase: 'Lưu chứng cứ (trong khi chờ)', steps: [
    'Chụp ảnh, quay video: toàn cảnh từ hai hướng có cả biển báo, vạch kẻ, đèn tín hiệu; vị trí từng xe so với vạch; biển số; điểm va chạm cận cảnh; vết phanh, mảnh vỡ; hư hỏng của từng xe.',
    'Đánh dấu vị trí bánh xe trên mặt đường (phấn, sơn) nếu sau đó buộc phải di chuyển xe.',
    'Lưu ngay video camera hành trình (khóa file, chép ra điện thoại) để không bị ghi đè.',
    'Ghi tên, số điện thoại người làm chứng. Ghi biển số, tên, số GPLX, số giấy chứng nhận bảo hiểm của bên kia.',
  ]},
  { phase: 'Làm việc với CSGT tại hiện trường', steps: [
    'Xuất trình giấy tờ. Chấp hành kiểm tra nồng độ cồn, ma túy: đây là nội dung bắt buộc khi điều tra tai nạn.',
    'CSGT có thể khám nghiệm hiện trường, tạm giữ phương tiện, giấy tờ, ghi lời khai. Khai đúng sự việc, không suy đoán.',
    'Đọc kỹ biên bản trước khi ký; chưa đồng ý về diễn biến, lỗi thì ghi ý kiến bảo lưu vào biên bản. Xin bản sao hoặc chụp lại biên bản.',
    'Pháp luật nghiêm cấm giữ phương tiện của các bên để làm căn cứ giải quyết bồi thường thiệt hại.',
  ]},
  { phase: 'Trong 5 ngày làm việc', steps: [
    'Gửi thông báo tai nạn bằng văn bản hoặc điện tử cho doanh nghiệp bảo hiểm. Không thông báo đúng hạn có thể bị giảm trừ tối đa 5% tiền bồi thường thiệt hại tài sản.',
    'Không tự sửa xe khi doanh nghiệp bảo hiểm chưa giám định và chưa thống nhất phương án, báo giá sửa chữa.',
    'Thu thập hồ sơ: giấy tờ xe, người lái, giấy chứng nhận bảo hiểm, chứng từ y tế, hóa đơn sửa chữa, biên bản giám định.',
  ]},
  { phase: 'Sau đó', steps: [
    'Theo dõi thông báo kết quả giải quyết của cơ quan công an (vụ va chạm nhỏ: cán bộ báo cáo đề xuất trong 07 ngày làm việc để ra thông báo kết quả).',
    'Bồi thường: các bên tự thỏa thuận; không thỏa thuận được thì CSGT lập biên bản và hướng dẫn các bên khởi kiện tại Tòa án.',
    'Đi khám sức khỏe dù thấy bình thường; chấn thương cổ, đầu có thể xuất hiện muộn.',
  ]},
];

const ACC_SCENARIOS = [
  ['Va chạm nhẹ, chỉ hư hỏng tài sản, không ai bị thương', 'Bật đèn khẩn cấp, chụp ảnh đầy đủ, báo bảo hiểm. Các bên có thể đề nghị thỏa thuận dân sự tại hiện trường; CSGT (nếu có mặt) vẫn lập biên bản và báo cáo kết quả trong 07 ngày làm việc. Tự thỏa thuận thì lập văn bản (mẫu bên dưới). Sau khi đã lưu chứng cứ và nếu được công an hoặc bảo hiểm đồng ý, đưa xe vào lề để tránh ùn tắc.', 'TT 72/2024/TT-BCA; NĐ 67/2023 Đ12 k1b'],
  ['Có người bị thương', 'Ưu tiên cấp cứu, gọi 115 và 113, giữ nguyên hiện trường, không tự thỏa thuận "đưa tiền rồi đi". Hợp tác điều tra, kiểm tra nồng độ cồn. Báo bảo hiểm để được tạm ứng bồi thường trong 3 ngày làm việc.', 'Luật 36 Đ80, Đ83; NĐ 67/2023 Đ12 k3'],
  ['Có người chết', 'Gọi 113, 115 ngay; giữ nguyên hiện trường, che đậy thi thể; ở lại hiện trường. Vụ việc có thể có dấu hiệu tội phạm (BLHS Đ260), cần luật sư. Doanh nghiệp bảo hiểm tạm ứng 70% mức bồi thường ước tính (nếu đã xác định thuộc phạm vi bảo hiểm).', 'Luật 36 Đ80 k3; BLHS Đ260; NĐ 67/2023 Đ12 k3'],
  ['Bị xe khác đâm rồi bỏ chạy', 'Ghi biển số, màu, loại xe, hướng chạy; lấy video camera hành trình và camera quanh khu vực; trình báo công an ngay. Không đuổi theo. Báo bảo hiểm vật chất (nếu có) của mình.', 'Luật 36 Đ81; kinh nghiệm'],
  ['Va chạm trên cao tốc', 'Không đứng trên làn xe chạy. Đưa xe vào làn khẩn cấp nếu còn đi được; không được thì bật đèn khẩn cấp, đặt biển cách tối thiểu 150 m, mọi người ra sau dải hộ lan và gọi đường dây nóng của tuyến cao tốc, CSGT.', 'Luật 36 Đ25 k2'],
  ['Đâm vào tài sản không có người (xe đang đỗ, cột điện, rào)', 'Không bỏ đi: tìm chủ tài sản hoặc báo công an, UBND nơi gần nhất; để lại thông tin liên lạc; chụp ảnh. Bỏ đi có thể bị coi là không dừng, không giữ hiện trường.', 'Luật 36 Đ80; NĐ 168 Đ6 k4g, k8'],
];

const ACC_EVIDENCE = [
  'Ảnh toàn cảnh từ phía trước và phía sau, đứng cách 10–20 m',
  'Ảnh biển báo, vạch kẻ, đèn tín hiệu gần hiện trường',
  'Ảnh vị trí từng bánh xe so với vạch kẻ, mép đường',
  'Ảnh biển số của tất cả xe liên quan',
  'Ảnh cận cảnh điểm va chạm, vết phanh, mảnh vỡ',
  'Video camera hành trình (đã khóa, đã chép ra máy khác)',
  'Ảnh GPLX, đăng ký xe, giấy chứng nhận bảo hiểm của bên kia (khi họ đồng ý)',
  'Tên, số điện thoại người làm chứng',
  'Thời gian, địa điểm, thời tiết, ánh sáng',
  'Biên bản của CSGT (bản sao hoặc ảnh chụp), văn bản thỏa thuận nếu có',
];

const ACC_AGREEMENT = [
  'Thời gian, địa điểm xảy ra va chạm',
  'Họ tên, số CCCD, địa chỉ, số điện thoại của các bên; biển số xe, số GPLX',
  'Mô tả diễn biến ngắn gọn và hư hỏng của từng xe (kèm ảnh đánh số)',
  'Bên nào bồi thường, số tiền, hình thức và thời hạn trả; hoặc thống nhất để bảo hiểm giải quyết',
  'Cam kết sau khi nhận đủ tiền không khiếu nại về thiệt hại tài sản đã liệt kê',
  'Chữ ký các bên, người làm chứng (nếu có); mỗi bên giữ một bản',
];

const ACC_DONTS = [
  ['Bỏ chạy, rời hiện trường', 'Ô tô gây tai nạn mà không dừng, không giữ hiện trường, không trợ giúp, không trình báo: 16–18 triệu, trừ 6 điểm (NĐ 168 Đ6 k8). Bỏ chạy là tình tiết định khung tăng nặng của tội Đ260 BLHS. Bảo hiểm bắt buộc loại trừ nếu cố ý bỏ chạy mà không thực hiện trách nhiệm dân sự.'],
  ['Uống rượu bia sau tai nạn', 'Sẽ bị kiểm tra nồng độ cồn; có cồn thì bảo hiểm bắt buộc không bồi thường phần tài sản và có thể thành tình tiết tăng nặng.'],
  ['Tự sửa xe trước khi bảo hiểm giám định', 'Doanh nghiệp bảo hiểm có thể từ chối hoặc giảm bồi thường phần đã sửa.'],
  ['Đưa tiền "giải quyết nhanh" không có giấy tờ', 'Không chứng minh được đã bồi thường; bên kia có thể đổi ý, trình báo sau.'],
  ['Ký biên bản khi chưa đọc hoặc chưa đồng ý', 'Ghi rõ ý kiến bảo lưu trước khi ký.'],
  ['Xô xát, đăng mạng xã hội, xóa camera', 'Làm vụ việc phức tạp; xóa dữ liệu có thể bị coi là che giấu chứng cứ.'],
  ['Kéo, di chuyển người bị thương nặng', 'Có thể làm chấn thương cột sống nặng thêm; chỉ di chuyển khi có nguy cơ cháy, nổ hoặc bị xe khác đâm.'],
];

const FIRST_AID = [
  ['Gọi 115 trước', 'Nói rõ địa điểm (km, tên đường, hướng đi), số người bị thương, tình trạng (tỉnh, mê, chảy máu).'],
  ['Không tháo mũ bảo hiểm của người đi xe máy bị chấn thương đầu', 'Trừ khi họ không thở và người sơ cứu được huấn luyện.'],
  ['Cầm máu', 'Ép trực tiếp lên vết thương bằng vải sạch, giữ liên tục.'],
  ['Giữ nguyên tư thế người nghi chấn thương cổ, cột sống', 'Không cho ngồi dậy, không xoay đầu; giữ đầu thẳng trục.'],
  ['Giữ ấm, trấn an', 'Không cho ăn uống (có thể cần phẫu thuật).'],
  ['Không rút vật đâm xuyên', 'Cố định vật đó, chờ nhân viên y tế.'],
];
// Phần sơ cứu là khuyến cáo phổ biến của ngành y tế, không phải quy định pháp luật.

// ---------------------------------------------------------------- BẢO HIỂM
const INS_TNDS = [
  ['Bảo hiểm gì', 'Trách nhiệm dân sự của chủ xe đối với thiệt hại về người và tài sản của người thứ ba, và về người của hành khách trên xe. Không bồi thường hư hỏng xe của chính bạn (cần bảo hiểm vật chất tự nguyện).', 'NĐ 67/2023'],
  ['Giới hạn trách nhiệm (ô tô)', 'Về sức khỏe, tính mạng: 150 triệu đồng cho một người trong một vụ. Về tài sản: 100 triệu đồng trong một vụ. Phần vượt giới hạn chủ xe tự chịu, trừ khi có bảo hiểm tự nguyện mua thêm.', 'NĐ 67/2023 Đ6, Đ12 k8'],
  ['Mức bồi thường', 'Về người: theo Bảng trả tiền bồi thường (Phụ lục VI) hoặc theo thỏa thuận của các bên nhưng không vượt mức trong bảng. Về tài sản: theo thiệt hại thực tế và mức độ lỗi của chủ xe. Tai nạn do lỗi hoàn toàn của người thứ ba: bồi thường về người bằng 50% mức trong bảng.', 'NĐ 67/2023 Đ12 k6'],
  ['Nghĩa vụ khi có tai nạn', 'Thông báo ngay qua đường dây nóng; cứu chữa, hạn chế thiệt hại, bảo vệ hiện trường; không di chuyển, tháo gỡ, sửa chữa tài sản khi chưa có chấp thuận của doanh nghiệp bảo hiểm (trừ khi cần để bảo đảm an toàn hoặc theo yêu cầu cơ quan có thẩm quyền); gửi thông báo tai nạn bằng văn bản hoặc điện tử trong 5 ngày làm việc.', 'NĐ 67/2023 Đ12 k1, k4'],
  ['Doanh nghiệp bảo hiểm phải làm gì', 'Trong 1 giờ hướng dẫn bên mua bảo hiểm; trong 24 giờ tổ chức giám định tổn thất.', 'NĐ 67/2023 Đ12 k2'],
  ['Tạm ứng bồi thường về người', 'Trong 3 ngày làm việc kể từ khi nhận thông báo. Đã xác định thuộc phạm vi bảo hiểm: 70% mức ước tính nếu tử vong, 50% nếu tổn thương bộ phận. Chưa xác định: 30% giới hạn trách nhiệm nếu tử vong hoặc tổn thương từ 81%, 10% nếu tổn thương từ 31% đến dưới 81%.', 'NĐ 67/2023 Đ12 k3'],
  ['Giảm trừ', 'Không gửi thông báo tai nạn đúng hạn: doanh nghiệp được giảm trừ tối đa 5% số tiền bồi thường thiệt hại tài sản.', 'NĐ 67/2023 Đ12 k7'],
  ['Phí bảo hiểm (tham khảo)', 'Ô tô không kinh doanh vận tải dưới 6 chỗ: 437.000 đồng/năm; từ 6 đến 11 chỗ: 794.000 đồng/năm (số liệu lấy từ bài của Báo Chính phủ, chưa đối chiếu được Phụ lục I của Nghị định). Doanh nghiệp được điều chỉnh tăng, giảm tối đa 15%.', 'NĐ 67/2023 Đ8'],
  ['Thời hạn bảo hiểm', 'Tối thiểu 1 năm, tối đa 3 năm (trừ một số trường hợp ngắn hơn).', 'NĐ 67/2023 Đ9'],
];

const INS_EXCLUSIONS = [
  'Hành động cố ý gây thiệt hại của chủ xe, người lái hoặc người bị thiệt hại',
  'Người lái gây tai nạn cố ý bỏ chạy không thực hiện trách nhiệm dân sự của chủ xe (đã thực hiện trách nhiệm dân sự thì không bị loại trừ)',
  'Người lái chưa đủ tuổi; không có GPLX, GPLX không hợp lệ hoặc không phù hợp loại xe; GPLX đang bị tước hoặc bị thu hồi cũng coi là không có GPLX',
  'Thiệt hại gián tiếp: giảm giá trị thương mại, thiệt hại gắn với việc sử dụng, khai thác tài sản bị hư hỏng',
  'Thiệt hại về TÀI SẢN khi người lái có nồng độ cồn vượt mức trị số bình thường theo hướng dẫn của Bộ Y tế, hoặc sử dụng ma túy, chất kích thích bị cấm (phần thiệt hại về người vẫn được bồi thường)',
  'Tài sản bị mất cắp, bị cướp trong tai nạn',
  'Tài sản đặc biệt: vàng, bạc, đá quý, giấy tờ có giá, đồ cổ, tranh ảnh quý hiếm, thi hài, hài cốt',
  'Thiệt hại do chiến tranh, khủng bố, động đất',
];
// NĐ 67/2023 Đ7 k2

const INS_DOCS = [
  ['Bên mua bảo hiểm nộp', 'Văn bản yêu cầu bồi thường; đăng ký xe; GPLX; giấy tờ tùy thân người lái; giấy chứng nhận bảo hiểm (bản sao chứng thực, hoặc bản sao được doanh nghiệp xác nhận sau khi đối chiếu bản chính hoặc ảnh chụp).'],
  ['Thiệt hại về người', 'Giấy chứng nhận thương tích; hồ sơ bệnh án; trích lục khai tử, giấy báo tử hoặc văn bản xác nhận của công an, kết quả giám định pháp y (trường hợp tử vong).'],
  ['Thiệt hại về tài sản', 'Hóa đơn, chứng từ hợp lệ hoặc bằng chứng về việc sửa chữa, thay mới; chứng từ chi phí hạn chế tổn thất hoặc làm theo chỉ dẫn của doanh nghiệp bảo hiểm.'],
  ['Quyết định của Tòa án', 'Nếu có.'],
  ['Doanh nghiệp bảo hiểm tự thu thập', 'Biên bản giám định; tài liệu của công an (thông báo kết quả điều tra, xác minh, giải quyết vụ tai nạn) trong vụ có người chết hoặc khi cần xác minh lỗi hoàn toàn của người thứ ba.'],
];
// NĐ 67/2023 Đ13

const INS_VCX = [
  ['Bản chất', 'Bảo hiểm tự nguyện cho hư hỏng, mất mát của chính chiếc xe. Phạm vi, điểm loại trừ, mức khấu trừ do hợp đồng và quy tắc bảo hiểm của từng doanh nghiệp quy định, không có mẫu chung bắt buộc.'],
  ['Quy trình thường gặp', 'Báo đường dây nóng ngay tại hiện trường → chụp ảnh, giữ hiện trường → giám định viên đến hoặc hướng dẫn chụp ảnh từ xa → đưa xe về gara được chấp thuận → thống nhất phương án và báo giá sửa chữa bằng văn bản giữa chủ xe, gara, doanh nghiệp → sửa xe → nộp hồ sơ và nhận bồi thường (hoặc bảo lãnh thanh toán tại gara).'],
  ['Điểm loại trừ hay gặp trong quy tắc', 'Lái xe có nồng độ cồn, không có GPLX hợp lệ; xe không có kiểm định hợp lệ; tự ý sửa chữa trước khi giám định; hư hỏng động cơ do cố khởi động khi xe ngập nước (thủy kích) trừ khi mua điều khoản bổ sung; hao mòn tự nhiên; xe dùng sai mục đích (chở khách thu tiền khi đăng ký không kinh doanh). Hãy đọc mục "Loại trừ" trong hợp đồng của bạn.'],
  ['Điều khoản bổ sung nên cân nhắc', 'Thủy kích; sửa chữa tại gara chính hãng; không khấu hao phụ tùng thay mới; mất cắp bộ phận. Đây là sản phẩm của doanh nghiệp, tên gọi có thể khác nhau.'],
];
// Phần vật chất xe là thông tin chung, không phải quy định bắt buộc.

const LIABILITY = [
  ['Hành chính', 'Phạt tiền, trừ điểm, tước GPLX theo NĐ 168. Ví dụ: vi phạm quy tắc gây tai nạn 20–22 triệu, trừ 10 điểm (Đ6 k10); gây tai nạn rồi bỏ đi 16–18 triệu, trừ 6 điểm (Đ6 k8); lạng lách đánh võng gây tai nạn 50–70 triệu và tước GPLX 22–24 tháng (Đ6 k13).'],
  ['Dân sự', 'Ô tô đang vận hành là "nguồn nguy hiểm cao độ" (BLDS 2015 Đ601): chủ sở hữu, người chiếm hữu, sử dụng phải bồi thường thiệt hại cả khi không có lỗi, trừ trường hợp thiệt hại xảy ra hoàn toàn do lỗi cố ý của người bị thiệt hại và các trường hợp khác luật định. Thời hiệu khởi kiện yêu cầu bồi thường thiệt hại ngoài hợp đồng là 03 năm. Bảo hiểm bắt buộc chi trả trong giới hạn; phần vượt chủ xe tự chịu.'],
  ['Hình sự (BLHS Đ260)', 'Khoản 1 (phạt tiền 30–100 triệu, cải tạo không giam giữ đến 3 năm hoặc tù 1–5 năm) khi vi phạm quy định an toàn giao thông gây: chết 1 người; thương tích một người từ 61%; hai người trở lên tổng 61–121%; thiệt hại tài sản 100 đến dưới 500 triệu. Khoản 2 (tù 3–10 năm) nếu: không có GPLX; có nồng độ cồn vượt mức quy định, dùng ma túy, chất kích thích; bỏ chạy hoặc cố ý không cứu giúp; không chấp hành hiệu lệnh; chết 2 người; thương tích tổng 122–200%; tài sản 500 triệu đến dưới 1,5 tỷ. Khoản 3 (tù 7–15 năm): chết 3 người trở lên, thương tích tổng từ 201%, tài sản từ 1,5 tỷ. Khoản 4: vi phạm có khả năng thực tế dẫn đến hậu quả khoản 3 nếu không ngăn chặn kịp thời cũng bị xử lý (phạt tiền 10–50 triệu, cải tạo không giam giữ đến 1 năm hoặc tù 3 tháng–1 năm).'],
];

module.exports = {
  MARKINGS_G, MARKING_NOTES, EXCEPTIONS, AUX_HOWTO, AUX_EXAMPLES,
  ACC_PRINCIPLES, ACC_TIMELINE, ACC_SCENARIOS, ACC_EVIDENCE, ACC_AGREEMENT, ACC_DONTS, FIRST_AID,
  INS_TNDS, INS_EXCLUSIONS, INS_DOCS, INS_VCX, LIABILITY,
};
