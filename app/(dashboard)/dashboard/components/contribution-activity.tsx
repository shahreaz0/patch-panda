import { ActivityCalendar } from "react-activity-calendar"

const data = (() => {
  const startDate = new Date("2024-01-01")
  const endDate = new Date("2024-12-31")
  const data = []

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const count = Math.floor(Math.random() * 20)
    data.push({
      date: d.toISOString().split("T")[0],
      count,
      level:
        count === 0 ? 0 : count < 5 ? 1 : count < 10 ? 2 : count < 15 ? 3 : 4,
    })
  }
  return data
})()

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ContributionActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
        <CardDescription>Recent activity history</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ActivityCalendar
          data={data}
          theme={{
            light: ["#e5e7eb", "#10b981"],
            dark: ["#374151", "#10b981"],
          }}

          //   style={{ width: "100%", maxWidth: "100%", height: "auto" }}
        />
      </CardContent>
    </Card>
  )
}
