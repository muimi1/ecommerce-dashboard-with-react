import { useState, useEffect } from "react"
import { Outlet, Link } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { SidebarNav } from "@/components/sidebar-nav"
import { MobileSidebar } from "@/components/ui/mobile-sidebar"
import { Bell, LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Box, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DashboardLayout() {
  const isMobile = useIsMobile()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 60000)
    
    return () => {
      clearInterval(timer)
    }
  }, [])

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
  
  const formattedDate = date.toLocaleDateString(undefined, options)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            {isMobile ? (
              <MobileSidebar />
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="mr-2"
              >
                <span className={cn("h-4 w-4 transition-all", isSidebarCollapsed ? "rotate-180" : "rotate-0")}>
                  {isSidebarCollapsed ? "→" : "←"}
                </span>
              </Button>
            )}
            <h1 className="text-xl font-semibold">E-Commerce Panel</h1>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
            </Button>
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        {!isMobile && (
          <aside className={cn(
            "hidden border-r bg-background md:block",
            isSidebarCollapsed ? "w-[70px]" : "w-[240px]"
          )}>
            <div className="flex h-full flex-col py-4">
              <div className={cn(
                "px-4 transition-all duration-300",
                isSidebarCollapsed && "px-2"
              )}>
                {!isSidebarCollapsed && <SidebarNav />}
                {isSidebarCollapsed && (
                  <div className="flex flex-col items-center space-y-4 py-4">
                    {[
                      { Icon: LayoutDashboard, href: "/" },
                      { Icon: Package, href: "/products" },
                      { Icon: ShoppingCart, href: "/orders" },
                      { Icon: Users, href: "/customers" },
                      { Icon: BarChart3, href: "/analytics" },
                      { Icon: Box, href: "/inventory" },
                      { Icon: Settings, href: "/settings" },
                    ].map(({ Icon, href }) => (
                      <Button key={href} variant="ghost" size="icon" asChild>
                        <Link to={href}>
                          <Icon className="h-5 w-5" />
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
