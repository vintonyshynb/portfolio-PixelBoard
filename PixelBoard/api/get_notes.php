<?php
header("Content-Type: application/json");

require "db.php";

$res = $conn->query("SELECT * FROM notes");
$notes = [];

while ($row = $res->fetch_assoc()) {
    $notes[] = $row;
}

echo json_encode($notes);
?>