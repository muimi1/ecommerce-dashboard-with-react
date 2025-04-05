
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Sale {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  amount: string
  date: string
  status: "completed" | "processing" | "failed"
}

const recentSales: Sale[] = [
  {
    id: "INV001",
    customer: {
      name: "Cameron Williamson",
      email: "cameron.wil@example.com",
      avatar: "",
    },
    amount: "Ksh.250.00",
    date: "Today",
    status: "completed",
  },
  {
    id: "INV002",
    customer: {
      name: "Shirley Cosgrove",
      email: "shirley.cos@example.com",
      avatar: "",
    },
    amount: "Ksh.125.00",
    date: "Today",
    status: "processing",
  },
  {
    id: "INV003",
    customer: {
      name: "Lana Steiner",
      email: "lana.steiner@example.com",
      avatar: "",
    },
    amount: "Ksh.159.00",
    date: "Yesterday",
    status: "completed",
  },
  {
    id: "INV004",
    customer: {
      name: "Demi Wilkinson",
      email: "demi@example.com",
      avatar: "",
    },
    amount: "Ksh.89.00",
    date: "Yesterday",
    status: "failed",
  },
  {
    id: "INV005",
    customer: {
      name: "Orlando Diggs",
      email: "orlando@example.com",
      avatar: "",
    },
    amount: "Ksh.320.00",
    date: "2 days ago",
    status: "completed",
  },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.customer.avatar || ""} alt={sale.customer.name} />
            <AvatarFallback className="bg-primary text-white">
              {sale.customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer.name}</p>
            <p className="text-xs text-muted-foreground">{sale.customer.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p
              className={`text-sm font-medium ${
                sale.status === "failed"
                  ? "text-destructive"
                  : sale.status === "processing"
                  ? "text-warning"
                  : ""
              }`}
            >
              {sale.amount}
            </p>
            <p className="text-xs text-muted-foreground">{sale.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
