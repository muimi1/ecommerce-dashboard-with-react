
import { ArrowUpDown, CircleDollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="$45,231.89"
            description="+20.1% from last month"
            icon={CircleDollarSign}
            trend={{ value: 20.1, isPositive: true }}
          />
          <StatsCard
            title="New Orders"
            value="356"
            description="+12.5% from last month"
            icon={ShoppingCart}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Sales Items"
            value="12,234"
            description="+5.3% from last month"
            icon={Package}
            trend={{ value: 5.3, isPositive: true }}
          />
          <StatsCard
            title="New Customers"
            value="123"
            description="-2.1% from last month"
            icon={Users}
            trend={{ value: 2.1, isPositive: false }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-2 md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Revenue and sales statistics for the past 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>
          
          <Card className="col-span-2 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
