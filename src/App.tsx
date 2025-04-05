
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-context"
import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { LoginPage } from "@/pages/login"
import { DashboardPage } from "@/pages/dashboard"
import { ProductListPage } from "@/pages/products/product-list"
import { ProductDetailPage } from "@/pages/products/product-detail-page"
import { CustomersPage } from "@/pages/customers/customers-page"
import { OrdersPage } from "@/pages/orders/orders-page"
import { AnalyticsPage } from "@/pages/analytics/analytics-page"
import { InventoryPage } from "@/pages/inventory/inventory-page"
import { SettingsPage } from "@/pages/settings/settings-page"
import Index from "@/pages/Index"
import NotFound from "@/pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <AuthGuard>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductListPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/customers" element={<CustomersPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthGuard>
          </AuthProvider>
        </Router>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
