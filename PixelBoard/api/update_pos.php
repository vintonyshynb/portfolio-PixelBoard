<?php
require "db.php";

$id = $_POST["id"];

if(isset($_POST["x"]) && isset($_POST["y"])) {

    $x = $_POST["x"];
    $y = $_POST["y"];

    $stmt = $conn->prepare("UPDATE notes SET pos_x=?, pos_y=? WHERE id=?");
    $stmt->bind_param("iii", $x, $y, $id);
    $stmt->execute();

    echo "pos updated";
}

if(isset($_POST["content"]) && isset($_POST["color"]) && isset($_POST["textColor"])) {

    $content = $_POST["content"];
    $color = $_POST["color"];
    $textColor = $_POST["textColor"];

    $stmt = $conn->prepare("UPDATE notes SET content=?, color=?, textColor=? WHERE id=?");
    $stmt->bind_param("ssi", $content, $color, $textColor, $id);
    $stmt->execute();

    echo "note updated";
}
?>