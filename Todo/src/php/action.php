<?php

// Establish a database connection
$servername = "localhost";
$username = "host";
$password = "";
$dbname = "todo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to authenticate a user
function authenticateUser($username, $password)
{
    global $conn;

    $hashedPassword = hashPassword($password);

    $sql = "SELECT * FROM Users WHERE username='$username' AND password='$hashedPassword'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User authenticated successfully
        return true;
    } else {
        // Authentication failed
        return false;
    }
}

// Function to create a new user
function createUser($username, $password)
{
    global $conn;

    $hashedPassword = hashPassword($password);

    $sql = "INSERT INTO Users (username, password) VALUES ('$username', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        // User created successfully
        return true;
    } else {
        // Error creating user
        return false;
    }
}

// Function to create a new space for a user
function createSpace($userId, $spaceName)
{
    global $conn;

    $sql = "INSERT INTO Spaces (user_id, space_name) VALUES ('$userId', '$spaceName')";

    if ($conn->query($sql) === TRUE) {
        // Space created successfully
        return true;
    } else {
        // Error creating space
        return false;
    }
}

// Function to add a task to a space
function addTask($spaceId, $task, $dueDate)
{
    global $conn;

    $sql = "INSERT INTO ToDoList (space_id, task, due_date) VALUES ('$spaceId', '$task', '$dueDate')";

    if ($conn->query($sql) === TRUE) {
        // Task added successfully
        return true;
    } else {
        // Error adding task
        return false;
    }
}

// Hash the password (use a secure hashing algorithm in production)
function hashPassword($password)
{
    // Example: Use bcrypt for password hashing
    return password_hash($password, PASSWORD_BCRYPT);
}

// Example usage:
// authenticateUser("user123", "password123");
// createUser("newuser", "newpassword");
// createSpace(1, "Work");
// addTask(1, "Complete project", "2023-12-31");

// Close the database connection
$conn->close();

?>
