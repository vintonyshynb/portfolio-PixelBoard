<?php
$conn = new mysqli('localhost', 'root', '', 'pixelboard');

if ($conn->connect_error) {
    die("Connection failed");
}
?>