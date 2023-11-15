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

$text = $conn->real_escape_string($data->text);
$checked = $data->checked;

$sql = "INSERT INTO ToDoList (text, checked) VALUES ('$text', $checked)";

if ($conn->query($sql) === TRUE) {
    echo "Todo added successfully";
} else {
    echo "Error adding todo: " . $conn->error;
}

$conn->close();

?>
