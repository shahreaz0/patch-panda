"use client"

import { use } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  commits: {
    label: "Commits",
    color: "var(--chart-1)",
  },
  prs: {
    label: "Pull Requests",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export type MonthlyActivityData = {
  subtitle: string
  stats: {
    month: string
    commits: number
    prs: number
  }[]
}

export function MonthlyActivity({
  dataPromise,
}: {
  dataPromise: Promise<MonthlyActivityData>
}) {
  const data = use(dataPromise)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Activity</CardTitle>
        <CardDescription>{data.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <BarChart accessibilityLayer data={data.stats}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="commits" fill="var(--color-commits)" />
            <Bar dataKey="prs" fill="var(--color-prs)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total commits and pull requests for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
