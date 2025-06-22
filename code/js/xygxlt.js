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
                                    "Nếu thành viên hạng 7 và hạng 8 của nhóm này có tổng số điểm riêng nhỏ hơn 5 thì họ sẽ phải tham dự Vòng Play-in thay vì vào thẳng."
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

    let allPlayers = [];
    let currentStage = 'stage1';
    let playInPlayers = [];
    let challengePlayers = [];
    let playOffPlayers = [];

    // Fetch and display players by group
    function fetchPlayers() {
        fetch('players.php?action=get')
            .then(response => response.json())
            .then(players => {
                allPlayers = players;
                const groups = {
                    'Obelisk Blue': document.getElementById('obeliskBlueTable').querySelector('tbody'),
                    'Ra Yellow': document.getElementById('raYellowTable').querySelector('tbody'),
                    'Slifer Red': document.getElementById('sliferRedTable').querySelector('tbody')
                };

                Object.keys(groups).forEach(group => {
                    groups[group].innerHTML = '';
                });

                players.forEach(player => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${player.name}</td>
                        <td>${player.points}</td>
                        <td>${player.tiebreaker}</td>
                        <td>
                            <button class="edit-btn" onclick="editPlayer(${player.id}, '${player.name}', '${player.group}')">Chỉnh sửa</button>
                            <button class="delete-btn" onclick="deletePlayer(${player.id})">Xóa</button>
                        </td>
                    `;
                    groups[player.group].appendChild(tr);
                });

                // Update player filter for match history
                const playerFilter = document.getElementById('historyPlayerFilter');
                playerFilter.innerHTML = '<option value="all">Tất cả người chơi</option>';
                players.forEach(player => {
                    const option = document.createElement('option');
                    option.value = player.id;
                    option.textContent = `${player.name} (${player.group})`;
                    playerFilter.appendChild(option);
                });

                calculateStageResults();
                fetchMatchHistory();
                fetchMatchSchedule();
            })
            .catch(error => {
                console.error('Error fetching players:', error);
                alert('Không thể tải danh sách người chơi. Vui lòng kiểm tra kết nối hoặc cấu hình server.');
            });
    }

    // Add or update player
    function addOrUpdatePlayer() {
        const id = document.getElementById('playerId').value;
        const name = document.getElementById('playerName').value.trim();
        const group = document.getElementById('playerGroup').value;

        if (!name) {
            alert('Vui lòng nhập tên người chơi!');
            return;
        }

        const action = id ? 'update' : 'add';
        fetch(`players.php?action=${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, group, points: 0, tiebreaker: 0.0 })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchPlayers();
                    document.getElementById('playerName').value = '';
                    document.getElementById('playerGroup').value = 'Obelisk Blue';
                    document.getElementById('playerId').value = '';
                    alert('Thêm/Chỉnh sửa người chơi thành công!');
                } else {
                    alert(data.message || 'Lỗi khi thêm/chỉnh sửa người chơi. Vui lòng thử lại.');
                }
            })
            .catch(error => {
                console.error('Error adding/updating player:', error);
                alert('Lỗi kết nối server hoặc cấu hình. Vui lòng kiểm tra console để biết chi tiết.');
            });
    }

    // Edit player
    function editPlayer(id, name, group) {
        document.getElementById('playerId').value = id;
        document.getElementById('playerName').value = name;
        document.getElementById('playerGroup').value = group;
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
                        alert('Xóa người chơi thành công!');
                    } else {
                        alert(data.message || 'Lỗi khi xóa người chơi.');
                    }
                })
                .catch(error => console.error('Error deleting player:', error));
        }
    }

    // Fetch match schedule
    function fetchMatchSchedule() {
        const stageFilter = document.getElementById('stageFilter').value;
        fetch(`players.php?action=getMatches&status=pending&stage=${stageFilter}`)
            .then(response => response.json())
            .then(matches => {
                const matchList = document.getElementById('matchSchedule');
                matchList.innerHTML = '';
                matches.forEach(match => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${match.player1_name} (${match.player1_group}) vs ${match.player2_name} (${match.player2_group}) - ${match.stage}
                        <div>
                            <input type="number" id="score1_${match.id}" placeholder="Điểm" min="0">
                            <span>vs</span>
                            <input type="number" id="score2_${match.id}" placeholder="Điểm" min="0">
                            <button onclick="submitMatchResult(${match.id}, ${match.player1_id}, ${match.player2_id}, '${match.stage}')">Cập nhật</button>
                        </div>
                    `;
                    matchList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching match schedule:', error));
    }

    // Fetch match history
    function fetchMatchHistory() {
        const groupFilter = document.getElementById('historyGroupFilter').value;
        const playerFilter = document.getElementById('historyPlayerFilter').value;
        fetch(`players.php?action=getMatches&status=completed&group=${groupFilter}&player=${playerFilter}`)
            .then(response => response.json())
            .then(matches => {
                const matchList = document.getElementById('matchHistory');
                matchList.innerHTML = '';
                matches.forEach(match => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${match.player1_name} (${match.player1_group}) ${match.score1} - ${match.score2} ${match.player2_name} (${match.player2_group}) - ${match.stage} (${new Date(match.match_date).toLocaleString()})
                    `;
                    matchList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching match history:', error));
    }

    // Submit match result
    function submitMatchResult(matchId, player1Id, player2Id, stage) {
        const score1 = parseInt(document.getElementById(`score1_${matchId}`).value) || 0;
        const score2 = parseInt(document.getElementById(`score2_${matchId}`).value) || 0;

        const player1 = allPlayers.find(p => p.id === player1Id);
        const player2 = allPlayers.find(p => p.id === player2Id);

        if (!player1 || !player2) {
            alert('Người chơi không tồn tại!');
            return;
        }

        // Calculate points and tiebreaker
        const player1NewPoints = player1.points + score1;
        const player2NewPoints = player2.points + score2;
        const player1Tiebreaker = player1.tiebreaker + (score1 - score2);
        const player2Tiebreaker = player2.tiebreaker + (score2 - score1);

        // Update group points
        let groupPointsUpdate = {};
        if (score1 >= score2) {
            groupPointsUpdate[player1.group] = (groupPointsUpdate[player1.group] || 0) + 1;
        } else {
            groupPointsUpdate[player2.group] = (groupPointsUpdate[player2.group] || 0) + 1;
        }

        // Update match and players
        fetch('players.php?action=updateMatch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                matchId,
                score1,
                score2,
                player1: { id: player1Id, points: player1NewPoints, tiebreaker: player1Tiebreaker },
                player2: { id: player2Id, points: player2NewPoints, tiebreaker: player2Tiebreaker },
                groupPoints: groupPointsUpdate
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchPlayers();
                    if (stage === 'playIn' || stage === 'challenge') {
                        updateSwissStandings(stage);
                    } else if (stage === 'playOff') {
                        updatePlayOffBracket();
                    }
                } else {
                    alert(data.message || 'Lỗi khi cập nhật kết quả trận đấu.');
                }
            })
            .catch(error => alert('Lỗi: ' + error.message));
    }

    // Generate match schedule
    function generateSchedule() {
        const stage = document.getElementById('stageFilter').value;
        let players = [];

        if (stage === 'stage1') {
            // Stage 1: Each player vs all players from other groups
            const groups = {
                'Obelisk Blue': allPlayers.filter(p => p.group === 'Obelisk Blue'),
                'Ra Yellow': allPlayers.filter(p => p.group === 'Ra Yellow'),
                'Slifer Red': allPlayers.filter(p => p.group === 'Slifer Red')
            };

            let matches = [];
            Object.keys(groups).forEach(group => {
                const otherGroups = Object.keys(groups).filter(g => g !== group);
                groups[group].forEach(player => {
                    otherGroups.forEach(otherGroup => {
                        groups[otherGroup].forEach(opponent => {
                            matches.push({
                                player1_id: player.id,
                                player2_id: opponent.id,
                                stage: 'stage1'
                            });
                        });
                    });
                });
            });

            fetch('players.php?action=createMatches', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(matches)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchMatchSchedule();
                    } else {
                        alert(data.message || 'Lỗi khi tạo lịch thi đấu.');
                    }
                });
        } else if (stage === 'playIn') {
            // Play-in: Swiss Stage for 8 or 10 players
            players = playInPlayers;
            generateSwissMatches(players, 'playIn', 3);
        } else if (stage === 'challenge') {
            // Challenge: Swiss Stage for 12 or 16 players
            players = challengePlayers;
            generateSwissMatches(players, 'challenge');
        } else if (stage === 'playOff') {
            // Play-off: Single elimination for 8 players
            players = playOffPlayers;
            generatePlayOffMatches(players);
        }
    }

    // Generate Swiss matches
    function generateSwissMatches(players, stage, rounds = null) {
        let matches = [];
        const standings = players.map(p => ({
            id: p.id,
            points: 0,
            tiebreaker: 0,
            opponents: []
        }));

        for (let round = 1; rounds ? round <= rounds : true; round++) {
            standings.sort((a, b) => b.points - a.points || b.tiebreaker - a.tiebreaker);
            let paired = new Set();
            let roundMatches = [];

            for (let i = 0; i < standings.length; i++) {
                if (paired.has(standings[i].id)) continue;
                for (let j = i + 1; j < standings.length; j++) {
                    if (paired.has(standings[j].id) || standings[i].opponents.includes(standings[j].id)) continue;
                    roundMatches.push({
                        player1_id: standings[i].id,
                        player2_id: standings[j].id,
                        stage
                    });
                    paired.add(standings[i].id);
                    paired.add(standings[j].id);
                    standings[i].opponents.push(standings[j].id);
                    standings[j].opponents.push(standings[i].id);
                    break;
                }
            }

            matches = matches.concat(roundMatches);

            if (stage === 'challenge') {
                // Check for 3 wins or 3 losses
                const playerStats = standings.map(s => {
                    const wins = matches.filter(m => (m.player1_id === s.id && m.score1 > m.score2) || (m.player2_id === s.id && m.score2 > m.score1)).length;
                    const losses = matches.filter(m => (m.player1_id === s.id && m.score1 < m.score2) || (m.player2_id === s.id && m.score2 < m.score1)).length;
                    return { id: s.id, wins, losses };
                });

                const qualified = playerStats.filter(s => s.wins >= 3).length;
                const eliminated = playerStats.filter(s => s.losses >= 3).length;

                if (qualified >= 8 || eliminated >= standings.length - 8) break;
            }

            if (rounds && round >= rounds) break;
        }

        fetch('players.php?action=createMatches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(matches)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchMatchSchedule();
                } else {
                    alert(data.message || 'Lỗi khi tạo lịch thi đấu.');
                }
            });
    }

    // Generate Play-off matches
    function generatePlayOffMatches(players) {
        let matches = [];
        // Seed players based on Swiss Stage performance
        players.sort((a, b) => b.points - a.points || b.tiebreaker - a.tiebreaker);
        const seeds = [1, 8, 4, 5, 2, 7, 3, 6]; // Standard 8-player bracket
        for (let i = 0; i < 4; i++) {
            matches.push({
                player1_id: players[seeds[i * 2] - 1].id,
                player2_id: players[seeds[i * 2 + 1] - 1].id,
                stage: 'playOff'
            });
        }

        fetch('players.php?action=createMatches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(matches)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchMatchSchedule();
                } else {
                    alert(data.message || 'Lỗi khi tạo lịch thi đấu.');
                }
            });
    }

    // Update Swiss standings
    function updateSwissStandings(stage) {
        const players = stage === 'playIn' ? playInPlayers : challengePlayers;
        fetch('players.php?action=getMatches&status=completed&stage=' + stage)
            .then(response => response.json())
            .then(matches => {
                const standings = players.map(p => ({
                    id: p.id,
                    points: p.points,
                    tiebreaker: p.tiebreaker,
                    wins: 0,
                    losses: 0
                }));

                matches.forEach(match => {
                    const p1 = standings.find(s => s.id === match.player1_id);
                    const p2 = standings.find(s => s.id === match.player2_id);
                    if (match.score1 > match.score2) {
                        p1.wins++;
                        p2.losses++;
                    } else if (match.score2 > match.score1) {
                        p2.wins++;
                        p1.losses++;
                    }
                });

                if (stage === 'playIn') {
                    standings.sort((a, b) => b.wins - a.wins || b.points - a.points || b.tiebreaker - a.tiebreaker);
                    challengePlayers = challengePlayers.concat(standings.slice(0, standings.length === 10 ? 6 : 4).map(s => allPlayers.find(p => p.id === s.id)));
                    currentStage = 'challenge';
                    generateSchedule();
                } else if (stage === 'challenge') {
                    const qualified = standings.filter(s => s.wins >= 3).map(s => allPlayers.find(p => p.id === s.id));
                    if (qualified.length >= 8) {
                        playOffPlayers = qualified.slice(0, 8);
                        currentStage = 'playOff';
                        generateSchedule();
                    }
                }
            });
    }

    // Update Play-off bracket
    function updatePlayOffBracket() {
        fetch('players.php?action=getMatches&status=completed&stage=playOff')
            .then(response => response.json())
            .then(matches => {
                let winners = [];
                matches.forEach(match => {
                    const winnerId = match.score1 > match.score2 ? match.player1_id : match.player2_id;
                    winners.push(allPlayers.find(p => p.id === winnerId));
                });

                if (winners.length === 4) {
                    // Semi-finals
                    let semiMatches = [
                        { player1_id: winners[0].id, player2_id: winners[1].id, stage: 'playOff' },
                        { player1_id: winners[2].id, player2_id: winners[3].id, stage: 'playOff' }
                    ];
                    fetch('players.php?action=createMatches', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(semiMatches)
                    }).then(() => fetchMatchSchedule());
                } else if (winners.length === 2) {
                    // Final
                    let finalMatch = [{ player1_id: winners[0].id, player2_id: winners[1].id, stage: 'playOff' }];
                    fetch('players.php?action=createMatches', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(finalMatch)
                    }).then(() => fetchMatchSchedule());
                } else if (winners.length === 1) {
                    alert(`Nhà vô địch: ${winners[0].name}!`);
                }
            });
    }

    // Calculate stage results
    function calculateStageResults() {
        fetch('players.php?action=get')
            .then(response => response.json())
            .then(players => {
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
                    groupPoints[player.group] = player.group_points || 0;
                    groupPlayers[player.group].push(player);
                });

                // Sort groups by total points
                const groupRankings = Object.keys(groupPoints).sort((a, b) => groupPoints[b] - groupPoints[a]);

                // Display group rankings
                const groupRankingsTable = document.getElementById('groupRankings').querySelector('tbody');
                groupRankingsTable.innerHTML = '';
                groupRankings.forEach((group, index) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${group}</td>
                        <td>${groupPoints[group]}</td>
                    `;
                    groupRankingsTable.appendChild(tr);
                });

                // Sort players within each group by points and tiebreaker
                Object.keys(groupPlayers).forEach(group => {
                    groupPlayers[group].sort((a, b) => {
                        if (b.points === a.points) {
                            return b.tiebreaker - a.tiebreaker;
                        }
                        return b.points - a.points;
                    });
                });

                // Determine advancing players
                const topGroup = groupRankings[0];
                let toChallenge = [];
                let toPlayIn = [];
                let eliminated = [];

                // Top group processing
                groupPlayers[topGroup].forEach((player, index) => {
                    if (index < 6 || (index >= 6 && player.points >= 5)) {
                        toChallenge.push(player);
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

                // Sort other players by points and tiebreaker, with group priority
                otherPlayers.sort((a, b) => {
                    if (b.points === a.points) {
                        if (b.tiebreaker === a.tiebreaker) {
                            const aGroupRank = groupRankings.indexOf(a.group);
                            const bGroupRank = groupRankings.indexOf(b.group);
                            return aGroupRank - bGroupRank;
                        }
                        return b.tiebreaker - a.tiebreaker;
                    }
                    return b.points - a.points;
                });

                // Top 4 from other groups go to Challenge
                toChallenge = toChallenge.concat(otherPlayers.slice(0, 4));

                // Next 8 (or 10) go to Play-in
                const playInCount = toPlayIn.length === 2 ? 10 : 8;
                toPlayIn = toPlayIn.concat(otherPlayers.slice(4, 4 + playInCount));

                // Bottom 4 are eliminated
                eliminated = otherPlayers.slice(4 + playInCount);

                // Update global lists
                playInPlayers = toPlayIn;
                challengePlayers = toChallenge;
                eliminated = eliminated.map(p => p.name);

                // Display results
                document.getElementById('toChallenge').textContent = toChallenge.map(p => p.name).join(', ');
                document.getElementById('toPlayIn').textContent = toPlayIn.map(p => p.name).join(', ');
                document.getElementById('eliminated').textContent = eliminated.join(', ');
            });
    }

    // Initialize the page
    function init() {
        renderTournament();
        fetchPlayers();
    }

    init();
}