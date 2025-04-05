
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
    submenu: [
      { title: "All Products", href: "/products" },
      { title: "Add Product", href: "/products/new" },
      { title: "Categories", href: "/products/categories" },
    ],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Box,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function SidebarNav() {
  const { pathname } = useLocation()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <nav className="grid gap-2 text-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const hasSubmenu = !!item.submenu?.length
        const isSubmenuOpen = openMenus[item.title]

        return (
          <div key={item.href} className="space-y-1">
            {hasSubmenu ? (
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  (isActive || pathname.startsWith(item.href)) && "bg-accent"
                )}
                onClick={() => toggleSubmenu(item.title)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ) : (
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  isActive && "bg-accent"
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            )}

            {hasSubmenu && isSubmenuOpen && (
              <div className="ml-6 space-y-1">
                {item.submenu?.map((subitem) => (
                  <Button
                    key={subitem.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      pathname === subitem.href && "bg-accent"
                    )}
                    asChild
                  >
                    <Link to={subitem.href}>{subitem.title}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
