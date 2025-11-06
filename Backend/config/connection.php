<?php

$server = "localhost"; 
$username = "root";    
$password = ""; 
$database = "ass1";

$con = mysqli_connect($server, $username, $password, $database);

if (!$con) {
    die("Database connection failed: " . mysqli_connect_error());
}
