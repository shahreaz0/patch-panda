import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getStats } from "../actions"

export async function SectionCards() {
  const stats = await getStats()

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Connected Repositories</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalConnectedRepos}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Across all organizations</div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Commits</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalCommits}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">In the current year</div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Pull Requests</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalPullRequests}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Created in the current year
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Reviews</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalReviews}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Completed in the current year
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
