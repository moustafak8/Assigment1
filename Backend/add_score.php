<?php
require_once("config/connection.php");
if ($_SERVER["REQUEST_METHOD"] != 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}
$data = json_decode(file_get_contents("php://input"), true);
$score=rand(20,100);
$duration=rand(5,60);
if (!isset($data['name'], $data['score'], $data['duration']) &&empty($data['name'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing Variables"]);
    exit;
}
$stmt = $con->prepare("INSERT INTO player_scores (name, score, duration) VALUES (?, ?, ?)");
$stmt->bind_param("sii", $data['name'], $score, $duration);
if ($stmt->execute()) {
    echo json_encode(["success" => true, "id" => $stmt->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to add record"]);
}
$stmt->close();
$con->close();
