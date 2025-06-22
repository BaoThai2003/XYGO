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
        if ($name) {
            $stmt = $pdo->prepare('INSERT INTO players (name) VALUES (?)');
            $stmt->execute([$name]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Tên không được để trống']);
        }
    } elseif ($action == 'update') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        $name = isset($data['name']) ? trim($data['name']) : '';
        if ($id && $name) {
            $stmt = $pdo->prepare('UPDATE players SET name = ? WHERE id = ?');
            $stmt->execute([$name, $id]);
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