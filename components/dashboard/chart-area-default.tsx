"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  quantity: {
    label: "Products Added",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface ChartAreaDefaultProps {
  chartData: { month: string; quantity: number }[];
}

export default function ChartAreaDefault({ chartData }: ChartAreaDefaultProps) {
  // Calculate trend (compare last month to previous month)
  const trend = chartData.length >= 2 
    ? ((chartData[chartData.length - 1].quantity - chartData[chartData.length - 2].quantity) / chartData[chartData.length - 2].quantity * 100).toFixed(1)
    : 0;

  const dateRange = chartData.length > 0 
    ? `${chartData[0].month} - ${chartData[chartData.length - 1].month}`
    : 'No data';

  const totalQuantity = chartData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="flex-1 max-xl:hidden">
      <CardHeader>
        <CardTitle>Inventory Growth</CardTitle>
        <CardDescription>
          Showing products added to inventory over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                // Show just the month name (first 3 letters)
                const monthName = value.split(' ')[0];
                return monthName.slice(0, 3);
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="quantity"
              type="natural"
              fill="var(--color-quantity)"
              fillOpacity={0.4}
              stroke="var(--color-quantity)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {Number(trend) >= 0 ? 'Trending up' : 'Trending down'} by {Math.abs(Number(trend))}% this month 
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {dateRange} • {totalQuantity} total products
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}