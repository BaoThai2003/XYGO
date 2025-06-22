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

    //giai doan giai
    function renderTournament() {
        const stagesContainer = document.getElementById('tournament-stages');
        const ol = document.createElement('ol');
        
        tournament.stages.forEach(stage => {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            strong.textContent = stage.name;
            li.appendChild(strong);
            
            const ul = document.createElement('ul');
            stage.details.forEach(detail => {
                const detailLi = document.createElement('li');
                const strongDetail = document.createElement('strong');
                strongDetail.textContent = detail.title + ': ';
                detailLi.appendChild(strongDetail);
                
                if (typeof detail.content === 'string') {
                    detailLi.appendChild(document.createTextNode(detail.content));
                } else if (Array.isArray(detail.content)) {
                    const subUl = document.createElement('ul');
                    detail.content.forEach(item => {
                        const subLi = document.createElement('li');
                        subLi.textContent = item;
                        subUl.appendChild(subLi);
                    });
                    detailLi.appendChild(subUl);
                }
                
                if (detail.subDetails) {
                    const subUl = document.createElement('ul');
                    detail.subDetails.forEach(subDetail => {
                        const subDetailLi = document.createElement('li');
                        const strongSubDetail = document.createElement('strong');
                        strongSubDetail.textContent = subDetail.title + ':';
                        subDetailLi.appendChild(strongSubDetail);
                        
                        const subSubUl = document.createElement('ul');
                        subDetail.content.forEach(item => {
                            const subSubLi = document.createElement('li');
                            subSubLi.textContent = item;
                            subSubUl.appendChild(subSubLi);
                        });
                        subDetailLi.appendChild(subSubUl);
                        subUl.appendChild(subDetailLi);
                    });
                    detailLi.appendChild(subUl);
                }
                
                ul.appendChild(detailLi);
            });
            
            li.appendChild(ul);
            ol.appendChild(li);
        });
        
        stagesContainer.appendChild(ol);
    }

    //hien thi nguoi choi
    function fetchPlayers() {
        fetch('players.php?action=get')
            .then(response => response.json())
            .then(data => {
                const playerList = document.getElementById('playerList');
                playerList.innerHTML = '';
                data.forEach(player => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${player.name}
                        <div>
                            <button class="edit-btn" onclick="editPlayer(${player.id}, '${player.name}')">Chỉnh sửa</button>
                            <button class="delete-btn" onclick="deletePlayer(${player.id})">Xóa</button>
                        </div>
                    `;
                    playerList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching players:', error));
    }

    //them nguoi choi
    function addOrUpdatePlayer() {
        const id = document.getElementById('playerId').value;
        const name = document.getElementById('playerName').value.trim();
        if (!name) {
            alert('Vui lòng nhập tên người chơi!');
            return;
        }

        const action = id ? 'update' : 'add';
        fetch(`players.php?action=${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchPlayers();
                    document.getElementById('playerName').value = '';
                    document.getElementById('playerId').value = '';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    }
}