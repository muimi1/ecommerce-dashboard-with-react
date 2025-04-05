<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 
 // Database connection
 require_once __DIR__ . '/../../config/database.php';
 
 // Initialize response array
 $response = [
     "status" => "unknown",
     "message" => "",
     "timestamp" => date("Y-m-d H:i:s"),
     "database" => [
         "host" => DB_HOST,
         "name" => DB_NAME,
         "connection" => "untested"
     ],
     "tables" => []
 ];
 
 try {
     // Try to connect to the database
     $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
     
     // Check connection
     if ($conn->connect_error) {
         throw new Exception("Database connection failed: " . $conn->connect_error);
     }
     
     $response["status"] = "success";
     $response["message"] = "Connected to database successfully";
     $response["database"]["connection"] = "connected";
     
     // Get list of tables
     $tables_result = $conn->query("SHOW TABLES");
     
     if ($tables_result) {
         while ($table = $tables_result->fetch_array(MYSQLI_NUM)) {
             $tableName = $table[0];
             
             // Count rows in the table
             $count_result = $conn->query("SELECT COUNT(*) as count FROM `{$tableName}`");
             $count = $count_result->fetch_assoc()['count'];
             
             $response["tables"][] = [
                 "name" => $tableName,
                 "rows" => $count
             ];
         }
     }
     
     $conn->close();
     
 } catch (Exception $e) {
     $response["status"] = "error";
     $response["message"] = $e->getMessage();
     $response["database"]["connection"] = "failed";
 }
 
 // Output JSON response
 echo json_encode($response, JSON_PRETTY_PRINT);