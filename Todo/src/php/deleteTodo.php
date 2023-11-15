<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_GET['id'];

$sql = "DELETE FROM ToDoList WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Todo deleted successfully";
} else {
    echo "Error deleting todo: " . $conn->error;
}

$conn->close();

?>
