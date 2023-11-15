<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM ToDoList";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $todos = array();

    while ($row = $result->fetch_assoc()) {
        $todos[] = $row;
    }

    echo json_encode($todos);
} else {
    echo "[]";
}

$conn->close();

?>
