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

    // Render tournament stages
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

    // Fetch and display players by group
    function fetchPlayers() {
        fetch('players.php?action=get')
            .then(response => response.json())
            .then(players => {
                const groups = {
                    'Obelisk Blue': document.getElementById('obeliskBlueList'),
                    'Ra Yellow': document.getElementById('raYellowList'),
                    'Slifer Red': document.getElementById('sliferRedList')
                };

                Object.keys(groups).forEach(group => {
                    groups[group].innerHTML = '';
                });

                players.forEach(player => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${player.name} (Thắng: ${player.wins}, Hệ số: ${player.tiebreaker})
                        <div>
                            <button class="edit-btn" onclick="editPlayer(${player.id}, '${player.name}', '${player.group}', ${player.wins})">Chỉnh sửa</button>
                            <button class="delete-btn" onclick="deletePlayer(${player.id})">Xóa</button>
                        </div>
                    `;
                    groups[player.group].appendChild(li);
                });

                calculateStage1Results(players);
            })
            .catch(error => console.error('Error fetching players:', error));
    }

    // Add or update player
    function addOrUpdatePlayer() {
        const id = document.getElementById('playerId').value;
        const name = document.getElementById('playerName').value.trim();
        const group = document.getElementById('playerGroup').value;
        const wins = parseInt(document.getElementById('playerWins').value) || 0;
        const tiebreaker = parseFloat(document.getElementById('playerTiebreaker').value) || 0.0;

        if (!name) {
            alert('Vui lòng nhập tên người chơi!');
            return;
        }

        const action = id ? 'update' : 'add';
        fetch(`players.php?action=${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, group, wins, tiebreaker })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchPlayers();
                    document.getElementById('playerName').value = '';
                    document.getElementById('playerGroup').value = 'Obelisk Blue';
                    document.getElementById('playerWins').value = '';
                    document.getElementById('playerId').value = '';
                    document.getElementById('playerTiebreaker').value = '';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Edit player
    function editPlayer(id, name, group, wins) {
        document.getElementById('playerId').value = id;
        document.getElementById('playerName').value = name;
        document.getElementById('playerGroup').value = group;
        document.getElementById('playerWins').value = wins;
    }

    // Delete player
    function deletePlayer(id) {
        if (confirm('Bạn có chắc muốn xóa người chơi này?')) {
            fetch(`players.php?action=delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchPlayers();
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }

    // Calculate Stage 1 results
    function calculateStage1Results(players) {
        // Calculate group points
        const groupPoints = {
            'Obelisk Blue': 0,
            'Ra Yellow': 0,
            'Slifer Red': 0
        };

        const groupPlayers = {
            'Obelisk Blue': [],
            'Ra Yellow': [],
            'Slifer Red': []
        };

        players.forEach(player => {
            groupPoints[player.group] += player.wins;
            groupPlayers[player.group].push(player);
        });

        // Sort groups by total points
        const groupRankings = Object.keys(groupPoints).sort((a, b) => groupPoints[b] - groupPoints[a]);

        // Display group rankings
        const groupRankingsDiv = document.getElementById('group-rankings');
        groupRankingsDiv.innerHTML = `<p>${groupRankings.map((group, index) => `${index + 1}. ${group}: ${groupPoints[group]} điểm`).join('<br>')}</p>`;

        // Sort players within each group by wins and tiebreaker
        Object.keys(groupPlayers).forEach(group => {
            groupPlayers[group].sort((a, b) => {
                if (b.wins === a.wins) {
                    return b.tiebreaker - a.tiebreaker;
                }
                return b.wins - a.wins;
            });
        });

        // Determine advancing players
        const topGroup = groupRankings[0];
        let toChallenge = [];
        let toPlayIn = [];
        let eliminated = [];

        // Top group processing
        groupPlayers[topGroup].forEach((player, index) => {
            if (index < 6 || (index >= 6 && player.wins >= 5)) {
                toChallenge.push(player.name);
            } else {
                toPlayIn.push(player);
            }
        });

        // Other two groups processing
        const otherGroups = groupRankings.slice(1);
        let otherPlayers = [];
        otherGroups.forEach(group => {
            otherPlayers = otherPlayers.concat(groupPlayers[group]);
        });

        // Sort other players by wins and tiebreaker, with group priority
        otherPlayers.sort((a, b) => {
            if (b.wins === a.wins) {
                if (b.tiebreaker === a.tiebreaker) {
                    const aGroupRank = groupRankings.indexOf(a.group);
                    const bGroupRank = groupRankings.indexOf(b.group);
                    return aGroupRank - bGroupRank;
                }
                return b.tiebreaker - a.tiebreaker;
            }
            return b.wins - a.wins;
        });

        // Top 4 from other groups go to Challenge
        toChallenge = toChallenge.concat(otherPlayers.slice(0, 4).map(p => p.name));

        // Next 8 (or 10) go to Play-in
        const playInCount = toPlayIn.length === 2 ? 10 : 8;
        toPlayIn = toPlayIn.concat(otherPlayers.slice(4, 4 + playInCount));

        // Bottom 4 are eliminated
        eliminated = otherPlayers.slice(4 + playInCount).map(p => p.name);

        // Display results
        document.getElementById('toChallenge').textContent = toChallenge.join(', ');
        document.getElementById('toPlayIn').textContent = toPlayIn.map(p => p.name).join(', ');
        document.getElementById('eliminated').textContent = eliminated.join(', ');
    }

    // Initialize the page
    function init() {
        renderTournament();
        fetchPlayers();
    }

    init();
}