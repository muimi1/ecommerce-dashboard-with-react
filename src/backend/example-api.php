
<?php
// Sample PHP API endpoint structure

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/JwtHandler.php';

// Create database connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Verify JWT token (example for protected routes)
function verifyToken() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized: No token provided"]);
        exit();
    }
    
    $token = $matches[1];
    $jwtHandler = new JwtHandler();
    
    try {
        $payload = $jwtHandler->validateToken($token);
        return $payload;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized: " . $e->getMessage()]);
        exit();
    }
}

// Example: Get products endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['route']) && $_GET['route'] === 'products') {
    // For protected routes, uncomment this line
    // $payload = verifyToken();
    
    // Get query parameters for pagination
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    $offset = ($page - 1) * $limit;
    
    // Optional filtering by category
    $categoryFilter = isset($_GET['category']) ? "WHERE category_id = " . intval($_GET['category']) : "";
    
    // Get total count for pagination
    $countQuery = "SELECT COUNT(*) as total FROM products $categoryFilter";
    $countResult = $conn->query($countQuery);
    $totalCount = $countResult->fetch_assoc()['total'];
    
    // Get products with pagination
    $query = "SELECT p.*, c.name as category_name 
              FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id
              $categoryFilter
              ORDER BY p.created_at DESC 
              LIMIT $offset, $limit";
    
    $result = $conn->query($query);
    
    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Database query failed"]);
        exit();
    }
    
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    
    // Send response with pagination metadata
    echo json_encode([
        "data" => $products,
        "meta" => [
            "current_page" => $page,
            "per_page" => $limit,
            "total" => $totalCount,
            "last_page" => ceil($totalCount / $limit)
        ]
    ]);
    exit();
}

// Example: Login endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['route']) && $_GET['route'] === 'login') {
    // Get request body
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode(["error" => "Email and password are required"]);
        exit();
    }
    
    // Sanitize input
    $email = $conn->real_escape_string($data->email);
    $password = $data->password;
    
    // Get user from database
    $query = "SELECT id, name, email, password, role FROM users WHERE email = '$email' LIMIT 1";
    $result = $conn->query($query);
    
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid credentials"]);
        exit();
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid credentials"]);
        exit();
    }
    
    // Create JWT token
    $jwtHandler = new JwtHandler();
    $token = $jwtHandler->generateToken([
        "user_id" => $user['id'],
        "name" => $user['name'],
        "email" => $user['email'],
        "role" => $user['role']
    ]);
    
    // Update last_login
    $conn->query("UPDATE users SET last_login = NOW() WHERE id = " . $user['id']);
    
    // Remove password from response
    unset($user['password']);
    
    // Send response with token
    echo json_encode([
        "user" => $user,
        "token" => $token,
        "expires_in" => 3600 // Token expiration in seconds
    ]);
    exit();
}

// If no route matches
http_response_code(404);
echo json_encode(["error" => "Endpoint not found"]);
