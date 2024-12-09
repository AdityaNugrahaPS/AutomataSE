<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "articles";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$search = '';
$results = [];

if (isset($_GET['query'])) {
  $search = $conn->real_escape_string($_GET['query']);
  $sql = "SELECT * FROM search_db WHERE 
            title LIKE '%$search%'";
  $result = $conn->query($sql);

  if (!$result) {
    die("Query error: " . $conn->error);
  }

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $results[] = $row;
    }
  }
}

// Creators data
$creators = [
  ['name' => 'Aditya Nugraha P S', 'role' => 'Designer'],
  ['name' => 'Andre Alputra', 'role' => 'Developer'],
  ['name' => 'Ariasyah Ramadhan', 'role' => 'Developer'],
  ['name' => 'Wira Maulana', 'role' => 'Developer']
];
