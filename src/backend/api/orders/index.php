
<?php
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
require_once __DIR__ . '/../../config/database.php';

// Create database connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Get orders with pagination and search
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get query parameters for pagination
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    $offset = ($page - 1) * $limit;
    
    // Optional search parameter
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $searchFilter = '';
    
    if (!empty($search)) {
        $search = $conn->real_escape_string($search);
        $searchFilter = "WHERE order_number LIKE '%$search%' OR customer_name LIKE '%$search%'";
    }
    
    // Get total count for pagination
    $countQuery = "SELECT COUNT(*) as total FROM orders $searchFilter";
    $countResult = $conn->query($countQuery);
    $totalCount = $countResult->fetch_assoc()['total'];
    
    // Get orders with pagination
    $query = "SELECT o.*, 
                (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as items_count
              FROM orders o 
              $searchFilter
              ORDER BY o.created_at DESC 
              LIMIT $offset, $limit";
    
    $result = $conn->query($query);
    
    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Database query failed: " . $conn->error]);
        exit();
    }
    
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    
    // Send response with pagination metadata
    echo json_encode([
        "data" => $orders,
        "meta" => [
            "current_page" => $page,
            "per_page" => $limit,
            "total" => $totalCount,
            "last_page" => ceil($totalCount / $limit)
        ]
    ]);
    exit();
}

// If no valid method matches
http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
