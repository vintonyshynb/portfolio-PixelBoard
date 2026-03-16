<?php
require "db.php";

$color = $_POST["color"];
$textColor = $_POST["textColor"];

$x = 50;
$y = 50;

$content = $_POST["content"];

$stmt = $conn->prepare("INSERT INTO notes (content,color,pos_x,pos_y,textColor) VALUES (?,?,?,?,?)");
$stmt->bind_param("ssiis", $content, $color, $x, $y, $textColor);
$stmt->execute();

echo "ok";
?>