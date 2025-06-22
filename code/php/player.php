<?php
header('Content-Type: application/json');

$host = 'XYGXLT.localhost';
$dbname = 'XYGXLT';
$user = 'VHTB';
$password = '1';
$dsn = "pgsql:host=$host;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $action = isset($_GET['action']) ? $_GET['action'] : '';

    if ($action == 'get') {
        $stmt = $pdo->query('SELECT p.*, g.points AS group_points FROM players p JOIN groups g ON p.group_name = g.name ORDER BY p.name');
        $players = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($players);
    } elseif ($action == 'add') {
        $data = json_decode(file_get_contents('php://input'), true);
        $name = isset($data['name']) ? trim($data['name']) : '';
        $group = isset($data['group']) ? trim($data['group']) : '';
        $points = isset($data['points']) ? (int)$data['points'] : 0;
        $tiebreaker = isset($data['tiebreaker']) ? (float)$data['tiebreaker'] : 0.0;

        if (!$name) {
            echo json_encode(['success' => false, 'message' => 'Tên người chơi không được để trống']);
            exit;
        }
        if (!in_array($group, ['Obelisk Blue', 'Ra Yellow', 'Slifer Red'])) {
            echo json_encode(['success' => false, 'message' => 'Nhóm không hợp lệ']);
            exit;
        }

        try {
            $stmt = $pdo->prepare('INSERT INTO players (name, group_name, points, tiebreaker) VALUES (?, ?, ?, ?)');
            $stmt->execute([$name, $group, $points, $tiebreaker]);
            echo json_encode(['success' => true, 'message' => 'Thêm người chơi thành công']);
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'unique constraint') !== false) {
                echo json_encode(['success' => false, 'message' => 'Tên người chơi đã tồn tại']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Lỗi database: ' . $e->getMessage()]);
            }
        }
    } elseif ($action == 'update') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        $name = isset($data['name']) ? trim($data['name']) : '';
        $group = isset($data['group']) ? trim($data['group']) : '';
        $points = isset($data['points']) ? (int)$data['points'] : 0;
        $tiebreaker = isset($data['tiebreaker']) ? (float)$data['tiebreaker'] : 0.0;

        if (!$id || !$name || !in_array($group, ['Obelisk Blue', 'Ra Yellow', 'Slifer Red'])) {
            echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
            exit;
        }

        try {
            $stmt = $pdo->prepare('UPDATE players SET name = ?, group_name = ?, points = ?, tiebreaker = ? WHERE id = ?');
            $stmt->execute([$name, $group, $points, $tiebreaker, $id]);
            echo json_encode(['success' => true, 'message' => 'Cập nhật người chơi thành công']);
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'unique constraint') !== false) {
                echo json_encode(['success' => false, 'message' => 'Tên người chơi đã tồn tại']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Lỗi database: ' . $e->getMessage()]);
            }
        }
    } elseif ($action == 'delete') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        if ($id) {
            $stmt = $pdo->prepare('DELETE FROM players WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Xóa người chơi thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'ID không hợp lệ']);
        }
    } elseif ($action == 'updateGroupPoints') {
        $data = json_decode(file_get_contents('php://input'), true);
        $group = isset($data['group']) ? trim($data['group']) : '';
        $pointsToAdd = isset($data['points']) ? (int)$data['points'] : 0;

        if ($group && in_array($group, ['Obelisk Blue', 'Ra Yellow', 'Slifer Red'])) {
            $stmt = $pdo->prepare('UPDATE groups SET points = points + ? WHERE name = ?');
            $stmt->execute([$pointsToAdd, $group]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Nhóm không hợp lệ']);
        }
    } elseif ($action == 'createMatches') {
        $matches = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO matches (player1_id, player2_id, stage, status) VALUES (?, ?, ?, ?)');
        foreach ($matches as $match) {
            $stmt->execute([$match['player1_id'], $match['player2_id'], $match['stage'], 'pending']);
        }
        echo json_encode(['success' => true]);
    } elseif ($action == 'updateMatch') {
        $data = json_decode(file_get_contents('php://input'), true);
        $matchId = $data['matchId'];
        $score1 = $data['score1'];
        $score2 = $data['score2'];
        $player1 = $data['player1'];
        $player2 = $data['player2'];
        $groupPoints = $data['groupPoints'];

        $pdo->beginTransaction();
        try {
            // Update match
            $stmt = $pdo->prepare('UPDATE matches SET score1 = ?, score2 = ?, status = ?, match_date = CURRENT_TIMESTAMP WHERE id = ?');
            $stmt->execute([$score1, $score2, 'completed', $matchId]);

            // Update player 1
            $stmt = $pdo->prepare('UPDATE players SET points = ?, tiebreaker = ? WHERE id = ?');
            $stmt->execute([$player1['points'], $player1['tiebreaker'], $player1['id']]);

            // Update player 2
            $stmt->execute([$player2['points'], $player2['tiebreaker'], $player2['id']]);

            // Update group points
            $stmt = $pdo->prepare('UPDATE groups SET points = points + ? WHERE name = ?');
            foreach ($groupPoints as $group => $points) {
                $stmt->execute([$points, $group]);
            }

            $pdo->commit();
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } elseif ($action == 'getMatches') {
        $status = isset($_GET['status']) ? $_GET['status'] : 'all';
        $stage = isset($_GET['stage']) ? $_GET['stage'] : 'all';
        $group = isset($_GET['group']) ? $_GET['group'] : 'all';
        $player = isset($_GET['player']) ? $_GET['player'] : 'all';

        $query = 'SELECT m.*, p1.name AS player1_name, p1.group_name AS player1_group, p2.name AS player2_name, p2.group_name AS player2_group 
                  FROM matches m 
                  JOIN players p1 ON m.player1_id = p1.id 
                  JOIN players p2 ON m.player2_id = p2.id 
                  WHERE 1=1';
        $params = [];

        if ($status !== 'all') {
            $query .= ' AND m.status = ?';
            $params[] = $status;
        }
        if ($stage !== 'all') {
            $query .= ' AND m.stage = ?';
            $params[] = $stage;
        }
        if ($group !== 'all') {
            $query .= ' AND (p1.group_name = ? OR p2.group_name = ?)';
            $params[] = $group;
            $params[] = $group;
        }
        if ($player !== 'all') {
            $query .= ' AND (p1.id = ? OR p2.id = ?)';
            $params[] = $player;
            $params[] = $player;
        }

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($matches);
    } else {
        echo json_encode(['error' => 'Hành động không hợp lệ']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Lỗi kết nối database: ' . $e->getMessage()]);
}
?>