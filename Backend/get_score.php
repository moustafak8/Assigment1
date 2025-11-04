<?php
require_once("connection.php");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}
$stmt = $con->prepare("SELECT * FROM player_scores
ORDER BY score DESC,duration DESC
LIMIT 5
");
if ($stmt->execute()) {
    $result = $stmt->get_result();
    $scores = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(["success" => true, "scores" => $scores]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to retrieve records"]);
}
$stmt->close();
$con->close();
