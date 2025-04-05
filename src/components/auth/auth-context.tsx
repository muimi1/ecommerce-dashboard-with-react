
import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

interface User {
  id: number
  name: string
  email: string
  role: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      
      if (token) {
        try {
          // In a real app, we would validate the token with the backend
          // here we're simulating a successful token verification
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Mock user data (in a real app this would come from the API)
          setUser({
            id: 1,
            name: "Admin User",
            email: "admin@example.com",
            role: "admin"
          })
        } catch (error) {
          console.error("Authentication error:", error)
          localStorage.removeItem("token")
        }
      }
      
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      // In a real app, this would be an actual API call to your PHP backend
      // For demo purposes, we're simulating a successful login with a dummy token
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Demo credentials check
      if (email === "admin@example.com" && password === "password") {
        // Store JWT token
        localStorage.setItem("token", "dummy-jwt-token")
        
        // Set user data
        setUser({
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin"
        })
        
        toast.success("Login successful")
        navigate("/")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast.error("Login failed: Invalid credentials")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    toast.info("You have been logged out")
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
