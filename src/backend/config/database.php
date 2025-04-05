
<?php
// Database configuration constants
// -----------------------------------------
// IMPORTANT: Update these values with your actual database credentials
// before running the setup-database.php script or using the application
// -----------------------------------------

define('DB_HOST', 'localhost');  // Your database host (e.g., localhost, 127.0.0.1, or your remote host)
define('DB_USER', 'root');       // Your database username
define('DB_PASS', '');           // Your database password
define('DB_NAME', 'ecommerce');  // Your database name

// Optional function to get PDO connection
function getPdoConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // Log error or handle it appropriately in a production environment
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
}

// Function to get MySQLi connection
function getMysqliConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}