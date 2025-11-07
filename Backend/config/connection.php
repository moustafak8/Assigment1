<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$server = "localhost"; 
$username = "root";    
$password = ""; 
$database = "ass1";

$con = mysqli_connect($server, $username, $password, $database);

if (!$con) {
    die("Database connection failed: " . mysqli_connect_error());
}
