<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            $stmt = $conn->prepare("SELECT * FROM appointments");
            $stmt->execute();
            $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($appointments);
        } catch(PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"));
            
            $stmt = $conn->prepare("INSERT INTO appointments (client_id, service_id, date_time, notes) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data->client_id,
                $data->service_id,
                $data->date_time,
                $data->notes
            ]);
            
            echo json_encode(['message' => 'Appointment created successfully']);
        } catch(PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
}
?> 