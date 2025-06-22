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
        $stmt = $pdo->query('SELECT * FROM players ORDER BY name');
        $players = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($players);
    } elseif ($action == 'add') {
        $data = json_decode(file_get_contents('php://input'), true);
        $name = isset($data['name']) ? trim($data['name']) : '';
        $group = isset($data['group']) ? trim($data['group']) : '';
        $wins = isset($data['wins']) ? (int)$data['wins'] : 0;
        $tiebreaker = isset($data['tiebreaker']) ? (float)$data['tiebreaker'] : 0.0;

        if ($name && in_array($group, ['Obelisk Blue', 'Ra Yellow', 'Slifer Red'])) {
            $stmt = $pdo->prepare('INSERT INTO players (name, group_name, wins, tiebreaker) VALUES (?, ?, ?, ?)');
            $stmt->execute([$name, $group, $wins, $tiebreaker]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Tên hoặc nhóm không hợp lệ']);
        }
    } elseif ($action == 'update') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        $name = isset($data['name']) ? trim($data['name']) : '';
        $group = isset($data['group']) ? trim($data['group']) : '';
        $wins = isset($data['wins']) ? (int)$data['wins'] : 0;
        $tiebreaker = isset($data['tiebreaker']) ? (float)$data['tiebreaker'] : 0.0;

        if ($id && $name && in_array($group, ['Obelisk Blue', 'Ra Yellow', 'Slifer Red'])) {
            $stmt = $pdo->prepare('UPDATE players SET name = ?, group_name = ?, wins = ?, tiebreaker = ? WHERE id = ?');
            $stmt->execute([$name, $group, $wins, $tiebreaker, $id]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
        }
    } elseif ($action == 'delete') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        if ($id) {
            $stmt = $pdo->prepare('DELETE FROM players WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'ID không hợp lệ']);
        }
    } else {
        echo json_encode(['error' => 'Hành động không hợp lệ']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>