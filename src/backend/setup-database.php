
<?php
// Database setup script
header("Content-Type: text/plain");

// Include database configuration
require_once __DIR__ . '/config/database.php';

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected to MySQL server successfully.\n\n";

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if ($conn->query($sql) === TRUE) {
    echo "Database created or already exists.\n";
} else {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db(DB_NAME);

// Read the SQL schema file
$sql = file_get_contents(__DIR__ . '/database-schema.sql');

// Execute multi-query SQL
if ($conn->multi_query($sql)) {
    echo "Database tables created successfully.\n";
    
    // Process all result sets (if any)
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
    
} else {
    echo "Error creating tables: " . $conn->error;
}

$conn->close();
echo "\nDatabase setup complete!";
echo "\nYou can now use the admin panel with the following credentials:";
echo "\nEmail: admin@example.com";
echo "\nPassword: password";
echo "\n\nNote: This is a sample password. In a production environment, you should change this immediately.";