
<?php
/**
 * JWT Token Handler Class
 * 
 * Handles JWT token generation and validation for the API
 */
class JwtHandler {
    private $secretKey;
    private $algorithm;
    private $tokenExpiration;
    
    /**
     * Constructor
     */
    public function __construct() {
        // In production, load these from environment variables or a secure config
        $this->secretKey = 'your_super_secure_secret_key';
        $this->algorithm = 'HS256';
        $this->tokenExpiration = 3600; // 1 hour in seconds
    }
    
    /**
     * Generate a JWT token
     * 
     * @param array $payload The data to encode in the token
     * @return string The JWT token
     */
    public function generateToken($payload) {
        // Create token header
        $header = json_encode([
            'typ' => 'JWT',
            'alg' => $this->algorithm
        ]);
        
        // Add expiration time to payload
        $payload['exp'] = time() + $this->tokenExpiration;
        $payload['iat'] = time(); // Issued at
        
        // Encode Header
        $base64UrlHeader = $this->base64UrlEncode($header);
        
        // Encode Payload
        $base64UrlPayload = $this->base64UrlEncode(json_encode($payload));
        
        // Create Signature
        $signature = hash_hmac('sha256', 
            $base64UrlHeader . "." . $base64UrlPayload, 
            $this->secretKey, 
            true
        );
        $base64UrlSignature = $this->base64UrlEncode($signature);
        
        // Create JWT
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        
        return $jwt;
    }
    
    /**
     * Validate a JWT token
     * 
     * @param string $token The JWT token to validate
     * @return array The decoded payload if valid
     * @throws Exception If token is invalid or expired
     */
    public function validateToken($token) {
        // Split token into parts
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            throw new Exception("Invalid token format");
        }
        
        list($base64UrlHeader, $base64UrlPayload, $base64UrlSignature) = $parts;
        
        // Verify signature
        $signature = $this->base64UrlDecode($base64UrlSignature);
        $expectedSignature = hash_hmac('sha256', 
            $base64UrlHeader . "." . $base64UrlPayload, 
            $this->secretKey, 
            true
        );
        
        if (!hash_equals($signature, $expectedSignature)) {
            throw new Exception("Invalid token signature");
        }
        
        // Decode payload
        $payload = json_decode($this->base64UrlDecode($base64UrlPayload), true);
        
        // Check if token has expired
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new Exception("Token has expired");
        }
        
        return $payload;
    }
    
    /**
     * Base64Url encode
     * 
     * @param string $data The data to encode
     * @return string The encoded data
     */
    private function base64UrlEncode($data) {
        $base64 = base64_encode($data);
        $base64Url = strtr($base64, '+/', '-_');
        return rtrim($base64Url, '=');
    }
    
    /**
     * Base64Url decode
     * 
     * @param string $data The data to decode
     * @return string The decoded data
     */
    private function base64UrlDecode($data) {
        $base64 = strtr($data, '-_', '+/');
        $paddedBase64 = str_pad($base64, strlen($data) % 4, '=', STR_PAD_RIGHT);
        return base64_decode($paddedBase64);
    }
}
