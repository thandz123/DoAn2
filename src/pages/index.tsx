'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faUser, faShoppingCart, faBell } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; // nếu bạn đang sử dụng Next.js
type Ward = string;
type Districts = Record<string, Ward[]>;
type Cities = Record<string, Districts>;

// Example Data for Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã
const data: Cities = {
    
        "An Giang": {
            "Thành phố Long Xuyên": ["Phường Mỹ Bình","Phường Mỹ Xuyên","Phường Đông Xuyên","Phường Mỹ Phước","Phường Bình Khánh","Phường Bình Đức","Phường Vĩnh Nhuận","Xã Độc Lập","Xã Mỹ Phú","Xã Mỹ Hòa"],
            "Thành phố Châu Đốc": ["Phường Châu Phú A","Phường Châu Phú B","Phường Vĩnh Mỹ","Phường Núi Sam","Phường Vĩnh Nhuận","Xã Vĩnh Tế","Xã An Hòa","Xã Tân Lộc","Xã Châu Phú"],
            "Huyện An Phú": ["Thị trấn An Phú","Xã Khánh An","Xã Quốc Thái","Xã Phú Hữu","Xã Tân Thạnh","Xã Nhơn Hội"],
            "Huyện Châu Phú": ["Thị trấn Cái Dầu","Xã Bình Mỹ","Xã Đào Hữu Cảnh","Xã Ô Long Vĩ","Xã Khánh Hòa","Xã Vĩnh Thạnh Trung"],
            "Huyện Phú Tân": ["Thị trấn Phú Mỹ","Xã Phú Thạnh","Xã Phú Hữu","Xã Phú Long","Xã Tân Hòa","Xã Tân Trung"],
            "Huyện Thoại Sơn": ["Thị trấn Núi Sập","Xã Thoại Giang","Xã Thoại Sơn","Xã Vĩnh Trạch","Xã Vĩnh Thành","Xã Vĩnh Hòa"],
            "Huyện Tịnh Biên": ["Thị trấn Tịnh Biên","Xã An Phú","Xã Vĩnh Trung","Xã Vĩnh Tế","Xã Tân Lộc","Xã Tân Khánh"],
            "Huyện Chợ Mới": ["Thị trấn Chợ Mới","Xã Kiến An","Xã Kiến Tường","Xã Hòa Bình","Xã Hòa Hưng","Xã Mỹ Hòa"]
        },
        "Bà Rịa - Vũng Tàu": {
            "Thành phố Bà Rịa": ["Phường Phước Trung","Phường Phước Nguyên","Phường Long Tâm","Phường Kim Dinh","Phường Phước Hưng","Phường 11","Phường 12","Phường 13","Phường 14","Xã Tân Hưng","Xã Long Điền"],
            "Thành phố Vũng Tàu": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường Thắng Nhất","Phường Thắng Nhì","Phường Rạch Dừa","Phường 9","Phường 10"],
            "Huyện Châu Đức": ["Thị trấn Ngãi Giao","Xã Bàu Chinh","Xã Bình Giã","Xã Cù Bị","Xã Kim Long","Xã Nghĩa Thành","Xã Quảng Thành","Xã Suối Nghệ","Xã Xuân Sơn"],
            "Huyện Đất Đỏ": ["Thị trấn Đất Đỏ","Xã Long Tân","Xã Lộc An","Xã Phước Hải","Xã Sơn Hải","Xã Tam Đảo","Xã Vĩnh Hòa"],
            "Huyện Long Điền": ["Thị trấn Long Điền","Xã An Ngãi","Xã Bình Châu","Xã Long Hải","Xã Phước Tỉnh","Xã Tam Phước","Xã Tam Quan"],
            "Huyện Tân Thành": ["Thị trấn Phú Mỹ","Xã Châu Pha","Xã Hòa Long","Xã Tân Hải","Xã Tóc Tiên","Xã Mỹ Xuân","Xã Phước Hòa"]
        },
    
        "Thành phố Hồ Chí Minh": {
            "Quận 1": ["Phường Bến Nghé","Phường Bến Thành","Phường Cô Giang","Phường Nguyễn Cư Trinh","Phường Phạm Ngũ Lão","Phường Đa Kao","Phường Nguyễn Thái Bình","Phường Tân Định"],
            "Quận 2": ["Phường An Khánh","Phường An Lợi Đông","Phường Bình An","Phường Bình Khánh","Phường Cát Lái","Phường Thạnh Mỹ Lợi","Phường Thủ Thiêm","Phường Bình Trưng Đông","Phường Bình Trưng Tây"],
            "Quận 3": ["Phường Võ Thị Sáu","Phường Bến Thành","Phường Cô Giang","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12"],
            "Quận 4": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8"],
            "Quận 5": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10"],
            "Quận 6": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10"],
            "Quận 7": ["Phường Tân Kiểng","Phường Tân Hưng","Phường Tân Quy","Phường Bình Thuận","Phường Phú Mỹ","Phường Hưng Gia","Phường Hưng Phước","Phường Mỹ Khánh"],
            "Quận 8": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11"],
            "Quận 9": ["Phường Hiệp Phú","Phường Long Bình","Phường Long Thạnh Mỹ","Phường Phú Hữu","Phường Tân Phú","Phường Tân Hội","Phường Trường Thạnh","Phường Phú Hữu"],
            "Quận 10": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10"],
            "Quận 11": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10"],
            "Quận 12": ["Phường Hiệp Thành","Phường Thạnh Lộc","Phường Thới An","Phường Tân Thới Nhất","Phường Tân Chánh Hiệp","Phường Tân Hưng Thuận","Phường An Phú Đông"],
            "Huyện Bình Chánh": ["Thị trấn Tân Túc","Xã Bình Chánh","Xã Bình Hưng","Xã Bình Qưới Tây","Xã Đôi Giàu","Xã Vĩnh Lộc A","Xã Vĩnh Lộc B","Xã Lê Minh Nhựt"],
            "Huyện Nhà Bè": ["Thị trấn Nhà Bè","Xã Phước Kiển","Xã Nhơn Đức","Xã Long Thới","Xã Hiệp Phước"],
            "Huyện Cần Giờ": ["Thị trấn Cần Thạnh","Xã Bình Khánh","Xã An Thới Đông","Xã Tam Thôn Hiệp","Xã Long Hoà"]
            },
        
        "Hà Nội":{
            "Quận Ba Đình":["Phường Phúc Xá", "Phường Trúc Bạch", "Phường Vĩnh Phúc", "Phường Cống Vị", "Phường Liễu Giai", "Phường Nguyễn Trung Trực", "Phường Quán Thánh", "Phường Ngọc Hà", "Phường Điện Biên", "Phường Đội Cấn", "Phường Ngọc Khánh", "Phường Kim Mã", "Phường Giảng Võ", "Phường Thành Công"],
            "Quận Hoàn Kiếm": ["Phường Phúc Tân", "Phường Đồng Xuân", "Phường Hàng Mã", "Phường Hàng Buồm","Phường Hàng Đào", "Phường Hàng Bồ", "Phường Cửa Đông", "Phường Lý Thái Tổ","Phường Hàng Bạc","Phường Hàng Gai", "Phường Chương Dương", "Phường Hàng Trống", "Phường Cửa Nam", "Phường Hàng Bông", "Phường Tràng Tiền", "Phường Trần Hưng Đạo", "Phường Phan Chu Trinh", "Phường Hàng Bài"],
            "Quận Tây Hồ": ["Phường Phú Thượng", "Phường Nhật Tân", "Phường Tứ Liên", "Phường Quảng An", "Phường Xuân La", "Phường Yên Phụ", "Phường Bưởi", "Phường Thụy Khuê"],
            "Quận Long Biên":["Phường Thượng Thanh", "Phường Ngọc Thụy", "Phường Giang Biên", "Phường Đức Giang", "Phường Việt Hưng", "Phường Gia Thụy", "Phường Ngọc Lâm", "Phường Phúc Lợi", "Phường Bồ Đề", "Phường Sài Đồng", "Phường Long Biên", "Phường Thạch Bàn", "Phường Phúc Đồng", "Phường Cự Khối"],
            "Quận Cầu Giấy":["Phường Nghĩa Đô", "Phường Nghĩa Tân", "Phường Mai Dịch", "Phường Dịch Vọng", "Phường Dịch Vọng Hậu", "Phường Quan Hoa", "Phường Yên Hoà", "Phường Trung Hoà"],
            "Quận Đống Đa":["Phường Cát Linh", "Phường Văn Miếu", "Phường Quốc Tử Giám", "Phường Láng Thượng", "Phường Ô Chợ Dừa", "Phường Văn Chương", "Phường Hàng Bột", "Phường Láng Hạ", "Phường Khâm Thiên", "Phường Thổ Quan", "Phường Nam Đồng", "Phường Trung Phụng", "Phường Quang Trung", "Phường Trung Liệt", "Phường Phương Liên", "Phường Thịnh Quang", "Phường Trung Tự", "Phường Kim Liên", "Phường Phương Mai", "Phường Ngã Tư Sở","Phường Khương Thượng"],
            "Quận Hai Bà Trưng":["Phường Nguyễn Du", "Phường Bạch Đằng", "Phường Phạm Đình Hổ", "Phường Lê Đại Hành", "Phường Đồng Nhân", "Phường Phố Huế", "Phường Đống Mác","Phường Thanh Lương","Phường Thanh Nhàn","Phường Cầu Dền","Phường Bách Khoa","Phường Đồng Tâm","Phường Vĩnh Tuy","Phường Bạch Mai","Phường Quỳnh Mai","Phường Quỳnh Lôi","Phường Minh Khai","Phường Trương Định"],
            "Quận Hoàng Mai":["Phường Thanh Trì","Phường Vĩnh Hưng","Phường Định Công","Phường Mai Động","Phường Tương Mai","Phường Đại Kim","Phường Tân Mai","Phường Hoàng Văn Thụ","Phường Giáp Bát","Phường Lĩnh Nam","Phường Thịnh Liệt","Phường Trần Phú","Phường Hoàng Liệt","Phường Yên Sở"],
            "Quận Thanh Xuân":["Phường Nhân Chính","Phường Thượng Đình","Phường Khương Trung","Phường Khương Mai","Phường Thanh Xuân Trung","Phường Phương Liệt","Phường Hạ Đình","Phường Khương Đình","Phường Thanh Xuân Bắc","Phường Thanh Xuân Nam","Phường Kim Giang"],
            "Huyện Sóc Sơn":["Thị trấn Sóc Sơn","Xã Bắc Sơn","Xã Minh Trí","Xã Hồng Kỳ","Xã Nam Sơn","Xã Trung Giã","Xã Tân Hưng","Xã Minh Phú","Xã Phù Linh","Xã Bắc Phú","Xã Tân Minh","Xã Quang Tiến","Xã Hiền Ninh","Xã Tân Dân","Xã Tiên Dược","Xã Việt Long","Xã Xuân Giang","Xã Mai Đình","Xã Đức Hoà","Xã Thanh Xuân","Xã Đông Xuân","Xã Kim Lũ", "Xã Phú Cường","Xã Phú Minh","Xã Phù Lỗ","Xã Xuân Thu"],
            "Huyện Đông Anh":["Thị trấn Đông Anh","Xã Xuân Nộn","Xã Thuỵ Lâm","Xã Bắc Hồng","Xã Nguyên Khê","Xã Nam Hồng","Xã Tiên Dương","Xã Vân Hà","Xã Uy Nỗ","Xã Vân Nội","Xã Liên Hà","Xã Việt Hùng","Xã Kim Nỗ","Xã Kim Chung","Xã Dục Tú","Xã Đại Mạch","Xã Vĩnh Ngọc","Xã Cổ Loa","Xã Hải Bối","Xã Xuân Canh","Xã Võng La","Xã Tàm Xá","Xã Mai Lâm","Xã Đông Hội"],
            "Huyện Gia Lâm":["Thị trấn Yên Viên","Xã Yên Thường","Xã Yên Viên","Xã Ninh Hiệp","Xã Đình Xuyên","Xã Dương Hà","Xã Phù Đổng","Xã Trung Mầu","Xã Lệ Chi","Xã Cổ Bi","Xã Đặng Xá","Xã Phú Thị","Xã Kim Sơn","Thị trấn Trâu Quỳ","Xã Dương Quang","Xã Dương Xá","Xã Đông Dư","Xã Đa Tốn","Xã Kiêu Kỵ","Xã Bát Tràng","Xã Kim Lan","Xã Văn Đức"],
            "Quận Nam Từ Liêm":["Phường Cầu Diễn","Phường Xuân Phương","Phường Phương Canh","Phường Mỹ Đình 1","Phường Mỹ Đình 2","Phường Tây Mỗ","Phường Mễ Trì","Phường Phú Đô","Phường Đại Mỗ","Phường Trung Văn"],
            "Huyện Thanh Trì":["Thị trấn Văn Điển","Xã Tân Triều","Xã Thanh Liệt","Xã Tả Thanh Oai","Xã Hữu Hoà","Xã Tam Hiệp","Xã Tứ Hiệp","Xã Yên Mỹ","Xã Vĩnh Quỳnh","Xã Ngũ Hiệp","Xã Duyên Hà","Xã Ngọc Hồi","Xã Vạn Phúc","Xã Đại áng","Xã Liên Ninh","Xã Đông Mỹ"],
            "Quận Bắc Từ Liêm": ["Phường Thượng Cát","Phường Liên Mạc","Phường Đông Ngạc","Phường Đức Thắng","Phường Thụy Phương","Phường Tây Tựu","Phường Xuân Đỉnh","Phường Xuân Tảo","Phường Minh Khai","Phường Cổ Nhuế 1","Phường Cổ Nhuế 2","Phường Phú Diễn","Phường Phúc Diễn"],
            "Huyện Mê Linh":["Thị trấn Chi Đông","Xã Đại Thịnh","Xã Kim Hoa","Xã Thạch Đà","Xã Tiến Thắng","Xã Tự Lập","Thị trấn Quang Minh","Xã Thanh Lâm","Xã Tam Đồng","Xã Liên Mạc","Xã Vạn Yên","Xã Chu Phan","Xã Tiến Thịnh","Xã Mê Linh","Xã Văn Khê","Xã Hoàng Kim","Xã Tiền Phong","Xã Tráng Việt"],
            "Quận Hà Đông":["Phường Mộ Lao",
"Phường Văn Quán",
"Phường Vạn Phúc",
"Phường Yết Kiêu",
"Phường Quang Trung",
"Phường La Khê",
"Phường Phú La",
"Phường Phúc La",
"Phường Hà Cầu",
"Phường Yên Nghĩa",
"Phường Kiến Hưng",
"Phường Phú Lãm",
"Phường Phú Lương",
"Phường Dương Nội",
"Phường Đồng Mai",
"Phường Biên Giang"
],
"Thị xã Sơn Tây":["Phường Lê Lợi",
    "Phường Phú Thịnh",
    "Phường Ngô Quyền",
    "Phường Quang Trung",
    "Phường Sơn Lộc",
    "Phường Xuân Khanh",
    "Xã Đường Lâm",
    "Phường Viên Sơn",
    "Xã Xuân Sơn",
    "Phường Trung Hưng",
    "Xã Thanh Mỹ",
    "Phường Trung Sơn Trầm",
    "Xã Kim Sơn",
    "Xã Sơn Đông",
    "Xã Cổ Đông"
    ],
    "Huyện Ba Vì":["Thị trấn Tây Đằng",
        "Xã Phú Cường",
        "Xã Cổ Đô",
       " Xã Tản Hồng",
       " Xã Vạn Thắng",
        "Xã Châu Sơn",
        "Xã Phong Vân",
        "Xã Phú Đông",
        "Xã Phú Phương",
        "Xã Phú Châu",
        "Xã Thái Hòa",
        "Xã Đồng Thái",
        "Xã Phú Sơn",
        "Xã Minh Châu",
        "Xã Vật Lại",
        "Xã Chu Minh",
        "Xã Tòng Bạt",
        "Xã Cẩm Lĩnh",
        "Xã Sơn Đà",
        "Xã Đông Qua",
        "Xã Tiên Phong",
        "Xã Thụy An",
        "Xã Cam Thượng",
        "Xã Thuần Mỹ",
        "Xã Tản Lĩnh",
        "Xã Ba Trại",
        "Xã Minh Quang",
        "Xã Ba Vì",
        "Xã Vân Hòa",
        "Xã Yên Bài",
        "Xã Khánh Thượng"
        ],
        "Huyện Phúc Thọ":["Thị trấn Phúc Thọ",
            "Xã Vân Hà",
            "Xã Vân Phúc",
            "Xã Vân Nam",
            "Xã Xuân Đình",
            "Xã Sen Phương",
            "Xã Võng Xuyên",
            "Xã Thọ Lộc",
            "Xã Long Xuyên",
            "Xã Thượng Cốc",
            "Xã Hát Môn",
            "Xã Tích Gian",
            "Xã Thanh Đa",
            "Xã Trạch Mỹ Lộc",
            "Xã Phúc Hòa",
            "Xã Ngọc Tảo",
            "Xã Phụng Thượng",
            "Xã Tam Thuấn",
            "Xã Tam Hiệp",
            "Xã Hiệp Thuận",
            "Xã Liên Hiệp"
            ],
            "Huyện Đan Phượng":["Thị trấn Phùng",
                "Xã Trung Châu",
                "Xã Thọ An",
                "Xã Thọ Xuân",
                "Xã Hồng Hà",
                "Xã Liên Hồng",
                "Xã Liên Hà",
                "Xã Hạ Mỗ",
                "Xã Liên Trung",
                "Xã Phương Đình",
                "Xã Thượng Mỗ",
                "Xã Tân Hội",
                "Xã Tân Lập",
                "Xã Đan Phượng",
                "Xã Đồng Tháp",
                "Xã Song Phượng"
                ],
                "Huyện Hoài Đức":["Thị trấn Trạm Trôi",
                    "Xã Đức Thượng",
                    "Xã Minh Khai",
                    "Xã Dương Liễu",
                    "Xã Di Trạch",
                    "Xã Đức Giang",
                    "Xã Cát Quế",
                    "Xã Kim Chung",
                    "Xã Yên Sở",
                    "Xã Sơn Đồng",
                    "Xã Vân Canh",
                    "Xã Đắc Sở",
                    "Xã Lại Yên",
                    "Xã Tiền Yên",
                    "Xã Song Phương",
                    "Xã An Khánh",
                    "Xã An Thượng",
                    "Xã Vân Côn",
                    "Xã La Phù",
                    "Xã Đông La"
                    ],
                    "Huyện Quốc Oai":["Xã Đông Xuân",
                        "Thị trấn Quốc Oai",
                        "Xã Sài Sơn",
                        "Xã Phượng Cách",
                        "Xã Yên Sơn",
                        "Xã Ngọc Liệp",
                        "Xã Ngọc Mỹ",
                        "Xã Liệp Tuyết",
                        "Xã Thạch Thán",
                        "Xã Đồng Quang",
                        "Xã Phú Cát",
                        "Xã Tuyết Nghĩa",
                        "Xã Nghĩa Hương",
                        "Xã Cộng Hòa",
                        "Xã Tân Phú",
                        "Xã Đại Thành",
                        "Xã Phú Mãn",
                        "Xã Cấn Hữu",
                        "Xã Tân Hòa",
                        "Xã Hòa Thạch",
                        "Xã Đông Yên"
                        ],
                        "Huyện Thạch Thất":["Xã Yên Trung",
                            "Xã Yên Bình",
                            "Xã Tiến Xuân",
                            "Thị trấn Liên Quan",
                            "Xã Đại Đồng",
                            "Xã Cẩm Yên",
                            "Xã Lại Thượng",
                            "Xã Phú Kim",
                            "Xã Hương Ngải",
                            "Xã Canh Nậu",
                            "Xã Kim Quan",
                            "Xã Dị Nậu",
                            "Xã Bình Yên",
                            "Xã Chàng Sơn",
                            "Xã Thạch Hoà",
                            "Xã Cần Kiệm",
                            "Xã Hữu Bằng",
                            "Xã Phùng Xá",
                            "Xã Tân Xã",
                            "Xã Thạch Xá",
                            "Xã Bình Phú",
                            "Xã Hạ Bằng",
                            "Xã Đồng Trúc"
                            ],
        "Huyện Chương Mỹ": ["Thị trấn Chúc Sơn",
            "Thị trấn Xuân Mai",
            "Xã Phụng Châu",
            "Xã Tiên Phương",
            "Xã Đông Sơn",
            "Xã Đông Phương Yên",
            "Xã Phú Nghĩa",
            "Xã Trường Yên",
            "Xã Ngọc Hòa",
            "Xã Thủy Xuân Tiên",
            "Xã Thanh Bình",
            "Xã Trung Hòa",
            "Xã Đại Yên",
            "Xã Thụy Hương",
            "Xã Tốt Động",
            "Xã Lam Điền",
            "Xã Tân Tiến",
            "Xã Nam Phương Tiến",
            "Xã Hợp Đồng",
            "Xã Hoàng Văn Thụ",
            "Xã Hoàng Diệu",
            "Xã Hữu Văn",
            "Xã Quảng Bị",
            "Xã Mỹ Lương",
            "Xã Thượng Vực",
            "Xã Hồng Phong",
            "Xã Đồng Phú",
            "Xã Trần Phú",
            "Xã Văn Võ",
            "Xã Đồng Lạc",
            "Xã Hòa Chính",
            "Xã Phú Nam An"
            ],
            
                "Huyện Thanh Oai": [
                    "Thị trấn Kim Bài", 
                    "Xã Cự Khê", 
                    "Xã Bích Hòa", 
                    "Xã Mỹ Hưng", 
                    "Xã Cao Viên", 
                    "Xã Bình Minh", 
                    "Xã Tam Hưng", 
                    "Xã Thanh Cao", 
                    "Xã Thanh Thùy", 
                    "Xã Thanh Mai", 
                    "Xã Thanh Văn", 
                    "Xã Đỗ Động", 
                    "Xã Kim An", 
                    "Xã Kim Thư", 
                    "Xã Phương Trung", 
                    "Xã Tân Ước", 
                    "Xã Dân Hòa", 
                    "Xã Liên Châu", 
                    "Xã Cao Dương", 
                    "Xã Xuân Dương", 
                    "Xã Hồng Dương"
                ],
                "Huyện Thường Tín": [
                    "Thị trấn Thường Tín", 
                    "Xã Ninh Sở", 
                    "Xã Nhị Khê", 
                    "Xã Duyên Thái", 
                    "Xã Khánh Hà", 
                    "Xã Hòa Bình", 
                    "Xã Văn Bình", 
                    "Xã Hiền Giang", 
                    "Xã Hồng Vân", 
                    "Xã Vân Tảo", 
                    "Xã Liên Phương", 
                    "Xã Văn Phú", 
                    "Xã Tự Nhiên", 
                    "Xã Tiền Phong", 
                    "Xã Hà Hồi", 
                    "Xã Thư Phú", 
                    "Xã Nguyễn Trãi", 
                    "Xã Quất Động", 
                    "Xã Chương Dương", 
                    "Xã Tân Minh", 
                    "Xã Lê Lợi", 
                    "Xã Thắng Lợi", 
                    "Xã Dũng Tiến", 
                    "Xã Thống Nhất", 
                    "Xã Nghiêm Xuyên", 
                    "Xã Tô Hiệu", 
                    "Xã Văn Tự", 
                    "Xã Vạn Điểm", 
                    "Xã Minh Cường"
                ],
                "Huyện Phú Xuyên": [
                    "Thị trấn Phú Minh", 
                    "Thị trấn Phú Xuyên", 
                    "Xã Hồng Minh", 
                    "Xã Phượng Dực", 
                    "Xã Nam Tiến", 
                    "Xã Tri Trung", 
                    "Xã Đại Thắng", 
                    "Xã Phú Túc", 
                    "Xã Văn Hoàng", 
                    "Xã Hồng Thái", 
                    "Xã Hoàng Long", 
                    "Xã Quang Trung", 
                    "Xã Nam Phong", 
                    "Xã Nam Triều", 
                    "Xã Tân Dân", 
                    "Xã Sơn Hà", 
                    "Xã Chuyên Mỹ", 
                    "Xã Khai Thái", 
                    "Xã Phúc Tiến", 
                    "Xã Vân Từ", 
                    "Xã Tri Thủy", 
                    "Xã Đại Xuyên", 
                    "Xã Phú Yên", 
                    "Xã Bạch Hạ", 
                    "Xã Quang Lãng", 
                    "Xã Châu Can", 
                    "Xã Minh Tân"
                ],
                "Huyện Ứng Hòa": [
                    "Thị trấn Vân Đình", 
                    "Xã Viên An", 
                    "Xã Viên Nội", 
                    "Xã Hoa Sơn", 
                    "Xã Quảng Phú Cầu", 
                    "Xã Trường Thịnh", 
                    "Xã Cao Thành", 
                    "Xã Liên Bạt", 
                    "Xã Sơn Công", 
                    "Xã Đồng Tiến", 
                    "Xã Phương Tú", 
                    "Xã Trung Tú", 
                    "Xã Đồng Tân", 
                    "Xã Tảo Dương Văn", 
                    "Xã Vạn Thái", 
                    "Xã Minh Đức", 
                    "Xã Hòa Lâm", 
                    "Xã Hòa Xá", 
                    "Xã Trầm Lộng", 
                    "Xã Kim Đường", 
                    "Xã Hòa Nam", 
                    "Xã Hòa Phú", 
                    "Xã Đội Bình", 
                    "Xã Đại Hùng", 
                    "Xã Đông Lỗ", 
                    "Xã Phù Lưu", 
                    "Xã Đại Cường", 
                    "Xã Lưu Hoàng", 
                    "Xã Hồng Quang"
                ],
                "Huyện Mỹ Đức": [
                    "Thị trấn Đại Nghĩa", 
                    "Xã Đồng Tâm", 
                    "Xã Thượng Lâm", 
                    "Xã Tuy Lai", 
                    "Xã Phúc Lâm", 
                    "Xã Mỹ Thành", 
                    "Xã Bột Xuyên", 
                    "Xã An Mỹ", 
                    "Xã Hồng Sơn", 
                    "Xã Lê Thanh", 
                    "Xã Xuy Xá", 
                    "Xã Phùng Xá", 
                    "Xã Phù Lưu Tế", 
                    "Xã Đại Hưng", 
                    "Xã Vạn Kim", 
                    "Xã Đốc Tín", 
                    "Xã Hương Sơn", 
                    "Xã Hùng Tiến", 
                    "Xã An Tiến", 
                    "Xã Hợp Tiến", 
                    "Xã Hợp Thanh", 
                    "Xã An Phú"
                ]
    },
    
        "Hà Giang": {
            "Thành phố Hà Giang": [
                "Phường Quang Trung", 
                "Phường Trần Phú", 
                "Phường Ngọc Hà", 
                "Phường Nguyễn Trãi", 
                "Phường Minh Khai", 
                "Xã Ngọc Đường", 
                "Xã Phương Độ", 
                "Xã Phương Thiện"
            ],
            "Huyện Đồng Văn": [
                "Thị trấn Phó Bảng", 
                "Xã Lũng Cú", 
                "Xã Má Lé", 
                "Thị trấn Đồng Văn", 
                "Xã Lũng Táo", 
                "Xã Phố Là", 
                "Xã Thài Phìn Tủng", 
                "Xã Sủng Là", 
                "Xã Xà Phìn", 
                "Xã Tả Phìn", 
                "Xã Tả Lủng", 
                "Xã Phố Cáo", 
                "Xã Sính Lủng", 
                "Xã Sảng Tủng", 
                "Xã Lũng Thầu", 
                "Xã Hố Quáng Phìn", 
                "Xã Vần Chải", 
                "Xã Lũng Phìn", 
                "Xã Sủng Trái"
            ],
            "Huyện Mèo Vạc": [
                "Thị trấn Mèo Vạc", 
                "Xã Thượng Phùng", 
                "Xã Pải Lủng", 
                "Xã Xín Cái", 
                "Xã Pả Vi", 
                "Xã Giàng Chu Phìn", 
                "Xã Sủng Trà", 
                "Xã Sủng Máng", 
                "Xã Sơn Vĩ", 
                "Xã Tả Lủng", 
                "Xã Cán Chu Phìn", 
                "Xã Lũng Pù", 
                "Xã Lũng Chinh", 
                "Xã Tát Ngà", 
                "Xã Nậm Ban", 
                "Xã Khâu Vai", 
                "Xã Niêm Tòng", 
                "Xã Niêm Sơn"
            ],
            "Huyện Yên Minh": [
                "Thị trấn Yên Minh", 
                "Xã Thắng Mố", 
                "Xã Phú Lũng", 
                "Xã Sủng Tráng", 
                "Xã Bạch Đích", 
                "Xã Na Khê", 
                "Xã Sủng Thài", 
                "Xã Hữu Vinh", 
                "Xã Lao Và Chải", 
                "Xã Mậu Duệ", 
                "Xã Đông Minh", 
                "Xã Mậu Long", 
                "Xã Ngam La", 
                "Xã Ngọc Long", 
                "Xã Đường Thượng", 
                "Xã Lũng Hồ", 
                "Xã Du Tiến", 
                "Xã Du Già"
            ],
            "Huyện Quản Bạ": [
                "Thị trấn Tam Sơn", 
                "Xã Bát Đại Sơn", 
                "Xã Nghĩa Thuận", 
                "Xã Cán Tỷ", 
                "Xã Cao Mã Pờ", 
                "Xã Thanh Vân", 
                "Xã Tùng Vài", 
                "Xã Đông Hà", 
                "Xã Quản Bạ", 
                "Xã Lùng Tám", 
                "Xã Quyết Tiến", 
                "Xã Tả Ván", 
                "Xã Thái An"
            ],
            "Huyện Vị Xuyên": [
                "Xã Kim Thạch", 
                "Xã Phú Linh", 
                "Xã Kim Linh", 
                "Thị trấn Vị Xuyên", 
                "Thị trấn Nông Trường Việt Lâm", 
                "Xã Minh Tân", 
                "Xã Thuận Hoà", 
                "Xã Tùng Bá", 
                "Xã Thanh Thủy", 
                "Xã Thanh Đức", 
                "Xã Phong Quang", 
                "Xã Xín Chải", 
                "Xã Phương Tiến", 
                "Xã Lao Chải", 
                "Xã Cao Bồ", 
                "Xã Đạo Đức", 
                "Xã Thượng Sơn", 
                "Xã Linh Hồ", 
                "Xã Quảng Ngần", 
                "Xã Việt Lâm", 
                "Xã Ngọc Linh", 
                "Xã Ngọc Minh", 
                "Xã Bạch Ngọc", 
                "Xã Trung Thành"
            ],
            "Huyện Bắc Mê": [
                "Xã Minh Sơn", 
                "Xã Giáp Trung", 
                "Xã Yên Định", 
                "Thị trấn Yên Phú", 
                "Xã Minh Ngọc", 
                "Xã Yên Phong", 
                "Xã Lạc Nông", 
                "Xã Phú Nam", 
                "Xã Yên Cường", 
                "Xã Thượng Tân", 
                "Xã Đường Âm", 
                "Xã Đường Hồng", 
                "Xã Phiêng Luông"
            ],
            "Huyện Hoàng Su Phì": [
                "Thị trấn Vinh Quang", 
                "Xã Bản Máy", 
                "Xã Thàng Tín", 
                "Xã Thèn Chu Phìn", 
                "Xã Pố Lồ", 
                "Xã Bản Phùng", 
                "Xã Túng Sán", 
                "Xã Chiến Phố", 
                "Xã Đản Ván", 
                "Xã Tụ Nhân", 
                "Xã Tân Tiến", 
                "Xã Nàng Đôn", 
                "Xã Pờ Ly Ngài", 
                "Xã Sán Xả Hồ", 
                "Xã Bản Luốc", 
                "Xã Ngàm Đăng Vài", 
                "Xã Bản Nhùng", 
                "Xã Tả Sử Choóng", 
                "Xã Nậm Dịch", 
                "Xã Hồ Thầu", 
                "Xã Nam Sơn", 
                "Xã Nậm Tỵ", 
                "Xã Thông Nguyên", 
                "Xã Nậm Khòa"
            ],
            "Huyện Xín Mần": [
                "Thị trấn Cốc Pài", 
                "Xã Nàn Xỉn", 
                "Xã Bản Díu", 
                "Xã Chí Cà", 
                "Xã Xín Mần", 
                "Xã Thèn Phàng", 
                "Xã Trung Thịnh", 
                "Xã Pà Vầy Sủ", 
                "Xã Cốc Rế", 
                "Xã Thu Tà", 
                "Xã Nàn Ma", 
                "Xã Tả Nhìu", 
                "Xã Bản Ngò", 
                "Xã Chế Là", 
                "Xã Nấm Dẩn", 
                "Xã Quảng Nguyên", 
                "Xã Nà Chì", 
                "Xã Khuôn Lùng"
            ],
        "Huyện Bắc Quang": [
        "Thị trấn Việt Quang", 
        "Thị trấn Vĩnh Tuy", 
        "Xã Tân Lập", 
        "Xã Tân Thành", 
        "Xã Đồng Tiến", 
        "Xã Đồng Tâm", 
        "Xã Tân Quang", 
        "Xã Thượng Bình", 
        "Xã Hữu Sản", 
        "Xã Kim Ngọc", 
        "Xã Việt Vinh", 
        "Xã Bằng Hành", 
        "Xã Quang Minh", 
        "Xã Liên Hiệp", 
        "Xã Vô Điếm", 
        "Xã Việt Hồng", 
        "Xã Hùng An", 
        "Xã Đức Xuân", 
        "Xã Tiên Kiều", 
        "Xã Vĩnh Hảo", 
        "Xã Vĩnh Phúc", 
        "Xã Đồng Yên", 
        "Xã Đông Thành"
    ],
    "Huyện Quang Bình": [
        "Xã Xuân Minh", 
        "Xã Tiên Nguyên", 
        "Xã Tân Nam", 
        "Xã Bản Rịa", 
        "Xã Yên Thành", 
        "Thị trấn Yên Bình", 
        "Xã Tân Trịnh", 
        "Xã Tân Bắc", 
        "Xã Bằng Lang", 
        "Xã Yên Hà", 
        "Xã Hương Sơn", 
        "Xã Xuân Giang", 
        "Xã Nà Khương", 
        "Xã Tiên Yên", 
        "Xã Vĩ Thượng"
    ]
},
        "Cao Bằng": {
            "Thành phố Cao Bằng": [
                "Phường Sông Hiến", 
                "Phường Sông Bằng", 
                "Phường Hợp Giang", 
                "Phường Tân Giang", 
                "Phường Ngọc Xuân", 
                "Phường Đề Thám", 
                "Phường Hoà Chung", 
                "Phường Duyệt Trung", 
                "Xã Vĩnh Quang", 
                "Xã Hưng Đạo", 
                "Xã Chu Trinh"
            ],
            "Huyện Bảo Lâm": [
                "Thị trấn Pác Miầu", 
                "Xã Đức Hạnh", 
                "Xã Lý Bôn", 
                "Xã Nam Cao", 
                "Xã Nam Quang", 
                "Xã Vĩnh Quang", 
                "Xã Quảng Lâm", 
                "Xã Thạch Lâm", 
                "Xã Vĩnh Phong", 
                "Xã Mông Ân", 
                "Xã Thái Học", 
                "Xã Thái Sơn", 
                "Xã Yên Thổ"
            ],
            "Huyện Bảo Lạc": [
                "Thị trấn Bảo Lạc", 
                "Xã Cốc Pàng", 
                "Xã Thượng Hà", 
                "Xã Cô Ba", 
                "Xã Bảo Toàn", 
                "Xã Khánh Xuân", 
                "Xã Xuân Trường", 
                "Xã Hồng Trị", 
                "Xã Kim Cúc", 
                "Xã Phan Thanh", 
                "Xã Hồng An", 
                "Xã Hưng Đạo", 
                "Xã Hưng Thịnh", 
                "Xã Huy Giáp", 
                "Xã Đình Phùng", 
                "Xã Sơn Lập", 
                "Xã Sơn Lộ"
            ],
            "Huyện Hà Quảng": [
                "Thị trấn Thông Nông", 
                "Xã Cần Yên", 
                "Xã Cần Nông", 
                "Xã Lương Thông", 
                "Xã Đa Thông", 
                "Xã Ngọc Động", 
                "Xã Yên Sơn", 
                "Xã Lương Can", 
                "Xã Thanh Long", 
                "Thị trấn Xuân Hòa", 
                "Xã Lũng Nặm", 
                "Xã Trường Hà", 
                "Xã Cải Viên", 
                "Xã Nội Thôn", 
                "Xã Tổng Cọt", 
                "Xã Sóc Hà", 
                "Xã Thượng Thôn", 
                "Xã Hồng Sỹ", 
                "Xã Quý Quân", 
                "Xã Mã Ba", 
                "Xã Ngọc Đào"
            ],
            "Huyện Trùng Khánh": [
                "Thị trấn Trà Lĩnh", 
                "Xã Tri Phương", 
                "Xã Quang Hán", 
                "Xã Xuân Nội", 
                "Xã Quang Trung", 
                "Xã Quang Vinh", 
                "Xã Cao Chương", 
                "Thị trấn Trùng Khánh", 
                "Xã Ngọc Khê", 
                "Xã Ngọc Côn", 
                "Xã Phong Nậm", 
                "Xã Đình Phong", 
                "Xã Đàm Thuỷ", 
                "Xã Khâm Thành", 
                "Xã Chí Viễn", 
                "Xã Lăng Hiếu", 
                "Xã Phong Châu", 
                "Xã Trung Phúc", 
                "Xã Cao Thăng", 
                "Xã Đức Hồng", 
                "Xã Đoài Dương"
            ],
            "Huyện Hạ Lang": [
                "Xã Minh Long", 
                "Xã Lý Quốc", 
                "Xã Thắng Lợi", 
                "Xã Đồng Loan", 
                "Xã Đức Quang", 
                "Xã Kim Loan", 
                "Xã Quang Long", 
                "Xã An Lạc", 
                "Thị trấn Thanh Nhật", 
                "Xã Vinh Quý", 
                "Xã Thống Nhất", 
                "Xã Cô Ngân", 
                "Xã Thị Hoa"
            ],
            "Huyện Quảng Hòa": [
                "Xã Quốc Toản", 
                "Thị trấn Quảng Uyên", 
                "Xã Phi Hải", 
                "Xã Quảng Hưng", 
                "Xã Độc Lập", 
                "Xã Cai Bộ", 
                "Xã Phúc Sen", 
                "Xã Chí Thảo", 
                "Xã Tự Do", 
                "Xã Hồng Quang", 
                "Xã Ngọc Động", 
                "Xã Hạnh Phúc", 
                "Thị trấn Tà Lùng", 
                "Xã Bế Văn Đàn", 
                "Xã Cách Linh", 
                "Xã Đại Sơn", 
                "Xã Tiên Thành", 
                "Thị trấn Hoà Thuận", 
                "Xã Mỹ Hưng"
            ],
            "Huyện Hoà An": [
                "Thị trấn Nước Hai", 
                "Xã Dân Chủ", 
                "Xã Nam Tuấn", 
                "Xã Đại Tiến", 
                "Xã Đức Long", 
                "Xã Ngũ Lão", 
                "Xã Trương Lương", 
                "Xã Hồng Việt", 
                "Xã Hoàng Tung", 
                "Xã Nguyễn Huệ", 
                "Xã Quang Trung", 
                "Xã Bạch Đằng", 
                "Xã Bình Dương", 
                "Xã Lê Chung", 
                "Xã Hồng Nam"
            ],
            "Huyện Nguyên Bình": [
                "Thị trấn Nguyên Bình", 
                "Thị trấn Tĩnh Túc", 
                "Xã Yên Lạc", 
                "Xã Triệu Nguyên", 
                "Xã Ca Thành", 
                "Xã Vũ Nông", 
                "Xã Minh Tâm", 
                "Xã Thể Dục", 
                "Xã Mai Long", 
                "Xã Vũ Minh", 
                "Xã Hoa Thám", 
                "Xã Phan Thanh", 
                "Xã Quang Thành", 
                "Xã Tam Kim", 
                "Xã Thành Công", 
                "Xã Thịnh Vượng", 
                "Xã Hưng Đạo"
            ],
            "Huyện Thạch An": [
                "Thị trấn Đông Khê", 
                "Xã Canh Tân", 
                "Xã Kim Đồng", 
                "Xã Minh Khai", 
                "Xã Đức Thông", 
                "Xã Thái Cường", 
                "Xã Vân Trình", 
                "Xã Thụy Hùng", 
                "Xã Quang Trọng", 
                "Xã Trọng Con", 
                "Xã Lê Lai", 
                "Xã Đức Long", 
                "Xã Lê Lợi", 
                "Xã Đức Xuân"
            ]
        },
        
            "Bắc Kạn": {
                "Thành Phố Bắc Kạn": [
                    "Phường Nguyễn Thị Minh Khai", 
                    "Phường Sông Cầu", 
                    "Phường Đức Xuân", 
                    "Phường Phùng Chí Kiên", 
                    "Phường Huyền Tụng", 
                    "Xã Dương Quang", 
                    "Xã Nông Thượng", 
                    "Phường Xuất Hóa"
                ],
                "Huyện Pác Nặm": [
                    "Xã Bằng Thành", 
                    "Xã Nhạn Môn", 
                    "Xã Bộc Bố", 
                    "Xã Công Bằng", 
                    "Xã Giáo Hiệu", 
                    "Xã Xuân La", 
                    "Xã An Thắng", 
                    "Xã Cổ Linh", 
                    "Xã Nghiên Loan", 
                    "Xã Cao Tân"
                ],
                "Huyện Ba Bể": [
                    "Thị trấn Chợ Rã", 
                    "Xã Bành Trạch", 
                    "Xã Phúc Lộc", 
                    "Xã Hà Hiệu", 
                    "Xã Cao Thượng", 
                    "Xã Khang Ninh", 
                    "Xã Nam Mẫu", 
                    "Xã Thượng Giáo", 
                    "Xã Địa Linh", 
                    "Xã Yến Dương", 
                    "Xã Chu Hương", 
                    "Xã Quảng Khê", 
                    "Xã Mỹ Phương", 
                    "Xã Hoàng Trĩ", 
                    "Xã Đồng Phúc"
                ],
                "Huyện Ngân Sơn": [
                    "Thị trấn Nà Phặc", 
                    "Xã Thượng Ân", 
                    "Xã Bằng Vân", 
                    "Xã Cốc Đán", 
                    "Xã Trung Hoà", 
                    "Xã Đức Vân", 
                    "Xã Vân Tùng", 
                    "Xã Thượng Quan", 
                    "Xã Hiệp Lực", 
                    "Xã Thuần Mang"
                ],
                "Huyện Bạch Thông": [
                    "Thị trấn Phủ Thông", 
                    "Xã Vi Hương", 
                    "Xã Sĩ Bình", 
                    "Xã Vũ Muộn", 
                    "Xã Đôn Phong", 
                    "Xã Lục Bình", 
                    "Xã Tân Tú", 
                    "Xã Nguyên Phúc", 
                    "Xã Cao Sơn", 
                    "Xã Quân Hà", 
                    "Xã Cẩm Giàng", 
                    "Xã Mỹ Thanh", 
                    "Xã Dương Phong", 
                    "Xã Quang Thuận"
                ],
                "Huyện Chợ Đồn": [
                    "Thị trấn Bằng Lũng", 
                    "Xã Xuân Lạc", 
                    "Xã Nam Cường", 
                    "Xã Đồng Lạc", 
                    "Xã Tân Lập", 
                    "Xã Bản Thi", 
                    "Xã Quảng Bạch", 
                    "Xã Bằng Phúc", 
                    "Xã Yên Thịnh", 
                    "Xã Yên Thượng", 
                    "Xã Phương Viên", 
                    "Xã Ngọc Phái", 
                    "Xã Đồng Thắng", 
                    "Xã Lương Bằng", 
                    "Xã Bằng Lãng", 
                    "Xã Đại Sảo", 
                    "Xã Nghĩa Tá", 
                    "Xã Yên Mỹ", 
                    "Xã Bình Trung", 
                    "Xã Yên Phong"
                ],
                "Huyện Chợ Mới": [
                    "Thị trấn Đồng Tâm", 
                    "Xã Tân Sơn", 
                    "Xã Thanh Vận", 
                    "Xã Mai Lạp", 
                    "Xã Hoà Mục", 
                    "Xã Thanh Mai", 
                    "Xã Cao Kỳ", 
                    "Xã Nông Hạ", 
                    "Xã Yên Cư", 
                    "Xã Thanh Thịnh", 
                    "Xã Yên Hân", 
                    "Xã Như Cố", 
                    "Xã Bình Văn", 
                    "Xã Quảng Chu"
                ],
                "Huyện Na Rì": [
                    "Xã Văn Vũ", 
                    "Xã Văn Lang", 
                    "Xã Lương Thượng", 
                    "Xã Kim Hỷ", 
                    "Xã Cường Lợi", 
                    "Thị trấn Yến Lạc", 
                    "Xã Kim Lư", 
                    "Xã Sơn Thành", 
                    "Xã Văn Minh", 
                    "Xã Côn Minh", 
                    "Xã Cư Lễ", 
                    "Xã Trần Phú", 
                    "Xã Quang Phong", 
                    "Xã Dương Sơn", 
                    "Xã Xuân Dương", 
                    "Xã Đổng Xá", 
                    "Xã Liêm Thuỷ"
                ]
            },
            
                "Tuyên Quang": {
                    "Thành phố Tuyên Quang": [
                        "Phường Phan Thiết", 
                        "Phường Minh Xuân", 
                        "Phường Tân Quang", 
                        "Xã Tràng Đà", 
                        "Phường Nông Tiến", 
                        "Phường Ỷ La", 
                        "Phường Tân Hà", 
                        "Phường Hưng Thành", 
                        "Xã Kim Phú", 
                        "Xã An Khang", 
                        "Phường Mỹ Lâm", 
                        "Phường An Tường", 
                        "Xã Lưỡng Vượng", 
                        "Xã Thái Long", 
                        "Phường Đội Cấn"
                    ],
                    "Huyện Lâm Bình": [
                        "Xã Phúc Yên", 
                        "Xã Xuân Lập", 
                        "Xã Khuôn Hà", 
                        "Xã Lăng Can", 
                        "Xã Thượng Lâm", 
                        "Xã Bình An", 
                        "Xã Hồng Quang", 
                        "Xã Thổ Bình"
                    ],
                    "Huyện Na Hang": [
                        "Thị trấn Na Hang", 
                        "Xã Sinh Long", 
                        "Xã Thượng Giáp", 
                        "Xã Thượng Nông", 
                        "Xã Côn Lôn", 
                        "Xã Yên Hoa", 
                        "Xã Hồng Thái", 
                        "Xã Đà Vị", 
                        "Xã Khau Tinh", 
                        "Xã Sơn Phú", 
                        "Xã Năng Khả", 
                        "Xã Thanh Tương"
                    ],
                    "Huyện Chiêm Hóa": [
                        "Thị trấn Vĩnh Lộc", 
                        "Xã Phúc Sơn", 
                        "Xã Minh Quang", 
                        "Xã Trung Hà", 
                        "Xã Tân Mỹ", 
                        "Xã Hà Lang", 
                        "Xã Hùng Mỹ", 
                        "Xã Yên Lập", 
                        "Xã Tân An", 
                        "Xã Bình Phú", 
                        "Xã Xuân Quang", 
                        "Xã Ngọc Hội", 
                        "Xã Phú Bình", 
                        "Xã Hòa Phú", 
                        "Xã Phúc Thịnh", 
                        "Xã Kiên Đài", 
                        "Xã Tân Thịnh", 
                        "Xã Trung Hòa", 
                        "Xã Kim Bình", 
                        "Xã Hòa An", 
                        "Xã Vinh Quang", 
                        "Xã Tri Phú", 
                        "Xã Nhân Lý", 
                        "Xã Yên Nguyên", 
                        "Xã Linh Phú", 
                        "Xã Bình Nhân"
                    ],
                    "Huyện Hàm Yên": [
                        "Thị trấn Tân Yên", 
                        "Xã Yên Thuận", 
                        "Xã Bạch Xa", 
                        "Xã Minh Khương", 
                        "Xã Yên Lâm", 
                        "Xã Minh Dân", 
                        "Xã Phù Lưu", 
                        "Xã Minh Hương", 
                        "Xã Yên Phú", 
                        "Xã Tân Thành", 
                        "Xã Bình Xa", 
                        "Xã Thái Sơn", 
                        "Xã Nhân Mục", 
                        "Xã Thành Long", 
                        "Xã Bằng Cốc", 
                        "Xã Thái Hòa", 
                        "Xã Đức Ninh", 
                        "Xã Hùng Đức"
                    ],
                    "Huyện Yên Sơn": [
                        "Xã Quí Quân", 
                        "Xã Lực Hành", 
                        "Xã Kiến Thiết", 
                        "Xã Trung Minh", 
                        "Xã Chiêu Yên", 
                        "Xã Trung Trực", 
                        "Xã Xuân Vân", 
                        "Xã Phúc Ninh", 
                        "Xã Hùng Lợi", 
                        "Xã Trung Sơn", 
                        "Xã Tân Tiến", 
                        "Xã Tứ Quận", 
                        "Xã Đạo Viện", 
                        "Xã Tân Long", 
                        "Xã Thắng Quân", 
                        "Xã Kim Quan", 
                        "Xã Lang Quán", 
                        "Xã Phú Thịnh", 
                        "Xã Công Đa", 
                        "Xã Trung Môn", 
                        "Xã Chân Sơn", 
                        "Xã Thái Bình", 
                        "Xã Tiến Bộ", 
                        "Xã Mỹ Bằng", 
                        "Xã Hoàng Khai", 
                        "Xã Nhữ Hán", 
                        "Xã Nhữ Khê", 
                        "Xã Đội Bình"
                    ],
                    "Huyện Sơn Dương": [
                        "Thị trấn Sơn Dương", 
                        "Xã Trung Yên", 
                        "Xã Minh Thanh", 
                        "Xã Tân Trào", 
                        "Xã Vĩnh Lợi", 
                        "Xã Thượng Ấm", 
                        "Xã Bình Yên", 
                        "Xã Lương Thiện", 
                        "Xã Tú Thịnh", 
                        "Xã Cấp Tiến", 
                        "Xã Hợp Thành", 
                        "Xã Phúc Ứng", 
                        "Xã Đông Thọ", 
                        "Xã Kháng Nhật", 
                        "Xã Hợp Hòa", 
                        "Xã Quyết Thắng", 
                        "Xã Đồng Quý", 
                        "Xã Tân Thanh", 
                        "Xã Vân Sơn", 
                        "Xã Văn Phú", 
                        "Xã Chi Thiết", 
                        "Xã Đông Lợi", 
                        "Xã Thiện Kế", 
                        "Xã Hồng Lạc", 
                        "Xã Phú Lương", 
                        "Xã Ninh Lai", 
                        "Xã Đại Phú", 
                        "Xã Sơn Nam", 
                        "Xã Hào Phú", 
                        "Xã Tam Đa", 
                        "Xã Trường Sinh"
                    ]
                },
                
                    "Lào Cai": {
                        "Thành phố Lào Cai": [
                            "Phường Duyên Hải", 
                            "Phường Lào Cai", 
                            "Phường Cốc Lếu", 
                            "Phường Kim Tân", 
                            "Phường Bắc Lệnh", 
                            "Phường Pom Hán", 
                            "Phường Xuân Tăng", 
                            "Phường Bình Minh", 
                            "Xã Thống Nhất", 
                            "Xã Đồng Tuyển", 
                            "Xã Vạn Hòa", 
                            "Xã Hợp Thành", 
                            "Xã Cốc San", 
                            "Xã Tả Phời", 
                            "Xã Cam Đường"
                        ],
                        "Huyện Bát Xát": [
                            "Thị trấn Bát Xát", 
                            "Xã A Lù", 
                            "Xã A Mú Sung", 
                            "Xã Bản Qua", 
                            "Xã Bản Vược", 
                            "Xã Bản Xèo", 
                            "Xã Cốc Mỳ", 
                            "Xã Cốc San", 
                            "Xã Dền Sáng", 
                            "Xã Dền Thàng", 
                            "Xã Mường Hum", 
                            "Xã Mường Vi", 
                            "Xã Nậm Chạc", 
                            "Xã Nậm Pung", 
                            "Xã Pa Cheo", 
                            "Xã Phìn Ngan", 
                            "Xã Quang Kim", 
                            "Xã Sàng Ma Sáo", 
                            "Xã Tòng Sành", 
                            "Xã Trịnh Tường", 
                            "Xã Trung Lèng Hồ", 
                            "Xã Y Tý"
                        ],
                        "Huyện Bắc Hà": [
                            "Thị trấn Bắc Hà", 
                            "Xã Bản Cái", 
                            "Xã Bản Phố", 
                            "Xã Bản Già", 
                            "Xã Bản Liền", 
                            "Xã Cốc Ly", 
                            "Xã Cốc Lầu", 
                            "Xã Hoàng Thu Phố", 
                            "Xã Lầu Thí Ngài", 
                            "Xã Lùng Cải", 
                            "Xã Lùng Phình", 
                            "Xã Na Hối", 
                            "Xã Nậm Đét", 
                            "Xã Nậm Khánh", 
                            "Xã Nậm Lúc", 
                            "Xã Nậm Mòn", 
                            "Xã Tả Củ Tỷ", 
                            "Xã Tả Van Chư", 
                            "Xã Thải Giàng Phố"
                        ],
                        "Huyện Bảo Thắng": [
                            "Thị trấn Phố Lu", 
                            "Thị trấn Tằng Loỏng", 
                            "Xã Bản Cầm", 
                            "Xã Bản Phiệt", 
                            "Xã Gia Phú", 
                            "Xã Phong Niên", 
                            "Xã Phú Nhuận", 
                            "Xã Sơn Hà", 
                            "Xã Sơn Hải", 
                            "Xã Thái Niên", 
                            "Xã Trì Quang", 
                            "Xã Xuân Giao"
                        ],
                        "Huyện Bảo Yên": [
                            "Thị trấn Phố Ràng", 
                            "Xã Bảo Hà", 
                            "Xã Cam Cọn", 
                            "Xã Điện Quan", 
                            "Xã Kim Sơn", 
                            "Xã Lương Sơn", 
                            "Xã Minh Tân", 
                            "Xã Nghĩa Đô", 
                            "Xã Phúc Khánh", 
                            "Xã Tân Dương", 
                            "Xã Tân Tiến", 
                            "Xã Thượng Hà", 
                            "Xã Việt Tiến", 
                            "Xã Vĩnh Yên", 
                            "Xã Xuân Hoà", 
                            "Xã Yên Sơn"
                        ],
                        "Huyện Mường Khương": [
                            "Thị trấn Mường Khương", 
                            "Xã Bản Lầu", 
                            "Xã Bản Sen", 
                            "Xã Cao Sơn", 
                            "Xã Dìn Chin", 
                            "Xã La Pan Tẩn", 
                            "Xã Lùng Khấu Nhin", 
                            "Xã Lùng Vai", 
                            "Xã Nậm Chảy", 
                            "Xã Pha Long", 
                            "Xã Tả Gia Khâu", 
                            "Xã Tả Ngài Chồ", 
                            "Xã Thanh Bình", 
                            "Xã Tung Chung Phố"
                        ],
                        "Huyện Si Ma Cai": [
                            "Thị trấn Si Ma Cai", 
                            "Xã Bản Mế", 
                            "Xã Cán Cấu", 
                            "Xã Lùng Sui", 
                            "Xã Nàn Sán", 
                            "Xã Nàn Xín", 
                            "Xã Quan Hồ Thẩn", 
                            "Xã Sán Chải", 
                            "Xã Thào Chư Phìn"
                        ],
                        "Huyện Văn Bàn": [
                            "Thị trấn Khánh Yên", 
                            "Xã Chiềng Ken", 
                            "Xã Dần Thàng", 
                            "Xã Dương Quỳ", 
                            "Xã Hòa Mạc", 
                            "Xã Khánh Yên Hạ", 
                            "Xã Khánh Yên Thượng", 
                            "Xã Khánh Yên Trung", 
                            "Xã Làng Giàng", 
                            "Xã Liêm Phú", 
                            "Xã Minh Lương", 
                            "Xã Nậm Chầy", 
                            "Xã Nậm Dạng", 
                            "Xã Nậm Mả", 
                            "Xã Nậm Rạng", 
                            "Xã Nậm Tha", 
                            "Xã Nậm Xé", 
                            "Xã Sơn Thuỷ", 
                            "Xã Tân An", 
                            "Xã Tân Thượng", 
                            "Xã Thẩm Dương", 
                            "Xã Thuỷ Vi", 
                            "Xã Văn Sơn"
                        ],
                        "Thị xã Sa Pa": [
                            "Phường Sa Pa", 
                            "Xã Bản Hồ", 
                            "Xã Bản Khoang", 
                            "Xã Hoàng Liên", 
                            "Xã Liên Minh", 
                            "Xã Mường Bo", 
                            "Xã Mường Hoa", 
                            "Xã Ngũ Chỉ Sơn", 
                            "Xã San Sả Hồ", 
                            "Xã Tả Giàng Phình", 
                            "Xã Tả Phìn", 
                            "Xã Thanh Bình"
                        ]
                    },
                    
                        "Điện Biên": {
                            "Thành phố Điện Biên Phủ": [
                                "Phường Mường Thanh", 
                                "Phường Tân Thanh", 
                                "Phường Him Lam", 
                                "Phường Nam Thanh", 
                                "Phường Noong Bua", 
                                "Xã Thanh Minh", 
                                "Xã Nà Tấu", 
                                "Xã Nà Nhạn", 
                                "Xã Mường Phăng", 
                                "Xã Pá Khoang"
                            ],
                            "Thị xã Mường Lay": [
                                "Phường Na Lay", 
                                "Xã Lay Nưa", 
                                "Xã Sín Thầu"
                            ],
                            "Huyện Điện Biên": [
                                "Xã Mường Lói", 
                                "Xã Mường Nhà", 
                                "Xã Na Tông", 
                                "Xã Na Ư", 
                                "Xã Núa Ngam", 
                                "Xã Pa Thơm", 
                                "Xã Phu Luông", 
                                "Xã Sam Mứn", 
                                "Xã Thanh Chăn", 
                                "Xã Thanh Hưng", 
                                "Xã Thanh Luông", 
                                "Xã Thanh Nưa", 
                                "Xã Thanh Xương", 
                                "Xã Noong Luống", 
                                "Xã Noong Hẹt", 
                                "Xã Mường Pồn", 
                                "Xã Hua Thanh"
                            ],
                            "Huyện Điện Biên Đông": [
                                "Thị trấn Điện Biên Đông", 
                                "Xã Chiềng Sơ", 
                                "Xã Háng Lìa", 
                                "Xã Keo Lôm", 
                                "Xã Luân Giới", 
                                "Xã Na Son", 
                                "Xã Phì Nhừ", 
                                "Xã Phình Giàng", 
                                "Xã Pú Hồng", 
                                "Xã Pú Nhi", 
                                "Xã Tìa Dình", 
                                "Xã Xa Dung"
                            ],
                            "Huyện Mường Ảng": [
                                "Thị trấn Mường Ảng", 
                                "Xã Ẳng Cang", 
                                "Xã Ẳng Nưa", 
                                "Xã Ẳng Tở", 
                                "Xã Búng Lao", 
                                "Xã Mường Đăng", 
                                "Xã Mường Lạn", 
                                "Xã Nặm Lịch", 
                                "Xã Ngối Cáy"
                            ],
                            "Huyện Mường Chà": [
                                "Thị trấn Mường Chà", 
                                "Xã Hừa Ngài", 
                                "Xã Huổi Lèng", 
                                "Xã Huổi Mí", 
                                "Xã Mường Mươn", 
                                "Xã Mường Tùng", 
                                "Xã Nậm He", 
                                "Xã Nậm Nèn", 
                                "Xã Pa Ham", 
                                "Xã Sá Tổng", 
                                "Xã Sa Lông"
                            ],
                            "Huyện Mường Nhé": [
                                "Xã Chung Chải", 
                                "Xã Huổi Lếnh", 
                                "Xã Leng Su Sìn", 
                                "Xã Mường Nhé", 
                                "Xã Nậm Kè", 
                                "Xã Nậm Vì", 
                                "Xã Pá Mỳ", 
                                "Xã Quảng Lâm", 
                                "Xã Sen Thượng"
                            ],
                            "Huyện Nậm Pồ": [
                                "Xã Chà Cang", 
                                "Xã Chà Nưa", 
                                "Xã Chà Tở", 
                                "Xã Na Cô Sa", 
                                "Xã Nà Bủng", 
                                "Xã Nà Hỳ", 
                                "Xã Nà Khoa", 
                                "Xã Nà Bố", 
                                "Xã Nậm Chua", 
                                "Xã Nậm Khăn", 
                                "Xã Nậm Nhừ", 
                                "Xã Nậm Tin", 
                                "Xã Si Pa Phìn"
                            ],
                            "Huyện Tủa Chùa": [
                                "Thị trấn Tủa Chùa", 
                                "Xã Huổi Só", 
                                "Xã Lao Xả Phình", 
                                "Xã Mường Báng", 
                                "Xã Mường Đun", 
                                "Xã Sính Phình", 
                                "Xã Tả Phìn", 
                                "Xã Tả Sìn Thàng", 
                                "Xã Trung Thu", 
                                "Xã Xá Nhè"
                            ],
                            "Huyện Tuần Giáo": [
                                "Thị trấn Tuần Giáo", 
                                "Xã Chiềng Đông", 
                                "Xã Chiềng Sinh", 
                                "Xã Mùn Chung", 
                                "Xã Mường Khong", 
                                "Xã Mường Mùn", 
                                "Xã Mường Thín", 
                                "Xã Nà Sáy", 
                                "Xã Nà Tòng", 
                                "Xã Phình Sáng", 
                                "Xã Pú Nhung", 
                                "Xã Quài Cang", 
                                "Xã Quài Nưa", 
                                "Xã Quài Tở", 
                                "Xã Rạng Đông", 
                                "Xã Tênh Phông"
                            ]
                        },
                        
                            "Lai Châu": {
                                "Thành phố Lai Châu": [
                                    "Phường Tân Phong",
                                    "Phường Quyết Thắng",
                                    "Phường Đoàn Kết",
                                    "Phường Đông Phong",
                                    "Xã San Thàng",
                                    "Xã Giang Ma",
                                    "Xã Nậm Loỏng",
                                    "Xã Nậm Nhùn"
                                ],
                                "Huyện Tam Đường": [
                                    "Thị trấn Tam Đường",
                                    "Xã Bình Lư",
                                    "Xã Bản Bo",
                                    "Xã Giang Ma",
                                    "Xã Hô Tả",
                                    "Xã Nà Tăm",
                                    "Xã Thèn Sin",
                                    "Xã Sơn Bình",
                                    "Xã Bản Giang",
                                    "Xã Bản Hon"
                                ],
                                "Huyện Mường Tè": [
                                    "Thị trấn Mường Tè",
                                    "Xã Bum Nưa",
                                    "Xã Bum Tở",
                                    "Xã Mường Tè",
                                    "Xã Nậm Khao",
                                    "Xã Nậm Hàng",
                                    "Xã Mường Cang"
                                ],
                                "Huyện Sìn Hồ": [
                                    "Thị trấn Sìn Hồ",
                                    "Xã Hồng Thái",
                                    "Xã Hồng Ngài",
                                    "Xã Làng Mô",
                                    "Xã Nà Nghịu",
                                    "Xã Nậm Tăm",
                                    "Xã Tân Phong",
                                    "Xã Tân Bằng",
                                    "Xã Pú Đao",
                                    "Xã Tả Phìn"
                                ],
                                "Huyện Phong Thổ": [
                                    "Thị trấn Phong Thổ",
                                    "Xã Bản Lang",
                                    "Xã Bản Giang",
                                    "Xã Lả Nhì Thàng",
                                    "Xã Lả Nhì Tân",
                                    "Xã Nậm Xe",
                                    "Xã Mồ Sì San"
                                ],
                                "Huyện Nậm Nhùn": [
                                    "Thị trấn Nậm Nhùn",
                                    "Xã Nậm Pì",
                                    "Xã Nậm Hàng",
                                    "Xã Nậm Chà",
                                    "Xã Nậm Loỏng",
                                    "Xã Mường Mít",
                                    "Xã Mường Tè"
                                ],
                                "Huyện Tân Uyên": [
                                    "Thị trấn Tân Uyên",
                                    "Xã Phúc Khoa",
                                    "Xã Thân Thuộc",
                                    "Xã Tà Mung",
                                    "Xã Uyên Hưng",
                                    "Xã Tà Gia",
                                    "Xã Nậm Sỏ"
                                ]
                            },
                            
                                "Sơn La": {
                                    "Thành phố Sơn La": [
                                        "Phường Chiềng Lề",
                                        "Phường Chiềng Cơi",
                                        "Phường Chiềng Đàn",
                                        "Phường Tô Hiệu",
                                        "Phường Quyết Tâm",
                                        "Xã Hát Lót",
                                        "Xã Chiềng Ngần",
                                        "Xã Chiềng Xôm",
                                        "Xã Hòa Bình",
                                        "Xã Mường La"
                                    ],
                                    "Huyện Mai Sơn": [
                                        "Thị trấn Hát Lót",
                                        "Xã Chiềng Chăn",
                                        "Xã Chiềng Mung",
                                        "Xã Nà Ớt",
                                        "Xã Tà Hộc",
                                        "Xã Mường Bon",
                                        "Xã Hát Lót",
                                        "Xã Nà Hỳ",
                                        "Xã Tà Hộc"
                                    ],
                                    "Huyện Mường La": [
                                        "Thị trấn Mường La",
                                        "Xã Chiềng Lao",
                                        "Xã Chiềng Khay",
                                        "Xã Mường La",
                                        "Xã Tạ Bú",
                                        "Xã Tô Hộc",
                                        "Xã Nậm Păm",
                                        "Xã Nậm Khóa"
                                    ],
                                    "Huyện Sông Mã": [
                                        "Thị trấn Sông Mã",
                                        "Xã Chiềng Khoang",
                                        "Xã Chiềng En",
                                        "Xã Nậm Mằn",
                                        "Xã Nậm Khăn",
                                        "Xã Nậm Hăn",
                                        "Xã Mường Cai"
                                    ],
                                    "Huyện Yên Châu": [
                                        "Thị trấn Yên Châu",
                                        "Xã Chiềng Đông",
                                        "Xã Chiềng Hặc",
                                        "Xã Chiềng Pha",
                                        "Xã Nậm Khẩu",
                                        "Xã Mường Lói",
                                        "Xã Tà Hộc"
                                    ],
                                    "Huyện Bắc Yên": [
                                        "Thị trấn Bắc Yên",
                                        "Xã Hát Lót",
                                        "Xã Hồng Ngài",
                                        "Xã Tà Xùa",
                                        "Xã Mường Khoa",
                                        "Xã Tà Xùa"
                                    ],
                                    "Huyện Phù Yên": [
                                        "Thị trấn Phù Yên",
                                        "Xã Huy Bắc",
                                        "Xã Huy Thượng",
                                        "Xã Huy Tân",
                                        "Xã Huy Thượng",
                                        "Xã Huy Tân"
                                    ],
                                    "Huyện Quỳnh Nhai": [
                                        "Thị trấn Quỳnh Nhai",
                                        "Xã Chiềng Bằng",
                                        "Xã Chiềng Khay",
                                        "Xã Mường Giôn",
                                        "Xã Mường Sại",
                                        "Xã Nậm Păm"
                                    ]
                                },
                                
                                    "Yên Bái": {
                                        "Thành phố Yên Bái": [
                                            "Phường Minh Tân",
                                            "Phường Hợp Minh",
                                            "Phường Nguyễn Thái Học",
                                            "Phường Đồng Tâm",
                                            "Phường Yên Ninh",
                                            "Xã Tuy Lộc",
                                            "Xã Việt Hồng",
                                            "Xã Giới Phiên"
                                        ],
                                        "Huyện Lục Yên": [
                                            "Thị trấn Lục Yên",
                                            "Xã Minh Khương",
                                            "Xã Tô Mậu",
                                            "Xã Khánh Thiện",
                                            "Xã Yên Thắng",
                                            "Xã An Phú",
                                            "Xã Lâm Thượng"
                                        ],
                                        "Huyện Văn Yên": [
                                            "Thị trấn Văn Yên",
                                            "Xã Viễn Sơn",
                                            "Xã Tân Hương",
                                            "Xã Hòa An",
                                            "Xã Mỏ Vàng",
                                            "Xã Tân Nguyên",
                                            "Xã Lâm Giang"
                                        ],
                                        "Huyện Trấn Yên": [
                                            "Thị trấn Trấn Yên",
                                            "Xã Việt Thành",
                                            "Xã Hòa Cuông",
                                            "Xã Lợi Hải",
                                            "Xã Nghĩa Tâm",
                                            "Xã Tân Đồng",
                                            "Xã Tân An"
                                        ],
                                        "Huyện Mù Cang Chải": [
                                            "Thị trấn Mù Cang Chải",
                                            "Xã La Pán Tẩn",
                                            "Xã Chế Cu Nha",
                                            "Xã Dế Xu Phình",
                                            "Xã Nậm Khắt",
                                            "Xã Nậm Có"
                                        ],
                                        "Huyện Văn Chấn": [
                                            "Thị trấn Văn Chấn",
                                            "Xã Nghĩa Sơn",
                                            "Xã Suối Giàng",
                                            "Xã Nghĩa Tâm",
                                            "Xã Tân Hợp",
                                            "Xã Cát Thịnh"
                                        ],
                                        "Huyện Yên Bình": [
                                            "Thị trấn Yên Bình",
                                            "Xã Hạnh Sơn",
                                            "Xã Thịnh Hưng",
                                            "Xã Bảo Ái",
                                            "Xã Hòa Bình",
                                            "Xã Khánh Hòa"
                                        ]
                                    },
                                    
                                        "Hòa Bình": {
                                            "Thành phố Hòa Bình": [
                                                "Phường Tân Hòa",
                                                "Phường Hữu Nghị",
                                                "Phường Thống Nhất",
                                                "Phường Phương Lâm",
                                                "Phường Đồng Tiến",
                                                "Xã Sủ Ngòi",
                                                "Xã Hòa Bình"
                                            ],
                                            "Huyện Cao Phong": [
                                                "Thị trấn Cao Phong",
                                                "Xã Bắc Phong",
                                                "Xã Tân Phong",
                                                "Xã Bình Thanh",
                                                "Xã Dũng Phong",
                                                "Xã Xuân Phong",
                                                "Xã Thạch Yên"
                                            ],
                                            "Huyện Đà Bắc": [
                                                "Thị trấn Đà Bắc",
                                                "Xã Đồng Nghĩa",
                                                "Xã Đoàn Kết",
                                                "Xã Mường Chiềng",
                                                "Xã Tân Pheo",
                                                "Xã Tiền Phong",
                                                "Xã Nánh Nghĩa"
                                            ],
                                            "Huyện Lương Sơn": [
                                                "Thị trấn Lương Sơn",
                                                "Xã Hòa Sơn",
                                                "Xã Tân Vinh",
                                                "Xã Cư Yên",
                                                "Xã Hợp Châu",
                                                "Xã Lương Sơn"
                                            ],
                                            "Huyện Kim Bôi": [
                                                "Thị trấn Bo",
                                                "Xã Bắc Sơn",
                                                "Xã Cuối Hạ",
                                                "Xã Kim Bôi",
                                                "Xã Sơn Thủy",
                                                "Xã Xuân Thủy",
                                                "Xã Bình Hòa"
                                            ],
                                            "Huyện Mai Châu": [
                                                "Thị trấn Mai Châu",
                                                "Xã Tòng Đậu",
                                                "Xã Chiềng Châu",
                                                "Xã Hòa Bình",
                                                "Xã Sơn Thủy"
                                            ],
                                            "Huyện Tân Lạc": [
                                                "Thị trấn Mường Khến",
                                                "Xã Phong Phú",
                                                "Xã Ngọc Sơn",
                                                "Xã Suối Lư",
                                                "Xã Tân Lạc",
                                                "Xã Xuân Thủy"
                                            ],
                                            "Huyện Yên Thủy": [
                                                "Thị trấn Yên Thủy",
                                                "Xã Đinh Tiên Hoàng",
                                                "Xã Yên Bồng",
                                                "Xã Yên Thủy",
                                                "Xã Lạc Hòa"
                                            ]
                                        },
                                        
                                            "Thái Nguyên": {
                                                "Thành phố Thái Nguyên": [
                                                    "Phường Trưng Vương",
                                                    "Phường Tân Thịnh",
                                                    "Phường Phú Xuyên",
                                                    "Phường Quang Trung",
                                                    "Phường Hoàng Văn Thụ",
                                                    "Phường Thịnh Đán",
                                                    "Phường Gia Sàng",
                                                    "Xã Túc Duyên",
                                                    "Xã Huống Thượng"
                                                ],
                                                "Huyện Phú Bình": [
                                                    "Thị trấn Phú Bình",
                                                    "Xã Bảo Lạc",
                                                    "Xã Như Xuân",
                                                    "Xã Tân Kim",
                                                    "Xã Tân Hòa",
                                                    "Xã Hòa Bình",
                                                    "Xã Xuân Phương"
                                                ],
                                                "Huyện Định Hóa": [
                                                    "Thị trấn Định Hóa",
                                                    "Xã Bình Yên",
                                                    "Xã Điềm Mặc",
                                                    "Xã Phú Đình",
                                                    "Xã Trung Lương",
                                                    "Xã Kim Phượng",
                                                    "Xã Bảo Linh"
                                                ],
                                                "Huyện Đại Từ": [
                                                    "Thị trấn Hùng Sơn",
                                                    "Xã Cát Nê",
                                                    "Xã Mỹ Yên",
                                                    "Xã Phú Thịnh",
                                                    "Xã La Bằng",
                                                    "Xã Tân Thái"
                                                ],
                                                "Huyện Võ Nhai": [
                                                    "Thị trấn Đình Cả",
                                                    "Xã Phú Đô",
                                                    "Xã Vũ Linh",
                                                    "Xã Lâu Thượng",
                                                    "Xã Khôi Ninh",
                                                    "Xã Quân Chu"
                                                ],
                                                "Huyện Phú Lương": [
                                                    "Thị trấn Giang Tiên",
                                                    "Xã Động Đạt",
                                                    "Xã Sơn Cẩm",
                                                    "Xã Hợp Thành",
                                                    "Xã Phú Lương",
                                                    "Xã Liên Minh"
                                                ],
                                                "Huyện Tân Cương": [
                                                    "Thị trấn Tân Cương",
                                                    "Xã Tân Cương",
                                                    "Xã Phú Lạc",
                                                    "Xã Lạc Thiện",
                                                    "Xã Hương Sơn"
                                                ],
                                                "Huyện Đồng Hỷ": [
                                                    "Thị trấn Trại Cau",
                                                    "Xã Hòa Bình",
                                                    "Xã Bảo Linh",
                                                    "Xã Văn Hóa",
                                                    "Xã Tân Hòa",
                                                    "Xã Hợp Tiến"
                                                ]
                                            },
                                            
                                                "Lạng Sơn": {
                                                    "Thành phố Lạng Sơn": [
                                                        "Phường Chi Lăng",
                                                        "Phường Đông Kinh",
                                                        "Phường Hoàng Văn Thụ",
                                                        "Phường Tam Thanh",
                                                        "Phường Vĩnh Trại",
                                                        "Xã Mai Pha",
                                                        "Xã Tân Thành",
                                                        "Xã Tân Đoàn",
                                                        "Xã Hoàng Đồng"
                                                    ],
                                                    "Huyện Tràng Định": [
                                                        "Thị trấn Tràng Định",
                                                        "Xã Bình Trung",
                                                        "Xã Hùng Sơn",
                                                        "Xã Kim Đồng",
                                                        "Xã Lộc Bình",
                                                        "Xã Tân Thành"
                                                    ],
                                                    "Huyện Lộc Bình": [
                                                        "Thị trấn Lộc Bình",
                                                        "Xã Bắc Xa",
                                                        "Xã Đông Beng",
                                                        "Xã Hữu Khánh",
                                                        "Xã Lộc Bình",
                                                        "Xã Tú Đoạn"
                                                    ],
                                                    "Huyện Văn Lãng": [
                                                        "Thị trấn Na Sầm",
                                                        "Xã Bình Yên",
                                                        "Xã Đồng Bục",
                                                        "Xã Hữu Khánh",
                                                        "Xã Tân Văn",
                                                        "Xã Tân Mỹ"
                                                    ],
                                                    "Huyện Cao Lộc": [
                                                        "Thị trấn Cao Lộc",
                                                        "Xã Gia Cát",
                                                        "Xã Hợp Thành",
                                                        "Xã Xuất Lễ",
                                                        "Xã Tân Thanh",
                                                        "Xã Thạch Đạn"
                                                    ],
                                                    "Huyện Đình Lập": [
                                                        "Thị trấn Đình Lập",
                                                        "Xã Bính Xá",
                                                        "Xã Đồng Thắng",
                                                        "Xã Lâm Ca",
                                                        "Xã Bắc Xa",
                                                        "Xã Nam Hoa"
                                                    ],
                                                    "Huyện Chi Lăng": [
                                                        "Thị trấn Chi Lăng",
                                                        "Xã Hợp Lợi",
                                                        "Xã Hòa Bình",
                                                        "Xã Nậm Thi",
                                                        "Xã Tân Lập",
                                                        "Xã Tân Thành"
                                                    ],
                                                    "Huyện Văn Quan": [
                                                        "Thị trấn Văn Quan",
                                                        "Xã An Sơn",
                                                        "Xã Bình Dương",
                                                        "Xã Hòa Bình",
                                                        "Xã Việt Hùng",
                                                        "Xã Vân Nham"
                                                    ]
                                                },
                                                
                                                    "Quảng Ninh": {
                                                        "Thành phố Hạ Long": [
                                                            "Phường Hồng Gai",
                                                            "Phường Bãi Cháy",
                                                            "Phường Cao Thắng",
                                                            "Phường Hồng Hải",
                                                            "Phường Hà Khánh",
                                                            "Xã Thống Nhất",
                                                            "Xã Lê Lợi",
                                                            "Xã Hoàng Tân"
                                                        ],
                                                        "Thành phố Móng Cái": [
                                                            "Phường Trần Phú",
                                                            "Phường Ka Long",
                                                            "Phường Hải Yên",
                                                            "Xã Vạn Ninh",
                                                            "Xã Bắc Sơn",
                                                            "Xã Hòa Bình"
                                                        ],
                                                        "Thành phố Uông Bí": [
                                                            "Phường Quang Trung",
                                                            "Phường Nam Khê",
                                                            "Phường Phương Đông",
                                                            "Xã Thượng Yên Công",
                                                            "Xã Đông Triều",
                                                            "Xã Bình Khê"
                                                        ],
                                                        "Thành phố Cẩm Phả": [
                                                            "Phường Cẩm Phú",
                                                            "Phường Cẩm Trung",
                                                            "Phường Cẩm Sơn",
                                                            "Phường Quang Hanh",
                                                            "Xã Dương Huy",
                                                            "Xã Cẩm Hải"
                                                        ],
                                                        "Thành phố Đông Triều": [
                                                            "Thị trấn Đông Triều",
                                                            "Xã An Sinh",
                                                            "Xã Yên Thọ",
                                                            "Xã Bình Khê",
                                                            "Xã Việt Dân"
                                                        ],
                                                        "Huyện Vân Đồn": [
                                                            "Thị trấn Cái Rồng",
                                                            "Xã Bản Sen",
                                                            "Xã Đoàn Kết",
                                                            "Xã Minh Châu",
                                                            "Xã Tiên Yên"
                                                        ],
                                                        "Huyện Đầm Hà": [
                                                            "Thị trấn Đầm Hà",
                                                            "Xã Đầm Hà",
                                                            "Xã Quảng Lợi",
                                                            "Xã Quảng An",
                                                            "Xã Tân Bình"
                                                        ],
                                                        "Huyện Hải Hà": [
                                                            "Thị trấn Quảng Hà",
                                                            "Xã Quảng Sơn",
                                                            "Xã Quảng Điền",
                                                            "Xã Quảng Trung",
                                                            "Xã Phú Hải"
                                                        ],
                                                        "Huyện Tiên Yên": [
                                                            "Thị trấn Tiên Yên",
                                                            "Xã Đông Ngũ",
                                                            "Xã Hà Lâu",
                                                            "Xã Tân An",
                                                            "Xã Tân Lập"
                                                        ],
                                                        "Huyện Ba Chẽ": [
                                                            "Thị trấn Ba Chẽ",
                                                            "Xã Thanh Sơn",
                                                            "Xã Đồn Đạc",
                                                            "Xã Tân Bình",
                                                            "Xã Nam Sơn"
                                                        ],
                                                        "Huyện Cô Tô": [
                                                            "Thị trấn Cô Tô",
                                                            "Xã Thanh Lân",
                                                            "Xã Đồng Tiến"
                                                        ]
                                                    },
                                                    
                                                        "Bắc Giang": {
                                                            "Thành phố Bắc Giang": [
                                                                "Phường Ngô Quyền",
                                                                "Phường Trần Nguyên Hãn",
                                                                "Phường Dĩnh Kế",
                                                                "Phường Xương Giang",
                                                                "Phường Lê Lợi",
                                                                "Phường Đa Mai",
                                                                "Phường Thọ Xương",
                                                                "Phường Dương Bình",
                                                                "Xã Tân Mỹ",
                                                                "Xã Đồng Sơn",
                                                                "Xã Song Khê",
                                                                "Xã Tân Tiến"
                                                            ],
                                                            "Huyện Yên Thế": [
                                                                "Thị trấn Cao Thượng",
                                                                "Xã Tam Hiệp",
                                                                "Xã Lệ Viễn",
                                                                "Xã Tân Sỏi",
                                                                "Xã Đồng Kỳ",
                                                                "Xã Hương Vĩ",
                                                                "Xã Đồng Tâm"
                                                            ],
                                                            "Huyện Tân Yên": [
                                                                "Thị trấn Nhã Nam",
                                                                "Xã Quế Nham",
                                                                "Xã Thanh Vân",
                                                                "Xã Phúc Sơn",
                                                                "Xã Tân Trung",
                                                                "Xã Tân Việt",
                                                                "Xã Ngọc Châu"
                                                            ],
                                                            "Huyện Lạng Giang": [
                                                                "Thị trấn Lạng Giang",
                                                                "Xã Tân Hưng",
                                                                "Xã Lạng Giang",
                                                                "Xã Thống Nhất",
                                                                "Xã Mỹ An",
                                                                "Xã Xuân Hương"
                                                            ],
                                                            "Huyện Hiệp Hòa": [
                                                                "Thị trấn Thắng",
                                                                "Xã Bắc Lý",
                                                                "Xã Đoan Bái",
                                                                "Xã Hương Lâm",
                                                                "Xã Hòa Sơn",
                                                                "Xã Thái Sơn"
                                                            ],
                                                            "Huyện Việt Yên": [
                                                                "Thị trấn Bích Động",
                                                                "Xã Vân Trung",
                                                                "Xã Tăng Tiến",
                                                                "Xã Hương Mai",
                                                                "Xã Nghĩa Trung"
                                                            ],
                                                            "Huyện Sơn Động": [
                                                                "Thị trấn Thanh Sơn",
                                                                "Xã An Bá",
                                                                "Xã Lục Sơn",
                                                                "Xã Quế Sơn",
                                                                "Xã Cẩm Đàn"
                                                            ],
                                                            "Huyện Yên Dũng": [
                                                                "Thị trấn Nham Biền",
                                                                "Xã Lãng Sơn",
                                                                "Xã Nham Biền",
                                                                "Xã Đồng Việt",
                                                                "Xã Tân Liễu"
                                                            ]
                                                        },
                                                        
                                                            "Phú Thọ": {
                                                                "Thành phố Việt Trì": [
                                                                    "Phường Gia Cẩm",
                                                                    "Phường Nông Trang",
                                                                    "Phường Thanh Miếu",
                                                                    "Phường Thọ Sơn",
                                                                    "Phường Bến Gót",
                                                                    "Phường Dữu Lâu",
                                                                    "Phường Vân Cơ",
                                                                    "Xã Hy Cương",
                                                                    "Xã Chu Hóa",
                                                                    "Xã Trưng Vương",
                                                                    "Xã Thạch Nghệ"
                                                                ],
                                                                "Huyện Đoan Hùng": [
                                                                    "Thị trấn Đoan Hùng",
                                                                    "Xã Hòa Xuân",
                                                                    "Xã Minh Tiến",
                                                                    "Xã Ngọc Quan",
                                                                    "Xã Vân Đồn",
                                                                    "Xã Hùng Sơn",
                                                                    "Xã Ngọc Hồi"
                                                                ],
                                                                "Huyện Hạ Hòa": [
                                                                    "Thị trấn Hạ Hòa",
                                                                    "Xã Hương Nộn",
                                                                    "Xã Minh Côi",
                                                                    "Xã Nghĩa Lợi",
                                                                    "Xã Vũ Yên",
                                                                    "Xã Bằng Luân"
                                                                ],
                                                                "Huyện Thanh Ba": [
                                                                    "Thị trấn Thanh Ba",
                                                                    "Xã Vân Lĩnh",
                                                                    "Xã Hương Nộn",
                                                                    "Xã Thanh Vân",
                                                                    "Xã Tân Phú"
                                                                ],
                                                                "Huyện Phù Ninh": [
                                                                    "Thị trấn Phù Ninh",
                                                                    "Xã Trị Quận",
                                                                    "Xã Phú Mỹ",
                                                                    "Xã Phú Lộc",
                                                                    "Xã Bảo Thanh"
                                                                ],
                                                                "Huyện Yên Lập": [
                                                                    "Thị trấn Yên Lập",
                                                                    "Xã Xuân Lộc",
                                                                    "Xã Mỹ Lung",
                                                                    "Xã Đồng Thịnh",
                                                                    "Xã Hợp Hải"
                                                                ],
                                                                "Huyện Tân Sơn": [
                                                                    "Thị trấn Tân Sơn",
                                                                    "Xã Tam Thanh",
                                                                    "Xã Sơn Hạ",
                                                                    "Xã Tân Sơn",
                                                                    "Xã Văn Miếu"
                                                                ],
                                                                "Huyện Cẩm Khê": [
                                                                    "Thị trấn Cẩm Khê",
                                                                    "Xã Cẩm Khê",
                                                                    "Xã Phú Khê",
                                                                    "Xã Tiên Tường",
                                                                    "Xã Thạch Đồng"
                                                                ]
                                                            },
                                                            
                                                                "Vĩnh Phúc": {
                                                                    "Thành phố Vĩnh Yên": [
                                                                        "Phường Đống Đa",
                                                                        "Phường Liên Bảo",
                                                                        "Phường Hội Hợp",
                                                                        "Phường Trưng Trắc",
                                                                        "Phường Trưng Nhị",
                                                                        "Xã Thanh Trù",
                                                                        "Xã Tiền Châu"
                                                                    ],
                                                                    "Thành phố Phúc Yên": [
                                                                        "Phường Phúc Thắng",
                                                                        "Phường Xuân Hòa",
                                                                        "Phường Hai Bà Trưng",
                                                                        "Phường Trần Phú",
                                                                        "Xã Ngọc Thanh",
                                                                        "Xã Tiền Châu"
                                                                    ],
                                                                    "Huyện Vĩnh Tường": [
                                                                        "Thị trấn Vĩnh Tường",
                                                                        "Xã Vĩnh Ninh",
                                                                        "Xã Vĩnh Thịnh",
                                                                        "Xã Vĩnh Sơn",
                                                                        "Xã Vĩnh Yên"
                                                                    ],
                                                                    "Huyện Bình Xuyên": [
                                                                        "Thị trấn Bình Xuyên",
                                                                        "Xã Khai Quang",
                                                                        "Xã Bảo Sơn",
                                                                        "Xã Thạch Đà",
                                                                        "Xã Tam Đồng"
                                                                    ],
                                                                    "Huyện Yên Lạc": [
                                                                        "Thị trấn Yên Lạc",
                                                                        "Xã Yên Đồng",
                                                                        "Xã Yên Phương",
                                                                        "Xã Yên Bình",
                                                                        "Xã Đồng Văn"
                                                                    ],
                                                                    "Huyện Tam Đảo": [
                                                                        "Thị trấn Tam Đảo",
                                                                        "Xã Hợp Châu",
                                                                        "Xã Đạo Trù",
                                                                        "Xã Tam Quan",
                                                                        "Xã Yên Dương"
                                                                    ],
                                                                    "Huyện Lập Thạch": [
                                                                        "Thị trấn Lập Thạch",
                                                                        "Xã Bàn Giàng",
                                                                        "Xã Đạo Tú",
                                                                        "Xã Hướng Đạo",
                                                                        "Xã Tân Hương"
                                                                    ]
                                                                },
                                                                
                                                                    "Bắc Ninh": {
                                                                        "Thành phố Bắc Ninh": [
                                                                            "Phường Đại Phúc",
                                                                            "Phường Hạp Lĩnh",
                                                                            "Phường Kim Chân",
                                                                            "Phường Ninh Xá",
                                                                            "Phường Suối Hoa",
                                                                            "Phường Võ Cường",
                                                                            "Xã Vạn An",
                                                                            "Xã Nam Sơn"
                                                                        ],
                                                                        "Huyện Gia Bình": [
                                                                            "Thị trấn Gia Bình",
                                                                            "Xã Đại Bằng",
                                                                            "Xã Nhân Thắng",
                                                                            "Xã Đông Cứu",
                                                                            "Xã Bình Dương",
                                                                            "Xã Quỳnh Phú",
                                                                            "Xã Đông Hòa"
                                                                        ],
                                                                        "Huyện Lương Tài": [
                                                                            "Thị trấn Lương Tài",
                                                                            "Xã An Bình",
                                                                            "Xã Hương Mai",
                                                                            "Xã Lương Tài",
                                                                            "Xã Phú Lương",
                                                                            "Xã Tân Lập"
                                                                        ],
                                                                        "Huyện Thuận Thành": [
                                                                            "Thị trấn Thứa",
                                                                            "Xã An Bình",
                                                                            "Xã Mão Điền",
                                                                            "Xã Ninh Xá",
                                                                            "Xã Nguyệt Đức",
                                                                            "Xã Thanh Khương"
                                                                        ],
                                                                        "Huyện Tiên Du": [
                                                                            "Thị trấn Tiên Du",
                                                                            "Xã Đại Đồng",
                                                                            "Xã Đồng Nguyên",
                                                                            "Xã Hoàn Sơn",
                                                                            "Xã Minh Đạo",
                                                                            "Xã Tân Chi"
                                                                        ],
                                                                        "Huyện Yên Phong": [
                                                                            "Thị trấn Đông Phong",
                                                                            "Xã Bắc Ninh",
                                                                            "Xã Bồng Tiên",
                                                                            "Xã Hương Nha",
                                                                            "Xã Gia Đông"
                                                                        ]
                                                                    },
                                                                    
                                                                        "Hải Dương": {
                                                                            "Thành phố Hải Dương": [
                                                                                "Phường Bình Hàn",
                                                                                "Phường Hải Tân",
                                                                                "Phường Lê Thanh Nghị",
                                                                                "Phường Tân Bình",
                                                                                "Phường Thanh Bình",
                                                                                "Phường Trần Hưng Đạo",
                                                                                "Xã Cẩm Đông",
                                                                                "Xã Cẩm Điền",
                                                                                "Xã Cẩm Giàng",
                                                                                "Xã Cẩm Phúc",
                                                                                "Xã Cẩm Sơn"
                                                                            ],
                                                                            "Huyện Bình Giang": [
                                                                                "Thị trấn Bình Giang",
                                                                                "Xã Bình Xuyên",
                                                                                "Xã Cẩm Hưng",
                                                                                "Xã Cẩm Văn",
                                                                                "Xã Tân Hưng",
                                                                                "Xã Tân Việt"
                                                                            ],
                                                                            "Huyện Chí Linh": [
                                                                                "Thị xã Chí Linh",
                                                                                "Xã An Lạc",
                                                                                "Xã Cổ Thành",
                                                                                "Xã Hoàng Tiến",
                                                                                "Xã Lê Lợi",
                                                                                "Xã Nhân Huệ"
                                                                            ],
                                                                            "Huyện Gia Lộc": [
                                                                                "Thị trấn Gia Lộc",
                                                                                "Xã Gia Lộc",
                                                                                "Xã Bình Lộc",
                                                                                "Xã Định Sơn",
                                                                                "Xã Hòa Bình"
                                                                            ],
                                                                            "Huyện Kinh Môn": [
                                                                                "Thị trấn Kinh Môn",
                                                                                "Xã Hiệp Sơn",
                                                                                "Xã Long Xuyên",
                                                                                "Xã Lương Điền",
                                                                                "Xã Phạm Mệnh"
                                                                            ],
                                                                            "Huyện Ninh Giang": [
                                                                                "Thị trấn Ninh Giang",
                                                                                "Xã Đông Xuyên",
                                                                                "Xã Hồng Đức",
                                                                                "Xã Nghĩa An",
                                                                                "Xã Tân Hương"
                                                                            ],
                                                                            "Huyện Tứ Kỳ": [
                                                                                "Thị trấn Tứ Kỳ",
                                                                                "Xã An Thanh",
                                                                                "Xã Bình Lãnh",
                                                                                "Xã Diên Hồng",
                                                                                "Xã Hoàng Diệu"
                                                                            ],
                                                                            "Huyện Thanh Hà": [
                                                                                "Thị trấn Thanh Hà",
                                                                                "Xã Cẩm Chế",
                                                                                "Xã Liên Mạc",
                                                                                "Xã Tân An",
                                                                                "Xã Thanh Khê"
                                                                            ],
                                                                            "Huyện Thanh Miện": [
                                                                                "Thị trấn Thanh Miện",
                                                                                "Xã An Phụ",
                                                                                "Xã Ngô Quyền",
                                                                                "Xã Thanh Giang",
                                                                                "Xã Thanh Khê"
                                                                            ]
                                                                        },
                                                                        
                                                                            "Hải Phòng": {
                                                                                "Quận Hải An": [
                                                                                    "Phường Đông Hải 1",
                                                                                    "Phường Đông Hải 2",
                                                                                    "Phường Đằng Lâm",
                                                                                    "Phường Nam Hải",
                                                                                    "Phường Hải An",
                                                                                    "Phường Tràng Cát"
                                                                                ],
                                                                                "Quận Lê Chân": [
                                                                                    "Phường An Biên",
                                                                                    "Phường An Dương",
                                                                                    "Phường Cát Dài",
                                                                                    "Phường Lam Sơn",
                                                                                    "Phường Lê Lợi",
                                                                                    "Phường Trần Nguyên Hãn"
                                                                                ],
                                                                                "Quận Ngô Quyền": [
                                                                                    "Phường Đằng Giang",
                                                                                    "Phường Đằng Hải",
                                                                                    "Phường Lạch Tray",
                                                                                    "Phường Máy Tơ",
                                                                                    "Phường Nghĩa Xá",
                                                                                    "Phường Vạn Mỹ"
                                                                                ],
                                                                                "Quận Kiến An": [
                                                                                    "Phường An Khê",
                                                                                    "Phường Đằng Lân",
                                                                                    "Phường Kiến An",
                                                                                    "Phường Quán Trữ",
                                                                                    "Phường Tràng Cát",
                                                                                    "Phường Tân Dương"
                                                                                ],
                                                                                "Quận Dương Kinh": [
                                                                                    "Phường Anh Dũng",
                                                                                    "Phường Bắc Sơn",
                                                                                    "Phường Đoàn Xá",
                                                                                    "Phường Hòa Nghĩa",
                                                                                    "Phường Tân Thành"
                                                                                ],
                                                                                "Quận Hải Phòng": [
                                                                                    "Phường Cát Bi",
                                                                                    "Phường Hùng Vương",
                                                                                    "Phường Quang Trung",
                                                                                    "Phường Thượng Lý"
                                                                                ],
                                                                                "Huyện An Dương": [
                                                                                    "Thị trấn An Dương",
                                                                                    "Xã An Hưng",
                                                                                    "Xã An Tiến",
                                                                                    "Xã Nam Sơn",
                                                                                    "Xã Tân Tiến"
                                                                                ],
                                                                                "Huyện An Lão": [
                                                                                    "Thị trấn An Lão",
                                                                                    "Xã An Thái",
                                                                                    "Xã An Hòa",
                                                                                    "Xã An Mỹ",
                                                                                    "Xã Trường Thành"
                                                                                ],
                                                                                "Huyện Thủy Nguyên": [
                                                                                    "Thị trấn Núi Đèo",
                                                                                    "Xã An Lư",
                                                                                    "Xã Bình Định",
                                                                                    "Xã Đông Sơn",
                                                                                    "Xã Lưu Kiếm"
                                                                                ],
                                                                                "Huyện Tiên Lãng": [
                                                                                    "Thị trấn Tiên Lãng",
                                                                                    "Xã Cấp Tiến",
                                                                                    "Xã Kiến Thiết",
                                                                                    "Xã Tiên Thắng",
                                                                                    "Xã Vinh Quang"
                                                                                ],
                                                                                "Huyện Vĩnh Bảo": [
                                                                                    "Thị trấn Vĩnh Bảo",
                                                                                    "Xã Cộng Hiền",
                                                                                    "Xã Giang Biên",
                                                                                    "Xã Nhân Hòa",
                                                                                    "Xã Vĩnh An"
                                                                                ]
                                                                            },
                                                                            
                                                                                "Hưng Yên": {
                                                                                    "Thành phố Hưng Yên": [
                                                                                        "Phường An Tảo",
                                                                                        "Phường Bần Yên Nhân",
                                                                                        "Phường Hiến Nam",
                                                                                        "Phường Lê Lợi",
                                                                                        "Phường Quang Trung",
                                                                                        "Phường Tân Hưng",
                                                                                        "Phường Tân Hòa",
                                                                                        "Phường Minh Khai",
                                                                                        "Phường Nhân Hòa",
                                                                                        "Phường Lam Sơn",
                                                                                        "Phường Phú Xuân",
                                                                                        "Phường Tiên Tiến"
                                                                                    ],
                                                                                    "Huyện Văn Lâm": [
                                                                                        "Thị trấn Như Quỳnh",
                                                                                        "Xã Lạc Đạo",
                                                                                        "Xã Lương Tài",
                                                                                        "Xã Đình Dù",
                                                                                        "Xã Vân Giang",
                                                                                        "Xã Xuân Trúc"
                                                                                    ],
                                                                                    "Huyện Văn Giang": [
                                                                                        "Thị trấn Văn Giang",
                                                                                        "Xã Cửu Cao",
                                                                                        "Xã Dương Quang",
                                                                                        "Xã Liên Nghĩa",
                                                                                        "Xã Long Hưng",
                                                                                        "Xã Mễ Sở",
                                                                                        "Xã Nghĩa Trụ",
                                                                                        "Xã Tân Tiến"
                                                                                    ],
                                                                                    "Huyện Mỹ Hào": [
                                                                                        "Thị xã Mỹ Hào",
                                                                                        "Xã Bạch Sam",
                                                                                        "Xã Bình Kiều",
                                                                                        "Xã Dị Chế",
                                                                                        "Xã Lạc Đạo",
                                                                                        "Xã Nhân Hòa",
                                                                                        "Xã Phương Chiểu"
                                                                                    ],
                                                                                    "Huyện Khoái Châu": [
                                                                                        "Thị trấn Khoái Châu",
                                                                                        "Xã An Viên",
                                                                                        "Xã Đông Tảo",
                                                                                        "Xã Đại Hưng",
                                                                                        "Xã Hồng Tiến",
                                                                                        "Xã Tân Dân",
                                                                                        "Xã Tân Việt"
                                                                                    ],
                                                                                    "Huyện Kim Động": [
                                                                                        "Thị trấn Lương Bằng",
                                                                                        "Xã Bình Khoái",
                                                                                        "Xã Cẩm Ninh",
                                                                                        "Xã Đại Đồng",
                                                                                        "Xã Hòa Bình",
                                                                                        "Xã Minh Hải",
                                                                                        "Xã Nhân Nghĩa"
                                                                                    ],
                                                                                    "Huyện Tiên Lữ": [
                                                                                        "Thị trấn Tiên Lữ",
                                                                                        "Xã Bình Minh",
                                                                                        "Xã Đức Hợp",
                                                                                        "Xã Liên Nghĩa",
                                                                                        "Xã Minh Đức",
                                                                                        "Xã Tống Trạch",
                                                                                        "Xã Văn Lâm"
                                                                                    ],
                                                                                    "Huyện Yên Mỹ": [
                                                                                        "Thị trấn Yên Mỹ",
                                                                                        "Xã Đại Yên",
                                                                                        "Xã Hoàn Long",
                                                                                        "Xã Hương Nha",
                                                                                        "Xã Lý Thường Kiệt",
                                                                                        "Xã Minh Châu",
                                                                                        "Xã Thụy Lôi"
                                                                                    ]
                                                                                },
                                                                                
                                                                                    "Thái Bình": {
                                                                                        "Thành phố Thái Bình": [
                                                                                            "Phường Trần Hưng Đạo",
                                                                                            "Phường Trần Lãm",
                                                                                            "Phường Kỳ Bá",
                                                                                            "Phường Tiền Phong",
                                                                                            "Phường Quang Trung",
                                                                                            "Phường Phú Khánh",
                                                                                            "Phường Bồ Xuyên",
                                                                                            "Phường Hoàng Diệu",
                                                                                            "Phường Minh Khai",
                                                                                            "Phường Đề Thám",
                                                                                            "Xã Tân Bình",
                                                                                            "Xã Đông Thọ"
                                                                                        ],
                                                                                        "Huyện Hưng Hà": [
                                                                                            "Thị trấn Hưng Hà",
                                                                                            "Xã Bình Định",
                                                                                            "Xã Bình Minh",
                                                                                            "Xã Cổ Đình",
                                                                                            "Xã Dân Chủ",
                                                                                            "Xã Độc Lập",
                                                                                            "Xã Đông Đô",
                                                                                            "Xã Hòa Bình",
                                                                                            "Xã Tân Hòa"
                                                                                        ],
                                                                                        "Huyện Đông Hưng": [
                                                                                            "Thị trấn Đông Hưng",
                                                                                            "Xã Bạch Đằng",
                                                                                            "Xã Đông Thái",
                                                                                            "Xã Đông Hợp",
                                                                                            "Xã Lô Giang",
                                                                                            "Xã Phú Chánh",
                                                                                            "Xã Thái Hưng"
                                                                                        ],
                                                                                        "Huyện Thái Thụy": [
                                                                                            "Thị trấn Thái Thụy",
                                                                                            "Xã An Khánh",
                                                                                            "Xã Thái Hưng",
                                                                                            "Xã Thái Phúc",
                                                                                            "Xã Thái Ninh",
                                                                                            "Xã Thái Thịnh",
                                                                                            "Xã Thái Giang"
                                                                                        ],
                                                                                        "Huyện Quỳnh Phụ": [
                                                                                            "Thị trấn Quỳnh Côi",
                                                                                            "Xã An Khê",
                                                                                            "Xã An Mỹ",
                                                                                            "Xã Quỳnh Hải",
                                                                                            "Xã Quỳnh Hoa",
                                                                                            "Xã Quỳnh Ngọc"
                                                                                        ],
                                                                                        "Huyện Kiến Xương": [
                                                                                            "Thị trấn Kiến Xương",
                                                                                            "Xã Bình Minh",
                                                                                            "Xã Lê Lợi",
                                                                                            "Xã Quốc Tuấn",
                                                                                            "Xã Tiên Hưng",
                                                                                            "Xã Vũ Lễ"
                                                                                        ],
                                                                                        "Huyện Vũ Thư": [
                                                                                            "Thị trấn Vũ Thư",
                                                                                            "Xã Duy Minh",
                                                                                            "Xã Minh Khai",
                                                                                            "Xã Song Lãng",
                                                                                            "Xã Tân Hòa",
                                                                                            "Xã Tân Lập"
                                                                                        ],
                                                                                        "Huyện Tiền Hải": [
                                                                                            "Thị trấn Tiền Hải",
                                                                                            "Xã Đông Hải",
                                                                                            "Xã Nam Thái",
                                                                                            "Xã Tây Giang",
                                                                                            "Xã Thái Thịnh",
                                                                                            "Xã Vũ Tây"
                                                                                        ]
                                                                                    },
                                                                                
                                                                                    
                                                                                        "Hà Nam": {
                                                                                            "Thành phố Phủ Lý": [
                                                                                                "Phường Minh Khai",
                                                                                                "Phường Lương Khánh Thiện",
                                                                                                "Phường Thanh Tuyền",
                                                                                                "Phường Trần Hưng Đạo",
                                                                                                "Phường Liêm Chính",
                                                                                                "Phường Thanh Châu",
                                                                                                "Phường Nghĩa Hòa",
                                                                                                "Phường Châu Sơn",
                                                                                                "Xã Tiên Hiệp",
                                                                                                "Xã Liên Minh"
                                                                                            ],
                                                                                            "Huyện Bình Lục": [
                                                                                                "Thị trấn Bình Mỹ",
                                                                                                "Xã Bồ Đề",
                                                                                                "Xã Hưng Công",
                                                                                                "Xã Đồng Hóa",
                                                                                                "Xã Hưng Đạo",
                                                                                                "Xã An Nội",
                                                                                                "Xã Bình Nghĩa",
                                                                                                "Xã Bình Nghĩa"
                                                                                            ],
                                                                                            "Huyện Lý Nhân": [
                                                                                                "Thị trấn Vĩnh Trụ",
                                                                                                "Xã Bắc Lý",
                                                                                                "Xã Nhân Nghĩa",
                                                                                                "Xã Nhân Hậu",
                                                                                                "Xã Nhân Thịnh",
                                                                                                "Xã Nhân Đạo",
                                                                                                "Xã Nhân Trường"
                                                                                            ],
                                                                                            "Huyện Kim Bảng": [
                                                                                                "Thị trấn Quế",
                                                                                                "Xã Đồng Hướng",
                                                                                                "Xã Ngọc Sơn",
                                                                                                "Xã Kim Bình",
                                                                                                "Xã Hòa Hậu",
                                                                                                "Xã Thanh Hà"
                                                                                            ],
                                                                                            "Huyện Thanh Liêm": [
                                                                                                "Thị trấn Thanh Liêm",
                                                                                                "Xã Liêm Sơn",
                                                                                                "Xã Liêm Tuyền",
                                                                                                "Xã Liêm Cần",
                                                                                                "Xã Liêm Chính"
                                                                                            ]
                                                                                        },
                                                                                        
                                                                                            "Nam Định": {
                                                                                                "Thành phố Nam Định": [
                                                                                                    "Phường Cửa Bắc",
                                                                                                    "Phường Trần Hưng Đạo",
                                                                                                    "Phường Lộc Vượng",
                                                                                                    "Phường Vị Hoàng",
                                                                                                    "Phường Ngô Quyền",
                                                                                                    "Phường Mỹ Xá",
                                                                                                    "Phường Thống Nhất",
                                                                                                    "Phường Lộc Hạ",
                                                                                                    "Xã Nam Phong",
                                                                                                    "Xã Nam Tiến"
                                                                                                ],
                                                                                                "Huyện Nam Trực": [
                                                                                                    "Thị trấn Nam Giang",
                                                                                                    "Xã Bình Minh",
                                                                                                    "Xã Nam Mỹ",
                                                                                                    "Xã Nam Lợi",
                                                                                                    "Xã Nam Thái",
                                                                                                    "Xã Hùng Quang",
                                                                                                    "Xã Đồng Sơn"
                                                                                                ],
                                                                                                "Huyện Trực Ninh": [
                                                                                                    "Thị trấn Cổ Lễ",
                                                                                                    "Xã Trực Chính",
                                                                                                    "Xã Trực Hưng",
                                                                                                    "Xã Trực Đại",
                                                                                                    "Xã Trực Cường",
                                                                                                    "Xã Trực Thanh",
                                                                                                    "Xã Trực Ninh"
                                                                                                ],
                                                                                                "Huyện Xuân Trường": [
                                                                                                    "Thị trấn Xuân Trường",
                                                                                                    "Xã Xuân Thượng",
                                                                                                    "Xã Xuân Kiên",
                                                                                                    "Xã Xuân Phú",
                                                                                                    "Xã Xuân Đông",
                                                                                                    "Xã Xuân Hồng",
                                                                                                    "Xã Xuân Ngọc"
                                                                                                ],
                                                                                                "Huyện Giao Thủy": [
                                                                                                    "Thị trấn Giao Thủy",
                                                                                                    "Xã Giao Hải",
                                                                                                    "Xã Giao Thịnh",
                                                                                                    "Xã Giao An",
                                                                                                    "Xã Giao Phong",
                                                                                                    "Xã Giao Tiến",
                                                                                                    "Xã Giao Xuân"
                                                                                                ],
                                                                                                "Huyện Nghĩa Hưng": [
                                                                                                    "Thị trấn Nghĩa Hưng",
                                                                                                    "Xã Nghĩa Sơn",
                                                                                                    "Xã Nghĩa Tân",
                                                                                                    "Xã Nghĩa Phú",
                                                                                                    "Xã Nghĩa Hồng",
                                                                                                    "Xã Nghĩa Thái"
                                                                                                ],
                                                                                                "Huyện Hải Hậu": [
                                                                                                    "Thị trấn Hải Hậu",
                                                                                                    "Xã Hải Thanh",
                                                                                                    "Xã Hải Trung",
                                                                                                    "Xã Hải Hưng",
                                                                                                    "Xã Hải Quang",
                                                                                                    "Xã Hải Đông",
                                                                                                    "Xã Hải Phúc"
                                                                                                ]
                                                                                            },
                                                                                            
                                                                                                "Ninh Bình": {
                                                                                                    "Thành phố Ninh Bình": [
                                                                                                        "Phường Bích Đào",
                                                                                                        "Phường Thanh Bình",
                                                                                                        "Phường Tân Bình",
                                                                                                        "Phường Ninh Khánh",
                                                                                                        "Phường Đông Thành",
                                                                                                        "Phường Nam Bình",
                                                                                                        "Xã Ninh Nhất",
                                                                                                        "Xã Ninh Tiến"
                                                                                                    ],
                                                                                                    "Huyện Tam Điệp": [
                                                                                                        "Thị trấn Tam Điệp",
                                                                                                        "Xã Quang Sơn",
                                                                                                        "Xã Yên Bình",
                                                                                                        "Xã Yên Thịnh",
                                                                                                        "Xã Định Hóa",
                                                                                                        "Xã Mạc Thượng",
                                                                                                        "Xã Nam Sơn"
                                                                                                    ],
                                                                                                    "Huyện Nho Quan": [
                                                                                                        "Thị trấn Nho Quan",
                                                                                                        "Xã Nho Quan",
                                                                                                        "Xã Thanh Lạc",
                                                                                                        "Xã Phú Long",
                                                                                                        "Xã Kỳ Phú",
                                                                                                        "Xã Quỳnh Lưu",
                                                                                                        "Xã Hòa Sơn"
                                                                                                    ],
                                                                                                    "Huyện Hoa Lư": [
                                                                                                        "Thị trấn Hoa Lư",
                                                                                                        "Xã Ninh Hải",
                                                                                                        "Xã Ninh Mỹ",
                                                                                                        "Xã Trường Yên",
                                                                                                        "Xã Gia Thanh",
                                                                                                        "Xã Yên Quang",
                                                                                                        "Xã Ninh Thắng"
                                                                                                    ],
                                                                                                    "Huyện Gia Viễn": [
                                                                                                        "Thị trấn Me",
                                                                                                        "Xã Gia Tường",
                                                                                                        "Xã Gia Hưng",
                                                                                                        "Xã Gia Lập",
                                                                                                        "Xã Gia Phú",
                                                                                                        "Xã Gia Vượng"
                                                                                                    ],
                                                                                                    "Huyện Kim Sơn": [
                                                                                                        "Thị trấn Kim Sơn",
                                                                                                        "Xã Kim Trung",
                                                                                                        "Xã Kim Hải",
                                                                                                        "Xã Kim Chính",
                                                                                                        "Xã Kim Định",
                                                                                                        "Xã Kim Bắc"
                                                                                                    ]
                                                                                                },
                                                                                                
                                                                                                    "Thanh Hóa": {
                                                                                                        "Thành phố Thanh Hóa": [
                                                                                                            "Phường Lam Sơn",
                                                                                                            "Phường Điện Biên",
                                                                                                            "Phường Quảng Thành",
                                                                                                            "Phường Đông Hải",
                                                                                                            "Phường Tân Sơn",
                                                                                                            "Phường Hàm Rồng",
                                                                                                            "Phường Nam Ngạn",
                                                                                                            "Xã Hoằng Anh",
                                                                                                            "Xã Đông Tân"
                                                                                                        ],
                                                                                                        "Huyện Thanh Hà": [
                                                                                                            "Thị trấn Thanh Hà",
                                                                                                            "Xã Thanh Bình",
                                                                                                            "Xã Thanh Hòa",
                                                                                                            "Xã Thanh Xuân",
                                                                                                            "Xã Thanh Hưng",
                                                                                                            "Xã Thanh Sơn"
                                                                                                        ],
                                                                                                        "Huyện Nông Cống": [
                                                                                                            "Thị trấn Nông Cống",
                                                                                                            "Xã Tượng Sơn",
                                                                                                            "Xã Tượng Minh",
                                                                                                            "Xã Tượng Giang",
                                                                                                            "Xã Hoàng Sơn",
                                                                                                            "Xã Minh Nghĩa"
                                                                                                        ],
                                                                                                        "Huyện Như Xuân": [
                                                                                                            "Thị trấn Yên Cát",
                                                                                                            "Xã Xuân Hòa",
                                                                                                            "Xã Thanh Quân",
                                                                                                            "Xã Thượng Ninh",
                                                                                                            "Xã Cát Tân",
                                                                                                            "Xã Phú Nhuận"
                                                                                                        ],
                                                                                                        "Huyện Thọ Xuân": [
                                                                                                            "Thị trấn Thọ Xuân",
                                                                                                            "Xã Xuân Thiên",
                                                                                                            "Xã Xuân Lẹ",
                                                                                                            "Xã Xuân Trường",
                                                                                                            "Xã Xuân Sơn",
                                                                                                            "Xã Xuân Hoà"
                                                                                                        ],
                                                                                                        "Huyện Đông Sơn": [
                                                                                                            "Thị trấn Đông Sơn",
                                                                                                            "Xã Đông Vinh",
                                                                                                            "Xã Đông Thịnh",
                                                                                                            "Xã Đông Khê",
                                                                                                            "Xã Đông Ninh",
                                                                                                            "Xã Đông Á"
                                                                                                        ],
                                                                                                        "Huyện Quảng Xương": [
                                                                                                            "Thị trấn Quảng Xương",
                                                                                                            "Xã Quảng Bình",
                                                                                                            "Xã Quảng Hòa",
                                                                                                            "Xã Quảng Phú",
                                                                                                            "Xã Quảng Thành",
                                                                                                            "Xã Quảng Thịnh"
                                                                                                        ],
                                                                                                        "Huyện Sầm Sơn": [
                                                                                                            "Thành phố Sầm Sơn",
                                                                                                            "Phường Trường Sơn",
                                                                                                            "Phường Trung Sơn",
                                                                                                            "Phường Bắc Sơn",
                                                                                                            "Xã Quảng Tiến",
                                                                                                            "Xã Quảng Hưng"
                                                                                                        ],
                                                                                                        "Huyện Hậu Lộc": [
                                                                                                            "Thị trấn Hậu Lộc",
                                                                                                            "Xã Hòa Lộc",
                                                                                                            "Xã Ngọc Lộc",
                                                                                                            "Xã Đa Lộc",
                                                                                                            "Xã Lộc Tân",
                                                                                                            "Xã Lộc Thịnh"
                                                                                                        ],
                                                                                                        "Huyện Hà Trung": [
                                                                                                            "Thị trấn Hà Trung",
                                                                                                            "Xã Hà Giang",
                                                                                                            "Xã Hà Lĩnh",
                                                                                                            "Xã Hà Long",
                                                                                                            "Xã Hà Ngọc",
                                                                                                            "Xã Hà Thanh"
                                                                                                        ],
                                                                                                        "Huyện Tĩnh Gia": [
                                                                                                            "Thị trấn Tĩnh Gia",
                                                                                                            "Xã Tĩnh Hải",
                                                                                                            "Xã Tĩnh Phú",
                                                                                                            "Xã Tĩnh Sơn",
                                                                                                            "Xã Tĩnh Tiến",
                                                                                                            "Xã Tĩnh Trường"
                                                                                                        ]
                                                                                                    },
                                                                                                    
                                                                                                        "Nghệ An": {
                                                                                                            "Thành phố Vinh": [
                                                                                                                "Phường Hưng Bình",
                                                                                                                "Phường Hưng Phúc",
                                                                                                                "Phường Cửa Nam",
                                                                                                                "Phường Quang Trung",
                                                                                                                "Phường Lê Mao",
                                                                                                                "Phường Trường Thi",
                                                                                                                "Phường Bến Thủy",
                                                                                                                "Xã Nghi Phú",
                                                                                                                "Xã Hưng Đông"
                                                                                                            ],
                                                                                                            "Thị xã Cửa Lò": [
                                                                                                                "Phường Nghi Tân",
                                                                                                                "Phường Nghi Hương",
                                                                                                                "Phường Thu Thủy",
                                                                                                                "Xã Nghi Thủy"
                                                                                                            ],
                                                                                                            "Huyện Anh Sơn": [
                                                                                                                "Thị trấn Anh Sơn",
                                                                                                                "Xã Hợp Thành",
                                                                                                                "Xã Lĩnh Sơn",
                                                                                                                "Xã Đỉnh Sơn",
                                                                                                                "Xã Cao Sơn",
                                                                                                                "Xã Phúc Sơn"
                                                                                                            ],
                                                                                                            "Huyện Thanh Chương": [
                                                                                                                "Thị trấn Thanh Chương",
                                                                                                                "Xã Thanh Thủy",
                                                                                                                "Xã Thanh Mỹ",
                                                                                                                "Xã Thanh Lĩnh",
                                                                                                                "Xã Thanh Hòa",
                                                                                                                "Xã Thanh Ngọc"
                                                                                                            ],
                                                                                                            "Huyện Tương Dương": [
                                                                                                                "Thị trấn Hòa Bình",
                                                                                                                "Xã Yên Na",
                                                                                                                "Xã Mai Sơn",
                                                                                                                "Xã Đồng Văn",
                                                                                                                "Xã Thạch Giám",
                                                                                                                "Xã Xá Lượng"
                                                                                                            ],
                                                                                                            "Huyện Nghĩa Đàn": [
                                                                                                                "Thị trấn Nghĩa Đàn",
                                                                                                                "Xã Nghĩa Bình",
                                                                                                                "Xã Nghĩa Hành",
                                                                                                                "Xã Nghĩa Hội",
                                                                                                                "Xã Nghĩa Thành",
                                                                                                                "Xã Nghĩa Lợi"
                                                                                                            ],
                                                                                                            "Huyện Quỳnh Lưu": [
                                                                                                                "Thị trấn Quỳnh Lưu",
                                                                                                                "Xã Quỳnh Long",
                                                                                                                "Xã Quỳnh Lập",
                                                                                                                "Xã Quỳnh Thắng",
                                                                                                                "Xã Quỳnh Bảng",
                                                                                                                "Xã Quỳnh Hậu"
                                                                                                            ],
                                                                                                            "Huyện Diễn Châu": [
                                                                                                                "Thị trấn Diễn Châu",
                                                                                                                "Xã Diễn Mỹ",
                                                                                                                "Xã Diễn Kim",
                                                                                                                "Xã Diễn Tháp",
                                                                                                                "Xã Diễn Ngọc",
                                                                                                                "Xã Diễn Hoa"
                                                                                                            ],
                                                                                                            "Huyện Yên Thành": [
                                                                                                                "Thị trấn Yên Thành",
                                                                                                                "Xã Hồng Thành",
                                                                                                                "Xã Liên Thành",
                                                                                                                "Xã Tăng Thành",
                                                                                                                "Xã Lăng Thành",
                                                                                                                "Xã Đức Thành"
                                                                                                            ],
                                                                                                            "Huyện Nam Đàn": [
                                                                                                                "Thị trấn Nam Đàn",
                                                                                                                "Xã Nam Nghĩa",
                                                                                                                "Xã Nam Giang",
                                                                                                                "Xã Hùng Tiến",
                                                                                                                "Xã Xuân Hòa",
                                                                                                                "Xã Khánh Hợp"
                                                                                                            ],
                                                                                                            "Huyện Hưng Nguyên": [
                                                                                                                "Thị trấn Hưng Nguyên",
                                                                                                                "Xã Hưng Tây",
                                                                                                                "Xã Hưng Yên",
                                                                                                                "Xã Hưng Trung",
                                                                                                                "Xã Hưng Đông",
                                                                                                                "Xã Hưng Thịnh"
                                                                                                            ],
                                                                                                            "Huyện Quế Phong": [
                                                                                                                "Thị trấn Quế Phong",
                                                                                                                "Xã Quế Sơn",
                                                                                                                "Xã Thông Thụ",
                                                                                                                "Xã Tiền Phong",
                                                                                                                "Xã Cắm Muộn",
                                                                                                                "Xã Nậm Giải"
                                                                                                            ],
                                                                                                            "Huyện Con Cuông": [
                                                                                                                "Thị trấn Con Cuông",
                                                                                                                "Xã Bồng Khê",
                                                                                                                "Xã Lục Dạ",
                                                                                                                "Xã Chi Khê",
                                                                                                                "Xã Mậu Đức",
                                                                                                                "Xã Đôn Phục"
                                                                                                            ],
                                                                                                            "Huyện Tân Kỳ": [
                                                                                                                "Thị trấn Tân Kỳ",
                                                                                                                "Xã Tân Hợp",
                                                                                                                "Xã Tân An",
                                                                                                                "Xã Tân Phú",
                                                                                                                "Xã Tân Thắng",
                                                                                                                "Xã Tân Xuân"
                                                                                                            ],
                                                                                                            "Huyện Kỳ Sơn": [
                                                                                                                "Thị trấn Mường Xén",
                                                                                                                "Xã Hữu Kiệm",
                                                                                                                "Xã Hữu Lập",
                                                                                                                "Xã Chiêu Lưu",
                                                                                                                "Xã Mường Típ",
                                                                                                                "Xã Tà Cạ"
                                                                                                            ],
                                                                                                            "Huyện Đô Lương": [
                                                                                                                "Thị trấn Đô Lương",
                                                                                                                "Xã Đặng Sơn",
                                                                                                                "Xã Ngọc Giai",
                                                                                                                "Xã Lạc Sơn",
                                                                                                                "Xã Minh Sơn",
                                                                                                                "Xã Hòa Sơn"
                                                                                                            ],
                                                                                                            "Huyện Bố Trạch": [
                                                                                                                "Thị trấn Bố Trạch",
                                                                                                                "Xã Phú Phong",
                                                                                                                "Xã Phú Hữu",
                                                                                                                "Xã Phú Nghĩa",
                                                                                                                "Xã Phú Xuân",
                                                                                                                "Xã Phú Quý"
                                                                                                            ],
                                                                                                            "Huyện Thanh Trì": [
                                                                                                                "Thị trấn Thanh Trì",
                                                                                                                "Xã Thanh Hòa",
                                                                                                                "Xã Thanh Nguyên",
                                                                                                                "Xã Thanh Liên",
                                                                                                                "Xã Thanh Sơn",
                                                                                                                "Xã Thanh Dương"
                                                                                                            ]
                                                                                                        },
                                                                                                        
                                                                                                            "Hà Tĩnh": {
                                                                                                                "Thành phố Hà Tĩnh": [
                                                                                                                    "Phường Bắc Hà",
                                                                                                                    "Phường Nam Hà",
                                                                                                                    "Phường Hà Huy Tập",
                                                                                                                    "Phường Đại Nài",
                                                                                                                    "Phường Thạch Linh",
                                                                                                                    "Phường Trần Phú",
                                                                                                                    "Phường Tân Giang",
                                                                                                                    "Xã Thạch Trung",
                                                                                                                    "Xã Thạch Hạ",
                                                                                                                    "Xã Thạch Đồng"
                                                                                                                ],
                                                                                                                "Thị xã Kỳ Anh": [
                                                                                                                    "Phường Kỳ Phương",
                                                                                                                    "Phường Kỳ Long",
                                                                                                                    "Phường Kỳ Trinh",
                                                                                                                    "Phường Kỳ Thịnh",
                                                                                                                    "Xã Kỳ Ninh",
                                                                                                                    "Xã Kỳ Xuân"
                                                                                                                ],
                                                                                                                "Huyện Hương Sơn": [
                                                                                                                    "Thị trấn Phố Châu",
                                                                                                                    "Xã Sơn Tây",
                                                                                                                    "Xã Sơn Lễ",
                                                                                                                    "Xã Sơn Kim 1",
                                                                                                                    "Xã Sơn Kim 2",
                                                                                                                    "Xã Hòa Hải",
                                                                                                                    "Xã Hương Sơn"
                                                                                                                ],
                                                                                                                "Huyện Đức Thọ": [
                                                                                                                    "Thị trấn Đức Thọ",
                                                                                                                    "Xã Đậu Liêu",
                                                                                                                    "Xã Tùng Ảnh",
                                                                                                                    "Xã Trường Sơn",
                                                                                                                    "Xã Yên Hồ",
                                                                                                                    "Xã Bùi La Nhân"
                                                                                                                ],
                                                                                                                "Huyện Nghi Xuân": [
                                                                                                                    "Thị trấn Xuân An",
                                                                                                                    "Xã Xuân Hải",
                                                                                                                    "Xã Xuân Hội",
                                                                                                                    "Xã Xuân Giang",
                                                                                                                    "Xã Xuân Viên",
                                                                                                                    "Xã Xuân Yên"
                                                                                                                ],
                                                                                                                "Huyện Can Lộc": [
                                                                                                                    "Thị trấn Can Lộc",
                                                                                                                    "Xã Thường Nga",
                                                                                                                    "Xã Vượng Lộc",
                                                                                                                    "Xã Hương Lạc",
                                                                                                                    "Xã Khánh Lộc",
                                                                                                                    "Xã Yên Lộc"
                                                                                                                ],
                                                                                                                "Huyện Thạch Hà": [
                                                                                                                    "Thị trấn Thạch Hà",
                                                                                                                    "Xã Thạch Kênh",
                                                                                                                    "Xã Thạch Khê",
                                                                                                                    "Xã Thạch Đài",
                                                                                                                    "Xã Thạch Xuân",
                                                                                                                    "Xã Thạch Bình"
                                                                                                                ],
                                                                                                                "Huyện Lộc Hà": [
                                                                                                                    "Thị trấn Lộc Hà",
                                                                                                                    "Xã Thạch Bằng",
                                                                                                                    "Xã Hộ Độ",
                                                                                                                    "Xã Tân Lộc",
                                                                                                                    "Xã Bình Lộc",
                                                                                                                    "Xã Mai Phụ"
                                                                                                                ],
                                                                                                                "Huyện Vũ Quang": [
                                                                                                                    "Thị trấn Vũ Quang",
                                                                                                                    "Xã Đức Giang",
                                                                                                                    "Xã Đức Bồng",
                                                                                                                    "Xã Hương Điền",
                                                                                                                    "Xã Hương Quang",
                                                                                                                    "Xã Quang Thọ"
                                                                                                                ],
                                                                                                                "Huyện Hương Khê": [
                                                                                                                    "Thị trấn Hương Khê",
                                                                                                                    "Xã Hương Giang",
                                                                                                                    "Xã Hương Trạch",
                                                                                                                    "Xã Hương Thủy",
                                                                                                                    "Xã Hương Bình",
                                                                                                                    "Xã Hương Lâm"
                                                                                                                ],
                                                                                                                "Huyện Cẩm Xuyên": [
                                                                                                                    "Thị trấn Cẩm Xuyên",
                                                                                                                    "Xã Cẩm Duệ",
                                                                                                                    "Xã Cẩm Sơn",
                                                                                                                    "Xã Cẩm Hưng",
                                                                                                                    "Xã Cẩm Mỹ",
                                                                                                                    "Xã Cẩm Bình"
                                                                                                                ],
                                                                                                                "Huyện Kỳ Anh": [
                                                                                                                    "Thị trấn Kỳ Anh",
                                                                                                                    "Xã Kỳ Nam",
                                                                                                                    "Xã Kỳ Bắc",
                                                                                                                    "Xã Kỳ Hải",
                                                                                                                    "Xã Kỳ Thịnh",
                                                                                                                    "Xã Kỳ Phú"
                                                                                                                ]
                                                                                                            },
                                                                                                            
                                                                                                                "Quảng Bình": {
                                                                                                                    "Thành phố Đồng Hới": [
                                                                                                                        "Phường Hải Thành",
                                                                                                                        "Phường Phú Hải",
                                                                                                                        "Phường Bắc Lý",
                                                                                                                        "Phường Đồng Phú",
                                                                                                                        "Phường Nam Lý",
                                                                                                                        "Phường Đức Ninh Đông",
                                                                                                                        "Phường Đức Ninh",
                                                                                                                        "Xã Nghĩa Ninh",
                                                                                                                        "Xã Bảo Ninh",
                                                                                                                        "Xã Lộc Ninh"
                                                                                                                    ],
                                                                                                                    "Thị xã Ba Đồn": [
                                                                                                                        "Phường Ba Đồn",
                                                                                                                        "Phường Quảng Long",
                                                                                                                        "Xã Quảng Minh",
                                                                                                                        "Xã Quảng Hải",
                                                                                                                        "Xã Quảng Thọ",
                                                                                                                        "Xã Quảng Trạch"
                                                                                                                    ],
                                                                                                                    "Huyện Minh Hóa": [
                                                                                                                        "Thị trấn Quy Đạt",
                                                                                                                        "Xã Hóa Sơn",
                                                                                                                        "Xã Hóa Quỳ",
                                                                                                                        "Xã Hóa Tiến",
                                                                                                                        "Xã Hóa Phúc",
                                                                                                                        "Xã Hóa Tân",
                                                                                                                        "Xã Hóa Thành"
                                                                                                                    ],
                                                                                                                    "Huyện Tuyên Hóa": [
                                                                                                                        "Thị trấn Đồng Lê",
                                                                                                                        "Xã Thanh Thạch",
                                                                                                                        "Xã Tân Thủy",
                                                                                                                        "Xã Thạch Hóa",
                                                                                                                        "Xã Liên Hòa",
                                                                                                                        "Xã Văn Hóa",
                                                                                                                        "Xã Hương Hóa"
                                                                                                                    ],
                                                                                                                    "Huyện Quảng Trạch": [
                                                                                                                        "Thị trấn Quảng Trạch",
                                                                                                                        "Xã Cảnh Hóa",
                                                                                                                        "Xã Quảng Hòa",
                                                                                                                        "Xã Quảng Phú",
                                                                                                                        "Xã Quảng Tiến",
                                                                                                                        "Xã Quảng Tân"
                                                                                                                    ],
                                                                                                                    "Huyện Bố Trạch": [
                                                                                                                        "Thị trấn Hoàn Lão",
                                                                                                                        "Xã Bắc Trạch",
                                                                                                                        "Xã Nam Trạch",
                                                                                                                        "Xã Sơn Trạch",
                                                                                                                        "Xã Tân Trạch",
                                                                                                                        "Xã Phú Trạch"
                                                                                                                    ],
                                                                                                                    "Huyện Lệ Thủy": [
                                                                                                                        "Thị trấn Kiến Giang",
                                                                                                                        "Xã Lộc Thủy",
                                                                                                                        "Xã Phong Thủy",
                                                                                                                        "Xã Mai Thủy",
                                                                                                                        "Xã Hưng Thủy",
                                                                                                                        "Xã An Thủy"
                                                                                                                    ],
                                                                                                                    "Huyện Quảng Ninh": [
                                                                                                                        "Thị trấn Quảng Ninh",
                                                                                                                        "Xã Trường Sơn",
                                                                                                                        "Xã Trung Sơn",
                                                                                                                        "Xã Dân Hóa",
                                                                                                                        "Xã Thượng Hóa"
                                                                                                                    ]
                                                                                                                },
                                                                                                                
                                                                                                                    "Quảng Trị": {
                                                                                                                        "Thành phố Đông Hà": [
                                                                                                                            "Phường 1",
                                                                                                                            "Phường 2",
                                                                                                                            "Phường 3",
                                                                                                                            "Phường 4",
                                                                                                                            "Phường Đông Lễ",
                                                                                                                            "Phường Hoà Bình",
                                                                                                                            "Xã Hải Lệ"
                                                                                                                        ],
                                                                                                                        "Thị xã Quảng Trị": [
                                                                                                                            "Thị trấn Quảng Trị",
                                                                                                                            "Xã Hải Thọ",
                                                                                                                            "Xã Hải Quy",
                                                                                                                            "Xã Hải Dương",
                                                                                                                            "Xã Hải Sơn",
                                                                                                                            "Xã Hải Xuân",
                                                                                                                            "Xã Hải Khê"
                                                                                                                        ],
                                                                                                                        "Huyện Vĩnh Linh": [
                                                                                                                            "Thị trấn Vĩnh Linh",
                                                                                                                            "Xã Vĩnh Thái",
                                                                                                                            "Xã Vĩnh Kim",
                                                                                                                            "Xã Vĩnh Sơn",
                                                                                                                            "Xã Vĩnh Tân",
                                                                                                                            "Xã Vĩnh Long",
                                                                                                                            "Xã Vĩnh Hòa",
                                                                                                                            "Xã Vĩnh Giang",
                                                                                                                            "Xã Vĩnh Quang"
                                                                                                                        ],
                                                                                                                        "Huyện Gio Linh": [
                                                                                                                            "Thị trấn Gio Linh",
                                                                                                                            "Xã Gio An",
                                                                                                                            "Xã Gio Hải",
                                                                                                                            "Xã Gio Châu",
                                                                                                                            "Xã Gio Linh",
                                                                                                                            "Xã Gio Mỹ"
                                                                                                                        ],
                                                                                                                        "Huyện Cam Lộ": [
                                                                                                                            "Thị trấn Cam Lộ",
                                                                                                                            "Xã Cam Thành",
                                                                                                                            "Xã Cam Hiếu",
                                                                                                                            "Xã Cam Tuyền",
                                                                                                                            "Xã Cam An",
                                                                                                                            "Xã Cam Nghĩa"
                                                                                                                        ],
                                                                                                                        "Huyện Đăk Rông": [
                                                                                                                            "Thị trấn Đăk Rông",
                                                                                                                            "Xã Hướng Hiệp",
                                                                                                                            "Xã Đăk Rông",
                                                                                                                            "Xã Ba Lòng",
                                                                                                                            "Xã A Bung",
                                                                                                                            "Xã Hướng Lập",
                                                                                                                            "Xã A Vao"
                                                                                                                        ],
                                                                                                                        "Huyện Triệu Phong": [
                                                                                                                            "Thị trấn Triệu Phong",
                                                                                                                            "Xã Triệu Đài",
                                                                                                                            "Xã Triệu Trạch",
                                                                                                                            "Xã Triệu Vân",
                                                                                                                            "Xã Triệu Hòa",
                                                                                                                            "Xã Triệu Thành"
                                                                                                                        ],
                                                                                                                        "Huyện Hải Lăng": [
                                                                                                                            "Thị trấn Hải Lăng",
                                                                                                                            "Xã Hải Quế",
                                                                                                                            "Xã Hải Xuân",
                                                                                                                            "Xã Hải Thượng",
                                                                                                                            "Xã Hải Định"
                                                                                                                        ],
                                                                                                                        "Huyện Bắc Trạch": [
                                                                                                                            "Thị trấn Cửa Việt",
                                                                                                                            "Xã Cửa Tùng",
                                                                                                                            "Xã Hải Phú",
                                                                                                                            "Xã Hải Trạch",
                                                                                                                            "Xã Hải Khê"
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    
                                                                                                                        "Thừa Thiên Huế": {
                                                                                                                            "Thành phố Huế": [
                                                                                                                                "Phường Thuận Hòa",
                                                                                                                                "Phường Phú Nhuận",
                                                                                                                                "Phường Vỹ Dạ",
                                                                                                                                "Phường Phú Hội",
                                                                                                                                "Phường Hương Long",
                                                                                                                                "Phường An Cựu",
                                                                                                                                "Phường Hương Sơ",
                                                                                                                                "Phường Xuân Phú",
                                                                                                                                "Phường Kim Long",
                                                                                                                                "Phường Phú Bình",
                                                                                                                                "Phường Phú Thượng",
                                                                                                                                "Phường Hương Vinh",
                                                                                                                                "Phường An Tây",
                                                                                                                                "Phường Tây Lộc"
                                                                                                                            ],
                                                                                                                            "Huyện A Lưới": [
                                                                                                                                "Thị trấn A Lưới",
                                                                                                                                "Xã A Ngo",
                                                                                                                                "Xã A Roàng",
                                                                                                                                "Xã Hồng Thái",
                                                                                                                                "Xã Hồng Trung",
                                                                                                                                "Xã Hồng Kim",
                                                                                                                                "Xã Hồng Quảng",
                                                                                                                                "Xã Hồng Vân",
                                                                                                                                "Xã Đông Sơn",
                                                                                                                                "Xã Hương Nguyên"
                                                                                                                            ],
                                                                                                                            "Huyện Hương Thủy": [
                                                                                                                                "Thị trấn Phú Bài",
                                                                                                                                "Xã Thủy Bằng",
                                                                                                                                "Xã Thủy Châu",
                                                                                                                                "Xã Thủy Vân",
                                                                                                                                "Xã Thủy Dương",
                                                                                                                                "Xã Thủy Thanh",
                                                                                                                                "Xã Thủy Lương",
                                                                                                                                "Xã Thủy Phương"
                                                                                                                            ],
                                                                                                                            "Huyện Hương Trà": [
                                                                                                                                "Thị trấn Hương Trà",
                                                                                                                                "Xã Hương Văn",
                                                                                                                                "Xã Hương Vinh",
                                                                                                                                "Xã Hương Điền",
                                                                                                                                "Xã Hương Hồ",
                                                                                                                                "Xã Hương Bình",
                                                                                                                                "Xã Hương Thọ",
                                                                                                                                "Xã Hương An"
                                                                                                                            ],
                                                                                                                            "Huyện Phong Điền": [
                                                                                                                                "Thị trấn Phong Điền",
                                                                                                                                "Xã Điền Hòa",
                                                                                                                                "Xã Điền Môn",
                                                                                                                                "Xã Điền Lộc",
                                                                                                                                "Xã Phong Hòa",
                                                                                                                                "Xã Phong An",
                                                                                                                                "Xã Phong Bình",
                                                                                                                                "Xã Phong Mỹ"
                                                                                                                            ],
                                                                                                                            "Huyện Quảng Điền": [
                                                                                                                                "Thị trấn Sịa",
                                                                                                                                "Xã Quảng Thái",
                                                                                                                                "Xã Quảng Thành",
                                                                                                                                "Xã Quảng Ngạn",
                                                                                                                                "Xã Quảng Vinh",
                                                                                                                                "Xã Quảng Phú",
                                                                                                                                "Xã Quảng An"
                                                                                                                            ],
                                                                                                                            "Huyện Nam Đông": [
                                                                                                                                "Thị trấn Khe Tre",
                                                                                                                                "Xã Hương Sơn",
                                                                                                                                "Xã Hương Lâm",
                                                                                                                                "Xã Hương Hữu",
                                                                                                                                "Xã Hương Xuân"
                                                                                                                            ]
                                                                                                                        
                                                                                                                    },
                                                                                                                    
                                                                                                                        "Đà Nẵng": {
                                                                                                                            "Quận Hải Châu": [
                                                                                                                                "Phường Bình Thuận",
                                                                                                                                "Phường Hòa Cường Bắc",
                                                                                                                                "Phường Hòa Cường Nam",
                                                                                                                                "Phường Hòa Khánh Bắc",
                                                                                                                                "Phường Hòa Khánh Nam",
                                                                                                                                "Phường Nam Dương",
                                                                                                                                "Phường Thanh Bình",
                                                                                                                                "Phường Thạch Thang",
                                                                                                                                "Phường Trần Phú",
                                                                                                                                "Phường Vĩnh Trung",
                                                                                                                                "Phường Phước Ninh",
                                                                                                                                "Phường Chính Gián",
                                                                                                                                "Phường Hòa Thuận Tây",
                                                                                                                                "Phường Hòa Thuận Đông"
                                                                                                                            ],
                                                                                                                            "Quận Thanh Khê": [
                                                                                                                                "Phường An Khê",
                                                                                                                                "Phường Chính Gián",
                                                                                                                                "Phường Hòa Khê",
                                                                                                                                "Phường Hòa Khánh Bắc",
                                                                                                                                "Phường Tam Thuận",
                                                                                                                                "Phường Tân Chính",
                                                                                                                                "Phường Thạc Gián",
                                                                                                                                "Phường Xuân Hà"
                                                                                                                            ],
                                                                                                                            "Quận Liên Chiểu": [
                                                                                                                                "Phường Hòa Minh",
                                                                                                                                "Phường Khuê Trung",
                                                                                                                                "Phường Thanh Kê",
                                                                                                                                "Phường Tân Lập",
                                                                                                                                "Phường Liên Chiểu",
                                                                                                                                "Phường Hòa Hiệp Bắc",
                                                                                                                                "Phường Hòa Hiệp Nam",
                                                                                                                                "Phường Hòa Xuân"
                                                                                                                            ],
                                                                                                                            "Quận Ngũ Hành Sơn": [
                                                                                                                                "Phường Hòa Hải",
                                                                                                                                "Phường Hòa Quý",
                                                                                                                                "Phường Khuê Mỹ",
                                                                                                                                "Phường Mỹ An",
                                                                                                                                "Phường Mỹ Khê",
                                                                                                                                "Phường Non Nước",
                                                                                                                                "Phường Vĩnh Hòa"
                                                                                                                            ],
                                                                                                                            "Quận Sơn Trà": [
                                                                                                                                "Phường An Hải Bắc",
                                                                                                                                "Phường An Hải Tây",
                                                                                                                                "Phường Thọ Quang",
                                                                                                                                "Phường Phước Mỹ",
                                                                                                                                "Phường Mân Thái",
                                                                                                                                "Phường Nại Hiên Đông",
                                                                                                                                "Phường Mỹ An"
                                                                                                                            ],
                                                                                                                            "Huyện Hoàng Sa": [
                                                                                                                                "Thị trấn Đà Nẵng",
                                                                                                                                "Xã Bắc Mỹ An",
                                                                                                                                "Xã Nam Mỹ An"
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        
                                                                                                                            "Quảng Nam": {
                                                                                                                                "Thành phố Tam Kỳ": [
                                                                                                                                    "Phường An Mỹ",
                                                                                                                                    "Phường An Sơn",
                                                                                                                                    "Phường Hòa Hương",
                                                                                                                                    "Phường Hòa Thuận",
                                                                                                                                    "Phường Tân Thạnh",
                                                                                                                                    "Phường Tân An",
                                                                                                                                    "Phường Phước Hòa",
                                                                                                                                    "Xã Tam Thanh",
                                                                                                                                    "Xã Tam Thăng"
                                                                                                                                ],
                                                                                                                                "Thành phố Hội An": [
                                                                                                                                    "Phường Cẩm An",
                                                                                                                                    "Phường Cẩm Nam",
                                                                                                                                    "Phường Cẩm Phô",
                                                                                                                                    "Phường Minh An",
                                                                                                                                    "Phường Sơn Phô",
                                                                                                                                    "Phường Thanh Hà",
                                                                                                                                    "Phường Tân An",
                                                                                                                                    "Phường Trần Phú",
                                                                                                                                    "Phường Hòa Hải",
                                                                                                                                    "Xã Cẩm Hà"
                                                                                                                                ],
                                                                                                                                "Huyện Bắc Trà My": [
                                                                                                                                    "Thị trấn Trà My",
                                                                                                                                    "Xã Bình Lâm",
                                                                                                                                    "Xã Bình Trung",
                                                                                                                                    "Xã Trà Giang",
                                                                                                                                    "Xã Trà Dương",
                                                                                                                                    "Xã Trà Tân",
                                                                                                                                    "Xã Trà Sơn",
                                                                                                                                    "Xã Trà Đốc"
                                                                                                                                ],
                                                                                                                                "Huyện Đông Giang": [
                                                                                                                                    "Thị trấn Đông Giang",
                                                                                                                                    "Xã Ba",
                                                                                                                                    "Xã Cà Dy",
                                                                                                                                    "Xã Đắc Pring",
                                                                                                                                    "Xã Tư",
                                                                                                                                    "Xã A Nông",
                                                                                                                                    "Xã A Tiêng",
                                                                                                                                    "Xã Jơ Ngây"
                                                                                                                                ],
                                                                                                                                "Huyện Đại Lộc": [
                                                                                                                                    "Thị trấn Ái Nghĩa",
                                                                                                                                    "Xã Đại An",
                                                                                                                                    "Xã Đại Bình",
                                                                                                                                    "Xã Đại Hiệp",
                                                                                                                                    "Xã Đại Hưng",
                                                                                                                                    "Xã Đại Nghĩa",
                                                                                                                                    "Xã Đại Lãnh",
                                                                                                                                    "Xã Đại Phong"
                                                                                                                                ],
                                                                                                                                "Huyện Duy Xuyên": [
                                                                                                                                    "Thị trấn Nam Phước",
                                                                                                                                    "Xã Duy Châu",
                                                                                                                                    "Xã Duy Hải",
                                                                                                                                    "Xã Duy Nghĩa",
                                                                                                                                    "Xã Duy Sơn",
                                                                                                                                    "Xã Duy Tân",
                                                                                                                                    "Xã Duy Thành",
                                                                                                                                    "Xã Duy Hòa"
                                                                                                                                ],
                                                                                                                                "Huyện Phú Ninh": [
                                                                                                                                    "Thị trấn Phú Thịnh",
                                                                                                                                    "Xã Tam Phú",
                                                                                                                                    "Xã Tam Lãnh",
                                                                                                                                    "Xã Tam Thành",
                                                                                                                                    "Xã Tam Dân",
                                                                                                                                    "Xã Tam Đàn"
                                                                                                                                ],
                                                                                                                                "Huyện Thăng Bình": [
                                                                                                                                    "Thị trấn Thăng Bình",
                                                                                                                                    "Xã Bình Định Bắc",
                                                                                                                                    "Xã Bình Trung",
                                                                                                                                    "Xã Bình Phú",
                                                                                                                                    "Xã Bình Hải",
                                                                                                                                    "Xã Bình Quý",
                                                                                                                                    "Xã Bình Triều"
                                                                                                                                ],
                                                                                                                                "Huyện Núi Thành": [
                                                                                                                                    "Thị trấn Núi Thành",
                                                                                                                                    "Xã Tam Tiến",
                                                                                                                                    "Xã Tam Mỹ Đông",
                                                                                                                                    "Xã Tam Mỹ Tây",
                                                                                                                                    "Xã Tam Thái",
                                                                                                                                    "Xã Tam Quan",
                                                                                                                                    "Xã Tam Trà"
                                                                                                                                ],
                                                                                                                                "Huyện Quế Sơn": [
                                                                                                                                    "Thị trấn Đông Phú",
                                                                                                                                    "Xã Quế Mỹ",
                                                                                                                                    "Xã Quế Long",
                                                                                                                                    "Xã Quế Phú",
                                                                                                                                    "Xã Quế Châu",
                                                                                                                                    "Xã Quế Hương"
                                                                                                                                ],
                                                                                                                                "Huyện Tiên Phước": [
                                                                                                                                    "Thị trấn Tiên Kỳ",
                                                                                                                                    "Xã Tiên Cảnh",
                                                                                                                                    "Xã Tiên Hiệp",
                                                                                                                                    "Xã Tiên Lập",
                                                                                                                                    "Xã Tiên Phong"
                                                                                                                                ]
                                                                                                                            },
                                                                                                                            
                                                                                                                                "Quảng Ngãi": {
                                                                                                                                    "Thành phố Quảng Ngãi": [
                                                                                                                                        "Phường Trần Hưng Đạo",
                                                                                                                                        "Phường Nguyễn Nghiêm",
                                                                                                                                        "Phường Lê Lợi",
                                                                                                                                        "Phường Quảng Phú",
                                                                                                                                        "Phường Nghĩa Chánh",
                                                                                                                                        "Phường Chánh Lộ",
                                                                                                                                        "Phường Tân Bình",
                                                                                                                                        "Xã Tịnh Ấn Tây",
                                                                                                                                        "Xã Tịnh Ấn Đông",
                                                                                                                                        "Xã Tịnh Khê",
                                                                                                                                        "Xã Nghĩa Dõng",
                                                                                                                                        "Xã Nghĩa Phú",
                                                                                                                                        "Xã Nghĩa An",
                                                                                                                                        "Xã Tịnh Long"
                                                                                                                                    ],
                                                                                                                                    "Huyện Bình Sơn": [
                                                                                                                                        "Thị trấn Bình Sơn",
                                                                                                                                        "Xã Bình Châu",
                                                                                                                                        "Xã Bình Hải",
                                                                                                                                        "Xã Bình Phú",
                                                                                                                                        "Xã Bình Nguyên",
                                                                                                                                        "Xã Bình Tân",
                                                                                                                                        "Xã Bình Thuận",
                                                                                                                                        "Xã Bình Đông",
                                                                                                                                        "Xã Bình Hòa",
                                                                                                                                        "Xã Bình Trị",
                                                                                                                                        "Xã Bình Minh"
                                                                                                                                    ],
                                                                                                                                    "Huyện Trà Bồng": [
                                                                                                                                        "Thị trấn Trà Bồng",
                                                                                                                                        "Xã Trà Phong",
                                                                                                                                        "Xã Trà Tân",
                                                                                                                                        "Xã Trà Sơn",
                                                                                                                                        "Xã Trà Giang",
                                                                                                                                        "Xã Trà Xuân",
                                                                                                                                        "Xã Trà Lâm"
                                                                                                                                    ],
                                                                                                                                    "Huyện Tư Nghĩa": [
                                                                                                                                        "Thị trấn La Hà",
                                                                                                                                        "Xã Nghĩa Điền",
                                                                                                                                        "Xã Nghĩa An",
                                                                                                                                        "Xã Nghĩa Kỳ",
                                                                                                                                        "Xã Nghĩa Thắng",
                                                                                                                                        "Xã Nghĩa Phú",
                                                                                                                                        "Xã Nghĩa Hiệp"
                                                                                                                                    ],
                                                                                                                                    "Huyện Sơn Tịnh": [
                                                                                                                                        "Thị trấn Sơn Tịnh",
                                                                                                                                        "Xã Tịnh Bắc",
                                                                                                                                        "Xã Tịnh Đông",
                                                                                                                                        "Xã Tịnh Kỳ",
                                                                                                                                        "Xã Tịnh Hà",
                                                                                                                                        "Xã Tịnh Long",
                                                                                                                                        "Xã Tịnh Khê"
                                                                                                                                    ],
                                                                                                                                    "Huyện Đức Phổ": [
                                                                                                                                        "Thị trấn Đức Phổ",
                                                                                                                                        "Xã Phổ Thạnh",
                                                                                                                                        "Xã Phổ Văn",
                                                                                                                                        "Xã Phổ Khánh",
                                                                                                                                        "Xã Phổ Minh",
                                                                                                                                        "Xã Phổ Cường",
                                                                                                                                        "Xã Phổ Châu"
                                                                                                                                    ],
                                                                                                                                    "Huyện Mộ Đức": [
                                                                                                                                        "Thị trấn Mộ Đức",
                                                                                                                                        "Xã Đức Nhuận",
                                                                                                                                        "Xã Đức Thắng",
                                                                                                                                        "Xã Đức Phú",
                                                                                                                                        "Xã Đức Lợi",
                                                                                                                                        "Xã Đức Hiệp",
                                                                                                                                        "Xã Đức Chánh"
                                                                                                                                    ],
                                                                                                                                    "Huyện Nghĩa Hành": [
                                                                                                                                        "Thị trấn Chợ Chùa",
                                                                                                                                        "Xã Nghĩa Kỳ",
                                                                                                                                        "Xã Nghĩa Mỹ",
                                                                                                                                        "Xã Nghĩa Thắng",
                                                                                                                                        "Xã Nghĩa An"
                                                                                                                                    ],
                                                                                                                                    "Huyện Ba Tơ": [
                                                                                                                                        "Thị trấn Ba Tơ",
                                                                                                                                        "Xã Ba Vì",
                                                                                                                                        "Xã Ba Trang",
                                                                                                                                        "Xã Ba Tô",
                                                                                                                                        "Xã Ba Lế",
                                                                                                                                        "Xã Ba Khâm",
                                                                                                                                        "Xã Ba Giang"
                                                                                                                                    ],
                                                                                                                                    "Huyện Lý Sơn": [
                                                                                                                                        "Thị trấn Lý Sơn",
                                                                                                                                        "Xã An Hải",
                                                                                                                                        "Xã An Vĩnh"
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                
                                                                                                                                    "Bình Định": {
                                                                                                                                        "Thành phố Quy Nhơn": [
                                                                                                                                            "Phường Trần Phú",
                                                                                                                                            "Phường Lê Lợi",
                                                                                                                                            "Phường Nguyễn Văn Cừ",
                                                                                                                                            "Phường Nhơn Bình",
                                                                                                                                            "Phường Nhơn Phú",
                                                                                                                                            "Phường Đống Đa",
                                                                                                                                            "Phường Hải Cảng",
                                                                                                                                            "Phường Hoài Thanh Tây",
                                                                                                                                            "Xã Phước Mỹ",
                                                                                                                                            "Xã Nhơn Hội",
                                                                                                                                            "Phường Ghềnh Ráng",
                                                                                                                                            "Phường Xuân Hải",
                                                                                                                                            "Phường Tân Thanh"
                                                                                                                                        ],
                                                                                                                                        "Huyện An Lão": [
                                                                                                                                            "Thị trấn An Lão",
                                                                                                                                            "Xã An Nghĩa",
                                                                                                                                            "Xã An Vinh",
                                                                                                                                            "Xã An Hòa",
                                                                                                                                            "Xã An Tín",
                                                                                                                                            "Xã An Trung",
                                                                                                                                            "Xã An Khê",
                                                                                                                                            "Xã An Xuân"
                                                                                                                                        ],
                                                                                                                                        "Huyện Hoài Nhơn": [
                                                                                                                                            "Thị trấn Hoài Nhơn",
                                                                                                                                            "Xã Hoài Châu",
                                                                                                                                            "Xã Hoài Hảo",
                                                                                                                                            "Xã Hoài Phú",
                                                                                                                                            "Xã Hoài Mỹ",
                                                                                                                                            "Xã Hoài Thanh",
                                                                                                                                            "Xã Hoài Thanh Tây",
                                                                                                                                            "Xã Hoài Hải",
                                                                                                                                            "Xã Hoài Sơn"
                                                                                                                                        ],
                                                                                                                                        "Huyện Phù Mỹ": [
                                                                                                                                            "Thị trấn Phù Mỹ",
                                                                                                                                            "Xã Mỹ Hòa",
                                                                                                                                            "Xã Mỹ Châu",
                                                                                                                                            "Xã Mỹ Đức",
                                                                                                                                            "Xã Mỹ Thọ",
                                                                                                                                            "Xã Mỹ An",
                                                                                                                                            "Xã Mỹ Tài",
                                                                                                                                            "Xã Mỹ Lộc"
                                                                                                                                        ],
                                                                                                                                        "Huyện Vĩnh Thạnh": [
                                                                                                                                            "Thị trấn Vĩnh Thạnh",
                                                                                                                                            "Xã Vĩnh Hiệp",
                                                                                                                                            "Xã Vĩnh Kim",
                                                                                                                                            "Xã Vĩnh Thịnh",
                                                                                                                                            "Xã Vĩnh Thạnh",
                                                                                                                                            "Xã Vĩnh Thanh",
                                                                                                                                            "Xã Vĩnh Phú"
                                                                                                                                        ],
                                                                                                                                        "Huyện Tây Sơn": [
                                                                                                                                            "Thị trấn Phú Phong",
                                                                                                                                            "Xã Bình Tân",
                                                                                                                                            "Xã Tây Thuận",
                                                                                                                                            "Xã Tây An",
                                                                                                                                            "Xã Tây Giang",
                                                                                                                                            "Xã Tây Xuân",
                                                                                                                                            "Xã Tây Hòa"
                                                                                                                                        ],
                                                                                                                                        "Huyện An Nhơn": [
                                                                                                                                            "Thị trấn An Nhơn",
                                                                                                                                            "Xã Nhơn An",
                                                                                                                                            "Xã Nhơn Khánh",
                                                                                                                                            "Xã Nhơn Hậu",
                                                                                                                                            "Xã Nhơn Phúc",
                                                                                                                                            "Xã Nhơn Mỹ",
                                                                                                                                            "Xã Nhơn Thọ"
                                                                                                                                        ],
                                                                                                                                        "Huyện Tuy Phước": [
                                                                                                                                            "Thị trấn Tuy Phước",
                                                                                                                                            "Xã Phước Sơn",
                                                                                                                                            "Xã Phước Thuận",
                                                                                                                                            "Xã Phước Hòa",
                                                                                                                                            "Xã Phước Nghĩa",
                                                                                                                                            "Xã Phước An",
                                                                                                                                            "Xã Phước Lộc"
                                                                                                                                        ],
                                                                                                                                        "Huyện Hoài Ân": [
                                                                                                                                            "Thị trấn Hoài Ân",
                                                                                                                                            "Xã Ân Hảo Bắc",
                                                                                                                                            "Xã Ân Hảo Nam",
                                                                                                                                            "Xã Ân Tín",
                                                                                                                                            "Xã Ân Thạnh",
                                                                                                                                            "Xã Ân Mỹ",
                                                                                                                                            "Xã Ân Nghĩa"
                                                                                                                                        ],
                                                                                                                                        "Huyện Phù Cát": [
                                                                                                                                            "Thị trấn Ngô Mây",
                                                                                                                                            "Xã Cát Chánh",
                                                                                                                                            "Xã Cát Tiến",
                                                                                                                                            "Xã Cát Khánh",
                                                                                                                                            "Xã Cát Hiệp",
                                                                                                                                            "Xã Cát Tài",
                                                                                                                                            "Xã Cát Lâm"
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                    
                                                                                                                                        "Phú Yên": {
                                                                                                                                            "Thành phố Tuy Hòa": [
                                                                                                                                                "Phường 1",
                                                                                                                                                "Phường 2",
                                                                                                                                                "Phường 3",
                                                                                                                                                "Phường 4",
                                                                                                                                                "Phường 5",
                                                                                                                                                "Phường 6",
                                                                                                                                                "Phường 7",
                                                                                                                                                "Phường 8",
                                                                                                                                                "Phường Phú Lâm",
                                                                                                                                                "Phường Xuân Phú",
                                                                                                                                                "Xã Bình Kiến",
                                                                                                                                                "Xã Hòa Hiệp Bắc",
                                                                                                                                                "Xã Hòa Hiệp Nam"
                                                                                                                                            ],
                                                                                                                                            "Huyện Tuy An": [
                                                                                                                                                "Thị trấn Chí Thạnh",
                                                                                                                                                "Xã An Chấn",
                                                                                                                                                "Xã An Dân",
                                                                                                                                                "Xã An Ninh",
                                                                                                                                                "Xã An Thạch",
                                                                                                                                                "Xã An Hòa",
                                                                                                                                                "Xã An Xuân",
                                                                                                                                                "Xã An Lĩnh",
                                                                                                                                                "Xã An Khánh"
                                                                                                                                            ],
                                                                                                                                            "Huyện Đồng Xuân": [
                                                                                                                                                "Thị trấn La Hai",
                                                                                                                                                "Xã Xuân Quang 1",
                                                                                                                                                "Xã Xuân Quang 2",
                                                                                                                                                "Xã Xuân Lãnh",
                                                                                                                                                "Xã Đồng Xuân",
                                                                                                                                                "Xã Phú Mỡ",
                                                                                                                                                "Xã Phú Yên"
                                                                                                                                            ],
                                                                                                                                            "Huyện Sông Hinh": [
                                                                                                                                                "Thị trấn Hai Riêng",
                                                                                                                                                "Xã Ea Bia",
                                                                                                                                                "Xã Ea Trol",
                                                                                                                                                "Xã Sông Hinh",
                                                                                                                                                "Xã Đức Bình Đông",
                                                                                                                                                "Xã Đức Bình Tây",
                                                                                                                                                "Xã Tây Hòa"
                                                                                                                                            ],
                                                                                                                                            "Huyện Tây Hòa": [
                                                                                                                                                "Thị trấn Phú Thứ",
                                                                                                                                                "Xã Hòa Mỹ Tây",
                                                                                                                                                "Xã Hòa Mỹ Đông",
                                                                                                                                                "Xã Hòa Thắng",
                                                                                                                                                "Xã Hòa Phong",
                                                                                                                                                "Xã Hòa Bình 1",
                                                                                                                                                "Xã Hòa Bình 2"
                                                                                                                                            ],
                                                                                                                                            "Huyện Phú Hòa": [
                                                                                                                                                "Thị trấn Phú Hòa",
                                                                                                                                                "Xã Hòa Phú",
                                                                                                                                                "Xã Hòa Trị",
                                                                                                                                                "Xã Hòa Thịnh",
                                                                                                                                                "Xã Hòa Quang Bắc",
                                                                                                                                                "Xã Hòa Quang Nam",
                                                                                                                                                "Xã Hòa An"
                                                                                                                                            ],
                                                                                                                                            "Huyện Sơn Hòa": [
                                                                                                                                                "Thị trấn Củng Sơn",
                                                                                                                                                "Xã Sơn Hội",
                                                                                                                                                "Xã Sơn Nguyên",
                                                                                                                                                "Xã Sơn Định",
                                                                                                                                                "Xã Sơn Long",
                                                                                                                                                "Xã Sơn Xuân",
                                                                                                                                                "Xã Sơn Hòa"
                                                                                                                                            ],
                                                                                                                                            "Huyện Tuy Hòa": [
                                                                                                                                                "Xã Hòa Vinh",
                                                                                                                                                "Xã Hòa Xuân Nam",
                                                                                                                                                "Xã Hòa Xuân Bắc"
                                                                                                                                            ]
                                                                                                                                        },
                                                                                                                                        
                                                                                                                                            "Khánh Hòa": {
                                                                                                                                                "Thành phố Nha Trang": [
                                                                                                                                                    "Phường Vĩnh Nguyên",
                                                                                                                                                    "Phường Vĩnh Trường",
                                                                                                                                                    "Phường Lộc Thọ",
                                                                                                                                                    "Phường Phước Tân",
                                                                                                                                                    "Phường Phước Hòa",
                                                                                                                                                    "Phường Phước Long",
                                                                                                                                                    "Phường Vĩnh Hải",
                                                                                                                                                    "Phường Xương Huân",
                                                                                                                                                    "Phường Tân Lập",
                                                                                                                                                    "Phường Lê Hồng Phong",
                                                                                                                                                    "Phường Ngọc Hiệp",
                                                                                                                                                    "Phường Đô Vinh",
                                                                                                                                                    "Phường Vĩnh Phước",
                                                                                                                                                    "Xã Vĩnh Thái",
                                                                                                                                                    "Xã Vĩnh Trung"
                                                                                                                                                ],
                                                                                                                                                "Huyện Cam Lâm": [
                                                                                                                                                    "Thị trấn Cam Đức",
                                                                                                                                                    "Xã Cam Hải Đông",
                                                                                                                                                    "Xã Cam Hải Tây",
                                                                                                                                                    "Xã Cam Tân",
                                                                                                                                                    "Xã Suối Tân",
                                                                                                                                                    "Xã Cam Thịnh Đông",
                                                                                                                                                    "Xã Cam Thịnh Tây"
                                                                                                                                                ],
                                                                                                                                                "Huyện Khánh Vĩnh": [
                                                                                                                                                    "Thị trấn Khánh Vĩnh",
                                                                                                                                                    "Xã Khánh Hiệp",
                                                                                                                                                    "Xã Khánh Thành",
                                                                                                                                                    "Xã Khánh Đông",
                                                                                                                                                    "Xã Khánh Vĩnh",
                                                                                                                                                    "Xã Khánh Nam",
                                                                                                                                                    "Xã Khánh Trung",
                                                                                                                                                    "Xã Liên Sang"
                                                                                                                                                ],
                                                                                                                                                "Huyện Ninh Hòa": [
                                                                                                                                                    "Thị trấn Ninh Hòa",
                                                                                                                                                    "Xã Ninh Sơn",
                                                                                                                                                    "Xã Ninh Tây",
                                                                                                                                                    "Xã Ninh Thọ",
                                                                                                                                                    "Xã Ninh Định",
                                                                                                                                                    "Xã Ninh Phụng",
                                                                                                                                                    "Xã Ninh Ích",
                                                                                                                                                    "Xã Ninh Quang",
                                                                                                                                                    "Xã Ninh Trung"
                                                                                                                                                ],
                                                                                                                                                "Huyện Diên Khánh": [
                                                                                                                                                    "Thị trấn Diên Khánh",
                                                                                                                                                    "Xã Diên Phú",
                                                                                                                                                    "Xã Diên Lạc",
                                                                                                                                                    "Xã Diên Toàn",
                                                                                                                                                    "Xã Diên Bình",
                                                                                                                                                    "Xã Diên Hòa",
                                                                                                                                                    "Xã Diên Xuân",
                                                                                                                                                    "Xã Diên Thọ"
                                                                                                                                                ],
                                                                                                                                                "Huyện Vạn Ninh": [
                                                                                                                                                    "Thị trấn Vạn Giã",
                                                                                                                                                    "Xã Vạn Thạnh",
                                                                                                                                                    "Xã Vạn Khánh",
                                                                                                                                                    "Xã Vạn Phước",
                                                                                                                                                    "Xã Vạn Lương",
                                                                                                                                                    "Xã Vạn Bình",
                                                                                                                                                    "Xã Vạn Hoa"
                                                                                                                                                ],
                                                                                                                                                "Huyện Trường Sa": [
                                                                                                                                                    "Thị trấn Trường Sa",
                                                                                                                                                    "Xã Song Tử Tây",
                                                                                                                                                    "Xã An Bang",
                                                                                                                                                    "Xã Sinh Tồn",
                                                                                                                                                    "Xã Trường Sa",
                                                                                                                                                    "Xã Đảo Nam Yết"
                                                                                                                                                ]
                                                                                                                                            },
                                                                                                                                        
                                                                                                                                            
                                                                                                                                                "Ninh Thuận": {
                                                                                                                                                    "Thành phố Phan Rang-Tháp Chàm": [
                                                                                                                                                        "Phường Phước Mỹ",
                                                                                                                                                        "Phường Đô Vinh",
                                                                                                                                                        "Phường Phước Hải",
                                                                                                                                                        "Phường Mỹ Hải",
                                                                                                                                                        "Phường Bảo An",
                                                                                                                                                        "Phường Thanh Sơn",
                                                                                                                                                        "Phường Tấn Hải",
                                                                                                                                                        "Xã Thành Hải",
                                                                                                                                                        "Xã Vĩnh Hải",
                                                                                                                                                        "Xã Phước Bình"
                                                                                                                                                    ],
                                                                                                                                                    "Huyện Ninh Hải": [
                                                                                                                                                        "Thị trấn Khánh Hải",
                                                                                                                                                        "Xã Nhơn Hải",
                                                                                                                                                        "Xã Vĩnh Hải",
                                                                                                                                                        "Xã Phương Hải",
                                                                                                                                                        "Xã Hộ Hải",
                                                                                                                                                        "Xã Đông Hải",
                                                                                                                                                        "Xã Ninh Hải"
                                                                                                                                                    ],
                                                                                                                                                    "Huyện Bác Ái": [
                                                                                                                                                        "Thị trấn Bác Ái",
                                                                                                                                                        "Xã Phước Bình",
                                                                                                                                                        "Xã Phước Kháng",
                                                                                                                                                        "Xã Phước Trung",
                                                                                                                                                        "Xã Phước Tiến",
                                                                                                                                                        "Xã Phước Đại",
                                                                                                                                                        "Xã Phước Nam"
                                                                                                                                                    ],
                                                                                                                                                    "Huyện Thuận Bắc": [
                                                                                                                                                        "Thị trấn Thiện Hải",
                                                                                                                                                        "Xã Bắc Sơn",
                                                                                                                                                        "Xã Bắc Phong",
                                                                                                                                                        "Xã Công Hải",
                                                                                                                                                        "Xã Hòa Sơn",
                                                                                                                                                        "Xã Vĩnh Hải"
                                                                                                                                                    ],
                                                                                                                                                    "Huyện Thuận Nam": [
                                                                                                                                                        "Thị trấn Mũi Né",
                                                                                                                                                        "Xã Phước Nam",
                                                                                                                                                        "Xã Phước Ninh",
                                                                                                                                                        "Xã Phước Diêm",
                                                                                                                                                        "Xã Phước Hải",
                                                                                                                                                        "Xã Phước Khánh"
                                                                                                                                                    ]
                                                                                                                                                },
                                                                                                                                                
                                                                                                                                                    "Bình Thuận": {
                                                                                                                                                        "Thành phố Phan Thiết": [
                                                                                                                                                            "Phường Phú Thủy",
                                                                                                                                                            "Phường Phú Tài",
                                                                                                                                                            "Phường Phú Hài",
                                                                                                                                                            "Phường Mũi Né",
                                                                                                                                                            "Phường Hàm Tiến",
                                                                                                                                                            "Phường Xuân An",
                                                                                                                                                            "Phường Lạc Đạo",
                                                                                                                                                            "Phường Thanh Hải",
                                                                                                                                                            "Xã Tiến Lợi",
                                                                                                                                                            "Xã Tiến Thành"
                                                                                                                                                        ],
                                                                                                                                                        "Huyện La Gi": [
                                                                                                                                                            "Thị trấn La Gi",
                                                                                                                                                            "Xã Tân Bình",
                                                                                                                                                            "Xã Tân Hải",
                                                                                                                                                            "Xã Tân An",
                                                                                                                                                            "Xã Tân Thắng",
                                                                                                                                                            "Xã Tân Phước",
                                                                                                                                                            "Xã Tân Hòa",
                                                                                                                                                            "Xã Tân Nghĩa"
                                                                                                                                                        ],
                                                                                                                                                        "Huyện Tuy Phong": [
                                                                                                                                                            "Thị trấn Tuy Phong",
                                                                                                                                                            "Xã Phú Quý",
                                                                                                                                                            "Xã Phú Mỹ",
                                                                                                                                                            "Xã Phú Hài",
                                                                                                                                                            "Xã Phú Tài",
                                                                                                                                                            "Xã Phú Thủy",
                                                                                                                                                            "Xã Hòa Minh"
                                                                                                                                                        ],
                                                                                                                                                        "Huyện Bắc Bình": [
                                                                                                                                                            "Thị trấn Chợ Lầu",
                                                                                                                                                            "Xã Hòa Thắng",
                                                                                                                                                            "Xã Hòa Phú",
                                                                                                                                                            "Xã Hòa Minh",
                                                                                                                                                            "Xã Hòa Lạc",
                                                                                                                                                            "Xã Hòa Bình",
                                                                                                                                                            "Xã Hòa Thạnh",
                                                                                                                                                            "Xã Hòa Phước"
                                                                                                                                                        ],
                                                                                                                                                        "Huyện Đức Linh": [
                                                                                                                                                            "Thị trấn Đức Tài",
                                                                                                                                                            "Xã Đức Hạnh",
                                                                                                                                                            "Xã Đức Bình",
                                                                                                                                                            "Xã Đức Liên",
                                                                                                                                                            "Xã Đức Hòa",
                                                                                                                                                            "Xã Đức Thuận",
                                                                                                                                                            "Xã Đức Thành"
                                                                                                                                                        ],
                                                                                                                                                        "Huyện Hàm Thuận Bắc": [
                                                                                                                                                            "Thị trấn Ma Lâm",
                                                                                                                                                            "Xã Hòa Nam",
                                                                                                                                                            "Xã Hòa Lạc",
                                                                                                                                                            "Xã Hòa Thắng",
                                                                                                                                                            "Xã Hòa Phú",
                                                                                                                                                            "Xã Hòa Bình"
                                                                                                                                                        ],
                                                                                                                                                        "Huyện Hàm Thuận Nam": [
                                                                                                                                                            "Thị trấn Phú Long",
                                                                                                                                                            "Xã Mũi Né",
                                                                                                                                                            "Xã Tân Thắng",
                                                                                                                                                            "Xã Tân Bình",
                                                                                                                                                            "Xã Tân Hòa"
                                                                                                                                                        ],
                                                                                                                                                        "Huyện Phú Quý": [
                                                                                                                                                            "Thị trấn Phú Quý",
                                                                                                                                                            "Xã Tam Thanh",
                                                                                                                                                            "Xã Long Hải",
                                                                                                                                                            "Xã Ngọc Vĩnh",
                                                                                                                                                            "Xã Ngọc Hiệp"
                                                                                                                                                        ]
                                                                                                                                                    },
                                                                                                                                                    
                                                                                                                                                        "Kon Tum": {
                                                                                                                                                            "Thành phố Kon Tum": [
                                                                                                                                                                "Phường Nguyễn Trãi",
                                                                                                                                                                "Phường Thắng Lợi",
                                                                                                                                                                "Phường Quang Trung",
                                                                                                                                                                "Phường Trường Chinh",
                                                                                                                                                                "Phường Lê Lợi",
                                                                                                                                                                "Phường Ngô Mây",
                                                                                                                                                                "Xã Đoàn Kết",
                                                                                                                                                                "Xã Vinh Quang",
                                                                                                                                                                "Xã Hòa Bình",
                                                                                                                                                                "Xã Ia Đal"
                                                                                                                                                            ],
                                                                                                                                                            "Huyện Đăk Glei": [
                                                                                                                                                                "Thị trấn Đăk Glei",
                                                                                                                                                                "Xã Đăk Long",
                                                                                                                                                                "Xã Đăk Man",
                                                                                                                                                                "Xã Đăk Pxi",
                                                                                                                                                                "Xã Đăk Nhoong",
                                                                                                                                                                "Xã Đăk Blà",
                                                                                                                                                                "Xã Đăk Hà",
                                                                                                                                                                "Xã Đăk Snghé"
                                                                                                                                                            ],
                                                                                                                                                            "Huyện Ngọc Hồi": [
                                                                                                                                                                "Thị trấn Plei Kần",
                                                                                                                                                                "Xã Đăk Kây",
                                                                                                                                                                "Xã Đăk Xú",
                                                                                                                                                                "Xã Đăk Nông",
                                                                                                                                                                "Xã Đăk Tờ Kan",
                                                                                                                                                                "Xã Đăk Dục",
                                                                                                                                                                "Xã Đăk Mốt",
                                                                                                                                                                "Xã Đăk Mô"
                                                                                                                                                            ],
                                                                                                                                                            "Huyện Kon Plông": [
                                                                                                                                                                "Thị trấn Măng Đen",
                                                                                                                                                                "Xã Đăk Ring",
                                                                                                                                                                "Xã Đăk Sờ Kom",
                                                                                                                                                                "Xã Hiếu",
                                                                                                                                                                "Xã Đăk Kơ Nia",
                                                                                                                                                                "Xã Pờ Y",
                                                                                                                                                                "Xã Đăk La",
                                                                                                                                                                "Xã Đăk Blà"
                                                                                                                                                            ],
                                                                                                                                                            "Huyện Kon Rẫy": [
                                                                                                                                                                "Thị trấn Đăk Song",
                                                                                                                                                                "Xã Đăk Ruồng",
                                                                                                                                                                "Xã Đăk Ring",
                                                                                                                                                                "Xã Đăk Tăng",
                                                                                                                                                                "Xã Đăk Kô",
                                                                                                                                                                "Xã Đăk Trí",
                                                                                                                                                                "Xã Đăk Lây"
                                                                                                                                                            ],
                                                                                                                                                            "Huyện Sa Thầy": [
                                                                                                                                                                "Thị trấn Sa Thầy",
                                                                                                                                                                "Xã Sa Bình",
                                                                                                                                                                "Xã Sa Nghĩa",
                                                                                                                                                                "Xã Sa Huỳnh",
                                                                                                                                                                "Xã Hơ Moong",
                                                                                                                                                                "Xã Rờ Kơi",
                                                                                                                                                                "Xã Đăk La"
                                                                                                                                                            ],
                                                                                                                                                            "Huyện Tu Mơ Rông": [
                                                                                                                                                                "Thị trấn Tu Mơ Rông",
                                                                                                                                                                "Xã Ngọc Wang",
                                                                                                                                                                "Xã Đăk Sông",
                                                                                                                                                                "Xã Tê Xăng",
                                                                                                                                                                "Xã Đăk Mút",
                                                                                                                                                                "Xã Đăk Pô",
                                                                                                                                                                "Xã Đăk Rê"
                                                                                                                                                            ]
                                                                                                                                                        },
                                                                                                                                                        
                                                                                                                                                            "Gia Lai": {
                                                                                                                                                                "Thành phố Pleiku": [
                                                                                                                                                                    "Phường Diên Hồng",
                                                                                                                                                                    "Phường Hội Thương",
                                                                                                                                                                    "Phường Tây Sơn",
                                                                                                                                                                    "Phường Trà Bá",
                                                                                                                                                                    "Phường Ia Kring",
                                                                                                                                                                    "Phường Yên Thế",
                                                                                                                                                                    "Phường Thống Nhất",
                                                                                                                                                                    "Phường Ngô Mây",
                                                                                                                                                                    "Xã Biển Hồ",
                                                                                                                                                                    "Xã Chư HDrông",
                                                                                                                                                                    "Xã Ia Kênh",
                                                                                                                                                                    "Xã Ia Yok"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện An Khê": [
                                                                                                                                                                    "Thị trấn An Khê",
                                                                                                                                                                    "Xã An Phú",
                                                                                                                                                                    "Xã Nghĩa An",
                                                                                                                                                                    "Xã Tây An",
                                                                                                                                                                    "Xã Xuân An",
                                                                                                                                                                    "Xã An Tân",
                                                                                                                                                                    "Xã Kim Tân",
                                                                                                                                                                    "Xã An Trung"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Chư Păh": [
                                                                                                                                                                    "Thị trấn Chư Păh",
                                                                                                                                                                    "Xã Ia Ka",
                                                                                                                                                                    "Xã Ia Mlah",
                                                                                                                                                                    "Xã Ia Nhin",
                                                                                                                                                                    "Xã Ia Mơ",
                                                                                                                                                                    "Xã Ia Hrung",
                                                                                                                                                                    "Xã Nghĩa Hòa"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Chư Sê": [
                                                                                                                                                                    "Thị trấn Chư Sê",
                                                                                                                                                                    "Xã Ayun Hạ",
                                                                                                                                                                    "Xã Chư Pui",
                                                                                                                                                                    "Xã Ia Blứ",
                                                                                                                                                                    "Xã Ia Pal",
                                                                                                                                                                    "Xã Ia Glai",
                                                                                                                                                                    "Xã H'Bông"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Đức Cơ": [
                                                                                                                                                                    "Thị trấn Đức Phổ",
                                                                                                                                                                    "Xã Ia Khai",
                                                                                                                                                                    "Xã Ia Dom",
                                                                                                                                                                    "Xã Ia Drăng",
                                                                                                                                                                    "Xã Ia Tô",
                                                                                                                                                                    "Xã Bờ Ngoong"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Mang Yang": [
                                                                                                                                                                    "Thị trấn Kon Gang",
                                                                                                                                                                    "Xã Đê Ar",
                                                                                                                                                                    "Xã Lơ Pang",
                                                                                                                                                                    "Xã Kông H’Ha",
                                                                                                                                                                    "Xã H’Bông",
                                                                                                                                                                    "Xã Phú Sơn"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Phú Thiện": [
                                                                                                                                                                    "Thị trấn Phú Thiện",
                                                                                                                                                                    "Xã Chư A Thai",
                                                                                                                                                                    "Xã Ia Mơ",
                                                                                                                                                                    "Xã Ia Mlah",
                                                                                                                                                                    "Xã Ia Púch",
                                                                                                                                                                    "Xã Ia Krai"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Kbang": [
                                                                                                                                                                    "Thị trấn Kbang",
                                                                                                                                                                    "Xã Krong",
                                                                                                                                                                    "Xã Lơ Ku",
                                                                                                                                                                    "Xã Kbang",
                                                                                                                                                                    "Xã Đak Pling",
                                                                                                                                                                    "Xã Sơ Pai"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Ia Grai": [
                                                                                                                                                                    "Thị trấn Ia Kha",
                                                                                                                                                                    "Xã Ia Tô",
                                                                                                                                                                    "Xã Ia Mlah",
                                                                                                                                                                    "Xã Ia Púch",
                                                                                                                                                                    "Xã Ia Mơ"
                                                                                                                                                                ],
                                                                                                                                                                "Huyện Jrai": [
                                                                                                                                                                    "Thị trấn Jrai",
                                                                                                                                                                    "Xã Chư Gu",
                                                                                                                                                                    "Xã Chư Krey",
                                                                                                                                                                    "Xã Jrai",
                                                                                                                                                                    "Xã Ia Mo"
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            
                                                                                                                                                                "Đắk Lắk": {
                                                                                                                                                                    "Thành phố Buôn Ma Thuột": [
                                                                                                                                                                        "Phường Tân Lợi",
                                                                                                                                                                        "Phường Thắng Lợi",
                                                                                                                                                                        "Phường Tân Hòa",
                                                                                                                                                                        "Phường Khánh Xuân",
                                                                                                                                                                        "Phường Thành Nhất",
                                                                                                                                                                        "Phường Ea Tam",
                                                                                                                                                                        "Phường Thống Nhất",
                                                                                                                                                                        "Phường Tân An",
                                                                                                                                                                        "Xã Cư Êbur",
                                                                                                                                                                        "Xã Hòa Khánh",
                                                                                                                                                                        "Xã Hòa Thắng",
                                                                                                                                                                        "Xã Ea Kpam"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Buôn Đôn": [
                                                                                                                                                                        "Thị trấn Ea Son",
                                                                                                                                                                        "Xã Ea Wer",
                                                                                                                                                                        "Xã Krông Na",
                                                                                                                                                                        "Xã Buôn Đôn",
                                                                                                                                                                        "Xã Đắk Lắk",
                                                                                                                                                                        "Xã Thái Bình",
                                                                                                                                                                        "Xã Tân Hòa"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Cư M'gar": [
                                                                                                                                                                        "Thị trấn Quảng Phú",
                                                                                                                                                                        "Xã Ea Kiết",
                                                                                                                                                                        "Xã Ea M'Droh",
                                                                                                                                                                        "Xã Quảng Hiệp",
                                                                                                                                                                        "Xã Cuôr Knia",
                                                                                                                                                                        "Xã Yang Reh",
                                                                                                                                                                        "Xã Cư M'gar"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Krông Búk": [
                                                                                                                                                                        "Thị trấn Krông Búk",
                                                                                                                                                                        "Xã Ea Ngai",
                                                                                                                                                                        "Xã Ea Sô",
                                                                                                                                                                        "Xã Cư Né",
                                                                                                                                                                        "Xã Đắk N'Drung",
                                                                                                                                                                        "Xã Đắk Búk So"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Krông Ana": [
                                                                                                                                                                        "Thị trấn Buôn Trấp",
                                                                                                                                                                        "Xã Đắk Pơ",
                                                                                                                                                                        "Xã Bình Hòa",
                                                                                                                                                                        "Xã Đắk Sôr",
                                                                                                                                                                        "Xã Đắk Lây",
                                                                                                                                                                        "Xã Đắk N'Dung"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Lắk": [
                                                                                                                                                                        "Thị trấn Liên Sơn",
                                                                                                                                                                        "Xã Đắk Liêng",
                                                                                                                                                                        "Xã Đắk N’Drung",
                                                                                                                                                                        "Xã Buôn Triết",
                                                                                                                                                                        "Xã Buôn Đôn",
                                                                                                                                                                        "Xã Tân Lập"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Ea Súp": [
                                                                                                                                                                        "Thị trấn Ea Súp",
                                                                                                                                                                        "Xã Ea Lê",
                                                                                                                                                                        "Xã Ea Rốk",
                                                                                                                                                                        "Xã Ea Tih",
                                                                                                                                                                        "Xã Ia Lốp",
                                                                                                                                                                        "Xã Cư M'Gar"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện M'Drắk": [
                                                                                                                                                                        "Thị trấn M'Drắk",
                                                                                                                                                                        "Xã Krông Jing",
                                                                                                                                                                        "Xã Cư M'Gar",
                                                                                                                                                                        "Xã Đắk Hòa",
                                                                                                                                                                        "Xã Đắk Mốt"
                                                                                                                                                                    ]
                                                                                                                                                                
                                                                                                                                                            },
                                                                                                                                                            
                                                                                                                                                                "Đắk Nông": {
                                                                                                                                                                    "Thành phố Gia Nghĩa": [
                                                                                                                                                                        "Phường Nghĩa Trung",
                                                                                                                                                                        "Phường Nghĩa Tân",
                                                                                                                                                                        "Phường Đắk Nia",
                                                                                                                                                                        "Phường Nghĩa Đức",
                                                                                                                                                                        "Phường Quảng Thành",
                                                                                                                                                                        "Xã Đắk Ha",
                                                                                                                                                                        "Xã Đắk Nia"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Đắk Glong": [
                                                                                                                                                                        "Thị trấn Đắk Mil",
                                                                                                                                                                        "Xã Đắk Ha",
                                                                                                                                                                        "Xã Đắk N'Rub",
                                                                                                                                                                        "Xã Đắk Som",
                                                                                                                                                                        "Xã Đắk Gằn",
                                                                                                                                                                        "Xã Quảng Khê"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Đắk Song": [
                                                                                                                                                                        "Thị trấn Đức An",
                                                                                                                                                                        "Xã Đắk N'Drung",
                                                                                                                                                                        "Xã Đắk R'moan",
                                                                                                                                                                        "Xã Đắk Gằn",
                                                                                                                                                                        "Xã Nghĩa Thắng",
                                                                                                                                                                        "Xã Nghĩa Đức"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Tuy Đức": [
                                                                                                                                                                        "Thị trấn Tuy Đức",
                                                                                                                                                                        "Xã Đắk Búk So",
                                                                                                                                                                        "Xã Đắk Ngo",
                                                                                                                                                                        "Xã Quảng Tân",
                                                                                                                                                                        "Xã Quảng Trực"
                                                                                                                                                                    ],
                                                                                                                                                                    "Huyện Krông Nô": [
                                                                                                                                                                        "Thị trấn Kiến Đức",
                                                                                                                                                                        "Xã Đắk D'rô",
                                                                                                                                                                        "Xã Đắk K'mat",
                                                                                                                                                                        "Xã Nam Nung",
                                                                                                                                                                        "Xã Đắk Môl",
                                                                                                                                                                        "Xã Đắk Sôr"
                                                                                                                                                                    ]
                                                                                                                                                                },
                                                                                                                                                            
                                                                                                                                                                
                                                                                                                                                                    "Lâm Đồng": {
                                                                                                                                                                        "Thành phố Đà Lạt": [
                                                                                                                                                                            "Phường 1",
                                                                                                                                                                            "Phường 2",
                                                                                                                                                                            "Phường 3",
                                                                                                                                                                            "Phường 4",
                                                                                                                                                                            "Phường 5",
                                                                                                                                                                            "Phường 6",
                                                                                                                                                                            "Phường 7",
                                                                                                                                                                            "Phường 8",
                                                                                                                                                                            "Phường 9",
                                                                                                                                                                            "Phường 10",
                                                                                                                                                                            "Xã Xuân Thọ",
                                                                                                                                                                            "Xã Trạm Hành"
                                                                                                                                                                        ],
                                                                                                                                                                        "Thành phố Bảo Lộc": [
                                                                                                                                                                            "Phường Lộc Phát",
                                                                                                                                                                            "Phường Lộc Sơn",
                                                                                                                                                                            "Phường Lộc Tiến",
                                                                                                                                                                            "Xã Đại Lào",
                                                                                                                                                                            "Xã Lộc Châu",
                                                                                                                                                                            "Xã Lộc Tân"
                                                                                                                                                                        ],
                                                                                                                                                                        "Huyện Bảo Lâm": [
                                                                                                                                                                            "Thị trấn Bảo Lộc",
                                                                                                                                                                            "Xã Lộc Tân",
                                                                                                                                                                            "Xã Lộc Bắc",
                                                                                                                                                                            "Xã Lộc Điền",
                                                                                                                                                                            "Xã Lộc Phú",
                                                                                                                                                                            "Xã Lộc Ngãi",
                                                                                                                                                                            "Xã Lộc Thắng",
                                                                                                                                                                            "Xã Lộc An",
                                                                                                                                                                            "Xã Lộc Thành"
                                                                                                                                                                        ],
                                                                                                                                                                        "Huyện Đạ Huoai": [
                                                                                                                                                                            "Thị trấn Đạ Huoai",
                                                                                                                                                                            "Xã Đạ M'Rông",
                                                                                                                                                                            "Xã Đạ Pha",
                                                                                                                                                                            "Xã Đạ Lây",
                                                                                                                                                                            "Xã Đạ Tông"
                                                                                                                                                                        ],
                                                                                                                                                                        "Huyện Đạ Tẻh": [
                                                                                                                                                                            "Thị trấn Đạ Tẻh",
                                                                                                                                                                            "Xã Quảng Trị",
                                                                                                                                                                            "Xã Đạ K'Nàng",
                                                                                                                                                                            "Xã Đạ Săng",
                                                                                                                                                                            "Xã Đạ M'Rông"
                                                                                                                                                                        ],
                                                                                                                                                                        "Huyện Lạc Dương": [
                                                                                                                                                                            "Thị trấn Lạc Dương",
                                                                                                                                                                            "Xã Đưng K'Nớ",
                                                                                                                                                                            "Xã Đạ Sar",
                                                                                                                                                                            "Xã Lát",
                                                                                                                                                                            "Xã Lạc Xuân"
                                                                                                                                                                        ],
                                                                                                                                                                        "Huyện Đức Trọng": [
                                                                                                                                                                            "Thị trấn Liên Nghĩa",
                                                                                                                                                                            "Xã Liên Hiệp",
                                                                                                                                                                            "Xã Tân Hội",
                                                                                                                                                                            "Xã Tân Thành",
                                                                                                                                                                            "Xã N'Thol Hạ",
                                                                                                                                                                            "Xã N'Thol Hạ"
                                                                                                                                                                        ],
                                                                                                                                                                        "Huyện Ninh Sơn": [
                                                                                                                                                                            "Thị trấn Tân Sơn",
                                                                                                                                                                            "Xã Lâm Sơn",
                                                                                                                                                                            "Xã Sơn Hà",
                                                                                                                                                                            "Xã Sơn Hòa",
                                                                                                                                                                            "Xã Lộc Ngãi"
                                                                                                                                                                        ],
                                                                                                                                                                        "Huyện Đơn Dương": [
                                                                                                                                                                            "Thị trấn Thạnh Mỹ",
                                                                                                                                                                            "Xã Quảng Lập",
                                                                                                                                                                            "Xã Tân Hội",
                                                                                                                                                                            "Xã Lạc Lâm",
                                                                                                                                                                            "Xã Đà Loan"
                                                                                                                                                                        ]
                                                                                                                                                                    },
                                                                                                                                                                    
                                                                                                                                                                        "Bình Phước": {
                                                                                                                                                                            "Thành phố Đồng Xoài": [
                                                                                                                                                                                "Phường Tân Thiện",
                                                                                                                                                                                "Phường Tân Bình",
                                                                                                                                                                                "Phường Tân Xuân",
                                                                                                                                                                                "Phường Hưng Chiến",
                                                                                                                                                                                "Phường Phú Thịnh",
                                                                                                                                                                                "Phường Nghĩa Trung",
                                                                                                                                                                                "Phường Nghĩa Đức",
                                                                                                                                                                                "Xã Tiến Hưng",
                                                                                                                                                                                "Xã Phú Riềng"
                                                                                                                                                                            ],
                                                                                                                                                                            "Thị xã Phước Long": [
                                                                                                                                                                                "Phường Phước Bình",
                                                                                                                                                                                "Phường Phước Thanh",
                                                                                                                                                                                "Phường Long Thủy",
                                                                                                                                                                                "Xã Phước Tân",
                                                                                                                                                                                "Xã Phước Sơn"
                                                                                                                                                                            ],
                                                                                                                                                                            "Huyện Bù Đăng": [
                                                                                                                                                                                "Thị trấn Đức Phong",
                                                                                                                                                                                "Xã Bình Minh",
                                                                                                                                                                                "Xã Đức Liễu",
                                                                                                                                                                                "Xã Phú Sơn",
                                                                                                                                                                                "Xã Thống Nhất",
                                                                                                                                                                                "Xã Bù Gia Mập",
                                                                                                                                                                                "Xã Đăng Hà",
                                                                                                                                                                                "Xã Đường 10"
                                                                                                                                                                            ],
                                                                                                                                                                            "Huyện Bù Gia Mập": [
                                                                                                                                                                                "Thị trấn Phước Bình",
                                                                                                                                                                                "Xã Phước Bình",
                                                                                                                                                                                "Xã Phước Cự",
                                                                                                                                                                                "Xã Phước Thiện",
                                                                                                                                                                                "Xã Phú Nguyên"
                                                                                                                                                                            ],
                                                                                                                                                                            "Huyện Chơn Thành": [
                                                                                                                                                                                "Thị trấn Chơn Thành",
                                                                                                                                                                                "Xã Nha Bích",
                                                                                                                                                                                "Xã Minh Lập",
                                                                                                                                                                                "Xã Thành Tâm",
                                                                                                                                                                                "Xã Nghĩa Trung"
                                                                                                                                                                            ],
                                                                                                                                                                            "Huyện Đồng Phú": [
                                                                                                                                                                                "Thị trấn Đồng Phú",
                                                                                                                                                                                "Xã Tân Lợi",
                                                                                                                                                                                "Xã Tân Hưng",
                                                                                                                                                                                "Xã Tân Thành",
                                                                                                                                                                                "Xã Phú Trung",
                                                                                                                                                                                "Xã Phú Riềng"
                                                                                                                                                                            ],
                                                                                                                                                                            "Huyện Lộc Ninh": [
                                                                                                                                                                                "Thị trấn Lộc Ninh",
                                                                                                                                                                                "Xã Lộc Thiện",
                                                                                                                                                                                "Xã Lộc An",
                                                                                                                                                                                "Xã Lộc Khánh",
                                                                                                                                                                                "Xã Lộc Hòa",
                                                                                                                                                                                "Xã Lộc Quang"
                                                                                                                                                                            ],
                                                                                                                                                                            "Huyện Phú Riềng": [
                                                                                                                                                                                "Thị trấn Phú Riềng",
                                                                                                                                                                                "Xã Phú Trung",
                                                                                                                                                                                "Xã Phú Sơn",
                                                                                                                                                                                "Xã Phú Nghĩa",
                                                                                                                                                                                "Xã Phú Hòa"
                                                                                                                                                                            ]
                                                                                                                                                                        },
                                                                                                                                                                        
                                                                                                                                                                            "Tây Ninh": {
                                                                                                                                                                                "Thành phố Tây Ninh": [
                                                                                                                                                                                    "Phường 1",
                                                                                                                                                                                    "Phường 2",
                                                                                                                                                                                    "Phường 3",
                                                                                                                                                                                    "Phường 4",
                                                                                                                                                                                    "Phường 5",
                                                                                                                                                                                    "Phường 6",
                                                                                                                                                                                    "Phường 7",
                                                                                                                                                                                    "Phường Ninh Sơn",
                                                                                                                                                                                    "Phường Long Thành Bắc",
                                                                                                                                                                                    "Xã Bình Minh",
                                                                                                                                                                                    "Xã Ninh Thạnh",
                                                                                                                                                                                    "Xã Ninh Điền",
                                                                                                                                                                                    "Xã Thái Bình"
                                                                                                                                                                                ],
                                                                                                                                                                                "Huyện Tân Biên": [
                                                                                                                                                                                    "Thị trấn Tân Biên",
                                                                                                                                                                                    "Xã Tân Lập",
                                                                                                                                                                                    "Xã Tân Hiệp",
                                                                                                                                                                                    "Xã Tân Phong",
                                                                                                                                                                                    "Xã Hòa Hiệp",
                                                                                                                                                                                    "Xã Thạnh Bình",
                                                                                                                                                                                    "Xã Mỏ Công"
                                                                                                                                                                                ],
                                                                                                                                                                                "Huyện Tân Châu": [
                                                                                                                                                                                    "Thị trấn Tân Châu",
                                                                                                                                                                                    "Xã Tân Phú",
                                                                                                                                                                                    "Xã Tân Hội",
                                                                                                                                                                                    "Xã Tân Thành",
                                                                                                                                                                                    "Xã Tân Đông",
                                                                                                                                                                                    "Xã Tân Hòa"
                                                                                                                                                                                ],
                                                                                                                                                                                "Huyện Bến Cầu": [
                                                                                                                                                                                    "Thị trấn Bến Cầu",
                                                                                                                                                                                    "Xã Long Thuận",
                                                                                                                                                                                    "Xã Long Chữ",
                                                                                                                                                                                    "Xã Nhị Thành",
                                                                                                                                                                                    "Xã An Thạnh",
                                                                                                                                                                                    "Xã Tiên Thuận"
                                                                                                                                                                                ],
                                                                                                                                                                                "Huyện Gò Dầu": [
                                                                                                                                                                                    "Thị trấn Gò Dầu",
                                                                                                                                                                                    "Xã Phước Thạnh",
                                                                                                                                                                                    "Xã Phước Đông",
                                                                                                                                                                                    "Xã Bàu Đồn",
                                                                                                                                                                                    "Xã Lộc Ninh",
                                                                                                                                                                                    "Xã Cẩm Giang"
                                                                                                                                                                                ],
                                                                                                                                                                                "Huyện Trảng Bàng": [
                                                                                                                                                                                    "Thị trấn Trảng Bàng",
                                                                                                                                                                                    "Xã An Tịnh",
                                                                                                                                                                                    "Xã Bảo Thành",
                                                                                                                                                                                    "Xã Gia Bình",
                                                                                                                                                                                    "Xã Lộc Hưng",
                                                                                                                                                                                    "Xã Hưng Thuận"
                                                                                                                                                                                ],
                                                                                                                                                                                "Huyện Dương Minh Châu": [
                                                                                                                                                                                    "Thị trấn Dương Minh Châu",
                                                                                                                                                                                    "Xã Phước Minh",
                                                                                                                                                                                    "Xã Phước Ninh",
                                                                                                                                                                                    "Xã Chà Là",
                                                                                                                                                                                    "Xã Bến Củi",
                                                                                                                                                                                    "Xã Cẩm Giang"
                                                                                                                                                                                ]
                                                                                                                                                                            },
                                                                                                                                                                        
                                                                                                                                                                            
                                                                                                                                                                                "Bình Dương": {
                                                                                                                                                                                    "Thành phố Thủ Dầu Một": [
                                                                                                                                                                                        "Phường Phú Hòa",
                                                                                                                                                                                        "Phường Phú Mỹ",
                                                                                                                                                                                        "Phường Chánh Nghĩa",
                                                                                                                                                                                        "Phường Hiệp Thành",
                                                                                                                                                                                        "Phường Lái Thiêu",
                                                                                                                                                                                        "Phường Tương Bình Hiệp",
                                                                                                                                                                                        "Phường Hòa Phú",
                                                                                                                                                                                        "Phường Định Hòa",
                                                                                                                                                                                        "Phường An Phú",
                                                                                                                                                                                        "Phường Bình Thắng"
                                                                                                                                                                                    ],
                                                                                                                                                                                    "Thành phố Dĩ An": [
                                                                                                                                                                                        "Phường Dĩ An",
                                                                                                                                                                                        "Phường An Bình",
                                                                                                                                                                                        "Phường Tân Bình",
                                                                                                                                                                                        "Phường Bình An",
                                                                                                                                                                                        "Phường Đông Hòa",
                                                                                                                                                                                        "Phường Bình Thắng"
                                                                                                                                                                                    ],
                                                                                                                                                                                    "Thành phố Thuận An": [
                                                                                                                                                                                        "Phường Lái Thiêu",
                                                                                                                                                                                        "Phường An Phú",
                                                                                                                                                                                        "Phường Bình Hòa",
                                                                                                                                                                                        "Phường Bình Nhâm",
                                                                                                                                                                                        "Phường Vĩnh Phú",
                                                                                                                                                                                        "Phường Thái Hòa",
                                                                                                                                                                                        "Phường Lái Thiêu",
                                                                                                                                                                                        "Phường Khánh Bình"
                                                                                                                                                                                    ],
                                                                                                                                                                                    "Huyện Bến Cát": [
                                                                                                                                                                                        "Thị trấn Bến Cát",
                                                                                                                                                                                        "Xã An Tây",
                                                                                                                                                                                        "Xã Hòa Lợi",
                                                                                                                                                                                        "Xã Lai Uyên",
                                                                                                                                                                                        "Xã Long Nguyên",
                                                                                                                                                                                        "Xã Phú An",
                                                                                                                                                                                        "Xã Tân Định",
                                                                                                                                                                                        "Xã Tân Bình"
                                                                                                                                                                                    ],
                                                                                                                                                                                    "Huyện Dầu Tiếng": [
                                                                                                                                                                                        "Thị trấn Dầu Tiếng",
                                                                                                                                                                                        "Xã Định An",
                                                                                                                                                                                        "Xã Định Thành",
                                                                                                                                                                                        "Xã Hòa Hiệp",
                                                                                                                                                                                        "Xã Minh Tân",
                                                                                                                                                                                        "Xã Tân Bình",
                                                                                                                                                                                        "Xã Tân Hưng"
                                                                                                                                                                                    ],
                                                                                                                                                                                    "Huyện Phú Giáo": [
                                                                                                                                                                                        "Thị trấn Phước Vĩnh",
                                                                                                                                                                                        "Xã An Long",
                                                                                                                                                                                        "Xã Phước Hòa",
                                                                                                                                                                                        "Xã Tân Hiệp",
                                                                                                                                                                                        "Xã Tân Long",
                                                                                                                                                                                        "Xã Vĩnh Hòa"
                                                                                                                                                                                    ]
                                                                                                                                                                                },
                                                                                                                                                                            
                                                                                                                                                                                
                                                                                                                                                                                    "Đồng Nai": {
                                                                                                                                                                                        "Thành phố Biên Hòa": [
                                                                                                                                                                                            "Phường An Bình",
                                                                                                                                                                                            "Phường An Bình",
                                                                                                                                                                                            "Phường Bửu Long",
                                                                                                                                                                                            "Phường Bửu Hòa",
                                                                                                                                                                                            "Phường Hóa An",
                                                                                                                                                                                            "Phường Long Bình",
                                                                                                                                                                                            "Phường Quang Vinh",
                                                                                                                                                                                            "Phường Tam Hiệp",
                                                                                                                                                                                            "Phường Tân Hiệp",
                                                                                                                                                                                            "Phường Tân Mai",
                                                                                                                                                                                            "Phường Trung Dũng",
                                                                                                                                                                                            "Phường Tân Tiến",
                                                                                                                                                                                            "Phường Thống Nhất",
                                                                                                                                                                                            "Phường Tam Phước",
                                                                                                                                                                                            "Phường Phước Tân",
                                                                                                                                                                                            "Phường Long Bình Tân"
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Thành phố Long Khánh": [
                                                                                                                                                                                            "Phường Bảo Quang",
                                                                                                                                                                                            "Phường Xuân Bình",
                                                                                                                                                                                            "Phường Xuân An",
                                                                                                                                                                                            "Phường Xuân Trung",
                                                                                                                                                                                            "Phường Phú Bình",
                                                                                                                                                                                            "Phường Phú Tân"
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Huyện Nhơn Trạch": [
                                                                                                                                                                                            "Thị trấn Hiệp Phước",
                                                                                                                                                                                            "Xã Đại Phước",
                                                                                                                                                                                            "Xã Nhơn Trạch",
                                                                                                                                                                                            "Xã Phú Hữu",
                                                                                                                                                                                            "Xã Phú Hội",
                                                                                                                                                                                            "Xã Vĩnh Thanh"
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Huyện Trảng Bom": [
                                                                                                                                                                                            "Thị trấn Trảng Bom",
                                                                                                                                                                                            "Xã Bình Minh",
                                                                                                                                                                                            "Xã Bon Sứt",
                                                                                                                                                                                            "Xã Hố Nai",
                                                                                                                                                                                            "Xã La Ngà",
                                                                                                                                                                                            "Xã Sông Trầu",
                                                                                                                                                                                            "Xã Tây Hòa",
                                                                                                                                                                                            "Xã Thanh Bình",
                                                                                                                                                                                            "Xã Thống Nhất",
                                                                                                                                                                                            "Xã Thiện Tân",
                                                                                                                                                                                            "Xã Trảng Bom"
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Huyện Vĩnh Cửu": [
                                                                                                                                                                                            "Thị trấn Vĩnh An",
                                                                                                                                                                                            "Xã Bình Lợi",
                                                                                                                                                                                            "Xã Bình Sơn",
                                                                                                                                                                                            "Xã Định Quán",
                                                                                                                                                                                            "Xã Mã Đà",
                                                                                                                                                                                            "Xã Phú Hội",
                                                                                                                                                                                            "Xã Phú Tân",
                                                                                                                                                                                            "Xã Suối Nho",
                                                                                                                                                                                            "Xã Tân Bình"
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Huyện Định Quán": [
                                                                                                                                                                                            "Thị trấn Định Quán",
                                                                                                                                                                                            "Xã La Ngà",
                                                                                                                                                                                            "Xã Phú Hòa",
                                                                                                                                                                                            "Xã Phú Tân",
                                                                                                                                                                                            "Xã Tân Sơn",
                                                                                                                                                                                            "Xã Tân Thành",
                                                                                                                                                                                            "Xã Tân Phú"
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Huyện Long Thành": [
                                                                                                                                                                                            "Thị trấn Long Thành",
                                                                                                                                                                                            "Xã An Phước",
                                                                                                                                                                                            "Xã Bàu Hàm",
                                                                                                                                                                                            "Xã Bình Sơn",
                                                                                                                                                                                            "Xã Lộc An",
                                                                                                                                                                                            "Xã Tam An",
                                                                                                                                                                                            "Xã Tân Hiệp",
                                                                                                                                                                                            "Xã Tân Thành"
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Huyện Xuân Lộc": [
                                                                                                                                                                                            "Thị trấn Gia Ray",
                                                                                                                                                                                            "Xã Bảo Hòa",
                                                                                                                                                                                            "Xã Bảo Quang",
                                                                                                                                                                                            "Xã Cẩm Mỹ",
                                                                                                                                                                                            "Xã Lộc Bắc",
                                                                                                                                                                                            "Xã Lộc An",
                                                                                                                                                                                            "Xã Xuân Bắc",
                                                                                                                                                                                            "Xã Xuân Hòa",
                                                                                                                                                                                            "Xã Xuân Hưng"
                                                                                                                                                                                        ]
                                                                                                                                                                                    },
                                                                                                                                                                                    
                                                                                                                                                                                        "Tỉnh Long An": {
                                                                                                                                                                                            "Thành phố Tân An": [
                                                                                                                                                                                                "Phường 1",
                                                                                                                                                                                                "Phường 2",
                                                                                                                                                                                                "Phường 3",
                                                                                                                                                                                                "Phường 4",
                                                                                                                                                                                                "Phường 5",
                                                                                                                                                                                                "Phường 6",
                                                                                                                                                                                                "Phường 7",
                                                                                                                                                                                                "Phường 8",
                                                                                                                                                                                                "Phường 9",
                                                                                                                                                                                                "Phường Khánh Hậu"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Bến Lức": [
                                                                                                                                                                                                "Thị trấn Bến Lức",
                                                                                                                                                                                                "Xã Lương Hòa",
                                                                                                                                                                                                "Xã Lương Bình",
                                                                                                                                                                                                "Xã Thạnh Đức",
                                                                                                                                                                                                "Xã Thạnh Hòa",
                                                                                                                                                                                                "Xã Tân Bửu",
                                                                                                                                                                                                "Xã Tân Hòa",
                                                                                                                                                                                                "Xã Nhựt Chánh"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Châu Thành": [
                                                                                                                                                                                                "Thị trấn Châu Thành",
                                                                                                                                                                                                "Xã An Lập",
                                                                                                                                                                                                "Xã An Nhơn",
                                                                                                                                                                                                "Xã Hòa Phú",
                                                                                                                                                                                                "Xã Hòa Khánh Tây",
                                                                                                                                                                                                "Xã Hòa Khánh Đông",
                                                                                                                                                                                                "Xã Tân Hòa",
                                                                                                                                                                                                "Xã Vĩnh Hậu"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Cần Đước": [
                                                                                                                                                                                                "Thị trấn Cần Đước",
                                                                                                                                                                                                "Xã Long Định",
                                                                                                                                                                                                "Xã Long Hậu",
                                                                                                                                                                                                "Xã Tân Lập",
                                                                                                                                                                                                "Xã Tân Trạch",
                                                                                                                                                                                                "Xã Phước Đông",
                                                                                                                                                                                                "Xã Phước Hậu",
                                                                                                                                                                                                "Xã Đô Thành"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Cần Giuộc": [
                                                                                                                                                                                                "Thị trấn Cần Giuộc",
                                                                                                                                                                                                "Xã Mỹ Hạnh Bắc",
                                                                                                                                                                                                "Xã Mỹ Hạnh Nam",
                                                                                                                                                                                                "Xã Tân Kim",
                                                                                                                                                                                                "Xã Phước Lợi",
                                                                                                                                                                                                "Xã Phước Hậu",
                                                                                                                                                                                                "Xã Long An",
                                                                                                                                                                                                "Xã Tân Tập",
                                                                                                                                                                                                "Xã Tân Bửu"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Đức Hòa": [
                                                                                                                                                                                                "Thị trấn Đức Hòa",
                                                                                                                                                                                                "Xã Đức Lập Hạ",
                                                                                                                                                                                                "Xã Đức Lập Thượng",
                                                                                                                                                                                                "Xã Hòa Khánh Đông",
                                                                                                                                                                                                "Xã Hòa Khánh Tây",
                                                                                                                                                                                                "Xã Thái Mỹ",
                                                                                                                                                                                                "Xã Tân Mỹ",
                                                                                                                                                                                                "Xã Lộc Giang"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Đức Huệ": [
                                                                                                                                                                                                "Thị trấn Đức Huệ",
                                                                                                                                                                                                "Xã Bình Hòa Bắc",
                                                                                                                                                                                                "Xã Bình Hòa Nam",
                                                                                                                                                                                                "Xã Mỹ Thạnh Bắc",
                                                                                                                                                                                                "Xã Mỹ Thạnh Nam",
                                                                                                                                                                                                "Xã Hòa Bình",
                                                                                                                                                                                                "Xã Tân Hưng",
                                                                                                                                                                                                "Xã Bình Thành"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Mộc Hóa": [
                                                                                                                                                                                                "Thị trấn Mộc Hóa",
                                                                                                                                                                                                "Xã Bình Hòa",
                                                                                                                                                                                                "Xã Khánh Hưng",
                                                                                                                                                                                                "Xã Hòa Bình",
                                                                                                                                                                                                "Xã Tân Thạnh",
                                                                                                                                                                                                "Xã Tân Hưng",
                                                                                                                                                                                                "Xã Thái Bình"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Tân Hưng": [
                                                                                                                                                                                                "Thị trấn Tân Hưng",
                                                                                                                                                                                                "Xã Vĩnh Đại",
                                                                                                                                                                                                "Xã Vĩnh Châu",
                                                                                                                                                                                                "Xã Tân Thạnh",
                                                                                                                                                                                                "Xã Tân Hiệp",
                                                                                                                                                                                                "Xã Tân Hưng",
                                                                                                                                                                                                "Xã Tân Tây"
                                                                                                                                                                                            ],
                                                                                                                                                                                            "Huyện Thạnh Hóa": [
                                                                                                                                                                                                "Thị trấn Thạnh Hóa",
                                                                                                                                                                                                "Xã Thạnh Hòa",
                                                                                                                                                                                                "Xã Thạnh Phú",
                                                                                                                                                                                                "Xã Thạnh Hưng",
                                                                                                                                                                                                "Xã Thạnh Mỹ",
                                                                                                                                                                                                "Xã Thạnh Xuân"
                                                                                                                                                                                            ]
                                                                                                                                                                                        },
                                                                                                                                                                                        
                                                                                                                                                                                            "Tỉnh Tiền Giang": {
                                                                                                                                                                                                "Thành phố Mỹ Tho": [
                                                                                                                                                                                                    "Phường 1",
                                                                                                                                                                                                    "Phường 2",
                                                                                                                                                                                                    "Phường 3",
                                                                                                                                                                                                    "Phường 4",
                                                                                                                                                                                                    "Phường 5",
                                                                                                                                                                                                    "Phường 6",
                                                                                                                                                                                                    "Phường 7",
                                                                                                                                                                                                    "Phường 8",
                                                                                                                                                                                                    "Phường 9",
                                                                                                                                                                                                    "Phường Tân Long",
                                                                                                                                                                                                    "Xã Trung An",
                                                                                                                                                                                                    "Xã Thới Sơn",
                                                                                                                                                                                                    "Xã Đạo Thạnh"
                                                                                                                                                                                                ],
                                                                                                                                                                                                "Huyện Cái Bè": [
                                                                                                                                                                                                    "Thị trấn Cái Bè",
                                                                                                                                                                                                    "Xã An Thái Đông",
                                                                                                                                                                                                    "Xã An Thái Trung",
                                                                                                                                                                                                    "Xã Hậu Mỹ Bắc A",
                                                                                                                                                                                                    "Xã Hậu Mỹ Bắc B",
                                                                                                                                                                                                    "Xã Hậu Mỹ Trinh",
                                                                                                                                                                                                    "Xã Mỹ Lợi A",
                                                                                                                                                                                                    "Xã Mỹ Lợi B",
                                                                                                                                                                                                    "Xã Mỹ Trung",
                                                                                                                                                                                                    "Xã Tân Hòa",
                                                                                                                                                                                                    "Xã Tân Phong",
                                                                                                                                                                                                    "Xã Tân Thanh"
                                                                                                                                                                                                ],
                                                                                                                                                                                                "Huyện Cai Lậy": [
                                                                                                                                                                                                    "Thị trấn Cai Lậy",
                                                                                                                                                                                                    "Xã Bình Phú",
                                                                                                                                                                                                    "Xã Bình Nhì",
                                                                                                                                                                                                    "Xã Bình Tân",
                                                                                                                                                                                                    "Xã Định An",
                                                                                                                                                                                                    "Xã Mỹ Hạnh Đông",
                                                                                                                                                                                                    "Xã Mỹ Hạnh Trung",
                                                                                                                                                                                                    "Xã Phú Nhuận",
                                                                                                                                                                                                    "Xã Tân Hội",
                                                                                                                                                                                                    "Xã Tân Phú",
                                                                                                                                                                                                    "Xã Tân Thạnh",
                                                                                                                                                                                                    "Xã Thanh Bình"
                                                                                                                                                                                                ],
                                                                                                                                                                                                "Huyện Châu Thành": [
                                                                                                                                                                                                    "Thị trấn Châu Thành",
                                                                                                                                                                                                    "Xã An Hữu",
                                                                                                                                                                                                    "Xã Bình Đức",
                                                                                                                                                                                                    "Xã Hữu Định",
                                                                                                                                                                                                    "Xã Kim Sơn",
                                                                                                                                                                                                    "Xã Long Định",
                                                                                                                                                                                                    "Xã Ngũ Hiệp",
                                                                                                                                                                                                    "Xã Tân Hội",
                                                                                                                                                                                                    "Xã Tân Phú",
                                                                                                                                                                                                    "Xã Tân Thanh",
                                                                                                                                                                                                    "Xã Thân Cửu Nghĩa"
                                                                                                                                                                                                ],
                                                                                                                                                                                                "Huyện Gò Công Tây": [
                                                                                                                                                                                                    "Thị trấn Vĩnh Bình",
                                                                                                                                                                                                    "Xã Bình Tân",
                                                                                                                                                                                                    "Xã Bình Nhì",
                                                                                                                                                                                                    "Xã Bình Xuân",
                                                                                                                                                                                                    "Xã Hòa Định",
                                                                                                                                                                                                    "Xã Long Chánh",
                                                                                                                                                                                                    "Xã Tân Tây",
                                                                                                                                                                                                    "Xã Tân Hòa",
                                                                                                                                                                                                    "Xã Tân Phước",
                                                                                                                                                                                                    "Xã Thạnh Nhựt"
                                                                                                                                                                                                ],
                                                                                                                                                                                                "Huyện Gò Công Đông": [
                                                                                                                                                                                                    "Thị trấn Gò Công",
                                                                                                                                                                                                    "Xã Bến Thủy",
                                                                                                                                                                                                    "Xã Tân Điền",
                                                                                                                                                                                                    "Xã Tân Phước",
                                                                                                                                                                                                    "Xã Tân Đông",
                                                                                                                                                                                                    "Xã Tân Hòa",
                                                                                                                                                                                                    "Xã Tân Thạnh"
                                                                                                                                                                                                ],
                                                                                                                                                                                                "Huyện Tân Phú Đông": [
                                                                                                                                                                                                    "Thị trấn Tân Phú",
                                                                                                                                                                                                    "Xã Tân Thới",
                                                                                                                                                                                                    "Xã Tân Đông",
                                                                                                                                                                                                    "Xã Tân Phú",
                                                                                                                                                                                                    "Xã Tân Bình",
                                                                                                                                                                                                    "Xã Tân Hòa",
                                                                                                                                                                                                    "Xã Tân Tân"
                                                                                                                                                                                                ]
                                                                                                                                                                                            },
                                                                                                                                                                                            
                                                                                                                                                                                                "Tỉnh Bến Tre": {
                                                                                                                                                                                                    "Thành phố Bến Tre": [
                                                                                                                                                                                                        "Phường 1",
                                                                                                                                                                                                        "Phường 2",
                                                                                                                                                                                                        "Phường 3",
                                                                                                                                                                                                        "Phường 4",
                                                                                                                                                                                                        "Phường 5",
                                                                                                                                                                                                        "Phường 6",
                                                                                                                                                                                                        "Phường 7",
                                                                                                                                                                                                        "Phường 8",
                                                                                                                                                                                                        "Phường 9",
                                                                                                                                                                                                        "Xã Phú Hưng",
                                                                                                                                                                                                        "Xã Bình Phú",
                                                                                                                                                                                                        "Xã Mỹ Thạnh An",
                                                                                                                                                                                                        "Xã Sơn Đông"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    "Huyện Bến Tre": [
                                                                                                                                                                                                        "Thị trấn Bến Tre",
                                                                                                                                                                                                        "Xã Bình Khánh",
                                                                                                                                                                                                        "Xã Bình Thạnh",
                                                                                                                                                                                                        "Xã Đa Phước Hội",
                                                                                                                                                                                                        "Xã Hòa Lợi",
                                                                                                                                                                                                        "Xã Hưng Phong",
                                                                                                                                                                                                        "Xã Lương Phú",
                                                                                                                                                                                                        "Xã Ngãi Đăng",
                                                                                                                                                                                                        "Xã Tân Hòa",
                                                                                                                                                                                                        "Xã Tân Thành",
                                                                                                                                                                                                        "Xã Vĩnh Thành"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    "Huyện Châu Thành": [
                                                                                                                                                                                                        "Thị trấn Châu Thành",
                                                                                                                                                                                                        "Xã An Nhơn",
                                                                                                                                                                                                        "Xã Bình Thạnh",
                                                                                                                                                                                                        "Xã Giao Thạnh",
                                                                                                                                                                                                        "Xã Hòa Lợi",
                                                                                                                                                                                                        "Xã Hữu Định",
                                                                                                                                                                                                        "Xã Phú Túc",
                                                                                                                                                                                                        "Xã Tân Thạch",
                                                                                                                                                                                                        "Xã Thành Triệu"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    "Huyện Giồng Trôm": [
                                                                                                                                                                                                        "Thị trấn Giồng Trôm",
                                                                                                                                                                                                        "Xã Bình Hoà",
                                                                                                                                                                                                        "Xã Bình Đại",
                                                                                                                                                                                                        "Xã Châu Bình",
                                                                                                                                                                                                        "Xã Phước Nguyên",
                                                                                                                                                                                                        "Xã Thạnh Phú",
                                                                                                                                                                                                        "Xã Tân Mỹ",
                                                                                                                                                                                                        "Xã Tân Thành",
                                                                                                                                                                                                        "Xã Thạnh Trạch"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    "Huyện Mỏ Cày Bắc": [
                                                                                                                                                                                                        "Thị trấn Mỏ Cày",
                                                                                                                                                                                                        "Xã An Định",
                                                                                                                                                                                                        "Xã Định Trung",
                                                                                                                                                                                                        "Xã Khánh Thạnh",
                                                                                                                                                                                                        "Xã Tân Hưng",
                                                                                                                                                                                                        "Xã Tân Thành",
                                                                                                                                                                                                        "Xã Vĩnh Bình"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    "Huyện Mỏ Cày Nam": [
                                                                                                                                                                                                        "Thị trấn Mỏ Cày Nam",
                                                                                                                                                                                                        "Xã An Thạnh",
                                                                                                                                                                                                        "Xã Bình Khởi",
                                                                                                                                                                                                        "Xã Bình Thạnh",
                                                                                                                                                                                                        "Xã Hưng Khánh Trung B",
                                                                                                                                                                                                        "Xã Minh Đức",
                                                                                                                                                                                                        "Xã Tam Phước",
                                                                                                                                                                                                        "Xã Tân Hội"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    "Huyện Ba Tri": [
                                                                                                                                                                                                        "Thị trấn Ba Tri",
                                                                                                                                                                                                        "Xã An Bình",
                                                                                                                                                                                                        "Xã Bảo Thạnh",
                                                                                                                                                                                                        "Xã Cẩm Sơn",
                                                                                                                                                                                                        "Xã Hưng Nhượng",
                                                                                                                                                                                                        "Xã Mỹ Hưng",
                                                                                                                                                                                                        "Xã Mỹ Nhơn",
                                                                                                                                                                                                        "Xã Phú Lộc",
                                                                                                                                                                                                        "Xã Tân Hưng",
                                                                                                                                                                                                        "Xã Tân Thạch"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    "Huyện Thạnh Phú": [
                                                                                                                                                                                                        "Thị trấn Thạnh Phú",
                                                                                                                                                                                                        "Xã An Nhơn",
                                                                                                                                                                                                        "Xã Bình Thạnh",
                                                                                                                                                                                                        "Xã Hòa Lợi",
                                                                                                                                                                                                        "Xã Hưng Phong",
                                                                                                                                                                                                        "Xã Long Sơn",
                                                                                                                                                                                                        "Xã Mỹ An",
                                                                                                                                                                                                        "Xã Mỹ Thạnh",
                                                                                                                                                                                                        "Xã Phú Khương",
                                                                                                                                                                                                        "Xã Thạnh Phong"
                                                                                                                                                                                                    ]
                                                                                                                                                                                                },
                                                                                                                                                                                                
                                                                                                                                                                                                    "Tỉnh Trà Vinh": {
                                                                                                                                                                                                        "Thành phố Trà Vinh": [
                                                                                                                                                                                                            "Phường 1",
                                                                                                                                                                                                            "Phường 2",
                                                                                                                                                                                                            "Phường 3",
                                                                                                                                                                                                            "Phường 4",
                                                                                                                                                                                                            "Phường 5",
                                                                                                                                                                                                            "Phường 6",
                                                                                                                                                                                                            "Phường 7",
                                                                                                                                                                                                            "Phường 8",
                                                                                                                                                                                                            "Phường 9",
                                                                                                                                                                                                            "Xã Long Đức",
                                                                                                                                                                                                            "Xã Lương Nghĩa",
                                                                                                                                                                                                            "Xã Mỹ Long",
                                                                                                                                                                                                            "Xã Tân Hòa",
                                                                                                                                                                                                            "Xã Phước An"
                                                                                                                                                                                                        ],
                                                                                                                                                                                                        "Huyện Càng Long": [
                                                                                                                                                                                                            "Thị trấn Càng Long",
                                                                                                                                                                                                            "Xã An Trường A",
                                                                                                                                                                                                            "Xã An Trường B",
                                                                                                                                                                                                            "Xã Bến Nghé",
                                                                                                                                                                                                            "Xã Bình Phú",
                                                                                                                                                                                                            "Xã Châu Điền",
                                                                                                                                                                                                            "Xã Đại Phước",
                                                                                                                                                                                                            "Xã Hòa Minh",
                                                                                                                                                                                                            "Xã Phương Thạnh",
                                                                                                                                                                                                            "Xã Tân Bình"
                                                                                                                                                                                                        ],
                                                                                                                                                                                                        "Huyện Châu Thành": [
                                                                                                                                                                                                            "Thị trấn Châu Thành",
                                                                                                                                                                                                            "Xã Hòa Tân",
                                                                                                                                                                                                            "Xã Hưng Mỹ",
                                                                                                                                                                                                            "Xã Nguyệt Hạng",
                                                                                                                                                                                                            "Xã Phước Hòa",
                                                                                                                                                                                                            "Xã Thanh Mỹ",
                                                                                                                                                                                                            "Xã Thị Trấn",
                                                                                                                                                                                                            "Xã Tân Bình",
                                                                                                                                                                                                            "Xã Tân Hòa"
                                                                                                                                                                                                        ],
                                                                                                                                                                                                        "Huyện Tiểu Cần": [
                                                                                                                                                                                                            "Thị trấn Tiểu Cần",
                                                                                                                                                                                                            "Xã Hiếu Trung",
                                                                                                                                                                                                            "Xã Hiếu Tử",
                                                                                                                                                                                                            "Xã Tân Hạnh",
                                                                                                                                                                                                            "Xã Tân Hòa",
                                                                                                                                                                                                            "Xã Phú Cần",
                                                                                                                                                                                                            "Xã Mỹ Hòa",
                                                                                                                                                                                                            "Xã Thạnh Mỹ",
                                                                                                                                                                                                            "Xã Thanh Hòa"
                                                                                                                                                                                                        ],
                                                                                                                                                                                                        "Huyện Trà Cú": [
                                                                                                                                                                                                            "Thị trấn Trà Cú",
                                                                                                                                                                                                            "Xã Đại An",
                                                                                                                                                                                                            "Xã Hưng Mỹ",
                                                                                                                                                                                                            "Xã Lưu Nghĩa",
                                                                                                                                                                                                            "Xã Tân Hòa",
                                                                                                                                                                                                            "Xã Thanh Sơn",
                                                                                                                                                                                                            "Xã Ngọc Hiệp",
                                                                                                                                                                                                            "Xã Tân Xuân"
                                                                                                                                                                                                        ],
                                                                                                                                                                                                        "Huyện Duyên Hải": [
                                                                                                                                                                                                            "Thị trấn Duyên Hải",
                                                                                                                                                                                                            "Xã Đôn Xuân",
                                                                                                                                                                                                            "Xã Long Khánh",
                                                                                                                                                                                                            "Xã Long Toàn",
                                                                                                                                                                                                            "Xã Tân Thạch",
                                                                                                                                                                                                            "Xã Trường Long Hòa",
                                                                                                                                                                                                            "Xã Hòa Minh",
                                                                                                                                                                                                            "Xã Phú Long"
                                                                                                                                                                                                        ]
                                                                                                                                                                                                    },
                                                                                                                                                                                                    
                                                                                                                                                                                                        "Tỉnh Vĩnh Long": {
                                                                                                                                                                                                            "Thành phố Vĩnh Long": [
                                                                                                                                                                                                                "Phường 1",
                                                                                                                                                                                                                "Phường 2",
                                                                                                                                                                                                                "Phường 3",
                                                                                                                                                                                                                "Phường 4",
                                                                                                                                                                                                                "Phường 5",
                                                                                                                                                                                                                "Phường 6",
                                                                                                                                                                                                                "Phường 7",
                                                                                                                                                                                                                "Phường 8",
                                                                                                                                                                                                                "Phường 9",
                                                                                                                                                                                                                "Xã Tân Ngãi",
                                                                                                                                                                                                                "Xã Ngãi Nhuận",
                                                                                                                                                                                                                "Xã Trường An",
                                                                                                                                                                                                                "Xã Thanh Đức"
                                                                                                                                                                                                            ],
                                                                                                                                                                                                            "Huyện Vũng Liêm": [
                                                                                                                                                                                                                "Thị trấn Vũng Liêm",
                                                                                                                                                                                                                "Xã Hiếu Nghĩa",
                                                                                                                                                                                                                "Xã Hiếu Thành",
                                                                                                                                                                                                                "Xã Trung Thành Tây",
                                                                                                                                                                                                                "Xã Trung Thành Đông",
                                                                                                                                                                                                                "Xã Lộc Hòa",
                                                                                                                                                                                                                "Xã Tam Bình",
                                                                                                                                                                                                                "Xã Hưng Nhơn",
                                                                                                                                                                                                                "Xã Tân Quới"
                                                                                                                                                                                                            ],
                                                                                                                                                                                                            "Huyện Tam Bình": [
                                                                                                                                                                                                                "Thị trấn Tam Bình",
                                                                                                                                                                                                                "Xã Bình Ninh",
                                                                                                                                                                                                                "Xã Mỹ Thiện",
                                                                                                                                                                                                                "Xã Hưng Nhơn",
                                                                                                                                                                                                                "Xã Tân Thới",
                                                                                                                                                                                                                "Xã Thanh Đức",
                                                                                                                                                                                                                "Xã Tân Bình",
                                                                                                                                                                                                                "Xã Tân An",
                                                                                                                                                                                                                "Xã Tân Lộc",
                                                                                                                                                                                                                "Xã Tân Quới"
                                                                                                                                                                                                            ],
                                                                                                                                                                                                            "Huyện Mang Thít": [
                                                                                                                                                                                                                "Thị trấn Mang Thít",
                                                                                                                                                                                                                "Xã Tân Long",
                                                                                                                                                                                                                "Xã Mỹ Phước",
                                                                                                                                                                                                                "Xã Chánh An",
                                                                                                                                                                                                                "Xã Lộc Thới",
                                                                                                                                                                                                                "Xã Bình Phú",
                                                                                                                                                                                                                "Xã Long Bình",
                                                                                                                                                                                                                "Xã Tân An",
                                                                                                                                                                                                                "Xã Tân Mỹ"
                                                                                                                                                                                                            ],
                                                                                                                                                                                                            "Huyện Long Hồ": [
                                                                                                                                                                                                                "Thị trấn Long Hồ",
                                                                                                                                                                                                                "Xã Bình Hòa Phước",
                                                                                                                                                                                                                "Xã Hòa Phú",
                                                                                                                                                                                                                "Xã Phú Quới",
                                                                                                                                                                                                                "Xã Tân Hạnh",
                                                                                                                                                                                                                "Xã Tân Mỹ",
                                                                                                                                                                                                                "Xã Thanh Đức",
                                                                                                                                                                                                                "Xã Tân Lộc",
                                                                                                                                                                                                                "Xã Tân An"
                                                                                                                                                                                                            ],
                                                                                                                                                                                                            "Huyện Trà Ôn": [
                                                                                                                                                                                                                "Thị trấn Trà Ôn",
                                                                                                                                                                                                                "Xã Trung Nghĩa",
                                                                                                                                                                                                                "Xã Thiện Mỹ",
                                                                                                                                                                                                                "Xã Hòa Bình",
                                                                                                                                                                                                                "Xã Phú Đức",
                                                                                                                                                                                                                "Xã Tân Hưng",
                                                                                                                                                                                                                "Xã Tân Thạnh",
                                                                                                                                                                                                                "Xã Trà Côn",
                                                                                                                                                                                                                "Xã Trà Sơn"
                                                                                                                                                                                                            ]
                                                                                                                                                                                                        },
                                                                                                                                                                                                        
                                                                                                                                                                                                            "Tỉnh Đồng Tháp": {
                                                                                                                                                                                                                "Thành phố Cao Lãnh": [
                                                                                                                                                                                                                    "Phường 1",
                                                                                                                                                                                                                    "Phường 2",
                                                                                                                                                                                                                    "Phường 3",
                                                                                                                                                                                                                    "Phường 4",
                                                                                                                                                                                                                    "Phường 5",
                                                                                                                                                                                                                    "Phường 6",
                                                                                                                                                                                                                    "Phường 7",
                                                                                                                                                                                                                    "Phường 8",
                                                                                                                                                                                                                    "Phường 9",
                                                                                                                                                                                                                    "Xã Mỹ Tân",
                                                                                                                                                                                                                    "Xã An Bình",
                                                                                                                                                                                                                    "Xã Tịnh Thới"
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                "Thành phố Sa Đéc": [
                                                                                                                                                                                                                    "Phường 1",
                                                                                                                                                                                                                    "Phường 2",
                                                                                                                                                                                                                    "Phường 3",
                                                                                                                                                                                                                    "Phường 4",
                                                                                                                                                                                                                    "Phường 5",
                                                                                                                                                                                                                    "Phường 6",
                                                                                                                                                                                                                    "Phường 7",
                                                                                                                                                                                                                    "Phường 8",
                                                                                                                                                                                                                    "Xã Tân Khánh Đông",
                                                                                                                                                                                                                    "Xã Tân Phú Đông"
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                "Huyện Châu Thành": [
                                                                                                                                                                                                                    "Thị trấn Châu Thành",
                                                                                                                                                                                                                    "Xã An Hiệp",
                                                                                                                                                                                                                    "Xã An Khánh",
                                                                                                                                                                                                                    "Xã Bình Mỹ",
                                                                                                                                                                                                                    "Xã Phú An",
                                                                                                                                                                                                                    "Xã Phú Hữu",
                                                                                                                                                                                                                    "Xã Tân Phú",
                                                                                                                                                                                                                    "Xã Tân Thanh"
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                "Huyện Lai Vung": [
                                                                                                                                                                                                                    "Thị trấn Lai Vung",
                                                                                                                                                                                                                    "Xã Bình Thạnh",
                                                                                                                                                                                                                    "Xã Lai Vung",
                                                                                                                                                                                                                    "Xã Long Hậu",
                                                                                                                                                                                                                    "Xã Tân Dinh",
                                                                                                                                                                                                                    "Xã Tân Thành",
                                                                                                                                                                                                                    "Xã Phong Hòa"
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                "Huyện Lấp Vò": [
                                                                                                                                                                                                                    "Thị trấn Lấp Vò",
                                                                                                                                                                                                                    "Xã Bình Thạnh Trung",
                                                                                                                                                                                                                    "Xã Lấp Vò",
                                                                                                                                                                                                                    "Xã Long Hậu",
                                                                                                                                                                                                                    "Xã Tân Nghĩa",
                                                                                                                                                                                                                    "Xã Vĩnh Thới"
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                "Huyện Thanh Bình": [
                                                                                                                                                                                                                    "Thị trấn Thanh Bình",
                                                                                                                                                                                                                    "Xã An Phong",
                                                                                                                                                                                                                    "Xã Bình Tấn",
                                                                                                                                                                                                                    "Xã Phước An",
                                                                                                                                                                                                                    "Xã Tân Bình",
                                                                                                                                                                                                                    "Xã Tân Thanh",
                                                                                                                                                                                                                    "Xã Tân Mỹ"
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                "Huyện Tam Nông": [
                                                                                                                                                                                                                    "Thị trấn Tràm Chim",
                                                                                                                                                                                                                    "Xã An Hòa",
                                                                                                                                                                                                                    "Xã Hòa Bình",
                                                                                                                                                                                                                    "Xã Phú Thành",
                                                                                                                                                                                                                    "Xã Phú Đức",
                                                                                                                                                                                                                    "Xã Tân Hòa",
                                                                                                                                                                                                                    "Xã Tân Long",
                                                                                                                                                                                                                    "Xã Tân Nghĩa"
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                "Huyện Xuân Qưới": [
                                                                                                                                                                                                                    "Thị trấn Xuân Qưới",
                                                                                                                                                                                                                    "Xã An Đế",
                                                                                                                                                                                                                    "Xã Bình Trung",
                                                                                                                                                                                                                    "Xã Hòa Khánh",
                                                                                                                                                                                                                    "Xã Lợi Thuận",
                                                                                                                                                                                                                    "Xã Tân Hòa",
                                                                                                                                                                                                                    "Xã Tân Qưới"
                                                                                                                                                                                                                ]
                                                                                                                                                                                                            },
                                                                                                                                                                                                            
                                                                                                                                                                                                                "Tỉnh Kiên Giang": {
                                                                                                                                                                                                                    "Thành phố Rạch Giá": [
                                                                                                                                                                                                                        "Phường Vĩnh Lạc",
                                                                                                                                                                                                                        "Phường Vĩnh Thanh Vân",
                                                                                                                                                                                                                        "Phường Vĩnh Thanh",
                                                                                                                                                                                                                        "Phường An Bình",
                                                                                                                                                                                                                        "Phường Rạch Sỏi",
                                                                                                                                                                                                                        "Phường Tân Hiệp",
                                                                                                                                                                                                                        "Phường Tân Thành",
                                                                                                                                                                                                                        "Xã Phi Thông",
                                                                                                                                                                                                                        "Xã Hòa Điền",
                                                                                                                                                                                                                        "Xã Vĩnh Quang"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Thành phố Hà Tiên": [
                                                                                                                                                                                                                        "Phường Bình San",
                                                                                                                                                                                                                        "Phường Tô Châu",
                                                                                                                                                                                                                        "Xã Mỹ Đức",
                                                                                                                                                                                                                        "Xã Tân Hải",
                                                                                                                                                                                                                        "Xã Đa Phước",
                                                                                                                                                                                                                        "Xã Thạch Động"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Huyện Kiên Lương": [
                                                                                                                                                                                                                        "Thị trấn Kiên Lương",
                                                                                                                                                                                                                        "Xã Kiên Bình",
                                                                                                                                                                                                                        "Xã Bình An",
                                                                                                                                                                                                                        "Xã Dương Hòa",
                                                                                                                                                                                                                        "Xã Hòn Nghệ",
                                                                                                                                                                                                                        "Xã Kiên Hòa",
                                                                                                                                                                                                                        "Xã Hòa Điền",
                                                                                                                                                                                                                        "Xã Vĩnh Hải"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Huyện Hòn Đất": [
                                                                                                                                                                                                                        "Thị trấn Hòn Đất",
                                                                                                                                                                                                                        "Xã Hòn Đất",
                                                                                                                                                                                                                        "Xã Lình Huỳnh",
                                                                                                                                                                                                                        "Xã Mỹ Phước",
                                                                                                                                                                                                                        "Xã Thổ Sơn",
                                                                                                                                                                                                                        "Xã Bình Sơn",
                                                                                                                                                                                                                        "Xã Tân Hiệp",
                                                                                                                                                                                                                        "Xã Bình Giang"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Huyện Tân Hiệp": [
                                                                                                                                                                                                                        "Thị trấn Tân Hiệp",
                                                                                                                                                                                                                        "Xã Tân Hiệp",
                                                                                                                                                                                                                        "Xã Tân Hòa",
                                                                                                                                                                                                                        "Xã Tân Thành",
                                                                                                                                                                                                                        "Xã Tân An",
                                                                                                                                                                                                                        "Xã Tân Quới"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Huyện Châu Thành": [
                                                                                                                                                                                                                        "Thị trấn Châu Thành",
                                                                                                                                                                                                                        "Xã Giục Tượng",
                                                                                                                                                                                                                        "Xã Hòa Điền",
                                                                                                                                                                                                                        "Xã Mong Thọ",
                                                                                                                                                                                                                        "Xã Mong Thọ A",
                                                                                                                                                                                                                        "Xã Mong Thọ B",
                                                                                                                                                                                                                        "Xã Vĩnh Hòa",
                                                                                                                                                                                                                        "Xã Tân Hiệp"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Huyện Giang Thành": [
                                                                                                                                                                                                                        "Thị trấn Giang Thành",
                                                                                                                                                                                                                        "Xã Vĩnh Điều",
                                                                                                                                                                                                                        "Xã Vĩnh Thanh",
                                                                                                                                                                                                                        "Xã Vĩnh Thạnh",
                                                                                                                                                                                                                        "Xã Vĩnh Quang",
                                                                                                                                                                                                                        "Xã Vĩnh Hòa",
                                                                                                                                                                                                                        "Xã Vĩnh Phú"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Huyện Phú Quốc": [
                                                                                                                                                                                                                        "Thị trấn Dương Đông",
                                                                                                                                                                                                                        "Xã Cửa Cạn",
                                                                                                                                                                                                                        "Xã Gành Dầu",
                                                                                                                                                                                                                        "Xã Cửa Kiến",
                                                                                                                                                                                                                        "Xã Dương Tơ",
                                                                                                                                                                                                                        "Xã Hàm Ninh",
                                                                                                                                                                                                                        "Xã Thổ Quốc",
                                                                                                                                                                                                                        "Xã Bãi Thơm"
                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                    "Huyện U Minh Thượng": [
                                                                                                                                                                                                                        "Thị trấn U Minh Thượng",
                                                                                                                                                                                                                        "Xã An Minh Bắc",
                                                                                                                                                                                                                        "Xã An Minh",
                                                                                                                                                                                                                        "Xã Minh Thuận",
                                                                                                                                                                                                                        "Xã Thới Quản",
                                                                                                                                                                                                                        "Xã An Sơn"
                                                                                                                                                                                                                    ]
                                                                                                                                                                                                                },
                                                                                                                                                                                                                
                                                                                                                                                                                                                    "Thành phố Cần Thơ": {
                                                                                                                                                                                                                        "Quận Ninh Kiều": [
                                                                                                                                                                                                                            "Phường An Khánh",
                                                                                                                                                                                                                            "Phường An Nghiệp",
                                                                                                                                                                                                                            "Phường An Hòa",
                                                                                                                                                                                                                            "Phường Cái Khế",
                                                                                                                                                                                                                            "Phường Hưng Lợi",
                                                                                                                                                                                                                            "Phường Tân An",
                                                                                                                                                                                                                            "Phường Thới Bình",
                                                                                                                                                                                                                            "Phường Xuân Khánh",
                                                                                                                                                                                                                            "Phường Cái Răng"
                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                        "Quận Cái Răng": [
                                                                                                                                                                                                                            "Phường Lê Bình",
                                                                                                                                                                                                                            "Phường Hưng Phú",
                                                                                                                                                                                                                            "Phường Thường Thạnh",
                                                                                                                                                                                                                            "Phường Phú Thứ",
                                                                                                                                                                                                                            "Phường An Bình",
                                                                                                                                                                                                                            "Xã Ba Láng",
                                                                                                                                                                                                                            "Xã Trung Kiên"
                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                        "Quận Ô Môn": [
                                                                                                                                                                                                                            "Phường Phước Thới",
                                                                                                                                                                                                                            "Phường Châu Văn Liêm",
                                                                                                                                                                                                                            "Phường Thới An",
                                                                                                                                                                                                                            "Phường Trường Lạc",
                                                                                                                                                                                                                            "Xã Trường Xuân",
                                                                                                                                                                                                                            "Xã Vĩnh Trinh",
                                                                                                                                                                                                                            "Xã Vĩnh Thạnh"
                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                        "Quận Thốt Nốt": [
                                                                                                                                                                                                                            "Phường Thốt Nốt",
                                                                                                                                                                                                                            "Phường Trung Nhứt",
                                                                                                                                                                                                                            "Phường Tân Lộc",
                                                                                                                                                                                                                            "Phường Tân Hưng",
                                                                                                                                                                                                                            "Xã Tân Hưng",
                                                                                                                                                                                                                            "Xã Tân Hưng Đông"
                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                        "Huyện Phong Điền": [
                                                                                                                                                                                                                            "Thị trấn Phong Điền",
                                                                                                                                                                                                                            "Xã Nhơn Ái",
                                                                                                                                                                                                                            "Xã Nhơn Nghĩa",
                                                                                                                                                                                                                            "Xã Giai Xuân",
                                                                                                                                                                                                                            "Xã Phú Hữu",
                                                                                                                                                                                                                            "Xã Tân Thới",
                                                                                                                                                                                                                            "Xã Trường Long"
                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                        "Huyện Cờ Đỏ": [
                                                                                                                                                                                                                            "Thị trấn Cờ Đỏ",
                                                                                                                                                                                                                            "Xã Thới Đông",
                                                                                                                                                                                                                            "Xã Thới Hưng",
                                                                                                                                                                                                                            "Xã Trung Thạnh",
                                                                                                                                                                                                                            "Xã Đông Hiệp",
                                                                                                                                                                                                                            "Xã Đông Thắng"
                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                        "Huyện Vĩnh Thạnh": [
                                                                                                                                                                                                                            "Thị trấn Vĩnh Thạnh",
                                                                                                                                                                                                                            "Xã Vĩnh Trinh",
                                                                                                                                                                                                                            "Xã Vĩnh Lộc",
                                                                                                                                                                                                                            "Xã Vĩnh Thạnh",
                                                                                                                                                                                                                            "Xã Vĩnh Khánh",
                                                                                                                                                                                                                            "Xã Vĩnh Tường"
                                                                                                                                                                                                                        ]
                                                                                                                                                                                                                    },
                                                                                                                                                                                                                    
                                                                                                                                                                                                                        "Tỉnh Hậu Giang": {
                                                                                                                                                                                                                            "Thành phố Vị Thanh": [
                                                                                                                                                                                                                                "Phường An Bình",
                                                                                                                                                                                                                                "Phường An Nghiệp",
                                                                                                                                                                                                                                "Phường 1",
                                                                                                                                                                                                                                "Phường 2",
                                                                                                                                                                                                                                "Phường 3",
                                                                                                                                                                                                                                "Phường 4",
                                                                                                                                                                                                                                "Phường 5"
                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                            "Huyện Châu Thành": [
                                                                                                                                                                                                                                "Thị trấn Châu Thành",
                                                                                                                                                                                                                                "Xã Đông Phú",
                                                                                                                                                                                                                                "Xã Phú Hữu",
                                                                                                                                                                                                                                "Xã Phú Tân",
                                                                                                                                                                                                                                "Xã Vị Thuỷ",
                                                                                                                                                                                                                                "Xã Vĩnh Tường"
                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                            "Huyện Long Mỹ": [
                                                                                                                                                                                                                                "Thị trấn Long Mỹ",
                                                                                                                                                                                                                                "Xã Long Bình",
                                                                                                                                                                                                                                "Xã Long Phú",
                                                                                                                                                                                                                                "Xã Long Thanh",
                                                                                                                                                                                                                                "Xã Xà Phiên",
                                                                                                                                                                                                                                "Xã Lương Nghĩa",
                                                                                                                                                                                                                                "Xã Lương Thế Trân"
                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                            "Huyện Phụng Hiệp": [
                                                                                                                                                                                                                                "Thị trấn Cái Tắc",
                                                                                                                                                                                                                                "Xã Phụng Hiệp",
                                                                                                                                                                                                                                "Xã Lái Hiếu",
                                                                                                                                                                                                                                "Xã Tân Long",
                                                                                                                                                                                                                                "Xã Tân Phú",
                                                                                                                                                                                                                                "Xã Tân Thạnh",
                                                                                                                                                                                                                                "Xã Vĩnh Thuận Đông"
                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                            "Huyện Vị Thủy": [
                                                                                                                                                                                                                                "Thị trấn Vị Thủy",
                                                                                                                                                                                                                                "Xã Vị Thủy",
                                                                                                                                                                                                                                "Xã Vị Đông",
                                                                                                                                                                                                                                "Xã Vị Thanh",
                                                                                                                                                                                                                                "Xã Vị Trung",
                                                                                                                                                                                                                                "Xã Vĩnh Tường"
                                                                                                                                                                                                                            ]
                                                                                                                                                                                                                        },
                                                                                                                                                                                                                        
                                                                                                                                                                                                                            "Tỉnh Sóc Trăng": {
                                                                                                                                                                                                                                "Thành phố Sóc Trăng": [
                                                                                                                                                                                                                                    "Phường 1",
                                                                                                                                                                                                                                    "Phường 2",
                                                                                                                                                                                                                                    "Phường 3",
                                                                                                                                                                                                                                    "Phường 4",
                                                                                                                                                                                                                                    "Phường 5",
                                                                                                                                                                                                                                    "Phường 6",
                                                                                                                                                                                                                                    "Phường 7",
                                                                                                                                                                                                                                    "Phường 8",
                                                                                                                                                                                                                                    "Xã Châu Khánh",
                                                                                                                                                                                                                                    "Xã Xuân Hòa"
                                                                                                                                                                                                                                ],
                                                                                                                                                                                                                                "Huyện Kế Sách": [
                                                                                                                                                                                                                                    "Thị trấn Kế Sách",
                                                                                                                                                                                                                                    "Xã Kế An",
                                                                                                                                                                                                                                    "Xã Kế Hòa",
                                                                                                                                                                                                                                    "Xã Thới An Hội",
                                                                                                                                                                                                                                    "Xã Vĩnh Lợi",
                                                                                                                                                                                                                                    "Xã Hòa Mỹ",
                                                                                                                                                                                                                                    "Xã Ba Trinh"
                                                                                                                                                                                                                                ],
                                                                                                                                                                                                                                "Huyện Mỹ Tú": [
                                                                                                                                                                                                                                    "Thị trấn Mỹ Tú",
                                                                                                                                                                                                                                    "Xã Mỹ Phước",
                                                                                                                                                                                                                                    "Xã Mỹ Tú",
                                                                                                                                                                                                                                    "Xã Mỹ Tân",
                                                                                                                                                                                                                                    "Xã Mỹ Hương",
                                                                                                                                                                                                                                    "Xã Mỹ Đông"
                                                                                                                                                                                                                                ],
                                                                                                                                                                                                                                "Huyện Cù Lao Dung": [
                                                                                                                                                                                                                                    "Thị trấn Cù Lao Dung",
                                                                                                                                                                                                                                    "Xã An Thạnh 1",
                                                                                                                                                                                                                                    "Xã An Thạnh 2",
                                                                                                                                                                                                                                    "Xã An Thạnh 3",
                                                                                                                                                                                                                                    "Xã An Thạnh 4",
                                                                                                                                                                                                                                    "Xã An Thạnh 5"
                                                                                                                                                                                                                                ],
                                                                                                                                                                                                                                "Huyện Long Phú": [
                                                                                                                                                                                                                                    "Thị trấn Long Phú",
                                                                                                                                                                                                                                    "Xã Long Phú",
                                                                                                                                                                                                                                    "Xã Châu Khánh",
                                                                                                                                                                                                                                    "Xã Phú Hữu",
                                                                                                                                                                                                                                    "Xã Tân Thạnh"
                                                                                                                                                                                                                                ],
                                                                                                                                                                                                                                "Huyện Ngã Năm": [
                                                                                                                                                                                                                                    "Thị trấn Ngã Năm",
                                                                                                                                                                                                                                    "Xã Tân Long",
                                                                                                                                                                                                                                    "Xã Tân Hưng",
                                                                                                                                                                                                                                    "Xã Tân Hòa",
                                                                                                                                                                                                                                    "Xã Tân Thạnh"
                                                                                                                                                                                                                                ],
                                                                                                                                                                                                                                "Huyện Trần Đề": [
                                                                                                                                                                                                                                    "Thị trấn Trần Đề",
                                                                                                                                                                                                                                    "Xã Liêu Tú",
                                                                                                                                                                                                                                    "Xã Trần Đề",
                                                                                                                                                                                                                                    "Xã Long Phú",
                                                                                                                                                                                                                                    "Xã Tân Hưng"
                                                                                                                                                                                                                                ]
                                                                                                                                                                                                                            },
                                                                                                                                                                                                                            
                                                                                                                                                                                                                                "Tỉnh Bạc Liêu": {
                                                                                                                                                                                                                                    "Thành phố Bạc Liêu": [
                                                                                                                                                                                                                                        "Phường 1",
                                                                                                                                                                                                                                        "Phường 2",
                                                                                                                                                                                                                                        "Phường 3",
                                                                                                                                                                                                                                        "Phường 4",
                                                                                                                                                                                                                                        "Phường 5",
                                                                                                                                                                                                                                        "Phường 6",
                                                                                                                                                                                                                                        "Phường 7",
                                                                                                                                                                                                                                        "Xã Hiệp Thành",
                                                                                                                                                                                                                                        "Xã Vĩnh Trạch",
                                                                                                                                                                                                                                        "Xã Vĩnh Trạch Đông"
                                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                                    "Huyện Bạc Liêu": [
                                                                                                                                                                                                                                        "Thị trấn Bạc Liêu",
                                                                                                                                                                                                                                        "Xã Hưng Thành",
                                                                                                                                                                                                                                        "Xã Hưng Hội",
                                                                                                                                                                                                                                        "Xã Vĩnh Lộc",
                                                                                                                                                                                                                                        "Xã Vĩnh Lộc A",
                                                                                                                                                                                                                                        "Xã Vĩnh Lộc B"
                                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                                    "Huyện Giá Rai": [
                                                                                                                                                                                                                                        "Thị trấn Giá Rai",
                                                                                                                                                                                                                                        "Xã Tân Phong",
                                                                                                                                                                                                                                        "Xã Phong Thạnh",
                                                                                                                                                                                                                                        "Xã Phong Thạnh A",
                                                                                                                                                                                                                                        "Xã Phong Thạnh B"
                                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                                    "Huyện Hòa Bình": [
                                                                                                                                                                                                                                        "Xã Hòa Bình",
                                                                                                                                                                                                                                        "Xã Vĩnh Thịnh",
                                                                                                                                                                                                                                        "Xã Vĩnh Trạch Đông",
                                                                                                                                                                                                                                        "Xã Vĩnh Trạch",
                                                                                                                                                                                                                                        "Xã Hưng Phú"
                                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                                    "Huyện Đông Hải": [
                                                                                                                                                                                                                                        "Thị trấn Gành Hào",
                                                                                                                                                                                                                                        "Xã Định Bình",
                                                                                                                                                                                                                                        "Xã Định An",
                                                                                                                                                                                                                                        "Xã Long Điền"
                                                                                                                                                                                                                                    ],
                                                                                                                                                                                                                                    "Huyện Phước Long": [
                                                                                                                                                                                                                                        "Thị trấn Phước Long",
                                                                                                                                                                                                                                        "Xã Phước Khánh",
                                                                                                                                                                                                                                        "Xã Phước Lộc",
                                                                                                                                                                                                                                        "Xã Phước Thành"
                                                                                                                                                                                                                                    ]
                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                    "Tỉnh Cà Mau": {
                                                                                                                                                                                                                                        "Thành phố Cà Mau": [
                                                                                                                                                                                                                                            "Phường 1",
                                                                                                                                                                                                                                            "Phường 2",
                                                                                                                                                                                                                                            "Phường 3",
                                                                                                                                                                                                                                            "Phường 4",
                                                                                                                                                                                                                                            "Phường 5",
                                                                                                                                                                                                                                            "Phường 6",
                                                                                                                                                                                                                                            "Phường 7",
                                                                                                                                                                                                                                            "Phường 8",
                                                                                                                                                                                                                                            "Xã Định Bình",
                                                                                                                                                                                                                                            "Xã Hòa Thành"
                                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                                        "Huyện Cái Nước": [
                                                                                                                                                                                                                                            "Thị trấn Cái Nước",
                                                                                                                                                                                                                                            "Xã Thạnh Phú",
                                                                                                                                                                                                                                            "Xã Thạnh Mỹ",
                                                                                                                                                                                                                                            "Xã Tân Hưng",
                                                                                                                                                                                                                                            "Xã Tân Thành"
                                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                                        "Huyện Đầm Dơi": [
                                                                                                                                                                                                                                            "Thị trấn Đầm Dơi",
                                                                                                                                                                                                                                            "Xã Tân Trung",
                                                                                                                                                                                                                                            "Xã Tân Đức",
                                                                                                                                                                                                                                            "Xã Tân Hải",
                                                                                                                                                                                                                                            "Xã Tân Thới"
                                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                                        "Huyện Năm Căn": [
                                                                                                                                                                                                                                            "Thị trấn Năm Căn",
                                                                                                                                                                                                                                            "Xã Hiệp Tùng",
                                                                                                                                                                                                                                            "Xã Hàng Vịnh",
                                                                                                                                                                                                                                            "Xã Lâm Hải"
                                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                                        "Huyện Ngọc Hiển": [
                                                                                                                                                                                                                                            "Thị trấn Rạch Gốc",
                                                                                                                                                                                                                                            "Xã Đất Mũi",
                                                                                                                                                                                                                                            "Xã Tân Hải"
                                                                                                                                                                                                                                        ],
                                                                                                                                                                                                                                        "Huyện U Minh": [
                                                                                                                                                                                                                                            "Thị trấn U Minh",
                                                                                                                                                                                                                                            "Xã Khánh An",
                                                                                                                                                                                                                                            "Xã Khánh Hòa",
                                                                                                                                                                                                                                            "Xã Khánh Lộc",
                                                                                                                                                                                                                                            "Xã Khánh Tiến"
                                                                                                                                                                                                                                        ]
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                           
                                                                                                                                                                                                                                
                                                                                                                                                                                                                            
                                                                                                                                                                                                                   
                                                                                                                                                                                                               
                                                                                                                                                                                                         
                                                                                                                                                                                           
                                                                                                                                                                                          
                                                                                                                                                                                                                                               
                                                                                                                                                                                
                                                                                                                                                                                                         
                                                                                                                                                                                                 
                                                                                                                                                                           
                                                                                                                                                                                 
                                                                                                                                             
                                                                                                                                                  
                                                                                                                                                                                                                      
                                                                                                                                                                                                                   
                                                                                                                                                                                                                
                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                    
                                                                                                                                                                                            
                                                                                                                                                                         
                                                                                                                                                                 
                                                                                                                                                       
                                                                                                                                     
                                                                                                                                                          
                                                                                                                                                                                                
                                                                                                                               
                                                                                                                           
                                                                                                                    
                                                                                                             
                                                                                                         
                                                                                                
                                                                                            
                                                                                  
                                                                              
                                                                 
                                                             
                                                   
                                            
                                    
                    
                
                
            
            
        
    
    
    
    


        
    
            




        


    
   
};

export default function GioHang() {
    const [recipientName, setRecipientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [address, setAddress] = useState('');
    const [showBarsMenu, setShowBarsMenu] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);

    // Dynamically update available districts based on selected city
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCity(e.target.value);
        setDistrict('');
        setWard('');
    };

    const handleInvoiceCheckboxChange = () => {
        setIsInvoiceVisible(prevState => !prevState);
    };

    

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Phương thức thanh toán:', paymentMethod);
        // Xử lý phương thức thanh toán ở đây
    };

    

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrict(e.target.value);
        setWard('');
    };

    const handleMouseEnterUserIcon = () => {
        setShowUserOptions(true);
    };

    const handleMouseLeaveUserIcon = () => {
        setShowUserOptions(false);
    };

    const handleLoginClick = () => {
        setIsRegister(false);
        setShowLoginModal(true);
    };

    const handleRegisterClick = () => {
        setIsRegister(true);
        setShowLoginModal(true);
    };

    const handleModalClose = () => {
        setShowLoginModal(false);
    };

    

        console.log({
            recipientName,
            phoneNumber,
            city,
            district,
            ward,
            address,
        });
    

    return (
        <>
            {/* Header */}
            <div className="p1"></div>

            {/* Navbar */}
            <div className="p2">
                <img src="/logo.jpg" alt="Logo" className="cart-image1" />

                {/* Wrapper cho Bars */}
                <div
                    className="bars-icon-wrapper"
                    onMouseEnter={() => setShowBarsMenu(true)}
                    onMouseLeave={() => setShowBarsMenu(false)}
                >
                    <FontAwesomeIcon icon={faBars} className="icon-small1" />

                    {/* Cửa sổ hiện ra khi di chuột vào Bars */}
                    {showBarsMenu && (
                        <div className="bars-menu-window">
                            <div className="bars-menu-header">
                                <h3>Danh mục sản phẩm</h3>
                            </div>
                            <div className="bars-menu-body">
                                <ul>
                                    <li><Link href="/category1">Danh mục 1</Link></li>
                                    <li><Link href="/category2">Danh mục 2</Link></li>
                                    <li><Link href="/category3">Danh mục 3</Link></li>
                                    <li><Link href="/category4">Danh mục 4</Link></li>
                                    <li><Link href="/category5">Danh mục 5</Link></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <button className="search-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-small" />
                    </button>
                </div>

                {/* Icon người dùng */}
                <div
                    className="user-icon-wrapper"
                    onMouseEnter={handleMouseEnterUserIcon}
                    onMouseLeave={handleMouseLeaveUserIcon}
                >
                    <FontAwesomeIcon icon={faUser} className="icon-small2" />

                    {/* Tùy chọn người dùng */}
                    {showUserOptions && (
                        <div className="user-options-popover">
                            <button className="btn-login" onClick={handleLoginClick}>Đăng Nhập</button>
                            <button className="btn-register" onClick={handleRegisterClick}>Đăng Ký</button>
                        </div>
                    )}
                </div>

                <FontAwesomeIcon icon={faShoppingCart} className="icon-small2" />

                {/* Wrapper cho Icon Thông báo */}
                <div
                    className="notification-wrapper"
                    onMouseEnter={() => setShowNotifications(true)}
                    onMouseLeave={() => setShowNotifications(false)}
                >
                    <FontAwesomeIcon icon={faBell} className="icon-small2" />

                    {showNotifications && (
                        <div className="notification-popover">
                            <p>Bạn có thông báo mới!</p>
                            <button className="btn-mark-read">Đánh dấu đã đọc</button>
                            <button className="btn-view-all">Xem tất cả</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Cửa sổ Đăng Nhập/Đăng Ký */}
            {showLoginModal && (
                <div className="login-modal">
                    <div className="login-content">
                        <h2>{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</h2>
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Mật Khẩu" />
                        <button className="btn-submit">{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</button>
                        <button className="btn-close" onClick={handleModalClose}>Đóng</button>
                    </div>
                </div>
            )}

            {/* Form giao hàng */}
            <form onSubmit={handleSubmit} className="delivery-address-form">
                <div className="card">
                    <h2>ĐỊA CHỈ GIAO HÀNG</h2>

                    <div className="form-row1">
                        <div className="form-group1">
                            <label htmlFor="recipientName">Họ và tên người nhận:</label>
                            <input
                                type="text"
                                id="recipientName"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="phoneNumber">Số điện thoại:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        {/* Tỉnh/Thành Phố Dropdown */}
                        <div className="form-group1">
                            <label htmlFor="city">Tỉnh/Thành Phố:</label>
                            <select
                                id="city"
                                value={city}
                                onChange={handleCityChange}
                                required
                            >
                                <option value="">Chọn Tỉnh/Thành Phố</option>
                                {Object.keys(data).map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quận/Huyện Dropdown */}
                        <div className="form-group1">
                            <label htmlFor="district">Quận/Huyện:</label>
                            <select
                                id="district"
                                value={district}
                                onChange={handleDistrictChange}
                                required
                                disabled={!city}
                            >
                                <option value="">Chọn Quận/Huyện</option>
                                {city &&
                                    Object.keys(data[city]).map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Phường/Xã Dropdown */}
                        <div className="form-group1">
                            <label htmlFor="ward">Phường/Xã:</label>
                            <select
                                id="ward"
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                                required
                                disabled={!district}
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {district &&
                                    data[city][district].map((ward) => (
                                        <option key={ward} value={ward}>
                                            {ward}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="form-group1">
                            <label htmlFor="address">Địa chỉ nhận hàng:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit">Xác nhận địa chỉ</button>
                </div>
            </form>
            <form className="shipping-method-form">


    <h2>PHƯƠNG THỨC VẬN CHUYỂN</h2>

    <div className="form-group2">
        <label>
            <input type="radio" name="shippingMethod" value="standard" required />
            Vận chuyển tiêu chuẩn (3-5 ngày)
        </label>
    </div>
    
    <div className="form-group2">
        <label>
            <input type="radio" name="shippingMethod" value="express" />
            Vận chuyển nhanh (1-2 ngày)
        </label>
    </div>
    
    <div className="form-group2">
        <label>
            <input type="radio" name="shippingMethod" value="overnight" />
            Vận chuyển siêu tốc nhận trong ngày (chỉ áp dụng trong nội thành phố HCM)
        </label>
    </div>

    <button type="submit">Xác nhận phương thức vận chuyển</button>
</form>



<form onSubmit={handleSubmit}>
    <div className="form-group3">
        <h2>PHƯƠNG THỨC THANH TOÁN</h2>


<div className="form-group5">
    <label>
        <input 
            type="radio" 
            name="paymentMethod" 
            value="card" 
            checked={paymentMethod === 'card'} 
            onChange={handlePaymentChange} 
        />
        Thanh toán qua thẻ
    </label>
</div>

<div className="form-group5">
    <label>
        <input 
            type="radio" 
            name="paymentMethod" 
            value="cash" 
            checked={paymentMethod === 'cash'} 
            onChange={handlePaymentChange} 
        />
        Thanh toán khi nhận hàng
    </label>
</div>

<div className="form-group5">
    <label>
        <input 
            type="radio" 
            name="paymentMethod" 
            value="paypal" 
            checked={paymentMethod === 'paypal'} 
            onChange={handlePaymentChange} 
        />
        Thanh toán qua PayPal
    </label>
</div>

<button type="submit">Xác nhận phương thức thanh toán</button></div>
    
</form>
<form className="info-form">
    <h2>THÔNG TIN KHÁC</h2>
    
    <div className="form-group">
        <label htmlFor="note">Ghi chú:</label>
        <textarea id="note" rows={4} placeholder="Nhập ghi chú ở đây...(nếu có)"></textarea>
    </div>

    <div className="form-group6">
        <input
            type="checkbox"
            id="invoice-checkbox"
            onChange={handleInvoiceCheckboxChange}
        />
        <label htmlFor="invoice-checkbox">Xuất hóa đơn GTGT</label>
    </div>

    {isInvoiceVisible && ( // Điều kiện hiển thị phần nhập thông tin hóa đơn
        <div className="invoice-info">
            <h3>Thông tin hóa đơn</h3>
            <div className="form-group4">
                <label htmlFor="buyerName">Họ tên người mua hàng:</label>
                <input type="text" id="buyerName" placeholder="Nhập họ tên người mua hàng" />
            </div>
            <div className="form-group4">
                <label htmlFor="companyName">Tên công ty:</label>
                <input type="text" id="companyName" placeholder="Nhập tên công ty" />
            </div>
            <div className="form-group4">
                <label htmlFor="companyAddress">Địa chỉ công ty:</label>
                <input type="text" id="companyAddress" placeholder="Nhập địa chỉ công ty" />
            </div>
            <div className="form-group4">
                <label htmlFor="taxId">Mã số thuế:</label>
                <input type="text" id="taxId" placeholder="Nhập mã số thuế" />
            </div>
            <div className="form-group4">
                <label htmlFor="email">Email nhận hóa đơn:</label>
                <input type="email" id="email" placeholder="Nhập email nhận hóa đơn" />
            </div>
        </div>
    )}
</form>


        </>
    );
}