<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$id = $_GET['id'];
$checked = $data->checked;

$sql = "UPDATE ToDoList SET checked=$checked WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Todo updated successfully";
} else {
    echo "Error updating todo: " . $conn->error;
}

$conn->close();

?>
