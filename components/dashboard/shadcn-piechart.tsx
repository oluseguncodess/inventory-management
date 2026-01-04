"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface CategoryData {
  id: number;
  category: string;
  count: number;
  percentage: string;
  color: string;
}

interface PieChartProps {
  totalQuantity: number;
  categoryData: CategoryData[];
}

export default function ChartPieDonutText({ totalQuantity, categoryData }: PieChartProps) {
  // Transform your category data to match the chart format
  const chartData = categoryData.map(cat => ({
    category: cat.category,
    value: cat.count,
    fill: cat.color
  }));

  // Build dynamic chart config from your categories
  const chartConfig = categoryData.reduce((config, cat) => {
    config[cat.category.toLowerCase().replace(/\s+/g, '-')] = {
      label: cat.category,
      color: cat.color,
    };
    return config;
  }, {
    value: {
      label: "Products",
    },
  } as ChartConfig);
 
  return (
    <Card className="flex flex-col max-w-70 w-full h-60 border-none rounded-none shadow-none py-0">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={75}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalQuantity.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {totalQuantity === 1 ? "Quantity" : "Quantities"}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}