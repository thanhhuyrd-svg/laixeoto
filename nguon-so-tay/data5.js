// Danh mục biển báo QCVN 41:2024 (Điều 22.1, 28.1, 32.1, 36.1, 41.2.1, 46.8)
const CATALOG = [
 {
  "k": "P",
  "name": "Biển báo cấm (P, hết cấm DP)",
  "ref": "Điều 22.1, Phụ lục B",
  "rows": [
   [
    "P.101",
    "Đường cấm",
    "Cấm mọi phương tiện đi lại cả hai hướng, trừ xe ưu tiên (trừ khi cấm vì đường, cầu bị tắc)."
   ],
   [
    "P.102",
    "Cấm đi ngược chiều",
    "Cấm xe cơ giới và thô sơ đi vào theo chiều đặt biển, trừ xe ưu tiên."
   ],
   [
    "P.103a",
    "Cấm xe ô tô",
    "Cấm ô tô, trừ xe máy 2 bánh, xe gắn máy và xe ưu tiên."
   ],
   [
    "P.103(b,c)",
    "Cấm xe ô tô rẽ trái; Cấm xe ô tô rẽ phải",
    "Cấm ô tô rẽ theo hướng trên biển, trừ xe ưu tiên."
   ],
   [
    "P.104",
    "Cấm xe máy",
    "Cấm xe máy, trừ xe ưu tiên; không cấm người dắt xe máy."
   ],
   [
    "P.105",
    "Cấm xe ô tô và xe máy",
    "Cấm ô tô và xe máy, trừ xe ưu tiên."
   ],
   [
    "P.106(a,b)",
    "Cấm xe ô tô tải",
    "P.106a cấm ô tô tải (cả máy kéo, xe máy chuyên dùng); P.106b cấm xe tải có khối lượng chuyên chở lớn hơn trị số ghi trên biển."
   ],
   [
    "P.106c",
    "Cấm các xe chở hàng nguy hiểm",
    "Cấm xe chở hàng nguy hiểm."
   ],
   [
    "P.107",
    "Cấm xe ô tô khách và xe ô tô tải",
    "Cấm ô tô khách và ô tô tải, trừ xe ưu tiên."
   ],
   [
    "P.107a",
    "Cấm xe ô tô khách",
    "Cấm ô tô khách, trừ xe ưu tiên; không cấm xe buýt."
   ],
   [
    "P.107b",
    "Cấm xe ô tô taxi",
    "Cấm taxi; cấm theo giờ thì có biển phụ ghi giờ."
   ],
   [
    "P.108",
    "Cấm xe kéo rơ-moóc",
    "Cấm xe kéo rơ-moóc, trừ xe ưu tiên."
   ],
   [
    "P.108a",
    "Cấm xe sơ-mi rơ-moóc",
    "Cấm xe sơ-mi rơ-moóc, trừ xe ưu tiên."
   ],
   [
    "P.109",
    "Cấm máy kéo",
    "Cấm máy kéo."
   ],
   [
    "P.110a",
    "Cấm xe đạp",
    "Cấm xe đạp; không cấm người dắt xe đạp."
   ],
   [
    "P.110b",
    "Cấm xe đạp thồ",
    "Cấm xe đạp thồ; không cấm người dắt."
   ],
   [
    "P.111a",
    "Cấm xe gắn máy",
    "Cấm xe gắn máy (không áp dụng cho xe đạp)."
   ],
   [
    "P.111(b) hoặc (c)",
    "Cấm xe ba bánh loại có động cơ (xe lam, xích lô máy)",
    "Cấm xe ba bánh có động cơ."
   ],
   [
    "P.111d",
    "Cấm xe ba bánh loại không có động cơ (xích lô)",
    "Cấm xích lô."
   ],
   [
    "P.112",
    "Cấm người đi bộ",
    "Cấm người đi bộ."
   ],
   [
    "P.113",
    "Cấm xe người kéo, đẩy",
    "Không cấm xe nôi trẻ em và xe của người khuyết tật."
   ],
   [
    "P.114",
    "Cấm xe vật nuôi kéo",
    "Cấm xe do vật nuôi kéo."
   ],
   [
    "P.115",
    "Hạn chế trọng tải toàn bộ xe",
    "Cấm xe có trọng tải toàn bộ vượt trị số trên biển, kể cả xe ưu tiên."
   ],
   [
    "P.116",
    "Hạn chế tải trọng trên trục xe",
    "Cấm xe có tải trọng trục vượt trị số trên biển, kể cả xe ưu tiên."
   ],
   [
    "P.117",
    "Hạn chế chiều cao",
    "Cấm xe (kể cả hàng) cao vượt trị số trên biển, kể cả xe ưu tiên."
   ],
   [
    "P.118",
    "Hạn chế chiều ngang xe",
    "Cấm xe (kể cả hàng) rộng vượt trị số trên biển, kể cả xe ưu tiên."
   ],
   [
    "P.119",
    "Hạn chế chiều dài xe",
    "Cấm xe dài vượt trị số trên biển, kể cả xe ưu tiên."
   ],
   [
    "P.120",
    "Hạn chế chiều dài xe cơ giới kéo theo rơ-moóc hoặc sơ-mi rơ-moóc",
    "Cấm đoàn xe dài vượt trị số trên biển, kể cả xe ưu tiên."
   ],
   [
    "P.121",
    "Cự ly tối thiểu giữa hai xe",
    "Giữ khoảng cách không nhỏ hơn trị số trên biển, kể cả xe ưu tiên."
   ],
   [
    "P.123(a,b)",
    "Cấm rẽ trái; Cấm rẽ phải",
    "Cấm rẽ tại nơi giao nhau ngay sau biển, trừ xe ưu tiên; không cấm quay đầu."
   ],
   [
    "P.124(a,b)",
    "Cấm quay đầu xe; Cấm ô tô quay đầu xe",
    "Cấm quay đầu (b: chỉ ô tô), trừ xe ưu tiên; không cấm rẽ trái."
   ],
   [
    "P.124(c,d)",
    "Cấm rẽ trái và quay đầu xe; Cấm rẽ phải và quay đầu xe",
    "Cấm cả rẽ và quay đầu."
   ],
   [
    "P.124(e,f)",
    "Cấm ô tô rẽ trái và quay đầu xe; Cấm ô tô rẽ phải và quay đầu xe",
    "Cấm ô tô rẽ và quay đầu."
   ],
   [
    "P.125",
    "Cấm vượt",
    "Cấm xe cơ giới vượt nhau, kể cả xe ưu tiên; được vượt xe máy 2 bánh, xe gắn máy."
   ],
   [
    "P.126",
    "Cấm xe ô tô tải vượt",
    "Cấm xe tải trên 3,5 tấn vượt xe cơ giới khác; xe khác vẫn được vượt nhau và vượt xe tải."
   ],
   [
    "P.127",
    "Tốc độ tối đa cho phép",
    "Không chạy quá trị số trên biển, trừ xe ưu tiên."
   ],
   [
    "P.127a",
    "Tốc độ tối đa cho phép về ban đêm",
    "Trị số không lớn hơn 80 km/h, hiệu lực trong khu đông dân cư."
   ],
   [
    "P.127b",
    "Biển ghép tốc độ tối đa cho phép trên từng làn đường",
    "Tốc độ tối đa riêng cho từng làn."
   ],
   [
    "P.127c",
    "Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường",
    "Tốc độ tối đa theo loại xe và theo làn."
   ],
   [
    "DP.127",
    "Biển hết tốc độ tối đa cho phép theo biển ghép",
    "Hết hiệu lực P.127b, P.127c."
   ],
   [
    "P.128",
    "Cấm sử dụng còi",
    "Cấm bấm còi trong phạm vi biển."
   ],
   [
    "P.129",
    "Kiểm tra",
    "Nơi đặt trạm kiểm tra; xe vận tải phải dừng."
   ],
   [
    "P.130",
    "Cấm dừng xe và đỗ xe",
    "Cấm dừng, đỗ ở phía đường có đặt biển, trừ xe ưu tiên."
   ],
   [
    "P.131(a,b,c)",
    "Cấm đỗ xe",
    "Cấm đỗ ở phía đường có biển (b: ngày lẻ; c: ngày chẵn); không cấm dừng."
   ],
   [
    "P.132",
    "Nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp",
    "Phải dừng nhường xe cơ giới đi ngược chiều, kể cả xe ưu tiên."
   ],
   [
    "DP.133",
    "Hết cấm vượt",
    "Hết hiệu lực P.125, P.126."
   ],
   [
    "DP.134",
    "Hết tốc độ tối đa cho phép",
    "Hết hiệu lực P.127."
   ],
   [
    "DP.135",
    "Hết tất cả các lệnh cấm",
    "Hết hiệu lực các biển P.121, P.125 đến P.131 đặt trước đó."
   ],
   [
    "P.136",
    "Cấm đi thẳng",
    "Cấm đi thẳng, trừ xe ưu tiên."
   ],
   [
    "P.137",
    "Cấm rẽ trái, rẽ phải",
    "Cấm rẽ cả hai phía, trừ xe ưu tiên."
   ],
   [
    "P.138",
    "Cấm đi thẳng, rẽ trái",
    "Cấm đi thẳng và rẽ trái, trừ xe ưu tiên."
   ],
   [
    "P.139",
    "Cấm đi thẳng, rẽ phải",
    "Cấm đi thẳng và rẽ phải, trừ xe ưu tiên."
   ],
   [
    "P.140",
    "Cấm xe công nông và các loại xe tương tự",
    "Cấm xe công nông."
   ]
  ]
 },
 {
  "k": "W",
  "name": "Biển nguy hiểm và cảnh báo (W)",
  "ref": "Điều 28.1, Phụ lục C",
  "rows": [
   [
    "W.201(a,b)",
    "Chỗ ngoặt nguy hiểm",
    "Báo trước chỗ ngoặt nguy hiểm; a vòng bên trái, b vòng bên phải."
   ],
   [
    "W.201(c,d)",
    "Chỗ ngoặt nguy hiểm có nguy cơ lật xe",
    "Chỗ ngoặt có nguy cơ lật xe tải, xe giường nằm, xe chở chất lỏng."
   ],
   [
    "W.202(a,b)",
    "Nhiều chỗ ngoặt nguy hiểm liên tiếp",
    "Hai chỗ ngoặt ngược chiều liên tiếp cách nhau dưới 160 m."
   ],
   [
    "W.203(a,b,c)",
    "Đường bị thu hẹp",
    "Đường thu hẹp đột ngột: a hai bên; b, c về một phía."
   ],
   [
    "W.204",
    "Đường hai chiều",
    "Đoạn đi chung hai chiều (đường sửa chữa, hết đoạn một chiều)."
   ],
   [
    "W.205(a,b,c,d,e)",
    "Đường giao nhau",
    "Giao nhau cùng mức của các đường cùng cấp, không đường nào ưu tiên."
   ],
   [
    "W.206",
    "Giao nhau chạy theo vòng xuyến",
    "Nơi giao có đảo an toàn; xe chạy vòng theo chiều mũi tên."
   ],
   [
    "W.207(a,b,c,d,e,f,g,h,i,k,l)",
    "Giao nhau với đường không ưu tiên (đường nhánh)",
    "Mình đang trên đường ưu tiên, sắp gặp đường nhánh."
   ],
   [
    "W.208",
    "Giao nhau với đường ưu tiên (đường chính)",
    "Mình đang trên đường không ưu tiên; phải nhường đường."
   ],
   [
    "W.209",
    "Giao nhau có tín hiệu đèn",
    "Phía trước có nút giao có đèn tín hiệu."
   ],
   [
    "W.210",
    "Giao nhau với đường sắt có rào chắn",
    "Đường bộ giao đường sắt có rào chắn."
   ],
   [
    "W.211",
    "Giao nhau với đường sắt không có rào chắn",
    "Đường bộ giao đường sắt không có rào chắn, không người điều khiển."
   ],
   [
    "W.212",
    "Cầu hẹp",
    "Cầu có phần xe chạy không quá 4,50 m; đi chậm, nhường nhau."
   ],
   [
    "W.213",
    "Cầu tạm",
    "Cầu dùng tạm; nước ngập không được qua."
   ],
   [
    "W.214",
    "Cầu quay - cầu cất",
    "Cầu quay hoặc cất để thông thuyền; dừng chờ."
   ],
   [
    "W.215a",
    "Kè, vực sâu phía trước",
    "Phía trước có kè chắn vực sâu hoặc sông suối."
   ],
   [
    "W.215(b,c)",
    "Kè, vực sâu bên đường phía bên phải; phía bên trái",
    "Kè hoặc vực sâu sát bên đường."
   ],
   [
    "W.216a",
    "Đường ngầm",
    "Đường tràn qua sông, suối, khe."
   ],
   [
    "W.216b",
    "Đường ngầm có nguy cơ lũ quét",
    "Đường ngầm thường có nguy cơ lũ quét; có thể kèm chữ \"LŨ\"."
   ],
   [
    "W.217",
    "Bến phà",
    "Phía trước là bến phà; theo nội quy bến phà."
   ],
   [
    "W.218",
    "Cửa chui",
    "Phía trước có cổng chắn ngang (cổng thành, cầu vòm)."
   ],
   [
    "W.219",
    "Dốc xuống nguy hiểm",
    "Dốc từ 6% dài trên 600 m, hoặc từ 10% dài trên 140 m."
   ],
   [
    "W.220",
    "Dốc lên nguy hiểm",
    "Tiêu chí như W.219."
   ],
   [
    "W.221a",
    "Đường lồi lõm",
    "Đoạn gập ghềnh, ổ gà sau đoạn đường tốt."
   ],
   [
    "W.221b",
    "Đường có gồ giảm tốc",
    "Phía trước có gồ giảm tốc hoặc chỗ lún võng đầu cầu, cống."
   ],
   [
    "W.222a",
    "Đường trơn",
    "Đoạn dễ trơn trượt, nhất là khi thời tiết xấu."
   ],
   [
    "W.222b",
    "Lề đường nguy hiểm",
    "Lề không ổn định, dễ văng đất đá, bánh quay tại chỗ."
   ],
   [
    "W.223(a,b)",
    "Vách núi nguy hiểm",
    "Đường sát vách núi, hẹp, hạn chế tầm nhìn."
   ],
   [
    "W.224",
    "Đường người đi bộ cắt ngang",
    "Giảm tốc, nhường người đi bộ."
   ],
   [
    "W.225",
    "Trẻ em",
    "Gần trường học, nơi trẻ em qua lại; đi chậm."
   ],
   [
    "W.226",
    "Đường người đi xe đạp cắt ngang",
    "Gần nơi xe đạp cắt ngang hoặc nhập vào."
   ],
   [
    "W.227",
    "Công trường",
    "Đoạn đang thi công có người, máy làm việc; giảm tốc."
   ],
   [
    "W.228(a,b)",
    "Đá lở",
    "Đoạn đất đá dễ sụt lở."
   ],
   [
    "W.228c",
    "Sỏi đá bắn lên",
    "Mặt đường rời rạc, sỏi đá bắn lên."
   ],
   [
    "W.228d",
    "Nền đường yếu",
    "Nền yếu hoặc đang theo dõi lún; giảm tốc."
   ],
   [
    "W.229",
    "Dải máy bay lên xuống",
    "Sát đường băng, máy bay bay thấp."
   ],
   [
    "W.230",
    "Gia súc",
    "Thường có gia súc qua đường; đi chậm."
   ],
   [
    "W.231",
    "Thú rừng vượt qua đường",
    "Thường có thú rừng qua đường."
   ],
   [
    "W.232",
    "Gió ngang",
    "Thường có gió ngang mạnh; điều chỉnh tốc độ."
   ],
   [
    "W.233",
    "Nguy hiểm khác",
    "Nguy hiểm không có biển riêng từ W.201 đến W.232."
   ],
   [
    "W.234",
    "Giao nhau với đường hai chiều",
    "Trên đường một chiều, sắp giao với đường hai chiều."
   ],
   [
    "W.235",
    "Đường đôi",
    "Đoạn hai chiều được phân cách bằng dải phân cách cứng."
   ],
   [
    "W.236",
    "Kết thúc đường đôi",
    "Sắp hết đoạn đường đôi."
   ],
   [
    "W.237",
    "Cầu vồng",
    "Công trình có độ vồng lớn, hạn chế tầm nhìn."
   ],
   [
    "W.238",
    "Đường cao tốc phía trước",
    "Trên đường nhánh nhập vào cao tốc."
   ],
   [
    "W.239a",
    "Đường cáp điện ở phía trên",
    "Dây điện cắt ngang phía trên; kèm S.509a chiều cao an toàn."
   ],
   [
    "W.239b",
    "Chiều cao tĩnh không thực tế",
    "Chiều cao tĩnh không bị hạn chế."
   ],
   [
    "W.240",
    "Đường hầm",
    "Chuẩn bị vào hầm đường bộ."
   ],
   [
    "W.241",
    "Ùn tắc giao thông",
    "Đoạn hay ùn tắc."
   ],
   [
    "W.242(a,b)",
    "Nơi đường sắt giao vuông góc với đường bộ",
    "Bổ sung cho W.211; a một cặp ray, b từ hai cặp ray."
   ],
   [
    "W.243(a,b,c)",
    "Nơi đường sắt giao không vuông góc với đường bộ",
    "Đặt dưới W.211, cách ray 50 m, 100 m, 150 m."
   ],
   [
    "W.244",
    "Đoạn đường hay xảy ra tai nạn",
    "Cảnh báo đoạn thường xảy ra tai nạn."
   ],
   [
    "W.245(a,b)",
    "Đi chậm",
    "Giảm tốc độ; b có chữ tiếng Anh."
   ],
   [
    "W.246(a,b,c)",
    "Chú ý chướng ngại vật",
    "Chướng ngại vật phía trước; vòng tránh theo hình vẽ."
   ],
   [
    "W.247",
    "Chú ý xe đỗ",
    "Có xe đỗ chiếm một phần đường; đặt trên mặt đường."
   ]
  ]
 },
 {
  "k": "R",
  "name": "Biển hiệu lệnh (R)",
  "ref": "Điều 32.1, Phụ lục D",
  "rows": [
   [
    "R.122",
    "Dừng lại",
    "Dừng trước biển hoặc vạch, chỉ đi khi an toàn hoặc có tín hiệu cho phép."
   ],
   [
    "R.301(a,b,c,d,e,f,g,h)",
    "Hướng đi phải theo",
    "Chỉ được đi theo hướng mũi tên (thẳng, rẽ phải, rẽ trái hoặc kết hợp)."
   ],
   [
    "R.302(a,b,c)",
    "Hướng phải đi vòng chướng ngại vật",
    "Vòng qua chướng ngại vật theo mũi tên."
   ],
   [
    "R.303",
    "Nơi giao nhau chạy theo vòng xuyến",
    "Chuyển hướng phải chạy vòng quanh đảo theo mũi tên."
   ],
   [
    "R.304",
    "Đường dành cho xe thô sơ",
    "Cấm xe cơ giới, kể cả xe gắn máy."
   ],
   [
    "R.305",
    "Đường dành cho người đi bộ",
    "Cấm xe cơ giới và thô sơ (trừ xe đạp, xe lăn), trừ cắt ngang an toàn."
   ],
   [
    "R.306",
    "Tốc độ tối thiểu cho phép",
    "Không chạy chậm hơn trị số trên biển khi điều kiện thuận lợi."
   ],
   [
    "R.307",
    "Hết tốc độ tối thiểu",
    "Hết hiệu lực R.306."
   ],
   [
    "R.308(a,b)",
    "Tuyến đường cầu vượt cắt qua",
    "Phía trước có cầu vượt; đi theo hình vẽ."
   ],
   [
    "R.309",
    "Ấn còi",
    "Phải bấm còi tại vị trí đặt biển (khúc ngoặt gấp, đèo dốc tầm nhìn hạn chế)."
   ],
   [
    "R.310(a,b,c)",
    "Hướng đi phải theo cho các xe chở hàng nguy hiểm",
    "Như R.301, áp dụng cho xe chở hàng nguy hiểm."
   ],
   [
    "R.403a",
    "Đường dành cho xe ô tô",
    "Bắt đầu đường dành cho ô tô; xe khác không được vào."
   ],
   [
    "R.403b",
    "Đường dành cho xe ô tô, xe máy",
    "Bắt đầu đường dành cho ô tô và xe máy."
   ],
   [
    "R.403c",
    "Đường dành cho xe buýt",
    "Bắt đầu đường dành cho xe buýt."
   ],
   [
    "R.403d",
    "Đường dành cho xe ô tô con",
    "Bắt đầu đường dành cho ô tô con."
   ],
   [
    "R.403e",
    "Đường dành cho xe máy",
    "Bắt đầu đường dành cho xe máy."
   ],
   [
    "R.403f",
    "Đường dành cho xe máy và xe đạp",
    "Bắt đầu đường dành cho xe máy, xe đạp."
   ],
   [
    "R.403g",
    "Đường dành cho xe chở hàng bốn bánh gắn động cơ",
    "Bắt đầu đường dành cho loại xe này."
   ],
   [
    "R.403h",
    "Đường dành cho xe chở người bốn bánh gắn động cơ",
    "Bắt đầu đường dành cho loại xe này."
   ],
   [
    "R.403k",
    "Đường dành cho xe chở hàng, xe chở người bốn bánh gắn động cơ",
    "Bắt đầu đường dành cho loại xe này."
   ],
   [
    "R.404a",
    "Hết đoạn đường dành cho xe ô tô",
    "Hết hiệu lực R.403a."
   ],
   [
    "R.404b",
    "Hết đoạn đường dành cho xe ô tô, xe máy",
    "Hết hiệu lực R.403b."
   ],
   [
    "R.404c",
    "Hết đoạn đường dành cho xe buýt",
    "Hết hiệu lực R.403c."
   ],
   [
    "R.404d",
    "Hết đoạn đường dành cho xe ô tô con",
    "Hết hiệu lực R.403d."
   ],
   [
    "R.404e",
    "Hết đoạn đường dành cho xe máy",
    "Hết hiệu lực R.403e."
   ],
   [
    "R.404f",
    "Hết đoạn đường dành cho xe máy và xe đạp",
    "Hết hiệu lực R.403f."
   ],
   [
    "R.404g",
    "Hết đoạn đường dành cho xe chở hàng bốn bánh gắn động cơ",
    "Hết hiệu lực R.403g."
   ],
   [
    "R.404h",
    "Hết đoạn đường dành cho xe chở người bốn bánh gắn động cơ",
    "Hết hiệu lực R.403h."
   ],
   [
    "R.404k",
    "Hết đoạn đường dành cho xe chở hàng, xe chở người bốn bánh gắn động cơ",
    "Hết hiệu lực R.403k."
   ],
   [
    "R.411",
    "Hướng đi trên mỗi làn đường phải theo",
    "Số làn và hướng đi từng làn; phải đi đúng làn."
   ],
   [
    "R.412a",
    "Làn đường dành cho xe ô tô khách",
    "Làn dành riêng; xe khác không vào, trừ xe ưu tiên."
   ],
   [
    "R.412b",
    "Làn đường dành cho xe ô tô con",
    "Làn dành riêng; xe khác không vào, trừ xe ưu tiên."
   ],
   [
    "R.412c",
    "Làn đường dành cho xe ô tô tải",
    "Làn dành riêng; xe khác không vào, trừ xe ưu tiên."
   ],
   [
    "R.412d",
    "Làn đường dành cho xe máy",
    "Làn dành riêng cho xe máy, xe gắn máy."
   ],
   [
    "R.412e",
    "Làn đường dành cho xe buýt",
    "Vạch đứt: xe khác được vào nhưng ưu tiên xe buýt; vạch liền: không được vào."
   ],
   [
    "R.412f",
    "Làn đường dành cho xe ô tô",
    "Làn dành riêng cho ô tô."
   ],
   [
    "R.412g",
    "Làn đường dành cho xe máy và xe đạp",
    "Làn dành riêng cho xe máy, xe đạp."
   ],
   [
    "R.412h",
    "Làn đường dành cho xe đạp",
    "Làn dành riêng cho xe đạp, xe thô sơ."
   ],
   [
    "R.412i",
    "Kết thúc làn đường dành cho xe ô tô khách",
    "Hết làn dành riêng (Phụ lục D.15 ghi R.413i)."
   ],
   [
    "R.412j",
    "Kết thúc làn đường dành cho xe ô tô con",
    "Hết làn dành riêng (D.15 ghi R.413j)."
   ],
   [
    "R.412k",
    "Kết thúc làn đường dành cho xe ô tô tải",
    "Hết làn dành riêng (D.15 ghi R.413k)."
   ],
   [
    "R.412l",
    "Kết thúc làn đường dành cho xe máy",
    "Hết làn dành riêng (D.15 ghi R.413l)."
   ],
   [
    "R.412m",
    "Kết thúc làn đường dành cho xe buýt",
    "Hết làn dành riêng (D.15 ghi R.413m)."
   ],
   [
    "R.412n",
    "Kết thúc làn đường dành cho xe ô tô",
    "Hết làn dành riêng (D.15 ghi R.413n)."
   ],
   [
    "R.412o",
    "Kết thúc làn đường dành cho xe máy và xe đạp",
    "Hết làn dành riêng (D.15 ghi R.413o)."
   ],
   [
    "R.412p",
    "Kết thúc làn đường dành cho xe đạp",
    "Hết làn dành riêng (D.15 ghi R.413p)."
   ],
   [
    "R.415",
    "Biển gộp làn đường theo phương tiện",
    "Số làn và loại xe được đi trên từng làn (D.16 có R.415a, R.415b kết thúc)."
   ],
   [
    "R.420",
    "Bắt đầu khu đông dân cư",
    "Áp dụng quy định khu đông dân cư."
   ],
   [
    "R.421",
    "Hết khu đông dân cư",
    "Hết phạm vi khu đông dân cư."
   ],
   [
    "R.E,9a",
    "Cấm đỗ xe trong khu vực",
    "Cấm đỗ xe trong cả khu vực."
   ],
   [
    "R.E,9b",
    "Cấm đỗ xe theo giờ trong khu vực",
    "Cấm đỗ theo giờ trong khu vực."
   ],
   [
    "R.E,9c",
    "Khu vực đỗ xe",
    "Bắt đầu khu vực đỗ xe."
   ],
   [
    "R.E,9d",
    "Tốc độ tối đa trong khu vực",
    "Hạn chế tốc độ tối đa trong khu vực."
   ],
   [
    "R.E,10a",
    "Hết cấm đỗ xe trong khu vực",
    "Ra khỏi khu vực cấm đỗ."
   ],
   [
    "R.E,10b",
    "Hết cấm đỗ xe theo giờ trong khu vực",
    "Ra khỏi khu vực cấm đỗ theo giờ."
   ],
   [
    "R.E,10c",
    "Hết khu vực đỗ xe",
    "Ra khỏi khu vực đỗ xe."
   ],
   [
    "R.E,10d",
    "Hết tốc độ tối đa trong khu vực",
    "Hết hạn chế tốc độ khu vực."
   ],
   [
    "R.E,11a",
    "Đường hầm",
    "Đoạn qua hầm có quy định giao thông riêng."
   ],
   [
    "R.E,11b",
    "Kết thúc đường hầm",
    "Hết đoạn qua hầm."
   ]
  ]
 },
 {
  "k": "I",
  "name": "Biển chỉ dẫn (I)",
  "ref": "Điều 36.1, Phụ lục E",
  "rows": [
   [
    "I.401",
    "Bắt đầu đường ưu tiên",
    "Xe trên đường này được đi trước; xe từ đường nhánh phải nhường."
   ],
   [
    "I.402",
    "Hết đoạn đường ưu tiên",
    "Hết đoạn đường ưu tiên."
   ],
   [
    "I.405(a,b,c)",
    "Đường cụt",
    "a, b chỉ lối vào đường cụt; c báo phía trước là đường cụt."
   ],
   [
    "I.406",
    "Được ưu tiên qua đường hẹp",
    "Được đi trước ở đoạn hẹp; chiều ngược lại có P.132."
   ],
   [
    "I.407(a,b,c)",
    "Đường một chiều",
    "Chỉ đi theo chiều mũi tên, cấm quay đầu ngược lại."
   ],
   [
    "I.408",
    "Nơi đỗ xe",
    "Nơi được phép đỗ xe, bãi đỗ."
   ],
   [
    "I.408a",
    "Nơi đỗ xe một phần trên hè phố",
    "Được đỗ một phần trên hè phố rộng."
   ],
   [
    "I.409",
    "Chỗ quay xe",
    "Vị trí được phép quay đầu."
   ],
   [
    "I.410",
    "Khu vực quay xe",
    "Khu vực được phép quay đầu; biển mô tả cách quay."
   ],
   [
    "I.413a",
    "Đường phía trước có làn đường dành cho ô tô khách",
    "Đặt sau nơi giao nhau."
   ],
   [
    "I.413(b,c)",
    "Rẽ ra đường có làn đường dành cho ô tô khách",
    "Đặt trước nơi giao nhau."
   ],
   [
    "I.414(a,b,c,d)",
    "Chỉ hướng đường",
    "Hướng đến địa danh, số hiệu đường, cự ly."
   ],
   [
    "I.415",
    "Mũi tên chỉ hướng đi",
    "Hướng và khoảng cách đến địa danh lân cận."
   ],
   [
    "I.416",
    "Đường tránh",
    "Lối đường tránh, đường vòng khi đường bị cấm."
   ],
   [
    "I.417(a,b,c)",
    "Chỉ hướng đường phải đi cho từng loại xe",
    "Hướng đi cho từng loại xe khi có hạn chế."
   ],
   [
    "I.418",
    "Lối đi ở những vị trí cấm rẽ",
    "Lối đi thay thế tại nơi cấm rẽ."
   ],
   [
    "I.419a",
    "Chỉ dẫn địa giới",
    "Ranh giới hành chính."
   ],
   [
    "I.419b",
    "Chỉ dẫn địa giới trên tuyến đường đối ngoại",
    "Như I.419a, tuyến đối ngoại."
   ],
   [
    "I.422a",
    "Di tích lịch sử",
    "Nơi có di tích, danh thắng."
   ],
   [
    "I.422b",
    "Di tích lịch sử trên tuyến đường đối ngoại",
    "Như I.422a, tuyến đối ngoại."
   ],
   [
    "I.423(a,b)",
    "Vị trí người đi bộ sang ngang",
    "Đi chậm, ưu tiên người đi bộ."
   ],
   [
    "I.423c",
    "Điểm bắt đầu đường đi bộ",
    "Bắt đầu đoạn đường dành cho người đi bộ."
   ],
   [
    "I.424(a,b)",
    "Cầu vượt qua đường cho người đi bộ",
    "Cầu vượt cho người đi bộ."
   ],
   [
    "I.424(c,d)",
    "Hầm chui qua đường cho người đi bộ",
    "Hầm chui cho người đi bộ."
   ],
   [
    "I.425",
    "Bệnh viện",
    "Sắp đến cơ sở y tế; đi chậm, không dùng còi."
   ],
   [
    "I.426",
    "Trạm cấp cứu",
    "Nơi có trạm cấp cứu."
   ],
   [
    "I.427a",
    "Trạm sửa chữa",
    "Nơi sửa chữa ô tô, xe máy."
   ],
   [
    "I.427b",
    "Công trình kiểm soát tải trọng xe",
    "Nơi đặt trạm cân tải trọng."
   ],
   [
    "I.428",
    "Cửa hàng xăng dầu",
    "Cửa hàng xăng dầu (Phụ lục E có thêm I.428b trạm nạp điện, I.428c cả hai)."
   ],
   [
    "I.429",
    "Nơi rửa xe",
    "Nơi rửa xe."
   ],
   [
    "I.430",
    "Điện thoại",
    "Điện thoại công cộng."
   ],
   [
    "I.431",
    "Trạm dừng nghỉ",
    "Dịch vụ ăn uống, nghỉ ngơi, nhiên liệu."
   ],
   [
    "I.432",
    "Khách sạn",
    "Nơi có khách sạn."
   ],
   [
    "I.433a",
    "Nơi nghỉ mát",
    "Nơi nghỉ mát."
   ],
   [
    "I.433(b,c,d)",
    "Báo hiệu nơi cắm trại, nhà nghỉ lưu động",
    "Trên tuyến đối ngoại."
   ],
   [
    "I.433e",
    "Báo hiệu nhà trọ",
    "Trên tuyến đối ngoại."
   ],
   [
    "I.434a",
    "Bến xe buýt",
    "Chỗ dừng xe buýt; không dừng đỗ chiếm chỗ."
   ],
   [
    "I.434b",
    "Bến xe tải",
    "Khu vực đỗ xe tải nhận trả hàng."
   ],
   [
    "I.435",
    "Bến xe điện",
    "Chỗ dừng xe điện."
   ],
   [
    "I.436",
    "Trạm cảnh sát giao thông",
    "Giảm tốc đến mức an toàn, không vượt."
   ],
   [
    "I.437",
    "Đường cao tốc",
    "Bắt đầu đường cao tốc (có ở Phụ lục E.40, không có trong danh mục Điều 36.1)."
   ],
   [
    "I.439",
    "Tên cầu",
    "Thông tin về cầu."
   ],
   [
    "I.440",
    "Đường đang thi công",
    "Đoạn đang thi công, đặt ở hai đầu đoạn."
   ],
   [
    "I.441(a,b,c)",
    "Báo hiệu phía trước có công trường thi công",
    "Cách đoạn thi công 500 m, 100 m, 50 m."
   ],
   [
    "I.442",
    "Chợ",
    "Sắp đến khu vực có chợ; giảm tốc."
   ],
   [
    "I.443",
    "Xe kéo rơ-moóc",
    "Đặt trên nóc cabin xe đang kéo."
   ],
   [
    "I.444(a–m)",
    "Biển báo chỉ dẫn địa điểm",
    "Ga tàu, sân bay, bãi đỗ, bến xe, trạm cấp cứu, bến tàu, khu du lịch, trạm xăng, rửa xe, bến phà, ga tàu điện ngầm, khu dịch vụ, trạm sửa chữa."
   ],
   [
    "I.445(a–h)",
    "Biển báo kiểu mô tả tình trạng đường",
    "Đường trơn, dốc, sương mù, nền yếu, xe lớn đi sát phải, gió ngang, hay tai nạn, xuống dốc liên tục."
   ],
   [
    "I.446",
    "Nơi đỗ xe dành cho người khuyết tật",
    "Không đỗ vào nếu không phải xe người khuyết tật."
   ],
   [
    "I.447(a,b,c,d)",
    "Cầu vượt liên thông",
    "Trước cầu vượt có tổ chức liên thông giữa các tuyến."
   ],
   [
    "I.448",
    "Làn đường cứu nạn hay làn thoát xe khẩn cấp",
    "Vị trí làn thoát hiểm (thường trên đèo dốc); biển ở 2 km, 1 km, 300 m và tại chỗ rẽ."
   ],
   [
    "I.449",
    "Biển tên đường",
    "Tên đường trên tuyến đối ngoại."
   ]
  ]
 },
 {
  "k": "IE",
  "name": "Biển chỉ dẫn trên đường cao tốc (IE)",
  "ref": "Điều 46.8, Điều 47",
  "rows": [
   [
    "IE.450(a,b)",
    "Sơ đồ, khoảng cách đến nút giao với đường dẫn vào đường cao tốc",
    ""
   ],
   [
    "IE.451(a,b)",
    "Lối vào và khoảng cách đến lối vào đường cao tốc",
    ""
   ],
   [
    "IE.452",
    "Bắt đầu đường cao tốc",
    "Từ đây áp dụng quy tắc giao thông trên cao tốc."
   ],
   [
    "IE.453(a,b)",
    "Kết thúc đường cao tốc",
    ""
   ],
   [
    "IE.453c",
    "Hết đường cao tốc",
    ""
   ],
   [
    "IE.454",
    "Khoảng cách đến lối ra phía trước",
    ""
   ],
   [
    "IE.455(a,b)",
    "Khoảng cách đến các lối ra tiếp theo",
    ""
   ],
   [
    "IE.456(a,b,c)",
    "Trạm dừng nghỉ và khoảng cách đến trạm dừng nghỉ",
    ""
   ],
   [
    "IE.457(a,b)",
    "Nơi đỗ xe trong trạm dừng nghỉ",
    ""
   ],
   [
    "IE.458",
    "Khoảng cách đến các trạm dừng nghỉ tiếp theo",
    ""
   ],
   [
    "IE.459(a,b)",
    "Khoảng cách đến khu tham quan, du lịch",
    ""
   ],
   [
    "IE.460",
    "Cột lý trình kilômét",
    ""
   ],
   [
    "IE.461(a,b,c,d)",
    "Khu dịch vụ công cộng, giải trí",
    ""
   ],
   [
    "IE.462",
    "Tần số trên sóng radio",
    ""
   ],
   [
    "IE.463(a,b,c)",
    "Công trình kiểm soát tải trọng xe",
    ""
   ],
   [
    "IE.464(a,b)",
    "Địa điểm và phương hướng",
    ""
   ],
   [
    "IE.465(a,b)",
    "Địa điểm và khoảng cách",
    ""
   ],
   [
    "IE.466",
    "Sơ đồ lối ra một chiều",
    ""
   ],
   [
    "IE.467(a,b)",
    "Nhập làn",
    ""
   ],
   [
    "IE.468(a,b)",
    "Chướng ngại vật phía trước",
    ""
   ],
   [
    "IE.469",
    "Hướng rẽ",
    ""
   ],
   [
    "IE.470",
    "Số điện thoại khẩn cấp",
    "Số gọi khi gặp sự cố trên tuyến."
   ],
   [
    "IE.471",
    "Giữ khoảng cách lái xe an toàn",
    "Kết hợp biển, vạch để giữ cự ly."
   ],
   [
    "IE.472(a,b)",
    "Trạm thu phí",
    ""
   ],
   [
    "IE.473",
    "Giảm tốc độ",
    ""
   ],
   [
    "IE.474",
    "Lối ra",
    ""
   ]
  ]
 },
 {
  "k": "S",
  "name": "Biển phụ (S)",
  "ref": "Điều 41.2.1, Phụ lục F",
  "rows": [
   [
    "S.501",
    "Phạm vi tác dụng của biển",
    "Biển chính hiệu lực trong đoạn dài ghi trên biển phụ."
   ],
   [
    "S.502",
    "Khoảng cách đến đối tượng báo hiệu",
    "Còn bao xa đến chỗ báo hiệu."
   ],
   [
    "S.503(a,b,c,d,e,f)",
    "Hướng tác dụng của biển",
    "a–c vuông góc chiều đi; d–f song song chiều đi, điểm đầu, điểm cuối."
   ],
   [
    "S.H,3(a,b,c)",
    "Hướng tác dụng của biển (kiểu GMS)",
    "Dùng trên tuyến đối ngoại."
   ],
   [
    "S.504",
    "Làn đường",
    "Biển chính chỉ áp dụng cho làn được chỉ."
   ],
   [
    "S.505a",
    "Loại xe",
    "Biển chính chỉ áp dụng cho loại xe vẽ trên biển phụ."
   ],
   [
    "S.505b",
    "Loại xe hạn chế qua cầu",
    "Loại xe tải và tổng trọng tải được qua cầu."
   ],
   [
    "S.505c",
    "Tải trọng trục hạn chế qua cầu",
    "Tải trọng trục tối đa theo loại trục."
   ],
   [
    "S.506(a,b)",
    "Hướng đường ưu tiên",
    "Hình vẽ hướng đường ưu tiên tại ngã tư."
   ],
   [
    "S.507",
    "Hướng rẽ",
    "Dùng độc lập, báo hướng rẽ gấp."
   ],
   [
    "S.508(a,b)",
    "Biểu thị thời gian",
    "Biển chính chỉ hiệu lực trong giờ, ngày ghi trên biển phụ."
   ],
   [
    "S.509(a,b)",
    "Thuyết minh biển chính",
    "a chiều cao an toàn; b chữ \"Cấm đỗ xe\"."
   ],
   [
    "S.510a",
    "Chú ý đường trơn có băng tuyết",
    ""
   ],
   [
    "S.510b",
    "Chú ý đường sắt",
    "Rẽ vào nhánh có đường sắt cách dưới 100 m."
   ],
   [
    "S.G,7",
    "Địa điểm cắm trại",
    ""
   ],
   [
    "S.G,8",
    "Địa điểm nhà trọ",
    ""
   ],
   [
    "S.G,9b",
    "Chỉ dẫn tới điểm đỗ xe dành cho lái xe muốn sử dụng phương tiện công cộng",
    ""
   ],
   [
    "S.G,11a; S.G,11c",
    "Chỉ dẫn số lượng làn và hướng đi cho từng làn",
    ""
   ],
   [
    "S.G,12a; S.G,12b",
    "Chỉ dẫn làn đường không lưu thông",
    ""
   ],
   [
    "S.H,6",
    "Ngoại lệ",
    "Đối tượng vẽ trên biển phụ được miễn áp dụng biển cấm, hạn chế."
   ]
  ]
 }
];
module.exports = { CATALOG };
