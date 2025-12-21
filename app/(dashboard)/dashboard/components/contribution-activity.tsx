import { ActivityCalendar } from "react-activity-calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUserContributionsHeatmap } from "../actions"

export async function ContributionActivity() {
  const contributionCalendar = await getUserContributionsHeatmap()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
        <CardDescription>Recent activity history</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ActivityCalendar
          data={contributionCalendar}
          theme={{
            light: ["#e5e7eb", "#10b981"],
            dark: ["#374151", "#10b981"],
          }}
        />
      </CardContent>
    </Card>
  )
}
