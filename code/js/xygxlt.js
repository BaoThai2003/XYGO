if (window.location.pathname.includes('xygxlt.html')) {
    // Tournament data structure
    const tournament = {
        name: "XYGO GX Legacy Tournament (XYGXLT)",
        stages: [
            {
                name: "Giai đoạn 1",
                details: [
                    {
                        title: "Thể lệ",
                        content: "24 thí sinh được chia ra làm 3 nhóm, mỗi nhóm có 8 thí sinh: Obelisk Blue, Ra Yellow và Slifer Red. Toàn bộ thành viên của nhóm sẽ thi đấu với tất cả các thành viên của 2 nhóm còn lại."
                    },
                    {
                        title: "Kết thúc giai đoạn 1",
                        subDetails: [
                            {
                                title: "Nhóm có số điểm cao nhất",
                                content: [
                                    "Cả 8 thành viên vào Vòng Thử Thách.",
                                    "Nếu thành viên hạng 7 và hạng 8 của nhóm này có tổng số trận thắng nhỏ hơn 5 thì họ sẽ phải tham dự Vòng Play-in thay vì vào thẳng."
                                ]
                            },
                            {
                                title: "Hai nhóm còn lại",
                                content: [
                                    "16 thành viên của 2 nhóm còn lại sẽ được gộp lại chung 1 bảng xếp hạng, sau đó sẽ xét thứ hạng dựa theo thành tích ở giai đoạn 1.",
                                    "4 thành viên có điểm số tốt nhất ở giai đoạn 1 sẽ vào vòng Thử Thách.",
                                    "8 (hoặc 10) thành viên còn lại có thành tích xếp sau đó (có thể +2 thành viên hạng 7 và 8 của đội thắng) sẽ tham dự vòng Play-in.",
                                    "4 thành viên có thành tích tệ nhất sẽ trực tiếp bị loại.",
                                    "Trong trường hợp 2 player bằng điểm và hệ số với nhau thì sẽ xem xét ưu tiên cho thành viên của nhóm cao điểm hơn."
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "Giai đoạn 2: Vòng Play-in",
                details: [
                    {
                        title: "Đối tượng tham gia",
                        content: "8 (hoặc 10) thành viên có điểm số tốt ở giai đoạn 1."
                    },
                    {
                        title: "Thể lệ",
                        content: "8 (hoặc 10) player được gộp vào 1 bảng đánh Swiss Stage 3 round. 4 (hoặc 6) player có thành tích tốt nhất sẽ vào Vòng Thử Thách."
                    },
                    {
                        title: "Lưu ý",
                        content: "Trong trường hợp bằng điểm thì sẽ xem xét thứ hạng trên bảng xếp hạng, player có thứ hạng cao hơn sẽ được xếp trên."
                    }
                ]
            },
            {
                name: "Giai đoạn 3: Vòng Thử Thách",
                details: [
                    {
                        title: "Đối tượng tham gia",
                        content: "8 (hoặc 6) thành viên của nhóm thắng, 4 player có thành tích tốt nhất và 4 (hoặc 6) player vượt qua vòng Play-in."
                    },
                    {
                        title: "Thể lệ",
                        content: "Các player sẽ đánh theo thể thức Swiss Thụy Sĩ để tranh 8 vé vào vòng Play-off. Player có được 3 chiến thắng sẽ vào Play-off, player có 3 thất bại sẽ bị loại."
                    }
                ]
            },
            {
                name: "Giai đoạn 4: Vòng Play-off",
                details: [
                    {
                        title: "Đối tượng tham gia",
                        content: "8 player vượt qua Vòng Thử Thách."
                    },
                    {
                        title: "Thể lệ",
                        content: "8 player đánh loại trực tiếp để tìm nhà vô địch."
                    }
                ]
            }
        ]
    };
}