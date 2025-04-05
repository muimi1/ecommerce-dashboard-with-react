
import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { useResizeObserver } from "@/hooks/use-resize-observer"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 3200 },
  { name: "Jul", total: 3800 },
  { name: "Aug", total: 4100 },
  { name: "Sep", total: 3600 },
  { name: "Oct", total: 4200 },
  { name: "Nov", total: 4800 },
  { name: "Dec", total: 5200 },
]

interface OverviewChartProps {
  title?: string
  description?: string
  type?: "line" | "bar" | "area"
}

export function OverviewChart({
  title = "Sales Overview",
  description = "Monthly sales data for the current year",
  type = "line",
}: OverviewChartProps) {
  const { theme } = useTheme()
  const { ref, size } = useResizeObserver<HTMLDivElement>()
  
  // Calculate a responsive fontSize based on container width
  const fontSize = size && size.width < 500 ? 10 : 12

  // Get chart colors based on theme
  const getChartColors = () => {
    if (theme === "dark") {
      return {
        stroke: "hsl(var(--primary))",
        fill: "hsl(var(--primary) / 0.2)",
        grid: "hsl(var(--muted) / 0.5)",
        text: "hsl(var(--muted-foreground))",
      }
    }
    return {
      stroke: "hsl(var(--primary))",
      fill: "hsl(var(--primary) / 0.2)",
      grid: "hsl(var(--border))",
      text: "hsl(var(--muted-foreground))",
    }
  }

  const colors = getChartColors()

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke={colors.text}
              fontSize={fontSize}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={colors.text}
              fontSize={fontSize}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                fontSize: fontSize,
              }}
            />
            <CartesianGrid stroke={colors.grid} strokeDasharray="5 5" vertical={false} />
            <Bar dataKey="total" fill={colors.stroke} radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      case "area":
        return (
          <AreaChart data={data}>
            <XAxis
              dataKey="name"
              stroke={colors.text}
              fontSize={fontSize}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={colors.text}
              fontSize={fontSize}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                fontSize: fontSize,
              }}
            />
            <CartesianGrid stroke={colors.grid} strokeDasharray="5 5" vertical={false} />
            <Area type="monotone" dataKey="total" stroke={colors.stroke} fill={colors.fill} />
          </AreaChart>
        )
      default:
        return (
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke={colors.text}
              fontSize={fontSize}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={colors.text}
              fontSize={fontSize}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                fontSize: fontSize,
              }}
            />
            <CartesianGrid stroke={colors.grid} strokeDasharray="5 5" vertical={false} />
            <Line
              type="monotone"
              dataKey="total"
              activeDot={{ r: 8 }}
              strokeWidth={2}
              stroke={colors.stroke}
            />
          </LineChart>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent ref={ref} className="h-[300px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
